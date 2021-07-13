import http from "http";
import { Server } from "socket.io";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import postRouter from "./routers/postRouter.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import ticketRouter from "./routers/ticketRouter.js";
import mailRouter from "./routers/mailRouter.js";

import uploadRouter from "./routers/uploadRouter.js";
import cors from "cors";
import session from "express-session";

// import { createRequire } from "module";

// const require = createRequire(import.meta.url);
// const GoogleStrategy = createRequire("passport-google-oauth20").Strategy;

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(
  "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
);
console.log("Server Run");
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/dogBestFriendsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/mails", mailRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

/////////////////////////////////////////////////////////

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = [];
console.log("users :", users);

io.on("connection", (socket) => {
  console.log("connection", socket.id);

  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log("Offline", user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("updateUser", user);
      }
    }
  });

  socket.on("onLogin", (user) => {
    console.log(" server: on - onLogin :");
    console.log("user :", user);

    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      console.log("existUser");
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
      console.log(" users.push(updatedUser) => users :", users);
    }
    console.log("Online", user.name);

    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      console.log("admin :", admin);

      console.log(`io.to(admin.socketId).emit("updateUser", updatedUser);`);
      io.to(admin.socketId).emit("updateUser", updatedUser);
      io.to(admin.socketId).emit(
        "roomUpdate",
        " admin.socketId the room is good!"
      );
      io.to(socket.id).emit("roomUpdate", " socket.id the room is good!");

      io.to().emit("roomUpdate", " All the room is good!");
    }
    if (updatedUser.isAdmin) {
      console.log(`io.to(updatedUser.socketId).emit("listUsers", users);`);
      console.log("users :", users);

      io.to(updatedUser.socketId).emit("listUsers", users);
      io.to(updatedUser.socketId).emit(
        "roomUpdate",
        " listUsers the room is good!"
      );
        io.to(socket.id).emit(
          "roomUpdate",
          "socked.idd listUsers the room is good!"
        );
    }
  });

  socket.on("onUserSelected", (user) => {
    console.log(`socket.on("onUserSelected", (user)`);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      console.log("onUserSelected=> admin :", admin);
      const existUser = users.find((x) => x._id === user._id);
      console.log("onUserSelected=> existUser :", existUser);

      console.log(`io.to(admin.socketId).emit("selectUser", existUser);`);

      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });

  socket.on("onMessage", (message) => {
    console.log("server: on- onMessage");
    console.log("message :", message);

    if (message.isAdmin) {
      console.log("message.isAdmin :");
      const user = users.find((x) => x._id === message._id && x.online);
      console.log("user :", user);
      if (user) {
        console.log(`io.to(user.socketId).emit("message", message);
        user.messages.push(message);`);
        io.to(user.socketId).emit("message", message);
        user.messages.push(message);
        console.log("user :", user);
      }
    } else {
      console.log("message.isAdmin : false");

      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        console.log("admin :", admin);
        console.log("admin.socketId :", admin.socketId);
        console.log(`io.to(admin.socketId).emit("message", message);`);
        io.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
        console.log("user :", user);
      } else {
        console.log("server: emit- message");
        io.to(socket.id).emit("message", {
          name: "Admin",
          body: "Sorry. I am not online right now",
        });
      }
    }
  });

// var counter=1;
// setInterval(() => {
//   io.to(socket.id).emit("roomUpdate", counter++);
// }, 1000);



});










httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });
