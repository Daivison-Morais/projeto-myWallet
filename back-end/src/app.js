import cors from "cors";
import db from "./config/database.js";
import express from "express";
import {routerCreateSignUp} from "./routers/routerCreateSignUp.js";
import routerSigIn from "./routers/routerGetSignIn.js";
import routerNewIn from "./routers/routerNewIn.js";
import routerNewOut from "./routers/routerNewOut.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/sign-up", routerCreateSignUp)
app.use("/sign-in", routerSigIn)
app.use("/newin", routerNewIn)
app.use("/newout", routerNewOut)

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


