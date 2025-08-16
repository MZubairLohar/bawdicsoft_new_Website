import React, { FC, ReactNode, MouseEvent } from "react";
interface HeroSectionProps {}
import HerSectionimg from "../../../public/images/portfolioimg.gif";
import { StaticImageData } from "next/image";

type heroImg = {
  img: StaticImageData;
};
const data: heroImg = { img: HerSectionimg };
const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <section
      className=" bg-center bg-cover bg-no-repeat  bg-gray-900 bg-blend-soft-light"
      style={{
        backgroundImage: `url(${data.img.src})`,
        height: "calc(100vh - 48px)",
      }}
    >
      <div className="px-4 mx-auto  text-center pt-44 md:py-56 max-w-7xl">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-7xl md:mx-32 -ml-30">
          We are innovating today, for a better future​
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 ">
          Integrating web and web3 in your daily life creating modern solutions
          for the digital world.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
