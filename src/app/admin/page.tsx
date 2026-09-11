"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FolderKanban,
  Users,
  ClipboardCheck,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  FolderPlus,
  Settings,
  Mail,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  Globe,
  Zap,
  Building2,
  ExternalLink,
  MapPin,
  BarChart3,
  Eye,
  MousePointerClick,
} from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  email: string;
  source: string;
  status: "New" | "Contacted" | "Closed";
  createdAt: string;
}

interface Project {
  _id: string;
  projectName: string;
}

interface SourceDistribution {
  name: string;
  count: number;
  percentage: number;
}

interface Company {
  _id: string;
  count: number;
  pages: string[];
  lastVisit: string;
  locations: string[];
  sessions: string[];
  totalVisits: number;
}

const barGradients = [
  "from-sky-500 to-blue-600",
  "from-cyan-500 to-sky-600",
  "from-blue-500 to-indigo-600",
  "from-teal-500 to-cyan-600",
  "from-indigo-500 to-blue-700",
  "from-sky-400 to-cyan-500",
];

const statusStyles: Record<string, string> = {
  New: "bg-sky-50 text-sky-700 ring-sky-200",
  Contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  Closed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalLeads: 0,
    pendingReviews: 0,
  });
  const [sourceDistribution, setSourceDistribution] = useState<SourceDistribution[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [analytics, setAnalytics] = useState<{
    siteVisits: {
      thisMonth: number;
      prevMonth: number;
      total: number;
      monthlyBreakdown: { month: string; opens: number }[];
      topLocations: { city: string; country: string; count: number }[];
    };
    interactions: { thisMonth: number; prevMonth: number; total: number };
  } | null>(null);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [addingCompany, setAddingCompany] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    async function fetchDashboardData() {
      try {
        const [projectsRes, leadsRes] = await Promise.all([
          fetch("/api/admin/projects", { credentials: "include" }),
          fetch("/api/admin/leads", { credentials: "include" }),
        ]);

        const projectsData = projectsRes.ok ? await projectsRes.json() : { success: false };
        const leadsData = leadsRes.ok ? await leadsRes.json() : { success: false };

        const analyticsRes = await fetch("/api/admin/analytics", { credentials: "include" });
        const analyticsData = analyticsRes.ok ? await analyticsRes.json() : { success: false };
        if (analyticsData.success) {
          setAnalytics(analyticsData.data);
        }

        const companiesRes = await fetch("/api/track", { credentials: "include" });
        const companiesData = companiesRes.ok ? await companiesRes.json() : { success: false };
        if (companiesData.success) {
          setCompanies(companiesData.data);
        }
        setLoadingCompanies(false);

        if (leadsData.success) {
          const leads: Lead[] = leadsData.data;
          const projectsCount = projectsData.success ? projectsData.data.length : 0;
          const pendingCount = leads.filter((lead) => lead.status === "New").length;

          setStats({
            totalProjects: projectsCount,
            totalLeads: leads.length,
            pendingReviews: pendingCount,
          });

          const sourceCounts: Record<string, number> = {};
          leads.forEach((lead) => {
            const source = lead.source || "Unknown";
            sourceCounts[source] = (sourceCounts[source] || 0) + 1;
          });

          const totalLeadsCount = leads.length;
          const distribution: SourceDistribution[] = Object.entries(sourceCounts)
            .map(([name, count]) => ({
              name,
              count,
              percentage:
                totalLeadsCount > 0 ? Math.round((count / totalLeadsCount) * 100) : 0,
            }))
            .sort((a, b) => b.count - a.count);

          setSourceDistribution(distribution);
          setRecentLeads(leads.slice(0, 5));
        } else {
          setStats({ totalProjects: 0, totalLeads: 0, pendingReviews: 0 });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "1d ago";
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleAddToCRM = async (companyName: string) => {
    setAddingCompany(companyName);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: companyName,
          email: "no-email@companytracker.local",
          source: "Company Tracker",
          message: `Auto-captured from Company Tracker.`,
        }),
      });
      if (res.ok) {
        alert(`✅ ${companyName} added to CRM!`);
        const refreshRes = await fetch("/api/track", { credentials: "include" });
        const refreshData = refreshRes.ok ? await refreshRes.json() : { success: false };
        if (refreshData.success) setCompanies(refreshData.data);
      } else {
        alert("❌ Failed to add lead.");
      }
    } catch (error) {
      alert("Server error.");
    } finally {
      setAddingCompany(null);
    }
  };

  const statCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      change: "Active projects",
      gradient: "from-sky-500 to-blue-600",
      bg: "bg-sky-50",
      textColor: "text-sky-600",
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      label: "Total Leads",
      value: stats.totalLeads,
      change: "All time",
      gradient: "from-cyan-500 to-sky-600",
      bg: "bg-cyan-50",
      textColor: "text-cyan-600",
      icon: Users,
      href: "/admin/crm",
    },
    {
      label: "Pending Reviews",
      value: stats.pendingReviews,
      change: stats.pendingReviews > 0 ? "Needs attention" : "All caught up",
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      textColor: "text-blue-600",
      icon: ClipboardCheck,
      href: "/admin/crm",
    },
    {
      label: "Companies Tracked",
      value: companies.length,
      change: "Last 7 days",
      gradient: "from-indigo-500 to-blue-600",
      bg: "bg-indigo-50",
      textColor: "text-indigo-600",
      icon: Building2,
      href: "#companies",
    },
  ];

  const quickActions = [
    {
      label: "Add Project",
      href: "/admin/projects/new",
      icon: FolderPlus,
      gradient: "from-sky-500 to-blue-600",
    },
    {
      label: "Add Lead",
      href: "/admin/crm",
      icon: UserPlus,
      gradient: "from-cyan-500 to-sky-600",
    },
    {
      label: "Employees",
      href: "/admin/employees",
      icon: Users,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      gradient: "from-indigo-500 to-sky-600",
    },
  ];

  const monthlyVisits = analytics?.siteVisits.monthlyBreakdown ?? [];
  const monthlyMax = Math.max(...monthlyVisits.map((m) => m.opens), 1);
  const monthlyTotal = monthlyVisits.reduce((sum, item) => sum + item.opens, 0);

  const chartWidth = 560;
  const chartHeight = 180;
  const padX = 24;
  const padY = 18;
  const drawableHeight = chartHeight - padY * 2;
  const chartPoints = monthlyVisits.map((item, idx) => {
    const x =
      monthlyVisits.length === 1
        ? chartWidth / 2
        : padX + (idx * (chartWidth - padX * 2)) / (monthlyVisits.length - 1);
    const y = chartHeight - padY - (item.opens / monthlyMax) * drawableHeight;
    return { ...item, x, y };
  });
  const linePath = chartPoints
    .map((point, idx) => `${idx === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath =
    chartPoints.length > 0
      ? `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - padY} L ${chartPoints[0].x} ${chartHeight - padY} Z`
      : "";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-sky-100 border-t-sky-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* ===== Hero Banner ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-white p-6 md:p-10 shadow-xl"
      >
        <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute top-8 right-1/4 w-24 h-24 rounded-full border-2 border-white/10" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 text-xs font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Command Center
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Welcome to your Dashboard
            </h1>
            <p className="text-white/70 text-sm md:text-base mt-2 max-w-xl">
              Monitor performance, leads, and projects at a glance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/crm"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-sky-800 font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Mail className="h-4 w-4" /> View Leads
            </Link>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-all"
            >
              <FolderPlus className="h-4 w-4" /> New Project
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={stat.href}
                className="block relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
              >
                {/* Accent gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-sky-500 transition-colors" />
                </div>

                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-2">{stat.change}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ===== Quick Actions ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Link
              key={idx}
              href={action.href}
              className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md hover:border-sky-200 transition-all duration-300"
            >
              <div
                className={`p-2.5 rounded-lg bg-gradient-to-br ${action.gradient} text-white shadow-sm group-hover:scale-110 transition-transform`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-sky-700">
                {action.label}
              </span>
            </Link>
          );
        })}
      </motion.div>

      {/* ===== Analytics Stat Cards ===== */}
      {analytics && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Site Opens",
                value: analytics.siteVisits.thisMonth,
                change: "This month",
                gradient: "from-sky-500 to-blue-600",
                icon: Globe,
              },
              {
                label: "Last Month",
                value: analytics.siteVisits.prevMonth,
                change: `${analytics.siteVisits.total} total opens`,
                gradient: "from-cyan-500 to-sky-600",
                icon: BarChart3,
              },
              {
                label: "Interactions",
                value: analytics.interactions.thisMonth,
                change: "This month",
                gradient: "from-blue-500 to-indigo-600",
                icon: MousePointerClick,
              },
              {
                label: "Open Rate",
                value:
                  analytics.siteVisits.total > 0
                    ? Math.min(
                        100,
                        Math.round(
                          (analytics.interactions.total / analytics.siteVisits.total) * 100
                        )
                      ) + "%"
                    : "0%",
                change: "Engagement health",
                gradient: "from-indigo-500 to-blue-700",
                icon: TrendingUp,
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.06, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
                    />
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-sm group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{stat.change}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ===== Growth Chart ===== */}
          {monthlyVisits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-sky-600" />
                    Growth Overview
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Site opens over the last 6 months
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-100">
                  This month: {analytics.siteVisits.thisMonth}
                </span>
              </div>

              <div className="relative h-64 rounded-xl border border-sky-100 bg-sky-50/30 p-3">
                <div className="pointer-events-none absolute inset-x-3 top-3 bottom-10 flex flex-col justify-between">
                  {[100, 75, 50, 25, 0].map((level) => (
                    <div key={level} className="flex items-center gap-2">
                      <span className="w-8 text-right text-[10px] font-semibold text-slate-400">
                        {Math.round((monthlyMax * level) / 100)}
                      </span>
                      <span className="h-px flex-1 bg-slate-200/70" />
                    </div>
                  ))}
                </div>

                <div className="relative h-full pl-10 pr-1 pb-8">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight + 24}`}
                    className="h-full w-full overflow-visible"
                  >
                    <defs>
                      <linearGradient
                        id="growthLineGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="50%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient
                        id="growthAreaGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {areaPath && <path d={areaPath} fill="url(#growthAreaGradient)" />}
                    {linePath && (
                      <path
                        d={linePath}
                        fill="none"
                        stroke="url(#growthLineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {chartPoints.map((point, idx) => (
                      <g key={idx}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="5"
                          fill="white"
                          stroke="#0284c7"
                          strokeWidth="2.5"
                        />
                        <circle cx={point.x} cy={point.y} r="2" fill="#0ea5e9" />
                        <text
                          x={point.x}
                          y={Math.max(12, point.y - 12)}
                          textAnchor="middle"
                          className="fill-slate-700 text-[10px] font-bold"
                        >
                          {point.opens}
                        </text>
                      </g>
                    ))}

                    {chartPoints.map((point, idx) => (
                      <text
                        key={`month-${idx}`}
                        x={point.x}
                        y={chartHeight + 16}
                        textAnchor="middle"
                        className="fill-slate-500 text-[11px] font-medium"
                      >
                        {point.month}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ===== Main Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Sources */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-5 md:p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-600" /> Lead Sources
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Distribution of leads by source channel
            </p>
          </div>
          <div className="p-5 md:p-6">
            {sourceDistribution.length > 0 ? (
              <div className="space-y-5">
                {sourceDistribution.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
                      <span className="font-semibold text-gray-800 flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${
                            barGradients[index % barGradients.length]
                          }`}
                        />
                        {source.name}
                      </span>
                      <span className="text-gray-500 text-xs font-medium">
                        {source.count} leads · {source.percentage}%
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${source.percentage}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.3 + index * 0.1,
                          ease: "easeOut",
                        }}
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          barGradients[index % barGradients.length]
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Globe className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                <p className="text-sm">No lead source data available yet.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-sky-600" /> Overview
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50 border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-100 text-sky-600">
                  <FolderKanban className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">Projects</p>
                  <p className="text-lg font-bold text-gray-900">
                    {stats.totalProjects}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-sky-600 bg-sky-100 px-2 py-1 rounded-full uppercase">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-50 border border-cyan-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Leads</p>
                  <p className="text-lg font-bold text-gray-900">
                    {stats.totalLeads}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-cyan-600 bg-cyan-100 px-2 py-1 rounded-full uppercase">
                All time
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">Pending</p>
                  <p className="text-lg font-bold text-gray-900">
                    {stats.pendingReviews}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full uppercase">
                Review
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-sky-600" /> Engagement
                </span>
                <span className="text-xs font-bold text-sky-600">Good</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== Recent Leads ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Recent Leads
            </h3>
            <p className="text-sm text-gray-500 mt-1">Latest lead entries</p>
          </div>
          <Link
            href="/admin/crm"
            className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group"
          >
            View All
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Users className="h-12 w-12 mx-auto text-gray-200 mb-4" />
            <p className="text-sm">
              No leads yet. They&apos;ll appear here when visitors contact you!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence initial={false}>
                  {recentLeads.map((lead, index) => (
                    <motion.tr
                      key={lead._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-sky-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate max-w-[180px]">
                              {lead.name}
                            </p>
                            <p className="text-gray-500 text-xs truncate max-w-[180px]">
                              {lead.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                          {lead.source || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ring-1 ${
                            statusStyles[lead.status] ||
                            "bg-gray-50 text-gray-700 ring-gray-200"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* ===== Company Tracker ===== */}
      <div
        id="companies"
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-sky-600" />
              Live Company Tracker
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Companies visiting BawdicSoft (last 7 days)
            </p>
          </div>
          <span className="text-xs bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full font-semibold border border-sky-100">
            {companies.length} Companies
          </span>
        </div>

        {loadingCompanies ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            Loading companies...
          </div>
        ) : companies.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-200" />
            <p className="text-sm font-medium">No companies detected yet.</p>
            <p className="text-xs mt-1">
              Visit the main website a few times to generate data.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-center">
                    Visits
                  </th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                    Pages
                  </th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">
                    Last Seen
                  </th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {companies.map((comp) => (
                  <tr
                    key={comp._id}
                    className="hover:bg-sky-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {comp._id}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-100">
                        {comp.totalVisits || comp.count}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {comp.pages?.slice(0, 2).map((p, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600 truncate max-w-[100px]"
                          >
                            {p.replace(/^https?:\/\/[^\/]+/, "") || p}
                          </span>
                        ))}
                        {comp.pages?.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{comp.pages.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600">
                      <MapPin className="h-3 w-3 inline mr-1 text-gray-400" />
                      {comp.locations?.[0] || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(comp.lastVisit).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(
                            comp._id
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 text-xs font-semibold border border-sky-100 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" /> Find
                        </a>
                        <button
                          onClick={() => handleAddToCRM(comp._id)}
                          disabled={addingCompany === comp._id}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-xs font-semibold border border-emerald-100 disabled:opacity-50 transition-colors"
                        >
                          {addingCompany === comp._id ? (
                            "⏳"
                          ) : (
                            <>
                              <UserPlus className="h-3 w-3" /> Generate
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="p-3 bg-gray-50/50 text-xs text-gray-500 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-2">
          <span>
            💡 Click <strong className="text-gray-700">Find</strong> for LinkedIn ·{" "}
            <strong className="text-gray-700">Generate</strong> to add as lead
          </span>
          <span>
            Leads in CRM:{" "}
            <strong className="text-sky-700">{stats.totalLeads}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import {
//   FolderKanban,
//   Users,
//   ClipboardCheck,
//   Sparkles,
//   ArrowUpRight,
//   ArrowDownRight,
//   UserPlus,
//   FolderPlus,
//   Settings,
//   Mail,
//   TrendingUp,
//   Activity,
//   CheckCircle2,
//   Clock,
//   Globe,
//   Zap,
//   Building2,
//   ExternalLink,
//   MapPin,
// } from "lucide-react";

// interface Lead {
//   _id: string;
//   name: string;
//   email: string;
//   source: string;
//   status: "New" | "Contacted" | "Closed";
//   createdAt: string;
// }

// interface Project {
//   _id: string;
//   projectName: string;
// }

// interface SourceDistribution {
//   name: string;
//   count: number;
//   percentage: number;
// }

// interface Company {
//   _id: string;
//   count: number;
//   pages: string[];
//   lastVisit: string;
//   locations: string[];
//   sessions: string[];
//   totalVisits: number;
// }

// // Themed gradient variants for source bars
// const barGradients = [
//   "from-sky-500 to-blue-600",
//   "from-emerald-500 to-teal-600",
//   "from-violet-500 to-purple-600",
//   "from-amber-500 to-orange-600",
//   "from-rose-500 to-pink-600",
//   "from-cyan-500 to-sky-600",
// ];

// const statusStyles: Record<string, string> = {
//   New: "bg-sky-100 text-sky-700 ring-sky-200",
//   Contacted: "bg-amber-100 text-amber-700 ring-amber-200",
//   Closed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
// };

// export default function AdminDashboard() {
//   // ===== Existing States =====
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalProjects: 0,
//     totalLeads: 0,
//     pendingReviews: 0,
//   });
//   const [sourceDistribution, setSourceDistribution] = useState<SourceDistribution[]>([]);
//   const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
//   const [isClient, setIsClient] = useState(false);
//   const [analytics, setAnalytics] = useState<{
//     siteVisits: {
//       thisMonth: number;
//       prevMonth: number;
//       total: number;
//       monthlyBreakdown: { month: string; opens: number }[];
//       topLocations: { city: string; country: string; count: number }[];
//     };
//     interactions: { thisMonth: number; prevMonth: number; total: number };
//   } | null>(null);

//   // ===== NEW States for Company Tracker =====
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [loadingCompanies, setLoadingCompanies] = useState(true);
//   const [addingCompany, setAddingCompany] = useState<string | null>(null);

//   // ===== Fetch Dashboard Data =====
//   useEffect(() => {
//     setIsClient(true);
//     async function fetchDashboardData() {
//       try {
//         // Fetch projects and leads
//         const [projectsRes, leadsRes] = await Promise.all([
//           fetch("/api/admin/projects"),
//           fetch("/api/admin/leads"),
//         ]);

//         const projectsData = await projectsRes.json();
//         const leadsData = await leadsRes.json();

//         console.log("🔍 Dashboard Leads API Response:", leadsData);

//         // Fetch analytics
//         const analyticsRes = await fetch("/api/admin/analytics");
//         const analyticsData = await analyticsRes.json();
//         if (analyticsData.success) {
//           setAnalytics(analyticsData.data);
//         }

//         // Fetch companies (for tracker)
//        const companiesRes = await fetch("/api/track");
//         const companiesData = await companiesRes.json();
//         if (companiesData.success) {
//           setCompanies(companiesData.data);
//         }
//         setLoadingCompanies(false);

//         // if (projectsData.success && leadsData.success) {
//         //   const projects: Project[] = projectsData.data;
//         //   const leads: Lead[] = leadsData.data;

//         //   const pendingCount = leads.filter((lead) => lead.status === "New").length;

//         //   setStats({
//         //     totalProjects: projects.length,
//         //     totalLeads: leads.length,
//         //     pendingReviews: pendingCount,
//         //   });

//         //   // Source distribution
//         //   const sourceCounts: Record<string, number> = {};
//         //   leads.forEach((lead) => {
//         //     const source = lead.source || "Unknown";
//         //     sourceCounts[source] = (sourceCounts[source] || 0) + 1;
//         //   });

//         //   const totalLeadsCount = leads.length;
//         //   const distribution: SourceDistribution[] = Object.entries(sourceCounts)
//         //     .map(([name, count]) => ({
//         //       name,
//         //       count,
//         //       percentage:
//         //         totalLeadsCount > 0 ? Math.round((count / totalLeadsCount) * 100) : 0,
//         //     }))
//         //     .sort((a, b) => b.count - a.count);

//         //   setSourceDistribution(distribution);
//         //   setRecentLeads(leads.slice(0, 4));
//         // }
// // 🔥 Sirf Leads ki success par stats set karo (Projects ki parwah mat karo)
// if (leadsData.success) {
//   const leads: Lead[] = leadsData.data;

//   // Projects count (agar projectsData success hai toh le lo, warna 0)
//   const projectsCount = projectsData.success ? projectsData.data.length : 0;

//   // Pending reviews (New status wale leads)
//   const pendingCount = leads.filter((lead) => lead.status === "New").length;

//   setStats({
//     totalProjects: projectsCount,
//     totalLeads: leads.length,
//     pendingReviews: pendingCount,
//   });

//   // Source distribution (leads se hi calculate karo)
//   const sourceCounts: Record<string, number> = {};
//   leads.forEach((lead) => {
//     const source = lead.source || "Unknown";
//     sourceCounts[source] = (sourceCounts[source] || 0) + 1;
//   });

//   const totalLeadsCount = leads.length;
//   const distribution: SourceDistribution[] = Object.entries(sourceCounts)
//     .map(([name, count]) => ({
//       name,
//       count,
//       percentage:
//         totalLeadsCount > 0 ? Math.round((count / totalLeadsCount) * 100) : 0,
//     }))
//     .sort((a, b) => b.count - a.count);

//   setSourceDistribution(distribution);
//   setRecentLeads(leads.slice(0, 4));
// } else {
//   // Agar leads API fail ho, toh stats 0 set karo
//   setStats({
//     totalProjects: 0,
//     totalLeads: 0,
//     pendingReviews: 0,
//   });
// }

//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDashboardData();
//   }, []);

//   // ===== Helper: format date =====
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = Math.floor(
//       (now.getTime() - date.getTime()) / (1000 * 60 * 60)
//     );

//     if (diffInHours < 1) return "Just now";
//     if (diffInHours < 24) return `${diffInHours} hours ago`;
//     if (diffInHours < 48) return "1 day ago";
//     return `${Math.floor(diffInHours / 24)} days ago`;
//   };

//   // ===== Handler: Add company to CRM =====
//   const handleAddToCRM = async (companyName: string) => {
//     setAddingCompany(companyName);
//     try {
//       const res = await fetch('/api/admin/leads', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: companyName,
//           source: 'Company Tracker',
//           message: `Auto-captured from Company Tracker.`,
//         }),
//       });
//       if (res.ok) {
//         alert(`✅ ${companyName} added to CRM!`);
//         // Refresh company list (optional)
//         const refreshRes = await fetch("/api/admin/companies");
//         const refreshData = await refreshRes.json();
//         if (refreshData.success) setCompanies(refreshData.data);
//       } else {
//         alert('❌ Failed to add lead.');
//       }
//     } catch (error) {
//       alert('Server error.');
//     } finally {
//       setAddingCompany(null);
//     }
//   };

//   // ===== Static data for stats cards =====
//   const dynamicStats = [
//     {
//       label: "Total Projects",
//       value: stats.totalProjects.toString(),
//       change: "Active in database",
//       gradient: "from-sky-500 via-blue-600 to-indigo-700",
//       glow: "bg-sky-400",
//       icon: <FolderKanban className="h-5 w-5" />,
//       iconBg: "bg-white/20",
//       trend: "+12%",
//       trendUp: true,
//     },
//     {
//       label: "Total Leads",
//       value: stats.totalLeads.toString(),
//       change: "All time",
//       gradient: "from-emerald-500 via-green-600 to-teal-700",
//       glow: "bg-emerald-400",
//       icon: <Users className="h-5 w-5" />,
//       iconBg: "bg-white/20",
//       trend: "+8%",
//       trendUp: true,
//     },
//     {
//       label: "Pending Reviews",
//       value: stats.pendingReviews.toString(),
//       change:
//         stats.pendingReviews > 0 ? "Needs attention" : "All caught up!",
//       gradient:
//         stats.pendingReviews > 0
//           ? "from-amber-500 via-orange-500 to-rose-600"
//           : "from-emerald-500 via-green-600 to-teal-700",
//       glow: stats.pendingReviews > 0 ? "bg-amber-400" : "bg-emerald-400",
//       icon: <ClipboardCheck className="h-5 w-5" />,
//       iconBg: "bg-white/20",
//       trend: stats.pendingReviews > 0 ? "View" : "0",
//       trendUp: stats.pendingReviews > 0,
//     },
//   ];

//   const quickActions = [
//     {
//       label: "Add Project",
//       href: "/admin/projects/new",
//       icon: <FolderPlus className="h-5 w-5" />,
//       gradient: "from-sky-500 to-blue-600",
//     },
//     {
//       label: "Add Lead",
//       href: "/admin/crm",
//       icon: <UserPlus className="h-5 w-5" />,
//       gradient: "from-emerald-500 to-teal-600",
//     },
//     {
//       label: "Manage Employees",
//       href: "/admin/employees",
//       icon: <Users className="h-5 w-5" />,
//       gradient: "from-violet-500 to-purple-600",
//     },
//     {
//       label: "Settings",
//       href: "/admin/settings",
//       icon: <Settings className="h-5 w-5" />,
//       gradient: "from-amber-500 to-orange-600",
//     },
//   ];

//   // ===== Analytics chart calculations =====
//   const monthlyVisits = analytics?.siteVisits.monthlyBreakdown ?? [];
//   const monthlyMax = Math.max(...monthlyVisits.map((m) => m.opens), 1);
//   const monthlyAverage = monthlyVisits.length
//     ? Math.round(monthlyVisits.reduce((sum, item) => sum + item.opens, 0) / monthlyVisits.length)
//     : 0;
//   const monthlyMin = monthlyVisits.length ? Math.min(...monthlyVisits.map((m) => m.opens)) : 0;
//   const monthlyTotal = monthlyVisits.reduce((sum, item) => sum + item.opens, 0);

//   const chartWidth = 560;
//   const chartHeight = 180;
//   const padX = 24;
//   const padY = 18;
//   const drawableHeight = chartHeight - padY * 2;
//   const chartPoints = monthlyVisits.map((item, idx) => {
//     const x =
//       monthlyVisits.length === 1
//         ? chartWidth / 2
//         : padX + (idx * (chartWidth - padX * 2)) / (monthlyVisits.length - 1);
//     const y = chartHeight - padY - (item.opens / monthlyMax) * drawableHeight;
//     return { ...item, x, y };
//   });
//   const linePath = chartPoints
//     .map((point, idx) => `${idx === 0 ? "M" : "L"} ${point.x} ${point.y}`)
//     .join(" ");
//   const areaPath =
//     chartPoints.length > 0
//       ? `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - padY} L ${chartPoints[0].x} ${chartHeight - padY} Z`
//       : "";

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="relative">
//           <div className="w-16 h-16 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
//           <div className="absolute inset-0 rounded-full blur-md bg-sky-400/20 animate-glow" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 p-4 md:p-6">
//       {/* ===== Hero / Greeting Banner ===== */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white p-6 md:p-10 animate-gradient shadow-2xl"
//       >
//         <div className="absolute -top-16 -right-10 w-52 h-52 rounded-full bg-white/10 blur-2xl animate-float" />
//         <div className="absolute -bottom-20 left-1/4 w-56 h-56 rounded-full bg-purple-400/20 blur-2xl animate-float-slow" />
//         <div className="absolute top-8 right-1/4 w-24 h-24 rounded-full border-2 border-white/20 animate-slow-spin" />

//         <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 text-xs font-semibold mb-4">
//               <Sparkles className="h-3.5 w-3.5" />
//               Command Center
//             </div>
//             <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
//               Welcome to your Dashboard
//               <span className="block text-white/85 text-base md:text-lg font-medium mt-2">
//                 Monitor performance, leads, and projects at a glance.
//               </span>
//             </h1>
//           </div>
//           <div className="flex gap-3">
//             <Link
//               href="/admin/crm"
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-sky-700 font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
//             >
//               <Mail className="h-4 w-4" /> View Leads
//             </Link>
//             <Link
//               href="/admin/projects/new"
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/40 text-white font-semibold text-sm hover:bg-white/25 transition-all"
//             >
//               <FolderPlus className="h-4 w-4" /> New Project
//             </Link>
//           </div>
//         </div>
//       </motion.div>

//       {/* ===== 3D Animated Stat Cards ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         {dynamicStats.map((stat, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 40, rotateX: -12 }}
//             animate={{ opacity: 1, y: 0, rotateX: 0 }}
//             transition={{ delay: idx * 0.12, duration: 0.6, ease: "easeOut" }}
//             whileHover={{ y: -8, scale: 1.02 }}
//             className="perspective-1000"
//           >
//             <div className="relative">
//               <div
//                 className={`absolute -inset-2 rounded-3xl ${stat.glow} opacity-30 blur-xl animate-glow`}
//               />
//               <div
//                 className={`relative rounded-3xl p-5 md:p-6 bg-gradient-to-br ${stat.gradient} text-white shadow-xl card-gloss hover:rotate-1 transition-transform duration-300`}
//               >
//                 <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full border-4 border-white/15 animate-slow-spin" />
//                 <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10 blur-xl animate-float" />

//                 <div className="flex items-start justify-between relative">
//                   <div>
//                     <p className="text-sm font-medium text-white/85">{stat.label}</p>
//                     <h3 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight drop-shadow">
//                       {stat.value}
//                     </h3>
//                   </div>
//                   <div className={`p-3 rounded-2xl ${stat.iconBg} backdrop-blur-sm ring-1 ring-white/30`}>
//                     {stat.icon}
//                   </div>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between">
//                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold ring-1 ring-white/30">
//                     {stat.change}
//                   </span>
//                   <span className="inline-flex items-center gap-1 text-xs font-bold">
//                     {stat.trendUp ? (
//                       <ArrowUpRight className="h-3.5 w-3.5" />
//                     ) : (
//                       <ArrowDownRight className="h-3.5 w-3.5" />
//                     )}
//                     {stat.trend}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ===== Quick Actions ===== */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="grid grid-cols-2 md:grid-cols-4 gap-4"
//       >
//         {quickActions.map((action, idx) => (
//           <Link
//             key={idx}
//             href={action.href}
//             className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//           >
//             <div
//               className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}
//             >
//               {action.icon}
//             </div>
//             <span className="text-sm font-semibold text-gray-800">{action.label}</span>
//             <div
//               className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
//             />
//           </Link>
//         ))}
//       </motion.div>

//       {/* ===== Analytics Stat Cards (Site Opens + Interactions) ===== */}
//       {analytics && (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {[
//               {
//                 label: "Site Opens",
//                 value: analytics.siteVisits.thisMonth.toString(),
//                 change: "This month",
//                 gradient: "from-fuchsia-500 via-purple-600 to-indigo-700",
//                 glow: "bg-fuchsia-400",
//                 icon: <Globe className="h-5 w-5" />,
//                 trend: analytics.siteVisits.thisMonth > analytics.siteVisits.prevMonth ? "↑ Trending" : "—",
//                 trendUp: analytics.siteVisits.thisMonth > analytics.siteVisits.prevMonth,
//               },
//               {
//                 label: "Last Month Opens",
//                 value: analytics.siteVisits.prevMonth.toString(),
//                 change: "Previous month",
//                 gradient: "from-cyan-500 via-sky-600 to-blue-700",
//                 glow: "bg-cyan-400",
//                 icon: <Activity className="h-5 w-5" />,
//                 trend: `${analytics.siteVisits.total} total`,
//                 trendUp: true,
//               },
//               {
//                 label: "Interactions",
//                 value: analytics.interactions.thisMonth.toString(),
//                 change: "This month",
//                 gradient: "from-emerald-500 via-teal-600 to-green-700",
//                 glow: "bg-emerald-400",
//                 icon: <Zap className="h-5 w-5" />,
//                 trend: analytics.interactions.thisMonth > analytics.interactions.prevMonth ? "↑ Growing" : "—",
//                 trendUp: analytics.interactions.thisMonth > analytics.interactions.prevMonth,
//               },
//               {
//                 label: "Open Rate",
//                 value: analytics.siteVisits.total > 0
//                   ? Math.min(100, Math.round((analytics.interactions.total / analytics.siteVisits.total) * 100)) + "%"
//                   : "0%",
//                 change: "Interactions",
//                 gradient: "from-amber-500 via-orange-500 to-rose-600",
//                 glow: "bg-amber-400",
//                 icon: <TrendingUp className="h-5 w-5" />,
//                 trend: "Health",
//                 trendUp: true,
//               },
//             ].map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 40, rotateX: -12 }}
//                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                 transition={{ delay: 0.15 + idx * 0.1, duration: 0.6, ease: "easeOut" }}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 className="perspective-1000"
//               >
//                 <div className="relative">
//                   <div className={`absolute -inset-2 rounded-3xl ${stat.glow} opacity-30 blur-xl animate-glow`} />
//                   <div className={`relative rounded-3xl p-5 bg-gradient-to-br ${stat.gradient} text-white shadow-xl card-gloss hover:rotate-1 transition-transform duration-300 overflow-hidden`}>
//                     <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border-4 border-white/15 animate-slow-spin" />
//                     <div className="flex items-start justify-between relative">
//                       <div>
//                         <p className="text-xs font-medium text-white/85">{stat.label}</p>
//                         <h3 className="text-3xl font-extrabold mt-2 tracking-tight drop-shadow">{stat.value}</h3>
//                       </div>
//                       <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
//                         {stat.icon}
//                       </div>
//                     </div>
//                     <div className="mt-3 flex items-center justify-between">
//                       <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-semibold ring-1 ring-white/30">
//                         {stat.change}
//                       </span>
//                       <span className="inline-flex items-center gap-1 text-[11px] font-bold">
//                         {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
//                         {stat.trend}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* ===== Growth Comparison Chart ===== */}
//           {monthlyVisits.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 glass"
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                     <TrendingUp className="h-5 w-5 text-sky-600" /> Growth Overview
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">Site opens over the last 6 months</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold">
//                     This month: {analytics.siteVisits.thisMonth}
//                   </span>
//                 </div>
//               </div>

//               <div className="relative h-64 rounded-xl border border-sky-100 bg-white/75 p-3">
//                 <div className="pointer-events-none absolute inset-x-3 top-3 bottom-10 flex flex-col justify-between">
//                   {[100, 75, 50, 25, 0].map((level) => (
//                     <div key={level} className="flex items-center gap-2">
//                       <span className="w-8 text-right text-[10px] font-semibold text-slate-400">
//                         {Math.round((monthlyMax * level) / 100)}
//                       </span>
//                       <span className="h-px flex-1 bg-slate-200/90" />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="relative h-full pl-10 pr-1 pb-8">
//                   <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 24}`} className="h-full w-full overflow-visible">
//                     <defs>
//                       <linearGradient id="growthLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                         <stop offset="0%" stopColor="#0ea5e9" />
//                         <stop offset="50%" stopColor="#6366f1" />
//                         <stop offset="100%" stopColor="#8b5cf6" />
//                       </linearGradient>
//                       <linearGradient id="growthAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                         <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
//                         <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.04" />
//                       </linearGradient>
//                     </defs>

//                     {areaPath && <path d={areaPath} fill="url(#growthAreaGradient)" />}
//                     {linePath && (
//                       <path
//                         d={linePath}
//                         fill="none"
//                         stroke="url(#growthLineGradient)"
//                         strokeWidth="3"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}

//                     {chartPoints.map((point, idx) => (
//                       <g key={idx}>
//                         <circle cx={point.x} cy={point.y} r="6" fill="white" stroke="#0284c7" strokeWidth="2.5" />
//                         <circle cx={point.x} cy={point.y} r="2.5" fill="#0ea5e9" />
//                         <text
//                           x={point.x}
//                           y={Math.max(12, point.y - 12)}
//                           textAnchor="middle"
//                           className="fill-slate-700 text-[10px] font-bold"
//                         >
//                           {point.opens}
//                         </text>
//                         <title>{`${point.month}: ${point.opens} opens`}</title>
//                       </g>
//                     ))}

//                     {chartPoints.map((point, idx) => (
//                       <text
//                         key={`month-${idx}`}
//                         x={point.x}
//                         y={chartHeight + 16}
//                         textAnchor="middle"
//                         className="fill-slate-500 text-[11px] font-medium"
//                       >
//                         {point.month}
//                       </text>
//                     ))}
//                   </svg>
//                 </div>
//               </div>

//               <p className="mt-3 text-xs font-medium text-slate-500">
//                 Hover over each point to see monthly values.
//               </p>

//               <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
//                 <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Peak Month</p>
//                   <p className="text-sm font-bold text-slate-800">{monthlyMax}</p>
//                 </div>
//                 <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Average</p>
//                   <p className="text-sm font-bold text-slate-800">{monthlyAverage}</p>
//                 </div>
//                 <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Lowest</p>
//                   <p className="text-sm font-bold text-slate-800">{monthlyMin}</p>
//                 </div>
//                 <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Total 6 Months</p>
//                   <p className="text-sm font-bold text-slate-800">{monthlyTotal}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </>
//       )}

//       {/* ===== Main Grid: Source Distribution + Overview ===== */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Lead Sources */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden glass"
//         >
//           <div className="p-5 md:p-6 border-b border-gray-200 flex justify-between items-center">
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <TrendingUp className="h-5 w-5 text-sky-600" /> Lead Sources
//               </h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 Distribution of leads by source channel
//               </p>
//             </div>
//           </div>
//           <div className="p-5 md:p-6">
//             {sourceDistribution.length > 0 ? (
//               <div className="space-y-5">
//                 {sourceDistribution.map((source, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
//                       <span className="font-semibold text-gray-800 flex items-center gap-2">
//                         <span
//                           className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${
//                             barGradients[index % barGradients.length]
//                           }`}
//                         />
//                         {source.name}
//                       </span>
//                       <span className="text-gray-600">
//                         {source.count} leads · {source.percentage}%
//                       </span>
//                     </div>
//                     <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${source.percentage}%` }}
//                         transition={{ duration: 1, delay: 0.3 + index * 0.15, ease: "easeOut" }}
//                         className={`h-3 rounded-full bg-gradient-to-r ${barGradients[index % barGradients.length]} relative`}
//                         style={{ boxShadow: "0 0 12px rgba(14,165,233,0.4)" }}
//                       >
//                         <span className="absolute inset-0 opacity-50">
//                           <span className="absolute right-0 h-full w-8 bg-white/40 blur-sm" />
//                         </span>
//                       </motion.div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="p-8 text-center text-gray-500">
//                 <Globe className="h-10 w-10 mx-auto text-gray-300 mb-3" />
//                 <p>No lead source data available yet.</p>
//               </div>
//             )}
//           </div>
//         </motion.div>

//         {/* Side Overview / Activity */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 glass"
//         >
//           <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
//             <Activity className="h-5 w-5 text-violet-600" /> Overview
//           </h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50 border border-sky-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-sky-100 text-sky-600">
//                   <FolderKanban className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Projects</p>
//                   <p className="text-lg font-bold text-gray-900">{stats.totalProjects}</p>
//                 </div>
//               </div>
//               <span className="text-xs font-semibold text-sky-600 bg-sky-100 px-2 py-1 rounded-full">Active</span>
//             </div>

//             <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
//                   <Users className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Total Leads</p>
//                   <p className="text-lg font-bold text-gray-900">{stats.totalLeads}</p>
//                 </div>
//               </div>
//               <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">All time</span>
//             </div>

//             <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
//                   <Clock className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Pending</p>
//                   <p className="text-lg font-bold text-gray-900">{stats.pendingReviews}</p>
//                 </div>
//               </div>
//               <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Review</span>
//             </div>

//             <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-violet-50 to-sky-50 border border-violet-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
//                   <Zap className="h-4 w-4 text-violet-600" /> Engagement
//                 </span>
//                 <span className="text-xs font-bold text-violet-600">Good</span>
//               </div>
//               <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: "78%" }}
//                   transition={{ duration: 1.2, delay: 0.5 }}
//                   className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-sky-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ===== Recent Leads Table ===== */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden glass"
//       >
//         <div className="p-5 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//               <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Recent Leads
//             </h3>
//             <p className="text-sm text-gray-500 mt-1">Latest lead entries</p>
//           </div>
//           <Link
//             href="/admin/crm"
//             className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group whitespace-nowrap"
//           >
//             View All
//             <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//           </Link>
//         </div>

//         {recentLeads.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">
//             <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
//             <p>No leads yet. They will appear here when visitors contact you!</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left text-sm">
//               <thead className="bg-gray-50/80 text-gray-500">
//                 <tr>
//                   <th className="px-4 md:px-6 py-3 font-semibold min-w-[150px]">Name</th>
//                   <th className="px-4 md:px-6 py-3 font-semibold min-w-[120px]">Source</th>
//                   <th className="px-4 md:px-6 py-3 font-semibold min-w-[100px]">Date</th>
//                   <th className="px-4 md:px-6 py-3 font-semibold min-w-[80px]">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 <AnimatePresence initial={false}>
//                   {recentLeads.map((lead, index) => (
//                     <motion.tr
//                       key={lead._id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="hover:bg-gradient-to-r hover:from-sky-50/60 hover:to-transparent transition-colors group"
//                     >
//                       <td className="px-4 md:px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md group-hover:scale-110 transition-transform">
//                             {lead.name.charAt(0).toUpperCase()}
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-900 break-words max-w-[150px]">
//                               {lead.name}
//                             </p>
//                             <p className="text-gray-500 text-xs break-words max-w-[150px]">
//                               {lead.email}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 md:px-6 py-4">
//                         <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200 truncate max-w-full inline-block">
//                           {lead.source || "Unknown"}
//                         </span>
//                       </td>
//                       <td className="px-4 md:px-6 py-4 text-gray-500">{formatDate(lead.createdAt)}</td>
//                       <td className="px-4 md:px-6 py-4">
//                         <span
//                           className={`px-2.5 py-1 text-xs font-semibold rounded-full ring-1 ${
//                             statusStyles[lead.status] ||
//                             "bg-gray-100 text-gray-700 ring-gray-200"
//                           }`}
//                         >
//                           {lead.status}
//                         </span>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </motion.div>

//       {/* ===== 🆕 Company Tracker + Lead Generation ===== */}
//       <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="p-5 border-b border-gray-200 flex justify-between items-center">
//           <div>
//             <h3 className="text-lg font-bold flex items-center gap-2">
//               <Building2 className="h-5 w-5 text-indigo-600" />
//               🏢 Live Company Tracker
//             </h3>
//             <p className="text-sm text-gray-500">
//               Companies visiting BawdicSoft (last 7 days) – click <strong>"Generate Lead"</strong> to add to CRM.
//             </p>
//           </div>
//           <span className="text-xs bg-indigo-100 px-3 py-1 rounded-full font-semibold text-indigo-700">
//             {companies.length} Companies
//           </span>
//         </div>

//         {loadingCompanies ? (
//           <div className="p-12 text-center">Loading companies...</div>
//         ) : companies.length === 0 ? (
//           <div className="p-12 text-center text-gray-400">
//             <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//             <p>No companies detected yet.</p>
//             <p className="text-sm">Visit the main website (/) a few times to generate data.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left">
//               <thead className="bg-gray-50 text-gray-500">
//                 <tr>
//                   <th className="px-6 py-3">Company</th>
//                   <th className="px-6 py-3 text-center">Visits</th>
//                   <th className="px-6 py-3">Pages Viewed</th>
//                   <th className="px-6 py-3">Location</th>
//                   <th className="px-6 py-3">Last Seen</th>
//                   <th className="px-6 py-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {companies.map((comp) => (
//                   <tr key={comp._id} className="hover:bg-sky-50/50 transition">
//                     <td className="px-6 py-4 font-bold text-gray-800">{comp._id}</td>
//                     <td className="px-6 py-4 text-center font-bold text-indigo-600">{comp.totalVisits || comp.count}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex flex-wrap gap-1 max-w-xs">
//                         {comp.pages?.slice(0, 2).map((p, i) => (
//                           <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs truncate max-w-[100px]">
//                             {p.replace(/^https?:\/\/[^\/]+/, '') || p}
//                           </span>
//                         ))}
//                         {comp.pages?.length > 2 && (
//                           <span className="text-xs text-gray-400">+{comp.pages.length - 2}</span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       <MapPin className="h-3 w-3 inline mr-1" /> {comp.locations?.[0] || 'Unknown'}
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       {new Date(comp.lastVisit).toLocaleString('en-US', {
//                         month: 'short',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                       })}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="flex items-center justify-center gap-2">
//                         {/* LinkedIn Find */}
//                         <a
//                           href={`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(
//                             comp._id
//                           )}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-xs font-semibold border border-blue-200"
//                         >
//                           <ExternalLink className="h-3.5 w-3.5" /> Find
//                         </a>
//                         {/* Generate Lead (CRM) */}
//                         <button
//                           onClick={() => handleAddToCRM(comp._id)}
//                           disabled={addingCompany === comp._id}
//                           className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 disabled:opacity-50"
//                         >
//                           {addingCompany === comp._id ? (
//                             '⏳'
//                           ) : (
//                             <>
//                               <UserPlus className="h-3.5 w-3.5" /> Generate Lead
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <div className="p-3 bg-gray-50 text-xs text-gray-400 border-t flex justify-between">
//           <span>
//             💡 Click <strong>"Find"</strong> to search on LinkedIn | Click <strong>"Generate Lead"</strong> to add company to CRM (Leads table).
//           </span>
//           <span>Total Leads in CRM: {stats.totalLeads}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import {
//   FolderKanban,
//   Users,
//   ClipboardCheck,
//   Sparkles,
//   ArrowUpRight,
//   ArrowDownRight,
//   UserPlus,
//   FolderPlus,
//   Settings,
//   Mail,
//   TrendingUp,
//   Activity,
//   CheckCircle2,
//   Clock,
//   Globe,
//   Zap,
// } from "lucide-react";

// interface Lead {
//   _id: string;
//   name: string;
//   email: string;
//   source: string;
//   status: "New" | "Contacted" | "Closed";
//   createdAt: string;
// }

// interface Project {
//   _id: string;
//   projectName: string;
// }

// interface SourceDistribution {
//   name: string;
//   count: number;
//   percentage: number;
// }

// // Themed gradient variants for source bars
// const barGradients = [
//   "from-sky-500 to-blue-600",
//   "from-emerald-500 to-teal-600",
//   "from-violet-500 to-purple-600",
//   "from-amber-500 to-orange-600",
//   "from-rose-500 to-pink-600",
//   "from-cyan-500 to-sky-600",
// ];

// const statusStyles: Record<string, string> = {
//   New: "bg-sky-100 text-sky-700 ring-sky-200",
//   Contacted: "bg-amber-100 text-amber-700 ring-amber-200",
//   Closed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
// };

// export default function AdminDashboard() {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalProjects: 0,
//     totalLeads: 0,
//     pendingReviews: 0,
//   });
// const [sourceDistribution, setSourceDistribution] = useState<SourceDistribution[]>([]);
//   const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
//   const [isClient, setIsClient] = useState(false);
//   const [analytics, setAnalytics] = useState<{
//     siteVisits: {
//       thisMonth: number;
//       prevMonth: number;
//       total: number;
//       monthlyBreakdown: { month: string; opens: number }[];
//       topLocations: { city: string; country: string; count: number }[];
//     };
//     interactions: { thisMonth: number; prevMonth: number; total: number };
//   } | null>(null);

//   useEffect(() => {
//     setIsClient(true);
//     async function fetchDashboardData() {
//       try {
//         // Fetch both projects and leads concurrently for better performance
//         const [projectsRes, leadsRes] = await Promise.all([
//           fetch("/api/admin/projects"),
//           fetch("/api/admin/leads"),
//         ]);

//         const projectsData = await projectsRes.json();
//         const leadsData = await leadsRes.json();

// // Fetch analytics (site visits + interactions) concurrently
//         const analyticsRes = await fetch("/api/admin/analytics");
//         const analyticsData = await analyticsRes.json();
//         if (analyticsData.success) {
//           setAnalytics(analyticsData.data);
//         }

//         if (projectsData.success && leadsData.success) {
//           const projects: Project[] = projectsData.data;
//           const leads: Lead[] = leadsData.data;

//           // Calculate real stats
//           const pendingCount = leads.filter((lead) => lead.status === "New").length;

//           setStats({
//             totalProjects: projects.length,
//             totalLeads: leads.length,
//             pendingReviews: pendingCount,
//           });

//           // Calculate source distribution
//           const sourceCounts: Record<string, number> = {};
//           leads.forEach((lead) => {
//             const source = lead.source || "Unknown";
//             sourceCounts[source] = (sourceCounts[source] || 0) + 1;
//           });

//           const totalLeadsCount = leads.length;
//           const distribution: SourceDistribution[] = Object.entries(sourceCounts)
//             .map(([name, count]) => ({
//               name,
//               count,
//               percentage:
//                 totalLeadsCount > 0 ? Math.round((count / totalLeadsCount) * 100) : 0,
//             }))
//             .sort((a, b) => b.count - a.count);

//           setSourceDistribution(distribution);
//           setRecentLeads(leads.slice(0, 4));
//         }
//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDashboardData();
//   }, []);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = Math.floor(
//       (now.getTime() - date.getTime()) / (1000 * 60 * 60)
//     );

//     if (diffInHours < 1) return "Just now";
//     if (diffInHours < 24) return `${diffInHours} hours ago`;
//     if (diffInHours < 48) return "1 day ago";
//     return `${Math.floor(diffInHours / 24)} days ago`;
//   };

//   const dynamicStats = [
//     {
//       label: "Total Projects",
//       value: stats.totalProjects.toString(),
//       change: "Active in database",
//       gradient: "from-sky-500 via-blue-600 to-indigo-700",
//       glow: "bg-sky-400",
//       icon: <FolderKanban className="h-5 w-5" />,
//       iconBg: "bg-white/20",
//       trend: "+12%",
//       trendUp: true,
//     },
//     {
//       label: "Total Leads",
//       value: stats.totalLeads.toString(),
//       change: "All time",
//       gradient: "from-emerald-500 via-green-600 to-teal-700",
//       glow: "bg-emerald-400",
//       icon: <Users className="h-5 w-5" />,
//       iconBg: "bg-white/20",
//       trend: "+8%",
//       trendUp: true,
//     },
//     {
//       label: "Pending Reviews",
//       value: stats.pendingReviews.toString(),
//       change:
//         stats.pendingReviews > 0 ? "Needs attention" : "All caught up!",
//       gradient:
//         stats.pendingReviews > 0
//           ? "from-amber-500 via-orange-500 to-rose-600"
//           : "from-emerald-500 via-green-600 to-teal-700",
//       glow: stats.pendingReviews > 0 ? "bg-amber-400" : "bg-emerald-400",
//       icon: <ClipboardCheck className="h-5 w-5" />,
//       iconBg: "bg-white/20",
//       trend: stats.pendingReviews > 0 ? "View" : "0",
//       trendUp: stats.pendingReviews > 0,
//     },
//   ];

//   const quickActions = [
//     {
//       label: "Add Project",
//       href: "/admin/projects/new",
//       icon: <FolderPlus className="h-5 w-5" />,
//       gradient: "from-sky-500 to-blue-600",
//     },
//     {
//       label: "Add Lead",
//       href: "/admin/crm",
//       icon: <UserPlus className="h-5 w-5" />,
//       gradient: "from-emerald-500 to-teal-600",
//     },
//     {
//       label: "Manage Employees",
//       href: "/admin/employees",
//       icon: <Users className="h-5 w-5" />,
//       gradient: "from-violet-500 to-purple-600",
//     },
//     {
//       label: "Settings",
//       href: "/admin/settings",
//       icon: <Settings className="h-5 w-5" />,
//       gradient: "from-amber-500 to-orange-600",
//     },
//   ];

//   const monthlyVisits = analytics?.siteVisits.monthlyBreakdown ?? [];
//   const monthlyMax = Math.max(...monthlyVisits.map((m) => m.opens), 1);
//   const monthlyAverage = monthlyVisits.length
//     ? Math.round(monthlyVisits.reduce((sum, item) => sum + item.opens, 0) / monthlyVisits.length)
//     : 0;
//   const monthlyMin = monthlyVisits.length ? Math.min(...monthlyVisits.map((m) => m.opens)) : 0;
//   const monthlyTotal = monthlyVisits.reduce((sum, item) => sum + item.opens, 0);

//   const chartWidth = 560;
//   const chartHeight = 180;
//   const padX = 24;
//   const padY = 18;
//   const drawableHeight = chartHeight - padY * 2;
//   const chartPoints = monthlyVisits.map((item, idx) => {
//     const x =
//       monthlyVisits.length === 1
//         ? chartWidth / 2
//         : padX + (idx * (chartWidth - padX * 2)) / (monthlyVisits.length - 1);
//     const y = chartHeight - padY - (item.opens / monthlyMax) * drawableHeight;
//     return { ...item, x, y };
//   });
//   const linePath = chartPoints
//     .map((point, idx) => `${idx === 0 ? "M" : "L"} ${point.x} ${point.y}`)
//     .join(" ");
//   const areaPath =
//     chartPoints.length > 0
//       ? `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - padY} L ${chartPoints[0].x} ${chartHeight - padY} Z`
//       : "";

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="relative">
//           <div className="w-16 h-16 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
//           <div className="absolute inset-0 rounded-full blur-md bg-sky-400/20 animate-glow" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 p-4 md:p-6">
//       {/* ===== Hero / Greeting Banner ===== */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white p-6 md:p-10 animate-gradient shadow-2xl"
//       >
//         {/* Decorative floating blobs */}
//         <div className="absolute -top-16 -right-10 w-52 h-52 rounded-full bg-white/10 blur-2xl animate-float" />
//         <div className="absolute -bottom-20 left-1/4 w-56 h-56 rounded-full bg-purple-400/20 blur-2xl animate-float-slow" />
//         <div className="absolute top-8 right-1/4 w-24 h-24 rounded-full border-2 border-white/20 animate-slow-spin" />

//         <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 text-xs font-semibold mb-4">
//               <Sparkles className="h-3.5 w-3.5" />
//               Command Center
//             </div>
//             <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
//               Welcome to your Dashboard
//               <span className="block text-white/85 text-base md:text-lg font-medium mt-2">
//                 Monitor performance, leads, and projects at a glance.
//               </span>
//             </h1>
//           </div>
//           <div className="flex gap-3">
//             <Link
//               href="/admin/crm"
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-sky-700 font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
//             >
//               <Mail className="h-4 w-4" /> View Leads
//             </Link>
//             <Link
//               href="/admin/projects/new"
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/40 text-white font-semibold text-sm hover:bg-white/25 transition-all"
//             >
//               <FolderPlus className="h-4 w-4" /> New Project
//             </Link>
//           </div>
//         </div>
//       </motion.div>

//       {/* ===== 3D Animated Stat Cards ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         {dynamicStats.map((stat, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 40, rotateX: -12 }}
//             animate={{ opacity: 1, y: 0, rotateX: 0 }}
//             transition={{ delay: idx * 0.12, duration: 0.6, ease: "easeOut" }}
//             whileHover={{ y: -8, scale: 1.02 }}
//             className="perspective-1000"
//           >
//             <div className="relative">
//               {/* Glow halo */}
//               <div
//                 className={`absolute -inset-2 rounded-3xl ${stat.glow} opacity-30 blur-xl animate-glow`}
//               />
//               <div
//                 className={`relative rounded-3xl p-5 md:p-6 bg-gradient-to-br ${stat.gradient} text-white shadow-xl card-gloss hover:rotate-1 transition-transform duration-300`}
//               >
//                 <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full border-4 border-white/15 animate-slow-spin" />
//                 <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10 blur-xl animate-float" />

//                 <div className="flex items-start justify-between relative">
//                   <div>
//                     <p className="text-sm font-medium text-white/85">{stat.label}</p>
//                     <h3 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight drop-shadow">
//                       {stat.value}
//                     </h3>
//                   </div>
//                   <div className={`p-3 rounded-2xl ${stat.iconBg} backdrop-blur-sm ring-1 ring-white/30`}>
//                     {stat.icon}
//                   </div>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between">
//                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold ring-1 ring-white/30">
//                     {stat.change}
//                   </span>
//                   <span className="inline-flex items-center gap-1 text-xs font-bold">
//                     {stat.trendUp ? (
//                       <ArrowUpRight className="h-3.5 w-3.5" />
//                     ) : (
//                       <ArrowDownRight className="h-3.5 w-3.5" />
//                     )}
//                     {stat.trend}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ===== Quick Actions ===== */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="grid grid-cols-2 md:grid-cols-4 gap-4"
//       >
//         {quickActions.map((action, idx) => (
//           <Link
//             key={idx}
//             href={action.href}
//             className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//           >
//             <div
//               className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}
//             >
//               {action.icon}
//             </div>
//             <span className="text-sm font-semibold text-gray-800">{action.label}</span>
//             <div
//               className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
//             />
//           </Link>
//         ))}
// </motion.div>

//       {/* ===== Analytics Stat Cards (Site Opens + Interactions) ===== */}
//       {analytics && (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {[
//               {
//                 label: "Site Opens",
//                 value: analytics.siteVisits.thisMonth.toString(),
//                 change: "This month",
//                 gradient: "from-fuchsia-500 via-purple-600 to-indigo-700",
//                 glow: "bg-fuchsia-400",
//                 icon: <Globe className="h-5 w-5" />,
//                 trend: analytics.siteVisits.thisMonth > analytics.siteVisits.prevMonth ? "↑ Trending" : "—",
//                 trendUp: analytics.siteVisits.thisMonth > analytics.siteVisits.prevMonth,
//               },
//               {
//                 label: "Last Month Opens",
//                 value: analytics.siteVisits.prevMonth.toString(),
//                 change: "Previous month",
//                 gradient: "from-cyan-500 via-sky-600 to-blue-700",
//                 glow: "bg-cyan-400",
//                 icon: <Activity className="h-5 w-5" />,
//                 trend: `${analytics.siteVisits.total} total`,
//                 trendUp: true,
//               },
//               {
//                 label: "Interactions",
//                 value: analytics.interactions.thisMonth.toString(),
//                 change: "This month",
//                 gradient: "from-emerald-500 via-teal-600 to-green-700",
//                 glow: "bg-emerald-400",
//                 icon: <Zap className="h-5 w-5" />,
//                 trend: analytics.interactions.thisMonth > analytics.interactions.prevMonth ? "↑ Growing" : "—",
//                 trendUp: analytics.interactions.thisMonth > analytics.interactions.prevMonth,
//               },
//               {
//                 label: "Open Rate",
//                 value: analytics.siteVisits.total > 0
//                   ? Math.min(100, Math.round((analytics.interactions.total / analytics.siteVisits.total) * 100)) + "%"
//                   : "0%",
//                 change: "Interactions",
//                 gradient: "from-amber-500 via-orange-500 to-rose-600",
//                 glow: "bg-amber-400",
//                 icon: <TrendingUp className="h-5 w-5" />,
//                 trend: "Health",
//                 trendUp: true,
//               },
//             ].map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 40, rotateX: -12 }}
//                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                 transition={{ delay: 0.15 + idx * 0.1, duration: 0.6, ease: "easeOut" }}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 className="perspective-1000"
//               >
//                 <div className="relative">
//                   <div className={`absolute -inset-2 rounded-3xl ${stat.glow} opacity-30 blur-xl animate-glow`} />
//                   <div className={`relative rounded-3xl p-5 bg-gradient-to-br ${stat.gradient} text-white shadow-xl card-gloss hover:rotate-1 transition-transform duration-300 overflow-hidden`}>
//                     <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border-4 border-white/15 animate-slow-spin" />
//                     <div className="flex items-start justify-between relative">
//                       <div>
//                         <p className="text-xs font-medium text-white/85">{stat.label}</p>
//                         <h3 className="text-3xl font-extrabold mt-2 tracking-tight drop-shadow">{stat.value}</h3>
//                       </div>
//                       <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
//                         {stat.icon}
//                       </div>
//                     </div>
//                     <div className="mt-3 flex items-center justify-between">
//                       <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-semibold ring-1 ring-white/30">
//                         {stat.change}
//                       </span>
//                       <span className="inline-flex items-center gap-1 text-[11px] font-bold">
//                         {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
//                         {stat.trend}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* ===== Growth Comparison Chart ===== */}
//           {monthlyVisits.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 glass"
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                     <TrendingUp className="h-5 w-5 text-sky-600" /> Growth Overview
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">Site opens over the last 6 months</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold">
//                     This month: {analytics.siteVisits.thisMonth}
//                   </span>
//                 </div>
//               </div>

//               <div className="relative h-64 rounded-xl border border-sky-100 bg-white/75 p-3">
//                 <div className="pointer-events-none absolute inset-x-3 top-3 bottom-10 flex flex-col justify-between">
//                   {[100, 75, 50, 25, 0].map((level) => (
//                     <div key={level} className="flex items-center gap-2">
//                       <span className="w-8 text-right text-[10px] font-semibold text-slate-400">
//                         {Math.round((monthlyMax * level) / 100)}
//                       </span>
//                       <span className="h-px flex-1 bg-slate-200/90" />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="relative h-full pl-10 pr-1 pb-8">
//                   <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 24}`} className="h-full w-full overflow-visible">
//                     <defs>
//                       <linearGradient id="growthLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                         <stop offset="0%" stopColor="#0ea5e9" />
//                         <stop offset="50%" stopColor="#6366f1" />
//                         <stop offset="100%" stopColor="#8b5cf6" />
//                       </linearGradient>
//                       <linearGradient id="growthAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                         <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
//                         <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.04" />
//                       </linearGradient>
//                     </defs>

//                     {areaPath && <path d={areaPath} fill="url(#growthAreaGradient)" />}
//                     {linePath && (
//                       <path
//                         d={linePath}
//                         fill="none"
//                         stroke="url(#growthLineGradient)"
//                         strokeWidth="3"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}

//                     {chartPoints.map((point, idx) => (
//                       <g key={idx}>
//                         <circle cx={point.x} cy={point.y} r="6" fill="white" stroke="#0284c7" strokeWidth="2.5" />
//                         <circle cx={point.x} cy={point.y} r="2.5" fill="#0ea5e9" />
//                         <text
//                           x={point.x}
//                           y={Math.max(12, point.y - 12)}
//                           textAnchor="middle"
//                           className="fill-slate-700 text-[10px] font-bold"
//                         >
//                           {point.opens}
//                         </text>
//                         <title>{`${point.month}: ${point.opens} opens`}</title>
//                       </g>
//                     ))}

//                     {chartPoints.map((point, idx) => (
//                       <text
//                         key={`month-${idx}`}
//                         x={point.x}
//                         y={chartHeight + 16}
//                         textAnchor="middle"
//                         className="fill-slate-500 text-[11px] font-medium"
//                       >
//                         {point.month}
//                       </text>
//                     ))}
//                   </svg>
//                 </div>
//               </div>

//               <p className="mt-3 text-xs font-medium text-slate-500">
//                 Hover over each point to see monthly values.
//               </p>

//               <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
//                 <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Peak Month</p>
//                   <p className="text-sm font-bold text-slate-800">{monthlyMax}</p>
//                 </div>
//                 <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Average</p>
//                   <p className="text-sm font-bold text-slate-800">{monthlyAverage}</p>
//                 </div>
//                 <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Lowest</p>
//                   <p className="text-sm font-bold text-slate-800">{monthlyMin}</p>
//                 </div>
//                 <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Total 6 Months</p>
//                   <p className="text-sm font-bold text-slate-800">{monthlyTotal}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </>
//       )}

//       {/* ===== Main Grid: Source Distribution + Overview ===== */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Lead Sources */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden glass"
//         >
//           <div className="p-5 md:p-6 border-b border-gray-200 flex justify-between items-center">
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <TrendingUp className="h-5 w-5 text-sky-600" /> Lead Sources
//               </h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 Distribution of leads by source channel
//               </p>
//             </div>
//           </div>
//           <div className="p-5 md:p-6">
//             {sourceDistribution.length > 0 ? (
//               <div className="space-y-5">
//                 {sourceDistribution.map((source, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
//                       <span className="font-semibold text-gray-800 flex items-center gap-2">
//                         <span
//                           className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${
//                             barGradients[index % barGradients.length]
//                           }`}
//                         />
//                         {source.name}
//                       </span>
//                       <span className="text-gray-600">
//                         {source.count} leads · {source.percentage}%
//                       </span>
//                     </div>
//                     <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${source.percentage}%` }}
//                         transition={{ duration: 1, delay: 0.3 + index * 0.15, ease: "easeOut" }}
//                         className={`h-3 rounded-full bg-gradient-to-r ${barGradients[index % barGradients.length]} relative`}
//                         style={{ boxShadow: "0 0 12px rgba(14,165,233,0.4)" }}
//                       >
//                         <span className="absolute inset-0 opacity-50">
//                           <span className="absolute right-0 h-full w-8 bg-white/40 blur-sm" />
//                         </span>
//                       </motion.div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="p-8 text-center text-gray-500">
//                 <Globe className="h-10 w-10 mx-auto text-gray-300 mb-3" />
//                 <p>No lead source data available yet.</p>
//               </div>
//             )}
//           </div>
//         </motion.div>

//         {/* Side Overview / Activity */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 glass"
//         >
//           <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
//             <Activity className="h-5 w-5 text-violet-600" /> Overview
//           </h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50 border border-sky-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-sky-100 text-sky-600">
//                   <FolderKanban className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Projects</p>
//                   <p className="text-lg font-bold text-gray-900">{stats.totalProjects}</p>
//                 </div>
//               </div>
//               <span className="text-xs font-semibold text-sky-600 bg-sky-100 px-2 py-1 rounded-full">
//                 Active
//               </span>
//             </div>

//             <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
//                   <Users className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Total Leads</p>
//                   <p className="text-lg font-bold text-gray-900">{stats.totalLeads}</p>
//                 </div>
//               </div>
//               <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
//                 All time
//               </span>
//             </div>

//             <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
//                   <Clock className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Pending</p>
//                   <p className="text-lg font-bold text-gray-900">{stats.pendingReviews}</p>
//                 </div>
//               </div>
//               <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
//                 Review
//               </span>
//             </div>

//             <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-violet-50 to-sky-50 border border-violet-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
//                   <Zap className="h-4 w-4 text-violet-600" /> Engagement
//                 </span>
//                 <span className="text-xs font-bold text-violet-600">Good</span>
//               </div>
//               <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: "78%" }}
//                   transition={{ duration: 1.2, delay: 0.5 }}
//                   className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-sky-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ===== Recent Leads Table ===== */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden glass"
//       >
//         <div className="p-5 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//               <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Recent Leads
//             </h3>
//             <p className="text-sm text-gray-500 mt-1">Latest lead entries</p>
//           </div>
//           <Link
//             href="/admin/crm"
//             className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group whitespace-nowrap"
//           >
//             View All
//             <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//           </Link>
//         </div>

//         {recentLeads.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">
//             <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
//             <p>No leads yet. They will appear here when visitors contact you!</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left text-sm">
//               <thead className="bg-gray-50/80 text-gray-500">
//                 <tr>
//                   <th className="px-4 md:px-6 py-3 font-semibold min-w-[150px]">Name</th>
//                   <th className="px-4 md:px-6 py-3 font-semibold min-w-[120px]">Source</th>
//                   <th className="px-4 md:px-6 py-3 font-semibold min-w-[100px]">Date</th>
//                   <th className="px-4 md:px-6 py-3 font-semibold min-w-[80px]">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 <AnimatePresence initial={false}>
//                   {recentLeads.map((lead, index) => (
//                     <motion.tr
//                       key={lead._id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="hover:bg-gradient-to-r hover:from-sky-50/60 hover:to-transparent transition-colors group"
//                     >
//                       <td className="px-4 md:px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md group-hover:scale-110 transition-transform">
//                             {lead.name.charAt(0).toUpperCase()}
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-900 break-words max-w-[150px]">
//                               {lead.name}
//                             </p>
//                             <p className="text-gray-500 text-xs break-words max-w-[150px]">
//                               {lead.email}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 md:px-6 py-4">
//                         <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200 truncate max-w-full inline-block">
//                           {lead.source || "Unknown"}
//                         </span>
//                       </td>
//                       <td className="px-4 md:px-6 py-4 text-gray-500">{formatDate(lead.createdAt)}</td>
//                       <td className="px-4 md:px-6 py-4">
//                         <span
//                           className={`px-2.5 py-1 text-xs font-semibold rounded-full ring-1 ${
//                             statusStyles[lead.status] ||
//                             "bg-gray-100 text-gray-700 ring-gray-200"
//                           }`}
//                         >
//                           {lead.status}
//                         </span>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
