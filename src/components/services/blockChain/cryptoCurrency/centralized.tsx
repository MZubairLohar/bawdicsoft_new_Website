import React, { FC, ReactNode, MouseEvent } from "react";
import centralizedCrypto from "../../../../../public/images/blockChain/cryptoCurrency/centralizedCrypto.webp";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentLeft from "@/components/home/animationLeft";
interface CentralizedSectionProps {}

type imageList = {
  image: StaticImageData;
};
const imageData: imageList = { image: centralizedCrypto };

const CentralizedSection: FC<CentralizedSectionProps> = () => {
  console.log(imageData);
  return (
    <div className="flex justify-center">
      <div className="pb-10 max-w-7xl">
        <div className=" flex flex-wrap md:flex-nowrap gap-10 md:gap-10 justify-center py-16 items-center">
          <AnimatedComponentLeft>
            <div>
              <Image
                src={imageData.image.src}
                alt=""
                width={430}
                height={370}
                className="w-full md:w-[600px] h-84 "
              />
            </div>
          </AnimatedComponentLeft>
          <div className="max-w-xl  px-5  ">
            <p className=" text-xl md:text-3xl lg:text-4xl leading-7 pb-6 font-bold max-w-md">
              What Is a Centralized Crypto Exchange ?
            </p>
            <p className="text-md text-gray-800 leading-6">
              NFTs have been proven to be one of the very few ideas that changed
              the whole landscape of today's digital world. Imagine profiting
              from the lucrative world of cryptocurrency using your real-world
              assets or an innovative idea and NFT makes it possible for you.
              These are digital tokens that generate a digital identity of your
              asset in an immutable hyper ledger. It not only provides you with
              the unparalleled security of blockchain but also enables you to
              keep track of your digital assets by putting an IP reserved
              digital token on your assets. We help you make it all possible by
              converting your innovative ideas into the most secure NFT tokens
              on any blockchain of your choice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralizedSection;
