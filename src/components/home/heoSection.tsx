import React, { FC, ReactNode, MouseEvent } from "react";
import heroSecImg from "../../../public/images/final-head.webp";
import { StaticImageData } from "next/image";

interface HeroSectionProps { }
type heroImg = {
  img: StaticImageData;
};
const data: heroImg = { img: heroSecImg };
const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <section
      className="bg-center bg-cover bg-no-repeat bg-gray-400 bg-blend-multiply"
      style={{
        backgroundImage: `url(${data.img.src})`,
        height: "calc(100vh - 48px)",
      }}
    >
      <div className="px-4 mx-auto max-w-7xl text-center pt-44 md:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl -ml-30">
          Develop the Future Today
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Our team of expert developers can quickly deliver innovative web
          application and Web3 development solutions with improved security and
          optimized performance.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

{
  /* <div className="ms-52 my-10 text-5xl font-extrabold">
 <span className="animate-pulse bg-gradient-to-r from-pink-500 via-green-500 to-violet-500 bg-clip-text text-transparent"> Tailwind CSS Animation </span>
</div> */
}
