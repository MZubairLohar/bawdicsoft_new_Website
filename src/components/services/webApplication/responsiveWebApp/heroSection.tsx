import React, { FC, ReactNode, MouseEvent } from "react";
// import heroImage from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/heroSection.png";
import { StaticImageData } from "next/image";
interface HeroSectionProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: heroImage };

const HeroSectionResponsiveWebApp: FC<HeroSectionProps> = () => {
  // console.log(imageData);
  return (
    <section
      className=" pt-32 md:pt-30 lg:pt-0 bg-center bg-cover bg-no-repeat  bg-gray-500 bg-blend-multiply"
      style={{
        backgroundImage: `url(/images/blockChain/NFT/nftMarketPlace/heroSection.png)`,
        height: "calc(100vh - 48px)",
      }}
    >
      <div className="px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center  lg:pt-44">
        <h1 className="mb-4 text-4xl max-w-4xl font-bold tracking-tight leading-none text-white md:text-6xl lg:text-7xl -ml-30">
          Responsive Web App
        </h1>
        <p className="mb-8  md:text-lg font-normal text-gray-300 lg:text-xl sm:px-16 ">
          At Bawdicsoft, our responsive web app development services ensure your digital presence shines across all devices, from desktops to smartphones. We design and build dynamic, user-centric web applications that adapt seamlessly to any screen size, delivering flawless functionality and an engaging user experience. Our expert team combines modern frameworks, intuitive design, and performance optimization to create responsive web apps that keep your audience connected and your business thriving.
        </p>
      </div>
    </section>
  );
};

export default HeroSectionResponsiveWebApp;
