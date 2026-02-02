import GenerationAISectionComputerVision from "@/components/services/artificialIntiligiance/computerVisionServices/generationAiComputerVision";
import HeroSectionComputerVision from "@/components/services/artificialIntiligiance/computerVisionServices/heroSectionComputerVision";
import LanguageModelSectionComputerVision from "@/components/services/artificialIntiligiance/computerVisionServices/languageModelComputerVision";
import MasterMachineSectionComputerVision from "@/components/services/artificialIntiligiance/computerVisionServices/msMachineComputerVision";
import GenerationAISectionCustomeAi from "@/components/services/artificialIntiligiance/customeAiSolution/generationAiCustomAi";
import HeroSectionCustomAi from "@/components/services/artificialIntiligiance/customeAiSolution/heroSectionCustomAi";
import LanguageModelSectionCustomAi from "@/components/services/artificialIntiligiance/customeAiSolution/languageModelCustomAi";
import MasterMachineSectionCustomeAI from "@/components/services/artificialIntiligiance/customeAiSolution/msMachineCustomeAi";
import GenerationAISectionMachineLearning from "@/components/services/artificialIntiligiance/machineLearning/generationAiMachineLearning";
import HeroSectionMachineLearning from "@/components/services/artificialIntiligiance/machineLearning/heroSectionMachineLearning";
import LanguageModelSectionMachineLearning from "@/components/services/artificialIntiligiance/machineLearning/languageModelMachineLearning";
import MasterMachineSectionMachineLearning from "@/components/services/artificialIntiligiance/machineLearning/msMachineLearning";
import GenerationAISectionNaturalLanguage from "@/components/services/artificialIntiligiance/naturalLanguageProcessing/generationAiNaturalLanguage";
import HeroSectionNaturalLanguage from "@/components/services/artificialIntiligiance/naturalLanguageProcessing/heroSectionNaturalLanguage";
import LanguageModelSectionNaturalLanguage from "@/components/services/artificialIntiligiance/naturalLanguageProcessing/languageModelNaturalLanguage";
import MasterMachineSectionNaturalLanguage from "@/components/services/artificialIntiligiance/naturalLanguageProcessing/msMachineNaturalLanguage";
import Expertise from "@/components/home/expertiseai";

export default function AI({ params }: { params: { slug: string } }) {
  const param = params.slug;
  return (
    <div>
      {/* web Design */}
      {param === "custom-ai-solution" && (
        <div>
          <HeroSectionCustomAi />
          <MasterMachineSectionCustomeAI />
          <LanguageModelSectionCustomAi />
          <GenerationAISectionCustomeAi />
          <Expertise />
        </div>
      )}
      {/* responsive web Design */}
      {param === "machine-learning" && (
        <div>
          <HeroSectionMachineLearning />
          <MasterMachineSectionMachineLearning />
          <LanguageModelSectionMachineLearning />
          <GenerationAISectionMachineLearning />
          <Expertise />
        </div>
      )}
      {/* custom web App */}
      {param === "natural-language-processing" && (
        <div>
          <HeroSectionNaturalLanguage />
          <MasterMachineSectionNaturalLanguage />
          <LanguageModelSectionNaturalLanguage />
          <GenerationAISectionNaturalLanguage />
          <Expertise />
        </div>
      )}
      {/* full-stack-development */}
      {param === "computer-vision-services" && (
        <div>
          <HeroSectionComputerVision />
          <MasterMachineSectionComputerVision />
          <LanguageModelSectionComputerVision />
          <GenerationAISectionComputerVision />
          <Expertise />
        </div>
      )}
    </div>
  );
}
