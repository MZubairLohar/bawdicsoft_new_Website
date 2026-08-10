"use client";
import { useState, useEffect } from "react";
import EmployeeTabs from "@/components/admin/employees/EmployeeTabs";
import { badgeBase } from "@/lib/ui";

interface CheckInRow {
  employeeId: string;
  name: string;
  email: string;
  position: string;
  department?: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  hoursWorked: number;
  attendanceId: string | null;
}

const LiveDot = ({ color }: { color: string }) => (
  <span className="relative inline-flex h-2.5 w-2.5 mr-2">
    <span className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-75 animate-ping`}></span>
    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`}></span>
  </span>
);

export default function AdminCheckInOutPage() {
  const [rows, setRows] = useState<CheckInRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

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

  const fetchStatus = async (d?: string) => {
    setLoading(true);
    setError("");
    try {
      const target = d || date;
      const res = await fetch(`/api/admin/attendance/checkin?date=${target}`);
      const data = await res.json();
      if (data.success) {
        setRows(data.data);
      } else {
        setError(data.error || "Failed to load status");
      }
    } catch (err) {
      console.error("Failed to fetch check-in status:", err);
      setError("Failed to load status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async (employeeId: string, action: 'checkin' | 'checkout') => {
    setActionId(`${employeeId}-${action}`);
    setMessage("");
    setError("");
    try {
      const res = await fetch('/api/admin/attendance/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, action, date }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`${data.employeeName || 'Employee'} ${action === 'checkin' ? 'checked in' : 'checked out'} successfully!`);
        await fetchStatus();
      } else {
        setError(data.error || `Failed to ${action === 'checkin' ? 'check in' : 'check out'}`);
      }
    } catch (err) {
      console.error("Check-in action error:", err);
      setError("An error occurred");
    } finally {
      setActionId(null);
    }
  };

  const formatTime = (d: string | null) => {
    if (!d) return "—";
    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const presentCount = rows.filter(r => r.checkIn).length;
  const absentCount = rows.length - presentCount;
  const checkedOutCount = rows.filter(r => r.checkIn && r.checkOut).length;

  return (
    <div className="space-y-8 p-4 md:p-6 [perspective:1200px]">
      <EmployeeTabs activeTab="checkin" role={role} />

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 p-6 text-white shadow-2xl shadow-indigo-900/30 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-40 w-40 rounded-full bg-purple-300/25 blur-2xl" />
        <h2 className="text-2xl font-black tracking-tight">Live Check-In Console</h2>
        <p className="mt-1 text-sm text-white/85">Operate real-time presence flow with clean status signals and precise actions.</p>
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

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-white via-sky-50/50 to-indigo-50/60 p-5 shadow-xl shadow-sky-100/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <p className="text-sm font-medium text-gray-500 flex items-center">
            <LiveDot color="bg-green-500" /> Present
          </p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{presentCount}</h3>
        </div>
        <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-white via-violet-50/50 to-rose-50/60 p-5 shadow-xl shadow-sky-100/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <p className="text-sm font-medium text-gray-500 flex items-center">
            <LiveDot color="bg-red-500" /> Absent
          </p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{absentCount}</h3>
        </div>
        <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-white via-sky-50/60 to-violet-50/60 p-5 shadow-xl shadow-sky-100/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <p className="text-sm font-medium text-gray-500 flex items-center">
            <LiveDot color="bg-blue-500" /> Checked Out
          </p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{checkedOutCount}</h3>
        </div>
      </div>

      {/* Date filter */}
      <div className="flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-sky-100/70 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            fetchStatus(e.target.value);
          }}
          className="max-w-xs rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />
        <p className="text-sm text-slate-500">Manage employee check-in and check-out for the selected date.</p>
      </div>

      {/* Check In/Out table */}
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-sky-100/80 transition-all duration-300 hover:shadow-2xl">
        <div className="border-b border-slate-100 bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 p-4 text-white md:p-6">
          <h3 className="text-lg font-bold text-white">Employee Check In / Out</h3>
          <p className="mt-1 text-sm text-white/80">Live status of all active employees</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />
          </div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>No active employees found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-gradient-to-r from-sky-50 via-indigo-50 to-violet-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Employee</th>
                  <th className="px-6 py-3 font-semibold">Check In</th>
                  <th className="px-6 py-3 font-semibold">Check Out</th>
                  <th className="px-6 py-3 font-semibold">Hours</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => {
                  const isPresent = !!row.checkIn;
                  const isOut = !!row.checkIn && !!row.checkOut;
                  const status = isOut ? 'Checked Out' : isPresent ? 'Present' : 'Absent';
                  return (
                    <tr key={row.employeeId} className="group transition-all duration-300 hover:bg-sky-50/35 hover:[transform:translateX(2px)]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-600 text-sm font-black text-white shadow-md shadow-indigo-900/25">
                            {row.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{row.name}</p>
                            <p className="text-xs text-slate-500">{row.position} {row.department ? `• ${row.department}` : ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                        <span className="flex items-center gap-2">
                          {isPresent && <LiveDot color="bg-green-500" />}
                          {formatTime(row.checkIn)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">{formatTime(row.checkOut)}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-700">{row.hoursWorked ? `${row.hoursWorked}h` : "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`${badgeBase} ${status === 'Present' ? 'bg-green-100 text-green-700' : status === 'Checked Out' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 flex-wrap">
                          {!isPresent && (
                            <button
                              onClick={() => handleAction(row.employeeId, 'checkin')}
                              disabled={actionId === `${row.employeeId}-checkin`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionId === `${row.employeeId}-checkin` ? "..." : "Check In"}
                            </button>
                          )}
                          {isPresent && !isOut && (
                            <button
                              onClick={() => handleAction(row.employeeId, 'checkout')}
                              disabled={actionId === `${row.employeeId}-checkout`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionId === `${row.employeeId}-checkout` ? "..." : "Check Out"}
                            </button>
                          )}
                          {isOut && (
                            <span className="text-xs text-gray-400 inline-flex items-center">Completed</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
