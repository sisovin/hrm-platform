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
    const logs = await prisma.auditLog.findMany({ where: { actorUserId: userId }, orderBy: { createdAt: 'desc' }, take: 10 });
    return NextResponse.json(logs);
  } catch (err) {
    console.error('GET activity error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
