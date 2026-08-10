"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select } from "antd";
import {
  Users,
  Mail,
  Phone,
  Sparkles,
  Search,
  Inbox,
  Clock,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

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

const statusStyles: Record<string, string> = {
  New: "bg-sky-100 text-sky-700 ring-sky-200",
  Contacted: "bg-amber-100 text-amber-700 ring-amber-200",
  Closed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

const filterThemes: Record<string, { active: string; dot: string }> = {
  All: {
    active: "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30",
    dot: "bg-white",
  },
  New: {
    active: "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30",
    dot: "bg-sky-400",
  },
  Contacted: {
    active: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30",
    dot: "bg-amber-400",
  },
  Closed: {
    active: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30",
    dot: "bg-emerald-400",
  },
};

// Status dropdown options (color-coded) — uses Ant Design Select for stable, professional UX
const statusOptions = [
  {
    value: "New",
    label: (
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-sky-500" /> New
      </span>
    ),
  },
  {
    value: "Contacted",
    label: (
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500" /> Contacted
      </span>
    ),
  },
  {
    value: "Closed",
    label: (
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Closed
      </span>
    ),
  },
];

// Professional, stable status selector built on Ant Design Select
const StatusDropdown = ({
  currentStatus,
  onChange,
}: {
  currentStatus: "New" | "Contacted" | "Closed";
  onChange: (status: "New" | "Contacted" | "Closed") => void;
}) => {
  return (
    <div className="inline-block text-left w-[130px]">
      <Select
        value={currentStatus}
        onChange={(value) => onChange(value as "New" | "Contacted" | "Closed")}
        options={statusOptions}
        size="small"
        variant="borderless"
        popupMatchSelectWidth={false}
        suffixIcon={<ChevronDown className="h-4 w-4 text-gray-400" />}
        className="w-full"
        style={{
          borderRadius: 9999,
          background:
            currentStatus === "New"
              ? "#e0f2fe"
              : currentStatus === "Contacted"
              ? "#fef3c7"
              : "#d1fae5",
          color:
            currentStatus === "New"
              ? "#0369a1"
              : currentStatus === "Contacted"
              ? "#b45309"
              : "#047857",
          fontWeight: 600,
          fontSize: 12,
          paddingLeft: 8,
        }}
      />
    </div>
  );
};

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/admin/leads");
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

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filter === "All" || lead.status === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.service || "").toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const countByStatus = (status: string) =>
    status === "All" ? leads.length : leads.filter((l) => l.status === status).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleStatusChange = async (
    leadId: string,
    newStatus: "New" | "Contacted" | "Closed"
  ) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLeads(
          leads.map((lead) =>
            lead._id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const generateMailtoLink = (lead: Lead) => {
    const subject = encodeURIComponent(
      `Re: Your inquiry about ${lead.service || "our services"} - BawdicSoft`
    );
    const body = encodeURIComponent(
      `Dear ${lead.name},\n\nThank you for reaching out to BawdicSoft. We have received your inquiry regarding ${lead.service || "our services"}.\n\n[Your message here]\n\nBest regards,\nBawdicSoft Team`
    );
    return `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  const summaryTiles = [
    {
      label: "Total Leads",
      value: leads.length,
      icon: <Users className="h-5 w-5" />,
      gradient: "from-sky-500 via-blue-600 to-indigo-700",
      glow: "bg-sky-400",
    },
    {
      label: "New",
      value: countByStatus("New"),
      icon: <Inbox className="h-5 w-5" />,
      gradient: "from-sky-500 to-blue-600",
      glow: "bg-sky-400",
    },
    {
      label: "Contacted",
      value: countByStatus("Contacted"),
      icon: <MessageSquare className="h-5 w-5" />,
      gradient: "from-amber-500 to-orange-600",
      glow: "bg-amber-400",
    },
    {
      label: "Closed",
      value: countByStatus("Closed"),
      icon: <CheckCircle2 className="h-5 w-5" />,
      gradient: "from-emerald-500 to-teal-600",
      glow: "bg-emerald-400",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
          <div className="absolute inset-0 rounded-full blur-md bg-sky-400/20 animate-glow" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===== Hero Banner ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white p-6 md:p-8 animate-gradient shadow-2xl"
      >
        <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl animate-float" />
        <div className="absolute -bottom-20 left-1/4 w-52 h-52 rounded-full bg-purple-400/20 blur-2xl animate-float-slow" />
        <div className="absolute top-6 right-1/4 w-20 h-20 rounded-full border-2 border-white/20 animate-slow-spin" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 text-xs font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Lead Management
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md">
              CRM Dashboard
              <span className="block text-white/85 text-sm md:text-base font-medium mt-1">
                Track, manage, and convert your leads efficiently.
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold bg-white/15 backdrop-blur-sm ring-1 ring-white/30 rounded-xl px-4 py-3">
            <TrendingUp className="h-4 w-4" />
            <span>{leads.length} total leads</span>
          </div>
        </div>
      </motion.div>

      {/* ===== Summary Stat Tiles ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {summaryTiles.map((tile, idx) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, y: 30, rotateX: -12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="perspective-1000"
          >
            <div className="relative">
              <div
                className={`absolute -inset-1.5 rounded-2xl ${tile.glow} opacity-25 blur-lg animate-glow`}
              />
              <div
                className={`relative rounded-2xl p-4 bg-gradient-to-br ${tile.gradient} text-white shadow-lg card-gloss`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/85">{tile.label}</p>
                    <p className="text-2xl md:text-3xl font-extrabold mt-1">{tile.value}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                    {tile.icon}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== Filters + Search ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row justify-between gap-3"
      >
        <div className="flex gap-2 flex-wrap">
          {["All", "New", "Contacted", "Closed"].map((filterName) => {
            const theme = filterThemes[filterName];
            const isActive = filter === filterName;
            return (
              <button
                key={filterName}
                onClick={() => setFilter(filterName)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? theme.active
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:-translate-y-0.5"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? theme.dot : "bg-gray-300"}`} />
                {filterName}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs ${
                    isActive ? "bg-white/25" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {countByStatus(filterName)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow shadow-sm"
          />
        </div>
      </motion.div>

      {/* ===== Leads Table ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden glass"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 text-gray-500">
<tr>
                <th className="px-6 py-3 font-semibold">Lead</th>
                <th className="px-6 py-3 font-semibold">Source</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
<tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Users className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                    No leads found.
                  </td>
                </tr>
              ) : (
                <AnimatePresence initial={false}>
                  {filteredLeads.map((lead, index) => (
                    <motion.tr
                      key={lead._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gradient-to-r hover:from-sky-50/60 hover:to-transparent transition-colors group"
                    >
<td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{lead.name}</p>
<p className="text-gray-500 text-xs mt-0.5">
                          {lead.email}
                          {lead.phone ? ` • ${lead.phone}` : ""}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex max-w-[160px] items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200 whitespace-nowrap overflow-hidden text-ellipsis">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
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
                          className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-800 font-semibold transition-colors duration-150 whitespace-nowrap"
                        >
                          View Details
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ===== LEAD DETAILS MODAL ===== */}
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
              {/* Gradient Header */}
              <div className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white p-6 md:p-8">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl animate-float" />
                <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10 blur-xl" />
                <div className="flex items-center justify-between relative">
                  <div>
                    <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                      Lead Details
                    </p>
                    <h2 className="text-2xl font-bold mt-1">{selectedLead.name}</h2>
                    <p className="text-sm text-white/85 mt-1">
                      Received on {formatDate(selectedLead.createdAt)} via {selectedLead.source}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ring-1 ring-white/40 ${
                      statusStyles[selectedLead.status] || "bg-white/20 text-white"
                    }`}
                  >
                    {selectedLead.status}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-sky-50 border border-sky-100">
                    <Mail className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Email Address
                      </p>
                      <p className="text-gray-900 font-medium break-all">{selectedLead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <Phone className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Phone Number
                      </p>
                      <p className="text-gray-900 font-medium">
                        {selectedLead.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex items-start gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">
                    <Sparkles className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Service Interested In
                      </p>
                      <p className="text-gray-900 font-medium">
                        {selectedLead.service || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Lead Message
                  </p>
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
                    className="flex-1 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white text-center py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Reply via Email
                  </a>
                  {selectedLead.phone && (
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white text-center py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="h-5 w-5" />
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
