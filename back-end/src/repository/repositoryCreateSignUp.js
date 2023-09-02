import db from "../config/database.js";

export async function repositoryCreateSignUp (passwordEncrypted, email, name) {
    
    await db.collection("users").insertOne({
        name,
        email,
        password: passwordEncrypted,
      });
}

export async function findEmail (email) {
    
  const emailExists = await db.collection("users").findOne({ email: email });
  return emailExists;
}