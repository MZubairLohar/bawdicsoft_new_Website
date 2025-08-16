import React, { FC, ReactNode, MouseEvent } from "react";
import NftYellow from "../../../../../public/images/blockChain/DeFi/NftYellow.webp";
import betaplate from "../../../../../public/images/blockChain/DeFi/betaplate.webp";
import Image, { StaticImageData } from "next/image";
interface DefiTokenStanderSectionProps {}

type imageList = {
  image: StaticImageData;
};
const imageData1: imageList = { image: NftYellow };
const imageData2: imageList = { image: betaplate };

const DefiTokenStanderSection: FC<DefiTokenStanderSectionProps> = () => {
  return (
    <div className="py-16 bg-sky-950 mt-12">
      <div className="flex justify-center">
        <p className=" md:text-3xl lg:text-4xl text-2xl text-white  font-bold text-center pt-5 pb-5 px-16">
          DeFi token standards that we use
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-60 lg:gap-80 py-16 ">
          <div className="flex flex-col gap-5">
            <Image
              src={imageData1.image.src}
              alt=""
              width={330}
              height={270}
              className="w-full md:w-64 h-84 "
            />
            <div className="flex flex-col gap-2 items-center">
              <p className="text-white text-3xl md:text-4xl font-bold">
                ERCO20
              </p>
              <p className="text-gray-100 text-lg">Governance Tokens</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Image
              src={imageData2.image.src}
              alt=""
              width={330}
              height={270}
              className="w-full md:w-64 h-84 "
            />
            <div className="flex flex-col gap-2 items-center">
              <p className="text-white text-3xl md:text-4xl font-bold">
                ERC721
              </p>
              <p className="text-gray-100 text-lg">Stable Coins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefiTokenStanderSection;
