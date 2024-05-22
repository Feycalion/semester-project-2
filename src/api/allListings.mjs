import load from "./utils/load.mjs";
import checkImage from "./utils/checkImage.mjs";

import { API_KEY, API_BASE, API_LISTINGS, API_TAG } from "../../index.mjs";

let listingsArray = [];

const user = load("profile");

async function getListings() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(API_BASE + API_LISTINGS + API_TAG, options);
  const listings = await response.json();

  console.log(listings.data);

  // const preFilteredListings = listings.data.filter((listing) => {
  //   return listing.tags.some((tag) => tag.trim() === "vintage");
  // });

  /*
  const preFilteredListings = listings.data.filter(
    (listing) =>
    console.log(listing);
    

      listing.media.length > 0 &&
      listing.tags.some((tag) => tag.trim().toLowerCase() === "vintage")
     
  );

  */

  // const sortedListings = preFilteredListings.sort(
  //   (a, b) => new Date(b.created) - new Date(a.created)

  // );

  listingsArray = listings.data;

  printListings(listingsArray);
}

getListings();

const searchBar = document.getElementById("search-bar");
const listingContainer = document.getElementById("card-container");

searchBar.addEventListener("keyup", (e) => {
  const filteredResult = listingsArray.filter((listing) =>
    listing.title.includes(e.target.value)
  );
  listingContainer.innerHTML = "";
  printListings(filteredResult);
});

function printListings(listings) {
  listingContainer.innerHTML = "";
  listings.forEach((listing) => {
    const listingImage = checkImage(listing.media);
    const listingCard = document.createElement("a");
    listingCard.href = `singlelisting.html?id=${listing.id}`;

    console.log(listingImage[0].url);
    listingCard.classList.add("flex", "flex-col", "gap-4");

    listingCard.innerHTML = `<img src="${listingImage[0].url}" alt="${
      listingImage.alt
    }" class="aspect-square object-cover"/>
    <p class="text-2xl"> ${listing.title}</p>
    <p class="text-lightgray"> #${listing.tags.join(", ")}</p>
    <p class="text-lightgray"> ${formatTimeRemaining(listing.endsAt)}</p>
    <button class="flex items-center justify-center w-full py-3 border border-lightgray rounded-md font-medium"> Place bid </button>`;

    listingContainer.appendChild(listingCard);
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

  return `Ends in ${days}d ${hours}h ${minutes}m`;
}

// const mappedListings = listings.map((listing) => {
//     if(listing.tags.includes("vintage")) {
//         return listing;
//     }
// })

// const filteredListings = listings.filter((lis) => lis.id !== listing.id)

// mappedListings.forEach(() => {

// })
