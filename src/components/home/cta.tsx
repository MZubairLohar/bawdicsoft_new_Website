"use client";

import React, { useState } from "react";

const Cta = () => {
  const [showCalendlyForm, setShowCalendlyForm] = useState(false);
  const [calendlyFormData, setCalendlyFormData] = useState({
    name: "",
    email: "",
    reason: "Book My Free Call"
  });

  const handleCalendlyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Show form first before redirecting
    setShowCalendlyForm(true);
  };

  const handleCalendlySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save lead data to backend
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: calendlyFormData.name,
          email: calendlyFormData.email,
          service: calendlyFormData.reason,
          source: 'CTA Button - Book My Free Call'
        }),
      });
      
      if (response.ok) {
        // Redirect to Calendly after saving data
        window.open("https://calendly.com/lishayarain087/30min", "_blank");
        setShowCalendlyForm(false);
        setCalendlyFormData({ name: "", email: "", reason: "Book My Free Call" });
      }
    } catch (error) {
      console.error("Error saving lead:", error);
      // Still redirect to Calendly even if saving fails
      window.open("https://calendly.com/lishayarain087/30min", "_blank");
      setShowCalendlyForm(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+923178866631", "_blank");
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="relative w-[80%] bg-gradient-to-r from-blue-500 to-cyan-700 rounded-2xl p-8 md:p-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="relative text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white leading-relaxed">
            Ready to Build Something Powerful?
          </h3>

          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-6">
            Book your 15-minute call with Syed Bilal — CEO of BawdicSoft. No sales pitch. Just clarity on your next step.
          </p>

          {/* 2 Buttons Container */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            
            <button 
              onClick={handleCalendlyClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 hover:bg-gray-100 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Book My Free Call →
            </button>

            {/* Secondary Button: WhatsApp */}
            <button 
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              WhatsApp Us Directly →
            </button>

          </div>
        </div>
      </div>

      {/* Calendly Form Modal */}
      {showCalendlyForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white w-[95%] max-w-md rounded-2xl shadow-2xl p-8 relative">
            <button
              onClick={() => setShowCalendlyForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-6 text-center">
              Schedule Your Free Call
            </h2>

            <form onSubmit={handleCalendlySubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={calendlyFormData.name}
                onChange={(e) => setCalendlyFormData({...calendlyFormData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Work Email"
                required
                value={calendlyFormData.email}
                onChange={(e) => setCalendlyFormData({...calendlyFormData, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Confirm & Proceed to Calendar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cta;