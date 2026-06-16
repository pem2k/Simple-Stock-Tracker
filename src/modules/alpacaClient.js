import Alpaca from "@alpacahq/alpaca-trade-api";

// client setup
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY,
  secretKey: process.env.ALPACA_API_SECRET,
  paper: true,
});

// changed my thoughts on this a bit, self containing the trading hours check
// this also doesn't rely on client time, only on if the market is open or not,
// I think it's better. All I have to do is null check in stockdata.js
export async function getLatestPrice(ticker) {
  const clock = await alpaca.getClock();
  if (clock.is_open) {
    const snapshot = await alpaca.getSnapshot(ticker);
    return {
      ticker,
      date: new Date(snapshot.LatestTrade.Timestamp),
      price: snapshot.LatestTrade.Price,
    };
  } else {
    return null;
  }
}
