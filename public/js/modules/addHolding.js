import { addHolding } from "./api.js";

/*
  addHolding.js

  This file handles the Add Holding form on portfolioDashboard.html.

  It does NOT use fetch() directly anymore.
  Instead, it imports addHolding() from api.js.

  That keeps all backend API calls centralized in one file.
*/

// Get the form from the HTML page using its id.
const form = document.getElementById("add-holding-form");

/*
  Safety check - 
  If this JavaScript file loads on a page that does not have this form,
  stop here so the page does not crash.
*/
if (form) {
  form.addEventListener("submit", async (event) => {
    // Prevent the browser from refreshing the page after form submit.
    event.preventDefault();

    // Get the ticker value from the input.
    // .trim() removes extra spaces.
    // .toUpperCase() changes "aapl" into "AAPL".
    const ticker = document.getElementById("ticker").value.trim().toUpperCase();

    // Get the purchase date from the date input.
    const purchaseDate = document.getElementById("purchase-date").value;

    // Basic validation.
    if (!ticker || !purchaseDate) {
      console.error("Ticker and purchase date are required.");
      return;
    }

    try {
      /*
        addHolding() comes from api.js.

        It sends this request:
        POST /api/userHoldings/add

        And it sends:
        {
          ticker,
          purchaseDate
        }
      */
      const data = await addHolding(ticker, purchaseDate);

      // Later, show this on the page instead of only console.log.
      console.log("Added holding:", data);

      // Clear the form after successful submit.
      form.reset();
    } catch (error) {
      // If the backend returns an error, show it in the console for now.
      console.error("Failed to add holding:", error.message);
    }
  });
}
