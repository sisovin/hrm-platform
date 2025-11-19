import { PrismaClient } from '@prisma/client';
import { seedDatabase } from './seeders/DatabaseSeeder';

const prisma = new PrismaClient();

async function main() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
