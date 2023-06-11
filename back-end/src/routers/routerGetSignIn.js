import {Router} from "express";
import { controllerSigIn } from "../controllers/controllerSignIn.js";

const routerSigIn = Router();

routerSigIn
.post("/", controllerSigIn);

export default routerSigIn;