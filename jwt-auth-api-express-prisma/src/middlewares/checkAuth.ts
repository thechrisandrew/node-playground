import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { JwtPayload, Secret, verify } from "jsonwebtoken";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["authorization"]) return next(createHttpError(401, "No authorization header provided"));

    // get token from authorization header
    const authHeader = req.headers["authorization"];

    // get token with format "Bearer <token>"
    const token: string = authHeader.split("Bearer ")[1];

    // checks if the format is correct
    if (!token) {
        return next(createHttpError(400));
    }

    // verify the data using secret key
    const secret: Secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;

    try {
        const decodedData = verify(token, secret) as JwtPayload;

        // send the data to the next middleware
        if (!decodedData.userId) {
            return next(createHttpError(500));
        } else {
            console.log(decodedData.userId);

            req.locals = { ...req.locals, userId: decodedData.userId };

            return next();
        }
    } catch (err: any) {
        const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        console.error(err);
        return next(createHttpError(401, message));
    }
};
