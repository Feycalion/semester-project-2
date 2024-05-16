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
  } catch (e) {}
}

const registerForm = document.querySelector("#registerform");

console.log(registerForm);

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("#full-name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  register(name, email, password);
});

//register("chili999", "chili999@stud.noroff.no", "chili9999");
