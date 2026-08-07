"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { hasRole, SALARY_ROLES } from '@/lib/roles';

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
      <div className="space-y-6">
        <div className="flex gap-2">
          <Link href="/admin/employees" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
            Employees
          </Link>
          <Link href="/admin/employees/attendance" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
            Attendance
          </Link>
          <Link href="/admin/employees/leaves" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
            Leaves
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-500">
            You do not have permission to view salary information. This section is restricted to Super Admins and Admins.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sub-nav */}
      <div className="flex gap-2">
        <Link href="/admin/employees" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Employees
        </Link>
        <Link href="/admin/employees/attendance" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Attendance
        </Link>
        <Link href="/admin/employees/salary" className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white">
          Salary
        </Link>
        <Link href="/admin/employees/leaves" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Leaves
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Month selector & summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm max-w-xs"
        />
        {data && (
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm">
              <span className="text-gray-500">Working Days: </span>
              <span className="font-semibold text-gray-900">{data.workingDays}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm">
              <span className="text-gray-500">Total Payroll: </span>
              <span className="font-semibold text-gray-900">{formatCurrency(totalGross)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Salary Sheet */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Salary Sheet</h3>
          <p className="text-sm text-gray-500 mt-1">
            Pro-rated salary for {month} based on attendance (weekdays Mon-Fri)
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
          </div>
        ) : !data || data.employees.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No active employees found to compute salaries.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Employee</th>
                  <th className="px-6 py-3 font-medium">Base Salary</th>
                  <th className="px-6 py-3 font-medium">Daily Rate</th>
                  <th className="px-6 py-3 font-medium">Present</th>
                  <th className="px-6 py-3 font-medium">Leave</th>
                  <th className="px-6 py-3 font-medium">Total Days</th>
                  <th className="px-6 py-3 font-medium">Deductions</th>
                  <th className="px-6 py-3 font-medium text-right">Net Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.employees.map((row) => (
                  <tr key={row.employee._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{row.employee.name}</p>
                      <p className="text-gray-500 text-xs">{row.employee.position}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{formatCurrency(row.baseSalary)}</td>
                    <td className="px-6 py-4 text-gray-600">{formatCurrency(row.dailyRate)}</td>
                    <td className="px-6 py-4 text-gray-600">{row.presentDays}</td>
                    <td className="px-6 py-4 text-gray-600">{row.approvedLeaveDays}</td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{row.totalDays}</span>
                      <span className="text-gray-400"> / {row.workingDays}</span>
                    </td>
                    <td className="px-6 py-4 text-red-600">-{formatCurrency(row.deductions)}</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">{formatCurrency(row.grossSalary)}</td>
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
