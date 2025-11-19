import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRolesAndPermissions() {
  console.log('🔑 Seeding roles and permissions...');

  // Define all permissions
  const permissions = [
    // User permissions
    { key: 'users:read', description: 'View users' },
    { key: 'users:create', description: 'Create new users' },
    { key: 'users:update', description: 'Update user information' },
    { key: 'users:delete', description: 'Delete users' },

    // Employee permissions
    { key: 'employees:read', description: 'View employees' },
    { key: 'employees:create', description: 'Create new employees' },
    { key: 'employees:update', description: 'Update employee information' },
    { key: 'employees:delete', description: 'Delete employees' },

    // Department permissions
    { key: 'departments:read', description: 'View departments' },
    { key: 'departments:write', description: 'Create/update departments' },
    { key: 'departments:delete', description: 'Delete departments' },

    // Attendance permissions
    { key: 'attendance:read', description: 'View attendance records' },
    { key: 'attendance:write', description: 'Create/update attendance records' },
    { key: 'attendance:delete', description: 'Delete attendance records' },

    // Leave permissions
    { key: 'leave:read', description: 'View leave requests' },
    { key: 'leave:create', description: 'Create leave requests' },
    { key: 'leave:approve', description: 'Approve/reject leave requests' },
    { key: 'leave:delete', description: 'Delete leave requests' },

    // Payroll permissions
    { key: 'payroll:read', description: 'View payroll records' },
    { key: 'payroll:process', description: 'Process payroll' },
    { key: 'payroll:approve', description: 'Approve payroll' },

    // Performance permissions
    { key: 'reviews:read', description: 'View performance reviews' },
    { key: 'reviews:create', description: 'Create performance reviews' },
    { key: 'reviews:update', description: 'Update performance reviews' },
    { key: 'reviews:delete', description: 'Delete performance reviews' },

    // Reports permissions
    { key: 'reports:read', description: 'View reports' },
    { key: 'reports:export', description: 'Export reports' },

    // Settings permissions
    { key: 'settings:read', description: 'View settings' },
    { key: 'settings:write', description: 'Update settings' },

    // Audit permissions
    { key: 'audit:read', description: 'View audit logs' },
  ];

  // Create permissions
  console.log(`  Creating ${permissions.length} permissions...`);
  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { key: perm.key },
      update: { description: perm.description },
      create: perm,
    });
  }

  // Define role-permission mappings
  const rolePermissions = {
    admin: permissions.map(p => p.key), // Admin has all permissions
    hr: [
      'users:read',
      'employees:read',
      'employees:create',
      'employees:update',
      'departments:read',
      'departments:write',
      'attendance:read',
      'attendance:write',
      'leave:read',
      'leave:approve',
      'payroll:read',
      'payroll:process',
      'reviews:read',
      'reviews:create',
      'reviews:update',
      'reports:read',
      'reports:export',
      'settings:read',
    ],
    employee: [
      'employees:read', // Can view own profile
      'attendance:read', // Can view own attendance
      'attendance:write', // Can check in/out
      'leave:read', // Can view own leave
      'leave:create', // Can request leave
      'payroll:read', // Can view own payslips
      'reviews:read', // Can view own reviews
    ],
  };

  // Assign permissions to roles
  console.log('  Assigning permissions to roles...');
  for (const [role, permKeys] of Object.entries(rolePermissions)) {
    for (const permKey of permKeys) {
      await prisma.rolePermission.upsert({
        where: {
          role_permissionKey: {
            role,
            permissionKey: permKey,
          },
        },
        update: {},
        create: {
          role,
          permissionKey: permKey,
        },
      });
    }
    console.log(`    ✓ ${role}: ${permKeys.length} permissions`);
  }

  console.log('  ✓ Roles and permissions seeded successfully');
}

export default seedRolesAndPermissions;
