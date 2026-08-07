import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Employee from '@/models/employee';
import Attendance from '@/models/attendance';
import Leave from '@/models/leave';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { hasRole, SALARY_ROLES } from '@/lib/roles';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  const payload = verifySessionToken(token);

  // Salary data is restricted to super_admin and admin only
  if (!payload || !hasRole(payload.role, SALARY_ROLES)) {
    return null;
  }

  return payload;
}

// Helper: count working days (Mon-Fri) in a given month
function countWorkingDays(year: number, month: number) {
  // month is 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let workingDays = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    // Monday (1) to Friday (5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      workingDays++;
    }
  }
  return workingDays;
}

// Helper: compute present days (attendance marked Present or Late or Half Day counts partial)
function countAttendanceDays(attendance: any[]) {
  let presentDays = 0;
  for (const record of attendance) {
    if (record.status === 'Present' || record.status === 'Late') {
      presentDays += 1;
    } else if (record.status === 'Half Day') {
      presentDays += 0.5;
    }
  }
  return presentDays;
}

export async function GET(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const monthParam = searchParams.get('month'); // format YYYY-MM, default current month
    const now = new Date();
    const year = monthParam ? Number(monthParam.split('-')[0]) : now.getFullYear();
    const month = monthParam ? Number(monthParam.split('-')[1]) - 1 : now.getMonth();

    // Month date range
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const workingDays = countWorkingDays(year, month);

    // Fetch all employees
    const employees = await Employee.find({ status: { $ne: 'Inactive' } });

    // Fetch all attendance for the month
    const attendanceRecords = await Attendance.find({
      date: { $gte: startDate, $lt: endDate },
    });

    // Fetch approved leaves for the month
    const approvedLeaves = await Leave.find({
      status: 'Approved',
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gte: startDate } },
      ],
    });

    // Group attendance by employee
    const attendanceMap: Record<string, any[]> = {};
    attendanceRecords.forEach((record) => {
      const key = String(record.employeeId);
      if (!attendanceMap[key]) attendanceMap[key] = [];
      attendanceMap[key].push(record);
    });

    // Group approved leaves by employee
    const leaveMap: Record<string, number> = {};
    approvedLeaves.forEach((leave) => {
      const key = String(leave.employeeId);
      // Count the leave days that fall within the month
      const leaveStart = Math.max(leave.startDate.getTime(), startDate.getTime());
      const leaveEnd = Math.min(leave.endDate.getTime(), endDate.getTime() - 1);
      if (leaveEnd >= leaveStart) {
        const days = Math.ceil((leaveEnd - leaveStart) / (1000 * 60 * 60 * 24)) + 1;
        leaveMap[key] = (leaveMap[key] || 0) + days;
      }
    });

    // Build salary sheet
    const salarySheet = employees.map((emp) => {
      const empId = String(emp._id);
      const attendance = attendanceMap[empId] || [];

      // Days present (from attendance) - only count weekdays
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

      // Approved leave days
      const approvedLeaveDays = leaveMap[empId] || 0;

      // Total counted days = present + approved leave
      const totalDays = presentDays + approvedLeaveDays;

      const monthlySalary = emp.salary || 0;
      const dailyRate = monthlySalary / workingDays;
      const grossSalary = Math.round(dailyRate * totalDays);
      const deductions = Math.round(monthlySalary - dailyRate * totalDays);

      return {
        employee: {
          _id: emp._id,
          name: emp.name,
          email: emp.email,
          position: emp.position,
          department: emp.department,
        },
        baseSalary: monthlySalary,
        workingDays,
        presentDays,
        approvedLeaveDays,
        totalDays,
        dailyRate: Math.round(dailyRate),
        grossSalary,
        deductions,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          month: `${year}-${String(month + 1).padStart(2, '0')}`,
          workingDays,
          employees: salarySheet,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error computing salary:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
