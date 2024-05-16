import { API_KEY, API_BASE, API_LISTINGS } from "../../index.mjs";

const listingData = {
  title,
  description,
  tags,
  media: {
    url: imageUrl,
    alt: "",
  },
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(listingData),
};

try {
  const response = await fetch(API_BASE + API_LISTINGS, options);
  const result = await response.json();
  console.log(result);
} catch (e) {
  console.log(e);
}
