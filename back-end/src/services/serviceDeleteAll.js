import { deleteAllTransaction } from "../repository/RepositoryDelete.js";
import { findSession, findUser } from "../repository/repositoryNewIn.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function serviceDeleteAll(authorization){

    const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw unauthorizedError();
  }

  jwt.verify(token, process.env.JWT_SECRET);

  const session = await findSession(token);
  if (!session) {
    throw unauthorizedError();
  }

  const user = await findUser(session.userId);
  if (!user) {
    throw unauthorizedError();
  }

  await deleteAllTransaction(session.userId);

}