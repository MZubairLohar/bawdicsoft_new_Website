"use client";
import React, { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    industry: "",
    challenge: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/admin/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        service: `Strategy Call Request - ${form.industry || 'Unknown Industry'}`,
        message: `Company: ${form.company}, Size: ${form.companySize}, Challenge: ${form.challenge}, Timeline: ${form.timeline}`,
        source: 'Home Page - Book Strategy Call'
      }),
    });

    if (response.ok) {
      console.log("Lead submitted successfully");
      onClose(); // Close modal after successful submission
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-[95%] h-[93%] max-w-md rounded-2xl shadow-2xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          disabled={isSubmitting}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">
          Let's Understand Your Needs
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />

          {/* Work Email */}
          <input
            type="email"
            name="email"
            placeholder="Work Email"
            required
            value={form.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          </div>

          <div className="flex gap-4">
          {/* Company Name */}
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            required
            value={form.company}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />

          {/* Company Size */}
          <select
            name="companySize"
            required
            value={form.companySize}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Company Size</option>
            <option value="1-10">1–10</option>
            <option value="11-50">11–50</option>
            <option value="51-200">51–200</option>
            <option value="201-500">201–500</option>
            <option value="500+">500+</option>
          </select>
          </div>

          {/* Industry */}
          <select
            name="industry"
            required
            value={form.industry}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Industry</option>
            <option value="SaaS">SaaS</option>
            <option value="FinTech">FinTech</option>
            <option value="Other">Other</option>
          </select>

          {/* Biggest Challenge */}
          <textarea
            name="challenge"
            placeholder="Biggest Challenge"
            rows={3}
            required
            value={form.challenge}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />

          {/* Timeline */}
          <select
            name="timeline"
            required
            value={form.timeline}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Timeline</option>
            <option value="Now">Now</option>
            <option value="3-6 months">3–6 months</option>
            <option value="Exploring">Exploring</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Details'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;