import React, { FC, ReactNode, MouseEvent } from "react";
import img from "../../../../../public/images/blockChain/TokenExcahge/token_dev_process-970x1024.webp";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentRight from "@/components/home/animationRight";
interface OurFrameWorkSectionProps {}
type myImg = {
  image: StaticImageData;
};
const imageData: myImg = { image: img };
const OurFrameWorkSection: FC<OurFrameWorkSectionProps> = () => {
  return (
    <div className="pb-16 md:pt-16 px-8 md:px-32">
      <p className=" text-2xl  md:text-3xl lg:text-5xl font-bold pb-5 text-center">
        Our Framework
      </p>
      <AnimatedComponentRight>
        <div className="flex justify-center">
          <Image
            src={imageData.image.src}
            alt=""
            width={900}
            height={900}
            className="md:w-[800px] h-full"
          />
        </div>
      </AnimatedComponentRight>
    </div>
  );
};

export default OurFrameWorkSection;
