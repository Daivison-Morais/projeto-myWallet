import { generateToken } from "../provider/generateTokenProvider.js";
import { createSession } from "../repository/repositorySigIn.js";
import { findRefreshToken } from "../repository/reposytoryRefreshToken.js";

export async function serviceRefreshToken(refreshToken) {

  const verifyRefreshToken = await findRefreshToken(refreshToken);
  if (!verifyRefreshToken) {
    throw new Error("Token Invalido");
  }

  const token = await generateToken(verifyRefreshToken.userId);

  await createSession(token, verifyRefreshToken.userId);

  return token;
}
