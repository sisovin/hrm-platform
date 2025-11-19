import { PrismaClient } from '@prisma/client';
import seedRolesAndPermissions from './RolesAndPermissionsSeeder';
import seedTestUsers from './TestUsersSeeder';
import seedEmployees from './EmployeeSeeder';
import assignRoles from './AssignRolesSeeder';

const prisma = new PrismaClient();

export async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // 1. Create departments and positions first
    console.log('🏢 Seeding departments and positions...');
    await seedDepartmentsAndPositions();

    // 2. Seed roles and permissions
    await seedRolesAndPermissions();
    console.log('');

    // 3. Seed test users
    const users = await seedTestUsers();
    console.log('');

    // 4. Assign roles (summary)
    await assignRoles();
    console.log('');

    // 5. Seed employees
    const employees = await seedEmployees();
    console.log('');

    // 6. Seed additional data (attendance, payroll, reviews, leave)
    if (employees.length > 0) {
      await seedAttendance(employees);
      console.log('');
      await seedPayroll(employees);
      console.log('');
      await seedPerformanceReviews(employees, users);
      console.log('');
      await seedLeaveRequests(employees, users);
      console.log('');
    }

    // 7. Create audit log
    await seedAuditLogs(users);

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

async function seedDepartmentsAndPositions() {
  const departments = [
    {
      name: 'Engineering',
      positions: [
        { title: 'Junior Software Engineer', level: 'L1' },
        { title: 'Software Engineer', level: 'L2' },
        { title: 'Senior Software Engineer', level: 'L3' },
        { title: 'Lead Software Engineer', level: 'L4' },
        { title: 'Engineering Manager', level: 'Manager' },
      ],
    },
    {
      name: 'Human Resources',
      positions: [
        { title: 'HR Assistant', level: 'L1' },
        { title: 'HR Specialist', level: 'L2' },
        { title: 'HR Manager', level: 'Manager' },
        { title: 'HR Director', level: 'Director' },
      ],
    },
    {
      name: 'Sales',
      positions: [
        { title: 'Sales Representative', level: 'L1' },
        { title: 'Senior Sales Representative', level: 'L2' },
        { title: 'Sales Manager', level: 'Manager' },
        { title: 'Sales Director', level: 'Director' },
      ],
    },
    {
      name: 'Marketing',
      positions: [
        { title: 'Marketing Coordinator', level: 'L1' },
        { title: 'Marketing Specialist', level: 'L2' },
        { title: 'Marketing Manager', level: 'Manager' },
        { title: 'Marketing Director', level: 'Director' },
      ],
    },
    {
      name: 'Finance',
      positions: [
        { title: 'Junior Accountant', level: 'L1' },
        { title: 'Accountant', level: 'L2' },
        { title: 'Senior Accountant', level: 'L3' },
        { title: 'Finance Manager', level: 'Manager' },
        { title: 'Finance Director', level: 'Director' },
      ],
    },
  ];

  for (const dept of departments) {
    const department = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: { name: dept.name },
    });

    for (const pos of dept.positions) {
      // Check if position exists
      const existing = await prisma.position.findFirst({
        where: {
          title: pos.title,
          level: pos.level,
          departmentId: department.id,
        },
      });

      if (!existing) {
        await prisma.position.create({
          data: {
            title: pos.title,
            level: pos.level,
            departmentId: department.id,
          },
        });
      }
    }

    console.log(`  ✓ ${dept.name}: ${dept.positions.length} positions`);
  }

  console.log(`  ✓ ${departments.length} departments created`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedAttendance(employees: any[]) {
  console.log('📅 Seeding attendance records...');

  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  let recordCount = 0;

  for (const employee of employees) {
    // Generate 20-25 attendance records per employee for the last 30 days
    const numRecords = 20 + Math.floor(Math.random() * 6);

    for (let i = 0; i < numRecords; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + Math.floor(Math.random() * 30));

      // Check-in time: 8:00 AM - 9:30 AM
      const checkInHour = 8 + Math.floor(Math.random() * 1.5);
      const checkInMinute = Math.floor(Math.random() * 60);
      const checkInAt = new Date(date);
      checkInAt.setHours(checkInHour, checkInMinute, 0, 0);

      // Check-out time: 5:00 PM - 6:30 PM
      const checkOutHour = 17 + Math.floor(Math.random() * 1.5);
      const checkOutMinute = Math.floor(Math.random() * 60);
      const checkOutAt = new Date(date);
      checkOutAt.setHours(checkOutHour, checkOutMinute, 0, 0);

      // Determine status
      let status = 'present';
      if (checkInHour >= 9) {
        status = 'late';
      }
      if (Math.random() < 0.05) {
        status = 'absent';
      }

      try {
        await prisma.attendance.create({
          data: {
            employeeId: employee.id,
            checkInAt,
            checkOutAt: status === 'absent' ? null : checkOutAt,
            status,
          },
        });
        recordCount++;
      } catch {
        // Skip duplicates
      }
    }
  }

  console.log(`  ✓ ${recordCount} attendance records created`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedPayroll(employees: any[]) {
  console.log('💰 Seeding payroll records...');

  const months = [
    { start: new Date('2024-01-01'), end: new Date('2024-01-31') },
    { start: new Date('2024-02-01'), end: new Date('2024-02-29') },
    { start: new Date('2024-03-01'), end: new Date('2024-03-31') },
    { start: new Date('2024-04-01'), end: new Date('2024-04-30') },
    { start: new Date('2024-05-01'), end: new Date('2024-05-31') },
    { start: new Date('2024-06-01'), end: new Date('2024-06-30') },
  ];

  let recordCount = 0;

  for (const employee of employees) {
    const monthlySalary = employee.salaryBase / 12;

    for (const period of months) {
      // Check if employee was hired before this period
      if (new Date(employee.hireDate) > period.end) {
        continue;
      }

      const gross = Math.round(monthlySalary);
      const deductions = Math.round(gross * 0.15); // 15% deductions
      const net = gross - deductions;

      const status = Math.random() < 0.8 ? 'paid' : Math.random() < 0.5 ? 'approved' : 'draft';

      try {
        await prisma.payroll.create({
          data: {
            employeeId: employee.id,
            periodStart: period.start,
            periodEnd: period.end,
            gross,
            deductions,
            net,
            status,
          },
        });
        recordCount++;
      } catch {
        // Skip duplicates
      }
    }
  }

  console.log(`  ✓ ${recordCount} payroll records created`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedPerformanceReviews(employees: any[], users: any[]) {
  console.log('⭐ Seeding performance reviews...');

  // Get admin and HR users as reviewers
  const reviewers = users.filter(u => u.role === 'admin' || u.role === 'hr');

  if (reviewers.length === 0) {
    console.log('  ⚠️  No reviewers found');
    return;
  }

  const periods = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2023'];
  let recordCount = 0;

  for (const employee of employees) {
    // 1-2 reviews per employee
    const numReviews = 1 + Math.floor(Math.random() * 2);

    for (let i = 0; i < numReviews; i++) {
      const reviewer = reviewers[Math.floor(Math.random() * reviewers.length)];
      const period = periods[Math.floor(Math.random() * periods.length)];
      const score = 2 + Math.random() * 3; // 2.0 - 5.0
      const statuses = ['approved', 'approved', 'approved', 'submitted', 'draft'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const notes = [
        'Excellent performance, exceeded expectations in all areas.',
        'Good work overall, some areas for improvement identified.',
        'Met expectations, consistent performer.',
        'Outstanding contribution to the team projects.',
        'Needs improvement in communication and time management.',
      ];

      try {
        await prisma.performanceReview.create({
          data: {
            employeeId: employee.id,
            reviewerId: reviewer.id,
            period,
            score: Math.round(score * 10) / 10,
            notes: notes[Math.floor(Math.random() * notes.length)],
            status,
          },
        });
        recordCount++;
      } catch {
        // Skip errors
      }
    }
  }

  console.log(`  ✓ ${recordCount} performance reviews created`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedLeaveRequests(employees: any[], users: any[]) {
  console.log('🏖️  Seeding leave requests...');

  const approvers = users.filter(u => u.role === 'admin' || u.role === 'hr');

  if (approvers.length === 0) {
    console.log('  ⚠️  No approvers found');
    return;
  }

  const leaveTypes = ['vacation', 'sick', 'personal', 'unpaid'];
  let recordCount = 0;

  for (const employee of employees) {
    // 2-5 leave requests per employee
    const numRequests = 2 + Math.floor(Math.random() * 4);

    for (let i = 0; i < numRequests; i++) {
      const leaveType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];

      // Random start date in last 60 days or next 30 days
      const today = new Date();
      const randomDays = -60 + Math.floor(Math.random() * 90);
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + randomDays);
      startDate.setHours(0, 0, 0, 0);

      // Duration: 1-10 days
      const duration = 1 + Math.floor(Math.random() * 10);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + duration - 1);
      endDate.setHours(23, 59, 59, 999);

      const statuses = ['approved', 'approved', 'pending', 'rejected'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const approver = status !== 'pending' ? approvers[Math.floor(Math.random() * approvers.length)] : null;

      const reasons = [
        'Family vacation',
        'Medical appointment',
        'Personal matters',
        'Sick leave',
        'Annual leave',
        'Emergency',
      ];

      try {
        await prisma.leaveRequest.create({
          data: {
            employeeId: employee.id,
            leaveType,
            startDate,
            endDate,
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            status,
            approvedBy: approver?.id,
            approvedAt: approver ? new Date() : null,
          },
        });
        recordCount++;
      } catch {
        // Skip errors
      }
    }
  }

  console.log(`  ✓ ${recordCount} leave requests created`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedAuditLogs(users: any[]) {
  console.log('📝 Seeding audit logs...');

  const adminUsers = users.filter(u => u.role === 'admin' || u.role === 'hr');

  if (adminUsers.length === 0) {
    console.log('  ⚠️  No admin/HR users for audit logs');
    return;
  }

  const actions = [
    { action: 'user:create', entity: 'user' },
    { action: 'employee:update', entity: 'employee' },
    { action: 'leave:approve', entity: 'leave' },
    { action: 'payroll:process', entity: 'payroll' },
    { action: 'review:submit', entity: 'review' },
  ];

  let recordCount = 0;

  for (let i = 0; i < 30; i++) {
    const actor = adminUsers[Math.floor(Math.random() * adminUsers.length)];
    const actionData = actions[Math.floor(Math.random() * actions.length)];

    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 60));

    await prisma.auditLog.create({
      data: {
        actorUserId: actor.id,
        action: actionData.action,
        entity: actionData.entity,
        entityId: Math.floor(Math.random() * 100),
        meta: JSON.stringify({ timestamp: createdAt.toISOString() }),
        createdAt,
      },
    });
    recordCount++;
  }

  console.log(`  ✓ ${recordCount} audit logs created`);
}

export default seedDatabase;
