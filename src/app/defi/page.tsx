import DescriptionSection from "@/components/services/blockChain/deFi/description";
import HeroSection from "@/components/services/blockChain/deFi/heroSection";
import TokenSection from "@/components/services/blockChain/deFi/ourTokens";
import DefiTokenStanderSection from "@/components/services/blockChain/deFi/tokenStanderds";
import WeOfferSection from "@/components/services/blockChain/deFi/weOffer";
import WhyCoosUS from "@/components/services/blockChain/deFi/whyChosUs";
import { FC } from "react"
interface DeFiProps {}

const DeFi :FC<DeFiProps> = () => {
return (<div>
<HeroSection />
<DescriptionSection />
<TokenSection />
<WeOfferSection />
<DefiTokenStanderSection />
<WhyCoosUS />
</div>)
}
export default DeFi;