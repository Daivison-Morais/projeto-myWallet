import {Router} from "express";
import { controllerNewOut } from "../controllers/controllerNewOut.js";

const routerNewOut = Router();

routerNewOut
.post("/", controllerNewOut);

export default routerNewOut;