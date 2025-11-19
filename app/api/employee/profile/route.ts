import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { hash } from 'bcryptjs';
import { z } from 'zod';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = Number((session.user as { id?: string | number }).id);
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { employee: { include: { department: true, position: true } } } });
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...safe } = user;
    return NextResponse.json(safe);
  } catch (err) {
    console.error('GET profile error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = Number((session.user as { id?: string | number }).id);
    const body = await req.json();

    const updateProfileSchema = z.object({
      name: z.string().trim().min(1).optional(),
      password: z.string().min(8).optional(),
    });

    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      const formatted = parsed.error.format();
      return NextResponse.json({ error: 'Validation failed', details: formatted }, { status: 422 });
    }

    const { name, password } = parsed.data;
    const data: Record<string, string> = {};
    if (name) data.name = name;
    if (password) data.passwordHash = await hash(password, 10);
    if (!Object.keys(data).length) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }
    const user = await prisma.user.update({ where: { id: userId }, data });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...safe } = user;
    return NextResponse.json(safe);
  } catch (err) {
    console.error('PUT profile error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
