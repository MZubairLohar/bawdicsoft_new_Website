"use client";
import { motion, AnimatePresence } from "framer-motion";

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

const statusStyles: Record<string, string> = {
  New: "bg-sky-100 text-sky-700 ring-sky-200",
  Contacted: "bg-amber-100 text-amber-700 ring-amber-200",
  Closed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

export default function LeadTable({ leads, onStatusChange, onDelete }: LeadTableProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden glass">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/80 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Lead</th>
              <th className="px-6 py-3 font-semibold">Service Interested</th>
              <th className="px-6 py-3 font-semibold">Source</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence initial={false}>
              {leads.map((lead, index) => {
                const id = lead._id || lead.id || "";
                return (
                  <motion.tr
                    key={id || `${lead.email}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gradient-to-r hover:from-sky-50/60 hover:to-transparent transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-gray-500 text-xs">
                        {lead.email}
                        {lead.phone ? ` • ${lead.phone}` : ""}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{lead.service || "-"}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                        {lead.source || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => onStatusChange && onStatusChange(id, e.target.value)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full border-none ring-1 outline-none cursor-pointer focus:ring-2 ${
                          statusStyles[lead.status] || "bg-gray-100 text-gray-700 ring-gray-200"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onDelete && onDelete(id)}
                        className="text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
