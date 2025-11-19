"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  type DepartmentType = { id: number; name: string; positions?: { id: number; name?: string }[] };
  type EmployeeType = {
    id: number;
    user?: { id: number; name?: string; email?: string; role?: string };
    department?: DepartmentType | null;
    position?: { id: number; name?: string } | null;
    hireDate?: string | null;
  };

  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '' as string | number,
    positionId: '' as string | number,
    hireDate: '',
    salary: 0,
  });

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      const res = await fetch('/api/hr/employees');
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to fetch' }));
        setFetchError(err?.error || 'Failed to fetch employees');
        toast.error(err?.error || 'Failed to fetch employees');
      }
      setLoading(false);
    }
    fetchEmployees();
    // load departments for the create form
    async function fetchDepartments() {
      const res = await fetch('/api/hr/departments');
      if (res.ok) {
        const data = await res.json();
        setDepartments(data || []);
        if (data?.length > 0) {
          setNewEmployee((s) => ({ ...s, departmentId: String(data[0].id), positionId: data[0]?.positions?.[0]?.id ?? '' }));
        }
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to fetch' }));
        toast.error(err?.error || 'Failed to fetch departments');
        setFetchError(err?.error || 'Failed to fetch departments');
      }
    }
    fetchDepartments();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        {fetchError && <div className="text-sm text-destructive ml-4">{fetchError}</div>}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Employee</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={newEmployee.firstName} onChange={(e) => setNewEmployee(s => ({ ...s, firstName: e.target.value }))} placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={newEmployee.lastName} onChange={(e) => setNewEmployee(s => ({ ...s, lastName: e.target.value }))} placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={newEmployee.email} onChange={(e) => setNewEmployee(s => ({ ...s, email: e.target.value }))} placeholder="john.doe@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={String(newEmployee.departmentId)}
                    onValueChange={(v) => {
                      setNewEmployee((s) => ({ ...s, departmentId: v }));
                      // the position selection will default to the first position of the selected department
                      const dept = departments.find((d) => String(d.id) === v);
                      const pos = dept?.positions?.[0]?.id ?? '';
                      setNewEmployee((s) => ({ ...s, positionId: pos }));
                    }}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments?.map((d) => (
                        <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select
                    value={String(newEmployee.positionId ?? '')}
                    onValueChange={(v) => setNewEmployee((s) => ({ ...s, positionId: v }))}
                  >
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments?.find((d) => String(d.id) === String(newEmployee.departmentId))?.positions?.map((p: { id: number; name?: string }) => (
                        <SelectItem key={p.id} value={String(p.id)}>{p.name ?? `Position ${p.id}`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input id="hireDate" value={newEmployee.hireDate} onChange={(e) => setNewEmployee(s => ({ ...s, hireDate: e.target.value }))} type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" type="number" value={newEmployee.salary} onChange={(e) => setNewEmployee(s => ({ ...s, salary: Number(e.target.value || 0) }))} placeholder="50000" />
              </div>
              <Button
                className="w-full"
                disabled={isCreating}
                onClick={async () => {
                  // basic validation
                  if (!newEmployee.email || !newEmployee.firstName || !newEmployee.lastName) {
                    toast.error('Please enter first name, last name, and email.');
                    return;
                  }
                  setIsCreating(true);
                  const employeeCode = `EMP-${Math.floor(Math.random() * 9000) + 1000}`;
                  const deptId = Number(newEmployee.departmentId) || departments?.[0]?.id || 1;
                  const posId = Number(newEmployee.positionId) || departments?.[0]?.positions?.[0]?.id || 1;

                  const payload = {
                    email: newEmployee.email,
                    name: `${newEmployee.firstName} ${newEmployee.lastName}`,
                    employeeCode,
                    departmentId: deptId,
                    positionId: posId,
                    hireDate: newEmployee.hireDate || new Date().toISOString(),
                    salaryBase: newEmployee.salary || 0,
                  };

                  try {
                    const res = await fetch('/api/hr/employees', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
                    if (res.ok) {
                      const employee = await res.json();
                      setEmployees((prev) => [...prev, employee]);
                      toast.success('Employee created');
                    } else {
                      const err = await res.json();
                      toast.error(err?.error || 'Failed to create');
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error('Failed to create employee');
                  } finally {
                    setIsCreating(false);
                  }
                }}
              >
                {isCreating ? 'Creating...' : 'Create Employee'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex items-center justify-center py-6">Loading employees...</div>
                  </TableCell>
                </TableRow>
              )}
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.user?.name}</TableCell>
                  <TableCell>{emp.user?.email}</TableCell>
                  <TableCell>{emp.department?.name}</TableCell>
                  <TableCell>{emp.user?.role}</TableCell>
                  <TableCell>{emp.hireDate ? new Date(emp.hireDate).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/employee/${emp.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Link href={`/admin/employees/${emp.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
