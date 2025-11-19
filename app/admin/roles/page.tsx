'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Shield, Plus, Check, X } from 'lucide-react';

interface Permission {
  id: number;
  key: string;
  description: string;
  createdAt: string;
}

interface RolePermission {
  role: string;
  permissions: Permission[];
}

export default function RolesPermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    key: '',
    description: '',
  });

  const roles = [
    { name: 'admin', label: 'Administrator', color: 'bg-red-100 text-red-800' },
    { name: 'hr', label: 'HR Manager', color: 'bg-blue-100 text-blue-800' },
    { name: 'employee', label: 'Employee', color: 'bg-green-100 text-green-800' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [permissionsRes, rolePermissionsRes] = await Promise.all([
        fetch('/api/admin/permissions'),
        fetch('/api/admin/role-permissions'),
      ]);

      if (!permissionsRes.ok || !rolePermissionsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const permissionsData = await permissionsRes.json();
      const rolePermissionsData = await rolePermissionsRes.json();

      setPermissions(permissionsData);
      setRolePermissions(rolePermissionsData);
    } catch (error) {
      toast.error('Failed to load permissions');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePermission = async () => {
    try {
      const response = await fetch('/api/admin/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create permission');

      toast.success('Permission created successfully');
      setIsCreateDialogOpen(false);
      setFormData({ key: '', description: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to create permission');
      console.error(error);
    }
  };

  const handleTogglePermission = async (role: string, permissionKey: string, hasPermission: boolean) => {
    try {
      if (hasPermission) {
        // Remove permission
        const response = await fetch(
          `/api/admin/role-permissions?role=${role}&permissionKey=${permissionKey}`,
          { method: 'DELETE' }
        );
        if (!response.ok) throw new Error('Failed to remove permission');
        toast.success('Permission removed');
      } else {
        // Add permission
        const response = await fetch('/api/admin/role-permissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role, permissionKey }),
        });
        if (!response.ok) throw new Error('Failed to assign permission');
        toast.success('Permission assigned');
      }
      fetchData();
    } catch (error) {
      toast.error('Failed to update permission');
      console.error(error);
    }
  };

  const hasPermission = (role: string, permissionKey: string): boolean => {
    const rolePerms = rolePermissions.find(rp => rp.role === role);
    return rolePerms?.permissions.some(p => p.key === permissionKey) || false;
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage access control and user permissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Permission</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="key">Permission Key</Label>
                <Input
                  id="key"
                  placeholder="e.g., employees.create"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this permission allows..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePermission}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => {
          const rolePerms = rolePermissions.find(rp => rp.role === role.name);
          const permCount = rolePerms?.permissions.length || 0;
          return (
            <Card key={role.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {role.label}
                </CardTitle>
                <CardDescription>
                  {permCount} {permCount === 1 ? 'permission' : 'permissions'} assigned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className={role.color}>{role.name.toUpperCase()}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>
            Assign permissions to roles by checking the boxes below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading permissions...</div>
            </div>
          ) : permissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Shield className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Permissions Defined</h3>
              <p className="text-muted-foreground mb-4">
                Create your first permission to start managing access control.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Permission
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Permission</TableHead>
                    <TableHead>Description</TableHead>
                    {roles.map((role) => (
                      <TableHead key={role.name} className="text-center">
                        {role.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-mono text-sm">{permission.key}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {permission.description}
                      </TableCell>
                      {roles.map((role) => {
                        const hasPerm = hasPermission(role.name, permission.key);
                        return (
                          <TableCell key={role.name} className="text-center">
                            <Button
                              variant={hasPerm ? 'default' : 'outline'}
                              size="sm"
                              onClick={() =>
                                handleTogglePermission(role.name, permission.key, hasPerm)
                              }
                            >
                              {hasPerm ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
