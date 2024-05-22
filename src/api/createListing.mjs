import { API_KEY, API_BASE, API_LISTINGS } from "../../index.mjs";
import load from "./utils/load.mjs";

const createListingBtn = document.getElementById("create-listing-btn");
const createListingModal = document.getElementById("create-modal");

document.getElementById("create-listing-btn").addEventListener("click", () => {
  document.getElementById("create-modal").classList.remove("hidden");
});

document.getElementById("create-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const listingTitle = document.getElementById("listing-title").value;
  const listingImage = document.getElementById("listing-image").value;
  const listingDesc = document.getElementById("listing-description").value;
  const listingDeadline = document.getElementById("listing-deadline").value;
  const listingTags = document
    .getElementById("listing-tags")
    .value.split(",")
    .map((tag) => tag.trim());

  const profile = load("profile");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      title: listingTitle,
      media: [
        {
          url: listingImage,
          alt: "",
        },
      ],
      description: listingDesc,
      tags: listingTags,
      endsAt: listingDeadline,
    }),
  };

  try {
    const response = await fetch(API_BASE + API_LISTINGS, options);
    const result = await response.json();

    if (response.ok) {
      console.log("Listing created successfully:", result);

      createListingModal.classList.add("hidden");
    } else {
      console.error("Error creating listing:", result);
    }
  } catch (error) {
    console.error("Error creating listing:", error);
  }
});

document
  .getElementById("listing-description")
  .addEventListener("input", updateCharCountDesc);

function updateCharCountDesc() {
  const descValue = document.getElementById("listing-description").value;
  const remaining = 280 - descValue.length;
  document.getElementById(
    "char-count-desc"
  ).innerText = `${remaining} characters remaining`;
}

function closeModal() {
  createListingModal.classList.add("hidden");
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("create-modal");
  if (event.target === modal) {
    closeModal();
  }
});
