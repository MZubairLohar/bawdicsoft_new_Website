
import CentralizedSection from "@/components/services/blockChain/cryptoCurrency/centralized";
import CharacteristicSection from "@/components/services/blockChain/cryptoCurrency/characteristics ";
import ChooseSection from "@/components/services/blockChain/cryptoCurrency/chooseSection";
import CryptoWorkSection from "@/components/services/blockChain/cryptoCurrency/cryptWork";
import HeroSection from "@/components/services/blockChain/cryptoCurrency/heroSections";
import OurFrameWork from "@/components/services/blockChain/cryptoCurrency/ourFrameWorks";
import TalkUsSection from "@/components/services/blockChain/cryptoCurrency/talkUs";
import { FC } from "react"
interface DeFiProps {}

const CryptoCurrency :FC<DeFiProps> = () => {
return (<div>
<HeroSection />
<CentralizedSection />
<CryptoWorkSection />
<TalkUsSection />
<CharacteristicSection />
<ChooseSection />
<OurFrameWork />
</div>)
}
export default CryptoCurrency;