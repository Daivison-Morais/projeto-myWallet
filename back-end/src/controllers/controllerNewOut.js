import { serviceNewOut } from "../services/serviceNewOut.js";

export async function controllerNewOut(req, res) {
  const body = req.body;
  let authorization = req.headers.authorization;

  try {
    await serviceNewOut(body, authorization);
    res.sendStatus(201);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(401).send({ error: error.message });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: "A sessão foi encerrada." });
    }
    
    if (error.name === "ConflictError") {
      return res.status(409).send({ error: error.message });
    }

    console.error(error);
    return res.sendStatus(500);
  }
}
