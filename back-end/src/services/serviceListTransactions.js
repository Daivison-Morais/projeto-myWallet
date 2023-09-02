import unauthorizedError from "../errors/unauthorized-error.js";
import { listTransactions } from "../repository/repositoryListTransactions.js";
import { findSession } from "../repository/repositoryNewIn.js";

export async function serviceListTransactions(authorization) {
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw unauthorizedError();
  }

  const session = await findSession(token);
  if (!session) {
    throw unauthorizedError();
  }
  const transactions = await listTransactions(session.userId);
  return transactions;
}
