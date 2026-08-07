"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BarChart3, Folder, Users, Settings, LogOut, Briefcase, Crown } from 'lucide-react';
import { hasRole, EMPLOYEE_MGMT_ROLES, SETTINGS_ROLES } from '@/lib/roles';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.success) {
          setRole(data.data.role);
        }
      } catch (e) {
        console.error('Failed to fetch session:', e);
      }
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/auth/login");
        router.refresh();
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Projects", href: "/admin/projects", icon: Folder },
    { name: "CRM / Leads", href: "/admin/crm", icon: Users },
  ];

  // Employee Management: super_admin, admin, manager
  if (role && hasRole(role, EMPLOYEE_MGMT_ROLES)) {
    navLinks.push({ name: "Employee Management", href: "/admin/employees", icon: Briefcase });
  }

  // Settings: super_admin, admin
  if (role && hasRole(role, SETTINGS_ROLES)) {
    navLinks.push({ name: "Settings", href: "/admin/settings", icon: Settings });
  }

  return (
    <aside className="w-64 bg-[#0a0a0a] text-white flex flex-col fixed h-full">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          {role === 'super_admin' && <Crown className="h-5 w-5 text-yellow-400" />}
          Bawdic<span className="text-brand-500">Soft</span> Admin
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border border-transparent hover:border-red-700/50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
