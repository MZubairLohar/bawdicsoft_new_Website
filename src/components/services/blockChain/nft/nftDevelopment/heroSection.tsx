import React, { FC, ReactNode, MouseEvent } from "react";
import heroImage from "../../../../../../public/images/blockChain/NFT/nftDevelopmentImages/herosectionImage.jpg";
import { StaticImageData } from "next/image";
interface HeroSectionProps {}

type imageList = {
  image: StaticImageData;
};
const imageData: imageList = { image: heroImage };

const HeroSection: FC<HeroSectionProps> = () => {
  console.log(imageData);
  return (
    <section
      className=" pt-32 md:pt-0 bg-center bg-cover bg-no-repeat  bg-gray-500 bg-blend-multiply"
      style={{
        backgroundImage: `url(${imageData.image.src})`,
        height: "calc(100vh - 48px)",
      }}
    >
      <div className="px-4 mx-auto max-w-7xl text-center md:pt-56 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-6xl lg:text-7xl -ml-30">
          NFT Development​
        </h1>
        <p className="mb-8  md:text-lg font-normal text-gray-300 lg:text-xl sm:px-16 ">
          We are an NFT development company transforming your creative ideas
          into modern digital assets using error-free ERC721 and ERC1155
          standards. Your digital assets represent your creativity in the NFT
          marketplace and make you a part of today's digital world.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
