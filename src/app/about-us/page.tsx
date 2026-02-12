


import DocumtentsSectins from "@/components/aboutUs/document";
import HeroSection from "@/components/aboutUs/heroSection";
import OurSevices from "@/components/aboutUs/ourServices";
import OurVisionMission from "@/components/aboutUs/ourVisionMision";
import OurTeam from "@/components/home/team";
import { FC } from "react";

interface aboutUsProps {}

 const AboutUs :FC<aboutUsProps> = () => {
  return (
    <>
   <div>
    <HeroSection />
    <DocumtentsSectins />
    <OurVisionMission />
    <OurTeam />
    <OurSevices />
   </div>
    </>
  )
}

export default AboutUs;
