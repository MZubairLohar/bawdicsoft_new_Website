"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  department?: string;
  status: string;
}

export default function MarkAttendancePage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [entries, setEntries] = useState<Record<string, { status: string; notes: string }>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch('/api/admin/employees');
        const data = await res.json();
        if (data.success) {
          setEmployees(data.data);
          // Initialize entries
          const initial: Record<string, { status: string; notes: string }> = {};
          data.data.forEach((emp: Employee) => {
            initial[emp._id] = { status: "Present", notes: "" };
          });
          setEntries(initial);
        } else {
          setError(data.error || "Failed to load employees");
        }
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  const handleStatusChange = (empId: string, status: string) => {
    setEntries((prev) => ({ ...prev, [empId]: { ...prev[empId], status } }));
  };

  const handleNotesChange = (empId: string, notes: string) => {
    setEntries((prev) => ({ ...prev, [empId]: { ...prev[empId], notes } }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    let successCount = 0;
    let errorCount = 0;

    for (const emp of employees) {
      const entry = entries[emp._id];
      if (!entry) continue;

      try {
        const res = await fetch('/api/admin/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employeeId: emp._id,
            date,
            status: entry.status,
            notes: entry.notes || undefined,
          }),
        });
        const data = await res.json();
        if (data.success) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (err) {
        console.error("Error marking attendance:", err);
        errorCount++;
      }
    }

    if (errorCount === 0) {
      setMessage(`Attendance recorded for ${successCount} employees!`);
    } else {
      setError(`${successCount} recorded, ${errorCount} failed (some may already have attendance for this date).`);
    }
    setSaving(false);
  };

  const statusOptions = ["Present", "Absent", "Late", "Half Day", "On Leave"];

  if (loading) {
    return (
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-12 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/30 border-t-cyan-300" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8 p-4 md:p-6 [perspective:1200px]">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 p-6 text-white shadow-2xl shadow-indigo-900/30 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-40 w-40 rounded-full bg-purple-300/25 blur-2xl" />
        <h2 className="text-2xl font-black tracking-tight">Attendance Batch Entry</h2>
        <p className="mt-1 text-sm text-white/85">Record daily attendance for the full team with smoother controls and quick scan clarity.</p>
      </section>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900">Mark Attendance</h3>
          <p className="mt-1 text-sm text-slate-500">Record attendance for all employees on a specific date.</p>
        </div>
        <Link href="/admin/employees/attendance" className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700">
          ← Back to Attendance
        </Link>
      </div>

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

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-sky-100/80">
        <div className="space-y-6 bg-gradient-to-br from-white via-sky-50/40 to-violet-50/35 p-6">
        {/* Date */}
        <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Attendance Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
              className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            required
          />
        </div>

        {/* Employee attendance entries */}
          <div className="overflow-x-auto rounded-2xl border border-white/70 bg-white shadow-md shadow-sky-100/60">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-gradient-to-r from-sky-50 via-indigo-50 to-violet-50 text-slate-500">
              <tr>
                  <th className="px-6 py-3 font-semibold">Employee</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-slate-100">
              {employees.map((emp) => (
                  <tr key={emp._id} className="group transition-all duration-300 hover:bg-sky-50/35 hover:[transform:translateX(2px)]">
                  <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.position} {emp.department ? `• ${emp.department}` : ""}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={entries[emp._id]?.status || "Present"}
                      onChange={(e) => handleStatusChange(emp._id, e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={entries[emp._id]?.notes || ""}
                      onChange={(e) => handleNotesChange(emp._id, e.target.value)}
                      placeholder="Optional notes"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
          <Link
            href="/admin/employees/attendance"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      </form>
    </div>
  );
}
