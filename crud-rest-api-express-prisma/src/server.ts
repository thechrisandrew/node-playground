import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";

import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

import productRouter from "./routes/productRoute";

const app: Application = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/products", productRouter);

// 404 Not Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;
