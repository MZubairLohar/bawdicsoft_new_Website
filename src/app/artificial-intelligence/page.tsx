
import GenerationAISection from "@/components/services/artificialIntiligiance/generationAi";
import HeroSection from "@/components/services/artificialIntiligiance/heroSection";
import LanguageModelSection from "@/components/services/artificialIntiligiance/languageModel";
import MasterMachineSection from "@/components/services/artificialIntiligiance/msMachine";
import { FC } from "react"
interface careersProps {}

const ArtificialInteligiance :FC<careersProps> = () => {
return (<div>
<HeroSection />
<MasterMachineSection />
<LanguageModelSection />
<GenerationAISection />
</div>)
}
export default ArtificialInteligiance;