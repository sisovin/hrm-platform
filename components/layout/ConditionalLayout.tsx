'use client';

import { usePathname } from 'next/navigation';
import { LandingHeader } from './LandingHeader';
import { LandingFooter } from './LandingFooter';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we're on a dashboard route (admin, hr, or employee)
  const isDashboardRoute = pathname?.startsWith('/admin') ||
    pathname?.startsWith('/hr') ||
    pathname?.startsWith('/employee');

  // Check if we're on auth routes (login, register)
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // Don't show header/footer for auth routes as they have their own layouts
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Dashboard routes don't need header/footer as they have their own layouts with sidebars
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // Landing page and other public routes
  return (
    <>
      <LandingHeader />
      {children}
      <LandingFooter />
    </>
  );
}
