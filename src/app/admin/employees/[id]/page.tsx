"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  avatar?: string;
  notes?: string;
  userId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await fetch(`/api/admin/employees/${id}`);
        const data = await res.json();

        if (data.success) {
          setEmployee(data.data);
        } else {
          alert(data.error || "Failed to load employee");
        }
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

  const formatSalary = (salary?: number) => {
    if (salary == null) return "Not specified";
    return `Rs ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(salary)}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Not specified";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statusColor: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
    "On Leave": "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
    Inactive: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  };

  if (loading) {
    return (
      <div className="relative flex items-center justify-center h-64 overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 shadow-2xl">
        <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-10 -right-12 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-md">
        <p className="mb-4 text-lg font-semibold text-slate-700">Employee not found.</p>
        <Link href="/admin/employees" className="font-semibold text-sky-700 transition-colors hover:text-sky-900">
          ← Back to Employees
        </Link>
      </div>
    );
  }

  const details = [
    { label: "Full Name", value: employee.name },
    { label: "Email Address", value: employee.email },
    { label: "Phone Number", value: employee.phone || "Not specified" },
    { label: "Position / Title", value: employee.position },
    { label: "Department", value: employee.department || "Not specified" },
    { label: "Salary", value: formatSalary(employee.salary) },
    { label: "Date of Joining", value: formatDate(employee.dateOfJoining) },
    {
      label: "System Role",
      value: employee.role ? employee.role.charAt(0).toUpperCase() + employee.role.slice(1) : "Employee",
    },
    { label: "Login Account", value: employee.userId ? "Created ✓" : "Not created" },
  ];

  return (
    <div className="max-w-5xl space-y-8 p-4 md:p-6 [perspective:1200px]">
      <div className="flex items-center justify-between">
        <Link href="/admin/employees" className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700">
          ← Back to Employees
        </Link>
        <div className="flex gap-3">
          <Link
            href={`/admin/employees/${employee._id}/edit`}
            className="rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Edit Employee
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-sky-100/80 transition-transform duration-500 hover:[transform:translateY(-2px)_rotateX(0.4deg)]">
        <div className="relative h-36 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 animate-gradient">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-4 border-white/20" />
          <div className="absolute -bottom-8 left-1/4 h-24 w-24 rounded-full bg-purple-300/20 blur-xl" />
        </div>
        <div className="relative z-10 px-6 pb-7 -mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {employee.avatar ? (
                <img
                  src={employee.avatar}
                  alt={`${employee.name} avatar`}
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-xl shadow-cyan-900/30"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-600 text-3xl font-black text-white shadow-xl shadow-indigo-900/30">
                  {employee.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="rounded-2xl border border-white/40 bg-gradient-to-r from-sky-600/95 via-indigo-600/95 to-violet-600/95 px-4 py-2.5 text-white shadow-lg shadow-indigo-900/20 backdrop-blur">
                <h2 className="max-w-[38ch] break-words text-2xl font-black tracking-tight text-white drop-shadow-sm md:text-[1.75rem]">
                  {employee.name}
                </h2>
                <p className="text-sm font-medium text-indigo-100/90">{employee.position}</p>
              </div>
            </div>
            <span className={`self-end rounded-full px-3 py-1 text-sm font-semibold sm:self-auto ${statusColor[employee.status]}`}>
              {employee.status}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-sky-100/70 backdrop-blur">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Employee Details</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {details.map((detail, idx) => (
            <div key={idx} className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/60 to-indigo-50/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{detail.label}</p>
              <p className="break-words font-semibold text-slate-900">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-sky-100/70">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Notes</h3>
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/50 to-violet-50/50 p-4">
          <p className="whitespace-pre-wrap leading-relaxed text-slate-700">
            {employee.notes || "No additional notes for this employee."}
          </p>
        </div>
      </div>
    </div>
  );
}
