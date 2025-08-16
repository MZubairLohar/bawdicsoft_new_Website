import React, { FC, ReactNode, MouseEvent } from "react";
// import inregartingImage from "../../../../../../public/images/blockChain/NFT/nftDevelopmentImages/inregartingImage.webp";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentLeft from "@/components/home/animationLeft";
interface IntegratSectionProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: inregartingImage };

const IntegratSectionCustomWeb: FC<IntegratSectionProps> = () => {
  // console.log(imageData);
  return (
    <div className="flex justify-center bg-sky-950 mt-10">
      <div className=" max-w-7xl grid grid-cols-1 md:grid-cols-2  md:px-16  gap-5  mt-8 py-16 md:mt-16">
        <AnimatedComponentLeft>
          <div>
            <Image
              src={
                "/images/blockChain/NFT/nftDevelopmentImages/inregartingImage.webp"
              }
              alt=""
              width={330}
              height={300}
              className="w-80 h-80 md:w-96 md:h-96 "
            />
          </div>
        </AnimatedComponentLeft>
        <div className=" pt-10 px-5  md:pt-5">
          <p className="mb-4 text-2xl font-semibold tracking-tight leading-7 text-white md:text-4xl lg:text-5xl ">
            Integrating NFTs into Business
          </p>
          <p className="text-md text-gray-200 leading-6">
            All modern businesses are harnessing the power of blockchain to make
            their assets more secure by building NFTs. This puts a crypto value
            to your real-world asset by making it available on marketplaces like
            OpenSea removing barriers and enhancing the reach of your business.
            We resolve the development hassle for you by providing trusted
            non-fungible tokens for your business needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegratSectionCustomWeb;
