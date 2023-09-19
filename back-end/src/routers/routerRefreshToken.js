import { Router } from "express";
import { controllerRefreshToken } from "../controllers/controllerRefreshToken.js";
//import { authenticated } from "../middlewares/authentication.js";

const routerRefreshToken = Router();

routerRefreshToken
.post("/", controllerRefreshToken);

export default routerRefreshToken;