import { NextFunction, Request, Response, Router } from "express";

import { tc } from "../utils/tc";
import { profile } from "./../controllers/profileController";
import { checkAuth } from "./../middlewares/checkAuth";

const router = Router();

// GET "/profile"
router.get("/", checkAuth, tc(profile));

export default router;
