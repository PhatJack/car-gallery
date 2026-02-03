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
	{ make: 'Toyota', model: 'Corolla', year: 2020, description: 'A reliable sedan', image: 'https://picsum.photos/id/1015/600/900' },
	{ make: 'Honda', model: 'Civic', year: 2019, description: 'Compact and efficient', image: 'https://picsum.photos/id/1011/600/750' },
	{ make: 'Ford', model: 'Mustang', year: 2021, description: 'Iconic sports car', image: 'https://picsum.photos/id/1020/600/800' },
	{ make: 'Chevrolet', model: 'Camaro', year: 2022, description: 'Powerful muscle car', image: 'https://picsum.photos/id/1025/600/700' },
	{ make: 'BMW', model: '3 Series', year: 2020, description: 'Luxury sedan', image: 'https://picsum.photos/id/1030/600/650' },
	{ make: 'Mercedes-Benz', model: 'C-Class', year: 2019, description: 'Elegant and comfortable', image: 'https://picsum.photos/id/1035/600/750' },
	{ make: 'Audi', model: 'A4', year: 2021, description: 'Premium compact executive car', image: 'https://picsum.photos/id/1040/600/800' },
	{ make: 'Volkswagen', model: 'Golf', year: 2020, description: 'Hatchback with great handling', image: 'https://picsum.photos/id/1045/600/700' },
	{ make: 'Nissan', model: 'Altima', year: 2019, description: 'Mid-size sedan', image: 'https://picsum.photos/id/1050/600/650' },
	{ make: 'Hyundai', model: 'Sonata', year: 2021, description: 'Affordable luxury sedan', image: 'https://picsum.photos/id/1055/600/750' },
	{ make: 'Kia', model: 'Optima', year: 2020, description: 'Stylish mid-size car', image: 'https://picsum.photos/id/1060/600/800' },
	{ make: 'Mazda', model: 'Mazda3', year: 2019, description: 'Fun to drive hatchback', image: 'https://picsum.photos/id/1065/600/700' },
	{ make: 'Subaru', model: 'Impreza', year: 2021, description: 'All-wheel drive reliability', image: 'https://picsum.photos/id/1070/600/650' },
	{ make: 'Tesla', model: 'Model 3', year: 2022, description: 'Electric performance sedan', image: 'https://picsum.photos/id/1075/600/750' },
	{ make: 'Porsche', model: '911', year: 2020, description: 'Legendary sports car', image: 'https://picsum.photos/id/1080/600/800' },
	{ make: 'Ferrari', model: '488', year: 2019, description: 'Exotic supercar', image: 'https://picsum.photos/id/1085/600/700' },
	{ make: 'Lamborghini', model: 'Huracan', year: 2021, description: 'Italian masterpiece', image: 'https://picsum.photos/id/1090/600/650' },
	{ make: 'Jaguar', model: 'F-Type', year: 2020, description: 'British sports car', image: 'https://picsum.photos/id/1095/600/750' },
	{ make: 'Land Rover', model: 'Range Rover', year: 2019, description: 'Luxury SUV', image: 'https://picsum.photos/id/1100/600/800' },
	{ make: 'Jeep', model: 'Wrangler', year: 2021, description: 'Iconic off-road vehicle', image: 'https://picsum.photos/id/1105/600/700' },
	{ make: 'GMC', model: 'Sierra', year: 2020, description: 'Full-size pickup truck', image: 'https://picsum.photos/id/1110/600/650' },
	{ make: 'Ram', model: '1500', year: 2019, description: 'Powerful truck', image: 'https://picsum.photos/id/1115/600/750' },
	{ make: 'Dodge', model: 'Charger', year: 2021, description: 'Muscle car heritage', image: 'https://picsum.photos/id/1120/600/800' },
	{ make: 'Chrysler', model: '300', year: 2020, description: 'Large sedan', image: 'https://picsum.photos/id/1125/600/700' },
	{ make: 'Lincoln', model: 'Navigator', year: 2019, description: 'Luxury SUV', image: 'https://picsum.photos/id/1130/600/650' },
	{ make: 'Cadillac', model: 'Escalade', year: 2021, description: 'Flagship SUV', image: 'https://picsum.photos/id/1135/600/750' },
	{ make: 'Acura', model: 'TLX', year: 2020, description: 'Luxury sedan', image: 'https://picsum.photos/id/1140/600/800' },
	{ make: 'Infiniti', model: 'Q50', year: 2019, description: 'Premium sports sedan', image: 'https://picsum.photos/id/1145/600/700' },
	{ make: 'Lexus', model: 'ES', year: 2021, description: 'Comfortable luxury sedan', image: 'https://picsum.photos/id/1150/600/650' },
	{ make: 'Volvo', model: 'XC90', year: 2020, description: 'Safe family SUV', image: 'https://picsum.photos/id/1155/600/750' },
	{ make: 'Genesis', model: 'G80', year: 2019, description: 'Korean luxury sedan', image: 'https://picsum.photos/id/1160/600/800' },
	{ make: 'Maserati', model: 'Ghibli', year: 2021, description: 'Italian luxury sedan', image: 'https://picsum.photos/id/1165/600/700' },
	{ make: 'Bentley', model: 'Continental GT', year: 2020, description: 'Ultra-luxury coupe', image: 'https://picsum.photos/id/1170/600/650' },
	{ make: 'Rolls-Royce', model: 'Ghost', year: 2019, description: 'Ultimate luxury sedan', image: 'https://picsum.photos/id/1175/600/750' },
	{ make: 'Aston Martin', model: 'DB11', year: 2021, description: 'British grand tourer', image: 'https://picsum.photos/id/1180/600/800' },
	{ make: 'McLaren', model: '720S', year: 2020, description: 'Hypercar performance', image: 'https://picsum.photos/id/1185/600/700' },
	{ make: 'Bugatti', model: 'Chiron', year: 2019, description: 'Ultimate supercar', image: 'https://picsum.photos/id/1190/600/650' },
	{ make: 'Koenigsegg', model: 'Agera', year: 2021, description: 'Swedish hypercar', image: 'https://picsum.photos/id/1195/600/750' },
	{ make: 'Pagani', model: 'Huayra', year: 2020, description: 'Italian hypercar', image: 'https://picsum.photos/id/1200/600/800' },
];

export async function main() {
  for (const u of carData) {
    await prisma.car.create({ data: u });
  }
}

main();