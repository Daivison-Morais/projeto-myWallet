import { ServiceCreateSignUp } from "../services/serviceCreateSignUp.js";
import httpStatus from "http-status";

export async function controllerCreateSignUp(req, res) {
  const body = req.body;

  try {
    const result = await ServiceCreateSignUp(body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send({ error: error.message });
    }

    console.error(error.error);
    res.sendStatus(500);
  }
}
