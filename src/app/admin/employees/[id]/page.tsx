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
    return `Rs ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(salary)}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Not specified";
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const statusColor: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    "On Leave": "bg-amber-100 text-amber-700",
    Inactive: "bg-gray-100 text-gray-600",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg font-medium mb-4">Employee not found.</p>
        <Link href="/admin/employees" className="text-brand-600 hover:text-brand-700 font-medium">
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
    { label: "System Role", value: employee.role ? employee.role.charAt(0).toUpperCase() + employee.role.slice(1) : "Employee" },
    { label: "Login Account", value: employee.userId ? "Created ✓" : "Not created" },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin/employees" className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Back to Employees
        </Link>
        <div className="flex gap-3">
          <Link
            href={`/admin/employees/${employee._id}/edit`}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Edit Employee
          </Link>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 h-24"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-10 gap-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow flex items-center justify-center text-brand-600 text-3xl font-bold">
                {employee.name.charAt(0).toUpperCase()}
              </div>
              <div className="pb-1">
                <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-gray-500">{employee.position}</p>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full self-end sm:self-auto ${statusColor[employee.status]}`}>
              {employee.status}
            </span>
          </div>
        </div>
      </div>

      {/* Contact & Employment Details */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {details.map((detail, idx) => (
            <div key={idx}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                {detail.label}
              </p>
              <p className="text-gray-900 font-medium break-words">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {employee.notes || "No additional notes for this employee."}
          </p>
        </div>
      </div>
    </div>
  );
}
