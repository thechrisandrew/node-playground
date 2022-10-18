import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let jsonResponse: any = {};

    // check if the error is from http-errors
    if (err instanceof HttpError) {
        jsonResponse.statusCode = err.status || 500;
        jsonResponse.message = err.message || "Something went wrong";
        if (process.env.NODE_ENV === "development") {
            jsonResponse.stack = err.stack;
        }

        return res.status(err.status || 500).json(jsonResponse);
    }

    // send response with status code 500 for any errors beside http-errors for production deployments
    if (process.env.NODE_ENV === "production") {
        return res.status(500).json({ statusCode: 500, message: "Something went terribly wrong!" });
    }

    // let express handle any unhandled/unexpected errors by itself for non-production deployments
    next(err);
}
