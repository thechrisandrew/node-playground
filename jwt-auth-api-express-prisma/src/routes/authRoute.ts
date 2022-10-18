import { NextFunction, Request, Response, Router } from "express";

import { register, login } from "../controllers/authController";
import { tc } from "../utils/tc";

const router = Router();

// POST "/register"
router.post("/register", tc(register));

// POST "/login"
router.post("/login", tc(login));

export default router;
