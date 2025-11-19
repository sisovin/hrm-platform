"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DollarSign, TrendingUp, Users, Download } from 'lucide-react';
import { toast } from 'sonner';

type Payroll = {
  id: number;
  employeeId: number;
  periodStart: string;
  periodEnd: string;
  gross: number;
  deductions: number;
  net: number;
  status: string;
  employee?: {
    user?: {
      name?: string;
    };
    salaryBase?: number;
  };
};

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    fetchPayrolls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  async function fetchPayrolls() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/payroll?month=${selectedMonth}`);
      if (res.ok) {
        const data = await res.json();
        setPayrolls(data);
      } else {
        toast.error('Failed to fetch payroll data');
      }
    } catch {
      toast.error('Failed to fetch payroll data');
    } finally {
      setLoading(false);
    }
  }

  async function handleGeneratePayroll() {
    try {
      const res = await fetch('/api/admin/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month: selectedMonth }),
      });

      if (res.ok) {
        toast.success('Payroll generated successfully');
        fetchPayrolls();
      } else {
        const errorData = await res.json();
        toast.error(errorData?.error || 'Failed to generate payroll');
      }
    } catch {
      toast.error('Failed to generate payroll');
    }
  }

  const totalGross = payrolls.reduce((sum, p) => sum + p.gross, 0);
  const totalDeductions = payrolls.reduce((sum, p) => sum + p.deductions, 0);
  const totalNet = payrolls.reduce((sum, p) => sum + p.net, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground">
            Process and manage employee payroll
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleGeneratePayroll}>
            <DollarSign className="mr-2 h-4 w-4" />
            Generate Payroll
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gross</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalGross.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {payrolls.length} employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDeductions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Taxes and benefits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Net</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalNet.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Actual payout
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrolls.length}</div>
            <p className="text-xs text-muted-foreground">
              In this period
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Records</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Loading payroll data...</p>
            </div>
          ) : payrolls.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No payroll records found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate payroll for {selectedMonth} to get started
              </p>
              <Button onClick={handleGeneratePayroll}>
                Generate Payroll
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Gross</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrolls.map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell className="font-medium">
                      {payroll.employee?.user?.name || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      {new Date(payroll.periodStart).toLocaleDateString()} - {new Date(payroll.periodEnd).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${payroll.gross.toLocaleString()}</TableCell>
                    <TableCell>${payroll.deductions.toLocaleString()}</TableCell>
                    <TableCell className="font-bold">${payroll.net.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(payroll.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        <Download className="mr-1 h-4 w-4" />
                        Payslip
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
