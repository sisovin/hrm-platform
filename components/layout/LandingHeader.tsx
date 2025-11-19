"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Users, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function LandingHeader() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted] = useState(true);
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;

  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">HR Platform</span>
          </Link>

          {/* Centered nav links for md+ */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center gap-6">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Pricing
              </Link>
              <Link href="#docs" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Docs
              </Link>
            </nav>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              suppressHydrationWarning
            >
              {mounted && (
                <>
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </>
              )}
            </Button>

            {/* Auth buttons */}
            {session ? (
              <div className="flex items-center gap-4">
                <Link href={role === 'admin' ? '/admin' : role === 'hr' ? '/hr' : '/employee'}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button variant="ghost" onClick={() => signOut()}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
