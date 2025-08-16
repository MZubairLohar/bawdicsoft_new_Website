import FormSection from "@/components/contactUs/formSection";
import GetInTouchWithUs from "@/components/contactUs/getInTouch";
import HeroSection from "@/components/contactUs/heroSection";
import MapSection from "@/components/contactUs/mapSection";
import { FC } from "react"
interface contactUsProps {}

const ContactUs :FC<contactUsProps> = () => {
return (<div>
  <HeroSection />
  <MapSection />
  <FormSection />
  <GetInTouchWithUs />
</div>)
}
export default ContactUs;