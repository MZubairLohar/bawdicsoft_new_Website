"use client";
import { useState, useEffect } from "react";

interface SalaryData {
  month: string;
  employee: {
    _id: string;
    name: string;
    email: string;
    position: string;
    department?: string;
  };
  workingDays: number;
  presentDays: number;
  approvedLeaveDays: number;
  totalDays: number;
  baseSalary: number;
  dailyRate: number;
  grossSalary: number;
  deductions: number;
}

export default function EmployeeSalaryPage() {
  const [data, setData] = useState<SalaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    async function fetchSalary() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/employee/salary?month=${month}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError(json.error || "Failed to load salary");
        }
      } catch (err) {
        console.error("Failed to fetch salary:", err);
        setError("Failed to load salary");
      } finally {
        setLoading(false);
      }
    }
    fetchSalary();
  }, [month]);

  const formatCurrency = (n: number) =>
    `Rs ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Month selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">My Salary</h3>
          <p className="text-sm text-gray-500 mt-1">Your monthly salary breakdown</p>
        </div>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm max-w-xs"
        />
      </div>

      {!data ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center text-gray-500">
          <p>No salary information available for this month.</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Base Salary</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(data.baseSalary)}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Daily Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(data.dailyRate)}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Deductions</p>
              <h3 className="text-2xl font-bold text-red-600 mt-2">-{formatCurrency(data.deductions)}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-brand-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Net Salary</p>
              <h3 className="text-2xl font-bold text-brand-600 mt-2">{formatCurrency(data.grossSalary)}</h3>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Salary Breakdown for {month}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Pro-rated salary based on attendance (weekdays Mon-Fri)
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Employee</td>
                    <td className="px-6 py-4 text-gray-600">{data.employee.name}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Position</td>
                    <td className="px-6 py-4 text-gray-600">{data.employee.position} {data.employee.department ? `• ${data.employee.department}` : ""}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Working Days</td>
                    <td className="px-6 py-4 text-gray-600">{data.workingDays}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Days Present</td>
                    <td className="px-6 py-4 text-gray-600">{data.presentDays}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Approved Leave Days</td>
                    <td className="px-6 py-4 text-gray-600">{data.approvedLeaveDays}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Total Paid Days</td>
                    <td className="px-6 py-4 text-gray-600">{data.totalDays} / {data.workingDays}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Base Salary</td>
                    <td className="px-6 py-4 text-gray-600">{formatCurrency(data.baseSalary)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Daily Rate</td>
                    <td className="px-6 py-4 text-gray-600">{formatCurrency(data.dailyRate)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Deductions</td>
                    <td className="px-6 py-4 text-red-600">-{formatCurrency(data.deductions)}</td>
                  </tr>
                  <tr className="bg-brand-50">
                    <td className="px-6 py-4 font-bold text-gray-900">Net Salary</td>
                    <td className="px-6 py-4 font-bold text-brand-600">{formatCurrency(data.grossSalary)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
