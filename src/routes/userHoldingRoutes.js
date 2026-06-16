import express from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { addHolding } from "../modules/stockData.js";
import { getHistoricalPrices } from "../modules/stockData.js";

const router = express.Router();

router.post("/add", requireAuth, (req, res) => {});
