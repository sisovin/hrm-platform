import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/rbac';
import Link from 'next/link';

export default async function EmployeeIndex() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Employee Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome back, {user?.name}.</p>
      <div className="mt-4">
        <Link href="/employee/dashboard" className="text-primary underline">Go to profile</Link>
      </div>
    </div>
  );
}
