const form = document.getElementById("login-form") as HTMLFormElement;

form.addEventListener("submit", async (event: Event) => {
  event.preventDefault(); // prevent the default form submission

  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  console.log(`Username: ${username}, Password: ${password}`);

  // send the login request to the server and wait for the response
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    // authentication was successful, redirect to the home page
    window.location.href = "/chat";
  } else {
    // authentication failed, display an error message
    const error = await response.text();
    console.error("Authentication failed:", error);
    // display an error message to the user
  }
});
