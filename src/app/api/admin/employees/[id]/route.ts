import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Employee from '@/models/employee';
import User from '@/models/user';
import mongoose from 'mongoose';
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

// GET a single employee (for editing)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid employee ID' }, { status: 400 });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: employee }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching employee:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// UPDATE an employee
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const body = await request.json();
    const { password } = body;

    let linkedUserId: string | null = null;

    // If a password is provided, create OR update the linked User login account
    if (password) {
      const email = (body.email || '').toLowerCase();

      // Map the employee role to a valid User role.
      // The User model only allows: admin, user, manager, rep.
      const userRoleMap: Record<string, string> = {
        employee: 'user',
        admin: 'manager',
        manager: 'manager',
        rep: 'rep',
      };
      const userRole = userRoleMap[body.role] || 'user';

      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: body.name,
          email,
          password: hashPassword(password),
          role: userRole,
        });
      } else {
        user.password = hashPassword(password);
        user.role = userRole;
        user.name = body.name;
        await user.save();
      }
      linkedUserId = user._id.toString();
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        department: body.department,
        salary: body.salary,
        dateOfJoining: body.dateOfJoining,
        status: body.status,
        role: body.role,
        avatar: body.avatar,
        notes: body.notes,
        // Only set userId when a password was provided (create/reset login)
        ...(password ? { userId: linkedUserId } : {}),
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedEmployee }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating employee:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE an employee
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Employee deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
