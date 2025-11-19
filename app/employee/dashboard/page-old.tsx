"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

type Employee = {
  id: number;
  employeeCode: string;
  departmentId: number;
  positionId: number;
  hireDate: string;
  salaryBase: number;
  department?: {
    id: number;
    name: string;
  };
  position?: {
    id: number;
    title: string;
  };
};

type Profile = {
  id: number;
  email: string;
  name: string;
  role: string;
  employee?: Employee;
};

type AttendanceRecord = {
  id: number;
  date: string;
  checkInAt: string | null;
  checkOutAt: string | null;
  status: string;
};

type Payslip = {
  id: number;
  periodStart: string;
  periodEnd: string;
  gross: number;
  deductions: number;
  net: number;
  status: string;
};

type Review = {
  id: number;
  period: string;
  score: number;
  notes: string | null;
  status: string;
  createdAt: string;
};

type Activity = {
  id: number;
  action: string;
  timestamp: string;
  details?: string;
  createdAt: string;
};

export default function EmployeeDashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [attLoading, setAttLoading] = useState(false);
  const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }).optional().or(z.literal('')),
    confirm: z.string().optional().or(z.literal('')),
  }).superRefine((val, ctx) => {
    if (val.password && val.password.length > 0 && val.password !== val.confirm) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Passwords do not match', path: ['confirm'] });
    }
  });

  type ProfileForm = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', password: '', confirm: '' },
  });

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const res = await fetch('/api/employee/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        reset({ name: data.name || '', password: '', confirm: '' });
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to fetch' }));
        toast.error(err?.error || 'Failed to fetch profile');
      }
      setLoading(false);
    }
    fetchProfile();

    async function fetchDashboardData() {
      setAttLoading(true);
      try {
        const [attRes, paysRes, revRes, actRes] = await Promise.all([
          fetch('/api/employee/attendance'),
          fetch('/api/employee/payslips'),
          fetch('/api/employee/reviews'),
          fetch('/api/employee/activity'),
        ]);
        if (attRes.ok) setAttendance(await attRes.json());
        if (paysRes.ok) setPayslips(await paysRes.json());
        if (revRes.ok) setReviews(await revRes.json());
        if (actRes.ok) setActivity(await actRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setAttLoading(false);
      }
    }
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSave(values: ProfileForm) {
    setSaving(true);
    try {
      const payload: { name: string; password?: string } = { name: values.name };
      if (values.password && values.password.length > 0) payload.password = values.password;
      const res = await fetch('/api/employee/profile', { method: 'PUT', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        toast.success('Profile updated');
        reset({ name: updated.name || '', password: '', confirm: '' });
      } else if (res.status === 422) {
        const err = await res.json().catch(() => ({ error: 'Validation failed' }));
        // Map zod formatted errors to RHF setError
        const details = err?.details || {};
        for (const key of Object.keys(details)) {
          const fieldObj = details[key] as { _errors?: string[];[key: number]: string } | undefined;
          const message = fieldObj?._errors?.[0] ?? fieldObj?.[0];
          if (message) setError(key as keyof ProfileForm, { type: 'server', message });
        }
        toast.error(err?.error || 'Validation failed');
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to update' }));
        toast.error(err?.error || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleCheckIn() {
    try {
      const res = await fetch('/api/employee/checkin', { method: 'POST' });
      if (res.ok) {
        toast.success('Checked in');
        // refresh attendance
        const attRes = await fetch('/api/employee/attendance');
        if (attRes.ok) setAttendance(await attRes.json());
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to checkin' }));
        toast.error(err?.error || 'Failed to check in');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to check in');
    }
  }

  async function handleCheckOut() {
    try {
      const res = await fetch('/api/employee/checkout', { method: 'POST' });
      if (res.ok) {
        toast.success('Checked out');
        const attRes = await fetch('/api/employee/attendance');
        if (attRes.ok) setAttendance(await attRes.json());
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to checkout' }));
        toast.error(err?.error || 'Failed to check out');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to check out');
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <form onSubmit={handleSubmit(onSave)} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" readOnly value={profile?.email || ''} />
                </div>
                {profile?.employee && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Employee Code</Label>
                      <div className="text-sm">{profile.employee.employeeCode}</div>
                    </div>
                    <div>
                      <Label>Department</Label>
                      <div className="text-sm">{profile.employee.department?.name ?? '-'}</div>
                    </div>
                    <div>
                      <Label>Position</Label>
                      <div className="text-sm">{profile.employee.position?.title ?? '-'}</div>
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" {...register('name')} aria-invalid={!!errors.name} />
                  {errors.name && <div className="text-destructive text-sm mt-1">{errors.name.message}</div>}
                </div>
                <div>
                  <Label htmlFor="password">New password</Label>
                  <Input id="password" type="password" {...register('password')} aria-invalid={!!errors.password} />
                  {errors.password && <div className="text-destructive text-sm mt-1">{errors.password.message}</div>}
                </div>
                <div>
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input id="confirm" type="password" {...register('confirm')} aria-invalid={!!errors.confirm} />
                  {errors.confirm && <div className="text-destructive text-sm mt-1">{errors.confirm.message}</div>}
                </div>
                <div>
                  <Button type="submit" className="w-full" disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <strong>Attendance</strong>
                <div className="flex gap-2 mt-2">
                  <Button onClick={handleCheckIn}>Check In</Button>
                  <Button onClick={handleCheckOut} variant="secondary">Check Out</Button>
                </div>
              </div>
              <div className="mt-4">
                <strong>Latest Payslip</strong>
                <div className="text-sm mt-1">{payslips?.[0] ? `${payslips[0].periodStart} - ${payslips[0].periodEnd} (Net: ${payslips[0].net})` : 'No payslips available'}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length === 0 ? <div className="text-sm">No reviews</div> : (
                <ul className="list-disc pl-5">
                  {reviews.map((r) => (
                    <li key={r.id} className="text-sm">{r.period} — {r.status}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            {attLoading ? (
              <div>Loading...</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left">Date</th>
                    <th className="text-left">Check In</th>
                    <th className="text-left">Check Out</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a) => (
                    <tr key={a.id}>
                      <td>{a.checkInAt ? new Date(a.checkInAt).toLocaleDateString() : '-'}</td>
                      <td>{a.checkInAt ? new Date(a.checkInAt).toLocaleTimeString() : '-'}</td>
                      <td>{a.checkOutAt ? new Date(a.checkOutAt).toLocaleTimeString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length === 0 ? <div className="text-sm">No recent activity</div> : (
              <ul className="list-disc pl-5">
                {activity.map((a) => (
                  <li key={a.id} className="text-sm">{a.action} — {new Date(a.createdAt).toLocaleString()}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
