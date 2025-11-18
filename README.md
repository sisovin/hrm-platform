# # 🏢 HR Management Platform

<div align="center">

![HR Management System](./public/images/hrm-dashboard.png)

**A comprehensive, modern HR Management System built with Next.js**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Database Setup](#-database-setup)
- [Project Structure](#-project-structure)
- [Available Routes](#-available-routes)
- [Usage](#-usage)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The HR Management Platform is a comprehensive, enterprise-ready solution for managing all aspects of human resources operations. Built with modern web technologies, it provides a seamless experience across three distinct user panels: Admin, HR Manager, and Employee self-service portals.

### Why Choose This Platform?

- 🎨 **Modern UI/UX** - Beautiful, responsive interface built with shadcn/ui and Tailwind CSS
- 🔐 **Secure & Scalable** - Role-based access control with NextAuth.js and JWT sessions
- ⚡ **Fast Performance** - Built on Next.js 16 with App Router and server-side rendering
- 📊 **Data-Driven** - PostgreSQL database with Prisma ORM for type-safe queries
- 🔄 **Real-Time Updates** - Server actions and optimistic UI updates
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

---

## ✨ Features

### 🎛️ Multi-Panel Interface

#### Admin Panel (`/admin`)

- 📊 **Dashboard** - Real-time metrics, activities, and alerts
- 👥 **Employee Management** - Complete CRUD operations with search and filters
- 🕐 **Attendance Tracking** - Monitor daily attendance and late arrivals
- 📅 **Leave Management** - Approve/reject leave requests and track balances
- 💰 **Payroll Processing** - Automated calculations with deductions
- 📈 **Performance Reviews** - Structured review cycles and goal tracking
- 🏢 **Department Management** - Organize and manage departments
- 📊 **Reports & Analytics** - Comprehensive reporting tools
- ⚙️ **Settings** - System configuration and policies

#### HR Panel (`/hr`) - Coming Soon

- Advanced employee analytics
- Recruitment management
- Onboarding workflows
- Training and development tracking

#### Employee Panel (`/employee`) - Coming Soon

- Personal dashboard
- Attendance check-in/out
- Leave requests
- Payslip downloads
- Profile management

### 🔐 Security Features

- **Role-Based Access Control (RBAC)** - Granular permissions system
- **JWT Authentication** - Secure session management
- **Audit Trail** - Complete activity logging
- **Password Encryption** - bcrypt hashing
- **Middleware Guards** - Route-level protection

### 💼 HR Operations

- **Attendance System**
  - Daily check-in/check-out
  - Late arrival tracking
  - Absence management
  - Overtime calculation

- **Leave Management**
  - Multiple leave types (sick, vacation, personal)
  - Balance tracking
  - Approval workflows
  - Calendar integration

- **Payroll Automation**
  - Automated salary calculations
  - Tax and deduction handling
  - Digital payslip generation
  - Export to PDF/Excel

- **Performance Management**
  - Review templates
  - Goal setting and tracking
  - 360-degree feedback
  - Performance analytics

---

## 🛠️ Tech Stack

### Frontend

- **Framework** - [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library** - [React 19](https://reactjs.org/)
- **Language** - [TypeScript](https://www.typescriptlang.org/)
- **Styling** - [Tailwind CSS 4](https://tailwindcss.com/)
- **Components** - [shadcn/ui](https://ui.shadcn.com/)
- **Icons** - [Lucide React](https://lucide.dev/)
- **Forms** - [React Hook Form](https://react-hook-form.com/)
- **Validation** - [Zod](https://zod.dev/)

### Backend

- **Database** - [PostgreSQL](https://www.postgresql.org/)
- **ORM** - [Prisma](https://www.prisma.io/)
- **Authentication** - [NextAuth.js](https://next-auth.js.org/)
- **API** - Next.js Server Actions & Route Handlers

### DevOps

- **Package Manager** - npm
- **Version Control** - Git
- **Deployment** - Vercel (recommended)

---

## 🎥 Demo

![Dashboard](./public/images/dashboard.png)

### Live Demo

🚀 [Visit Live Demo](https://hrm-platform.vercel.app) _(Coming Soon)_

### Video Walkthrough

📹 [Watch Demo Video](https://youtube.com) _(Coming Soon)_

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 14.0 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))
- **npm** or **yarn** package manager

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/sisovin/hrm-platform.git
   cd hrm-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://postgres:password@localhost:5432/hrms_db?schema=public"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

   # App
   NODE_ENV="development"
   ```

   > 🔑 **Generate a secure NEXTAUTH_SECRET:**
>
   > ```bash
   > openssl rand -base64 32
   > ```

4. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

   > ⚠️ **Note:** If you encounter network issues with Prisma engines, the build will still succeed with fallback handlers. See [Troubleshooting](#-troubleshooting) section.

5. **Set up the database**

   ```bash
   # Create database
   createdb hrms_db

   # Run migrations
   npx prisma migrate dev --name init

   # (Optional) Seed sample data
   npx prisma db seed
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes | - |
| `NEXTAUTH_URL` | Application URL | ✅ Yes | <http://localhost:3000> |
| `NEXTAUTH_SECRET` | Secret for JWT signing | ✅ Yes | - |
| `NODE_ENV` | Environment mode | ❌ No | development |

### Database Configuration

Edit your PostgreSQL connection string in `.env`:

```
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]?schema=public"
```

### Authentication Settings

Configure NextAuth.js in `lib/auth.ts`:

- Session strategy (JWT/Database)
- OAuth providers
- Callback URLs
- Session duration

---

## 🗄️ Database Setup

### Schema Overview

The application uses Prisma ORM with the following main models:

```prisma
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String
  name         String
  role         String   @default("employee")
  status       String   @default("active")
}

model Employee {
  id             Int      @id @default(autoincrement())
  userId         Int      @unique
  employeeCode   String   @unique
  departmentId   Int?
  positionId     Int?
  hireDate       DateTime
  salaryBase     Decimal
}

model Attendance {
  id         Int       @id @default(autoincrement())
  employeeId Int
  checkInAt  DateTime
  checkOutAt DateTime?
  status     String
}

// ... and more models
```

### Running Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations to production
npx prisma migrate deploy

# Reset database (⚠️ Development only!)
npx prisma migrate reset
```

### Prisma Studio

View and edit your database with Prisma Studio:

```bash
npx prisma studio
```

Opens at [http://localhost:5555](http://localhost:5555)

---

## 📁 Project Structure

```
hrm-platform/
├── app/                          # Next.js App Router
│   ├── (public)/                # Public routes (landing page)
│   │   └── page.tsx            # Homepage
│   ├── admin/                   # Admin panel routes
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── employees/          # Employee management
│   │   ├── attendance/         # Attendance tracking
│   │   ├── leave/              # Leave management
│   │   ├── payroll/            # Payroll processing
│   │   ├── performance/        # Performance reviews
│   │   ├── departments/        # Department management
│   │   ├── reports/            # Reports & analytics
│   │   └── settings/           # System settings
│   ├── api/                     # API routes
│   │   └── auth/               # NextAuth endpoints
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── AdminHeader.tsx          # Admin header component
│   └── AdminSidebar.tsx         # Admin sidebar navigation
│
├── lib/                          # Utility libraries
│   ├── auth.ts                  # NextAuth configuration
│   ├── prisma.ts                # Prisma client instance
│   ├── rbac.ts                  # RBAC utilities
│   └── utils.ts                 # Helper functions
│
├── prisma/                       # Database
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Migration files
│   └── seed.ts                  # Seed script
│
├── public/                       # Static assets
│   ├── images/                  # Images
│   └── ...
│
├── .env                          # Environment variables (not in git)
├── .gitignore                   # Git ignore rules
├── components.json              # shadcn/ui config
├── middleware.ts                # Next.js middleware (RBAC)
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies
├── postcss.config.mjs           # PostCSS config
├── tailwind.config.ts           # Tailwind config
└── tsconfig.json                # TypeScript config
```

---

## 🛣️ Available Routes

### Public Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/login` | Login page | Public |

### Admin Routes (`/admin`)

| Route | Description | Access |
|-------|-------------|--------|
| `/admin` | Dashboard overview | Admin |
| `/admin/employees` | Employee management | Admin |
| `/admin/attendance` | Attendance tracking | Admin |
| `/admin/leave` | Leave management | Admin |
| `/admin/payroll` | Payroll processing | Admin |
| `/admin/performance` | Performance reviews | Admin |
| `/admin/departments` | Department management | Admin |
| `/admin/reports` | Reports & analytics | Admin |
| `/admin/settings` | System settings | Admin |

### HR Routes (`/hr`) - Coming Soon

| Route | Description | Access |
|-------|-------------|--------|
| `/hr/dashboard` | HR dashboard | HR, Admin |
| `/hr/employees` | Employee directory | HR, Admin |
| `/hr/recruitment` | Recruitment management | HR, Admin |

### Employee Routes (`/employee`) - Coming Soon

| Route | Description | Access |
|-------|-------------|--------|
| `/employee/dashboard` | Employee dashboard | All authenticated |
| `/employee/attendance` | Check-in/out | All authenticated |
| `/employee/payslips` | View payslips | All authenticated |
| `/employee/profile` | Edit profile | All authenticated |

---

## 💻 Usage

### For Administrators

1. **Login** to the admin panel at `/admin`
2. **Add employees** via Employees > Add New Employee
3. **Set up departments** in Departments section
4. **Configure settings** including payroll periods and leave policies
5. **Monitor attendance** and approve leave requests
6. **Process payroll** at the end of each pay period

### For HR Managers

1. **Manage employee records** - CRUD operations
2. **Track attendance** - View daily reports
3. **Approve requests** - Leave, corrections, etc.
4. **Conduct reviews** - Performance evaluations
5. **Generate reports** - Analytics and insights

### For Employees

1. **Check in/out** daily attendance
2. **Request leave** through the portal
3. **View payslips** online
4. **Update profile** information
5. **Track goals** and performance

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Run migrations (dev)
npx prisma migrate deploy  # Run migrations (prod)

# Testing
npm run test         # Run tests (when configured)
```

### Code Style

This project uses:

- **ESLint** for linting
- **Prettier** for code formatting (recommended)
- **TypeScript** for type safety

### Adding New Features

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit: `git commit -m "Add: your feature description"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sisovin/hrm-platform)

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables for Production

Ensure these are set in your production environment:

- `DATABASE_URL` - Production database URL
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Strong secret key
- `NODE_ENV=production`

---

## 🐛 Troubleshooting

### Prisma Client Not Generated

**Error:** `@prisma/client did not initialize yet`

**Solution:**

```bash
npx prisma generate
```

If you encounter network issues:

```bash
# Windows PowerShell
$env:PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING="1"
npx prisma generate

# Linux/Mac
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate
```

### Database Connection Issues

**Error:** `Can't reach database server`

**Solutions:**

1. Verify PostgreSQL is running
2. Check `DATABASE_URL` in `.env`
3. Ensure database exists: `createdb hrms_db`
4. Check firewall settings

### Build Failures

**Error:** `Module not found` or TypeScript errors

**Solutions:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run build
```

### Authentication Issues

**Error:** NextAuth callbacks not working

**Solutions:**

1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Clear browser cookies and try again

### Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | Change port: `PORT=3001 npm run dev` |
| Slow build times | Use `npm run dev` for development |
| Styling not applied | Run `npm run build` to rebuild |
| Database migration failed | Run `npx prisma migrate reset` (dev only) |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create your feature branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 HR Management Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👥 Authors

**Sisovin**

- GitHub: [@sisovin](https://github.com/sisovin)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Vercel](https://vercel.com/) - Deployment platform
- All contributors who help improve this project

---

## 📞 Support

- 📧 Email: <support@hrm-platform.com>
- 💬 Discord: [Join our community](https://discord.gg/hrm-platform)
- 🐛 Issues: [GitHub Issues](https://github.com/sisovin/hrm-platform/issues)
- 📚 Documentation: [Wiki](https://github.com/sisovin/hrm-platform/wiki)

---

## 🗺️ Roadmap

### Version 1.0 (Current)

- [x] Admin panel with dashboard
- [x] Employee management
- [x] Attendance tracking
- [x] Leave management
- [x] Payroll processing
- [x] Performance reviews
- [x] Department management
- [x] Reports & analytics

### Version 1.1 (Upcoming)

- [ ] HR panel implementation
- [ ] Employee self-service portal
- [ ] Mobile app (React Native)
- [ ] Advanced reporting
- [ ] Email notifications
- [ ] Calendar integration

### Version 2.0 (Future)

- [ ] Recruitment module
- [ ] Training management
- [ ] Asset management
- [ ] Document management
- [ ] Time tracking
- [ ] Expense management

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=sisovin/hrm-platform&type=Date)](https://star-history.com/#sisovin/hrm-platform&Date)

---

<div align="center">

**Made with ❤️ by [Sisovin](https://github.com/sisovin)**

If you found this helpful, please consider giving it a ⭐️!

[⬆ Back to Top](#-hr-management-platform)

</div>
