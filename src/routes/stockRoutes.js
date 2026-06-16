import express from "express";
import { getHistoricalPrices } from "../modules/stockData.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/stocks/ticker
router.post("/ticker", requireAuth, async (req, res) => {
  const { ticker, startDate } = req.body;

  //changed this out from yesterday to today, there was a gap, if closing cut yesterday,
  // but markets were closed, data would be one day stale.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const prices = await getHistoricalPrices(
      ticker,
      new Date(startDate),
      today,
    );
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
