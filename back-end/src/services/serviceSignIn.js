import conflictError from "../errors/conflitError.js";
import { findEmail } from "../repository/repositoryCreateSignUp.js";
import { createSession, findUser } from "../repository/repositorySigIn.js";
import { postSigninSchema } from "../schemas/allSchemas.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";


export async function serviceSignIn (body){

    const validation = postSigninSchema.validate(body, { abortEarly: false });
  
    if (validation.error) {
      const erros = validation.error.details.map((value) => value.message);
      return res.status(442).send(erros);
    }

    const ExistsUser = await findEmail(body.email);
      if (!ExistsUser) {
        throw conflictError("email e/ou senha errados")
      }
      const isValid = bcrypt.compareSync(body.password, ExistsUser.password);
      if (!isValid) {
        throw conflictError("email e/ou senha errados")
      }
  
      const token = uuidv4();

      await createSession(token, ExistsUser._id);
      
      return {token, user: ExistsUser.name};
      
}