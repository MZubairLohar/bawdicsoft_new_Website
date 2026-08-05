"use client";
import React, { useState } from "react";

export default function LeadMagnet() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    projectType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          name: formData.name,
          email: formData.email,
          service: formData.projectType,
          message: `Website: ${formData.website}`,
          source: 'Lead Magnet - Free AI & Web Readiness Audit'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form after successful submission
        setFormData({ name: "", email: "", website: "", projectType: "" });
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

  if (submitted) {
    return (
      <section className="bg-green-500 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Thank You!
          </h2>
          <p className="text-gray-200 text-lg md:text-xl mb-12">
            We've received your details. Our team will contact you shortly to schedule your free AI & Web Readiness Audit.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-white text-green-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Submit Another Request →
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-blue-500 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Not Sure Where AI Can Help Your Business?
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-12">
          Get a Free AI & Web Readiness Audit. We'll identify exactly where AI or automation can save you time and money — at no cost.
        </p>

        {/* Lead Magnet Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-8 rounded-2xl shadow-xl">
          <input 
            type="text" 
            name="name"
            placeholder="Your Full Name" 
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your Business Email" 
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="url" 
            name="website"
            placeholder="Your Website URL (optional)" 
            value={formData.website}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg" 
          />
          <select 
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg"
          >
            <option value="">What Are You Looking to Build?</option>
            <option value="AI Automation">AI Automation</option>
            <option value="Web Application">Web Application</option>
            <option value="Security Audit">Security Audit</option>
            <option value="Other">Other</option>
          </select>
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`md:col-span-2 bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Provide your details →'}
          </button>
        </form>
      </div>
    </section>
  );
}