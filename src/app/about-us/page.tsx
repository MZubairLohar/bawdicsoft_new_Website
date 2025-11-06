// ✅ SEO Metadata
export const metadata = {
  title: "BawdicSoft: Innovative Digital Solutions for Your Business",
  description: "Explore BawdicSoft's cutting-edge technology and services. Empower your business with our innovative digital solutions today!",
  keywords: [
    "bawdicsoft",
    "technology",
    "your",
    "services",
    "about",
    "digital",
    "solutions",
    "with"
  ],
  openGraph: {
    title: "BawdicSoft: Innovative Digital Solutions for Your Business",
    description: "Explore BawdicSoft's cutting-edge technology and services. Empower your business with our innovative digital solutions today!",
    url: "https://www.bawdicsoft.com/about-us",
    siteName: "Sigmantarian",
    images: [
      {
        url: "https://www.bawdicsoft.com/about-us/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "BawdicSoft: Innovative Digital Solutions for Your Business"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BawdicSoft: Innovative Digital Solutions for Your Business",
    description: "Explore BawdicSoft's cutting-edge technology and services. Empower your business with our innovative digital solutions today!",
    images: ["https://www.bawdicsoft.com/about-us/twitter-image.jpg"]
  }
};


import DocumtentsSectins from "@/components/aboutUs/document";
import HeroSection from "@/components/aboutUs/heroSection";
import OurSevices from "@/components/aboutUs/ourServices";
import OurVisionMission from "@/components/aboutUs/ourVisionMision";
import { FC } from "react";

interface aboutUsProps {}

 const AboutUs :FC<aboutUsProps> = () => {
  return (
    <>
   <div>
    <HeroSection />
    <DocumtentsSectins />
    <OurVisionMission />
    <OurSevices />
   </div>
    </>
  )
}

export default AboutUs;
