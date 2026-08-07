"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  department?: string;
  salary?: number;
  dateOfJoining?: string;
  status: "Active" | "On Leave" | "Inactive";
  role?: string;
  notes?: string;
  userId?: string | null;
}

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: "",
    dateOfJoining: "",
    status: "Active",
    role: "employee",
    password: "",
    notes: "",
  });
  const [hasLogin, setHasLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await fetch(`/api/admin/employees/${id}`);
        const data = await res.json();

        if (data.success) {
          const emp = data.data;
          setForm({
            name: emp.name || "",
            email: emp.email || "",
            phone: emp.phone || "",
            position: emp.position || "",
            department: emp.department || "",
            salary: emp.salary != null ? String(emp.salary) : "",
            dateOfJoining: emp.dateOfJoining ? emp.dateOfJoining.slice(0, 10) : "",
status: emp.status || "Active",
            role: emp.role || "employee",
            password: "",
            notes: emp.notes || "",
          });
          setHasLogin(!!emp.userId);
        } else {
          setError(data.error || "Failed to load employee");
        }
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError("An error occurred while loading the employee");
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          salary: form.salary ? Number(form.salary) : undefined,
          dateOfJoining: form.dateOfJoining || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Employee updated successfully!");
        router.push(`/admin/employees/${id}`);
        router.refresh();
      } else {
        setError(data.error || "Failed to update employee");
      }
    } catch (err) {
      console.error("Error updating employee:", err);
      setError("An error occurred while updating the employee");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Edit Employee</h3>
          <p className="text-sm text-gray-500 mt-1">Update the details for {form.name || "this employee"}.</p>
        </div>
        <Link
          href={`/admin/employees/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          ← Back to Details
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="john@company.com"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+1 234 567 890"
              />
            </div>
            <div>
              <label className={labelClass}>Position / Title *</label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Senior Developer"
                required
              />
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Employment Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Department</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Engineering"
              />
            </div>
            <div>
              <label className={labelClass}>Salary (Rs)</label>
              <input
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. 60000"
              />
            </div>
            <div>
              <label className={labelClass}>Date of Joining</label>
              <input
                type="date"
                name="dateOfJoining"
                value={form.dateOfJoining}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>System Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="rep">Representative</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Login Credentials */}
        <div className="bg-brand-50/50 border border-brand-100 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-1">Login Credentials</h4>
          <p className="text-sm text-gray-600 mb-4">
            {hasLogin
              ? "This employee already has a login account. Set a new password below to reset it."
              : "This employee has no login account yet. Set a password to create one so they can sign in with their email."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Login Email (uses the email above)</label>
              <input
                type="email"
                value={form.email}
                readOnly
                className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
                placeholder="Employee email is used for login"
              />
            </div>
            <div>
              <label className={labelClass}>New Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
                placeholder={hasLogin ? "Enter a new password to reset" : "Set login password (min 6 chars)"}
                minLength={6}
              />
            </div>
            <div className="flex items-end pb-1">
              <p className="text-xs text-gray-500">
                {hasLogin
                  ? "Leave blank to keep the current password."
                  : "Leave blank to keep employee without login access."}
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Additional Notes</h4>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className={`${inputClass} min-h-[120px]`}
            placeholder="Any additional details about this employee..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Link
            href={`/admin/employees/${id}`}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
