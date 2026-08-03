"use client";

interface Lead {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  source?: string;
  status: string;
  createdAt?: string;
}

interface LeadTableProps {
  leads: Lead[];
  onStatusChange?: (id: string, status: string) => void;
  onDelete?: (id: string) => void;
}

export default function LeadTable({ leads, onStatusChange, onDelete }: LeadTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "Contacted":
        return "bg-yellow-100 text-yellow-700";
      case "Closed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Lead</th>
              <th className="px-6 py-3 font-medium">Service Interested</th>
              <th className="px-6 py-3 font-medium">Source</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => {
              const id = lead._id || lead.id || "";
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-gray-500 text-xs">{lead.email}{lead.phone ? ` • ${lead.phone}` : ""}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.service || "-"}</td>
                  <td className="px-6 py-4 text-gray-500">{lead.source || "-"}</td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => onStatusChange && onStatusChange(id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-none ${getStatusColor(lead.status)}`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onDelete && onDelete(id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
