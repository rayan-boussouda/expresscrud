import express from "express";
import { signUp, getAll, connect } from "../Controllers/auth.controller";
import { authenticateJWT, isAdmin } from "../Midelwares/authenticate";

// Initiating the router
export const routerUser = express.Router();

routerUser.post("/", signUp);

routerUser.get("/", authenticateJWT, isAdmin, getAll);

routerUser.get("/signin", connect);
