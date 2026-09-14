"use client";
import React, { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    email: "",
    company: "",
    companySize: "",
    industry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.company || "Unknown",
          email: form.email,
          service: `Strategy Call Request - ${form.industry || "Unknown Industry"}`,
          message: `Company: ${form.company}, Size: ${form.companySize}`,
          source: "Home Page - Book Strategy Call",
        }),
      });

      if (response.ok) {
        console.log("Lead submitted successfully");
        onClose();
      } else {
        alert("Failed to submit your information. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
        {/* Gradient Top Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
        >
          ✕
        </button>

        <div className="px-6 pt-6 pb-7">
          {/* Header */}
          <div className="mb-5 text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Let's Understand Your Needs
            </h2>
            <p className="mt-1 text-xs text-gray-500">
             Book now — 15 min strategy call, zero pitch, just clarity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Work Email */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Work Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                required
                value={form.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Company Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  required
                  value={form.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
                />
              </div>

              {/* Company Size */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Team Size
                </label>
                <div className="relative">
                  <select
                    name="companySize"
                    required
                    value={form.companySize}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 pr-9 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
                  >
                    <option value="">Select</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value="201-500">201–500</option>
                    <option value="500+">500+</option>
                  </select>
                  {/* Custom Arrow */}
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Industry
              </label>
              <div className="relative">
                <select
                  name="industry"
                  required
                  value={form.industry}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 pr-9 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
                >
                  <option value="">Select your industry</option>
                  <option value="SaaS">SaaS</option>
                  <option value="FinTech">FinTech</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="EdTech">EdTech</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Travel & Hospitality">Travel & Hospitality</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Marketing Agency">Marketing Agency</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Media & Entertainment">Media & Entertainment</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Telecom">Telecom</option>
                  <option value="Energy">Energy</option>
                  <option value="Other">Other</option>
                </select>
                {/* Custom Arrow */}
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {isSubmitting ? "Submitting..." : "Book My Strategy Call"}
            </button>

            <p className="pt-1 text-center text-[11px] text-gray-400">
              We respect  your privacy. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;