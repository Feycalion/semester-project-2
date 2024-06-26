import {
  API_KEY,
  API_BASE,
  API_AUTH,
  API_PROFILES,
  API_LOGIN,
} from "../../../index.mjs";
import load from "../utils/load.mjs";

async function accessProfile(user) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  const response = await fetch(API_BASE + API_PROFILES + user.name, options);

  const result = await response.json();

  if (response.ok) {
    user.credits = result.data.credits;
    localStorage.setItem("profile", JSON.stringify(user));

    window.location.href = "../../../profile.html";
  }
}

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

  try {
    const response = await fetch(API_BASE + API_AUTH + API_LOGIN, options);
    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("profile", JSON.stringify(result.data));
      const user = load("profile");

      accessProfile(user);
    }
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    login(email, password);
  });
});
