import load from "./utils/load.mjs";
import { API_KEY, API_BASE, API_BIDS, API_PROFILES } from "../../index.mjs";

const user = load("profile");

async function bidsByProfile() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  const response = await fetch(
    API_BASE + API_PROFILES + user.name + API_BIDS,
    options
  );

  const result = await response.json();

  if (response.ok) {
    printBids(result.data);
  } else {
    console.error("Failed to fetch bids");
  }
}

bidsByProfile();

const bidsContainer = document.getElementById("bids-container");
const bidsList = document.getElementById("bids-list");

const myBids = document.createElement("h2");
myBids.innerHTML = "My bids";

function printBids(bids) {
  bidsList.innerHTML = "";

  bids.forEach((bid) => {
    const bidItem = document.createElement("p");
    bidItem.innerHTML = `You bid ${bid.amount} dollars on <strong>${
      bid.listing.title
    }</strong>. Listing ends in ${formatTimeRemaining(bid.listing.endsAt)}.`;
    bidsContainer.appendChild(bidItem);
  });
}

function formatTimeRemaining(endsAt) {
  const end = new Date(endsAt);
  const now = new Date();
  const timeRemaining = end - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
}

formatTimeRemaining();
