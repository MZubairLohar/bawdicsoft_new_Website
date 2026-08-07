import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Attendance from '@/models/attendance';
import Employee from '@/models/employee';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Helper to get the authenticated employee linked to the logged-in user by email
async function getEmployeeForUser(payload: any) {
  await connectToDatabase();

  // Find user by id to get their email
  const User = (await import('@/models/user')).default;
  const user = await User.findById(payload.id).select('email role');
  if (!user) return null;

  // Match employee by email
  const employee = await Employee.findOne({ email: user.email.toLowerCase() });
  return employee;
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const employee = await getEmployeeForUser(payload);
    if (!employee) {
      return NextResponse.json({ success: false, error: 'No employee record found for your account' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month'); // YYYY-MM

    let filter: any = { employeeId: employee._id };
    if (month) {
      const [year, mon] = month.split('-').map(Number);
      const start = new Date(year, mon - 1, 1);
      const end = new Date(year, mon, 1);
      filter.date = { $gte: start, $lt: end };
    }

    const attendance = await Attendance.find(filter).sort({ date: -1 });

    return NextResponse.json({ success: true, data: attendance }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching employee attendance:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Check-in or check-out
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const employee = await getEmployeeForUser(payload);
    if (!employee) {
      return NextResponse.json({ success: false, error: 'No employee record found for your account' }, { status: 404 });
    }

    const body = await request.json();
    const action = body.action; // 'checkin' or 'checkout'

    await connectToDatabase();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // Find today's attendance record
    let record = await Attendance.findOne({
      employeeId: employee._id,
      date: { $gte: todayStart, $lt: todayEnd },
    });

    if (action === 'checkin') {
      if (record && record.checkIn) {
        return NextResponse.json({ success: false, error: 'You have already checked in today' }, { status: 400 });
      }
      if (!record) {
        record = await Attendance.create({
          employeeId: employee._id,
          date: todayStart,
          checkIn: now,
          status: 'Present',
          hoursWorked: 0,
        });
      } else {
        record.checkIn = now;
        await record.save();
      }
      return NextResponse.json({ success: true, data: record, checkedIn: true }, { status: 200 });
    }

    if (action === 'checkout') {
      if (!record || !record.checkIn) {
        return NextResponse.json({ success: false, error: 'You have not checked in today' }, { status: 400 });
      }
      if (record.checkOut) {
        return NextResponse.json({ success: false, error: 'You have already checked out today' }, { status: 400 });
      }
      record.checkOut = now;
      const hoursWorked = (now.getTime() - record.checkIn.getTime()) / (1000 * 60 * 60);
      record.hoursWorked = Math.round(hoursWorked * 100) / 100;
      await record.save();
      return NextResponse.json({ success: true, data: record, checkedOut: true }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: 'Invalid action. Use checkin or checkout.' }, { status: 400 });
  } catch (error: any) {
    console.error('Error in employee attendance action:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
