import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { addHolding } from "../modules/users.js";
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

router.post("/remove", requireAuth, async (req, res) => {
  // this is going to be a little more work, I need to pull the user,
  // find the holding, and then remove it from the array.
});

export default router;
