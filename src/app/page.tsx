

import Footer from "@/components/footer";
// import Expertise from "@/components/home/expertiseweb";
// import OurTeam from "@/components/home/team";
import HeroSection from "@/components/home/heoSection";
// import OfferSection from "@/components/home/offer";
import SevicesOffer from "@/components/home/servicesOffer";
import Navbar from "@/components/navbar";
import TrustSignalsSection from "@/components/home/trustsignal";
import EnterprisePainPointsSection from "@/components/home/enterprise";
import WhyBawdicSoftSection from "@/components/home/whybawdicsoft";
import CaseStudiesSection from "@/components/home/casestudies";
import HowWeWorkSection from "@/components/home/howwework";
import SecurityComplianceSection from "@/components/home/security";
import Cta from "@/components/home/cta";

export default function Home() {
  return (
    <>
  <HeroSection />
  <TrustSignalsSection />
  <EnterprisePainPointsSection />
  <WhyBawdicSoftSection />
  {/* <CaseStudiesSection /> */}
  <HowWeWorkSection />
  <SecurityComplianceSection />
  <Cta />
  {/* <OfferSection />
  <Expertise /> */}
  {/* <SevicesOffer /> */}
  {/* <OurTeam /> */}
    </>
  )
}
