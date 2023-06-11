import { serviceNewIn } from "../services/serviceNewIn.js";

export async function controllerNewIn(req, res) {
  const body = req.body;
  let authorization = req.headers.authorization;

  try {
    await serviceNewIn(body, authorization);
    
    res.send(201);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      res.status(401).send({ error: error.message });
    }

    if (error.name === "ConflictError") {
      res.status(409).send({ error: error.message });
    }

    console.error(error);
    res.sendStatus(500);
  }
}
