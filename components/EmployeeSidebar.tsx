"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User, Clock, FileText } from 'lucide-react';

const menuItems = [
  { href: '/employee/dashboard', label: 'Dashboard', icon: User },
  { href: '/employee/attendance', label: 'Attendance', icon: Clock },
  { href: '/employee/payslips', label: 'Payslips', icon: FileText },
  { href: '/employee/reviews', label: 'Performance', icon: User },
];

export function EmployeeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">Employee Panel</h2>
        <p className="text-sm text-gray-500">My Account</p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
