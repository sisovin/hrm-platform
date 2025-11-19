import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertRole } from '@/lib/rbac';

export async function GET() {
  // Only HR and admin can list employees
  try {
    await assertRole(['admin', 'hr']);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Forbidden' }, { status: 403 });
  }

  const employees = await prisma.employee.findMany({
    include: {
      user: true,
      department: true,
      position: true,
    },
    orderBy: { id: 'asc' },
  });

  return NextResponse.json(employees);
}

export async function POST(req: Request) {
  try {
    await assertRole(['admin', 'hr']);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const {
    email,
    name,
    employeeCode,
    departmentId,
    positionId,
    hireDate,
    salaryBase,
    password,
  } = body;

  if (!email || !name || !employeeCode || !departmentId || !positionId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Create user if not exists (basic)
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const hash = password || 'password123';
    const bcrypt = await import('bcryptjs');
    const pwdHash = await bcrypt.hash(hash, 10);
    user = await prisma.user.create({
      data: { email, name, passwordHash: pwdHash, role: 'employee' },
    });
  }

  // Create employee
  const employee = await prisma.employee.create({
    data: {
      userId: user.id,
      employeeCode,
      departmentId,
      positionId,
      hireDate: new Date(hireDate ?? new Date()),
      salaryBase: salaryBase ?? 0,
    },
    include: { user: true, department: true, position: true },
  });

  return NextResponse.json(employee, { status: 201 });
}
