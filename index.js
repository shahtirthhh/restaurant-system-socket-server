const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv/config");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

const PORT = process.env.PORT;
io.on("connection", (socket) => {
  socket.emit("connection_sucess");
  console.log("\n\t  New connection 💖");

  socket.on("new_order", () => {
    console.log("\t  New order received 📦");
    io.emit("update_orders");
  });
  socket.on("order_marked_as_paid", (_id) => {
    console.log("\t  An order marked as paid 💸");
    io.emit("check_for_order_payment", _id);
  });
  socket.on("order_canceled", (_id) => {
    console.log("\t  An order canceled 💔");
    io.emit("check_for_order_cancellation", _id);
  });
  socket.on("order_marked_as_served", (_id) => {
    console.log("\t  An order served 😉");
    io.emit("check_for_order_served", _id);
  });
  //   setInterval(() => {
  //     socket.emit("update_orders");
  //   }, 7000);
});

server.listen(PORT, () => {
  console.clear();
  console.log(" ___________________________________");
  console.log("|                                   |");
  console.log(`|   Socket server live on ${PORT}      |`);
  console.log("|                                   |");
});
