```md
# Next.js hr management system build prompt (Next.js, React, shadcn, Tailwind)

Build a comprehensive, modern HR Management System using Next.js with multi-panel setup, full roles and permissions, rich resource management, and a polished public landing page. Using a Next.js-compatible stack and patterns. Follow the step-by-step requirements below.

---

## Tech stack and packages

- **Framework:** Next.js (App Router) on React and React DOM latest
- **UI:** shadcn/ui with Tailwind CSS and PostCSS
- **Auth:** NextAuth.js (Credentials + OAuth-ready), JWT sessions
- **RBAC:** Server-side role/permission checks + middleware guards
- **ORM:** Supabase with PostgreSQL for local
- **Scheduling:** Cron job via Vercel Cron or hosted scheduler for payroll
- **Forms & Validation:** React Hook Form + Zod
- **State/Server:** Server Actions, route handlers, ISR/SSG as needed

---

## Project setup

1. **Initialize project:**
   - **Command:** `npx create-next-app@latest hrms-next`
   - **Options:** TypeScript, ESLint, App Router, Tailwind (yes)

2. **Install UI and build tooling:**
   - **Command:** `npm install tailwindcss @tailwindcss/postcss postcss`
   - **Command:** `npx shadcn@latest init`

3. **Install core dependencies:**
   - **Command:** `npm install next-auth @Supabase/client Supabase zod react-hook-form bcrypt jsonwebtoken`
   - **Command:** `npm install @radix-ui/react-dropdown-menu @radix-ui/react-dialog @radix-ui/react-toast lucide-react`
   - Optional: `npm install date-fns @tanstack/react-table`

4. **Tailwind and shadcn setup:**
   - **Configure:** tailwind.config.ts with shadcn presets and paths
   - **Run:** `npx shadcn@latest add button input form table dialog dropdown-menu toast`

---

## Database setup

- **Supabase init:** `npx Supabase init`
- **Environment:** Set `DATABASE_URL` in `.env`
- **Schema models (core):**
  - **User:** id, email, passwordHash, name, role (admin|hr|employee), status
  - **Permission:** id, key, description
  - **RolePermission:** role, permissionKey
  - **Employee:** userId, employeeCode, departmentId, positionId, hireDate, salaryBase
  - **Department:** id, name
  - **Position:** id, title, level, departmentId
  - **Attendance:** id, employeeId, checkInAt, checkOutAt, status
  - **Payroll:** id, employeeId, periodStart, periodEnd, gross, deductions, net, status
  - **PerformanceReview:** id, employeeId, reviewerId, period, score, notes
  - **AuditLog:** id, actorUserId, action, entity, entityId, meta, createdAt
- **Migrate:** `npx Supabase migrate dev --name init_hrms`

---

## Auth, roles, and permissions

- **NextAuth:** Credentials provider with bcrypt password validation; JWT session includes user role.
- **RBAC guards:**
  - **Middleware:** `middleware.ts` checks role-based access per route prefix: `/admin`, `/hr`, `/employee`.
  - **Server utilities:** `assertRole(role)` and `hasPermission(user, key)` for server actions, loaders, and API routes.
- **Password reset:** Token-based flow with email link (Magic token table or JWT short-lived), reset UI page.

---

## Multi-panel setup and routing

- **Panels:**
  - **Admin panel:** `/admin` for global configuration, roles/permissions, user management, audits.
  - **HR panel:** `/hr` for employees, departments, positions, payroll, performance reviews, attendance oversight.
  - **Employee panel:** `/employee` for dashboard, profile, attendance check-in/out, payslips, reviews visibility.
- **Route structure:**
  - `app/admin/(routes)/users`
  - `app/admin/(routes)/roles`
  - `app/admin/(routes)/permissions`
  - `app/hr/(routes)/employees`
  - `app/hr/(routes)/departments`
  - `app/hr/(routes)/positions`
  - `app/hr/(routes)/payroll`
  - `app/hr/(routes)/reviews`
  - `app/hr/(routes)/attendance`
  - `app/employee/(routes)/dashboard`
  - `app/employee/(routes)/attendance`
  - `app/employee/(routes)/payslips`
  - `app/employee/(routes)/profile`

---

## Resources and actions

- **Admin resources:**
  - **Users:** CRUD, role assignment, deactivate/reactivate, audit trail.
  - **Roles & permissions:** CRUD for roles, mapping permissions to roles.
  - **Settings:** Payroll configs (periodicity, tax rates), attendance rules.

- **HR resources:**
  - **Employees:** CRUD, import CSV, bulk update salary/department.
  - **Departments & positions:** CRUD, position leveling and department mapping.
  - **Payroll:** Generate, review, approve, lock period, export payslips (PDF).
  - **Performance reviews:** Create templates, schedule periods, assign reviewers, record scores and notes.
  - **Attendance:** View logs, correct entries, approve requests.

- **Employee resources:**
  - **Dashboard:** Profile, latest payslip, attendance status, upcoming reviews.
  - **Attendance:** Daily check-in/out, history, request correction.
  - **Payslips:** View/download approved payslips.
  - **Profile:** Update personal details and password.

---

## Payroll automation job

- **Scheduling:** Use Vercel Cron or external scheduler hitting `/api/jobs/payroll`.
- **Server action/API handler:**
  - **Input:** periodStart/periodEnd
  - **Process:** Aggregate attendance, compute gross, apply deductions, finalize net, write Payroll rows.
  - **Permissions:** Admin or HR only; logs to AuditLog.

---

## Performance reviews management

- **Templates:** Define criteria and weights.
- **Cycles:** Open/close periods; assignments per employee with reviewer.
- **Entries:** Reviewer submits score/notes; employee acknowledges; HR approves.

---

## Attendance check-in/out page

- **Employee page:** `/employee/attendance`
- **Actions:** Server actions for `checkIn`, `checkOut` with timestamp and status; prevent duplicates; optional geolocation/IP logging.
- **UI:** Big “Check in”/“Check out” buttons, today’s status, recent history table.

---

## UI and design

- **shadcn components:** Button, Input, Table, Dialog, Dropdown, Toast.
- **Theme:** Tailwind with semantic tokens; responsive layout; App Router layouts per panel with persistent sidebar/topbar.
- **Polish:** Loading states (Skeleton), empty states, error toasts, accessible forms with Zod validation.

---

## Public home landing page

- **Route:** `/`
- **Sections:**
  - **Header:** Logo, navigation (Features, Pricing, Docs, Login).
  - **Hero:** Value proposition, CTA buttons (Get started, Demo).
  - **Main:** Feature highlights (Multi-panel, RBAC, Payroll automation, Attendance, Reviews), screenshots or illustrations.
  - **Footer:** Links (Privacy, Terms, Contact), social.

---

## Example directory structure

- **app/**
  - **layout.tsx:** global shell with header/footer
  - **page.tsx:** public landing page
  - **admin/hr/employee:** per-panel layouts and routes
- **components/**
  - **ui/** shadcn components
  - **forms/** common form wrappers
- **lib/**
  - **auth.ts:** NextAuth config
  - **rbac.ts:** role/permission helpers
  - **Supabase.ts:** Supabase client
  - **payroll.ts:** payroll calculations
- **styles/**
  - **globals.css:** Tailwind base
- **Supabase/**
  - **schema.Supabase**

---

## Minimal code stubs

#### NextAuth session with role
```ts
// lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { Supabase } from "./Supabase";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const user = await Supabase.user.findUnique({ where: { email: credentials?.email } });
        if (!user) return null;
        const ok = await compare(credentials!.password, user.passwordHash);
        if (!ok) return null;
        return { id: String(user.id), email: user.email, role: user.role, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = (user as any).role;
      return token;
    },
    session: async ({ session, token }) => {
      (session.user as any).role = token.role;
      return session;
    },
  },
});
```

#### Middleware for panel protection
```ts
// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const panelRole: Record<string, string[]> = {
  "/admin": ["admin"],
  "/hr": ["admin", "hr"],
  "/employee": ["admin", "hr", "employee"],
};

