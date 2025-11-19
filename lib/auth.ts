import Credentials from "next-auth/providers/credentials";
import { getServerSession } from 'next-auth/next';
import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          if (process.env.NODE_ENV !== 'production') {
            console.debug('[auth] attempting to authorize', credentials.email);
          }

          // Normalize email to avoid common whitespace/case mismatches
          const normalizedEmail = String(credentials.email).trim().toLowerCase();

          if (process.env.NODE_ENV !== 'production') {
            console.debug('[auth] normalized email', normalizedEmail);
          }

          // Use case-insensitive match for email to avoid issues with capitalization
          const user = await prisma.user.findFirst({ where: { email: { equals: normalizedEmail, mode: 'insensitive' } } });

          if (process.env.NODE_ENV !== 'production') {
            console.debug('[auth] found user?', !!user, user ? { id: user.id, role: user.role, status: user.status } : undefined);
          }

          if (!user) {
            return null;
          }

          const attempt = credentials.password as string;
          const isPasswordValid = await compare(attempt, user.passwordHash);

          if (process.env.NODE_ENV !== 'production') {
            console.debug('[auth] password attempt length', attempt.length);
            console.debug('[auth] password hash length', user.passwordHash?.length);
          }

          if (process.env.NODE_ENV !== 'production') {
            console.debug('[auth] password valid?', isPasswordValid);
          }

          if (!isPasswordValid) {
            return null;
          }

          if (user.status !== "active") {
            return null;
          }

          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User & { role?: string; id?: string | number } }) => {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT & { role?: string; id?: string | number } }) => {
      if (session.user) {
        (session.user as { role?: string; id?: string | number }).role = token.role as string;
        (session.user as { role?: string; id?: string | number }).id = token.id as string | number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// Helper to get the server session from NextAuth
export async function auth(): Promise<Session | null> {
  return await getServerSession(authConfig);
}

// Default export the config for the App Router route
export default authConfig;
