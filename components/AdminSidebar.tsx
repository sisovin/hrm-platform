'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Building2,
  FileText,
  Settings,
} from 'lucide-react';

const menuItems = [
  { href: '/admin/employees', label: 'Employees', icon: Users },
  { href: '/admin/attendance', label: 'Attendance', icon: Clock },
  { href: '/admin/leave', label: 'Leave', icon: Calendar },
  { href: '/admin/payroll', label: 'Payroll', icon: DollarSign },
  { href: '/admin/performance', label: 'Performance', icon: TrendingUp },
  { href: '/admin/departments', label: 'Departments', icon: Building2 },
  { href: '/admin/reports', label: 'Reports', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">HR Platform</h2>
        <p className="text-sm text-gray-500">Admin Panel</p>
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
