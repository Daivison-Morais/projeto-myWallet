import bcrypt from "bcrypt";
import { postRegistrationSchema } from "../schemas/allSchemas.js";
import conflictError from "../errors/conflitError.js";
import { findEmail, repositoryCreateSignUp } from "../repository/repositoryCreateSignUp.js";

export async function ServiceCreateSignUp(body) {
  const { password, confirmPassword, email, name } = body;

  if (password !== confirmPassword) {
    throw conflictError("Senhas não conferem!");
  }

  const validation = postRegistrationSchema.validate(body, {
    abortEarly: false,
  });
  if (validation.error) {
    const errors = validation.error.details.map((value) => value.message);
    throw conflictError(errors);
  }
  const passwordEncrypted = bcrypt.hashSync(password, 10);

  const emailExists = await findEmail(email);
  if (emailExists) {
    throw conflictError("Este email já está em uso");
  }

  repositoryCreateSignUp(passwordEncrypted, email, name);

}
