import conflictError from "../errors/conflitError.js";
import { findEmail } from "../repository/repositoryCreateSignUp.js";
import { createSession } from "../repository/repositorySigIn.js";
import { postSigninSchema } from "../schemas/allSchemas.js";
import { repositoryRefreshToken } from "../repository/reposytoryRefreshToken.js";
import bcrypt from "bcrypt";
import { generateToken } from "../provider/generateTokenProvider.js";

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
  
  const token = await generateToken(ExistsUser._id);

  await createSession(token, ExistsUser._id);

  const refreshToken = await repositoryRefreshToken(ExistsUser._id, ExistsUser.name);

  return { token, refreshToken, user: ExistsUser.name };
}
