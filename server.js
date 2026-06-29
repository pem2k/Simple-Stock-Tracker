import express from "express";
import session from "express-session";
// db
import { connectDB } from "./src/db/connection.js";
// routes import
import authRoutes from "./src/routes/authRoutes.js";
import userHoldingRoutes from "./src/routes/userHoldingRoutes.js";
import { requireAuth } from "./src/middleware/authMiddleware.js";

// middleware
const app = express();
const PORT = process.env.PORT || 3001;

// PEER REVIEW: if SESSION_SECRET is missing, express-session just signs cookies
// with `undefined` and keeps going. Better to bail out here so it's obvious.
// if (!process.env.SESSION_SECRET) {
//   throw new Error("SESSION_SECRET is required");
// }

// PEER REVIEW: Heroku sits in front of the app as an HTTPS proxy, so this is
// needed for the secure cookie below to actually work in production.
// app.set("trust proxy", 1);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // if the session info isnt changed don't save it
    resave: false,
    //no session for logged out people:
    saveUninitialized: false,
    // PEER REVIEW: the cookie is using defaults right now. httpOnly keeps JS
    // from reading it, secure keeps it on HTTPS in prod, sameSite helps with
    // CSRF, and maxAge means sessions don't live forever.
    // cookie: {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    //   maxAge: 1000 * 60 * 60 * 24, // 1 day
    // },
  }),
);

app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/userHoldings", userHoldingRoutes);

app.get("/", (req, res) => {
  res.sendFile("public/pages/login.html", { root: "." });
});

app.get("/signup", (req, res) => {
  res.sendFile("public/pages/signup.html", { root: "." });
});

app.get("/dashboard", requireAuth, (req, res) => {
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