export async function middleware(req: Request) {
  const url = new URL((req as any).url);
  const path = url.pathname;
  const match = Object.keys(panelRole).find((p) => path.startsWith(p));
  if (!match) return NextResponse.next();

  const token = await getToken({ req: req as any });
  if (!token || !panelRole[match].includes((token as any).role)) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/hr/:path*", "/employee/:path*"] };
```

#### Attendance server actions
```ts
// app/employee/attendance/actions.ts
"use server";
import { Supabase } from "@/lib/Supabase";
import { auth } from "@/lib/auth";

export async function checkIn() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const employee = await Supabase.employee.findUnique({ where: { userId: Number(session.user.id) } });

  const today = new Date();
  const existing = await Supabase.attendance.findFirst({
    where: { employeeId: employee!.id, checkInAt: { gte: startOfDay(today), lt: endOfDay(today) } },
  });
  if (existing) throw new Error("Already checked in");

  await Supabase.attendance.create({ data: { employeeId: employee!.id, checkInAt: new Date(), status: "present" } });
}

export async function checkOut() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const employee = await Supabase.employee.findUnique({ where: { userId: Number(session.user.id) } });

  const today = new Date();
  const record = await Supabase.attendance.findFirst({
    where: { employeeId: employee!.id, checkInAt: { gte: startOfDay(today), lt: endOfDay(today) }, checkOutAt: null },
  });
  if (!record) throw new Error("Not checked in yet");

  await Supabase.attendance.update({ where: { id: record.id }, data: { checkOutAt: new Date() } });
}
```

---

## Deliverables checklist

- **Project setup complete** with Next.js, Tailwind, shadcn, Supabase, NextAuth
- **Database migrated** with HR models
- **Multi-panel routes** with role-based guards
- **Admin resources** for users, roles, permissions, settings
- **HR resources** for employees, departments, positions, payroll, reviews, attendance
- **Employee resources** for dashboard, profile, attendance, payslips
- **Payroll job** implemented and schedulable
- **Performance review workflows** defined and usable
- **Attendance check-in/out** page functional
- **Public landing page** polished with header, main, footer

---

## Quick start next steps

- **Run dev:** `npm run dev`
- **Seed data:** Create admin user and base roles/permissions via a seed script.
- **Add UI:** Use shadcn to scaffold tables/forms for each resource.
- **Deploy:** Vercel; set environment variables (DATABASE_URL, NEXTAUTH_SECRET), configure cron for payroll.

---
```