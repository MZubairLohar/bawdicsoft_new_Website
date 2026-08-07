"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { hasRole, SALARY_ROLES } from '@/lib/roles';

interface LeaveRecord {
  _id: string;
  employeeId: any;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  adminRemarks?: string;
  createdAt: string;
}

export default function AdminLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [remarks, setRemarks] = useState<Record<string, string>>({});
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

  const fetchLeaves = async (status?: string) => {
    setLoading(true);
    try {
      let url = '/api/admin/leaves';
      if (status && status !== 'All') url += `?status=${status}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setLeaves(data.data);
      } else {
        setError(data.error || "Failed to load leaves");
      }
    } catch (err) {
      console.error("Failed to fetch leaves:", err);
      setError("Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(filter);
  }, [filter]);

  const handleStatusChange = async (leave: LeaveRecord, newStatus: "Approved" | "Rejected") => {
    const remark = remarks[leave._id] || "";
    try {
      const res = await fetch(`/api/admin/leaves/${leave._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: leave.startDate,
          endDate: leave.endDate,
          type: leave.type,
          reason: leave.reason,
          status: newStatus,
          adminRemarks: remark,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Leave ${newStatus.toLowerCase()} successfully!`);
        setLeaves(leaves.map(l => l._id === leave._id ? { ...l, status: newStatus, adminRemarks: remark } : l));
      } else {
        setError(data.error || "Failed to update leave");
      }
    } catch (err) {
      console.error("Error updating leave:", err);
      setError("Failed to update leave");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this leave application?")) return;
    try {
      const res = await fetch(`/api/admin/leaves/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setMessage("Leave application deleted");
        setLeaves(leaves.filter(l => l._id !== id));
      } else {
        setError(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete leave");
    }
  };

  const statusColor: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const filteredLeaves = filter === "All" ? leaves : leaves.filter(l => l.status === filter);

  return (
    <div className="space-y-6">
      {/* Sub-nav */}
      <div className="flex gap-2">
        <Link href="/admin/employees" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Employees
        </Link>
        <Link href="/admin/employees/attendance" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Attendance
        </Link>
        {canViewSalary && (
          <Link href="/admin/employees/salary" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
            Salary
          </Link>
        )}
        <Link href="/admin/employees/leaves" className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white">
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
      <div className="flex gap-2">
        {["All", "Pending", "Approved", "Rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Leave applications */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Leave Applications</h3>
          <p className="text-sm text-gray-500 mt-1">Review and manage employee leave requests</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
          </div>
        ) : filteredLeaves.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No leave applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Employee</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Dates</th>
                  <th className="px-6 py-3 font-medium">Reason</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Admin Remarks</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeaves.map((leave) => (
                  <tr key={leave._id} className="hover:bg-gray-50 align-top">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{leave.employeeId?.name || "Employee"}</p>
                      <p className="text-gray-500 text-xs">{leave.employeeId?.position || ""}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{leave.type}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {" - "}
                      {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[200px]">{leave.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[leave.status]}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={remarks[leave._id] || ""}
                        onChange={(e) => setRemarks({ ...remarks, [leave._id]: e.target.value })}
                        placeholder="Add remarks..."
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                        disabled={leave.status !== 'Pending'}
                      />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {leave.status === 'Pending' ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleStatusChange(leave, 'Approved')}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(leave, 'Rejected')}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDelete(leave._id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      )}
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
