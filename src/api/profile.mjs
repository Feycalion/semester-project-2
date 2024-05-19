import load from "./utils/load.mjs";
import { API_KEY, API_BASE, API_LISTINGS, API_PROFILES } from "../../index.mjs";
import checkImage from "./utils/checkImage.mjs";

const user = load("profile");

console.log(user);

async function accessProfile() {
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

  console.log(result);

  displayprofile();
}

accessProfile();

function displayprofile(profile) {
  console.log(profile);

  const profileContainer = document.getElementById("profile-container");
  profileContainer.querySelector("h1").innerHTML = user.name;

  const profileImage = profileContainer.querySelector("img");
  profileImage.src = checkImage(profile.avatar);
  profileImage.alt = `${profile.name}'s avatar`;

  profileContainer.getElementsById("bio").textContent = user.bio;
}
