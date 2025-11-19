import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = Number((session.user as { id?: string | number }).id);
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return NextResponse.json({ error: 'Employee profile not found' }, { status: 404 });
    const payrolls = await prisma.payroll.findMany({ where: { employeeId: employee.id }, orderBy: { periodStart: 'desc' }, take: 10 });
    return NextResponse.json(payrolls);
  } catch (err) {
    console.error('GET payslips error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
