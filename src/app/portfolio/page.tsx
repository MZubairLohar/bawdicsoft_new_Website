// ✅ SEO Metadata
export const metadata = {
  title: "Portfolio | AI & Blockchain Projects — BawdicSoft",
  description: "Explore BawdicSoft's portfolio — AI detection tools, DeFi platforms, NFT marketplaces, and enterprise web apps built for global clients.",
  keywords: [
    "AI portfolio, blockchain portfolio, Deep-Trace AI, CyberCity AI, NFT marketplace, DeFi platform"
  ],
  alternates: {
    canonical: "https://www.bawdicsoft.com/portfolio"
  },
  robots: "index, follow",
  openGraph: {
    title: "Portfolio Bawdicsoft LLC Pvt. Ltd.",
    description: "Explore BawdicSoft's portfolio of enterprise-grade AI, blockchain, and web solutions.",
    url: "https://www.bawdicsoft.com/portfolio",
    siteName: "Bawdicsoft",
    images: [
      {
        url: "https://www.bawdicsoft.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio Bawdicsoft LLC Pvt. Ltd."
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Bawdicsoft LLC Pvt. Ltd.",
    description: "Explore BawdicSoft's portfolio of enterprise-grade AI, blockchain, and web solutions.",
    images: ["https://www.bawdicsoft.com/twitter-image.jpg"]
  }
};

// ✅ Imports
import HeroSection from "@/components/portFolio/HeroSection";
import AgencyPortfolio from "@/components/portFolio/AgencyPortfolio";
import ProductServices from "@/components/portFolio/porductPortFolio";

export default function PortfolioPage() {
  return (
    <>
      <HeroSection />
      <AgencyPortfolio />
      {/* Optional: Keep ProductServices if you want to show it below the portfolio list */}
      <ProductServices />
    </>
  );
}