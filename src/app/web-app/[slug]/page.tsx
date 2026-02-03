import FullStackSection from "@/components/services/blockChain/nft/nftMarketPlace/fullStackServices";
import HelpSectionsCustomWeb from "@/components/services/webApplication/customWebApp/helpCustomWeb";
import HeroSectionCustomWeb from "@/components/services/webApplication/customWebApp/heroCustomWeb";
import IntegratSectionCustomWeb from "@/components/services/webApplication/customWebApp/integrateCustomWeb";
import NeedCustomWeb from "@/components/services/webApplication/customWebApp/needCustomWeb";
import OfferSectionCustomWeb from "@/components/services/webApplication/customWebApp/offerCustomWeb";
import BenifiteFullStack from "@/components/services/webApplication/fullStackDevelopment/benifitesFullStack";
import HeroSectionFullStack from "@/components/services/webApplication/fullStackDevelopment/heroSectionFullStack";
import BenifiteNftSectionResponsiveWebApp from "@/components/services/webApplication/responsiveWebApp/benifitesResponsiveWebApp";
import FullStackSectionResponsiveWebApp from "@/components/services/webApplication/responsiveWebApp/fullStackServices";
import FullStackServiceSection from "@/components/services/webApplication/fullStackDevelopment/fullStackServices";
import HeroSectionResponsiveWebApp from "@/components/services/webApplication/responsiveWebApp/heroSection";
import OurServicesSectionResponsiveWebApp from "@/components/services/webApplication/responsiveWebApp/ourServices";
import PartnerChoiceSectionResponsiveWebApp from "@/components/services/webApplication/responsiveWebApp/partnerChoice";
import TechnologySectionResponsiveWebApp from "@/components/services/webApplication/responsiveWebApp/technology";
import TokenSectionResponsiveWebApp from "@/components/services/webApplication/responsiveWebApp/token";
import WhyUsSectionResponsiveWebApp from "@/components/services/webApplication/responsiveWebApp/whyUs";
import HelpSectionsWebDesign from "@/components/services/webApplication/webDesign/helpWebDesign";
import HeroSectionWebDesign from "@/components/services/webApplication/webDesign/heroSectionWebDesign";
import NeedWebDesign from "@/components/services/webApplication/webDesign/needWebDesign";
import OfferSectionWebDesign from "@/components/services/webApplication/webDesign/offerWebDesign";
import OurServicesSectionFullStack from "@/components/services/webApplication/fullStackDevelopment/ourServicesFullStack";
import PartnerChoiceSectionFullStack from "@/components/services/webApplication/fullStackDevelopment/partnerChoiceFullStack";
import TechnologySectionFullStack from "@/components/services/webApplication/fullStackDevelopment/technologyFullStack";
import TokenSectionFullStack from "@/components/services/webApplication/fullStackDevelopment/tokenFullStack";
import WhyUsSectionFullStack from "@/components/services/webApplication/fullStackDevelopment/whyUsFullStack";
import DesignProcessSection from "@/components/services/webApplication/webDesign/design-process"

export default function WebApp({ params }: { params: { slug: string } }) {
  const param = params.slug;
  return (
    <div>
      {/* web Design */}
      {param === "web-design" && (
        <div>
          <HeroSectionWebDesign />
          <DesignProcessSection/>
          <OfferSectionWebDesign />
           <NeedWebDesign />
          <HelpSectionsWebDesign />
        </div>
      )}
      {/* responsive web Design */}
      {param === "responsive-web-app" && (
        <div>
          <HeroSectionResponsiveWebApp />
          <BenifiteNftSectionResponsiveWebApp />
          <FullStackSectionResponsiveWebApp />
          <OurServicesSectionResponsiveWebApp />
          <PartnerChoiceSectionResponsiveWebApp />
          <TechnologySectionResponsiveWebApp />
          <TokenSectionResponsiveWebApp />
          <WhyUsSectionResponsiveWebApp />
        </div>
      )}
      {/* custom web App */}
      {param === "custom-web-app" && (
        <div>
          <HeroSectionCustomWeb />
          <NeedCustomWeb />
          <HelpSectionsCustomWeb />
          <IntegratSectionCustomWeb />
          <OfferSectionCustomWeb />
        </div>
      )}
      {/* full-stack-development */}
      {param === "full-stack-development" && (
        <div>
          <HeroSectionFullStack />
          <BenifiteFullStack />
          <FullStackServiceSection />
          <OurServicesSectionFullStack />
          <PartnerChoiceSectionFullStack />
          <TechnologySectionFullStack />
          <TokenSectionFullStack />
          <WhyUsSectionFullStack />
        </div>
      )}
    </div>
  );
}
