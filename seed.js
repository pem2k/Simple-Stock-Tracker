import crypto from "crypto";
import { connectDB } from "./src/db/connection.js";
import { createUser, addHolding } from "./src/modules/users.js";
import { getHistoricalPrices } from "./src/modules/stockData.js";

const TICKERS = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "TSLA",
  "NVDA",
  "META",
  "NFLX",
  "DIS",
  "JPM",
  "V",
  "WMT",
  "KO",
  "PEP",
  "BA",
  "INTC",
  "AMD",
  "PYPL",
  "SQ",
  "UBER",
];

// spread purchase dates across 2024-2025
function randomDate() {
  const start = new Date("2024-01-02");
  const end = new Date("2025-06-01");
  const d = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  // skip weekends
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

function randomUnits() {
  return Math.floor(Math.random() * 50) + 1;
}

async function seed() {
  await connectDB();

  for (let i = 1; i <= 20; i++) {
    const username = `user${i}`;
    const password = crypto.randomUUID();

    let user;
    try {
      user = await createUser(username, password);
      console.log(`Created ${username}`);
    } catch (err) {
      console.log(`${username} already exists, skipping. ${err}`);
      continue;
    }

    // each user gets 8-15 random holdings
    const holdingCount = Math.floor(Math.random() * 8) + 8;

    for (let j = 0; j < holdingCount; j++) {
      const ticker = TICKERS[Math.floor(Math.random() * TICKERS.length)];
      const purchaseDate = randomDate();
      const units = randomUnits();

      try {
        const endDate = new Date(purchaseDate);
        endDate.setDate(endDate.getDate() + 7);
        const prices = await getHistoricalPrices(ticker, purchaseDate, endDate);

        if (prices.length === 0) {
          console.log(
            `  No prices for ${ticker} on ${purchaseDate.toISOString().split("T")[0]}, skipping`,
          );
          continue;
        }

        const purchasePrice = prices[0].close;
        await addHolding(user._id, ticker, purchaseDate, purchasePrice, units);
        console.log(
          `  Added ${units}x ${ticker} @ ${purchasePrice} on ${purchaseDate.toISOString().split("T")[0]}`,
        );
      } catch (err) {
        console.log(`  Failed ${ticker}: ${err.message}`);
      }
    }
  }

  console.log("Done seeding.");
  process.exit(0);
}

seed();
