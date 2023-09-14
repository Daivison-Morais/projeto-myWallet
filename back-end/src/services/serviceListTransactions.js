import { listTransactions } from "../repository/repositoryListTransactions.js";

export async function serviceListTransactions(session) {
  
  return await listTransactions(session.userId);
}
