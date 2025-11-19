import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertRole } from '@/lib/rbac';

export async function GET() {
  try {
    await assertRole(['admin']);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Forbidden' }, { status: 403 });
  }

  const users = await prisma.user.findMany({ include: { employee: true } });
  return NextResponse.json(users);
}

// Create/Update/Delete could be added in similar fashion
