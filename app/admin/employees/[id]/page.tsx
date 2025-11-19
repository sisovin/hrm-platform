import { prisma } from '@/lib/prisma';
import { assertRole } from '@/lib/rbac';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default async function AdminEmployeeByIdPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    await assertRole(['admin']);
  } catch {
    return redirect('/login');
  }

  const resolvedParams = await params as { id: string };
  const idRaw = resolvedParams?.id;
  const id = Number(idRaw);
  if (isNaN(id)) return notFound();

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { user: true, department: true, position: true },
  });
  if (!employee) return notFound();

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Employee (Admin)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Name</Label>
              <div className="text-lg font-medium">{employee.user?.name}</div>
            </div>
            <div>
              <Label>Email</Label>
              <div className="text-sm">{employee.user?.email}</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Employee Code</Label>
                <div className="text-sm">{employee.employeeCode}</div>
              </div>
              <div>
                <Label>Department</Label>
                <div className="text-sm">{employee.department?.name ?? '-'}</div>
              </div>
              <div>
                <Label>Position</Label>
                <div className="text-sm">{employee.position?.title ?? '-'}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex gap-2">
                <Link href={`/admin/employees`} className="text-primary underline">Back to list</Link>
                <Link href={`/admin/employees/${employee.id}/edit`} className="text-primary underline">Edit</Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
