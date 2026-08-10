"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, Folder, Users, Settings, LogOut, Briefcase, Crown } from 'lucide-react';
import { hasRole, EMPLOYEE_MGMT_ROLES, SETTINGS_ROLES } from '@/lib/roles';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

// Map of role -> display label and badge styling
const roleBadgeStyles: Record<string, { label: string; className: string }> = {
  super_admin: { label: "Super Admin", className: "bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 text-amber-900 border border-amber-300/80 ring-1 ring-amber-200/80 shadow-[0_8px_22px_-12px_rgba(217,119,6,0.85)]" },
  admin: { label: "Admin", className: "bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-900 border border-violet-300/80 ring-1 ring-violet-200/80 shadow-[0_8px_22px_-12px_rgba(124,58,237,0.8)]" },
  manager: { label: "Manager", className: "bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-900 border border-sky-300/80 ring-1 ring-sky-200/80 shadow-[0_8px_22px_-12px_rgba(3,105,161,0.8)]" },
  rep: { label: "Representative", className: "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-900 border border-emerald-300/80 ring-1 ring-emerald-200/80 shadow-[0_8px_22px_-12px_rgba(5,150,105,0.8)]" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session on mount
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (!data.success) {
          // Redirect to login if not authenticated
          router.push('/auth/login');
          return;
        }

        // If user is a plain employee (user role), redirect to employee portal
        if (data.data.role === 'user') {
          router.push('/employee');
          return;
        }

        setUser(data.data);
      } catch (error) {
        console.error('Session check failed:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear any local state and redirect to login
      setUser(null);
      router.push('/auth/login');
      router.refresh();
    }
  };

  // Show loading state while checking session
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  // Don't render anything if still loading or redirecting
  if (!user && !loading) {
    return null;
  }

  // Build nav links based on role hierarchy
  const role = user?.role || '';
  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Portfolio", href: "/admin/projects", icon: Folder },
    { name: "Leads", href: "/admin/crm", icon: Users },
  ];

  // Employee Management: super_admin, admin, manager
  if (hasRole(role, EMPLOYEE_MGMT_ROLES)) {
    navLinks.push({ name: "Employee Management", href: "/admin/employees", icon: Briefcase });
  }

  // Settings: super_admin, admin
  if (hasRole(role, SETTINGS_ROLES)) {
    navLinks.push({ name: "Settings", href: "/admin/settings", icon: Settings });
  }

  const roleBadge = roleBadgeStyles[role] || {
    label: role,
    className: "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-300/80 ring-1 ring-slate-200/80 shadow-[0_8px_22px_-14px_rgba(51,65,85,0.55)]",
  };

return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-indigo-50/50">
      {/* Ambient background accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-300/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-indigo-300/20 blur-3xl animate-float" />
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] text-white flex flex-col fixed h-full justify-between z-10">
        <div className="p-6 border-b border-gray-800 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-500/10 blur-2xl" />
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2 relative">
            {role === 'super_admin' && <Crown className="h-5 w-5 text-yellow-400" />}
            Bawdic<span className="text-brand-400">Soft</span> Admin
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-900/40"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white hover:translate-x-1"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-white/80 rounded-r" />
                )}
                <link.icon className={`h-5 w-5 ${!isActive && "group-hover:text-brand-400"} transition-colors`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 border border-transparent hover:border-red-700/50 hover:translate-x-1"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 md:p-8 relative">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              {pathname === "/admin" && "Dashboard Overview"}
              {pathname === "/admin/projects" && "Portfolio"}
              {pathname === "/admin/crm" && "Lead Management"}
              {pathname === "/admin/employees" && "Employee Management"}
              {pathname === "/admin/settings" && "Admin Settings"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back, <span className="font-semibold text-gray-700">{user?.name || 'Admin'}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-4 py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] rounded-full backdrop-blur ${roleBadge.className}`}>
              {roleBadge.label}
            </span>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={`${user?.name || 'User'} avatar`}
                className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-white"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-indigo-500 text-white flex items-center justify-center font-bold shadow-md ring-2 ring-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
            )}
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}


