import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEmployees() {
  console.log('👨‍💼 Seeding employees...');

  // Get all departments and positions
  const departments = await prisma.department.findMany({
    include: { positions: true },
  });

  if (departments.length === 0) {
    console.log('  ⚠️  No departments found. Skipping employee seeding.');
    return [];
  }

  // Get all employee-role users (excluding admin and hr users without employee records)
  const users = await prisma.user.findMany({
    where: {
      role: 'employee',
      employee: null, // Only users without employee records
    },
  });

  if (users.length === 0) {
    console.log('  ℹ️  No users available for employee records');
    return [];
  }

  const employees = [];
  let employeeCodeCounter = 1001;

  for (const user of users) {
    // Randomly assign department and position
    const department = departments[Math.floor(Math.random() * departments.length)];

    if (department.positions.length === 0) {
      console.log(`  ⚠️  No positions in ${department.name}. Skipping ${user.name}`);
      continue;
    }

    const position = department.positions[Math.floor(Math.random() * department.positions.length)];

    // Generate hire date (random date in last 2 years)
    const today = new Date();
    const twoYearsAgo = new Date(today);
    twoYearsAgo.setFullYear(today.getFullYear() - 2);
    const randomTime = twoYearsAgo.getTime() + Math.random() * (today.getTime() - twoYearsAgo.getTime());
    const hireDate = new Date(randomTime);

    // Generate salary based on position level
    const baseSalary = {
      'L1': 45000,
      'L2': 60000,
      'L3': 80000,
      'L4': 100000,
      'L5': 120000,
      'Manager': 90000,
      'Senior Manager': 110000,
      'Director': 140000,
    };
    const salaryBase = baseSalary[position.level as keyof typeof baseSalary] || 50000;
    const salaryVariation = salaryBase * (0.9 + Math.random() * 0.2); // ±10% variation

    const employeeCode = `EMP-${employeeCodeCounter.toString().padStart(4, '0')}`;
    employeeCodeCounter++;

    try {
      const employee = await prisma.employee.upsert({
        where: { employeeCode },
        update: {},
        create: {
          userId: user.id,
          employeeCode,
          departmentId: department.id,
          positionId: position.id,
          hireDate,
          salaryBase: Math.round(salaryVariation),
        },
        include: {
          user: true,
          department: true,
          position: true,
        },
      });

      employees.push(employee);
      console.log(`  ✓ ${employee.employeeCode}: ${employee.user.name} - ${employee.position.title} in ${employee.department.name}`);
    } catch (error) {
      console.log(`  ⚠️  Error creating employee for ${user.name}:`, error);
    }
  }

  console.log(`  ✓ ${employees.length} employees created`);
  return employees;
}

export default seedEmployees;
