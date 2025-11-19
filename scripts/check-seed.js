const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    const userCount = await prisma.user.count();
    const deptCount = await prisma.department.count();
    const empCount = await prisma.employee.count();
    const permCount = await prisma.permission.count();

    console.log('\n📊 Database Status:');
    console.log('==================');
    console.log(`Users: ${userCount}`);
    console.log(`Departments: ${deptCount}`);
    console.log(`Employees: ${empCount}`);
    console.log(`Permissions: ${permCount}`);

    if (userCount > 0) {
      console.log('\n👥 Users in database:');
      const users = await prisma.user.findMany({
        select: { email: true, role: true, name: true }
      });
      users.forEach(u => {
        console.log(`  - ${u.email} (${u.role}) - ${u.name}`);
      });
    } else {
      console.log('\n⚠️  No users found in database!');
      console.log('Run: npm run db:seed:new');
    }
  } catch (error) {
    console.error('Error checking database:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
