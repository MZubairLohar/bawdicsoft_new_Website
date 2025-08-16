import HelpSectionsCustomDevelopment from "@/components/services/wordPress/customeDevelopment/helpCustomDevelopment";
import HeroSectionCustomDevelopment from "@/components/services/wordPress/customeDevelopment/heroSectionCustomDevelopment";
import IntegratSectionCustomDevelopment from "@/components/services/wordPress/customeDevelopment/integrateCustomDevelopment";
import NeedCustomDevelopment from "@/components/services/wordPress/customeDevelopment/needCustomDevelopment";
import OfferSectionCustomDevelopment from "@/components/services/wordPress/customeDevelopment/offerCustomDevelopment";
import BenifiteNftSectionResponsiveDesign from "@/components/services/wordPress/responsiveDesign/benifitesResponsiveDesign";
import FullStackSectionResponsiveDesign from "@/components/services/wordPress/responsiveDesign/fullStackServiceResponsiveDesign";
import HeroSectionResponsiveDesign from "@/components/services/wordPress/responsiveDesign/heroSectionResponsiveDesign";
import OurServicesSectionResponsiveDesign from "@/components/services/wordPress/responsiveDesign/ourServicesResponsiveDesign";
import PartnerChoiceSectionResponsiveDesign from "@/components/services/wordPress/responsiveDesign/partnerChoiceResponsiveDesign";
import TechnologySectionResponsiveDesign from "@/components/services/wordPress/responsiveDesign/technologyResponsiveDesign";
import TokenSectionResponsiveDesign from "@/components/services/wordPress/responsiveDesign/tokenResponsiveDesign";
import WhyUsSectionResponsiveDesign from "@/components/services/wordPress/responsiveDesign/whyUsResponsiveDesign";
import BenifiteFullStackSupportMaintanence from "@/components/services/wordPress/supportMaintanence/benifitesSupportMaintanence";
import HeroSectionSupportManintanence from "@/components/services/wordPress/supportMaintanence/heroSectionSupportMaintanence";
import OurServicesSectionSupportMaintanence from "@/components/services/wordPress/supportMaintanence/ourServicesSupportMaintanence";
import PartnerChoiceSectionSupportMaintanence from "@/components/services/wordPress/supportMaintanence/partnerSupportMaintanence";
import SupportMaintanenceServicesSection from "@/components/services/wordPress/supportMaintanence/supportMaintanenceServices";
import TechnologySectionSupportMiantanence from "@/components/services/wordPress/supportMaintanence/technologySupportMaintanence";
import TokenSectionSupportMaintanence from "@/components/services/wordPress/supportMaintanence/tokenSapportMaintanence";
import WhyUsSectionSupportMaintanence from "@/components/services/wordPress/supportMaintanence/whyUsSupportMaintanence";
import HelpSectionsWoocommerece from "@/components/services/wordPress/woocommerceSolution/helpwoocommerce";
import HeroSectionWoocommerece from "@/components/services/wordPress/woocommerceSolution/heroWoocommerce";
import IntegratSectionWoocommerece from "@/components/services/wordPress/woocommerceSolution/integrateWoocommerce";
import NeedWoocommerece from "@/components/services/wordPress/woocommerceSolution/needWoocommerce";
import OfferSectionWoocommerece from "@/components/services/wordPress/woocommerceSolution/offerWoocommerce";

export default function WordPress({ params }: { params: { slug: string } }) {
  const param = params.slug;
  return (
    <div>
      {/* web Design */}
      {param === "woocommerce-solution" && (
        <div>
          <HeroSectionWoocommerece />
          <NeedWoocommerece />
          <HelpSectionsWoocommerece />
          <IntegratSectionWoocommerece />
          <OfferSectionWoocommerece />
        </div>
      )}
      {/* responsive web Design */}
      {param === "responsive-design" && (
        <div>
          <HeroSectionResponsiveDesign />
          <OurServicesSectionResponsiveDesign />
          <FullStackSectionResponsiveDesign />
          <PartnerChoiceSectionResponsiveDesign />
          <TechnologySectionResponsiveDesign />
          <TokenSectionResponsiveDesign />
          <BenifiteNftSectionResponsiveDesign />
          <WhyUsSectionResponsiveDesign />
        </div>
      )}
      {/* custom web App */}
      {param === "custom-development" && (
        <div>
          <HeroSectionCustomDevelopment />
          <IntegratSectionCustomDevelopment />
          <HelpSectionsCustomDevelopment />
          <NeedCustomDevelopment />
          <OfferSectionCustomDevelopment />
        </div>
      )}
      {/* full-stack-development */}
      {param === "support-maintenance" && (
        <div>
          <HeroSectionSupportManintanence />
          <OurServicesSectionSupportMaintanence />
          <BenifiteFullStackSupportMaintanence />
          <PartnerChoiceSectionSupportMaintanence />
          <SupportMaintanenceServicesSection />
          <TechnologySectionSupportMiantanence />
          <TokenSectionSupportMaintanence />
          <WhyUsSectionSupportMaintanence />
        </div>
      )}
    </div>
  );
}
