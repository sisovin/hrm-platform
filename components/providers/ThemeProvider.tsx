"use client";

import { ThemeProvider } from "next-themes";

export default function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    // Use a deterministic default theme for SSR to avoid hydration mismatches.
    // Set `enableSystem` false to avoid server/client mismatch for `system`.
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
