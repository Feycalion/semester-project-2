async function getListings() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "https://v2.api.noroff.dev/auction/listings",
    options
  );
  const result = await response.json();
  console.log(result);
}

getListings();
