
import FormSection from "@/components/careers/form";
import HeroSection from "@/components/careers/heroSectin";
import RecruitmentSection from "@/components/careers/recruitmentSection";
import GetInTouchWithUs from "@/components/contactUs/getInTouch";
import { FC } from "react"
interface careersProps {}

const Careers :FC<careersProps> = () => {
return (<div>
 <HeroSection />
 <RecruitmentSection/>
 <FormSection />
 <GetInTouchWithUs />
</div>)
}
export default Careers;