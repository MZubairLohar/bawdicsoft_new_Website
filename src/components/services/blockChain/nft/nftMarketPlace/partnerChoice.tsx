import React, { FC, ReactNode, MouseEvent } from "react";
import needImage from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/partnerChoiseimg.webp";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentLeft from "@/components/home/animationLeft";
interface partnerChoiceSectionProps {}

type imageList = {
  image: StaticImageData;
};
const imageData: imageList = { image: needImage };

const PartnerChoiceSection: FC<partnerChoiceSectionProps> = () => {
  console.log(imageData);
  return (
    <div className="flex justify-center">
      <div className="grid max-w-7xl grid-cols-1 md:grid-cols-2  md:px-16  gap-0 md:gap-10  py-8">
        <AnimatedComponentLeft>
          <div>
            <Image
              src={imageData.image.src}
              alt=""
              width={430}
              height={470}
              className="w-full  h-84 "
            />
          </div>
        </AnimatedComponentLeft>
        <div className="  px-5  ">
          <p className="font-bold text-2xl md:text-3xl lg:text-4xl pb-8">
            Partners of choice
          </p>
          <p className="text-md text-gray-800 leading-6">
            NFTs have been proven to be one of the very few ideas that changed
            the whole landscape of today's digital world. Imagine profiting from
            the lucrative world of cryptocurrency using your real-world assets
            or an innovative idea and NFT makes it possible for you. These are
            digital tokens that generate a digital identity of your asset in an
            immutable hyper ledger. It not only provides you with the
            unparalleled security of blockchain but also enables you to keep
            track of your digital assets by putting an IP reserved digital token
            on your assets. We help you make it all possible by converting your
            innovative ideas into the most secure NFT tokens on any blockchain
            of your choice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerChoiceSection;
