import BenifiteNftSection from "@/components/services/blockChain/nft/nftMarketPlace/benifitesNFt";
import FullStackSection from "@/components/services/blockChain/nft/nftMarketPlace/fullStackServices";
import HeroSection from "@/components/services/blockChain/nft/nftMarketPlace/heroSection";
import OurServicesSection from "@/components/services/blockChain/nft/nftMarketPlace/ourServices";
import PartnerChoiceSection from "@/components/services/blockChain/nft/nftMarketPlace/partnerChoice";
import TechnologySection from "@/components/services/blockChain/nft/nftMarketPlace/technology";
import TokenSection from "@/components/services/blockChain/nft/nftMarketPlace/token";
import WhyUsSection from "@/components/services/blockChain/nft/nftMarketPlace/whyUs";
import { FC } from "react";

interface nftMarketPlaceDevelpmentProps {}

const NftMarketPlaceDevelpment : FC<nftMarketPlaceDevelpmentProps> = () => {
    return (<div>
        <HeroSection />
        <FullStackSection />
        <BenifiteNftSection />
        <OurServicesSection />
        <WhyUsSection />
        <TokenSection />
        <TechnologySection />
        <PartnerChoiceSection />
    </div>)
}
export default NftMarketPlaceDevelpment;