const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//openAI
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  //connect
  console.log("new user connected");

  //disconnect
  socket.on("disconnect", () => {
    console.log(socket.id + "user disconnected");
  });

  //get message
  socket.on("chat message", async (msg) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: msg,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    io.emit("chat message", response.data.choices[0].text);
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
