import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { addHolding, removeHolding, getAllHoldings } from "../modules/users.js";
import { getHistoricalPrices } from "../modules/stockData.js";

const router = express.Router();

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

router.post("/add", requireAuth, async (req, res) => {
  const { ticker, purchaseDate, units } = req.body;
  const userId = req.session.user.id;

  try {
    if (!ticker || !purchaseDate || !units) {
      return res.status(400).json({
        error: "Ticker, purchase date, and units are required.",
      });
    }

    const date = new Date(purchaseDate);

    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({
        error: "Invalid purchase date.",
      });
    }

    const unitsNumber = Number(units);

    if (Number.isNaN(unitsNumber) || unitsNumber <= 0) {
      return res.status(400).json({
        error: "Units must be a number greater than 0.",
      });
    }

    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 7);

    const prices = await getHistoricalPrices(ticker, date, endDate);

    if (!prices || prices.length === 0) {
      return res.status(404).json({
        error: `No historical prices found for ${ticker}. Try another ticker or purchase date.`,
      });
    }

    const purchasePrice = prices[0].close;

    await addHolding(userId, ticker, date, purchasePrice, unitsNumber);

    res.status(201).json({
      ticker,
      purchaseDate: date,
      purchasePrice,
      units: unitsNumber,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/remove", requireAuth, async (req, res) => {
  const { holdingId } = req.body;
  const userId = req.session.user.id;

  try {
    if (!holdingId) {
      return res.status(400).json({ error: "holdingId is required" });
    }

    const removedHolding = await removeHolding(userId, holdingId);

    if (removedHolding.modifiedCount === 0) {
      return res.status(404).json({ error: "holding not found" });
    }

    res.status(200).json({ removed: { holdingId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", requireAuth, async (req, res) => {
  const userId = req.session.user.id;

  try {
    const user = await getAllHoldings(userId);
    const holdings = user?.holdings || [];

    if (holdings.length === 0) {
      return res.status(200).json({
        holdings: [],
        portfolioHistory: [],
      });
    }

    const portfolioByDate = new Map();

    const calculatedHoldings = await Promise.all(
      holdings.map(async (holding) => {
        const ticker = holding.ticker;
        const units = Number(holding.units);
        const purchasePrice = Number(holding.purchasePrice);
        const purchaseDate = new Date(holding.purchaseDate);

        const prices = await getHistoricalPrices(
          ticker,
          purchaseDate,
          getTomorrow(),
        );

        if (prices.length === 0) {
          return {
            ...holding,
            currentPrice: null,
            currentValue: null,
            gainLoss: null,
          };
        }

        prices.forEach((priceRecord) => {
          const dateKey = formatDate(priceRecord.date);
          const dailyValue = Number(priceRecord.close) * units;

          portfolioByDate.set(
            dateKey,
            (portfolioByDate.get(dateKey) || 0) + dailyValue,
          );
        });

        const latestPrice = Number(prices[prices.length - 1].close);
        const currentValue = latestPrice * units;
        const originalValue = purchasePrice * units;
        const gainLoss = currentValue - originalValue;

        return {
          ...holding,
          currentPrice: latestPrice,
          currentValue,
          gainLoss,
        };
      }),
    );

    const portfolioHistory = Array.from(portfolioByDate.entries())
      .map(([date, value]) => ({
        date,
        value,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({
      holdings: calculatedHoldings,
      portfolioHistory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
