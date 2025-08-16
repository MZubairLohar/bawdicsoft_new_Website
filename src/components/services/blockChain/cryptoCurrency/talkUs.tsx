import React, { FC, ReactNode, MouseEvent } from "react";
import centralizedCrypto from "../../../../../public/images/blockChain/cryptoCurrency/Talkus.webp";
import Image, { StaticImageData } from "next/image";
interface TalkUsSectionProps {}

type imageList = {
  image: StaticImageData;
};
const imageData: imageList = { image: centralizedCrypto };

const TalkUsSection: FC<TalkUsSectionProps> = () => {
  console.log(imageData);
  return (
    <div className="flex items-center justify-center ">
      {/* Talk */}
      <div className="grid grid-cols-1   md:grid-cols-2 bg-sky-900 max-w-6xl rounded-[30px]">
        <div className=" md:mx-5    px-5  flex  flex-col justify-center items-center md:justify-start md:items-start pt-20 pb-5">
          <p className="text-white font-bold text-2xl  md:text-3xl lg:text-4xl text-center md:text-start">
            Got an idea, talk to our experts and get a quote on your project.
          </p>
          <a
            href="#"
            className="text-gray-700 max-w-sm font-semibold mt-4 text-md px-5 hover:bg-sky-400 hover:text-white py-3 bg-gray-100"
          >
            Talk To Us
          </a>
        </div>
        <div className="mx-auto">
          <Image
            src={centralizedCrypto}
            alt=""
            width={300}
            height={300}
            className="md:w-72 md:h-72 pt-8  w-84 h-80"
          />
        </div>
      </div>
    </div>
  );
};

export default TalkUsSection;
