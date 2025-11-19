"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Users,
  Menu,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="bg-foreground text-background dark:bg-background dark:text-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-background dark:text-foreground">HR Platform</span>
            </div>

            {/* Centered nav links for md+ */}
            <div className="hidden md:flex flex-1 justify-center">
              <nav className="flex items-center gap-6 text-background-white dark:text-foreground-dark">
                <Link href="features" className="text-gray-200 hover:text-gray-900">
                  Features
                </Link>
                <Link href="pricing" className="text-gray-200 hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="docs" className="text-gray-200 hover:text-gray-900">
                  Docs
                </Link>
              </nav>
            </div>

            {/* Login button sits on the right for md+ */}
            <div className="hidden md:flex items-center">
              {/* Theme Switcher: Moon Icon or Sun Icon */}
              <div className="mr-4">
                <Button
                  variant="ghost"
                  aria-label="Toggle theme"
                  title={(mounted && (resolvedTheme || theme) === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')}
                  aria-checked={mounted && (resolvedTheme || theme) === 'dark'}
                  role="switch"
                  onClick={() => {
                    if (!mounted) return;
                    const current = resolvedTheme || theme;
                    setTheme(current === 'dark' ? 'light' : 'dark');
                  }}
                  className="bg-primary text-secondary dark:bg-primary dark:text-secondary dark:hover:bg-foreground"
                >
                  {mounted && (resolvedTheme || theme) === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                  <span className="sr-only">{mounted && (resolvedTheme || theme) === 'dark' ? 'Dark mode enabled' : 'Light mode enabled'}</span>
                </Button>
              </div>

              {!session ? (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="bg-primary text-secondary dark:bg-primary dark:text-secondary border-blue-500 hover:bg-primary hover:border-blue-800 hover:text-white dark:hover:bg-primary dark:hover:border-blue-800 dark:hover:text-white">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="ghost" className="ml-4 bg-green-500 text-background hover:bg-green-800 border-green-500 hover:border-green-800 hover:text-white">
                      Start Now
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href={role === 'admin' || role === 'hr' ? '/admin' : '/employee/dashboard'}>
                    <Button variant="ghost" className="mr-2">Dashboard</Button>
                  </Link>
                  <Button variant="outline" onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
                </div>
              )}
            </div>

            <Button className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header;