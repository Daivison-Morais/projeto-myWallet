import conflictError from "../errors/conflitError.js";
import unauthorizedError from "../errors/unauthorized-error.js";
import {
  createTransaction,
  findSession,
  findUser,
} from "../repository/repositoryNewIn.js";
import { schemaTransactions } from "../schemas/allSchemas.js";

export async function serviceNewIn(body, authorization) {

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw unauthorizedError();
  }

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

  await createTransaction(session.userId, body);
}
