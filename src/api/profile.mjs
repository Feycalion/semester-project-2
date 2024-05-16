import load from "./utils/load.mjs";
import { API_KEY, API_BASE, API_LISTINGS, API_PROFILES } from "../../index.mjs";

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
}

accessProfile();
