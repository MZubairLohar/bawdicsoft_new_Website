import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Script from "next/script";
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "BawdicSoft | AI, Blockchain & Web Development Agency — Karachi",
    template: "%s | BawdicSoft",
  },
  description: "BawdicSoft delivers enterprise-grade AI solutions, blockchain development, and web applications. 250+ projects. 15+ countries. ISO 27001 certified. Get a free consultation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - Restored to original ID: G-HDV25HSV2B */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HDV25HSV2B"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HDV25HSV2B');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <WhatsAppButton/>
        <Footer />
      </body>
    </html>
  );
}