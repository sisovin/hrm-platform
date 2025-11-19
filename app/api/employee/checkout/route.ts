import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { startOfDay, endOfDay } from 'date-fns';

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = Number((session.user as { id?: string | number }).id);
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return NextResponse.json({ error: 'Employee profile not found' }, { status: 404 });

    const today = new Date();
    const record = await prisma.attendance.findFirst({ where: { employeeId: employee.id, checkInAt: { gte: startOfDay(today), lt: endOfDay(today) }, checkOutAt: null } });
    if (!record) return NextResponse.json({ error: 'Not checked in yet' }, { status: 400 });
    const updated = await prisma.attendance.update({ where: { id: record.id }, data: { checkOutAt: new Date() } });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('POST checkout error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
