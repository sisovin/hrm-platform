'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Calendar, DollarSign, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight, Building2, Activity } from 'lucide-react';
import { EmployeesByDepartmentChartWrapper } from '@/components/charts/EmployeesByDepartmentChartWrapper';
import { AverageSalaryByDepartmentBarChartWrapper } from '@/components/charts/AverageSalaryByDepartmentBarChartWrapper';

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Welcome back
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+3.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              96.7% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowDownRight className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-8%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$485K</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <AverageSalaryByDepartmentBarChartWrapper />
        </div>
        <div className="col-span-3">
          <EmployeesByDepartmentChartWrapper />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Users className="h-4 w-4" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New employee onboarded</p>
                  <p className="text-sm text-muted-foreground">John Doe joined Engineering</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">2h ago</div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Leave request approved</p>
                  <p className="text-sm text-muted-foreground">Jane Smith&apos;s vacation request</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">4h ago</div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Performance review completed</p>
                  <p className="text-sm text-muted-foreground">Q1 review for 5 employees</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">1d ago</div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Payroll processed</p>
                  <p className="text-sm text-muted-foreground">January payroll completed</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">2d ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Department Statistics</CardTitle>
            <CardDescription>Employee distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="ml-4 flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Engineering</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[75%]"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">45</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="ml-4 flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Sales</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[60%]"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">30</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="ml-4 flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Marketing</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 w-[36%]"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">18</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Users className="h-4 w-4" />
                </div>
                <div className="ml-4 flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">HR</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[24%]"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">12</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Team Building Event</p>
                  <p className="text-xs text-muted-foreground">Friday, Jan 26 - 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Performance Review Deadline</p>
                  <p className="text-xs text-muted-foreground">Monday, Jan 29</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Payroll Processing</p>
                  <p className="text-xs text-muted-foreground">Wednesday, Jan 31</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Action items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">12 pending leave requests</p>
                  <p className="text-xs text-muted-foreground">Review and approve pending requests</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-red-200 bg-red-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">3 contracts expiring soon</p>
                  <p className="text-xs text-muted-foreground">Review contracts in the next 30 days</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">8 open positions</p>
                  <p className="text-xs text-muted-foreground">Active recruitment in progress</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
