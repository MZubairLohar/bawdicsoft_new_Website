"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, CalendarCheck, CalendarDays, Wallet, LogOut } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (!data.success) {
          router.push('/auth/login');
          return;
        }

        // If user is admin, redirect to admin portal
        if (data.data.role === 'admin') {
          router.push('/admin');
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
      setUser(null);
      router.push('/auth/login');
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!user && !loading) {
    return null;
  }

const navLinks = [
    { name: "Dashboard", href: "/employee", icon: LayoutDashboard },
    { name: "Attendance", href: "/employee/attendance", icon: CalendarCheck },
    { name: "Leave Applications", href: "/employee/leaves", icon: CalendarDays },
    { name: "My Salary", href: "/employee/salary", icon: Wallet },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] text-white flex flex-col fixed h-full justify-between">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-tight">
            Bawdic<span className="text-brand-500">Soft</span> Portal
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
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border border-transparent hover:border-red-700/50"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
{pathname === "/employee" && "Employee Dashboard"}
              {pathname === "/employee/attendance" && "My Attendance"}
              {pathname === "/employee/leaves" && "Leave Applications"}
              {pathname === "/employee/salary" && "My Salary"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name || 'Employee'}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'E'}
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
