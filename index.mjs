export const API_KEY = "7027b58d-38ee-4a6c-aa34-e4634ffab78c";

export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_KEY_URL = "/create-api-key";
export const API_LISTINGS = "/auction/listings/";
export const API_POST = "/posts";
export const API_PROFILES = "/auction/profiles/";
export const API_BIDS = "/bids?_listings=true";
export const API_TAG = "?_tag=vintage";

import logOut from "./src/api/utils/logOut.mjs";
import load from "./src/api/utils/load.mjs";
import checkImage from "./src/api/utils/checkImage.mjs";

const user = load("profile");

const authLinks = document.getElementById("register");
const userProfile = document.getElementById("avatar");
const dropdown = document.getElementById("dropdown");
const profileImage = document.getElementById("profile-img");
const credits = document.getElementById("credits");

document.addEventListener("DOMContentLoaded", () => {
  // Log out
  const logOutLink = document.getElementById("logout");
  logOutLink.addEventListener("click", (e) => {
    e.preventDefault();
    logOut();
  });

  // Toggle based on user being logged in

  if (user) {
    credits.innerText = "$" + user.credits;
    profileImage.src = checkImage(user.avatar.url);
    authLinks.classList.add("hidden");
    userProfile.classList.remove("hidden");
  } else {
    authLinks.classList.remove("hidden");
    userProfile.classList.add("hidden");
  }

  // Toggle dropdown menu when clicking on profile image
  profileImage.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });
});
