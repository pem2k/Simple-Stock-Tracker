import Alpaca from "@alpacahq/alpaca-trade-api";

// client setup
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY,
  secretKey: process.env.ALPACA_API_SECRET,
  paper: true,
});

// Alpaca API call, this return will be appened to the list of data retrieved from
// yahoo finance, this allows intraday value checks. Need to be careful here with timing though
// should probably include an edgecase for if this is checked outside of
// trading hours so I dont get duplicate points on the graph,
// e.g. yahoo finance close and alpaca close both being reported.
export async function getLatestPrice(ticker) {
  const snapshot = await alpaca.getSnapshot(ticker);
  return {
    ticker,
    date: new Date(snapshot.latestTrade.Timestamp),
    price: snapshot.LatestTrade.Price,
  };
}
