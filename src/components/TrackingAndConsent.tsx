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
        // invalid JSON
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
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #0c1f33 0%, #0f3b5c 60%, #0e5580 100%);
        color: #ffffff;
        padding: 16px 18px;
        border-radius: 14px;
        box-shadow: 0 16px 40px rgba(2,30,60,0.35), 0 4px 12px rgba(0,0,0,0.18);
        border: 1px solid rgba(125,211,252,0.18);
        z-index: 999999;
        max-width: 380px;
        width: calc(100vw - 40px);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        transition: all 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
        box-sizing: border-box;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      `;

      banner.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <div style="flex:1;min-width:0;">
              <p style="margin:0 0 4px 0;font-size:13.5px;font-weight:600;letter-spacing:-0.1px;color:#ffffff;line-height:1.3;">
                We use cookies
              </p>
              <p style="margin:0;font-size:11.5px;line-height:1.5;color:rgba(224,242,254,0.82);font-weight:400;">
                To enhance your experience and analyze traffic. Read our <a href="/privacy" style="color:#7dd3fc;text-decoration:underline;text-underline-offset:2px;">privacy policy</a>.
              </p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <button id="cookie-accept" style="flex:1;padding:8px 12px;font-size:12px;font-weight:600;color:#0c1f33;background:#ffffff;border:none;border-radius:9px;cursor:pointer;transition:all 0.2s;letter-spacing:0.1px;">Accept</button>
            <button id="cookie-reject" style="padding:8px 12px;font-size:12px;font-weight:500;color:rgba(224,242,254,0.85);background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:9px;cursor:pointer;transition:all 0.2s;letter-spacing:0.1px;">Reject</button>
            <button id="cookie-settings" aria-label="Cookie settings" style="padding:8px 10px;font-size:12px;font-weight:500;color:rgba(224,242,254,0.75);background:transparent;border:none;border-radius:9px;cursor:pointer;transition:all 0.2s;letter-spacing:0.1px;">Settings</button>
          </div>
        </div>
      `;

      document.body.appendChild(banner);

      // hover polish
      const hoverIn = (el: HTMLElement, bg: string) => { el.style.background = bg; };
      const accept = document.getElementById('cookie-accept') as HTMLElement | null;
      const reject = document.getElementById('cookie-reject') as HTMLElement | null;
      const settings = document.getElementById('cookie-settings') as HTMLElement | null;

      accept?.addEventListener('mouseenter', () => hoverIn(accept, '#e0f2fe'));
      accept?.addEventListener('mouseleave', () => hoverIn(accept, '#ffffff'));
      reject?.addEventListener('mouseenter', () => hoverIn(reject, 'rgba(255,255,255,0.16)'));
      reject?.addEventListener('mouseleave', () => hoverIn(reject, 'rgba(255,255,255,0.08)'));
      settings?.addEventListener('mouseenter', () => hoverIn(settings, 'rgba(255,255,255,0.08)'));
      settings?.addEventListener('mouseleave', () => hoverIn(settings, 'transparent'));

      const hide = () => {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(16px) scale(0.96)';
        setTimeout(() => { if (banner.parentNode) banner.remove(); }, 350);
      };

      document.getElementById('cookie-accept')?.addEventListener('click', function () {
        const prefs: Preferences = { necessary: true, functional: true, analytics: true, targeting: true };
        localStorage.setItem('bawdic_cookie_consent', JSON.stringify(prefs));
        setPreferences(prefs);
        hide();
        startTracking();
      });

      document.getElementById('cookie-reject')?.addEventListener('click', function () {
        const prefs: Preferences = { necessary: true, functional: false, analytics: false, targeting: false };
        localStorage.setItem('bawdic_cookie_consent', JSON.stringify(prefs));
        setPreferences(prefs);
        hide();
      });

      document.getElementById('cookie-settings')?.addEventListener('click', function () {
        setShowModal(true);
      });
    }

    function startTracking() {
      console.log('✅ Tracking Active (Public Page)');

      function getCookie(name: string): string | null {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
      }

      function setCookie(name: string, value: string, days: number) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + '; path=/; expires=' + date.toUTCString();
      }

      let sessionId = getCookie('bawdic_session_id');
      if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        setCookie('bawdic_session_id', sessionId, 30);
      }

      fetch('/api/ip')
        .then((res) => res.json())
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
              referrer: document.referrer || 'Direct',
            }),
          }).catch((err: any) => console.log('Track error:', err));
        })
        .catch((err: any) => console.log('IP fetch error:', err));
    }
  }, [isAdmin]);

  if (isAdmin) return null;

  const savePreferences = (prefs: Preferences) => {
    localStorage.setItem('bawdic_cookie_consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowModal(false);
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(16px) scale(0.96)';
      setTimeout(() => { if (banner.parentNode) banner.remove(); }, 350);
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-950 via-sky-800 to-sky-700 text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-[15px] font-semibold tracking-tight">Privacy Preference Center</h2>
                <p className="text-[11.5px] text-sky-200/85 mt-0.5">Manage your cookie preferences</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3 flex-1 overflow-y-auto">
              <p className="text-[12px] text-gray-600 leading-relaxed">
                We use cookies to make the site work and to improve your experience. You can
                choose which categories to allow.
              </p>

              <div className="space-y-2">
                {/* Necessary */}
                <div className="border border-gray-200 rounded-lg px-3.5 py-3 flex items-center justify-between gap-3 bg-gray-50/60">
                  <div className="min-w-0">
                    <p className="font-medium text-[12.5px] text-gray-800">Strictly Necessary</p>
                    <p className="text-[11px] text-gray-500">Required for basic functionality</p>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200 shrink-0">
                    Always On
                  </span>
                </div>

                {/* Functional */}
                <div className="border border-gray-200 rounded-lg px-3.5 py-3 flex items-center justify-between gap-3 hover:border-gray-300 transition-colors">
                  <div className="min-w-0">
                    <p className="font-medium text-[12.5px] text-gray-800">Functional</p>
                    <p className="text-[11px] text-gray-500">Enhanced features & personalization</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => setPreferences((p) => ({ ...p, functional: !p.functional }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-sky-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 peer-focus:ring-2 peer-focus:ring-sky-300" />
                  </label>
                </div>

                {/* Analytics */}
                <div className="border border-gray-200 rounded-lg px-3.5 py-3 flex items-center justify-between gap-3 hover:border-gray-300 transition-colors">
                  <div className="min-w-0">
                    <p className="font-medium text-[12.5px] text-gray-800">Analytics</p>
                    <p className="text-[11px] text-gray-500">Anonymous usage statistics</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-sky-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 peer-focus:ring-2 peer-focus:ring-sky-300" />
                  </label>
                </div>

                {/* Targeting */}
                <div className="border border-gray-200 rounded-lg px-3.5 py-3 flex items-center justify-between gap-3 hover:border-gray-300 transition-colors">
                  <div className="min-w-0">
                    <p className="font-medium text-[12.5px] text-gray-800">Targeting</p>
                    <p className="text-[11px] text-gray-500">Advertising & remarketing</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.targeting}
                      onChange={() => setPreferences((p) => ({ ...p, targeting: !p.targeting }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-sky-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 peer-focus:ring-2 peer-focus:ring-sky-300" />
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-2">
              <button
                onClick={() => savePreferences({ necessary: true, functional: false, analytics: false, targeting: false })}
                className="px-3 py-1.5 text-[12px] font-medium text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
              >
                Reject All
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => savePreferences(preferences)}
                  className="px-3 py-1.5 text-[12px] font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => savePreferences({ necessary: true, functional: true, analytics: true, targeting: true })}
                  className="px-4 py-1.5 text-[12px] font-semibold text-white bg-gradient-to-r from-sky-800 to-sky-600 hover:from-sky-900 hover:to-sky-700 rounded-md shadow-sm hover:shadow transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}