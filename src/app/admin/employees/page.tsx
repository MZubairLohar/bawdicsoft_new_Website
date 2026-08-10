"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import EmployeeTabs from "@/components/admin/employees/EmployeeTabs";
import { Eye } from "lucide-react";

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

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
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

useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch('/api/admin/employees');
        const data = await res.json();

        if (data.success) {
          setEmployees(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  // Apply search and status filter
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      !search ||
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      (emp.position || "").toLowerCase().includes(search.toLowerCase()) ||
      (emp.department || "").toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || emp.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Stats
  const totalEmployees = employees.length;
  const activeCount = employees.filter(e => e.status === 'Active').length;
  const onLeaveCount = employees.filter(e => e.status === 'On Leave').length;
  const inactiveCount = employees.filter(e => e.status === 'Inactive').length;

  const statusColor: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    "On Leave": "bg-amber-50 text-amber-700 ring-amber-200",
    Inactive: "bg-slate-100 text-slate-600 ring-slate-200",
  };

  const statusDotColor: Record<string, string> = {
    Active: "bg-emerald-500",
    "On Leave": "bg-amber-500",
    Inactive: "bg-slate-400",
  };

const formatSalary = (salary?: number) => {
    if (salary == null) return "N/A";
    return `Rs ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(salary)}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 shadow-2xl">
        <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Employees",
      value: totalEmployees,
      change: "Directory coverage",
      gradient: "from-sky-500 via-blue-600 to-indigo-700",
      glow: "bg-sky-400",
    },
    {
      label: "Active",
      value: activeCount,
      change: "Currently engaged",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      glow: "bg-emerald-400",
    },
    {
      label: "On Leave",
      value: onLeaveCount,
      change: "Away from desk",
      gradient: "from-amber-500 via-orange-500 to-rose-600",
      glow: "bg-amber-400",
    },
    {
      label: "Inactive",
      value: inactiveCount,
      change: "Needs review",
      gradient: "from-slate-500 via-slate-700 to-slate-900",
      glow: "bg-slate-400",
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 [perspective:1200px]">
      <EmployeeTabs activeTab="employees" role={role} />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 p-6 text-white shadow-2xl transition-transform duration-500 hover:[transform:translateY(-2px)_rotateX(0.4deg)] md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="pointer-events-none absolute top-8 right-1/4 h-24 w-24 rounded-full border-2 border-white/20" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white/95 ring-1 ring-white/30 backdrop-blur-sm">
              Workforce Command Center
            </div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-4xl">Employee Management</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
              Track your team with a high-clarity dashboard, instant status visibility, and faster personnel operations.
            </p>
          </div>
          <Link
            href="/admin/employees/new"
            className="inline-flex items-center gap-2 self-start whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm font-semibold text-sky-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <span className="text-base leading-none">+</span> Add New Employee
          </Link>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group [perspective:1000px]"
          >
            <div className="relative transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
              <div className={`absolute -inset-2 rounded-3xl ${stat.glow} opacity-30 blur-xl`} />
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-xl card-gloss`}>
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border-4 border-white/15" />
                <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
                <p className="relative text-sm font-medium text-white/85">{stat.label}</p>
                <div className="relative mt-2 flex items-center justify-between">
                  <h3 className="text-3xl font-black tracking-tight text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    {stat.value}
                  </h3>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold ring-1 ring-white/25 backdrop-blur-sm">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-xl shadow-sky-100/70 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, position, or department..."
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />
          <div className="flex flex-wrap gap-2">
          {["All", "Active", "On Leave", "Inactive"].map((filterName) => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
                className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                filter === filterName
                    ? "bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700 hover:shadow-md"
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>
      </div>
      </div>

      {/* Employees Table */}
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-sky-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
        <div className="overflow-hidden">
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 text-white">
            <tr>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em]">Employee</th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em]">Position</th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em]">Department</th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em]">Salary</th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em]">Joined</th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em]">Status</th>
                <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.12em]">Action</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-sky-50">
            {filteredEmployees.length === 0 ? (
              <tr>
                  <td colSpan={7} className="px-6 py-14 text-center text-slate-500">
                  {employees.length === 0
                    ? "No employees yet. Add your first team member to get started."
                    : "No employees match your search."}
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="group transition-all duration-300 hover:bg-sky-50/45 hover:[transform:translateX(2px)]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {emp.avatar ? (
                          <img
                            src={emp.avatar}
                            alt={`${emp.name} avatar`}
                            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-md shadow-cyan-700/30 transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-600 text-sm font-black text-white shadow-md shadow-indigo-700/30 transition-transform duration-300 group-hover:scale-105">
                            {emp.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      <div>
                          <p className="font-semibold text-slate-800">{emp.name}</p>
                          <p className="text-xs text-slate-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                    <td className="px-6 py-4 text-slate-600">{emp.position}</td>
                    <td className="px-6 py-4 text-slate-600">{emp.department || "—"}</td>
                    <td className="px-6 py-4 text-slate-600">{formatSalary(emp.salary)}</td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(emp.dateOfJoining)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusColor[emp.status]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusDotColor[emp.status]}`} />
                          {emp.status}
                        </span>
                      </div>
                  </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/employees/${emp._id}`}
                        className="inline-flex items-center gap-1 rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-md"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>
                    </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
