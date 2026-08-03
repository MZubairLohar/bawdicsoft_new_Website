"use client";

import Link from "next/link";

export default function LeadDetailsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
      <p className="text-gray-500 mt-2">This page is under construction.</p>
      <Link href="/admin/crm" className="mt-4 inline-block text-brand-600 hover:text-brand-700 font-medium">
        ← Back to Leads
      </Link>
    </div>
  );
}
