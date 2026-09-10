'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Sparkles } from 'lucide-react';

export default function PopupCapture() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(window.location.pathname.startsWith('/admin'));
    }
  }, []);

  // All hooks called every time
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isAdmin) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('popup_submitted')) {
        setIsOpen(true);
      }
    };

    // 🔥 Time-based trigger (30 seconds on page)
    const timer = setTimeout(() => {
      if (!localStorage.getItem('popup_submitted') && !isOpen) {
        setIsOpen(true);
      }
    }, 30000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [isAdmin, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isAdmin) return;
    setLoading(true);
    try {
      const res = await fetch('/api/lead-popup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Exit-Intent Popup' }),
      });
      if (res.ok) {
        setSubmitted(true);
        localStorage.setItem('popup_submitted', 'true');
        setTimeout(() => setIsOpen(false), 4000);
      } else {
        alert('Something went wrong.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  // No early return – conditional rendering in JSX
  if (isAdmin) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow Effects */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 ring-1 ring-black/5"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            {/* Content */}
            <div className="relative z-10 p-8 text-center">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 mb-5">
                <Sparkles className="h-8 w-8" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                Get Your Free Consultation
              </h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-sm mx-auto">
                Talk to our senior AI expert. No strings attached.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      autoComplete="email"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Claim Your Session
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-gray-400 mt-3">
                    🔒 No spam. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <div className="mt-6 py-6 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">You're In! 🎉</h4>
                  <p className="text-sm text-gray-500">
                    A confirmation email has been sent to <br />
                    <span className="font-semibold text-gray-700">{email}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    We'll reach out within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}