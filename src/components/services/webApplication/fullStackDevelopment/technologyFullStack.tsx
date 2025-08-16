import { FC } from "react";
import reactjs from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/reactjs.webp";
import angular from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/angular.webp";
import express from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/express.webp";
import jsimg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/js.webp";
import sImg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/s.webp";
import mogodb from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/mogodb.webp";
import reactnative from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/reactnative.webp";
import nodejs from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/nodejs.webp";
import spring from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/spring.webp";
import Image, { StaticImageData } from "next/image";

interface technologyProps {}
type imageList = {
  image: string;
};

const allImageData: imageList[] = [
  { image: "/images/blockChain/NFT/nftMarketPlace/s.webp" },
  { image: "/images/blockChain/NFT/nftMarketPlace/reactjs.webp" },
  { image: "/images/blockChain/NFT/nftMarketPlace/reactnative.webp" },
  { image: "/images/blockChain/NFT/nftMarketPlace/js.webp" },
  { image: "/images/blockChain/NFT/nftMarketPlace/angular.webp" },
  { image: "/images/blockChain/NFT/nftMarketPlace/spring.webp" },
  { image: "/images/blockChain/NFT/nftMarketPlace/nodejs.webp" },
  { image: "/images/blockChain/NFT/nftMarketPlace/mogodb.webp" },
  { image: "/images/blockChain/NFT/nftMarketPlace/express.webp" },
];

const TechnologySectionFullStack: FC<technologyProps> = () => {
  return (
    <div className="pt-16">
      <p className=" text-2xl md:text-4xl font-bold text-center">
        Technologies We Use
      </p>

      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-center max-w-4xl items-center gap-16 pt-12   mx-8 md:mx-24 lg:mx-64 pb-20">
          {allImageData.map((img) => {
            return (
              <div
                key={Math.random()}
                className=" flex items-center justify-end"
              >
                <Image
                  src={img.image}
                  alt=""
                  width={600}
                  height={600}
                  className="md:w-32 md:h-22 w-24 h-16 "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TechnologySectionFullStack;
