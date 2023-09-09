import unauthorizedError from "../errors/unauthorized-error.js";
import { listTransactions } from "../repository/repositoryListTransactions.js";
import { findSession } from "../repository/repositoryNewIn.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function serviceListTransactions(authorization) {
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw unauthorizedError();
  }



  jwt.verify(token, process.env.JWT_SECRET);

  const session = await findSession(token);
  if (!session) {
    throw unauthorizedError();
  }
  const transactions = await listTransactions(session.userId);
  return transactions;
}
