import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();
import {
  getByTickerAndDateRange,
  upsertDailyRecords,
} from "../db/stockHistory.js";

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

  return records;
}
