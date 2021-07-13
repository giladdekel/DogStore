import express from "express";
import expressAsyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";
import Product from "../models/productModel.js";

import User from "../models/userModel.js";

import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
  mailgun,
  payTicketEmailTemplate,
} from "../utils.js";

const ticketRouter = express.Router();

ticketRouter.get("/activeTicket", async (req, res) => {
  const tickets = await Ticket.find();

  for (const ticket of tickets) {
    ticket.isActive = true;
    console.log(ticket);
    await ticket.save();
  }
  res.json(tickets);
});

ticketRouter.get(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const tickets = await Ticket.find({ isActive: true }).populate(
      "user",
      "name image"
    );
    res.send(tickets);
  })
);

ticketRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const tickets = await Ticket.find({ isActive: true, user: req.user._id });
    res.send(tickets);
  })
);

ticketRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const ticket = new Ticket({
      subject: req.body.subject,
      email: req.body.email,
      phone: req.body.phone,
      body: req.body.body,
      user: req.user._id,
    });
    const createdTicket = await ticket.save();
    // console.log("createdTicket :", createdTicket);
    // console.log("res :", res);
    res
      .status(201)
      .send({ message: "New Ticket Created", ticket: createdTicket });
  })
);

ticketRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      res.send(ticket);
    } else {
      res.status(404).send({ message: "Ticket Not Found" });
    }
  })
);

ticketRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id).populate(
      "user",
      "email name image"
    );
    if (ticket) {
      ticket.isPaid = true;
      ticket.paidAt = Date.now();
      ticket.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedTicket = await ticket.save();
      mailgun()
        .messages()
        .send(
          {
            from: "Amazona <amazona@mg.yourdomain.com>",
            to: `${ticket.user.name} <${ticket.user.email}>`,
            subject: `New ticket ${ticket._id}`,
            html: payTicketEmailTemplate(ticket),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );
      res.send({ message: "Ticket Paid", ticket: updatedTicket });
    } else {
      res.status(404).send({ message: "Ticket Not Found" });
    }
  })
);

ticketRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      // const deleteTicket = await ticket.remove();
      ticket.isActive = !ticket.isActive;

      await ticket.save();
      res.send({ message: "Ticket Deleted", ticket: ticket });
    } else {
      res.status(404).send({ message: "Ticket Not Found" });
    }
  })
);

ticketRouter.put(
  "/:id/answer",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    const answer = req.body.answer;
    if (ticket) {
      switch (answer) {
        case "Pending":
          ticket.isAnswered = "Pending";

          break;
        case "Answered":
          ticket.isAnswered = "Answered";

          break;
        case "Rejected":
          ticket.isAnswered = "Rejected";

          break;

        default:
          break;
      }
      ticket.answeredAt = Date.now();

      const updatedTicket = await ticket.save();
      res.send({ message: "Ticket Answered", ticket: updatedTicket });
    } else {
      res.status(404).send({ message: "Ticket Not Found" });
    }
  })
);

///////////////////////////////create answer start //////////////////////////

ticketRouter.post(
  "/:id/answers",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
    if (ticket) {
      const answer = {
        name: req.user.name,
        image: req.body.image,
        content: req.body.content,
      };
      ticket.answers.push(answer);
      ticket.numAnswers = ticket.answers.length;

      const updatedTicket = await ticket.save();
      res.status(201).send({
        message: "Answer Created",
        answer: updatedTicket.answers[updatedTicket.answers.length - 1],
      });
    } else {
      res.status(404).send({ message: "Ticket Not Found" });
    }
  })
);

///////////////////////////////create answer end //////////////////////////

////////////////////////////////

export default ticketRouter;
