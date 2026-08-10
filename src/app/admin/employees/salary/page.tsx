"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { hasRole, SALARY_ROLES } from '@/lib/roles';
import EmployeeTabs from "@/components/admin/employees/EmployeeTabs";

interface SalaryRow {
  employee: {
    _id: string;
    name: string;
    email: string;
    position: string;
    department?: string;
  };
  baseSalary: number;
  workingDays: number;
  presentDays: number;
  approvedLeaveDays: number;
  totalDays: number;
  dailyRate: number;
  grossSalary: number;
  deductions: number;
}

export default function AdminSalaryPage() {
  const [data, setData] = useState<{ month: string; workingDays: number; employees: SalaryRow[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Fetch current user role
  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch('/api/auth/session');
        const json = await res.json();
        if (json.success) setRole(json.data.role);
      } catch (e) {
        console.error("Failed to fetch role:", e);
      }
    }
    fetchRole();
  }, []);

  const canViewSalary = role ? hasRole(role, SALARY_ROLES) : false;

  useEffect(() => {
    async function fetchSalary() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/salary?month=${month}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError(json.error || "Failed to compute salary");
        }
      } catch (err) {
        console.error("Failed to fetch salary:", err);
        setError("Failed to compute salary");
      } finally {
        setLoading(false);
      }
    }
    fetchSalary();
  }, [month]);

const formatCurrency = (n: number) =>
    `Rs ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)}`;

const totalGross = data?.employees.reduce((sum, e) => sum + e.grossSalary, 0) || 0;
  const totalDeductions = data?.employees.reduce((sum, e) => sum + e.deductions, 0) || 0;

  // Access denied if role not resolved yet or user lacks salary access
if (!canViewSalary) {
    return (
      <div className="space-y-8 p-4 md:p-6 [perspective:1200px]">
        <EmployeeTabs activeTab="salary" role={role} />
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-md">
          <p>
            You do not have permission to view salary information. This section is restricted to Super Admins and Admins.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-6 [perspective:1200px]">
      <EmployeeTabs activeTab="salary" role={role} />

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 p-6 text-white shadow-2xl shadow-indigo-900/30 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-40 w-40 rounded-full bg-purple-300/25 blur-2xl" />
        <h2 className="text-2xl font-black tracking-tight">Payroll Intelligence</h2>
        <p className="mt-1 text-sm text-white/85">Analyze monthly salary distribution and attendance-adjusted compensation details.</p>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {error}
        </div>
      )}

      {/* Month selector & summary */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-sky-100/70 backdrop-blur sm:flex-row sm:items-center">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="max-w-xs rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />
        {data && (
          <div className="flex gap-4">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
              <span className="text-slate-500">Working Days: </span>
              <span className="font-semibold text-slate-900">{data.workingDays}</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
              <span className="text-slate-500">Total Payroll: </span>
              <span className="font-semibold text-slate-900">{formatCurrency(totalGross)}</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
              <span className="text-slate-500">Deductions: </span>
              <span className="font-semibold text-red-600">-{formatCurrency(totalDeductions)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Salary Sheet */}
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-sky-100/80 transition-all duration-300 hover:shadow-2xl">
        <div className="border-b border-slate-100 bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 p-4 text-white md:p-6">
          <h3 className="text-lg font-bold text-white">Monthly Salary Sheet</h3>
          <p className="mt-1 text-sm text-white/80">
            Pro-rated salary for {month} based on attendance (weekdays Mon-Fri)
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />
          </div>
        ) : !data || data.employees.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>No active employees found to compute salaries.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] text-left text-sm">
              <thead className="bg-gradient-to-r from-sky-50 via-indigo-50 to-violet-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Employee</th>
                  <th className="px-6 py-3 font-semibold">Base Salary</th>
                  <th className="px-6 py-3 font-semibold">Daily Rate</th>
                  <th className="px-6 py-3 font-semibold">Present</th>
                  <th className="px-6 py-3 font-semibold">Leave</th>
                  <th className="px-6 py-3 font-semibold">Total Days</th>
                  <th className="px-6 py-3 font-semibold">Deductions</th>
                  <th className="px-6 py-3 text-right font-semibold">Net Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.employees.map((row) => (
                  <tr key={row.employee._id} className="group transition-all duration-300 hover:bg-sky-50/35 hover:[transform:translateX(2px)]">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{row.employee.name}</p>
                      <p className="text-xs text-slate-500">{row.employee.position}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{formatCurrency(row.baseSalary)}</td>
                    <td className="px-6 py-4 text-slate-600">{formatCurrency(row.dailyRate)}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{row.presentDays}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{row.approvedLeaveDays}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">{row.totalDays}</span>
                      <span className="text-slate-400"> / {row.workingDays}</span>
                    </td>
                    <td className="px-6 py-4 text-red-600">-{formatCurrency(row.deductions)}</td>
                    <td className="px-6 py-4 text-right font-black text-slate-900">{formatCurrency(row.grossSalary)}</td>
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
