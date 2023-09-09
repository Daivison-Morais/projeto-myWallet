import httpStatus from "http-status";
import { serviceDeleteAll } from "../services/serviceDeleteAll.js";

export async function controllerDeleteAll(req, res) {
  const authorization = req.headers.authorization;

  try {
    await serviceDeleteAll(authorization);
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: error.message });
    }

    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send({ error: error.message });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: "A sessão foi encerrada." });
    }

    console.error(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

}