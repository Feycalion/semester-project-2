import { API_KEY, API_BASE, API_LISTINGS, API_PROFILES } from "../../index.mjs";
import load from "./utils/load.mjs";

const profile = load("profile");

document.getElementById("update-profile").addEventListener("click", () => {
  document.getElementById("update-modal").classList.remove("hidden");
});

document.getElementById("update-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("update-name").value;
  const profilePic = document.getElementById("update-image").value;
  const bio = document.getElementById("update-bio").value;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      username,
      description: bio,
    }),
  };

  const response = await fetch(API_BASE + API_PROFILES + "chili999", options);

  const result = await response.json();

  console.log(result);

  if (response.ok) {
    document.getElementById("update-name").textContent = username;
    document.getElementById("update-modal").classList.add("hidden");
  } else {
    alert("Failed to update profile");
  }
});

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
});
