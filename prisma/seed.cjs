const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Permissions
  const perms = [
    { key: 'users:read', description: 'Read users' },
    { key: 'users:write', description: 'Create/update users' },
    { key: 'employees:read', description: 'Read employees' },
    { key: 'employees:write', description: 'Create/update employees' },
    { key: 'attendance:write', description: 'Create attendance records' },
    { key: 'payroll:process', description: 'Process payrolls' },
    { key: 'reviews:manage', description: 'Manage performance reviews' },
  ];

  for (const p of perms) {
    const existing = await prisma.permission.findUnique({ where: { key: p.key } });
    if (!existing) {
      await prisma.permission.create({ data: p });
    }
  }

  // Role permissions
  const adminPerms = perms.map((p) => ({ role: 'admin', permissionKey: p.key }));

  for (const rp of adminPerms) {
    const found = await prisma.rolePermission.findFirst({ where: { role: rp.role, permissionKey: rp.permissionKey } });
    if (!found) {
      await prisma.rolePermission.create({ data: rp });
    }
  }

  // Create department and position
  let engineering = await prisma.department.findUnique({ where: { name: 'Engineering' } });
  if (!engineering) engineering = await prisma.department.create({ data: { name: 'Engineering' } });

  let position = await prisma.position.findFirst({ where: { title: 'Software Engineer', departmentId: engineering.id } });
  if (!position) {
    position = await prisma.position.create({ data: { title: 'Software Engineer', level: 'L1', departmentId: engineering.id } });
  }

  // Admin user
  const adminPassword = await hash('admin1234', 10);
  let adminUser = await prisma.user.findUnique({ where: { email: 'admin@hrm.local' } });
  if (!adminUser) {
    adminUser = await prisma.user.create({ data: { email: 'admin@hrm.local', name: 'Admin User', passwordHash: adminPassword, role: 'admin' } });
  }

  // Employee user
  const employeePassword = await hash('employee123', 10);
  let user = await prisma.user.findUnique({ where: { email: 'jane.doe@hrm.local' } });
  if (!user) {
    user = await prisma.user.create({ data: { email: 'jane.doe@hrm.local', name: 'Jane Doe', passwordHash: employeePassword, role: 'employee' } });
  }

  // Create employee
  let employee = await prisma.employee.findUnique({ where: { employeeCode: 'EMP-1001' } });
  if (!employee) {
    employee = await prisma.employee.create({
      data: {
        userId: user.id,
        employeeCode: 'EMP-1001',
        departmentId: engineering.id,
        positionId: position.id,
        hireDate: new Date('2024-01-15T00:00:00Z'),
        salaryBase: 50000,
      },
    });
  }

  // Attendance
  await prisma.attendance.create({ data: { employeeId: employee.id, checkInAt: new Date(), status: 'present' } });

  // Payroll
  await prisma.payroll.create({ data: { employeeId: employee.id, periodStart: new Date('2024-01-01T00:00:00Z'), periodEnd: new Date('2024-01-31T23:59:59Z'), gross: 5000, deductions: 500, net: 4500, status: 'paid' } });

  // Performance review
  await prisma.performanceReview.create({ data: { employeeId: employee.id, reviewerId: adminUser.id, period: 'Q1 2024', score: 4.5, notes: 'Great performance in Q1', status: 'approved' } });

  // Audit log
  await prisma.auditLog.create({ data: { actorUserId: adminUser.id, action: 'seed:init', entity: 'system', entityId: null, meta: 'Initial seed data created' } });

  console.log('Seeding completed.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
