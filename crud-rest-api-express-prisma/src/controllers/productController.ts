import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
	const { name, quantity, price } = req.body;
	const result = await prisma.product.create({
		data: {
			name,
			quantity,
			price,
		},
	});
	res.json({ message: "Create Success", ...result });
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
	const { id }: { id?: string } = req.params;
	const product = await prisma.product.findUnique({ where: { id } });
	res.json(product);
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
	const products = await prisma.product.findMany();
	res.json(products);
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
	const { id }: { id?: string } = req.params;
	const result = await prisma.product.delete({ where: { id } });
	res.json({ message: "Delete Success", ...result });
};

export const patchProduct = async (req: Request, res: Response, next: NextFunction) => {
	const { id }: { id?: string } = req.params;

	let name, quantity, price;

	if (req.body.name) {
		name = req.body.name;
	}
	if (req.body.quantity) {
		quantity = req.body.quantity;
	}
	if (req.body.price) {
		price = req.body.price;
	}

	const result = await prisma.product.update({
		where: {
			id,
		},
		data: {
			name,
			quantity,
			price,
		},
	});
	res.json({ message: "Update Success", ...result });
};
