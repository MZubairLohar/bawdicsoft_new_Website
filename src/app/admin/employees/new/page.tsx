"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewEmployeePage() {
  const router = useRouter();
const [form, setForm] = useState({
    name: "",
    email: "",
  avatar: "",
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
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });

  const optimizeAvatar = async (file: File): Promise<string> => {
    const raw = await toDataUrl(file);
    const image = new Image();

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image"));
      image.src = raw;
    });

    const maxSize = 420;
    const ratio = Math.min(maxSize / image.width, maxSize / image.height, 1);
    const width = Math.max(1, Math.round(image.width * ratio));
    const height = Math.max(1, Math.round(image.height * ratio));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to prepare image preview");

    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.86);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Image is too large. Please choose a file under 5MB.");
      return;
    }

    setAvatarError("");
    setAvatarUploading(true);
    try {
      const optimized = await optimizeAvatar(file);
      setForm((prev) => ({ ...prev, avatar: optimized }));
    } catch (uploadErr) {
      console.error("Failed to process avatar:", uploadErr);
      setAvatarError("Failed to process image. Please try another file.");
    } finally {
      setAvatarUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch('/api/admin/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          salary: form.salary ? Number(form.salary) : undefined,
          dateOfJoining: form.dateOfJoining || undefined,
          avatar: form.avatar.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Employee added successfully!");
        router.push('/admin/employees');
        router.refresh();
      } else {
        setError(data.error || "Failed to add employee");
      }
    } catch (err) {
      console.error("Error adding employee:", err);
      setError("An error occurred while adding the employee");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100";
  const labelClass = "mb-1 block text-sm font-semibold text-slate-700";

  return (
    <div className="max-w-4xl space-y-8 p-4 md:p-6 [perspective:1200px]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900">Add New Employee</h3>
          <p className="mt-1 text-sm text-slate-500">Create a polished employee profile and optional portal login access.</p>
        </div>
        <Link
          href="/admin/employees"
          className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700"
        >
          ← Back to Employees
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-3xl border border-white/70 bg-white p-6 shadow-2xl shadow-sky-100/80 transition-transform duration-500 hover:[transform:translateY(-2px)_rotateX(0.35deg)] space-y-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-32 w-32 rounded-full bg-violet-200/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 p-6 text-white shadow-xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/30 backdrop-blur-sm">
            Employee Creator
          </div>
          <h4 className="mt-3 text-2xl font-black tracking-tight">Create a polished employee profile</h4>
          <p className="mt-2 max-w-2xl text-sm text-white/85">
            Use the same command-center workflow as the dashboard: cleaner inputs, sharper visuals, and consistent action focus.
          </p>
        </div>

        {/* Basic Info */}
        <div>
          <h4 className="mb-4 text-base font-bold text-slate-900">Basic Information</h4>
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

          <div className="mt-4 rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/50 to-indigo-50/60 p-4 shadow-md backdrop-blur">
            <h5 className="text-sm font-bold text-slate-900">Profile Photo</h5>
            <p className="mt-1 text-xs text-slate-500">Upload from your computer, or paste an image URL if the employee sends one online.</p>
            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {form.avatar ? (
                  <img src={form.avatar} alt="Avatar preview" className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-600 text-xl font-black text-white shadow-md shadow-indigo-700/25">
                    {form.name ? form.name.charAt(0).toUpperCase() : "E"}
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex h-10 cursor-pointer items-center whitespace-nowrap rounded-xl border border-sky-200 bg-white px-4 text-sm font-semibold text-sky-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-md">
                    {avatarUploading ? "Processing..." : "Upload Photo"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={avatarUploading} />
                  </label>
                  {form.avatar && (
                    <button
                      type="button"
                      className="inline-flex h-10 items-center whitespace-nowrap rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100"
                      onClick={() => setForm((prev) => ({ ...prev, avatar: "" }))}
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full">
                <label className={labelClass}>Avatar Image URL (Optional)</label>
                <input
                  type="url"
                  name="avatar"
                  value={form.avatar}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://example.com/employee-photo.jpg"
                />
              </div>
            </div>
            {avatarError && <p className="mt-2 text-xs font-medium text-red-600">{avatarError}</p>}
          </div>
        </div>

        {/* Employment Details */}
        <div>
          <h4 className="mb-4 text-base font-bold text-slate-900">Employment Details</h4>
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
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/50 to-indigo-50/60 p-4 shadow-md backdrop-blur">
          <h4 className="mb-1 font-bold text-slate-900">Login Credentials</h4>
          <p className="mb-4 text-sm text-slate-600">
            Set a password to create a login account so this employee can sign in to their portal with their email. Leave blank to skip.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Login Email (uses the email above)</label>
              <input
                type="email"
                value={form.email}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
                placeholder="Employee email is used for login"
              />
              <p className="mt-1 text-xs text-slate-500">The employee will sign in with <strong>{form.email || "the email entered above"}</strong>.</p>
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
                placeholder="Set a login password (min 6 chars)"
                minLength={6}
              />
            </div>
            <div className="flex items-end pb-1">
              <p className="text-xs text-slate-500">Leave blank to create the employee without login access.</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="mb-4 text-base font-bold text-slate-900">Additional Notes</h4>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className={`${inputClass} min-h-[120px]`}
            placeholder="Any additional details about this employee..."
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200/80 pt-4">
          <Link
            href="/admin/employees"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
