import e, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

import { validateRegisterInput } from "./../utils/validators";
import createError from "http-errors";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, confirmPassword } = req.body;

    // validate user inputs using joi
    const error = validateRegisterInput(username, email, password, confirmPassword);
    if (error) {
        // return res.status(400).send({ message: "Invalid user inputs provided" });
        return next(createError(400, "Invalid user input(s) provided"));
    }

    // checks if user exists on database
    const user = await prisma.user.findFirst({
        where: { OR: [{ username }, { email }] },
    });
    if (user) {
        return next(createError(409, "This username or email has already been registered"));
    }

    // hash password with bcrypt before storing
    const hashedPassword = await hash(password, 12);

    // saves the user to the database
    const result = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });
    return res.send({ message: `Successfully registered user "${result.username}" with id of "${result.id}"` });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {};
