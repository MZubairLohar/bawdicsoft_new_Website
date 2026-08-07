import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Leave from '@/models/leave';
import mongoose from 'mongoose';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { hasRole, EMPLOYEE_MGMT_ROLES } from '@/lib/roles';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  const payload = verifySessionToken(token);

  // Leave management is limited to super_admin, admin, and manager
  if (!payload || !hasRole(payload.role, EMPLOYEE_MGMT_ROLES)) {
    return null;
  }

  return payload;
}

// GET a single leave application
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid leave ID' }, { status: 400 });
    }

    const leave = await Leave.findById(id).populate('employeeId', 'name email position department');

    if (!leave) {
      return NextResponse.json({ success: false, error: 'Leave application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: leave }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching leave:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// UPDATE a leave (approve/reject/edit)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const body = await request.json();

    const updated = await Leave.findByIdAndUpdate(
      id,
      {
        startDate: body.startDate,
        endDate: body.endDate,
        type: body.type,
        reason: body.reason,
        status: body.status,
        adminRemarks: body.adminRemarks,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Leave application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating leave:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE a leave application
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const deleted = await Leave.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Leave application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Leave application deleted' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting leave:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
