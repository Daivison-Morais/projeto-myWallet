import db from "../config/database.js";
import dayjs from "dayjs";

export async function findSession(token){
    const session = await db.collection("sessions").findOne({
        token,
      });
      return session;
}

export async function findUser(sessionId){
    const user =await db.collection("users").findOne({
        _id: sessionId,
      });
      return user;
}

export async function createTransaction(sessionId, body){
    await db.collection("transactions").insertOne({
        userId: sessionId,
        value: body.value,
        descricao: body.descricao,
        date: dayjs().format("DD/MM"),
        in: "false",
      });
}


