import React, { FC, ReactNode, MouseEvent } from "react";
import needImage from "../../../../../public/images/blockChain/TokenExcahge/whychoose.jpg";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentLeft from "@/components/home/animationLeft";
interface ChooseSectionProps {}

type imageList = {
  image: StaticImageData;
};
const imageData: imageList = { image: needImage };

const ChooseSection: FC<ChooseSectionProps> = () => {
  console.log(imageData);
  return (
    <div className="flex justify-center items-center">
      <div className=" grid grid-cols-1 gap-5  md:grid-cols-2    py-16">
        <AnimatedComponentLeft>
          <div>
            <Image
              src={imageData.image.src}
              alt=""
              width={430}
              height={400}
              className=" w-full h-60 md:w-[500px] md:h-96  "
            />
          </div>
        </AnimatedComponentLeft>
        <div className="max-w-lg lg:max-w-lg  pt-10 px-5  md:pt-5 ">
          <p className="mb-4 text-3xl font-semibold tracking-tight leading-7 md:text-3xl lg:text-4xl ">
            Why choose us
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

export default ChooseSection;
