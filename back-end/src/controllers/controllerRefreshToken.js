import { serviceRefreshToken } from "../services/serviceRefreshToken.js";

export async function controllerRefreshToken(req, res) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.status(409).send("Token invalido!");

  try {
    const token = await serviceRefreshToken(refreshToken);

    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: "Token Invalido!"});
  }
}
