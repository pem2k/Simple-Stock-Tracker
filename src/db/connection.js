import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
});

let db;

export async function connectDB() {
  await client.connect();
  db = client.db(process.env.MONGO_DB_NAME);
  console.log("Connected to MongoDB:", process.env.MONGO_DB_NAME);
}

export function getDB() {
  return db;
}
