import express from "express";
import expressAsyncHandler from "express-async-handler";
// var router = express.Router();

// import transporter from "../config/mail.conf";
import nodemailer from "nodemailer";

/* GET users listing. */
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";
import User from "../models/userModel.js";
import Ticket from "../models/ticketModel.js";
import Order from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();

const mailRouter = express.Router();
const transport = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.THE_MAIL,
    pass: process.env.THE_MAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) console.log(error);
  else console.log("ready to send mails");
});
mailRouter.get("/", function (req, res, next) {
  res.send("gettting mail route");
});

mailRouter.post("/sendMailToClient", function (req, res, next) {

  const to = process.env.THE_MAIL;
  const subject = "req.body.subject";
  const text = "req.body.text";

  const mail = {
    from: process.env.THE_MAIL,
    to,
    subject,
    text,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err)
      res.json({
        status: "failed",
        message: err.message,
      });
    else
      res.json({
        status: "success",
      });
  });
});

mailRouter.post("/sendMailFromClient", function (req, res, next) {
  console.log("sendMailFromClient", req.body);

  const from = req.body.from;
  const name = req.body.name;
  const subject = req.body.subject;
  const text = req.body.text;

  const mail = {
    from: from,
    to: process.env.THE_MAIL,
    subject,
    text: `
        mail from ${from}
        name: ${name}
        subject: ${subject}
        content: ${text}
        `,
    // html: `<h1>mail from ${from}</h1>`
  };
  transporter.sendMail(mail, (err, data) => {
    if (err)
      res.json({
        status: "failed",
        message: err.message,
      });
    else
      res.json({
        status: "success",
      });
  });
});

//////////////////order action start////////////////////////////

////////// send order deliver start//////////////////////////

mailRouter.post(
  "/sendMailDeliver",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    // console.log("sendMailDeliver", req.body);

    const { orderId, userInfo } = req.body;

    const order = await Order.findById(orderId);
    console.log("order :", order);

    const user = await User.findById(order.user);
    console.log("user :", user);

    const to = user.email;
    const subject = `Hello ${user.name},Your Order Has Been Delivered `;
    const html = `<h1>Thanks for shopping with us</h1>
     <p>Hi ${
       user.name
     }, Your Order Has Been Delivered at ${new Date().toLocaleString()}</p>
    <h2>Order Summary</h2>
    <h2>[Order ${order._id}] (${order.createdAt
      .toString()
      .substring(0, 10)})</h2>
    <table>
    <thead>
    <tr>
    <td><strong>Product</strong></td>
    <td><strong>Quantity</strong></td>
    <td><strong align="right">Price</strong></td>
    </thead>
    <tbody>
    ${order.orderItems
      .map(
        (item) => `
      <tr>
      <td>${item.name}</td>
      <td align="center">${item.qty}</td>
      <td align="right"> $${item.price.toFixed(2)}</td>
      </tr>
    `
      )
      .join("\n")}
    </tbody>
    <tfoot>
    <tr>
    <td colspan="2">Items Price:</td>
    <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Tax Price:</td>
    <td align="right"> $${order.taxPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Shipping Price:</td>
    <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2"><strong>Total Price:</strong></td>
    <td align="right"><strong> $${
      order.totalPrice.toFixed(2) - Number(order.coupon)
    }</strong></td>
    </tr>
    <tr>
    <td colspan="2">Payment Method:</td>
    <td align="right">${order.paymentMethod}</td>
    </tr>
    </table>
    <h2>Shipping address</h2>
    <p>
    ${order.shippingAddress.fullName},<br/>
    ${order.shippingAddress.address},<br/>
    ${order.shippingAddress.city},<br/>
    ${order.shippingAddress.country},<br/>
    ${order.shippingAddress.postalCode}<br/>
    </p>
    <hr/>
  
     <p> Thanks for shopping with us. </p>
    <p>Dog Best Friends</p>
   
    `;

    const mail = {
      from: process.env.THE_MAIL,
      to,
      subject,
      html,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err)
        res.json({
          status: "failed",
          message: err.message,
        });
      else
        res.json({
          status: "success",
        });
    });
  })
);

////////////send order deliver end//////////////////////////

//////////////////////////send email order recipt start//////
mailRouter.post(
  "/sendMailOrder",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    // console.log("sendMailOrder", req.body);

    const user = await User.findById(req.body.order.user);
    // console.log("user :", user);

    const { order } = req.body;
    console.log("order :", order);
    const to = user.email;
    const subject = `Hello ${user.name}, Thank for shopping with us `;
    const html = `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${user.name},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join("\n")}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax Price:</td>
  <td align="right"> $${order.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${
    order.totalPrice.toFixed(2) - Number(order.coupon)
  }</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  
 <p> Thanks for shopping with us. </p>
  <p>Dog Best Friends</p>
 
  `;

    const mail = {
      from: process.env.THE_MAIL,
      to,
      subject,
      html,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err)
        res.json({
          status: "failed",
          message: err.message,
        });
      else
        res.json({
          status: "success",
        });
    });
  })
);

