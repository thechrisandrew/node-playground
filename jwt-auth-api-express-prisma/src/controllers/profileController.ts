import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import createError from "http-errors";

const prisma = new PrismaClient();

export const profile = async (req: Request, res: Response, next: NextFunction) => {
    // return res.send(req.locals?.userId);
    if (!req.locals?.userId) {
        return next(createError(500, ""));
    }
    const user = await prisma.user.findUnique({
        where: { id: req.locals?.userId },
        select: {
            id: true,
            username: true,
            email: true,
            verified: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        return next(createError(500, ""));
    }

    return res.send({ user });
};
