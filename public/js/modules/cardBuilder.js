import { getAllHoldings, removeHolding } from "./api.js";

const cardContainer = document.getElementById("holdings-card-container");

function formatCurrency(value) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return `$${Number(value).toFixed(2)}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

async function loadHoldingCards() {
  if (!cardContainer) {
    return;
  }

  try {
    const data = await getAllHoldings();
    const holdings = data.holdings || [];

    cardContainer.innerHTML = "";

    if (holdings.length === 0) {
      cardContainer.innerHTML = "<p>No holdings added yet.</p>";
      return;
    }

    holdings.forEach((holding) => {
      const cardColumn = document.createElement("div");
      cardColumn.className = "col-md-4";

      cardColumn.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <h5 class="card-title">${holding.ticker}</h5>
              <button 
                class="btn btn-sm btn-outline-danger remove-holding-btn"
                data-holding-id="${holding.holdingId}"
                aria-label="Remove ${holding.ticker}"
              >
                X
              </button>
            </div>

            <p class="card-text mb-1">
              <strong>Units:</strong> ${holding.units}
            </p>

            <p class="card-text mb-1">
              <strong>Purchase Date:</strong> ${formatDate(holding.purchaseDate)}
            </p>

            <p class="card-text mb-1">
              <strong>Purchase Price:</strong> ${formatCurrency(holding.purchasePrice)}
            </p>

            <p class="card-text mb-1">
              <strong>Current Value:</strong> ${formatCurrency(holding.currentValue)}
            </p>

            <p class="card-text mb-1">
              <strong>Gain/Loss:</strong> ${formatCurrency(holding.gainLoss)}
            </p>
          </div>
        </div>
      `;

      cardContainer.appendChild(cardColumn);
    });
  } catch (error) {
    console.error("Failed to load holding cards:", error.message);
    cardContainer.innerHTML = "<p>Unable to load holdings.</p>";
  }
}

cardContainer?.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("remove-holding-btn")) {
    return;
  }

  const holdingId = event.target.dataset.holdingId;

  try {
    await removeHolding(holdingId);
    window.location.reload();
  } catch (error) {
    console.error("Failed to remove holding:", error.message);
    alert(`Failed to remove holding: ${error.message}`);
  }
});

loadHoldingCards();
