"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface AttendanceRecord {
  _id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: string;
  hoursWorked: number;
}

interface LeaveRecord {
  _id: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
}

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);
  const [monthAttendance, setMonthAttendance] = useState<AttendanceRecord[]>([]);
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        const [attRes, leaveRes] = await Promise.all([
          fetch(`/api/employee/attendance?month=${month}`),
          fetch('/api/employee/leaves'),
        ]);

        const attData = await attRes.json();
        const leaveData = await leaveRes.json();

        if (attData.success) {
          setMonthAttendance(attData.data);
          // Find today's record
          const todayStr = now.toDateString();
          const today = attData.data.find((r: AttendanceRecord) => new Date(r.date).toDateString() === todayStr);
          setTodayAttendance(today || null);
        }
        if (leaveData.success) {
          setLeaves(leaveData.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  // Compute stats
  const daysPresent = monthAttendance.filter(r => ['Present', 'Late', 'Half Day'].includes(r.status)).length;
  const totalHours = monthAttendance.reduce((sum, r) => sum + (r.hoursWorked || 0), 0);
  const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
  const approvedLeaves = leaves.filter(l => l.status === 'Approved').length;

  const checkedIn = !!todayAttendance?.checkIn;
  const checkedOut = !!(todayAttendance?.checkIn && todayAttendance?.checkOut);

  const stats = [
    { label: "Days Present", value: daysPresent.toString(), color: "bg-green-50 text-green-600" },
    { label: "Hours Worked", value: `${totalHours.toFixed(1)}h`, color: "bg-blue-50 text-blue-600" },
    { label: "Pending Leaves", value: pendingLeaves.toString(), color: "bg-amber-50 text-amber-600" },
    { label: "Approved Leaves", value: approvedLeaves.toString(), color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
              <p className="text-sm text-gray-500 mt-1">
                {checkedIn ? (checkedOut ? "You have checked out." : "You are checked in.") : "You have not checked in today."}
              </p>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              checkedOut ? "bg-green-100 text-green-700" : checkedIn ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
            }`}>
              {checkedOut ? "Completed" : checkedIn ? "Checked In" : "Not Started"}
            </span>
          </div>
          {todayAttendance && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase">Check In</p>
                <p className="text-lg font-bold text-gray-900">
                  {todayAttendance.checkIn ? new Date(todayAttendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Check Out</p>
                <p className="text-lg font-bold text-gray-900">
                  {todayAttendance.checkOut ? new Date(todayAttendance.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                </p>
              </div>
            </div>
          )}
          <Link
            href="/employee/attendance"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Go to Attendance
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your leave requests</p>
            </div>
          </div>
          <div className="space-y-3">
            <Link
              href="/employee/leaves"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">Submit a Leave Application</span>
              <span className="text-brand-600">→</span>
            </Link>
            <Link
              href="/employee/leaves"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">View My Leave History</span>
              <span className="text-brand-600">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.color}`}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Attendance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Attendance</h3>
            <p className="text-sm text-gray-500 mt-1">Your attendance for this month</p>
          </div>
          <Link href="/employee/attendance" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            View All →
          </Link>
        </div>
        {monthAttendance.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No attendance records yet this month.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Check In</th>
                  <th className="px-6 py-3 font-medium">Check Out</th>
                  <th className="px-6 py-3 font-medium">Hours</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthAttendance.slice(0, 5).map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{record.hoursWorked ? `${record.hoursWorked}h` : "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        record.status === 'Present' ? "bg-green-100 text-green-700" :
                        record.status === 'Late' ? "bg-amber-100 text-amber-700" :
                        record.status === 'Half Day' ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
