// src/components/TrackingAndConsent.tsx
'use client';

import { useState, useEffect } from 'react';

interface Preferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  targeting: boolean;
}

export default function TrackingAndConsent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    necessary: true,
    functional: false,
    analytics: false,
    targeting: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(window.location.pathname.startsWith('/admin'));
    }
  }, []);

  // Cookie Banner + Tracking Logic
  useEffect(() => {
    if (isAdmin) return;

    const consent = localStorage.getItem('bawdic_cookie_consent');

    if (consent) {
      try {
        const parsed = JSON.parse(consent) as Preferences;
        setPreferences(parsed);
        if (parsed.analytics || parsed.functional || parsed.targeting) {
          startTracking();
        }
        return;
      } catch (e) {
        // invalid JSON, show banner
      }
    }

    showConsentBanner();

    function showConsentBanner() {
      const existing = document.getElementById('cookie-consent-banner');
      if (existing) existing.remove();

      const banner = document.createElement('div');
      banner.id = 'cookie-consent-banner';
      banner.style.cssText = `
        position: fixed;
        bottom: 28px;
        left: 28px;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: #1e293b;
        padding: 24px 32px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06);
        border: 1px solid rgba(255,255,255,0.5);
        z-index: 999999;
        max-width: 440px;
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-sizing: border-box;
      `;

      banner.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 28px; line-height: 1;">🍪</span>
              <span style="font-weight: 700; font-size: 18px; color: #0f172a; letter-spacing: -0.3px;">We use cookies</span>
            </div>
            <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0; font-weight: 400;">
              We use cookies to enhance your experience, analyze site traffic, and personalize content. 
              By clicking <strong style="color: #0f172a;">Accept</strong>, you agree to our use of cookies.
            </p>
          </div>
          <div style="display: flex; gap: 10px; margin-top: 4px; flex-wrap: wrap;">
            <button id="cookie-settings" style="flex:1; min-width:100px; background: #f1f5f9; color: #1e293b; border: 1px solid #e2e8f0; padding: 10px 18px; border-radius: 12px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px;">Cookie Settings</button>
            <button id="cookie-accept" style="flex:1.5; min-width:100px; background: #0f172a; color: white; border: none; padding: 10px 24px; border-radius: 12px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px; box-shadow: 0 4px 12px rgba(15,23,42,0.15);">Accept</button>
            <button id="cookie-reject" style="flex:1; min-width:80px; background: transparent; color: #64748b; border: 1px solid #e2e8f0; padding: 10px 16px; border-radius: 12px; font-weight: 500; font-size: 13px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px;">Reject All</button>
          </div>
          <div style="font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: 2px; letter-spacing: 0.2px;">
            You can change your preferences anytime.
          </div>
        </div>
      `;

      document.body.appendChild(banner);

      document.getElementById('cookie-accept')?.addEventListener('click', function() {
        const prefs: Preferences = { necessary: true, functional: true, analytics: true, targeting: true };
        localStorage.setItem('bawdic_cookie_consent', JSON.stringify(prefs));
        setPreferences(prefs);
        banner.style.opacity = '0';
        banner.style.transform = 'translateX(-30px) scale(0.96)';
        setTimeout(() => { if (banner.parentNode) banner.remove(); }, 400);
        startTracking();
      });

      document.getElementById('cookie-reject')?.addEventListener('click', function() {
        const prefs: Preferences = { necessary: true, functional: false, analytics: false, targeting: false };
        localStorage.setItem('bawdic_cookie_consent', JSON.stringify(prefs));
        setPreferences(prefs);
        banner.style.opacity = '0';
        banner.style.transform = 'translateX(-30px) scale(0.96)';
        setTimeout(() => { if (banner.parentNode) banner.remove(); }, 400);
      });

      document.getElementById('cookie-settings')?.addEventListener('click', function() {
        setShowModal(true);
      });
    }

    // 🔥 Tracking Function
    function startTracking() {
      console.log('✅ Tracking Active (Public Page)');

      function getCookie(name: string): string | null {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
      }

      function setCookie(name: string, value: string, days: number) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + "; path=/; expires=" + date.toUTCString();
      }

      let sessionId = getCookie('bawdic_session_id');
      if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        setCookie('bawdic_session_id', sessionId, 30);
      }

      fetch('/api/ip')
        .then(res => res.json())
        .then((data: any) => {
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ip: data.query || data.ip,
              company: data.isp || data.org || 'Unknown',
              city: data.city || 'Unknown',
              country: data.country || data.country_name || 'Location',
              device: navigator.userAgent,
              sessionId: sessionId,
              page: window.location.href,
              referrer: document.referrer || 'Direct'
            })
          }).catch((err: any) => console.log('Track error:', err));

          const city = data.city || 'Unknown';
          const country = data.country || 'Location';
          const company = data.isp || 'Guest';

          const toast = document.createElement('div');
          toast.style.cssText = `
            position: fixed;
            bottom: 28px;
            right: 28px;
            background: rgba(30, 41, 59, 0.92);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            color: #f8fafc;
            padding: 14px 22px;
            border-radius: 16px;
            font-size: 13px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 99999;
            box-shadow: 0 16px 48px rgba(0,0,0,0.25);
            border: 1px solid rgba(255,255,255,0.08);
            max-width: 380px;
            opacity: 0;
            transform: translateY(20px) scale(0.96);
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            pointer-events: none;
          `;
          toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 22px;">🍪</span>
              <div>
                <div style="font-weight: 600; font-size: 13px; color: #e2e8f0; letter-spacing: -0.2px;">Tracking Active</div>
                <div style="font-size: 12px; color: #94a3b8; margin-top: 2px; letter-spacing: -0.1px;">
                  Detected: ${city}, ${country} · ${company}
                </div>
              </div>
              <span style="font-size: 9px; background: rgba(255,255,255,0.08); padding: 2px 10px; border-radius: 20px; color: #94a3b8; letter-spacing: 0.3px; border: 1px solid rgba(255,255,255,0.05);">
                Cookie Set
              </span>
            </div>
          `;
          document.body.appendChild(toast);
          setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0) scale(1)'; }, 200);
          setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px) scale(0.96)';
            setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
          }, 5000);
        })
        .catch((err: any) => console.log('IP fetch error:', err));
    }
  }, [isAdmin]);

  // Admin par kuch mat dikhao
  if (isAdmin) return null;

  const savePreferences = (prefs: Preferences) => {
    localStorage.setItem('bawdic_cookie_consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowModal(false);
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateX(-30px) scale(0.96)';
      setTimeout(() => { if (banner.parentNode) banner.remove(); }, 400);
    }
    if (prefs.analytics || prefs.functional || prefs.targeting) {
      // startTracking will be called on next page load or we can call it directly
      // but we can trigger tracking here as well
      // For simplicity, we rely on useEffect to start tracking when consent changes,
      // but we can also call startTracking directly if needed.
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-[999999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Privacy Preference Center</h2>
                <p className="text-sm text-gray-500">Manage your cookie preferences</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  When you visit any website, it may store or retrieve information on your browser,
                  mostly in the form of cookies. This information might be about you, your preferences,
                  or your device, and is mostly used to make the site work as you expect.
                </p>
              </div>

              <div className="space-y-3">
                {/* Strictly Necessary */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50/50">
                    <div>
                      <p className="font-semibold text-gray-800">Strictly Necessary Cookies</p>
                      <p className="text-xs text-gray-400">Required for basic site functionality</p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Always On</span>
                  </div>
                </div>

                {/* Functional */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-800">Functional Cookies</p>
                      <p className="text-xs text-gray-400">Enhance your browsing experience</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => setPreferences(prev => ({ ...prev, functional: !prev.functional }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Analytics */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-800">Analytics Cookies</p>
                      <p className="text-xs text-gray-400">Help us understand how visitors interact</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Targeting */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-800">Targeting Cookies</p>
                      <p className="text-xs text-gray-400">Used for advertising and personalization</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.targeting}
                        onChange={() => setPreferences(prev => ({ ...prev, targeting: !prev.targeting }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-gray-400">Powered by <span className="font-medium">BawdicSoft</span></p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    const prefs: Preferences = { necessary: true, functional: false, analytics: false, targeting: false };
                    savePreferences(prefs);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => savePreferences(preferences)}
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Confirm My Choices
                </button>
                <button
                  onClick={() => {
                    const prefs: Preferences = { necessary: true, functional: true, analytics: true, targeting: true };
                    savePreferences(prefs);
                  }}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  ACCEPT ALL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}