import { Request } from "express";

export {};

interface Locals {
    [key: string]: any;
    userId?: string;
}

declare module "express" {
    interface Request {
        locals?: Locals;
    }
}
