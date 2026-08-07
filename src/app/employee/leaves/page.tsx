"use client";
import { useState, useEffect } from "react";

interface LeaveRecord {
  _id: string;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  adminRemarks?: string;
  createdAt: string;
}

export default function EmployeeLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "Casual",
    reason: "",
  });

  const fetchLeaves = async () => {
    try {
      const res = await fetch('/api/employee/leaves');
      const data = await res.json();
      if (data.success) {
        setLeaves(data.data);
      } else {
        setError(data.error || "Failed to load leaves");
      }
    } catch (err) {
      console.error("Error fetching leaves:", err);
      setError("Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    if (!form.startDate || !form.endDate || !form.reason) {
      setError("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date cannot be before start date.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/employee/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("Leave application submitted successfully!");
        setForm({ startDate: "", endDate: "", type: "Casual", reason: "" });
        await fetchLeaves();
      } else {
        setError(data.error || "Failed to submit leave");
      }
    } catch (err) {
      console.error("Error submitting leave:", err);
      setError("An error occurred while submitting leave");
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Leave Application Form */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Leave Application</h3>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Leave Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Casual">Casual</option>
                <option value="Sick">Sick</option>
                <option value="Annual">Annual</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>End Date *</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Reason *</label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                className={`${inputClass} min-h-[100px]`}
                placeholder="Please provide a reason for your leave"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>

      {/* Leave History */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">My Leave History</h3>
            <p className="text-sm text-gray-500 mt-1">All your leave applications</p>
          </div>
          {leaves.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>You have not submitted any leave applications yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Dates</th>
                    <th className="px-6 py-3 font-medium">Reason</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leaves.map((leave) => (
                    <tr key={leave._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{leave.type}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {" - "}
                        {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{leave.reason}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[leave.status]}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs max-w-xs truncate">
                        {leave.adminRemarks || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
