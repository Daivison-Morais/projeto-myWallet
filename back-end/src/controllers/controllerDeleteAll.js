import httpStatus from "http-status";
import { serviceDeleteAll } from "../services/serviceDeleteAll.js";

export async function controllerDeleteAll(req, res) {
  const { session } = req;

  try {
    await serviceDeleteAll(session);
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: error.message });
    }

    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send({ error: error.message });
    }

    console.error(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

}