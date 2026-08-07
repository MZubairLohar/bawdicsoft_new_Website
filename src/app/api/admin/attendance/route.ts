import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Attendance from '@/models/attendance';
import Employee from '@/models/employee';
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

export async function GET(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Parse query params for filtering
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month'); // format YYYY-MM
    const employeeId = searchParams.get('employeeId');

    let filter: any = {};
    if (employeeId) filter.employeeId = employeeId;

    if (month) {
      const [year, mon] = month.split('-').map(Number);
      const start = new Date(year, mon - 1, 1);
      const end = new Date(year, mon, 1);
      filter.date = { $gte: start, $lt: end };
    }

    const attendance = await Attendance.find(filter)
      .populate('employeeId', 'name email position department')
      .sort({ date: -1 });

    return NextResponse.json({ success: true, data: attendance }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching attendance:', error);
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

    // Validate required fields
    if (!body.employeeId || !body.date) {
      return NextResponse.json({ success: false, error: 'employeeId and date are required' }, { status: 400 });
    }

    // Check if attendance already exists for this employee on this date
    const dateObj = new Date(body.date);
    dateObj.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      employeeId: body.employeeId,
      date: {
        $gte: dateObj,
        $lt: new Date(dateObj.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Attendance already recorded for this employee on this date' },
        { status: 400 }
      );
    }

    // Compute hours worked if checkIn and checkOut provided
    let hoursWorked = 0;
    if (body.checkIn && body.checkOut) {
      const checkIn = new Date(body.checkIn);
      const checkOut = new Date(body.checkOut);
      hoursWorked = Math.max(0, (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60));
      hoursWorked = Math.round(hoursWorked * 100) / 100;
    }

    const attendance = await Attendance.create({
      employeeId: body.employeeId,
      date: body.date,
      checkIn: body.checkIn || dateObj,
      checkOut: body.checkOut,
      status: body.status || 'Present',
      hoursWorked,
      notes: body.notes,
    });

    return NextResponse.json({ success: true, data: attendance }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating attendance:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
