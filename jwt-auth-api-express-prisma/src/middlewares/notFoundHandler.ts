import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    return next(createError(404, "Not Found"));
}
