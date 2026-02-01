import { PrismaClient, Prisma } from '../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const carData: Prisma.CarCreateInput[] = [
	{ make: 'Toyota', model: 'Corolla', year: 2020, description: 'A reliable sedan', image: 'https://example.com/corolla.jpg' },
	{ make: 'Honda', model: 'Civic', year: 2019, description: 'Compact and efficient', image: 'https://example.com/civic.jpg' },
	{ make: 'Ford', model: 'Mustang', year: 2021, description: 'Iconic sports car', image: 'https://example.com/mustang.jpg' },
];

export async function main() {
  for (const u of carData) {
    await prisma.car.create({ data: u });
  }
}

main();