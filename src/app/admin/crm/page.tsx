"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source: string;
  status: "New" | "Contacted" | "Closed";
  createdAt: string;
}

// Custom Professional Dropdown Component
const StatusDropdown = ({ 
  currentStatus, 
  onChange 
}: { 
  currentStatus: "New" | "Contacted" | "Closed"; 
  onChange: (status: "New" | "Contacted" | "Closed") => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      // Calculate position relative to the viewport
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 8, // 8px gap below button
        left: rect.right - 144 // Align right edge (144px is w-36)
      });
    }
    setIsOpen(!isOpen);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Contacted": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Closed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const statuses: ("New" | "Contacted" | "Closed")[] = ["New", "Contacted", "Closed"];

  return (
    <div className="inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={`inline-flex items-center justify-between w-32 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 hover:shadow-sm ${getStatusColor(currentStatus)}`}
      >
        <span>{currentStatus}</span>
        <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[9999] w-36 origin-top-right rounded-xl bg-white border border-gray-200 shadow-xl ring-1 ring-black ring-opacity-5"
            style={{ top: coords.top, left: coords.left }}
          >
            <div className="py-1">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onChange(status);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                    currentStatus === status 
                      ? 'bg-gray-50 font-semibold text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/admin/leads');
        const data = await res.json();
        
        if (data.success) {
          setLeads(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  const filteredLeads = filter === "All" 
    ? leads 
    : leads.filter(lead => lead.status === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleStatusChange = async (leadId: string, newStatus: "New" | "Contacted" | "Closed") => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLeads(leads.map(lead => 
          lead._id === leadId ? { ...lead, status: newStatus } : lead
        ));
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const generateMailtoLink = (lead: Lead) => {
    const subject = encodeURIComponent(`Re: Your inquiry about ${lead.service || 'our services'} - BawdicSoft`);
    const body = encodeURIComponent(`Dear ${lead.name},\n\nThank you for reaching out to BawdicSoft. We have received your inquiry regarding ${lead.service || 'our services'}.\n\n[Your message here]\n\nBest regards,\nBawdicSoft Team`);
    return `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        {["All", "New", "Contacted", "Closed"].map((filterName) => (
          <button 
            key={filterName}
            onClick={() => setFilter(filterName)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterName 
                ? "bg-gray-900 text-white" 
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {filterName}
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
              <th className="px-6 py-3 font-medium">Source</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-gray-500 text-xs">{lead.email} • {lead.phone || "No phone"}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.service || "Not specified"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="px-2 py-1 text-xs font-medium   text-purple-700 ">
                      {lead.source || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(lead.createdAt)}</td>
                  <td className="px-6 py-4">
                    <StatusDropdown 
                      currentStatus={lead.status} 
                      onChange={(newStatus) => handleStatusChange(lead._id, newStatus)} 
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="text-brand-600 hover:text-brand-800 font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* LEAD DETAILS MODAL */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedLead.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">Received on {formatDate(selectedLead.createdAt)} via {selectedLead.source}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-gray-900 font-medium break-all">{selectedLead.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
                    <p className="text-gray-900 font-medium">{selectedLead.phone || "Not provided"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Service Interested In</p>
                    <p className="text-gray-900 font-medium">{selectedLead.service || "Not specified"}</p>
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Lead Message</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedLead.message || "No message provided."}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <a 
                    href={generateMailtoLink(selectedLead)}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-center py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Reply via Email
                  </a>
                  {selectedLead.phone && (
                    <a 
                      href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      Message on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}