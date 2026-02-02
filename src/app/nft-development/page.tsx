
import HelpSections from "@/components/services/blockChain/nft/nftDevelopment/help";
import HeroSection from "@/components/services/blockChain/nft/nftDevelopment/heroSection";
import IntegratSection from "@/components/services/blockChain/nft/nftDevelopment/integrateNft";
import NeedNft from "@/components/services/blockChain/nft/nftDevelopment/needNft";
import OfferSection from "@/components/services/blockChain/nft/nftDevelopment/offer";
import Expertise from "@/components/home/expertiseblockchain";
import { FC } from "react"
interface NfDevelopmentProps {}

const NfDevelopment :FC<NfDevelopmentProps> = () => {
return (<div>
<HeroSection />
<NeedNft />
<Expertise />
<OfferSection />
<IntegratSection />
<HelpSections />
</div>)
}
export default NfDevelopment;