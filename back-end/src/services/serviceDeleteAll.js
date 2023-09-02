import { deleteAllTransaction } from "../repository/RepositoryDelete.js";
import { findSession, findUser } from "../repository/repositoryNewIn.js";

export async function serviceDeleteAll(authorization){

    const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw unauthorizedError();
  }

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