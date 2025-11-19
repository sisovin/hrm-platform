(async () => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.count();
    const employees = await prisma.employee.count();
    console.log('Users:', users, 'Employees:', employees);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
})();
