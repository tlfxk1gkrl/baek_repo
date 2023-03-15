let socket = io();
let lan;
document.querySelector("#send").addEventListener("click", function () {
  const msg = document.querySelector("#input").value;

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
                     <p>${document.querySelector("#input").value}</p>
                    </div>
                    </div>`;
          document
            .querySelector(".messages")
            .insertAdjacentHTML("beforeend", template);

          document.querySelector("#input").value = "";
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

socket.on("chat message", function (msg) {
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
      console.log(data);
      const template = `<div class="message">
    <div class="avatar"></div>
    <div class="text">
      <p>${data.message.result.translatedText}</p>
    </div>
  </div>`;

      document
        .querySelector(".messages")
        .insertAdjacentHTML("beforeend", template);
    })
    .catch((error) => console.log(error));
});
