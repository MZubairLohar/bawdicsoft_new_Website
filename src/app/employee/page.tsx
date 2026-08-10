"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { badgeBase, cardClass, tableWrapper, tableClass, theadClass, thClass, tbodyClass, tdClass } from "@/lib/ui";

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

  const stats = [
    { label: "Days Present", value: daysPresent.toString(), color: "bg-green-50 text-green-600" },
    { label: "Hours Worked", value: `${totalHours.toFixed(1)}h`, color: "bg-blue-50 text-blue-600" },
    { label: "Pending Leaves", value: pendingLeaves.toString(), color: "bg-amber-50 text-amber-600" },
    { label: "Approved Leaves", value: approvedLeaves.toString(), color: "bg-purple-50 text-purple-600" },
  ];

  const statusBadge: Record<string, string> = {
    Present: "bg-green-100 text-green-700",
    Late: "bg-amber-100 text-amber-700",
    "Half Day": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${cardClass} p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your leave requests</p>
            </div>
          </div>
          <div className="space-y-3">
            <Link
              href="/employee/leaves"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-brand-50 hover:border-brand-200 transition-all duration-200 group"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700">Submit a Leave Application</span>
              <span className="text-brand-600 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/employee/leaves"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-brand-50 hover:border-brand-200 transition-all duration-200 group"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700">View My Leave History</span>
              <span className="text-brand-600 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/employee/attendance"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-brand-50 hover:border-brand-200 transition-all duration-200 group"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700">View My Attendance</span>
              <span className="text-brand-600 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className={`${cardClass} p-6`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Summary</h3>
          <div className="space-y-3">
            {pendingLeaves > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
                <span className="text-sm font-medium text-amber-700 flex items-center">
                  <span className="relative inline-flex h-2.5 w-2.5 mr-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                  Pending applications
                </span>
                <span className="text-sm font-bold text-amber-700">{pendingLeaves}</span>
              </div>
            )}
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
              <span className="text-sm font-medium text-green-700">Approved leaves</span>
              <span className="text-sm font-bold text-green-700">{approvedLeaves}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-sm font-medium text-gray-600">Days present this month</span>
              <span className="text-sm font-bold text-gray-700">{daysPresent}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${cardClass} p-5 hover:shadow-md transition-shadow duration-200`}>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.color}`}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Attendance */}
      <div className={`${cardClass} overflow-hidden`}>
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
          <div className={tableWrapper}>
            <table className={tableClass}>
              <thead className={theadClass}>
                <tr>
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Check In</th>
                  <th className={thClass}>Check Out</th>
                  <th className={thClass}>Hours</th>
                  <th className={thClass}>Status</th>
                </tr>
              </thead>
              <tbody className={tbodyClass}>
                {monthAttendance.slice(0, 5).map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className={`${tdClass} font-medium text-gray-900 whitespace-nowrap`}>
                      {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className={`${tdClass} text-gray-600 whitespace-nowrap`}>
                      {record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                    </td>
                    <td className={`${tdClass} text-gray-600 whitespace-nowrap`}>
                      {record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                    </td>
                    <td className={`${tdClass} text-gray-600 whitespace-nowrap`}>{record.hoursWorked ? `${record.hoursWorked}h` : "—"}</td>
                    <td className={tdClass}>
                      <span className={`${badgeBase} ${statusBadge[record.status] || "bg-gray-100 text-gray-600"}`}>
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
