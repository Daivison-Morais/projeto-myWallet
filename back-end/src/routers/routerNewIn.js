import {Router} from "express";
import { controllerNewIn } from "../controllers/controllerNewIn.js";
import { authenticated } from "../middlewares/authentication.js";

const routerNewIn = Router();

routerNewIn
.post("/", authenticated, controllerNewIn);

export default routerNewIn;