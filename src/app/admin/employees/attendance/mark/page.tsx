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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mark Attendance</h3>
          <p className="text-sm text-gray-500 mt-1">Record attendance for all employees on a specific date</p>
        </div>
        <Link href="/admin/employees/attendance" className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Back to Attendance
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

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm"
            required
          />
        </div>

        {/* Employee attendance entries */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{emp.name}</p>
                    <p className="text-gray-500 text-xs">{emp.position} {emp.department ? `• ${emp.department}` : ""}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={entries[emp._id]?.status || "Present"}
                      onChange={(e) => handleStatusChange(emp._id, e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none"
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
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Link
            href="/admin/employees/attendance"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      </form>
    </div>
  );
}
