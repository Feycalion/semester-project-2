import { API_KEY, API_BASE, API_PROFILES } from "../../index.mjs";
import load from "./utils/load.mjs";

const profile = load("profile");

document.addEventListener("DOMContentLoaded", function () {
  if (profile) {
    document.getElementById("img").src = profile.avatar.url || "";
    document.getElementById("profile-img").src = profile.avatar.url || "";
    document.getElementById("bio").innerText = profile.bio || "";
    document.getElementById("update-bio").value = profile.bio || "";
    document.getElementById("update-image").value = profile.avatar.url || "";
  }

  updateCharCount();
});

document.getElementById("update-profile").addEventListener("click", () => {
  document.getElementById("update-modal").classList.remove("hidden");
});

document.getElementById("update-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const profilePic = document.getElementById("update-image").value;
  const bioValue = document.getElementById("update-bio").value;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      bio: bioValue,
      avatar: {
        url: profilePic,
      },
    }),
  };

  console.log(options);

  const response = await fetch(API_BASE + API_PROFILES + profile.name, options);

  const result = await response.json();

  console.log(result);

  if (response.ok) {
    profile.bio = bioValue;
    profile.avatar.url = profilePic;

    document.getElementById("img").src = profile.avatar.url;
    document.getElementById("profile-img").src = profile.avatar.url;
    document.getElementById("bio").innerText = profile.bio;

    localStorage.setItem("profile", JSON.stringify(profile));
    document.getElementById("update-modal").classList.add("hidden");
  } else {
    alert("Failed to update profile");
  }
});

document
  .getElementById("update-bio")
  .addEventListener("input", updateCharCount);

function updateCharCount() {
  const bioValue = document.getElementById("update-bio").value;
  const remaining = 160 - bioValue.length;
  document.getElementById(
    "char-count"
  ).innerText = `${remaining} characters remaining`;
}

function closeModal() {
  document.getElementById("update-modal").classList.add("hidden");
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("update-modal");
  if (event.target === modal) {
    closeModal();
  }
});
