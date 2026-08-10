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
  if (!token) return null;
  const payload = verifySessionToken(token);
  if (!payload || !hasRole(payload.role, EMPLOYEE_MGMT_ROLES)) return null;
  return payload;
}

// GET today's check-in/out status for all employees
export async function GET(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const { searchParams } = new URL(request.url);
    const targetDate = searchParams.get('date');
    let start: Date, end: Date;

    if (targetDate) {
      const d = new Date(targetDate);
      start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    } else {
      start = todayStart;
      end = todayEnd;
    }

    const employees = await Employee.find({ status: 'Active' }).select('name email position department');
    const attendance = await Attendance.find({ date: { $gte: start, $lt: end } })
      .populate('employeeId', 'name');

    const attMap: Record<string, any> = {};
    attendance.forEach((a) => {
      const id = a.employeeId?._id?.toString() || '';
      attMap[id] = a;
    });

    const data = employees.map((emp) => {
      const att = attMap[emp._id.toString()];
      return {
        employeeId: emp._id,
        name: emp.name,
        email: emp.email,
        position: emp.position,
        department: emp.department,
        checkIn: att?.checkIn || null,
        checkOut: att?.checkOut || null,
        status: att?.status || 'Absent',
        hoursWorked: att?.hoursWorked || 0,
        attendanceId: att?._id || null,
      };
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching check-in status:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST check-in or check-out for an employee
export async function POST(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { employeeId, action, date } = body;

    if (!employeeId || !action) {
      return NextResponse.json({ success: false, error: 'employeeId and action are required' }, { status: 400 });
    }

    if (!['checkin', 'checkout'].includes(action)) {
      return NextResponse.json({ success: false, error: 'Invalid action. Use checkin or checkout.' }, { status: 400 });
    }

    const now = new Date();
    let targetToday = now;
    if (date) {
      targetToday = new Date(date);
    }

    const start = new Date(targetToday.getFullYear(), targetToday.getMonth(), targetToday.getDate());
    const end = new Date(targetToday.getFullYear(), targetToday.getMonth(), targetToday.getDate() + 1);

    let record = await Attendance.findOne({
      employeeId,
      date: { $gte: start, $lt: end },
    });

    if (action === 'checkin') {
      if (record && record.checkIn) {
        return NextResponse.json({ success: false, error: 'This employee has already checked in on this date' }, { status: 400 });
      }
      if (!record) {
        record = await Attendance.create({
          employeeId,
          date: start,
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
        return NextResponse.json({ success: false, error: 'This employee has not checked in on this date' }, { status: 400 });
      }
      if (record.checkOut) {
        return NextResponse.json({ success: false, error: 'This employee has already checked out on this date' }, { status: 400 });
      }
      record.checkOut = now;
      const hoursWorked = (now.getTime() - record.checkIn.getTime()) / (1000 * 60 * 60);
      record.hoursWorked = Math.round(Math.max(0, hoursWorked) * 100) / 100;
      await record.save();
      return NextResponse.json({ success: true, data: record, checkedOut: true }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: 'Unexpected error' }, { status: 400 });
  } catch (error: any) {
    console.error('Error in check-in/out action:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
