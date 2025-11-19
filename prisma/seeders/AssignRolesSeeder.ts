import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function assignRoles() {
  console.log('🎭 Assigning roles to users...');

  // Get all users
  const users = await prisma.user.findMany();

  const roleCounts = {
    admin: 0,
    hr: 0,
    employee: 0,
  };

  for (const user of users) {
    // Count roles
    roleCounts[user.role as keyof typeof roleCounts]++;
  }

  console.log('  Role distribution:');
  console.log(`    - Admin: ${roleCounts.admin}`);
  console.log(`    - HR: ${roleCounts.hr}`);
  console.log(`    - Employee: ${roleCounts.employee}`);
  console.log(`  ✓ Total users: ${users.length}`);

  return users;
}

export default assignRoles;
