"use client";
import { useState, useEffect } from "react";
import { badgeBase, cardClass, tableWrapper, tableClass, theadClass, thClass, tbodyClass, tdClass } from "@/lib/ui";

interface AttendanceRecord {
  _id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: string;
  hoursWorked: number;
}

export default function EmployeeAttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const res = await fetch(`/api/employee/attendance?month=${month}`);
        const data = await res.json();

        if (data.success) {
          setRecords(data.data);
        } else {
          setError(data.error || "Failed to load attendance");
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const statusBadge: Record<string, string> = {
    Present: "bg-green-100 text-green-700",
    Late: "bg-amber-100 text-amber-700",
    "Half Day": "bg-yellow-100 text-yellow-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`${cardClass} p-5`}>
          <p className="text-sm font-medium text-gray-500">Days Present</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {records.filter(r => ['Present', 'Late', 'Half Day'].includes(r.status)).length}
          </h3>
        </div>
        <div className={`${cardClass} p-5`}>
          <p className="text-sm font-medium text-gray-500">Total Hours</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {records.reduce((sum, r) => sum + (r.hoursWorked || 0), 0).toFixed(1)}h
          </h3>
        </div>
        <div className={`${cardClass} p-5`}>
          <p className="text-sm font-medium text-gray-500">On Leave</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {records.filter(r => r.status === 'On Leave').length}
          </h3>
        </div>
      </div>

      {/* Attendance History */}
      <div className={`${cardClass} overflow-hidden`}>
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">This Month's Attendance</h3>
          <p className="text-sm text-gray-500 mt-1">Your attendance records for the current month</p>
        </div>
        {records.length === 0 ? (
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
                {records.map((record) => (
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
