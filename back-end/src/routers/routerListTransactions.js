import {Router} from "express";
import { controllerListTransactions } from "../controllers/controllerListTransaction.js";
import { authenticated } from "../middlewares/authentication.js";

const routerListTransactions = Router();

routerListTransactions
.get("/", authenticated ,controllerListTransactions);

export default routerListTransactions;