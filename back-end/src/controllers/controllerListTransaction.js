import { serviceListTransactions } from "../services/serviceListTransactions.js";

export async function controllerListTransactions(req, res) {
const { session } = req;
  try {
    const transactions = await serviceListTransactions(session);
    return res.status(200).send(transactions);
    
  } catch (error) {
    console.log(error)
    if (error.name === "UnauthorizedError") {
      return res.status(401).send({ error: error.message });
    }
    return res.sendStatus(500);
  }
}
