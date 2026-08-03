"use client";
import { useState, useEffect } from "react";

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

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalLeads: 0,
    pendingReviews: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch both projects and leads concurrently for better performance
        const [projectsRes, leadsRes] = await Promise.all([
          fetch('/api/admin/projects'),
          fetch('/api/admin/leads')
        ]);

        const projectsData = await projectsRes.json();
        const leadsData = await leadsRes.json();

        if (projectsData.success && leadsData.success) {
          const projects: Project[] = projectsData.data;
          const leads: Lead[] = leadsData.data;

          // Calculate real stats
          const pendingCount = leads.filter((lead) => lead.status === "New").length;

          setStats({
            totalProjects: projects.length,
            totalLeads: leads.length,
            pendingReviews: pendingCount,
          });

          // Get the 3 most recent leads
          setRecentLeads(leads.slice(0, 3));
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
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const dynamicStats = [
    { 
      label: "Total Projects", 
      value: stats.totalProjects.toString(), 
      change: "Active in database", 
      color: "bg-blue-50 text-blue-600" 
    },
    { 
      label: "Total Leads", 
      value: stats.totalLeads.toString(), 
      change: "All time", 
      color: "bg-green-50 text-green-600" 
    },
    { 
      label: "Pending Reviews", 
      value: stats.pendingReviews.toString(), 
      change: stats.pendingReviews > 0 ? "Needs attention" : "All caught up!", 
      color: stats.pendingReviews > 0 ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600" 
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dynamicStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.color}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
          <a href="/admin/crm" className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">
            View All →
          </a>
        </div>
        
        {recentLeads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No leads yet. They will appear here when visitors contact you!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Source</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-gray-500 text-xs">{lead.email}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{lead.source}</td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(lead.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        lead.status === "New" ? "bg-blue-100 text-blue-700" :
                        lead.status === "Contacted" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}