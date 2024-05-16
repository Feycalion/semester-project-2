import { API_KEY, API_BASE, API_LISTINGS, API_PROFILES } from "../../index.mjs";
import load from "./utils/load.mjs";

const profile = load("profile");

async function updateProfile(bio) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      description: bio,
    }),
  };

  const response = await fetch(API_BASE + API_PROFILES + "/chili999", options);

  const result = await response.json();

  console.log(result);
}

updateProfile("aaaaaaaaaaa");
