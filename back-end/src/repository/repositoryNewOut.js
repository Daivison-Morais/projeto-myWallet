import db from "../config/database.js";
import dayjs from "dayjs";

export async function createTransaction(sessionId, body) {
  await db.collection("transactions").insertOne({
    userId: sessionId,
    value: body.value,
    description: body.description,
    date: dayjs().format("DD/MM"),
    in: "false",
  });
}
