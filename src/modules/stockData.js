import YahooFinance from "yahoo-finance2";
import { getLatestPrice } from "./alpacaClient.js";
import {
  getByTickerAndDateRange,
  upsertDailyRecords,
} from "../db/stockHistory.js";
const yahooFinance = new YahooFinance();

// returns daily prices for a ticker between two dates
// checks DB cache first, fetches from yahoo finance on miss
export async function getHistoricalPrices(ticker, startDate, endDate) {
  const cached = await getByTickerAndDateRange(ticker, startDate, endDate);

  if (cached.length > 0) {
    const firstDate = cached[0].date;
    const lastDate = cached[cached.length - 1].date;

    if (firstDate <= startDate && lastDate >= endDate) {
      return cached;
    }
  }

  const result = await yahooFinance.chart(ticker, {
    period1: startDate,
    period2: endDate,
    interval: "1d",
  });

  const records = result.quotes.map((entry) => ({
    ticker,
    date: entry.date,
    close: entry.close,
  }));

  await upsertDailyRecords(records);
  // this gets null if it's outside of the trading day, that way we know it's safe to
  // rely on the yahoo finance close, but if it's checked in the middle of the day, it gets
  // the current price which is injected as a record in the response.
  try {
  const latest = await getLatestPrice(ticker);

  if (latest) {
    records.push({
      ticker,
      date: latest.date,
      close: latest.price,
    });
  }
} catch (err) {
  console.warn("Could not fetch latest Alpaca price:", err.message);
}

  return records;
}
