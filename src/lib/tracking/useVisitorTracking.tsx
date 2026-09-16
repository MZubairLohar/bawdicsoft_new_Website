// src/lib/tracking/useVisitorTracking.ts
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import {
  VisitorSignals,
  IntentScore,
  createEmptySignals,
  calculateIntentScore,
} from './intentEngine';

type TrackingContextValue = {
  signals: VisitorSignals;
  intent: IntentScore;
  visitorId: string;
  trackDemoClick: (id: string) => void;
  trackAIProductsView: () => void;
};

const TrackingContext = createContext<TrackingContextValue | null>(null);

// Storage keys
const VISITOR_ID_KEY = 'bawdic_visitor_id';
const VISITOR_SEEN_KEY = 'bawdic_visitor_seen';

// Backend URL (Render)
const BACKEND_URL = 'https://bawdicsoft-agent.onrender.com';

// Config
const AI_PRODUCTS_PATHS = ['/products', '/deep-trace', '/cybercity', '/hashfor'];
const DEMO_SELECTOR = '[data-demo-link]';
const TRIGGER_POLL_MS = 2000;

// ---------- helpers ----------

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function detectTrafficSource(): string {
  if (typeof window === 'undefined') return 'direct';
  const params = new URLSearchParams(window.location.search);
  const utm = params.get('utm_source')?.toLowerCase();
  if (utm) return utm;
  const ref = (document.referrer || '').toLowerCase();
  if (ref.includes('linkedin')) return 'linkedin';
  if (ref.includes('google')) return 'google';
  if (ref.includes('twitter') || ref.includes('x.com')) return 'twitter';
  return 'direct';
}

function checkReturningVisitor(): boolean {
  if (typeof window === 'undefined') return false;
  const seen = localStorage.getItem(VISITOR_SEEN_KEY);
  if (seen) return true;
  localStorage.setItem(VISITOR_SEEN_KEY, '1');
  return false;
}

// ---------- backend helpers ----------

