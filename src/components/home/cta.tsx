"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Calendar, Send, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const Cta = () => {
  const [showCalendlyForm, setShowCalendlyForm] = useState(false);
  const [calendlyFormData, setCalendlyFormData] = useState({
    name: "",
    email: "",
    reason: "Book My Free Call",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCalendlyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCalendlyForm(true);
    setSubmitted(false);
  };

  const handleCalendlySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. EmailJS Se Auto-Reply Bhejen
    const templateParams = {
      email: calendlyFormData.email,
    };

    emailjs
      .send(
        "service_2m771jj",
        "template_1xw3gfl",
        templateParams,
        "z4o5tgemFmCOfORaC"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("EmailJS Exact Error:", JSON.stringify(error));
      });

    // 2. Database Me Lead Save Karein
    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: calendlyFormData.name || "Website Lead", // Name required error fix
          email: calendlyFormData.email,
          service: calendlyFormData.reason,
          source: "CTA Button - Book My Free Call",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        
        // Calendly wala redirect hata diya hai. Ab bas 3 second baad modal band ho jayega
        setTimeout(() => {
          setShowCalendlyForm(false);
          setCalendlyFormData({ name: "", email: "", reason: "Book My Free Call" });
          setSubmitted(false);
        }, 3000); // 3 second ka delay
      }
    } catch (error) {
      console.error("Error saving lead:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+923178866631", "_blank");
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="relative w-[80%] bg-gradient-to-r from-blue-500 to-cyan-700 rounded-2xl p-8 md:p-12 overflow-hidden">
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
            Book your 30-minute call with Syed Bilal — CEO of BawdicSoft. No sales pitch. Just clarity on your next step.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={handleCalendlyClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 hover:bg-gray-100 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Book My Free Call →
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              WhatsApp Us Directly →
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showCalendlyForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            onClick={() => setShowCalendlyForm(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-sky-100/70 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

              <button
                onClick={() => setShowCalendlyForm(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>

              <div className="relative p-7 sm:p-8">
                {!submitted ? (
                  <>
                    <div className="flex justify-center mb-5">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 blur-md opacity-40" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                          <Calendar className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </div>

                    <h2 className="text-center text-2xl font-bold text-gray-900 tracking-tight">
                      Schedule Your Free Call
                    </h2>
                    <p className="text-center text-sm text-gray-500 mt-2 leading-relaxed max-w-sm mx-auto">
                      Just 30 minutes with our CEO. No sales pitch — pure clarity on your next step.
                    </p>

                    <form onSubmit={handleCalendlySubmit} className="mt-6 space-y-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          placeholder="Your work email"
                          required
                          value={calendlyFormData.email}
                          onChange={(e) =>
                            setCalendlyFormData({ ...calendlyFormData, email: e.target.value })
                          }
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition-all text-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                      >
                        {loading ? (
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Confirm & Proceed
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                      <p className="text-[11px] text-gray-400">
                        🔒 Your details are safe. No spam, ever.
                      </p>
                    </div>
                  </>
                ) : (
                  // Naya Success State (Calendly ke bina)
                  <div className="py-4 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Request Received!</h4>
                    <p className="text-sm text-gray-500 mt-2">
                      Thank you! We've received your details. Our team will get back to you very soon.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cta;