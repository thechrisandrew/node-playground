import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";

import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

import authRouter from "./routes/authRoute";
import profileRouter from "./routes/profileRoute";

const app: Application = express();

app.use(morgan("dev"));

app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello, World!");
});

app.use("/auth", authRouter);

app.use("/profile", profileRouter);

// 404 Not Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;
