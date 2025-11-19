import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertRole } from '@/lib/rbac';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await assertRole(['admin', 'hr']);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Forbidden' }, { status: 403 });
  }

  const { id: idParam } = await params;
  const id = parseInt(idParam);
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { user: true, department: true, position: true },
  });

  if (!employee) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(employee);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await assertRole(['admin', 'hr']);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Forbidden' }, { status: 403 });
  }

  const { id: idParam } = await params;
  const id = parseInt(idParam);
  const body = await req.json();

  const employee = await prisma.employee.update({
    where: { id },
    data: body,
    include: { user: true, department: true, position: true },
  });

  return NextResponse.json(employee);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await assertRole(['admin']);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Forbidden' }, { status: 403 });
  }

  const { id: idParam } = await params;
  const id = parseInt(idParam);
  await prisma.employee.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
