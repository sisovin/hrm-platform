# Database Seeders

Comprehensive seeding system for the HRM Platform with modular seeders.

## 📁 Seeder Files

### 1. **RoleSeeder.ts**

Defines the available roles in the system.

- Admin (full access)
- HR (employee management)
- Employee (limited access)

### 2. **RolesAndPermissionsSeeder.ts**

Creates permissions and assigns them to roles.

- **31 permissions** across different modules
- **Admin**: All permissions
- **HR**: 17 permissions (employee, attendance, leave, payroll, reviews)
- **Employee**: 7 permissions (self-service features)

### 3. **TestUsersSeeder.ts**

Creates test user accounts.

- 1 Admin user
- 2 HR users
- 5 Employee users
- All passwords: `password123`

### 4. **EmployeeSeeder.ts**

Creates employee records for user accounts.

- Links users to departments and positions
- Generates employee codes (EMP-1001, EMP-1002, etc.)
- Random hire dates (last 2 years)
- Salary based on position level

### 5. **AssignRolesSeeder.ts**

Summary utility that shows role distribution.

### 6. **DatabaseSeeder.ts**

Main orchestrator that runs all seeders in order.

- Creates 5 departments with multiple positions
- Seeds users and employees
- Generates sample data:
  - 📅 Attendance records (20-25 per employee, last 30 days)
  - 💰 Payroll records (6 months of data)
  - ⭐ Performance reviews (1-2 per employee)
  - 🏖️ Leave requests (2-5 per employee)
  - 📝 Audit logs (30 records)

## 🚀 Usage

### Run All Seeders

```bash
# Using the new modular seeder
npm run seed:new

# Or using prisma directly
npx prisma db seed
```

### Update package.json

Add this to your `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed-new.ts"
  },
  "scripts": {
    "seed:new": "ts-node prisma/seed-new.ts",
    "seed:old": "ts-node prisma/seed.ts"
  }
}
```

### Reset and Seed Database

```bash
# Reset database and run seeders
npx prisma migrate reset

# Or manually
npx prisma db push --force-reset
npm run seed:new
```

## 📊 Sample Data Generated

### Users (8 total)

- <admin@hrm.local> (Admin)
- <hr@hrm.local> (HR Manager)
- <hr.assistant@hrm.local> (HR Assistant)
- <john.doe@hrm.local> (Employee)
- <jane.smith@hrm.local> (Employee)
- <bob.wilson@hrm.local> (Employee)
- <alice.johnson@hrm.local> (Employee)
- <charlie.brown@hrm.local> (Employee)

### Departments (5)

1. Engineering (5 positions)
2. Human Resources (4 positions)
3. Sales (4 positions)
4. Marketing (4 positions)
5. Finance (5 positions)

### Positions (22 total)

Each department has positions with levels: L1, L2, L3, L4, Manager, Senior Manager, Director

### Sample Counts

- **Employees**: 5-8 (based on available users)
- **Attendance**: ~125 records (20-25 per employee)
- **Payroll**: ~30-48 records (6 months per employee)
- **Reviews**: ~7-16 reviews (1-2 per employee)
- **Leave Requests**: ~15-40 requests (2-5 per employee)
- **Audit Logs**: 30 records

## 🔐 Default Credentials

All test users have the same password:

- **Password**: `password123`

### Login as

- **Admin**: <admin@hrm.local>
- **HR**: <hr@hrm.local>
- **Employee**: <john.doe@hrm.local>

## 🛠️ Customization

### Add More Users

Edit `TestUsersSeeder.ts`:

```typescript
const users = [
  {
    email: 'newuser@hrm.local',
    name: 'New User',
    password: 'password123',
    role: 'employee',
  },
  // ... add more
];
```

### Add More Departments

Edit `DatabaseSeeder.ts` in `seedDepartmentsAndPositions()`:

```typescript
const departments = [
  {
    name: 'IT Support',
    positions: [
      { title: 'IT Support Specialist', level: 'L1' },
      { title: 'IT Support Manager', level: 'Manager' },
    ],
  },
  // ... add more
];
```

### Adjust Data Volume

Modify the loops in `DatabaseSeeder.ts`:

- Attendance: Change `numRecords = 20 + Math.floor(Math.random() * 6)`
- Reviews: Change `numReviews = 1 + Math.floor(Math.random() * 2)`
- Leave: Change `numRequests = 2 + Math.floor(Math.random() * 4)`

## 📝 Migration Required

The schema now includes a unique constraint on Position:

```prisma
@@unique([title, level, departmentId])
```

Run migration:

```bash
npx prisma migrate dev --name add_position_unique_constraint
```

## 🔍 Verify Seeded Data

### Check counts

```bash
npx prisma studio
```

### Query in code

```typescript
const counts = {
  users: await prisma.user.count(),
  employees: await prisma.employee.count(),
  departments: await prisma.department.count(),
  attendance: await prisma.attendance.count(),
  payroll: await prisma.payroll.count(),
  reviews: await prisma.performanceReview.count(),
  leave: await prisma.leaveRequest.count(),
};
console.log(counts);
```

## ⚠️ Important Notes

1. **Idempotent**: Seeders use `upsert` to avoid duplicates
2. **Order Matters**: Seeders must run in sequence (handled by DatabaseSeeder)
3. **Foreign Keys**: Users → Employees → Attendance/Payroll/Reviews/Leave
4. **Development Only**: Don't run on production databases

## 🧹 Clean Database

```bash
# Delete all data and reseed
npx prisma migrate reset

# Or manually
npx prisma db push --force-reset
npm run seed:new
```
