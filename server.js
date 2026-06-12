import express from "express";
import session from "express-session";
import { connectDB } from "./src/db/connection.js";

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
