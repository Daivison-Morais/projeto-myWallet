import {Router} from "express";
import { controllerNewOut } from "../controllers/controllerNewOut.js";
import { authenticated } from "../middlewares/authentication.js";

const routerNewOut = Router();

routerNewOut
.post("/", authenticated, controllerNewOut);

export default routerNewOut;