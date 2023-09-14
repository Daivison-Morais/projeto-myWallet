import { deleteAllTransaction } from "../repository/RepositoryDelete.js";
import { findSession, findUser } from "../repository/repositoryNewIn.js";
import dotenv from "dotenv";
dotenv.config();

export async function serviceDeleteAll(session){

  const user = await findUser(session.userId);
  if (!user) {
    throw unauthorizedError();
  }

  await deleteAllTransaction(session.userId);

}