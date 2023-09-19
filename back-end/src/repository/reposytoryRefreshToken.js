import { ObjectId } from "mongodb";
import db from "../config/database.js";
import dayjs from "dayjs";

export async function repositoryRefreshToken(userId, name) {
  const refreshToken = await db.collection("refreshToken").insertOne({
    userId,
    name,
    expireIn: dayjs().add("15", "second").unix(),
  });

  return await db.collection("refreshToken").findOne({
    _id: refreshToken.insertedId,
  });
}

export async function findRefreshToken(refreshToken) {
  return await db.collection("refreshToken").findOne({
    _id: new ObjectId(refreshToken),
  });
}
