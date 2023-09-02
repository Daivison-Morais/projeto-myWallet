import {Router} from "express";
import { controllerListTransactions } from "../controllers/controllerListTransaction.js";

const routerListTransactions = Router();

routerListTransactions
.get("/", controllerListTransactions);

export default routerListTransactions;