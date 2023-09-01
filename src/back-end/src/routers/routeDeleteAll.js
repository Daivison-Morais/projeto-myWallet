import { Router } from "express";
import { controllerDeleteAll } from "../controllers/controllerDeleteAll.js";

const routerDelete = Router();

routerDelete
.delete("/all", controllerDeleteAll);

export { routerDelete };
