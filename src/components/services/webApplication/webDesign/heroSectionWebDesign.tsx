import React, { FC } from "react";
import Image from 'next/image';

const HeroSectionWebDesign: FC = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br text-gray-900 overflow-hidden">
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 lg:px-12">
        {/* Text Content */}
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-800 text-transparent bg-clip-text">
              Website Design
            </span>
            <br />
            <span className="text-gray-800">and Development</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-md">
            We design sleek, high-performance websites that engage users and accelerate business growth.
          </p>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
          <div className="relative w-[90%] h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/images/website-creator-concept-illustration_114360-3315.avif"
              alt="Web development illustration"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionWebDesign;