///////////////////////////send order recipt end////////////

//////////////////order action end////////////////////////////

////////////////////////////ticketssssss actions start///////////////////////

////////////////////// thank the user for submmit a ticket

mailRouter.post(
  "/sendMailCreatTicket",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    console.log("sendMailCreatTicket");

    const to = req.body.email;
    const subject = `Hello ${req.body.name}, Thank you for submitting a ticket`;
    const html = `
<h2>Hi ${req.body.name}</h2>
<p>Thank you for Submitting a Ticket,</p>
<p>We Will back to you Shortly.</p>
 <p>Sincerely,</p>

<hr/>
Dog Best Friends`;

    const mail = {
      from: process.env.THE_MAIL,
      to,
      subject,
      html,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err)
        res.json({
          status: "failed",
          message: err.message,
        });
      else
        res.json({
          status: "success",
        });
    });
  })
);

//////////////// tell the admin that the user as submit a ticket///////

mailRouter.post(
  "/emailCreateTicketAdmin",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log("emailCreateTicketAdmin");

    const from = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;

    const subject = req.body.subject;
    const text = req.body.body;

    const mail = {
      from: from,
      to: process.env.THE_MAIL,
      subject: `Hello Admin You Have a New Ticket from ${name}`,
      html: `
  <p><b> Mail From</b> ${from} </p>

  <p><b> Name:</b> ${name}</p>
      
  <p><b>Phone:</b> ${phone}</p>

 <p><b>Subject:</b> ${subject} </p>

 <p><b>Content:</b> ${text}</p>
        `,
      // html: `<h1>mail from ${from}</h1>`
    };
    transporter.sendMail(mail, (err, data) => {
      if (err)
        res.json({
          status: "failed",
          message: err.message,
        });
      else
        res.json({
          status: "success",
        });
    });
  })
);

////////////////////////////////////////////

/////////// tell the user the admin answer the ticket////////////////////////////////

mailRouter.post(
  "/sendMailAnswerTicket",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    console.log("sendMailAnswerTicket", req.body);

    const ticket = await Ticket.findById(req.body.id);
    const user = await User.findOne({ email: ticket.email });
    // console.log("ticket :", ticket);

    const to = ticket.email;
    const subject = `Hello ${user.name}, Your ticket as been Answered `;
    const html = `
<h2>Hello  ${user.name}</h2>

<p>The Status Of Your Ticket As Been Change to ${req.body.answer},</p>

<p>Enter To Your Ticket History To View</p>

<p>Sincerely,</p>

<br/>
<hr/>
Dog Best Friends`;

    const mail = {
      from: process.env.THE_MAIL,
      to,
      subject,
      html,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err)
        res.json({
          status: "failed",
          message: err.message,
        });
      else
        res.json({
          status: "success",
        });
    });
  })
);

////////////////////////////////////////////////////////////////

//////////////// tel the user the Admin comment on the ticket///////////

mailRouter.post(
  "/sendMailAnswerTicketComment",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    console.log("sendMailAnswerTicketComment", req.body);

    const ticket = await Ticket.findById(req.body.id);
    // console.log("ticket :", ticket);
    const user = await User.findOne({ email: ticket.email });

    const to = ticket.email;
    const subject = `Hello ${user.name}, You Have new comment on your ticket `;
    const html = `
<h3>Hello ${user.name},</h3>  
 <p>You Have new comment on your ticket :</p>

<p><b> Name:</b> ${req.body.answer.name}</p>

<p>Content:</b>${req.body.answer.content}</p>

<p>Sincerely,</p>

<hr/>
Dog Best Friends`;

    const mail = {
      from: process.env.THE_MAIL,
      to,
      subject,
      html,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err)
        res.json({
          status: "failed",
          message: err.message,
        });
      else
        res.json({
          status: "success",
        });
    });
  })
);

///////////////////////////////users///////////////////////////

////////////welcome a new user///////////

mailRouter.post(
  "/sendMailUser",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    // console.log("req.body.userInfo :", req.body.userInfo);

    const to = req.body.userInfo.email;
    const subject = `Welcome ${req.body.userInfo.name}, We Happy You Join Us `;
    const html = `
<h1>Welcome ${req.body.userInfo.name}! </h1>

<h5>We Happy You Join Us! We Hope You Will Enjoy Here!</h5>

<p>Best Wishes!</p>

<hr/>
Dog Best Friends
`;

    const mail = {
      from: process.env.THE_MAIL,
      to,
      subject,
      html,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err)
        res.json({
          status: "failed",
          message: err.message,
        });
      else
        res.json({
          status: "success",
        });
    });
  })
);

/////////////////////////////////////

export default mailRouter;
