"use client";
import { useState, useEffect } from "react";

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
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [clock, setClock] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchAttendance = async () => {
    try {
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const res = await fetch(`/api/employee/attendance?month=${month}`);
      const data = await res.json();

      if (data.success) {
        setRecords(data.data);
        const todayStr = now.toDateString();
        const today = data.data.find((r: AttendanceRecord) => new Date(r.date).toDateString() === todayStr);
        setTodayRecord(today || null);
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

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleAction = async (action: 'checkin' | 'checkout') => {
    setActionLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch('/api/employee/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage(action === 'checkin' ? "Checked in successfully!" : "Checked out successfully!");
        await fetchAttendance();
      } else {
        setError(data.error || "Action failed");
      }
    } catch (err) {
      console.error("Attendance action error:", err);
      setError("An error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  const checkedIn = !!todayRecord?.checkIn;
  const checkedOut = !!(todayRecord?.checkIn && todayRecord?.checkOut);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Clock & Check-in Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-500 mb-2">Current Time</p>
        <h2 className="text-5xl font-bold text-gray-900 mb-1">
          {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </h2>
        <p className="text-gray-500 mb-6">
          {clock.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase mb-1">Check In</p>
            <p className="text-xl font-bold text-gray-900">
              {todayRecord?.checkIn ? new Date(todayRecord.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase mb-1">Check Out</p>
            <p className="text-xl font-bold text-gray-900">
              {todayRecord?.checkOut ? new Date(todayRecord.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleAction('checkin')}
            disabled={checkedIn || actionLoading}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading && !checkedIn && !checkedOut ? "Processing..." : checkedIn ? "Checked In ✓" : "Check In"}
          </button>
          <button
            onClick={() => handleAction('checkout')}
            disabled={!checkedIn || checkedOut || actionLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checkedOut ? "Checked Out ✓" : "Check Out"}
          </button>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">This Month's Attendance</h3>
          <p className="text-sm text-gray-500 mt-1">Your attendance records for the current month</p>
        </div>
        {records.length === 0 ? (
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
                {records.map((record) => (
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
