import conflictError from "../errors/conflitError.js";
import unauthorizedError from "../errors/unauthorized-error.js";
import {
  createTransaction,
  findSession,
  findUser,
} from "../repository/repositoryNewOut.js";
import { schemaTransactions } from "../schemas/allSchemas.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function serviceNewOut(body, authorization) {

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw unauthorizedError();
  }

  jwt.verify(token, process.env.JWT_SECRET);

  const validation = schemaTransactions.validate(body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((value) => value.message);
    throw conflictError(errors);
  }

  const session = await findSession(token);
  if (!session) {
    throw unauthorizedError();
  }

  const user = await findUser(session.userId);
  if (!user) {
    throw unauthorizedError();
  }

  return await createTransaction(session.userId, body);
}
