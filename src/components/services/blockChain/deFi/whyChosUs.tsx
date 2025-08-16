import React, { FC, ReactNode, MouseEvent } from "react";
import needImage from "../../../../../public/images/blockChain/DeFi/Why-choose-us.jpg";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentLeft from "@/components/home/animationLeft";
interface WhyCoosUSProps {}

type imageList = {
  image: StaticImageData;
};
const imageData: imageList = { image: needImage };

const WhyCoosUS: FC<WhyCoosUSProps> = () => {
  console.log(imageData);
  return (
    <div className="py-5">
      <div className=" flex flex-wrap md:flex-nowrap gap-5 md:gap-10 lg:gap-20 justify-center py-16 items-start">
        <AnimatedComponentLeft>
          <div>
            <Image
              src={imageData.image.src}
              alt=""
              width={330}
              height={270}
              className="w-full  md:w-[400px] lg:w-[500px] h-84 "
            />
          </div>
        </AnimatedComponentLeft>
        <div className="max-w-xl  px-5  ">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold pb-5 ">
            Why Choose Us?
          </p>
          <p className="md:text-lg text-md text-gray-800 leading-6">
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

export default WhyCoosUS;
