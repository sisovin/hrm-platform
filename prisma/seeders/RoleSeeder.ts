import { PrismaClient } from '@prisma/client';

// Prisma client for potential future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prisma = new PrismaClient();

export async function seedRoles() {
  console.log('🔐 Seeding roles...');

  const roles = [
    { name: 'admin', description: 'Administrator with full access' },
    { name: 'hr', description: 'HR Manager with employee management access' },
    { name: 'employee', description: 'Regular employee with limited access' },
  ];

  console.log(`  ✓ Roles defined: ${roles.map(r => r.name).join(', ')}`);

  return roles;
}

export default seedRoles;
