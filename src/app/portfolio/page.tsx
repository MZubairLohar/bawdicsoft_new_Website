// ✅ SEO Metadata
// ✅ SEO Metadata
export const metadata = {
  title: "BawdicSoft: Innovative Currency Exchange & Development Services",
  description: "Discover BawdicSoft's portfolio showcasing cutting-edge currency exchange solutions and development services tailored to your needs. Explore now!",
  keywords: [
    "bawdicsoft",
    "currency",
    "exchange",
    "services",
    "development",
    "portfolio",
    "your"
  ],
  openGraph: {
    title: "BawdicSoft: Innovative Currency Exchange & Development Services",
    description: "Discover BawdicSoft's portfolio showcasing cutting-edge currency exchange solutions and development services tailored to your needs. Explore now!",
    url: "https://bawdicsoft-new-website.vercel.app/portfolio",
    siteName: "Sigmantarian",
    images: [
      {
        url: "https://bawdicsoft-new-website.vercel.app/portfolio/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "BawdicSoft: Innovative Currency Exchange & Development Services"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BawdicSoft: Innovative Currency Exchange & Development Services",
    description: "Discover BawdicSoft's portfolio showcasing cutting-edge currency exchange solutions and development services tailored to your needs. Explore now!",
    images: ["https://bawdicsoft-new-website.vercel.app/portfolio/twitter-image.jpg"]
  }
};



import HeroSection from "@/components/portFolio/heroSection";
// import OurWorks from "@/components/portFolio/ourWorks";
import ProductServices from "@/components/portFolio/porductPortFolio";
import PortFolioSection from "@/components/portFolio/portFoliSection";
import { FC } from "react"
interface portFolioProps {}

const PortFolio :FC<portFolioProps> = () => {
return (<div>
<HeroSection />
<ProductServices />
{/* <OurWorks /> */}
<PortFolioSection />
</div>)
}
export default PortFolio;