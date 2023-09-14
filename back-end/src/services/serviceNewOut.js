import conflictError from "../errors/conflitError.js";
import unauthorizedError from "../errors/unauthorized-error.js";
import {
  createTransaction,
  findSession,
  findUser,
} from "../repository/repositoryNewOut.js";
import { schemaTransactions } from "../schemas/allSchemas.js";

export async function serviceNewOut(body, session) {

  const validation = schemaTransactions.validate(body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((value) => value.message);
    throw conflictError(errors);
  }

  const user = await findUser(session.userId);
  if (!user) {
    throw unauthorizedError();
  }

  return await createTransaction(session.userId, body);
}
