import { getDB } from "./connection.js";

const STOCK_HISTORY_COLLECTION = "stockHistory";

// get all daily records for a specific ticker
export async function getByTickerAndDateRange(ticker, startDate, endDate) {
  return getDB()
    .collection(STOCK_HISTORY_COLLECTION)
    .find({ ticker, date: { $gte: startDate, $lte: endDate } })
    .sort({ date: 1 })
    .toArray();
}

// update ticker record if it exists, insert it if it doesn't.
export async function upsertDailyRecords(records) {
  const db = getDB();
  const ops = records.map((record) => ({
    updateOne: {
      filter: { ticker: record.ticker, date: record.date },
      update: { $set: record },
      upsert: true,
    },
  }));

  return db.collection(STOCK_HISTORY_COLLECTION).bulkWrite(ops);
}
