import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash as bcryptHash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const hash = await bcryptHash(password, 10);
    const user = await prisma.user.create({ data: { email, name, passwordHash: hash, role: 'employee', status: 'active' } });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...safe } = user;
    return NextResponse.json(safe, { status: 201 });
  } catch (err) {
    console.error('register error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
