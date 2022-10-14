import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import Spinnies from "spinnies";

const prisma = new PrismaClient();

async function main() {
	const spinnies = new Spinnies();

	spinnies.add("1", { text: "Currently seeding the database... [0/100]" });

	var i = 1;
	var j = 50;

	for (i = 1; i <= j; i++) {
		spinnies.update("1", { text: `Currently seeding the database... [${i}/${j}]` });

		await prisma.product.create({
			data: {
				name: faker.commerce.productName(),
				quantity: Math.floor(Math.random() * 100) + 1,
				price: Math.floor(Math.random() * 1000 + 100) * 1000,
			},
		});
	}
	spinnies.succeed("1");

	console.log(`🌱 Database successfully seeded!`);
}

main()
	.catch((err) => {
		console.error(err);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
