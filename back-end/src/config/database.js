import { MongoClient } from "mongodb";

let db;
const mongoClient = new MongoClient("mongodb://db_mongo:27017");

try {
  mongoClient.connect();
  db = mongoClient.db("wallet");
} catch (error) {
  console.log(error);
}

export default db;
