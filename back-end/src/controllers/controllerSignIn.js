import httpStatus from "http-status";
import { serviceSignIn } from "../services/serviceSignIn.js";

export async function controllerSigIn(req, res) {
  const body = req.body;

  try {
    const userToken = await serviceSignIn(body);
    return res.send(userToken);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send({ error: error.message });
    }
    console.error(error);
    return res.sendStatus(500);
  }
}
