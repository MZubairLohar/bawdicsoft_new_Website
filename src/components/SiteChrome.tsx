"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from '@/components/WhatsAppButton';

// Minimal, privacy-friendly visitor tracking.
// Records a site "open" once per session (deduped via cookie server-side)
// and counts meaningful clicks (WhatsApp, contact, links) as interactions.
// No personal data or IP addresses are stored.
function useTracking(pathname: string) {
  useEffect(() => {
    if (!pathname) return;

    // Exclude dashboard/auth routes from public tracking.
    const isDashboardRoute =
      pathname.startsWith('/admin') ||
      pathname.startsWith('/employee') ||
      pathname.startsWith('/auth') ||
      pathname === '/login' ||
      pathname === '/signup';
    if (isDashboardRoute) return;

    // Fire page-open tracking once (server dedupes per session via cookie).
    fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'visit', path: pathname }),
      keepalive: true,
    }).catch(() => {});

    // Track clicks on interactive elements as interactions.
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"]');
      if (!interactive) return;

      let label = 'click';
      const text = (interactive.textContent || '').trim().slice(0, 40);
      const href = (interactive as HTMLAnchorElement).href || '';
      if (href.includes('wa.me')) label = 'whatsapp';
      else if (text.toLowerCase().includes('contact')) label = 'contact';
      else if (text) label = text;

      fetch('/api/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'interaction', label }),
        keepalive: true,
      }).catch(() => {});
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hook only works inside a component body, so call it here.
  useTracking(pathname || '');

  // Dashboard / auth routes where the public navbar, footer, and WhatsApp button are hidden.
  // These pages render their own self-contained layout (e.g. admin/employee sidebars with Logout).
  const isDashboardRoute =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/employee') ||
    pathname?.startsWith('/auth/login') ||
    pathname?.startsWith('/auth') ||
    pathname === '/login' ||
    pathname === '/signup';

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
