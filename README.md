# baek_repo

## Nodejs Setup

const express = require('express');
const app = express();

app.use("/", function(req, res){
res.sendFile(\_\_dirname + 'index.html');
});

app.listen(8080);

## Setup
1. create .env file
2.  set process.env.OPENAI_API_KEY=
    set process.env.NAVER_CLIENT_ID=
    set process.env.NAVER_CLIENT_KEY=

## 230306

add gitignore
add dotenv
Separating html, css, js
