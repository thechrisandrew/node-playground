import { NextFunction, Request, Response } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	console.error(err.stack);

	res.status(500);
	res.json({
		statusCode: 500,
		message: "Something Went Wrong",
	});
}
