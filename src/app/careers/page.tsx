// ✅ SEO Metadata
// ✅ SEO Metadata
export const metadata = {
  title: "BawdicSoft Careers: Join Our Innovative Development Team",
  description: "Explore exciting career opportunities at BawdicSoft. Join us to integrate your skills and experience with our dynamic team. Apply today!",
  keywords: [
    "with",
    "bawdicsoft",
    "your",
    "experience",
    "team",
    "responsibilities",
    "requirements",
    "developer"
  ],
  openGraph: {
    title: "BawdicSoft Careers: Join Our Innovative Development Team",
    description: "Explore exciting career opportunities at BawdicSoft. Join us to integrate your skills and experience with our dynamic team. Apply today!",
    url: "https://bawdicsoft-new-website.vercel.app/careers",
    siteName: "Sigmantarian",
    images: [
      {
        url: "https://bawdicsoft-new-website.vercel.app/careers/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "BawdicSoft Careers: Join Our Innovative Development Team"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BawdicSoft Careers: Join Our Innovative Development Team",
    description: "Explore exciting career opportunities at BawdicSoft. Join us to integrate your skills and experience with our dynamic team. Apply today!",
    images: ["https://bawdicsoft-new-website.vercel.app/careers/twitter-image.jpg"]
  }
};




import FormSection from "@/components/careers/form";
import HeroSection from "@/components/careers/heroSectin";
import RecruitmentSection from "@/components/careers/recruitmentSection";
import GetInTouchWithUs from "@/components/contactUs/getInTouch";
import { FC } from "react"
interface careersProps {}

const Careers :FC<careersProps> = () => {
return (<div>
 <HeroSection />
 <RecruitmentSection/>
 <FormSection />
 <GetInTouchWithUs />
</div>)
}
export default Careers;