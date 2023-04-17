import { Jwt } from "jsonwebtoken";

const form = document.getElementById("login-form") as HTMLFormElement;

let token;

form.addEventListener("submit", async (event: Event) => {
  event.preventDefault(); // prevent the default form submission

  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  // send the login request to the server and wait for the response
  const response = await fetch("http://localhost:8080/tokenCreate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, name: "", password: password }),
  });

  if (response.ok) {
    // authentication was successful, redirect to the home page
    const body = await response.json();
    token = body.data.token;
    console.log(token);
    fetch("http://localhost:8080/checkToken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == "200") {
          window.location.href = "/chat";
        }
      })
      .catch((err) => console.log(err));
  } else {
    // authentication failed, display an error message
    const error = await response.text();
    console.error("Authentication failed:", error);
    // display an error message to the user
  }
});
