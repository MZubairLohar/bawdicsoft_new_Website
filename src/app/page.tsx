// ✅ SEO Metadata
// ✅ SEO Metadata
// ✅ SEO Metadata
export const metadata = {
  title: "BawdicSoft: Leading Blockchain & Web3 Development Solutions",
  description: "Unlock your business potential with BawdicSoft's innovative blockchain and web3 application development solutions. Elevate your online presence today!",
  keywords: [
    "your",
    "development",
    "application",
    "bawdicsoft",
    "blockchain",
    "solutions",
    "with",
    "website"
  ],
  openGraph: {
    title: "BawdicSoft: Leading Blockchain & Web3 Development Solutions",
    description: "Unlock your business potential with BawdicSoft's innovative blockchain and web3 application development solutions. Elevate your online presence today!",
    url: "https://bawdicsoft-new-website.vercel.app/",
    siteName: "Sigmantarian",
    images: [
      {
        url: "https://bawdicsoft-new-website.vercel.app/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "BawdicSoft: Leading Blockchain & Web3 Development Solutions"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BawdicSoft: Leading Blockchain & Web3 Development Solutions",
    description: "Unlock your business potential with BawdicSoft's innovative blockchain and web3 application development solutions. Elevate your online presence today!",
    images: ["https://bawdicsoft-new-website.vercel.app/twitter-image.jpg"]
  }
};




import Footer from "@/components/footer";
import Expertise from "@/components/home/expertise";
import OurTeam from "@/components/home/team";
import HeroSection from "@/components/home/heoSection";
import OfferSection from "@/components/home/offer";
import SevicesOffer from "@/components/home/servicesOffer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
  <HeroSection />
  <OfferSection />
  <Expertise />
  <SevicesOffer />
  <OurTeam />
    </>
  )
}