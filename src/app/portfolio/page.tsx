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