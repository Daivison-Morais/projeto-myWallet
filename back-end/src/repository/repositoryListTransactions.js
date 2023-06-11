import db from "../config/database.js";

export async function findSession(token){
    const session = await db.collection("sessions").findOne({
        token,
      });
      return session;
    }

export async function listTransactions(sessionId){
 return await db
  .collection("transactions")
  .find({
    userId: sessionId,
  })
  .toArray();
  
  
}


