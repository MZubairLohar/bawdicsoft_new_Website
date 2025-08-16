import Image, { StaticImageData } from "next/image";
interface FamousBlockChainSectionProps {}
import { FC } from "react";
import image1 from "../../../../../public/images/blockChain/TokenExcahge/avalanchelogo.png";
import image2 from "../../../../../public/images/blockChain/TokenExcahge/binancelogo.png";
import image3 from "../../../../../public/images/blockChain/TokenExcahge/cardanologo.png";
import image4 from "../../../../../public/images/blockChain/TokenExcahge/eoslogo.png";
import image5 from "../../../../../public/images/blockChain/TokenExcahge/ethereumlogo.png";
import image6 from "../../../../../public/images/blockChain/TokenExcahge/metaverselogo.png";
import image7 from "../../../../../public/images/blockChain/TokenExcahge/polygonlogo.png";
import image8 from "../../../../../public/images/blockChain/TokenExcahge/solanalogo.png";
import image9 from "../../../../../public/images/blockChain/TokenExcahge/tronlogo.png";

type imageList = {
  title: String;
  image: StaticImageData;
};

const dataList: imageList[] = [
  { title: "Binance", image: image2 },
  { title: "Ethereum", image: image5 },
  { title: "Tron", image: image9 },
  { title: "Polygon", image: image7 },
  { title: "Solana", image: image8 },
  { title: "Cardano", image: image3 },
  { title: "Avalanche", image: image1 },
  { title: "Metaverse", image: image6 },
  { title: "EOS", image: image4 },
];

const FamousBlockChainSection: FC<FamousBlockChainSectionProps> = () => {
  return (
    <div className="flex justify-center">
      <div className=" pb-16 py-10 md:px-16 mx-8   mb-14  mt-12 max-w-7xl ">
        <p className=" font-bold text-2xl md:text-4xl text-center pb-10">
          We work with all famous Blockchains
        </p>
        <div className="grid gird-cols-1 md:grid-cols-3 gap-16 md:gap-8 ">
          {dataList.map((p) => {
            return (
              <div
                key={Math.random()}
                className="flex flex-col justify-center items-center gap-3"
              >
                <div>
                  <Image
                    src={p.image.src}
                    alt=""
                    width={300}
                    height={300}
                    className="w-40 h-40 md:w-24 md:h-24"
                  />
                </div>
                <p className="text-2xl font-bold pt-4">{p.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default FamousBlockChainSection;
