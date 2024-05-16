import { API_KEY, API_BASE, API_AUTH, API_LOGIN } from "../../../index.mjs";

async function login(email, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  console.log(options.body);
  try {
    const response = await fetch(API_BASE + API_AUTH + API_LOGIN, options);
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      localStorage.setItem("profile", JSON.stringify(result.data));

      window.location.href = "../../../profile.html";
    }
  } catch (e) {
    console.log(e);
  }
}

//login("chili999@stud.noroff.no", "chili9999");

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    login(email, password);
  });
});
