#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const { compare } = require('bcryptjs');
const prisma = new PrismaClient();

async function check(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error('User not found: ', email);
    process.exit(1);
  }
  console.log('Found user:', { id: user.id, email: user.email, role: user.role, status: user.status });
  const ok = await compare(password, user.passwordHash);
  console.log('Password compare result:', ok);
  process.exit(ok ? 0 : 2);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/check-login.js <email> <password>');
  process.exit(1);
}

check(args[0], args[1]).catch((e) => {
  console.error(e);
  process.exit(1);
});
