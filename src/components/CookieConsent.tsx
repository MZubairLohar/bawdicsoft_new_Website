// src/components/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, Shield, Cookie } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  targeting: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    targeting: false,
  });
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already gave consent
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const parsed = JSON.parse(consent);
        setPreferences(parsed);
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      targeting: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie_consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowModal(false);
    
    // Apply cookies based on preferences
    applyCookiePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const rejected = {
      necessary: true,
      functional: false,
      analytics: false,
      targeting: false,
    };
    setPreferences(rejected);
    localStorage.setItem('cookie_consent', JSON.stringify(rejected));
    setShowBanner(false);
    setShowModal(false);
    
    applyCookiePreferences(rejected);
  };

  const handleConfirmChoices = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowModal(false);
    
    applyCookiePreferences(preferences);
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Set cookie consent in document.cookie for backend
    document.cookie = `cookie_consent=${JSON.stringify(prefs)}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    // Trigger GA4 consent update
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'functionality_storage': prefs.functional ? 'granted' : 'denied',
        'ad_storage': prefs.targeting ? 'granted' : 'denied',
      });
    }
  };

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return; // Always enabled
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleExpand = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* ===== COOKIE BANNER ===== */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl p-4 md:p-6"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-2 rounded-full shrink-0">
                  <Cookie className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    🍪 We use cookies
                  </p>
                  <p className="text-sm text-gray-500 max-w-2xl">
                    We use cookies and similar technologies as set out in our Cookie Notice. 
                    By clicking <strong>ACCEPT</strong>, you agree to our use of optional cookies 
                    and similar technologies for the purposes set out in our Cookie Notice.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cookie Settings
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  ACCEPT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== PRIVACY PREFERENCE CENTER (MODAL) ===== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-xl">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Privacy Preference Center</h2>
                    <p className="text-sm text-gray-500">Manage your cookie preferences</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    When you visit any website, it may store or retrieve information on your browser, 
                    mostly in the form of cookies. This information might be about you, your preferences, 
                    or your device, and is mostly used to make the site work as you expect. 
                    The information does not usually identify you directly, but it can give you a more 
                    personalized web experience. Because we respect your right to privacy, you can choose 
                    not to allow some types of cookies.
                  </p>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-3">
                  {cookieCategories.map((category) => {
                    const isNecessary = category.id === 'necessary';
                    const isEnabled = preferences[category.id as keyof CookiePreferences];
                    const isExpanded = expandedCategory === category.id;
                    const Icon = category.icon;

                    return (
                      <div
                        key={category.id}
                        className="border border-gray-200 rounded-xl overflow-hidden transition-all"
                      >
                        <div
                          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition-colors ${
                            isExpanded ? 'bg-gray-50/80' : ''
                          }`}
                          onClick={() => toggleExpand(category.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${category.color} bg-opacity-10`}>
                              <Icon className={`h-5 w-5 ${category.color.replace('bg-', 'text-')}`} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{category.label}</p>
                              <p className="text-xs text-gray-400">{category.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {isNecessary ? (
                              <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                Always On
                              </span>
                            ) : (
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isEnabled}
                                  onChange={() => toggleCategory(category.id as keyof CookiePreferences)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            )}
                            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1">
                            <p className="text-sm text-gray-500 leading-relaxed">
                              {category.details}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-gray-400">
                  Powered by <span className="font-medium">BawdicSoft</span>
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleConfirmChoices}
                    className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  >
                    Confirm My Choices
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    ACCEPT
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ===== Category Data =====
const cookieCategories = [
  {
    id: 'necessary',
    label: 'Strictly Necessary Cookies',
    description: 'Required for basic site functionality',
    details: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot disable these cookies.',
    icon: Shield,
    color: 'bg-blue-500',
  },
  {
    id: 'functional',
    label: 'Functional Cookies',
    description: 'Enhance your browsing experience',
    details: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, some services may not function properly.',
    icon: Cookie,
    color: 'bg-green-500',
  },
  {
    id: 'analytics',
    label: 'Analytics Cookies',
    description: 'Help us understand how visitors interact',
    details: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and provide better user experiences. We use tools like Google Analytics.',
    icon: ChevronDown,
    color: 'bg-purple-500',
  },
  {
    id: 'targeting',
    label: 'Targeting Cookies',
    description: 'Used for advertising and personalization',
    details: 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device.',
    icon: ChevronUp,
    color: 'bg-amber-500',
  },
];