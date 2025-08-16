import React, { FC, ReactNode, MouseEvent } from "react";
// import needImage from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/fullStackImage.webp";
import Image, { StaticImageData } from "next/image";
// import AnimatedComponentLeft from "@/components/home/animationLeft";
interface fullStackSectionProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: needImage };

const FullStackServiceSection: FC<fullStackSectionProps> = () => {
  // console.log(imageData);
  return (
    <div className="flex justify-center">
      <div className="py-16 max-w-7xl">
        <div className="flex justify-center">
          <p className=" md:text-3xl lg:text-4xl text-2xl  max-w-6xl font-bold text-center pt-5 pb-5 px-8 md:px-16">
            We provide full-stack development services for NFT marketplace
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  md:px-16  gap-10  py-8">
          <div className="px-5 md:px-0">
            {/* <AnimatedComponentLeft> */}
            <Image
              src={"/images/blockChain/NFT/nftMarketPlace/fullStackImage.webp"}
              alt=""
              width={330}
              height={270}
              className="w-full  md:h-80 "
            />
            {/* </AnimatedComponentLeft> */}
          </div>
          <div className=" px-5  ">
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

export default FullStackServiceSection;
