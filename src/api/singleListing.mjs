import { API_KEY, API_BASE, API_LISTINGS } from "../../index.mjs";
import load from "./utils/load.mjs";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

const user = load("profile");

if (user) {
  console.log("logged in");
} else {
  console.log("logged out");
}

async function singleListing() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    API_BASE + API_LISTINGS + "/25cc3015-1761-43c6-aa09-e777da082dab",
    options
  );
  const result = await response.json();
  console.log(result);
}

singleListing();
