"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Folder, Users, Settings } from 'lucide-react';

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Projects", href: "/admin/projects", icon: Folder },
  { name: "CRM / Leads", href: "/admin/crm", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0a0a0a] text-white flex flex-col fixed h-full">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-tight">
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
    </aside>
  );
}