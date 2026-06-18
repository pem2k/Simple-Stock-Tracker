import { loginUser, signupUser } from "./api.js";

/*
  auth.js

  This file handles BOTH:
  1. Login form
  2. Signup form

  It is an ES6 module because the HTML files load it with:
  <script type="module" ...>

  This keeps the frontend JavaScript organized
*/

/*
  This helper function shows a message on the page

  Example:
  showMessage("Login successful!", "success");
  showMessage("Wrong password.", "error");
*/
function showMessage(message, type = "error") {
  const messageElement = document.querySelector("#authMessage");

  // If the page does not have #authMessage, stop the function.
  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;

  // Simple color change based on success or error.
  if (type === "success") {
    messageElement.style.color = "green";
  } else {
    messageElement.style.color = "red";
  }
}

/*
  Login form setup.
  This only runs on login.html because only login.html has #loginForm.
*/
function setupLoginForm() {
  const loginForm = document.querySelector("#loginForm");

  // If this page does not have a login form, stop here.
  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    // Prevent the browser from refreshing the page.
    event.preventDefault();

    // Get values from the form inputs.
    const username = document.querySelector("#loginUsername").value.trim();
    const password = document.querySelector("#loginPassword").value;

    // validation to make sure the user entered something before sending to backend.
    if (!username || !password) {
      showMessage("Please enter your username and password.");
      return;
    }

    try {
      showMessage("Logging in...", "success");

      const result = await loginUser(username, password);

      showMessage(result.message || "Login successful!", "success");

      /*
        Later, when the dashboard page is ready,
        we can redirect there.

        Example:
        window.location.href = "../index.html";
      */
    } catch (error) {
      showMessage(error.message);
    }
  });
}

/*
  Signup form setup.
  This only runs on signup.html because only signup.html has #signupForm.
*/
function setupSignupForm() {
  const signupForm = document.querySelector("#signupForm");

  // If this page does not have a signup form, stop here.
  if (!signupForm) {
    return;
  }

  signupForm.addEventListener("submit", async (event) => {
    // Prevent page refresh.
    event.preventDefault();

    // Get values from the form inputs.
    const username = document.querySelector("#signupUsername").value.trim();
    const password = document.querySelector("#signupPassword").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    // Basic validation.
    if (!username || !password || !confirmPassword) {
      showMessage("Please fill out all fields.");
      return;
    }

    // Make sure passwords match before sending to backend.
    if (password !== confirmPassword) {
      showMessage("Passwords do not match.");
      return;
    }

    try {
      showMessage("Creating account...", "success");

      const result = await signupUser(username, password);

      showMessage(result.message || "Account created successfully!", "success");

      /*
        After signup works, we can send the user to login.

        Small delay so the user can see the success message.
      */
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1000);
    } catch (error) {
      showMessage(error.message);
    }
  });
}

/*
  Start the correct form setup.
  Since this file is used by both pages,
  these functions check which form exists.
*/
setupLoginForm();
setupSignupForm();
