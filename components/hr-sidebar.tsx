'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  Users,
  Building2,
  CalendarDays,
  DollarSign,
  Award,
  BarChart3,
  Settings,
  LayoutDashboard,
  ChevronUp,
  User,
  Bell,
  LogOut,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/hr',
    icon: LayoutDashboard,
  },
  {
    title: 'Employees',
    url: '/hr/employees',
    icon: Users,
  },
  {
    title: 'Departments',
    url: '/hr/departments',
    icon: Building2,
  },
  {
    title: 'Attendance',
    url: '/hr/attendance',
    icon: CalendarDays,
  },
  {
    title: 'Leave Management',
    url: '/hr/leave',
    icon: CalendarDays,
  },
  {
    title: 'Payroll',
    url: '/hr/payroll',
    icon: DollarSign,
  },
  {
    title: 'Performance',
    url: '/hr/performance',
    icon: Award,
  },
  {
    title: 'Reports',
    url: '/hr/reports',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    url: '/hr/settings',
    icon: Settings,
  },
];

export function HRSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>HR Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col text-left">
                <span className="text-sm font-medium">{session?.user?.name || 'HR User'}</span>
                <span className="text-xs text-muted-foreground">{session?.user?.email || 'hr@hrm.local'}</span>
              </div>
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/employee/profile" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/hr/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/hr/notifications" className="flex items-center gap-2 cursor-pointer">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
