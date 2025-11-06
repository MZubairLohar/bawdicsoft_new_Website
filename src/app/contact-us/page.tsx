// ✅ SEO Metadata
// ✅ SEO Metadata
export const metadata = {
  title: "BawdicSoft: Expert Blockchain & Mobile Development Services",
  description: "Contact BawdicSoft for top-notch blockchain and mobile development services. Let's discuss your project today!",
  keywords: [
    "bawdicsoft",
    "your",
    "with",
    "blockchain",
    "development",
    "services",
    "contact",
    "mobile"
  ],
  openGraph: {
    title: "BawdicSoft: Expert Blockchain & Mobile Development Services",
    description: "Contact BawdicSoft for top-notch blockchain and mobile development services. Let's discuss your project today!",
    url: "https://bawdicsoft-new-website.vercel.app/contact-us",
    siteName: "Sigmantarian",
    images: [
      {
        url: "https://bawdicsoft-new-website.vercel.app/contact-us/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "BawdicSoft: Expert Blockchain & Mobile Development Services"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BawdicSoft: Expert Blockchain & Mobile Development Services",
    description: "Contact BawdicSoft for top-notch blockchain and mobile development services. Let's discuss your project today!",
    images: ["https://bawdicsoft-new-website.vercel.app/contact-us/twitter-image.jpg"]
  }
};



import FormSection from "@/components/contactUs/formSection";
import GetInTouchWithUs from "@/components/contactUs/getInTouch";
import HeroSection from "@/components/contactUs/heroSection";
import MapSection from "@/components/contactUs/mapSection";
import { FC } from "react"
interface contactUsProps {}

const ContactUs :FC<contactUsProps> = () => {
return (<div>
  <HeroSection />
  <MapSection />
  <FormSection />
  <GetInTouchWithUs />
</div>)
}
export default ContactUs;