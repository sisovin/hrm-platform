import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const roles = ['admin', 'hr', 'employee'];
    const rolePermissions = await prisma.rolePermission.findMany({
      include: {
        permission: true,
      },
    });

    // Group by role
    const groupedPermissions = roles.map(role => ({
      role,
      permissions: rolePermissions
        .filter(rp => rp.role === role)
        .map(rp => rp.permission),
    }));

    return NextResponse.json(groupedPermissions);
  } catch (error) {
    console.error('Error fetching role permissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch role permissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { role, permissionKey } = body;

    // Validation
    if (!role || !permissionKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const rolePermission = await prisma.rolePermission.create({
      data: {
        role,
        permissionKey,
      },
      include: {
        permission: true,
      },
    });

    return NextResponse.json(rolePermission, { status: 201 });
  } catch (error) {
    console.error('Error assigning permission:', error);
    return NextResponse.json(
      { error: 'Failed to assign permission' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const permissionKey = searchParams.get('permissionKey');

    if (!role || !permissionKey) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    await prisma.rolePermission.deleteMany({
      where: {
        role,
        permissionKey,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing permission:', error);
    return NextResponse.json(
      { error: 'Failed to remove permission' },
      { status: 500 }
    );
  }
}
