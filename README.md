# baek_repo

## Nodejs Setup

const express = require('express');
const app = express();

app.use("/", function(req, res){
res.sendFile(\_\_dirname + 'index.html');
});

app.listen(8080);

## Setup

set process.env.OPENAI_API_KEY="openAI_API_KEY"
node server.js
