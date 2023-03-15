# baek_repo

## Nodejs Setup

const express = require('express');
const app = express();

app.use("/", function(req, res){
res.sendFile(\_\_dirname + 'index.html');
});

app.listen(8080);

## Setup

set process.env.OPENAI_API_KEY=
set process.env.NAVER_CLIENT_ID=
set process.env.NAVER_CLIENT_KEY=
node server.js

## 230306

add gitignore
add dotenv
Separating html, css, js

## 230315

add loginPage
