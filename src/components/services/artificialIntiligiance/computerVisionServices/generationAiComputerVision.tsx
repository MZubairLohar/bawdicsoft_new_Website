import React, { FC, ReactNode, MouseEvent } from "react";
// import needImage from "../../../../public/images/AI/generatinAi.webp"
import Image, { StaticImageData } from "next/image";
import AnimatedComponentRight from "@/components/home/animationRight";
interface GenerationAISectionComputerVisionProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: needImage }

const GenerationAISectionComputerVision: FC<
  GenerationAISectionComputerVisionProps
> = () => {
  // console.log(imageData);
  return (
    <div className="flex justify-center items-center">
      <div className=" grid grid-cols-1 gap-5 px-5  md:grid-cols-2    py-16">
        <div className="max-w-lg lg:max-w-lg  self-center  px-5   order-2 md:order-none ">
          <p className="mb-4 text-2xl  font-semibold tracking-tight leading-7 md:text-3xl lg:text-4xl ">
            Generation AI Brilliance​
          </p>
          <p className="text-md text-gray-800 leading-6">
            Inspire creativity and innovation with our productive AI solutions.
            From art to content creation, our AI algorithms generate new ideas
            and products that take your business into uncharted territory.
          </p>
        </div>
        <AnimatedComponentRight>
          <div className="order-1 md:order-none">
            <Image
              src={"/images/AI/generatinAi.webp"}
              alt=""
              width={430}
              height={400}
              className=" w-full h-60 md:w-[500px] md:h-96  "
            />
          </div>
        </AnimatedComponentRight>
      </div>
    </div>
  );
};

export default GenerationAISectionComputerVision;
