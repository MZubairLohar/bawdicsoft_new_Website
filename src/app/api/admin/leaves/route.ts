import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Leave from '@/models/leave';
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

export async function GET(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // Pending, Approved, Rejected

    let filter: any = {};
    if (status) filter.status = status;

    const leaves = await Leave.find(filter)
      .populate('employeeId', 'name email position department')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: leaves }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching leaves:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();

    if (!body.employeeId || !body.startDate || !body.endDate || !body.reason) {
      return NextResponse.json(
        { success: false, error: 'employeeId, startDate, endDate, and reason are required' },
        { status: 400 }
      );
    }

    const leave = await Leave.create({
      employeeId: body.employeeId,
      startDate: body.startDate,
      endDate: body.endDate,
      type: body.type || 'Casual',
      reason: body.reason,
      status: body.status || 'Pending',
      adminRemarks: body.adminRemarks,
    });

    return NextResponse.json({ success: true, data: leave }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating leave:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
