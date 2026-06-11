import express from "express";
import { connectDB } from "./src/db/connection.js";

const app = express();

async function main() {
  try {
    await connectDB();
    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (err) {
    console.error("Failed to connect to mongoDB", err);
    process.exit(1);
  }
}

main();
