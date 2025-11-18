'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function DepartmentsPage() {
  const departments = [
    { name: 'Engineering', head: 'John Manager', employees: 45, budget: '$2.5M' },
    { name: 'Human Resources', head: 'Jane Director', employees: 12, budget: '$800K' },
    { name: 'Sales', head: 'Bob Sales', employees: 30, budget: '$1.8M' },
    { name: 'Marketing', head: 'Alice Brand', employees: 18, budget: '$1.2M' },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Department Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Department</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Department</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="deptName">Department Name</Label>
                <Input id="deptName" placeholder="Engineering" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deptHead">Department Head</Label>
                <Input id="deptHead" placeholder="Select employee" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Annual Budget</Label>
                <Input id="budget" type="number" placeholder="1000000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Department description..." />
              </div>
              <Button className="w-full">Create Department</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.name}>
            <CardHeader>
              <CardTitle>{dept.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Head:</span> {dept.head}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Employees:</span> {dept.employees}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Budget:</span> {dept.budget}
                </p>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
