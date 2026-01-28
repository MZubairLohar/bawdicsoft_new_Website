"use client";
import React, { FC } from "react";
import heroSecImg from "../../../public/images/final-head.webp";
import { StaticImageData } from "next/image";

interface HeroSectionProps {}

type heroImg = {
  img: StaticImageData;
};

const data: heroImg = { img: heroSecImg };

const HeroSection: FC<HeroSectionProps> = () => {
  const handlePrimaryCTA = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add your primary CTA logic here
    console.log("Talk to an Enterprise Solutions Architect clicked");
  };

  const handleSecondaryCTA = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add your secondary CTA logic here
    console.log("View Enterprise Case Studies clicked");
  };

  return (
    <section
      className="bg-center bg-cover bg-no-repeat bg-gray-400 bg-blend-multiply"
      style={{
        backgroundImage: `url(${data.img.src})`,
        minHeight: "calc(100vh - 48px)",
      }}
    >
      <div className="px-4 mx-auto max-w-5xl text-center pt-32 md:pt-44 lg:pt-20">
        {/* Headline */}
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight leading-tight text-white md:text-4xl lg:text-5xl xl:text-5xl px-2 md:px-4">
          Enterprise-Ready Software Delivery That Scales With Your Business
        </h1>
        
        {/* Subheadline */}
        <p className="mb-10 text-lg font-normal text-gray-200 lg:text-xl xl:text-xl max-w-4xl mx-auto px-4 md:px-8 leading-relaxed">
          We help technology leaders accelerate product delivery, modernize platforms, and reduce engineering bottlenecks — without compromising security or quality.
        </p>
        
        {/* CTA Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4 md:px-0">
          {/* Primary CTA Button */}
          <button
            onClick={handlePrimaryCTA}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg"
          >
            Talk to an Enterprise Solutions Architect
          </button>
          
          {/* Secondary CTA Button */}
          <button
            onClick={handleSecondaryCTA}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white/10 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50 backdrop-blur-sm"
          >
            View Enterprise Case Studies
          </button>
        </div>
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
