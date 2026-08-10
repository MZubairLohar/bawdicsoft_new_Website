"use client";
import { useState, useEffect } from "react";
import EmployeeTabs from "@/components/admin/employees/EmployeeTabs";

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
    <div className="space-y-8 p-4 md:p-6 [perspective:1200px]">
      <EmployeeTabs activeTab="leaves" role={role} />

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 p-6 text-white shadow-2xl shadow-indigo-900/30 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-40 w-40 rounded-full bg-purple-300/25 blur-2xl" />
        <h2 className="text-2xl font-black tracking-tight">Leave Operations Hub</h2>
        <p className="mt-1 text-sm text-white/85">Review requests, capture decisions, and maintain a clean leave audit trail.</p>
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
      <div className="flex flex-wrap gap-2 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-sky-100/70 backdrop-blur">
        {["All", "Pending", "Approved", "Rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
              filter === f
                ? "bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-700/25"
                : "border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700 hover:shadow-md"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Leave applications */}
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-sky-100/80 transition-all duration-300 hover:shadow-2xl">
        <div className="border-b border-slate-100 bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 p-4 text-white md:p-6">
          <h3 className="text-lg font-bold text-white">Leave Applications</h3>
          <p className="mt-1 text-sm text-white/80">Review and manage employee leave requests</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-amber-600" />
          </div>
        ) : filteredLeaves.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>No leave applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-gradient-to-r from-sky-50 via-indigo-50 to-violet-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Employee</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Dates</th>
                  <th className="px-6 py-3 font-semibold">Reason</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Admin Remarks</th>
                  <th className="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeaves.map((leave) => (
                  <tr key={leave._id} className="group align-top transition-all duration-300 hover:bg-sky-50/35 hover:[transform:translateX(2px)]">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{leave.employeeId?.name || "Employee"}</p>
                      <p className="text-xs text-slate-500">{leave.employeeId?.position || ""}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{leave.type}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {" - "}
                      {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="max-w-[240px] px-6 py-4 text-slate-600">{leave.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[leave.status]}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={remarks[leave._id] || ""}
                        onChange={(e) => setRemarks({ ...remarks, [leave._id]: e.target.value })}
                        placeholder="Add remarks..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        disabled={leave.status !== 'Pending'}
                      />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {leave.status === 'Pending' ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleStatusChange(leave, 'Approved')}
                            className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(leave, 'Rejected')}
                            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-sm"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDelete(leave._id)}
                          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-sm"
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
