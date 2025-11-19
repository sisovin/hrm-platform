import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from '@/components/ui/sonner';
import AppProviders from '@/components/providers/AppProviders';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HR Platform - Modern HR Management System",
  description: "Comprehensive HR management solution with multi-panel interface, payroll automation, attendance tracking, and performance reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressContentEditableWarning={true}
      >
        <AppProviders>
          <ConditionalLayout>
            <Toaster />
            {children}
          </ConditionalLayout>
        </AppProviders>
      </body>
    </html>
  );
}

