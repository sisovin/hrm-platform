"use client";

import { SessionProvider } from 'next-auth/react';
import ThemeProviders from './ThemeProvider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviders>
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProviders>
  );
}
