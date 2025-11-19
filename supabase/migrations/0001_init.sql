-- Supabase/Initial SQL migration for HR Management Platform
-- Creates tables for Users, Permissions, RolePermission, Department, Position, Employee, Attendance, Payroll, PerformanceReview, AuditLog

BEGIN;

CREATE TABLE IF NOT EXISTS "Users" (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'employee',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON "Users" (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON "Users" (role);

CREATE TABLE IF NOT EXISTS "Permission" (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "RolePermission" (
  id SERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  permission_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_permission_key FOREIGN KEY (permission_key) REFERENCES "Permission" (key) ON DELETE CASCADE,
  CONSTRAINT role_permission_unique UNIQUE (role, permission_key)
);

CREATE INDEX IF NOT EXISTS idx_rolepermission_role ON "RolePermission" (role);

CREATE TABLE IF NOT EXISTS "Department" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Position" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  level TEXT NOT NULL,
  department_id INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_position_department FOREIGN KEY (department_id) REFERENCES "Department" (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_position_department ON "Position" (department_id);

CREATE TABLE IF NOT EXISTS "Employee" (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  employee_code TEXT NOT NULL UNIQUE,
  department_id INT NOT NULL,
  position_id INT NOT NULL,
  hire_date DATE NOT NULL,
  salary_base NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_employee_user FOREIGN KEY (user_id) REFERENCES "Users" (id) ON DELETE CASCADE,
  CONSTRAINT fk_employee_department FOREIGN KEY (department_id) REFERENCES "Department" (id),
  CONSTRAINT fk_employee_position FOREIGN KEY (position_id) REFERENCES "Position" (id)
);

CREATE INDEX IF NOT EXISTS idx_employee_user ON "Employee" (user_id);
CREATE INDEX IF NOT EXISTS idx_employee_department ON "Employee" (department_id);
CREATE INDEX IF NOT EXISTS idx_employee_position ON "Employee" (position_id);
CREATE INDEX IF NOT EXISTS idx_employee_code ON "Employee" (employee_code);

CREATE TABLE IF NOT EXISTS "Attendance" (
  id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  check_in_at TIMESTAMPTZ NOT NULL,
  check_out_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'present',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_attendance_employee FOREIGN KEY (employee_id) REFERENCES "Employee" (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_attendance_employee ON "Attendance" (employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_checkin ON "Attendance" (check_in_at);

CREATE TABLE IF NOT EXISTS "Payroll" (
  id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  gross NUMERIC(12,2) NOT NULL,
  deductions NUMERIC(12,2) NOT NULL,
  net NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_payroll_employee FOREIGN KEY (employee_id) REFERENCES "Employee" (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_payroll_employee ON "Payroll" (employee_id);
CREATE INDEX IF NOT EXISTS idx_payroll_period ON "Payroll" (period_start);
CREATE INDEX IF NOT EXISTS idx_payroll_status ON "Payroll" (status);

CREATE TABLE IF NOT EXISTS "PerformanceReview" (
  id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  period TEXT NOT NULL,
  score NUMERIC(3,2) NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_review_employee FOREIGN KEY (employee_id) REFERENCES "Employee" (id) ON DELETE CASCADE,
  CONSTRAINT fk_review_reviewer FOREIGN KEY (reviewer_id) REFERENCES "Users" (id)
);

CREATE INDEX IF NOT EXISTS idx_review_employee ON "PerformanceReview" (employee_id);
CREATE INDEX IF NOT EXISTS idx_review_reviewer ON "PerformanceReview" (reviewer_id);

CREATE TABLE IF NOT EXISTS "AuditLog" (
  id SERIAL PRIMARY KEY,
  actor_user_id INT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id INT,
  meta TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_audit_actor FOREIGN KEY (actor_user_id) REFERENCES "Users" (id)
);

CREATE INDEX IF NOT EXISTS idx_audit_actor ON "AuditLog" (actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON "AuditLog" (entity);
CREATE INDEX IF NOT EXISTS idx_audit_created ON "AuditLog" (created_at);

COMMIT;
