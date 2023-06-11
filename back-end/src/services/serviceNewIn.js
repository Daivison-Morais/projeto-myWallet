import conflictError from "../errors/conflitError.js";
import unauthorizedError from "../errors/unauthorized-error.js";
import {
  createTransaction,
  findSession,
  findUser,
} from "../repository/repositoryNewIn.js";
import { schemaTransactions } from "../schemas/allSchemas.js";

export async function serviceNewIn(body, token) {
  const validation = schemaTransactions.validate(body, { abortEarly: true });  

  if (validation.error) {
    const errors = validation.error.details?.map((value) => value.message);
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
