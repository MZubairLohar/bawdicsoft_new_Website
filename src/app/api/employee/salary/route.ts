import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Attendance from '@/models/attendance';
import Employee from '@/models/employee';
import Leave from '@/models/leave';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';

async function getEmployeeForUser(payload: any) {
  await connectToDatabase();

  const User = (await import('@/models/user')).default;
  const user = await User.findById(payload.id).select('email role');
  if (!user) return null;

  const employee = await Employee.findOne({ email: user.email.toLowerCase() });
  return employee;
}

function countWorkingDays(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let workingDays = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      workingDays++;
    }
  }
  return workingDays;
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
    const monthParam = searchParams.get('month');
    const now = new Date();
    const year = monthParam ? Number(monthParam.split('-')[0]) : now.getFullYear();
    const month = monthParam ? Number(monthParam.split('-')[1]) - 1 : now.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const workingDays = countWorkingDays(year, month);

    const attendance = await Attendance.find({
      employeeId: employee._id,
      date: { $gte: startDate, $lt: endDate },
    });

    const approvedLeaves = await Leave.find({
      employeeId: employee._id,
      status: 'Approved',
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gte: startDate } },
      ],
    });

    let presentDays = 0;
    attendance.forEach((record) => {
      const dow = record.date.getDay();
      if (dow >= 1 && dow <= 5) {
        if (record.status === 'Present' || record.status === 'Late') {
          presentDays += 1;
        } else if (record.status === 'Half Day') {
          presentDays += 0.5;
        }
      }
    });

    let approvedLeaveDays = 0;
    approvedLeaves.forEach((leave) => {
      const leaveStart = Math.max(leave.startDate.getTime(), startDate.getTime());
      const leaveEnd = Math.min(leave.endDate.getTime(), endDate.getTime() - 1);
      if (leaveEnd >= leaveStart) {
        approvedLeaveDays += Math.ceil((leaveEnd - leaveStart) / (1000 * 60 * 60 * 24)) + 1;
      }
    });

    const totalDays = presentDays + approvedLeaveDays;
    const monthlySalary = employee.salary || 0;
    const dailyRate = workingDays > 0 ? monthlySalary / workingDays : 0;
    const grossSalary = Math.round(dailyRate * totalDays);
    const deductions = Math.round(monthlySalary - dailyRate * totalDays);

    return NextResponse.json(
      {
        success: true,
        data: {
          month: `${year}-${String(month + 1).padStart(2, '0')}`,
          employee: {
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            position: employee.position,
            department: employee.department,
          },
          workingDays,
          presentDays,
          approvedLeaveDays,
          totalDays,
          baseSalary: monthlySalary,
          dailyRate: Math.round(dailyRate),
          grossSalary,
          deductions,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching employee salary:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
