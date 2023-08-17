import db from "../config/database.js";

export async function deleteAllTransaction(userId){
    await db.collection("transactions").deleteMany({})
}