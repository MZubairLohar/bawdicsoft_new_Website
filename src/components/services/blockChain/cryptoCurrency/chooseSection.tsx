import React, { FC, ReactNode, MouseEvent } from "react";
import needImage from "../../../../../public/images/blockChain/cryptoCurrency/Why-choose-BawdicSoft.jpg";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentRight from "@/components/home/animationRight";
interface ChooseSectionProps {}

type imageList = {
  image: StaticImageData;
};
const imageData: imageList = { image: needImage };

const ChooseSection: FC<ChooseSectionProps> = () => {
  console.log(imageData);
  return (
    <div className="bg-sky-950 flex justify-center ">
      <div className=" max-w-7xl grid grid-cols-1 md:grid-cols-2  px-5 gap-10 md:gap-10 lg:gap-20  py-16 items-center">
        <div className="max-w-lg lg:max-w-lg  pt-5 px-5  md:pt-5 order-2 md:order-none">
          <p className="mb-4 text-2xl md:text-3xl font-semibold tracking-tight leading-7 text-white  lg:text-4xl ">
            Why choose BawdicSoft?
          </p>
          <p className="text-md text-gray-200 leading-6">
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
        <AnimatedComponentRight>
          <div>
            <Image
              src={imageData.image.src}
              alt=""
              width={430}
              height={400}
              className=" w-full h-60  md:h-96  order-1 md:order-none "
            />
          </div>
        </AnimatedComponentRight>
      </div>
    </div>
  );
};

export default ChooseSection;
