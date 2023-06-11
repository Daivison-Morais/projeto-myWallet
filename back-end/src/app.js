import cors from "cors";
import dayjs from "dayjs";
import db from "./config/database.js";
import { postNewInSchema, postNewoutSchema } from "./schemas/allSchemas.js";
import express from "express";
import {routerCreateSignUp} from "./routers/routerCreateSignUp.js";
import routerSigIn from "./routers/routerGetSignIn.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/sign-up", routerCreateSignUp)
app.use("/sign-in", routerSigIn)

app.post("/newin", async (req, res) => {
  const { value, descricao } = req.body;
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const validation = postNewInSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(442).send(error);
  }

  try {
    const session = await db.collection("sessions").findOne({
      token,
    });
    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({
      _id: session.userId,
    });
    if (!user) {
      return res.sendStatus(401);
    }

    await db.collection("transactions").insertOne({
      userId: session.userId,
      value,
      descricao,
      date: dayjs().format("DD/MM"),
      in: "true",
    });
    res.send(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/newout", async (req, res) => {
  const { value, descricao } = req.body;
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const validation = postNewoutSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const erros = validation.error.details.map((value) => value.message);
    return res.status(442).send(erros);
  }

  try {
    const session = await db.collection("sessions").findOne({
      token,
    });
    if (!session) {
      return res.sendStatus(401);
    }
    
    await db.collection("transactions").insertOne({
      userId: session.userId,
      value,
      descricao,
      date: dayjs().format("DD/MM"),
      in: "false",
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/transactions", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }

    const userTransactions = await db
      .collection("transactions")
      .find({
        userId: session.userId,
      })
      .toArray();

    res.send(userTransactions);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default app;


