import load from "./utils/load.mjs";
import checkImage from "./utils/checkImage.mjs";

import { API_KEY, API_BASE, API_LISTINGS } from "../../index.mjs";

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
  const response = await fetch(API_BASE + API_LISTINGS, options);
  const listings = await response.json();

  listingsArray = listings.data;

  console.log(listings);

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
  listings.forEach((listing) => {
    const listingImage = checkImage(listing.media);
    const listingCard = document.createElement("a");
    listingCard.href = `singlelisting.html?id=${listing.id}`;

    console.log(listingImage[0].url);
    listingCard.classList.add("flex", "flex-col", "gap-4");

    listingCard.innerHTML = `<img src="${listingImage[0].url}" alt="${listingImage.alt}" class="aspect-square object-cover"/>
    <p class="text-2xl"> ${listing.title}</p>
    <p class="text-lightgray"> Ends at ${listing.endsAt}</p>
    <button class="flex items-center justify-center w-full py-3 border border-lightgray rounded-md font-medium"> Place bid </button>`;

    listingContainer.appendChild(listingCard);
  });
}

// const mappedListings = listings.map((listing) => {
//     if(listing.tags.includes("vintage")) {
//         return listing;
//     }
// })

// const filteredListings = listings.filter((lis) => lis.id !== listing.id)

// mappedListings.forEach(() => {

// })
