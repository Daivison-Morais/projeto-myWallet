import { serviceNewIn } from "../services/serviceNewIn.js";

export async function controllerNewIn(req, res) {

  const body = req.body;
  const { session } = req;

  try {
    await serviceNewIn(body, session);
    console.log(body)

    res.sendStatus(201);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(401).send({ error: error.message });
    }

    if (error.name === "ConflictError") {
      return res.status(409).send({ error: error.message });
    }

    return res.sendStatus(500);
  }
}
