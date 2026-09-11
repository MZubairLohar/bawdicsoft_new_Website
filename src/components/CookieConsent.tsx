// src/components/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, Shield, Settings, SlidersHorizontal } from 'lucide-react';

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
    document.cookie = `cookie_consent=${JSON.stringify(prefs)}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'functionality_storage': prefs.functional ? 'granted' : 'denied',
        'ad_storage': prefs.targeting ? 'granted' : 'denied',
      });
    }
  };

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return;
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
      {/* ===== COOKIE BANNER (Updated Premium Design) ===== */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-[9999] bg-gradient-to-r from-sky-950 via-sky-700 to-sky-600 text-white rounded-xl p-6 shadow-2xl border border-sky-500/30"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <Shield className="h-6 w-6 text-sky-200" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-1">We value your privacy</h3>
                  <p className="text-sm text-sky-100/90 leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 justify-end">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 text-sm font-medium text-sky-100 hover:text-white bg-transparent hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cookie Settings
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-sky-100 hover:text-white bg-transparent hover:bg-white/10 rounded-lg transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 text-sm font-semibold text-sky-900 bg-white hover:bg-sky-50 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Accept All
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
            className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-sky-950 to-sky-700 text-white p-6 flex items-center justify-between z-10 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-xl">
                    <SlidersHorizontal className="h-6 w-6 text-sky-200" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Privacy Preference Center</h2>
                    <p className="text-sm text-sky-200">Manage your cookie preferences</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    When you visit any website, it may store or retrieve information on your browser, 
                    mostly in the form of cookies. This information might be about you, your preferences, 
                    or your device. Because we respect your right to privacy, you can choose not to allow 
                    some types of cookies.
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
                        className="border border-gray-200 rounded-xl overflow-hidden transition-all shadow-sm"
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
                              <p className="text-xs text-gray-500">{category.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {isNecessary ? (
                              <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200">
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
                                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                              </label>
                            )}
                            <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 bg-gray-50/50">
                            <p className="text-sm text-gray-600 leading-relaxed">
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
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3 rounded-b-2xl">
                <p className="text-xs text-gray-500">
                  Powered by <span className="font-semibold text-sky-700">BawdicSoft</span>
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
                    className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors shadow-sm"
                  >
                    Confirm My Choices
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-700 to-sky-600 hover:from-sky-800 hover:to-sky-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Accept All
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
    color: 'bg-sky-500',
  },
  {
    id: 'functional',
    label: 'Functional Cookies',
    description: 'Enhance your browsing experience',
    details: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, some services may not function properly.',
    icon: Settings,
    color: 'bg-emerald-500',
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