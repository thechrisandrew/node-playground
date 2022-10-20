import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
    return new Promise((resolve, reject) => {
        const payload: jwt.JwtPayload = {
            userId,
        };
        const secret: jwt.Secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
        const options: jwt.SignOptions = {
            expiresIn: process.env.JWT_EXPIRES_IN as string,
            issuer: "",
        };

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};
