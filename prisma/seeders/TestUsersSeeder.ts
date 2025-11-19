import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedTestUsers() {
  console.log('👥 Seeding test users...');

  const users = [
    {
      email: 'admin@hrm.local',
      name: 'Admin User',
      password: 'password123',
      role: 'admin',
    },
    {
      email: 'hr@hrm.local',
      name: 'HR Manager',
      password: 'password123',
      role: 'hr',
    },
    {
      email: 'hr.assistant@hrm.local',
      name: 'HR Assistant',
      password: 'password123',
      role: 'hr',
    },
    {
      email: 'john.doe@hrm.local',
      name: 'John Doe',
      password: 'password123',
      role: 'employee',
    },
    {
      email: 'jane.smith@hrm.local',
      name: 'Jane Smith',
      password: 'password123',
      role: 'employee',
    },
    {
      email: 'bob.wilson@hrm.local',
      name: 'Bob Wilson',
      password: 'password123',
      role: 'employee',
    },
    {
      email: 'alice.johnson@hrm.local',
      name: 'Alice Johnson',
      password: 'password123',
      role: 'employee',
    },
    {
      email: 'charlie.brown@hrm.local',
      name: 'Charlie Brown',
      password: 'password123',
      role: 'employee',
    },
  ];

  const createdUsers = [];

  for (const userData of users) {
    const passwordHash = await hash(userData.password, 10);
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        role: userData.role,
      },
      create: {
        email: userData.email,
        name: userData.name,
        passwordHash,
        role: userData.role,
        status: 'active',
      },
    });
    createdUsers.push(user);
    console.log(`  ✓ ${user.role}: ${user.name} (${user.email})`);
  }

  console.log(`  ✓ ${createdUsers.length} test users created`);
  return createdUsers;
}

export default seedTestUsers;
