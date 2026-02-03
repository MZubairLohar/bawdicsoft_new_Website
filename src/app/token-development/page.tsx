
import FamousBlockChainSection from "@/components/services/blockChain/tokenDevelop/famousBlockchain";
import HeroSection from "@/components/services/blockChain/tokenDevelop/heroSection";
import InitialTokenOfferSection from "@/components/services/blockChain/tokenDevelop/initialToken";
import OurFrameWorkSection from "@/components/services/blockChain/tokenDevelop/ourFrameWork";
import StandardTokenSection from "@/components/services/blockChain/tokenDevelop/standardsToken";
import TokenOfferSection from "@/components/services/blockChain/tokenDevelop/tokenOffer";
import TrustSection from "@/components/services/blockChain/tokenDevelop/trust";
import WeOfferSection from "@/components/services/blockChain/tokenDevelop/weOffer";
import ChooseSection from "@/components/services/blockChain/tokenDevelop/whyChooseUs";
import { FC } from "react"
interface TokenDevelopmentProps {}

const TokenDevelopment :FC<TokenDevelopmentProps> = () => {
return (<div>
<HeroSection />
<TrustSection />
<WeOfferSection />
<StandardTokenSection />
<InitialTokenOfferSection />
<OurFrameWorkSection />
<TokenOfferSection />
<FamousBlockChainSection />
<ChooseSection />
</div>)
}
export default TokenDevelopment;