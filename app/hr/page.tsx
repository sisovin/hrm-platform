import { assertRole } from '@/lib/rbac';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  UserPlus,
  FileText,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default async function HRIndex() {
  try {
    await assertRole(['admin', 'hr']);
  } catch {
    return redirect('/login');
  }

  // Fetch dashboard statistics
  const [
    totalEmployees,
    totalDepartments,
    pendingLeave,
    recentEmployees,
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.department.count(),
    prisma.leaveRequest.count({ where: { status: 'pending' } }),
    prisma.employee.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        department: true,
        position: true,
      },
    }),
  ]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
        <p className="text-muted-foreground">Manage your workforce and HR operations</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active workforce</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDepartments}</div>
            <p className="text-xs text-muted-foreground">Organizational units</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leave</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingLeave}</div>
            <p className="text-xs text-muted-foreground">Requires approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentEmployees.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common HR tasks and operations</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link href="/hr/employees">
              <UserPlus className="h-5 w-5" />
              <span className="text-sm font-medium">Add Employee</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link href="/hr/departments">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">Manage Departments</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link href="/hr/leave">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">Leave Requests</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link href="/hr/reports">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">Generate Reports</span>
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Employees</CardTitle>
            <CardDescription>Recently added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            {recentEmployees.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recent employees
              </div>
            ) : (
              <div className="space-y-3">
                {recentEmployees.map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{emp.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {emp.position.title} • {emp.department.name}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/hr/employees/${emp.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingLeave > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-yellow-50">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium">Leave Requests</p>
                    <p className="text-sm text-muted-foreground">
                      {pendingLeave} pending approval{pendingLeave > 1 ? 's' : ''}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/hr/leave">Review</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pending actions
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
