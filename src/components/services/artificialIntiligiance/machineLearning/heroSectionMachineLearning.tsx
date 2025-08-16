import React, { FC, ReactNode, MouseEvent } from "react";
// import heroImage from "../../../../public/images/AI/heroSectionMachineLearning.png";
import { StaticImageData } from "next/image";
interface deFiSectionProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: heroImage };

const HeroSectionMachineLearning: FC<deFiSectionProps> = () => {
  // console.log(imageData);
  return (
    <section
      className=" pt-32 md:pt-0 bg-center bg-cover bg-no-repeat  bg-gray-500 bg-blend-multiply"
      style={{
        backgroundImage: `url(/images/AI/heroSection.png)`,
        height: "calc(100vh - 48px)",
      }}
    >
      <div className="px-4 mx-auto max-w-7xl text-center  md:pt-56 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white  lg:text-6xl -ml-30">
          Machine Learning
        </h1>
        <p className="mb-8  md:text-lg font-normal text-gray-300 lg:text-xl sm:px-16 ">
          Focus on AI services, creating machines that require human-like
          intelligence such as learning from experience, understanding natural
          languages, and solving complex problems.
        </p>
      </div>
    </section>
  );
};

export default HeroSectionMachineLearning;
