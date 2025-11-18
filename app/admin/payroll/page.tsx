'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function PayrollPage() {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payroll Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">Generate Payslips</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Process Payroll</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Process Payroll</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="payrollMonth">Payroll Month</Label>
                  <Input id="payrollMonth" type="month" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Process & Send Payslips</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payroll Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-2xl font-bold">$485,000</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Employees Paid</p>
                <p className="text-2xl font-bold">150</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Deductions</p>
                <p className="text-2xl font-bold">$85,000</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Net Payroll</p>
                <p className="text-2xl font-bold">$400,000</p>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="max-w-xs"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>$5,000</TableCell>
                  <TableCell>$500</TableCell>
                  <TableCell>$850</TableCell>
                  <TableCell>$4,650</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Paid
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Payslip</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>$6,000</TableCell>
                  <TableCell>$750</TableCell>
                  <TableCell>$1,020</TableCell>
                  <TableCell>$5,730</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Pending
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Process</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
