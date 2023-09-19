import cors from "cors";
import express from "express";
import {routerCreateSignUp} from "./routers/routerCreateSignUp.js";
import routerSigIn from "./routers/routerGetSignIn.js";
import routerNewIn from "./routers/routerNewIn.js";
import routerNewOut from "./routers/routerNewOut.js";
import routerListTransactions from "./routers/routerListTransactions.js";
import { routerDelete } from "./routers/routeDeleteAll.js";
import routerRefreshToken from "./routers/routerRefreshToken.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/status", (req,res)=>{
return res.send("ok")
})
app.use("/sign-up", routerCreateSignUp)
app.use("/sign-in", routerSigIn)
app.use("/newin", routerNewIn)
app.use("/newout", routerNewOut)
app.use("/transactions", routerListTransactions)
app.use("/delete", routerDelete)
app.use("/refresh-token", routerRefreshToken)

export default app;