async function sendDwellToBackend(
  visitorId: string,
  page: string,
  dwellMs: number
) {
  if (!visitorId || dwellMs < 1000) return;
  try {
    const payload = JSON.stringify({
      session_id: visitorId,
      page,
      dwell_ms: dwellMs,
    });
    // sendBeacon is most reliable on page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        `${BACKEND_URL}/track`,
        new Blob([payload], { type: 'application/json' })
      );
    } else {
      fetch(`${BACKEND_URL}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* silent */
  }
}

async function checkBackendTrigger(
  visitorId: string,
  page: string
): Promise<{ trigger: boolean; message: string } | null> {
  try {
    const resp = await fetch(
      `${BACKEND_URL}/check-trigger?session_id=${encodeURIComponent(
        visitorId
      )}&page=${encodeURIComponent(page)}`
    );
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

// ---------- provider ----------

export function VisitorTrackingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [signals, setSignals] = useState<VisitorSignals>(() => createEmptySignals());
  const [visitorId, setVisitorId] = useState<string>('');
  const startTimeRef = useRef<number>(Date.now());
  // Per-page dwell tracking
  const pageEnterRef = useRef<number>(Date.now());
  const lastPathRef = useRef<string>('');
  // Prevent multiple triggers in same session
  const triggeredRef = useRef<boolean>(false);

  // 1. Init on mount — visitorId, returning, traffic source
  useEffect(() => {
    const id = getOrCreateVisitorId();
    setVisitorId(id);
    const returning = checkReturningVisitor();
    const source = detectTrafficSource();
    setSignals((prev) => ({
      ...prev,
      isReturning: returning,
      trafficSource: source,
    }));
    pageEnterRef.current = Date.now();
    lastPathRef.current = pathname || '/';
  }, [pathname]);

  // 2. Track page visits + dwell time on route change
  useEffect(() => {
    if (!pathname) return;

    // Send previous page's dwell time before switching
    if (lastPathRef.current && lastPathRef.current !== pathname) {
      const dwell = Date.now() - pageEnterRef.current;
      if (visitorId && dwell > 1000) {
        sendDwellToBackend(visitorId, lastPathRef.current, dwell);
      }
    }

    // Reset timer for new page
    pageEnterRef.current = Date.now();
    lastPathRef.current = pathname;

    setSignals((prev) => {
      const newPages = new Set(prev.visitedPages);
      newPages.add(pathname);
      return {
        ...prev,
        visitedPages: newPages,
        visitedAIProducts:
          prev.visitedAIProducts ||
          AI_PRODUCTS_PATHS.some((p) => pathname.startsWith(p)),
      };
    });
  }, [pathname, visitorId]);

  // 3. Send dwell time on page unload / tab hide
  useEffect(() => {
    const flushDwell = () => {
      if (!visitorId) return;
      const dwell = Date.now() - pageEnterRef.current;
      sendDwellToBackend(visitorId, lastPathRef.current || '/', dwell);
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flushDwell();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('beforeunload', flushDwell);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('beforeunload', flushDwell);
    };
  }, [visitorId]);

  // 4. Poll backend for proactive trigger
  useEffect(() => {
    if (!visitorId) return;

    const interval = setInterval(async () => {
      if (triggeredRef.current) return;
      const page = lastPathRef.current || '/';
      const result = await checkBackendTrigger(visitorId, page);
      if (result?.trigger && result.message) {
        triggeredRef.current = true;
        // Dispatch event so ChatWidget can open
        window.dispatchEvent(
          new CustomEvent('bawdic:proactive-trigger', {
            detail: { message: result.message, page },
          })
        );
      }
    }, TRIGGER_POLL_MS);

    return () => clearInterval(interval);
  }, [visitorId]);

  // 5. Time on site — tick every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setSignals((prev) => ({ ...prev, timeOnSiteSeconds: elapsed }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 6. Scroll depth — track max
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const depth = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));
      setSignals((prev) =>
        depth > prev.maxScrollDepth ? { ...prev, maxScrollDepth: depth } : prev
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 7. Demo link clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(DEMO_SELECTOR);
      if (target) {
        const id = target.getAttribute('data-demo-link') || 'demo';
        setSignals((prev) => {
          const newDemo = new Set(prev.clickedDemoLinks);
          newDemo.add(id);
          return { ...prev, clickedDemoLinks: newDemo };
        });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Live score
  const intent = calculateIntentScore(signals);

  const trackDemoClick = (id: string) => {
    setSignals((prev) => {
      const newDemo = new Set(prev.clickedDemoLinks);
      newDemo.add(id);
      return { ...prev, clickedDemoLinks: newDemo };
    });
  };

  const trackAIProductsView = () => {
    setSignals((prev) => ({ ...prev, visitedAIProducts: true }));
  };

  return (
    <TrackingContext.Provider
      value={{ signals, intent, visitorId, trackDemoClick, trackAIProductsView }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

// ---------- hook ----------

export function useVisitorTracking(): TrackingContextValue {
  const ctx = useContext(TrackingContext);
  if (!ctx) {
    throw new Error(
      'useVisitorTracking must be used inside <VisitorTrackingProvider>'
    );
  }
  return ctx;
}










// // src/lib/tracking/useVisitorTracking.ts
// 'use client';

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
//   ReactNode,
// } from 'react';
// import { usePathname } from 'next/navigation';
// import {
//   VisitorSignals,
//   IntentScore,
//   createEmptySignals,
//   calculateIntentScore,
// } from './intentEngine';

// type TrackingContextValue = {
//   signals: VisitorSignals;
//   intent: IntentScore;
//   visitorId: string;
//   trackDemoClick: (id: string) => void;
//   trackAIProductsView: () => void;
// };

// const TrackingContext = createContext<TrackingContextValue | null>(null);

// // Storage keys
// const VISITOR_ID_KEY = 'bawdic_visitor_id';
// const VISITOR_SEEN_KEY = 'bawdic_visitor_seen';

// // Config
// const AI_PRODUCTS_PATHS = ['/products', '/deep-trace', '/cybercity', '/hashfor'];
// const DEMO_SELECTOR = '[data-demo-link]';

// // ---------- helpers ----------

// function getOrCreateVisitorId(): string {
//   if (typeof window === 'undefined') return '';
//   let id = localStorage.getItem(VISITOR_ID_KEY);
//   if (!id) {
//     id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
//     localStorage.setItem(VISITOR_ID_KEY, id);
//   }
//   return id;
// }

// function detectTrafficSource(): string {
//   if (typeof window === 'undefined') return 'direct';
//   const params = new URLSearchParams(window.location.search);
//   const utm = params.get('utm_source')?.toLowerCase();
//   if (utm) return utm;
//   const ref = (document.referrer || '').toLowerCase();
//   if (ref.includes('linkedin')) return 'linkedin';
//   if (ref.includes('google')) return 'google';
//   if (ref.includes('twitter') || ref.includes('x.com')) return 'twitter';
//   return 'direct';
// }

// function checkReturningVisitor(): boolean {
//   if (typeof window === 'undefined') return false;
//   const seen = localStorage.getItem(VISITOR_SEEN_KEY);
//   if (seen) return true;
//   localStorage.setItem(VISITOR_SEEN_KEY, '1');
//   return false;
// }

// // ---------- provider ----------

// export function VisitorTrackingProvider({ children }: { children: ReactNode }) {
//   const pathname = usePathname();
//   const [signals, setSignals] = useState<VisitorSignals>(() => createEmptySignals());
//   const [visitorId, setVisitorId] = useState<string>('');
//   const startTimeRef = useRef<number>(Date.now());

//   // 1. Init on mount — visitorId, returning, traffic source
//   useEffect(() => {
//     const id = getOrCreateVisitorId();
//     setVisitorId(id);
//     const returning = checkReturningVisitor();
//     const source = detectTrafficSource();
//     setSignals((prev) => ({
//       ...prev,
//       isReturning: returning,
//       trafficSource: source,
//     }));
//   }, []);

//   // 2. Track page visits
//   useEffect(() => {
//     if (!pathname) return;
//     setSignals((prev) => {
//       const newPages = new Set(prev.visitedPages);
//       newPages.add(pathname);
//       return {
//         ...prev,
//         visitedPages: newPages,
//         visitedAIProducts:
//           prev.visitedAIProducts ||
//           AI_PRODUCTS_PATHS.some((p) => pathname.startsWith(p)),
//       };
//     });
//   }, [pathname]);

//   // 3. Time on site — tick every 5s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
//       setSignals((prev) => ({ ...prev, timeOnSiteSeconds: elapsed }));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // 4. Scroll depth — track max
//   useEffect(() => {
//     const onScroll = () => {
//       const doc = document.documentElement;
//       const total = doc.scrollHeight - window.innerHeight;
//       if (total <= 0) return;
//       const depth = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));
//       setSignals((prev) =>
//         depth > prev.maxScrollDepth ? { ...prev, maxScrollDepth: depth } : prev
//       );
//     };
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   // 5. Demo link clicks — any element with [data-demo-link]
//   useEffect(() => {
//     const onClick = (e: MouseEvent) => {
//       const target = (e.target as HTMLElement)?.closest(DEMO_SELECTOR);
//       if (target) {
//         const id = target.getAttribute('data-demo-link') || 'demo';
//         setSignals((prev) => {
//           const newDemo = new Set(prev.clickedDemoLinks);
//           newDemo.add(id);
//           return { ...prev, clickedDemoLinks: newDemo };
//         });
//       }
//     };
//     document.addEventListener('click', onClick);
//     return () => document.removeEventListener('click', onClick);
//   }, []);

//   // Live score
//   const intent = calculateIntentScore(signals);

//   const trackDemoClick = (id: string) => {
//     setSignals((prev) => {
//       const newDemo = new Set(prev.clickedDemoLinks);
//       newDemo.add(id);
//       return { ...prev, clickedDemoLinks: newDemo };
//     });
//   };

//   const trackAIProductsView = () => {
//     setSignals((prev) => ({ ...prev, visitedAIProducts: true }));
//   };

//   return (
//     <TrackingContext.Provider
//       value={{ signals, intent, visitorId, trackDemoClick, trackAIProductsView }}
//     >
//       {children}
//     </TrackingContext.Provider>
//   );
// }

// // ---------- hook ----------

// export function useVisitorTracking(): TrackingContextValue {
//   const ctx = useContext(TrackingContext);
//   if (!ctx) {
//     throw new Error(
//       'useVisitorTracking must be used inside <VisitorTrackingProvider>'
//     );
//   }
//   return ctx;
// }