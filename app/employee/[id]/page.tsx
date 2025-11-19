import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/rbac';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default async function EmployeeByIdPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const resolvedParams = await params as { id: string };
  const idRaw = resolvedParams?.id;
  if (!idRaw) return notFound();
  // allow numeric id, userId, or employeeCode (e.g. EMP-1001)
  const maybeNumeric = Number(idRaw);

  const viewer = await getCurrentUser();
  if (!viewer) return redirect('/login');

  // If viewer is an employee, only allow access to their own profile
  if (viewer.role === 'employee') {
    const viewerEmployeeId = viewer.employee?.id;
    const isNumericRequest = !isNaN(maybeNumeric);
    const requestedEmployeeId = isNumericRequest ? Number(idRaw) : undefined;
    // If they passed a numeric id, ensure it matches their employee id
    if (requestedEmployeeId && viewerEmployeeId && viewerEmployeeId !== requestedEmployeeId) {
      return redirect('/employee/dashboard');
    }
    // If they passed a non-numeric identifier (employeeCode), ensure it matches their employeeCode
    if (!isNumericRequest && viewer.employee?.employeeCode !== idRaw) {
      return redirect('/employee/dashboard');
    }
  }

  let employee = null;
  if (!isNaN(maybeNumeric)) {
    const numeric = Number(idRaw);
    // First try by employee id
    employee = await prisma.employee.findUnique({
      where: { id: numeric },
      include: { user: true, department: true, position: true },
    });

    // If not found by employee id, try finding employee by user id
    if (!employee) {
      employee = await prisma.employee.findFirst({
        where: { userId: numeric },
        include: { user: true, department: true, position: true },
      });
    }
  } else if (idRaw && idRaw.length > 0) {
    // Try to find by employeeCode
    employee = await prisma.employee.findUnique({
      where: { employeeCode: idRaw },
      include: { user: true, department: true, position: true },
    });
  }
  if (!employee) return notFound();

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Employee Profile</CardTitle>
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
              {/* If admin or hr, show edit link or actions */}
              {(viewer.role === 'admin' || viewer.role === 'hr') && (
                <div className="flex gap-2">
                  <Link href={`/admin/employees`} className="text-primary underline">Back to employees</Link>
                  <Link href={`/admin/employees/${employee.id}`} className="text-primary underline">Edit</Link>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
