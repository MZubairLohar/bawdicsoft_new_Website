export default function AdminDashboard() {
  // Mock Data
  const stats = [
    { label: "Total Projects", value: "7", change: "+2 this month", color: "bg-blue-50 text-blue-600" },
    { label: "Total Leads", value: "42", change: "+12 this week", color: "bg-green-50 text-green-600" },
    { label: "Pending Reviews", value: "3", change: "Needs attention", color: "bg-yellow-50 text-yellow-600" },
  ];

  const recentLeads = [
    { name: "John Doe", email: "john@example.com", source: "Contact Form", date: "2 hours ago", status: "New" },
    { name: "Sarah Smith", email: "sarah@tech.com", source: "Free Audit", date: "1 day ago", status: "Contacted" },
    { name: "Mike Johnson", email: "mike@startup.io", source: "Careers Page", date: "3 days ago", status: "Closed" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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
          <a href="/admin/crm" className="text-sm text-brand-600 hover:text-brand-700 font-medium">View All →</a>
        </div>
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
              {recentLeads.map((lead, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-gray-500 text-xs">{lead.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.source}</td>
                  <td className="px-6 py-4 text-gray-500">{lead.date}</td>
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
      </div>
    </div>
  );
}