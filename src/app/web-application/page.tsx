
import ApiIntegration from "@/components/services/webApplication/apiIntegartion";
import BackendSection from "@/components/services/webApplication/backendSection";
import FrontEndSection from "@/components/services/webApplication/frontendSection";
import HeroSection from "@/components/services/webApplication/heroSection";
import UiUxSection from "@/components/services/webApplication/uiUx";
import { FC } from "react"
interface WebApplicationProps {}

const WebApplication :FC<WebApplicationProps> = () => {
return (<div>
<HeroSection />
<UiUxSection />
<BackendSection />
<FrontEndSection />
<ApiIntegration />
</div>)
}
export default WebApplication;