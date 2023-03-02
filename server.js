const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require("body-parser");

//api-key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const NAVER_CLIENT_ID = process.env.process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_KEY = process.env.process.env.NAVER_CLIENT_KEY;

//openAI
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//papago
app.post("/detectLangs", function (req, res) {
  var api_url = "https://openapi.naver.com/v1/papago/detectLangs";
  var request = require("request");
  var query = req.body.data;
  var options = {
    url: api_url,
    form: { query: query },
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_KEY,
    },
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.post("/translate", function (req, res) {
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("request");
  var query = req.body.msg;
  var lan = req.body.lan;
  var options = {
    url: api_url,
    form: { source: lan, target: "en", text: query },
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_KEY,
    },
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.post("/returntranslate", function (req, res) {
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("request");
  var query = req.body.msg;
  var lan = req.body.lan;
  var options = {
    url: api_url,
    form: { source: "en", target: lan, text: query },
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_KEY,
    },
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
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
