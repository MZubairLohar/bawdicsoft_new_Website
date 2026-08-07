"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { hasRole, SALARY_ROLES } from '@/lib/roles';

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

  const canViewSalary = role ? hasRole(role, SALARY_ROLES) : false;

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

  const handleDelete = async (employee: Employee) => {
    const confirmDelete = confirm(`Are you sure you want to remove "${employee.name}" from the team?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/employees/${employee._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        alert("Employee removed successfully!");
        setEmployees(employees.filter(e => e._id !== employee._id));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete employee");
    }
  };

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
    Active: "bg-green-100 text-green-700",
    "On Leave": "bg-amber-100 text-amber-700",
    Inactive: "bg-gray-100 text-gray-600",
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const stats = [
    { label: "Total Employees", value: totalEmployees, color: "bg-blue-50 text-blue-600" },
    { label: "Active", value: activeCount, color: "bg-green-50 text-green-600" },
    { label: "On Leave", value: onLeaveCount, color: "bg-amber-50 text-amber-600" },
    { label: "Inactive", value: inactiveCount, color: "bg-gray-100 text-gray-600" },
  ];

return (
    <div className="space-y-6">
      {/* Sub-nav */}
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/employees" className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white">
          Employees
        </Link>
        <Link href="/admin/employees/attendance" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Attendance
        </Link>
        {canViewSalary && (
          <Link href="/admin/employees/salary" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
            Salary
          </Link>
        )}
        <Link href="/admin/employees/leaves" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
          Leaves
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.color}`}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-gray-500">Manage your team members and their details.</p>
        <Link
          href="/admin/employees/new"
          className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>+</span> Add New Employee
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, position, or department..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm"
        />
        <div className="flex gap-2">
          {["All", "Active", "On Leave", "Inactive"].map((filterName) => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterName
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Employee</th>
              <th className="px-6 py-3 font-medium">Position</th>
              <th className="px-6 py-3 font-medium">Department</th>
              <th className="px-6 py-3 font-medium">Salary</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  {employees.length === 0
                    ? "No employees yet. Add your first team member to get started."
                    : "No employees match your search."}
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm shrink-0">
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-gray-500 text-xs">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{emp.position}</td>
                  <td className="px-6 py-4 text-gray-600">{emp.department || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{formatSalary(emp.salary)}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(emp.dateOfJoining)}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[emp.status]}`}>
                        {emp.status}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                        emp.userId ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {emp.userId ? "Login ✓" : "No login"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      href={`/admin/employees/${emp._id}`}
                      className="text-brand-600 hover:text-brand-800 font-medium"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/employees/${emp._id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(emp)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
