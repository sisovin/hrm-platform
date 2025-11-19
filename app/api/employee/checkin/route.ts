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
    const existing = await prisma.attendance.findFirst({ where: { employeeId: employee.id, checkInAt: { gte: startOfDay(today), lt: endOfDay(today) } } });
    if (existing) return NextResponse.json({ error: 'Already checked in' }, { status: 400 });
    const record = await prisma.attendance.create({ data: { employeeId: employee.id, checkInAt: new Date(), status: 'present' } });
    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    console.error('POST checkin error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
