# Seeding Guide - Quick Start

## 🚀 Run the Seeders

### Option 1: Using npm script (Recommended)

```bash
npm run db:seed:new
```

### Option 2: Using Prisma directly

```bash
npx prisma db seed
```

### Option 3: Reset database and seed

```bash
npm run db:reset
```

## 📋 What Gets Created

### Users (8)

| Email | Password | Role |
|-------|----------|------|
| <admin@hrm.local> | password123 | admin |
| <hr@hrm.local> | password123 | hr |
| <hr.assistant@hrm.local> | password123 | hr |
| <john.doe@hrm.local> | password123 | employee |
| <jane.smith@hrm.local> | password123 | employee |
| <bob.wilson@hrm.local> | password123 | employee |
| <alice.johnson@hrm.local> | password123 | employee |
| <charlie.brown@hrm.local> | password123 | employee |

### Departments (5)

1. **Engineering** - 5 positions (L1 to Manager)
2. **Human Resources** - 4 positions
3. **Sales** - 4 positions
4. **Marketing** - 4 positions
5. **Finance** - 5 positions

### Sample Data

- **Employees**: 5 records
- **Permissions**: 31 permissions
- **Role Permissions**: Admin (31), HR (17), Employee (7)
- **Attendance**: ~125 records (last 30 days)
- **Payroll**: ~30 records (6 months)
- **Performance Reviews**: ~7-10 reviews
- **Leave Requests**: ~15-25 requests
- **Audit Logs**: 30 records

## 🔧 Before Running

### 1. Update Prisma Schema

The seeders require a unique constraint on Position. Run migration:

```bash
npx prisma migrate dev --name add_position_unique_constraint
```

### 2. Install Dependencies

Make sure ts-node is installed:

```bash
npm install ts-node --save-dev
```

## ✅ Verify Data

### Open Prisma Studio

```bash
npx prisma studio
```

### Check in your app

Login with any user:

- Email: `admin@hrm.local`
- Password: `password123`

## 🔄 Re-seed Database

### Clean and re-seed

```bash
# This will delete all data and run seeders again
npm run db:reset
```

### Manual clean and seed

```bash
npx prisma db push --force-reset
npm run db:seed:new
```

## 🎯 Test Scenarios

### As Admin

1. Login: <admin@hrm.local> / password123
2. Navigate to /admin/employees
3. View all employee records
4. Check /admin/attendance for attendance data
5. Visit /admin/roles for permissions

### As HR

1. Login: <hr@hrm.local> / password123
2. Navigate to /hr
3. Check employee management features
4. Approve leave requests at /hr/leave

### As Employee

1. Login: <john.doe@hrm.local> / password123
2. Navigate to /employee/dashboard
3. View your attendance and payslips
4. Check your performance reviews

## 📝 Common Issues

### Error: ts-node not found

```bash
npm install ts-node --save-dev
```

### Error: Cannot find module '@prisma/client'

```bash
npm run db:generate
```

### Error: Foreign key constraint

```bash
# Delete all data first
npm run db:reset
```

### Error: Unique constraint violation

The seeders are idempotent but if you have existing data with same codes/emails, you'll need to reset:

```bash
npm run db:reset
```

## 🎨 Customization

### Add More Test Users

Edit: `prisma/seeders/TestUsersSeeder.ts`

### Change Department Structure

Edit: `prisma/seeders/DatabaseSeeder.ts` → `seedDepartmentsAndPositions()`

### Adjust Data Volume

Edit: `prisma/seeders/DatabaseSeeder.ts` → Loop counts in seed functions

### Add New Permissions

Edit: `prisma/seeders/RolesAndPermissionsSeeder.ts` → `permissions` array

## 📊 Expected Output

```
🌱 Starting database seeding...

🏢 Seeding departments and positions...
  ✓ Engineering: 5 positions
  ✓ Human Resources: 4 positions
  ✓ Sales: 4 positions
  ✓ Marketing: 4 positions
  ✓ Finance: 5 positions
  ✓ 5 departments created

🔑 Seeding roles and permissions...
  Creating 31 permissions...
  Assigning permissions to roles...
    ✓ admin: 31 permissions
    ✓ hr: 17 permissions
    ✓ employee: 7 permissions
  ✓ Roles and permissions seeded successfully

👥 Seeding test users...
  ✓ admin: Admin User (admin@hrm.local)
  ✓ hr: HR Manager (hr@hrm.local)
  ✓ hr: HR Assistant (hr.assistant@hrm.local)
  ✓ employee: John Doe (john.doe@hrm.local)
  ✓ employee: Jane Smith (jane.smith@hrm.local)
  ✓ employee: Bob Wilson (bob.wilson@hrm.local)
  ✓ employee: Alice Johnson (alice.johnson@hrm.local)
  ✓ employee: Charlie Brown (charlie.brown@hrm.local)
  ✓ 8 test users created

🎭 Assigning roles to users...
  Role distribution:
    - Admin: 1
    - HR: 2
    - Employee: 5
  ✓ Total users: 8

👨‍💼 Seeding employees...
  ✓ EMP-1001: John Doe - Software Engineer in Engineering
  ✓ EMP-1002: Jane Smith - HR Specialist in Human Resources
  ✓ EMP-1003: Bob Wilson - Sales Representative in Sales
  ✓ EMP-1004: Alice Johnson - Marketing Specialist in Marketing
  ✓ EMP-1005: Charlie Brown - Accountant in Finance
  ✓ 5 employees created

📅 Seeding attendance records...
  ✓ 125 attendance records created

💰 Seeding payroll records...
  ✓ 30 payroll records created

⭐ Seeding performance reviews...
  ✓ 8 performance reviews created

🏖️  Seeding leave requests...
  ✓ 19 leave requests created

📝 Seeding audit logs...
  ✓ 30 audit logs created

✅ Database seeding completed successfully!
```

## 🚀 Ready to Go

Your database is now populated with realistic test data. You can:

1. Login with any test user
2. Explore all features
3. Test CRUD operations
4. Verify role-based access control
5. Generate reports

Enjoy testing your HRM Platform! 🎉
