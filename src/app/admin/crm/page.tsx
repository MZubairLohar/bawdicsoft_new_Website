export default function CRMPage() {
  // Mock Data
  const leads = [
    { id: 101, name: "Alice Cooper", email: "alice@corp.com", phone: "+1 234 567 890", service: "Web App Development", status: "New", date: "Today" },
    { id: 102, name: "Bob Martin", email: "bob@startup.io", phone: "+1 987 654 321", service: "Smart Contract Audit", status: "Contacted", date: "Yesterday" },
    { id: 103, name: "Charlie Davis", email: "charlie@agency.com", phone: "+1 555 123 456", service: "NFT Marketplace", status: "Closed", date: "Oct 28" },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        {["All", "New", "Contacted", "Closed"].map((filter) => (
          <button 
            key={filter}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "All" 
                ? "bg-gray-900 text-white" 
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Lead</th>
              <th className="px-6 py-3 font-medium">Service Interested</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{lead.name}</p>
                  <p className="text-gray-500 text-xs">{lead.email} • {lead.phone}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">{lead.service}</td>
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
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-600 hover:text-brand-800 font-medium">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}