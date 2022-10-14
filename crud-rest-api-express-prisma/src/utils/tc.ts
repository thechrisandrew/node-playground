import { NextFunction, Request, Response } from "express";

export const tc = (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await controller(req, res, next);
	} catch (err) {
		return next(err);
	}
};
