
import HeroSection from "@/components/services/Ecommerce/heroSection";
import PlatFormSection from "@/components/services/Ecommerce/platForm";
import TeamSection from "@/components/services/Ecommerce/team";
import { FC } from "react"
interface WebApplicationProps {}

const EcommerceSection :FC<WebApplicationProps> = () => {
return (<div>
<HeroSection />
<TeamSection />
<PlatFormSection />
</div>)
}
export default EcommerceSection;