import cors from "cors";
import express from "express";
import {routerCreateSignUp} from "./routers/routerCreateSignUp.js";
import routerSigIn from "./routers/routerGetSignIn.js";
import routerNewIn from "./routers/routerNewIn.js";
import routerNewOut from "./routers/routerNewOut.js";
import routerListTransactions from "./routers/routerListTransactions.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/sign-up", routerCreateSignUp)
app.use("/sign-in", routerSigIn)
app.use("/newin", routerNewIn)
app.use("/newout", routerNewOut)
app.use("/transactions", routerListTransactions);

export default app;


