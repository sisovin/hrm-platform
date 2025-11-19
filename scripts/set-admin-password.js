#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
const prisma = new PrismaClient();

async function run(email, password) {
  const pwdHash = await hash(password, 10);
  const user = await prisma.user.update({ where: { email }, data: { passwordHash: pwdHash } });
  console.log('Updated user', { id: user.id, email: user.email });
  process.exit(0);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/set-admin-password.js <email> <password>');
  process.exit(1);
}

run(args[0], args[1]).catch((e) => {
  console.error(e);
  process.exit(1);
});
