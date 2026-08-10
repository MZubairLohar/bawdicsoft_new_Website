"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import EmployeeTabs from "@/components/admin/employees/EmployeeTabs";

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  department?: string;
  status: string;
}

interface AttendanceRecord {
  _id: string;
  employeeId: any;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: string;
  hoursWorked: number;
  notes?: string;
}

export default function AdminAttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // Fetch current user role
  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.success) setRole(data.data.role);
      } catch (e) {
        console.error("Failed to fetch role:", e);
      }
    }
    fetchRole();
  }, []);

  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch employees for the marking form
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch('/api/admin/employees');
        const data = await res.json();
        if (data.success) {
          setEmployees(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    }
    fetchEmployees();
  }, []);

  // Fetch attendance records (filtered by month and optionally employee)
  useEffect(() => {
    async function fetchAttendance() {
      setLoading(true);
      try {
        let url = `/api/admin/attendance?month=${month}`;
        if (selectedEmployee) url += `&employeeId=${selectedEmployee}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setRecords(data.data);
        } else {
          setError(data.error || "Failed to load attendance");
        }
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
        setError("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, [month, selectedEmployee]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this attendance record?")) return;
    try {
      const res = await fetch(`/api/admin/attendance/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setMessage("Attendance record deleted");
        setRecords(records.filter(r => r._id !== id));
      } else {
        setError(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete record");
    }
  };

  const statusColor: Record<string, string> = {
    Present: "bg-green-100 text-green-700",
    Absent: "bg-red-100 text-red-700",
    Late: "bg-amber-100 text-amber-700",
    "Half Day": "bg-yellow-100 text-yellow-700",
    "On Leave": "bg-purple-100 text-purple-700",
  };

  // Group records by employee for display
  const grouped: Record<string, AttendanceRecord[]> = {};
  records.forEach((r) => {
    const empId = r.employeeId?._id || String(r.employeeId);
    if (!grouped[empId]) grouped[empId] = [];
    grouped[empId].push(r);
  });

  return (
    <div className="space-y-8 p-4 md:p-6 [perspective:1200px]">
      <EmployeeTabs activeTab="attendance" role={role} />

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 p-6 text-white shadow-2xl shadow-indigo-900/30 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-40 w-40 rounded-full bg-purple-300/25 blur-2xl" />
        <h2 className="text-2xl font-black tracking-tight">Attendance Intelligence</h2>
        <p className="mt-1 text-sm text-white/85">Filter, track, and maintain clean attendance history with faster workflow actions.</p>
      </section>

      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-sky-100/70 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        >
          <option value="">All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>
      </div>
      </div>

      {/* Attendance Records */}
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-sky-100/80 transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 p-4 text-white md:p-6">
          <div>
            <h3 className="text-lg font-bold text-white">Attendance Records</h3>
            <p className="mt-1 text-sm text-white/80">View attendance for {month}</p>
          </div>
          <Link
            href="/admin/employees/attendance/mark"
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-sky-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            + Mark Attendance
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-600" />
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>No attendance records found for this period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-gradient-to-r from-sky-50 via-indigo-50 to-violet-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Employee</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Check In</th>
                  <th className="px-6 py-3 font-semibold">Check Out</th>
                  <th className="px-6 py-3 font-semibold">Hours</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((record) => (
                  <tr key={record._id} className="group transition-all duration-300 hover:bg-sky-50/35 hover:[transform:translateX(2px)]">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {record.employeeId?.name || "Employee"}
                      </p>
                      <p className="text-xs text-slate-500">{record.employeeId?.position || ""}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{record.hoursWorked ? `${record.hoursWorked}h` : "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[record.status] || "bg-gray-100 text-gray-600"}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(record._id)}
                        className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-sm"
                      >
                        Delete
                      </button>
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
