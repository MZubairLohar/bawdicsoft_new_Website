"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { hasRole, SALARY_ROLES } from '@/lib/roles';

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

  const canViewSalary = role ? hasRole(role, SALARY_ROLES) : false;
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
    <div className="space-y-6">
      {/* Sub-nav */}
      <div className="flex gap-2">
        <Link href="/admin/employees" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Employees
        </Link>
        <Link href="/admin/employees/attendance" className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white">
          Attendance
        </Link>
        {canViewSalary && (
          <Link href="/admin/employees/salary" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
            Salary
          </Link>
        )}
        <Link href="/admin/employees/leaves" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Leaves
        </Link>
      </div>

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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm"
        />
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm"
        >
          <option value="">All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
            <p className="text-sm text-gray-500 mt-1">View attendance for {month}</p>
          </div>
          <Link
            href="/admin/employees/attendance/mark"
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Mark Attendance
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No attendance records found for this period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Employee</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Check In</th>
                  <th className="px-6 py-3 font-medium">Check Out</th>
                  <th className="px-6 py-3 font-medium">Hours</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {record.employeeId?.name || "Employee"}
                      </p>
                      <p className="text-gray-500 text-xs">{record.employeeId?.position || ""}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
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
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[record.status] || "bg-gray-100 text-gray-600"}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(record._id)}
                        className="text-red-500 hover:text-red-700 font-medium"
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
