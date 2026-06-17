import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { addHolding, removeHolding } from "../modules/users.js";
import { getHistoricalPrices } from "../modules/stockData.js";

const router = express.Router();

router.post("/add", requireAuth, async (req, res) => {
  const { ticker, purchaseDate } = req.body;
  const userId = req.session.user.id;
  try {
    const date = new Date(purchaseDate);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const prices = await getHistoricalPrices(ticker, date, nextDay);
    const purchasePrice = prices[0].close;
    await addHolding(userId, ticker, date, purchasePrice);
    res.status(201).json({ ticker, purchaseDate: date, purchasePrice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/remove", requireAuth, async (req, res) => {
  const { ticker, purchaseDate } = req.body;
  const userId = req.session.user.id;
  try {
    const removedHolding = await removeHolding(userId, ticker, purchaseDate);
    if (removedHolding.modifiedCount === 0) {
      return res.status(404).json({ error: "holding not found" });
    }
    res.status(200).json({ removed: { ticker, purchaseDate } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
