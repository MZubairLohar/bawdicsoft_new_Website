"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasRole, SALARY_ROLES } from '@/lib/roles';
import { BriefcaseBusiness, CalendarClock, Clock3, Landmark, PlaneTakeoff } from "lucide-react";
import type { ReactNode } from "react";

interface EmployeeTabsProps {
  activeTab: 'employees' | 'attendance' | 'checkin' | 'salary' | 'leaves';
  role?: string | null;
}

export default function EmployeeTabs({ activeTab, role }: EmployeeTabsProps) {
  const pathname = usePathname();
  const canViewSalary = role ? hasRole(role, SALARY_ROLES) : false;

  const tabIcon: Record<EmployeeTabsProps['activeTab'], ReactNode> = {
    employees: <BriefcaseBusiness className="h-3.5 w-3.5" />,
    attendance: <CalendarClock className="h-3.5 w-3.5" />,
    checkin: <Clock3 className="h-3.5 w-3.5" />,
    salary: <Landmark className="h-3.5 w-3.5" />,
    leaves: <PlaneTakeoff className="h-3.5 w-3.5" />,
  };

  const tabs: { key: EmployeeTabsProps['activeTab']; name: string; href: string }[] = [
    { key: 'employees', name: 'Employees', href: '/admin/employees' },
    { key: 'attendance', name: 'Attendance', href: '/admin/employees/attendance' },
    { key: 'checkin', name: 'Check In Out', href: '/admin/employees/attendance/checkin' },
  ];

  if (canViewSalary) {
    tabs.push({ key: 'salary', name: 'Salary', href: '/admin/employees/salary' });
  }
  tabs.push({ key: 'leaves', name: 'Leaves', href: '/admin/employees/leaves' });

  return (
    <nav className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/75 p-2.5 shadow-xl shadow-sky-200/60 backdrop-blur">
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-300/35 blur-2xl" />
      <div className="pointer-events-none absolute -left-6 bottom-0 h-16 w-16 rounded-full bg-violet-200/35 blur-2xl" />
      <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key || pathname === tab.href;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`group relative inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30"
                : "border border-white/70 bg-white/90 text-slate-600 shadow-sm hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 hover:shadow-md"
            }`}
          >
            <span className={`${isActive ? "text-white" : "text-sky-500 group-hover:text-indigo-600"} transition-colors`}>
              {tabIcon[tab.key]}
            </span>
            {tab.name}
          </Link>
        );
      })}
      </div>
    </nav>
  );
}
