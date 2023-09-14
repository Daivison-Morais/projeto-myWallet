import conflictError from "../errors/conflitError.js";
import { findEmail } from "../repository/repositoryCreateSignUp.js";
import { createSession } from "../repository/repositorySigIn.js";
import { postSigninSchema } from "../schemas/allSchemas.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function serviceSignIn(body) {
  const validation = postSigninSchema.validate(body, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((value) => value.message);
    throw conflictError(errors);
  }

  const ExistsUser = await findEmail(body.email);
  if (!ExistsUser) throw conflictError("email e/ou senha errados");

  const isValid = bcrypt.compareSync(body.password, ExistsUser.password);
  if (!isValid) throw conflictError("email e/ou senha errados");
  
  const token = jwt.sign({}, process.env.JWT_SECRET, { 
    subject: toString(ExistsUser._id),
    expiresIn: 60*60*24*10 });

  await createSession(token, ExistsUser._id);

  return { token, user: ExistsUser.name };
}
