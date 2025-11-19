'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Calendar,
  DollarSign,
  Award,
  Clock,
  CheckCircle,
  FileText,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { EmployeesByDepartmentChartWrapper as EmployeesByDepartmentChart } from '@/components/charts/EmployeesByDepartmentChartWrapper';
import { AverageSalaryByDepartmentBarChartWrapper as AverageSalaryByDepartmentBarChart } from '@/components/charts/AverageSalaryByDepartmentBarChartWrapper';

interface DashboardStats {
  totalAttendance: number;
  presentDays: number;
  leaveTaken: number;
  pendingLeave: number;
  upcomingPayslips: number;
  lastReviewScore: number;
}

interface AttendanceRecord {
  id: number;
  checkInAt: string;
  checkOutAt: string | null;
  status: string;
}

interface Payslip {
  id: number;
  period: string;
  grossAmount: number;
  deductions: number;
  netAmount: number;
  paidOn: string | null;
}

interface PerformanceReview {
  id: number;
  period: string;
  score: number;
  notes: string;
  createdAt: string;
}

export default function EmployeeDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalAttendance: 0,
    presentDays: 0,
    leaveTaken: 0,
    pendingLeave: 0,
    upcomingPayslips: 0,
    lastReviewScore: 0,
  });
  const [recentAttendance, setRecentAttendance] = useState<AttendanceRecord[]>([]);
  const [recentPayslips, setRecentPayslips] = useState<Payslip[]>([]);
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [attendanceRes, payslipsRes, reviewsRes] = await Promise.all([
        fetch('/api/employee/attendance'),
        fetch('/api/employee/payslips'),
        fetch('/api/employee/reviews'),
      ]);

      if (attendanceRes.ok) {
        const attData = await attendanceRes.json();
        setRecentAttendance(attData.slice(0, 5));

        // Calculate stats
        const presentCount = attData.filter((a: AttendanceRecord) => a.checkOutAt).length;
        const today = new Date().toDateString();
        const checkedInToday = attData.some(
          (a: AttendanceRecord) =>
            new Date(a.checkInAt).toDateString() === today && !a.checkOutAt
        );
        setTodayCheckedIn(checkedInToday);

        setStats(prev => ({
          ...prev,
          totalAttendance: attData.length,
          presentDays: presentCount,
        }));
      }

      if (payslipsRes.ok) {
        const payData = await payslipsRes.json();
        setRecentPayslips(payData.slice(0, 3));
        setStats(prev => ({
          ...prev,
          upcomingPayslips: payData.filter((p: Payslip) => !p.paidOn).length,
        }));
      }

      if (reviewsRes.ok) {
        const revData = await reviewsRes.json();
        setReviews(revData.slice(0, 3));
        const lastScore = revData[0]?.score || 0;
        setStats(prev => ({
          ...prev,
          lastReviewScore: lastScore,
        }));
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await fetch('/api/employee/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to check in');

      toast.success('Checked in successfully');
      setTodayCheckedIn(true);
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to check in');
      console.error(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await fetch('/api/employee/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to check out');

      toast.success('Checked out successfully');
      setTodayCheckedIn(false);
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to check out');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {session?.user?.name || 'Employee'}!</h1>
        <p className="text-muted-foreground">Here&apos;s your overview for today</p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your daily tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          {!todayCheckedIn ? (
            <Button onClick={handleCheckIn}>
              <LogIn className="mr-2 h-4 w-4" />
              Check In
            </Button>
          ) : (
            <Button variant="outline" onClick={handleCheckOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Check Out
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/employee/leave">Request Leave</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/employee/profile">Update Profile</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAttendance}</div>
            <p className="text-xs text-muted-foreground">
              {stats.presentDays} days present
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Status</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leaveTaken}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingLeave} pending requests
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payslips</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentPayslips.length}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingPayslips} upcoming
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lastReviewScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Last review score</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row - Full Width */}
      <div className="grid gap-4 md:grid-cols-2">
        <EmployeesByDepartmentChart />
        <AverageSalaryByDepartmentBarChart />
      </div>

      {/* Data Tables Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Your last 5 attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : recentAttendance.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No attendance records yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAttendance.map((att) => (
                  <div key={att.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {new Date(att.checkInAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        In: {new Date(att.checkInAt).toLocaleTimeString()}
                        {att.checkOutAt && ` | Out: ${new Date(att.checkOutAt).toLocaleTimeString()}`}
                      </p>
                    </div>
                    {att.checkOutAt ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Payslips */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payslips</CardTitle>
            <CardDescription>Your recent salary information</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : recentPayslips.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No payslips available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPayslips.map((pay) => (
                  <div key={pay.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{pay.period}</p>
                      <p className="text-sm text-muted-foreground">
                        Net: ${pay.netAmount.toFixed(2)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Reviews */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Reviews</CardTitle>
            <CardDescription>Your performance evaluation history</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No performance reviews yet</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.period}</p>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold">{review.score.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {review.notes}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
