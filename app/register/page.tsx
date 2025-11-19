"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }), headers: { 'Content-Type': 'application/json' } });
      if (res.ok) {
        toast.success('Account created');
        router.push('/login');
      } else {
        const err = await res.json().catch(() => ({ error: 'Registration failed' }));
        toast.error(err?.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Registration failed');
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
          <CardTitle>Create account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="text-primary underline">Sign in</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
     <Footer />
    </div>
  );
}
