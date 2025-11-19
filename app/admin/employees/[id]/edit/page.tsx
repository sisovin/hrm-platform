import { prisma } from '@/lib/prisma';
import { assertRole } from '@/lib/rbac';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default async function AdminEmployeeEditPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    await assertRole(['admin']);
  } catch {
    return redirect('/login');
  }

  const resolvedParams = await params as { id: string };
  const id = Number(resolvedParams?.id);
  if (isNaN(id)) return redirect('/admin/employees');

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { user: true, department: true, position: true },
  });
  if (!employee) return redirect('/admin/employees');

  // Client forms for update can be small and use fetch PUT to `/api/hr/employees/[id]`.
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Name</Label>
            <div className="text-lg font-medium">{employee.user?.name}</div>
            <Label>Email</Label>
            <div className="text-sm">{employee.user?.email}</div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Editing via the API is available in the admin console (PUT /api/hr/employees/{id}).</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
