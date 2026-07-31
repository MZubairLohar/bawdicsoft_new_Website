"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Clear auth cookies/tokens here later
    router.push("/auth/login");
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Projects", href: "/admin/projects", icon: "📁" },
    { name: "CRM / Leads", href: "/admin/crm", icon: "👥" },
    { name: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
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
                <span>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {pathname === "/admin" && "Dashboard Overview"}
              {pathname === "/admin/projects" && "Project Management"}
              {pathname === "/admin/crm" && "CRM & Lead Management"}
              {pathname === "/admin/settings" && "Admin Settings"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
              A
            </div>
          </div>
        </header>
        
        {children}
      </main>
    </div>
  );
}