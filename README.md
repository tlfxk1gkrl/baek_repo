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
<<<<<<< HEAD
set process.env.NAVER_CLIENT_ID=
set process.env.NAVER_CLIENT_KEY=
=======
set process.env.process.env.NAVER_CLIENT_ID=
set process.env.process.env.NAVER_CLIENT_KEY=
>>>>>>> 1f23fb6f3dee97f8671797024bd0334e08684c28
node server.js

## 23/03/06

add gitignore
add dotenv
Separating html, css, js
