const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  //connect
  console.log("new user connected");

  //disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  //get message
  socket.on("chat message", (msg) => {
    console.log("message : " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// app.use("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// app.listen(8080);

// const WebSocket = require("ws");

// const socket = new WebSocket.Server({
//   port: 8081,
// });

// socket.on("connection", (ws, req) => {
//   ws.on("message", (msg) => {
//     console.log("user : " + msg);
//     ws.send("return");
//   });
// });
