import express from "express";
import session from "express-session";
// db
import { connectDB } from "./src/db/connection.js";
// routes import
import authRoutes from "./src/routes/authRoutes.js";
import stockRoutes from "./src/routes/stockRoutes.js";
import userHoldingRoutes from "./src/routes/userHoldingRoutes.js";

// middleware
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // if the session info isnt changed don't save it
    resave: false,
    //no session for logged out people:
    saveUninitialized: false,
  }),
);

app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/userHoldings", userHoldingRoutes);

app.get("/dashboard", (req, res) => {
  res.sendFile("public/pages/portfolioDashboard.html", { root: "." });
});

async function main() {
  // Database connection
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to mongoDB", err);
    process.exit(1);
  }
}

main();
