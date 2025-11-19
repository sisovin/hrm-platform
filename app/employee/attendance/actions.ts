"use server";
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { startOfDay, endOfDay } from 'date-fns';

export async function checkIn() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  const userId = Number((session.user as { id?: string | number }).id);
  const employee = await prisma.employee.findUnique({ where: { userId } });
  if (!employee) throw new Error('Employee profile not found');

  const today = new Date();
  const existing = await prisma.attendance.findFirst({
    where: {
      employeeId: employee.id,
      checkInAt: { gte: startOfDay(today), lt: endOfDay(today) },
    },
  });

  if (existing) throw new Error('Already checked in');

  await prisma.attendance.create({ data: { employeeId: employee.id, checkInAt: new Date(), status: 'present' } });
}

export async function checkOut() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  const userId = Number((session.user as { id?: string | number }).id);
  const employee = await prisma.employee.findUnique({ where: { userId } });
  if (!employee) throw new Error('Employee profile not found');

  const today = new Date();
  const record = await prisma.attendance.findFirst({
    where: {
      employeeId: employee.id,
      checkInAt: { gte: startOfDay(today), lt: endOfDay(today) },
      checkOutAt: null,
    },
  });

  if (!record) throw new Error('Not checked in yet');

  await prisma.attendance.update({ where: { id: record.id }, data: { checkOutAt: new Date() } });
}
