import express from "express";
import { getHistoricalPrices } from "../modules/stockData.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/stocks/ticker
router.post("/ticker", requireAuth, async (req, res) => {
  const { ticker, startDate } = req.body;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  try {
    const prices = await getHistoricalPrices(
      ticker,
      new Date(startDate),
      yesterday,
    );
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
