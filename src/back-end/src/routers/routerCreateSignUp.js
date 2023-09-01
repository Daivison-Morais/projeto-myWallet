import { Router } from "express";
import { controllerCreateSignUp } from "../controllers/controllerCreateSignUp.js";

const routerCreateSignUp = Router ();

routerCreateSignUp
.post("/", controllerCreateSignUp);

export { routerCreateSignUp };

