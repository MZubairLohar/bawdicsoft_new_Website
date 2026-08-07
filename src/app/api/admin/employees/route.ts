import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Employee from '@/models/employee';
import User from '@/models/user';
import { verifySessionToken, hashPassword } from '@/lib/auth';
import { cookies } from 'next/headers';
import { hasRole, EMPLOYEE_MGMT_ROLES } from '@/lib/roles';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  const payload = verifySessionToken(token);

  // Employee management is limited to super_admin, admin, and manager
  if (!payload || !hasRole(payload.role, EMPLOYEE_MGMT_ROLES)) {
    return null;
  }

  return payload;
}

export async function GET() {
  try {
    // Check authentication
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: employees }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    // If admin provides a password, create a linked User login account for the employee.
    // The employee (or a manager/rep with matching email) can then sign in to /employee.
    let loggedInUserId: string | null = null;
    let loginPassword = body.password || '';

    if (loginPassword) {
      // Map the employee role to a valid User role.
      // The User model only allows: admin, user, manager, rep.
      const userRoleMap: Record<string, string> = {
        employee: 'user',
        admin: 'manager',
        manager: 'manager',
        rep: 'rep',
      };
      const userRole = userRoleMap[body.role] || 'user';

      // Check for an existing User with the same email before creating
      const existingUser = await User.findOne({ email: (body.email || '').toLowerCase() });
      if (existingUser) {
        // If a user already exists, just link it (so we don't throw duplicate errors)
        loggedInUserId = existingUser._id.toString();
      } else {
        const newUser = await User.create({
          name: body.name,
          email: (body.email || '').toLowerCase(),
          password: hashPassword(loginPassword),
          role: userRole,
        });
        loggedInUserId = newUser._id.toString();
      }
    }

    const newEmployee = await Employee.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      position: body.position,
      department: body.department,
      salary: body.salary,
      dateOfJoining: body.dateOfJoining,
      status: body.status || 'Active',
      role: body.role || 'employee',
      avatar: body.avatar,
      notes: body.notes,
      userId: loggedInUserId,
    });

    return NextResponse.json(
      {
        success: true,
        data: newEmployee,
        loginCreated: !!loggedInUserId,
        message: loggedInUserId
          ? 'Employee created with a login account.'
          : 'Employee created. No login account was created (no password provided).',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
