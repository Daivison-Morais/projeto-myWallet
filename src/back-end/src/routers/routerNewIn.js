import {Router} from "express";
import { controllerNewIn } from "../controllers/controllerNewIn.js";

const routerNewIn = Router();

routerNewIn
.post("/", controllerNewIn);

export default routerNewIn;