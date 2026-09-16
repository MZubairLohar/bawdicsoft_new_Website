"use client";
import { usePathname } from "next/navigation";
import { VisitorTrackingProvider } from "@/lib/tracking/useVisitorTracking";
import ChatWidget from "@/components/agent-widget/ChatWidget";

export default function ConditionalAgent() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <VisitorTrackingProvider>
      <ChatWidget />
    </VisitorTrackingProvider>
  );
}