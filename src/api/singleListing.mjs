import { API_KEY, API_BASE, API_LISTINGS } from "../../index.mjs";
import checkImage from "./utils/checkImage.mjs";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function singleListing() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(
    API_BASE + API_LISTINGS + id + "?_bids=true&_seller=true",
    options
  );
  const result = await response.json();
  //console.log(result);

  displayListing(result.data);
}

singleListing();

function displayListing(listing) {
  const listingContainer = document.getElementById("listing-container");
  listingContainer.querySelector("h1").innerHTML = listing.title;
  listingContainer.querySelector("img").src = listing.media[0].url;
  listingContainer.querySelector("p").innerHTML = formatTimeRemaining(
    listing.endsAt
  );

  const listingInfo = document.getElementById("listing-info");
  listingInfo.querySelector("img").src = listing.seller.avatar.url;
  listingInfo.querySelector(
    "h3"
  ).innerHTML = `Created by ${listing.seller.name}`;
  listingInfo.querySelector("p").innerHTML = listing.description;

  const bidsContainer = document.getElementById("bids-container");
  const bidsList = document.getElementById("bids-list");

  bidsList.innerHTML = "";

  listing.bids.forEach((bid) => {
    const bidItem = document.createElement("p");

    bidItem.innerHTML = `${listing.bids[0].bidder.name} bid ${bid.amount} dollars`;
    bidsContainer.appendChild(bidItem);
  });
}

function formatTimeRemaining(endsAt) {
  const end = new Date(endsAt);
  const now = new Date();
  const timeRemaining = end - now;

  if (timeRemaining <= 0) {
    return "Listing has ended";
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return `Listing ends in ${days}d ${hours}h ${minutes}m`;
}
