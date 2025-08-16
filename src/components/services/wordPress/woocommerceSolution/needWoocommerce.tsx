import React, { FC, ReactNode, MouseEvent } from "react";
// import needImage from "../../../../../../public/images/blockChain/NFT/nftDevelopmentImages/needImage.webp";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentLeft from "@/components/home/animationLeft";
interface NeedNftProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: needImage };

const NeedWoocommerece: FC<NeedNftProps> = () => {
  // console.log(imageData);
  return (
    <div className="bg-sky-950 flex justify-center">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2  md:px-16    py-16 ">
        <AnimatedComponentLeft>
          <div>
            <Image
              src={"/images/blockChain/NFT/nftDevelopmentImages/needImage.webp"}
              alt=""
              width={330}
              height={300}
              className="w-96 h-96 px-5 md:px-0 "
            />
          </div>
        </AnimatedComponentLeft>

        <div className=" pt-10 px-5  md:pt-5 ">
          <p className="mb-4 text-3xl font-semibold tracking-tight leading-7 text-white md:text-4xl lg:text-5xl ">
            Why and Where do you need NFTs?
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
      </div>
    </div>
  );
};

export default NeedWoocommerece;
