// Shared UI helper classes for consistent dashboard styling

// Status badge color mappings
export const statusBadge: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "On Leave": "bg-amber-100 text-amber-700",
  Inactive: "bg-gray-100 text-gray-600",
  Present: "bg-green-100 text-green-700",
  Absent: "bg-red-100 text-red-700",
  Late: "bg-amber-100 text-amber-700",
  "Half Day": "bg-yellow-100 text-yellow-700",
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export function badgeClass(status?: string): string {
  return (
    statusBadge[status || ""] ||
    "bg-gray-100 text-gray-600"
  );
}

// Base badge element styling
export const badgeBase =
  "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap";

// Standard table wrapper — responsive horizontal scroll
export const tableWrapper = "overflow-x-auto";

// Standard table element
export const tableClass =
  "w-full text-left text-sm min-w-[640px]";

export const theadClass = "bg-gray-50 text-gray-500";

export const thClass =
  "px-6 py-3 font-medium whitespace-nowrap";

export const tbodyClass = "divide-y divide-gray-100";

export const trHover =
  "hover:bg-gray-50 transition-colors duration-150";

export const tdClass = "px-6 py-4";

// Standard input control
export const inputClass =
  "px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm bg-white";

// Standard button variants
export const btnBase =
  "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

export const btnPrimary = `${btnBase} bg-brand-600 hover:bg-brand-700 text-white`;
export const btnSecondary = `${btnBase} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50`;
export const btnDanger = `${btnBase} bg-white text-red-600 border border-red-200 hover:bg-red-50`;

// Card
export const cardClass =
  "bg-white rounded-xl border border-gray-200 shadow-sm";

// Live status dot (pulsing)
export const pulseDot = (color: string) =>
  `relative inline-flex h-2.5 w-2.5 mr-2`;
