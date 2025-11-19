import { auth } from "./auth";
import type { Session } from 'next-auth';
import { prisma } from "./prisma";

export type Role = "admin" | "hr" | "employee";

export async function assertRole(allowedRoles: Role[]) {
  const session = await auth() as Session | null;

  if (!session?.user) {
    throw new Error("Unauthorized: No active session");
  }

  const userRole = (session.user as { role?: string }).role as Role;

  if (!allowedRoles.includes(userRole)) {
    throw new Error(`Forbidden: Role ${userRole} not allowed`);
  }

  return session;
}

export async function hasPermission(userId: number, permissionKey: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return false;

  const rolePermission = await prisma.rolePermission.findFirst({
    where: {
      role: user.role,
      permissionKey: permissionKey,
    },
  });

  return !!rolePermission;
}

export async function getCurrentUser() {
  const session = await auth() as Session | null;

  if (!session?.user) {
    return null;
  }

  const userId = parseInt(String((session.user as { id?: string | number }).id || '0'));

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      employee: {
        include: {
          department: true,
          position: true,
        },
      },
    },
  });

  return user;
}
