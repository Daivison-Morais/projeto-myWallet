import { serviceListTransactions } from "../services/serviceListTransactions.js";

export async function controllerListTransactions(req, res) {
const authorization = req.headers.authorization;

  try {
    const transactions = await serviceListTransactions(authorization);
    res.status(200).send(transactions);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      res.status(401).send({ error: error.message });
    }
    console.error(error);
    res.sendStatus(500);
  }
}
