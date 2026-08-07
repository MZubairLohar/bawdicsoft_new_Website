import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Attendance from '@/models/attendance';
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

  // Attendance management is limited to super_admin, admin, and manager
  if (!payload || !hasRole(payload.role, EMPLOYEE_MGMT_ROLES)) {
    return null;
  }

  return payload;
}

// GET a single attendance record
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
      return NextResponse.json({ success: false, error: 'Invalid attendance ID' }, { status: 400 });
    }

    const attendance = await Attendance.findById(id).populate('employeeId', 'name email position department');

    if (!attendance) {
      return NextResponse.json({ success: false, error: 'Attendance record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: attendance }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// UPDATE an attendance record
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

    // Compute hours worked if checkIn and checkOut provided
    const updates: any = { ...body };
    if (body.checkIn && body.checkOut) {
      const checkIn = new Date(body.checkIn);
      const checkOut = new Date(body.checkOut);
      const hoursWorked = Math.max(0, (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60));
      updates.hoursWorked = Math.round(hoursWorked * 100) / 100;
    }

    const updated = await Attendance.findByIdAndUpdate(id, { $set: updates }, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Attendance record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating attendance:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE an attendance record
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

    const deleted = await Attendance.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Attendance record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Attendance record deleted' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting attendance:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
