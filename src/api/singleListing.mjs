async function singleListing() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "https://v2.api.noroff.dev/auction/listings/25cc3015-1761-43c6-aa09-e777da082dab",
    options
  );
  const result = await response.json();
  console.log(result);
}

singleListing();
