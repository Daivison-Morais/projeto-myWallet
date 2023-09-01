import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  mongoClient.connect();
  db = mongoClient.db("wallet");
} catch (error) {
  console.log(error);
}

export default db;
