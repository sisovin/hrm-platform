import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertRole } from '@/lib/rbac';

export async function GET() {
  try {
    await assertRole(['admin', 'hr']);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Forbidden' }, { status: 403 });
  }

  const departments = await prisma.department.findMany({ include: { positions: true } });
  return NextResponse.json(departments);
}

export async function POST(req: Request) {
  try {
    await assertRole(['admin', 'hr']);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Forbidden' }, { status: 403 });
  }

  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });

  const dept = await prisma.department.create({ data: { name } });
  return NextResponse.json(dept, { status: 201 });
}
