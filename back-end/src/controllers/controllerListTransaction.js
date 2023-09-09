import { serviceListTransactions } from "../services/serviceListTransactions.js";

export async function controllerListTransactions(req, res) {
const authorization = req.headers.authorization;

  try {
    const transactions = await serviceListTransactions(authorization);
    return res.status(200).send(transactions);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(401).send({ error: error.message });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: "A sessão foi encerrada." });
    }

    return res.sendStatus(500);
  }
}
