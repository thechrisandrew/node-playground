import { NextFunction, Request, Response, Router } from "express";

import { postProduct, getProduct, getProducts, patchProduct, deleteProduct } from "../controllers/productController";
import { tc } from "../utils/tc";

const router = Router();

// POST "/products"
router.post("/", tc(postProduct));

// GET "/products"
router.get("/", tc(getProducts));

// GET "/products/:id"
router.get("/:id", tc(getProduct));

// PATCH "/products/:id"
router.patch("/:id", tc(patchProduct));

// DELETE "/products/:id"
router.delete("/:id", tc(deleteProduct));

export default router;
