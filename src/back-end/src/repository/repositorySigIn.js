import db from "../config/database.js";

export async function findUser (email) {
   const ExistsUser = await db.collection("users").findOne({ email: email });
   return ExistsUser;
}

export async function createSession (token, userId) {
   const userToken = await db.collection("sessions").insertOne({
        token,
        userId: userId,
      });
      return userToken;
 }



