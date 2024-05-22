import { API_KEY, API_BASE, API_AUTH, API_REGISTER } from "../../../index.mjs";

async function register(username, email, password) {
  try {
    const response = await fetch(API_BASE + API_AUTH + API_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      window.location.href = "../../../login.html";
    } else {
      console.error(result);
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

const registerForm = document.querySelector("#registerform");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(name)) {
    alert("Please enter a valid name without special characters or spaces.");
    document.querySelector("#username").focus();
    return;
  }

  if (name.length > 20) {
    alert("Name must not exceed 20 characters.");
    document.querySelector("#username").focus();
    return;
  }

  const emailRegex = /^[^\s@]+@stud\.noroff\.no$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email with @stud.noroff.no domain.");
    document.querySelector("#email").focus();
    return;
  }

  if (password.length < 8) {
    alert("Password must be 8 or more characters long.");
    document.querySelector("#password").focus();
    return;
  }

  register(name, email, password);
});
