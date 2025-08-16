import React, { FC, ReactNode, MouseEvent } from "react";
// import needImage from "../../../../../../public/images/blockChain/NFT/nftDevelopmentImages/needImage.webp";
import Image, { StaticImageData } from "next/image";
import AnimatedComponentLeft from "@/components/home/animationLeft";
interface NeedNftProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: needImage };

const NeedWebDesign: FC<NeedNftProps> = () => {
  // console.log(imageData);
  return (
    <div className="bg-sky-950 flex justify-center">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2  md:px-16    py-16 ">
        <AnimatedComponentLeft>
          <div>
            <Image
              src={"/images/design.avif"}
              alt=""
              width={330}
              height={300}
              className="w-96 h-96 px-5 md:px-0 "
            />
          </div>
        </AnimatedComponentLeft>

        <div className=" pt-10 px-5  md:pt-5 ">
          <p className="mb-4 text-3xl font-semibold tracking-tight leading-7 text-white md:text-4xl lg:text-5xl ">
            Why Web Design & Development Matters
          </p>
          <p className="text-md text-gray-200 leading-6">
           Your website is more than just a digital presence — it's the face of your brand, the hub of your customer experience, and a powerful tool for growth. A well-designed and professionally developed site builds trust, improves usability, drives engagement, and converts visitors into loyal customers.

We craft websites that not only look stunning but also perform seamlessly — optimized for speed, mobile devices, and your business goals.
          </p>
        </div>
      </div>
    </div>

    
  );
};

export default NeedWebDesign;
