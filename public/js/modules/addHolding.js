const form = document.getElementById("add-holding-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const ticker = document.getElementById("ticker").value;
  const purchaseDate = document.getElementById("purchase-date").value;

  try {
    const res = await fetch("/api/userHoldings/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker, purchaseDate }),
    });

    const data = await res.json();
    // TODO: Remove this after testing.
    console.log("Added:", data);
    form.reset();
  } catch (err) {
    console.error("Failed to add holding:", err);
  }
});
