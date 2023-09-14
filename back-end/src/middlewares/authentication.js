import { findSession } from "../repository/repositoryNewIn.js";
import jwt from "jsonwebtoken";

export async function authenticated(req, res, next) {
  const authorization = req.headers.authorization;

  const token = authorization?.replace("Bearer ", "");
  if (!token) return unauthorizedResponse(res);

  try {
    
    jwt.verify(token, process.env.JWT_SECRET);
    
    const session = await findSession(token);

    if (!session) return unauthorizedResponse(res);

    req.session = session;
    return next();
  } catch (error) {
    console.log(error)
    return unauthorizedResponse(res);
  }
}

function unauthorizedResponse(res) {
  return res.status(401).send({ error: "Requisição não autorizada." });
}
