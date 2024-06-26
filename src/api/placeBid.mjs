import { API_KEY, API_BASE, API_LISTINGS } from "../../index.mjs";
import load from "./utils/load.mjs";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

document
  .getElementById("bidForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const profile = load("profile");

    const amountInput = document.getElementById("amount-input");
    const placeBidBtn = document.getElementById("place-bid-btn");
    const amount = amountInput.value;

    amountInput.addEventListener("keyup", (e) => {
      console.log(e.target.value);
    });

    profile.credits = profile.credits - amount;
    localStorage.setItem("profile", JSON.stringify(profile));
    document.getElementById("credits").innerText = "$" + profile.credits;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        amount: +amount,
      }),
    };

    try {
      const response = await fetch(
        API_BASE + API_LISTINGS + id + "/bids",
        options
      );
      const result = await response.json();
      console.log("Bid placed:", result);
      if (response.ok) {
        window.location.href = "/singlelisting.html?id=" + id;
      }
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  });
