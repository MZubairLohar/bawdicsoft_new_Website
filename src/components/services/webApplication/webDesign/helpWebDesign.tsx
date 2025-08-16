import React, { FC, ReactNode, MouseEvent } from "react";
// import helpImage from "../../../../../../public/images/blockChain/NFT/nftDevelopmentImages/helpImage.webp";
import Image, { StaticImageData } from "next/image";
interface HelpSectionsProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: helpImage };

const HelpSectionsWebDesign: FC<HelpSectionsProps> = () => {
  // console.log(imageData);
  return (
  //  root div
  <div>
     <div className="flex justify-center ">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 place-items-center md:px-16 gap-10 py-16 ">
        <div className="px-5 md:pt-5 order-1 md:order-0">
          <p className="mb-4 text-3xl font-semibold tracking-tight leading-7 md:text-4xl lg:text-5xl ">
            How we can help
          </p>
          <p className="text-md text-gray-800 leading-6">
            At BawdicSoft, we help businesses grow by creating modern, high-performing websites that combine stunning design with powerful functionality.
          </p>
        </div>
        <div className="order-0 md:order-1">
          <Image
            src={'/images/help.avif'}
            alt=""
            width={330}
            height={300}
            className="w-80 h-80 md:w-96 md:h-96"
          />
        </div>
      </div>
    </div>

    {/* Talk */}
      <div className="flex justify-center p-5 m-5">
        <div className="bg-sky-900 mx-5 max-w-7xl text-center  rounded-[20px]    py-8 px-4 md:px-16 flex flex-col justify-center items-center">
          <p className="text-white font-bold text-2xl  md:text-3xl lg:text-4xl">
            Talk to one of our experts and get a quote on your project.
          </p>
          <a href="/contact-us" className="text-gray-700  font-semibold mt-4 text-md px-5 hover:bg-sky-400 hover:text-white py-3 bg-gray-100">
            Talk To Us
          </a>
        </div>
      </div>
  </div>
  );
};

export default HelpSectionsWebDesign;