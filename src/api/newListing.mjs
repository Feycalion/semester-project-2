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
  const response = await fetch("https://v2.api.noroff.dev/listings", options);
  const result = await response.json();
  console.log(result);
} catch (e) {
  console.log(e);
}
