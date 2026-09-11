"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import EmployeeTabs from "@/components/admin/employees/EmployeeTabs";
import { Eye, Users, UserCheck, Clock, UserX, Search } from "lucide-react";

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

  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" });
        const data = res.ok ? await res.json() : { success: false };
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
        const res = await fetch("/api/admin/employees", { credentials: "include" });
        const data = res.ok ? await res.json() : { success: false };

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

  const totalEmployees = employees.length;
  const activeCount = employees.filter((e) => e.status === "Active").length;
  const onLeaveCount = employees.filter((e) => e.status === "On Leave").length;
  const inactiveCount = employees.filter((e) => e.status === "Inactive").length;

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
    return `Rs ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
      salary
    )}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-sky-100 border-t-sky-600 animate-spin" />
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Employees",
      value: totalEmployees,
      change: "Directory coverage",
      gradient: "from-sky-500 to-blue-600",
      icon: Users,
    },
    {
      label: "Active",
      value: activeCount,
      change: "Currently engaged",
      gradient: "from-cyan-500 to-sky-600",
      icon: UserCheck,
    },
    {
      label: "On Leave",
      value: onLeaveCount,
      change: "Away from desk",
      gradient: "from-amber-500 to-orange-600",
      icon: Clock,
    },
    {
      label: "Inactive",
      value: inactiveCount,
      change: "Needs review",
      gradient: "from-slate-500 to-slate-700",
      icon: UserX,
    },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <EmployeeTabs activeTab="employees" role={role} />

      {/* ===== Hero Banner ===== */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-white p-6 md:p-10 shadow-xl">
        <div className="pointer-events-none absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute top-8 right-1/4 w-24 h-24 rounded-full border-2 border-white/10" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 text-xs font-semibold mb-4">
              Workforce Command Center
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Employee Management
            </h1>
            <p className="text-white/70 text-sm md:text-base mt-2 max-w-xl">
              Track your team with a high-clarity dashboard, instant status visibility,
              and faster personnel operations.
            </p>
          </div>
          <Link
            href="/admin/employees/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-sky-800 font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap self-start md:self-auto"
          >
            <span className="text-base leading-none">+</span> Add New Employee
          </Link>
        </div>
      </section>

      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
              />
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 mt-2">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* ===== Search & Filter ===== */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, position, or department..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Active", "On Leave", "Inactive"].map((filterName) => (
              <button
                key={filterName}
                onClick={() => setFilter(filterName)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === filterName
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-sky-200 hover:text-sky-600 hover:-translate-y-0.5"
                }`}
              >
                {filterName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Employees Table ===== */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-gray-50/80 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center text-gray-500">
                    <Users className="h-10 w-10 mx-auto text-gray-200 mb-3" />
                    <p className="text-sm font-medium text-gray-600">
                      {employees.length === 0
                        ? "No employees yet. Add your first team member to get started."
                        : "No employees match your search."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="hover:bg-sky-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {emp.avatar ? (
                          <img
                            src={emp.avatar}
                            alt={`${emp.name} avatar`}
                            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:scale-110 transition-transform"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white shadow-sm group-hover:scale-110 transition-transform">
                            {emp.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate max-w-[180px]">
                            {emp.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[180px]">
                            {emp.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{emp.position}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {emp.department || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {formatSalary(emp.salary)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {formatDate(emp.dateOfJoining)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                          statusColor[emp.status]
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            statusDotColor[emp.status]
                          }`}
                        />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/employees/${emp._id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-100 transition-colors"
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