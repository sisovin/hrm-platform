"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const trimmedEmail = email?.trim();
      const trimmedPassword = password; // do not trim password, users may include spaces intentionally
      const res = await signIn('credentials', { redirect: false, email: trimmedEmail, password: trimmedPassword });
      if (res?.ok) {
        toast.success('Logged in');

        // Fetch user session to get role
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        const userRole = session?.user?.role;

        // Redirect based on role
        if (userRole === 'admin') {
          router.push('/admin');
        } else if (userRole === 'hr') {
          router.push('/hr');
        } else if (userRole === 'employee') {
          router.push('/employee/dashboard');
        } else {
          router.push('/');
        }
      } else {
        toast.error(res?.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      toast.error('Sign-in failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-slate-50 flex flex-col">
      <Header />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account? <Link href="/register" className="text-primary underline">Create one</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
