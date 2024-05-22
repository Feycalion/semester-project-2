import { API_KEY, API_BASE, API_LISTINGS } from "../../index.mjs";
import load from "./utils/load.mjs";
import checkImage from "./utils/checkImage.mjs";

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
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(API_BASE + API_LISTINGS + id, options);
  const result = await response.json();
  console.log(result);
}

singleListing();

function singleListing(listing) {
  const listingContainer = document.getElementById("listing-container");
  listingContainer.classList.add("px-4", "py-[60px]", "md:py-[120px]");
  const listingTitle = document.getElementById("listing-title");
  const listingImage = checkImage(listing.media);
  const listingInfo = document.getElementById("listing-info");

  postInfo.innerHTML = `
   <img src="${post.author?.avatar?.url}" class="w-10 h-10 rounded-full mr-4 object-cover" />
   <p class="font-bold">${post.author?.name}</p>
   `;

  postCard.innerHTML += `
    ${postInfo.outerHTML}
    <h2 class="text-xl font-bold mb-4">${post.title}</h2>
    <img src="${postImage.url}" alt="${postImage.alt}" class="flex items-center mb-4"/>
    <p class="mt-4 text-lg leading-relaxed">${post.body}</p>
    
    `;

  const tagsContainer = createTagsContainer(post.tags);
  postCard.appendChild(tagsContainer);

  const postContainer = document.getElementById("single-post-container");

  postContainer.appendChild(postCard);
}
