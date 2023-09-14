import { Router } from "express";
import { controllerDeleteAll } from "../controllers/controllerDeleteAll.js";
import { authenticated } from "../middlewares/authentication.js";

const routerDelete = Router();

routerDelete
.delete("/all", authenticated, controllerDeleteAll);

export { routerDelete };
