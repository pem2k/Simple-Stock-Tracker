import express from "express";
import { connectDB } from "./src/db/connection.js";

const app = express();
const PORT = process.env.PORT || 3001;

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
