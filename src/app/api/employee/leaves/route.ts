import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Leave from '@/models/leave';
import Employee from '@/models/employee';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Helper to get the authenticated employee linked to the logged-in user by email
async function getEmployeeForUser(payload: any) {
  await connectToDatabase();

  const User = (await import('@/models/user')).default;
  const user = await User.findById(payload.id).select('email role');
  if (!user) return null;

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

    const leaves = await Leave.find({ employeeId: employee._id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: leaves }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching employee leaves:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

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

    if (!body.startDate || !body.endDate || !body.reason) {
      return NextResponse.json(
        { success: false, error: 'startDate, endDate, and reason are required' },
        { status: 400 }
      );
    }

    const leave = await Leave.create({
      employeeId: employee._id,
      startDate: body.startDate,
      endDate: body.endDate,
      type: body.type || 'Casual',
      reason: body.reason,
      status: 'Pending',
    });

    return NextResponse.json({ success: true, data: leave }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting leave:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
