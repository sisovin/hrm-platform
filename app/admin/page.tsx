'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">96.7% attendance rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Leave Requests</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Requires action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$485K</div>
            <p className="text-xs text-muted-foreground">For January 2024</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New employee onboarded</p>
                  <p className="text-xs text-muted-foreground">John Doe joined Engineering - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Leave request approved</p>
                  <p className="text-xs text-muted-foreground">Jane Smith's vacation request - 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Performance review completed</p>
                  <p className="text-xs text-muted-foreground">Q1 review for 5 employees - Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Payroll processed</p>
                  <p className="text-xs text-muted-foreground">January payroll completed - 2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Engineering</span>
                  <span className="text-muted-foreground">45 employees</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Sales</span>
                  <span className="text-muted-foreground">30 employees</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Marketing</span>
                  <span className="text-muted-foreground">18 employees</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">HR</span>
                  <span className="text-muted-foreground">12 employees</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Team Building Event</p>
                  <p className="text-xs text-muted-foreground">Friday, Jan 26 - 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Performance Review Deadline</p>
                  <p className="text-xs text-muted-foreground">Monday, Jan 29</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Payroll Processing</p>
                  <p className="text-xs text-muted-foreground">Wednesday, Jan 31</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">12 pending leave requests</p>
                  <p className="text-xs text-muted-foreground">Review and approve pending requests</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-red-200 bg-red-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">3 contracts expiring soon</p>
                  <p className="text-xs text-muted-foreground">Review contracts in the next 30 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">8 open positions</p>
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
