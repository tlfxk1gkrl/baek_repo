import { io, Socket } from "socket.io-client";

const socket: Socket = io();
let lan: any;

const sendButton = document.querySelector("#send") as HTMLButtonElement;
const input = document.querySelector("#input") as HTMLInputElement;
const messages = document.querySelector(".messages") as HTMLDivElement;

sendButton!.addEventListener("click", function () {
  const msg = input.value;

  fetch("/detectLangs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: msg,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      lan = data.langCode;
      const trmsg = { lan: lan, msg: msg };
      fetch("/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trmsg),
      })
        .then((response) => response.json())
        .then((data) => {
          socket.emit("chat message", data.message.result.translatedText);
          const template = `<div class="message me">
                           <div class="avatar"></div>
                          <div class="text">
                     <p>${msg}</p>
                    </div>
                    </div>`;
          messages.insertAdjacentHTML("beforeend", template);

          input.value = "";
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

socket.on("chat message", function (msg: any) {
  const trmsg = { lan: lan, msg: msg };
  fetch("/returntranslate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trmsg),
  })
    .then((response) => response.json())
    .then((data) => {
      const template = `<div class="message">
    <div class="avatar"></div>
    <div class="text">
      <p>${data.message.result.translatedText}</p>
    </div>
  </div>`;

      messages.insertAdjacentHTML("beforeend", template);
    })
    .catch((error) => console.log(error));
});
