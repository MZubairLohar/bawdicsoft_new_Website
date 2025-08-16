import React, { FC, ReactNode, MouseEvent } from "react";
// import heroImage from "../../../../../../public/images/blockChain/NFT/nftDevelopmentImages/herosectionImage.jpg";
import { StaticImageData } from "next/image";
interface HeroSectionProps {}

type imageList = {
  image: StaticImageData;
};
// const imageData: imageList = { image: heroImage };

const HeroSectionCustomDevelopment: FC<HeroSectionProps> = () => {
  // console.log(imageData);
  return (
    <section
      className=" pt-32 md:pt-0 bg-center bg-cover bg-no-repeat  bg-gray-500 bg-blend-multiply"
      style={{
        backgroundImage: `url(/images/blockChain/NFT/nftDevelopmentImages/herosectionImage.jpg)`,
        height: "calc(100vh - 48px)",
      }}
    >
      <div className="px-4 mx-auto max-w-7xl text-center md:pt-56 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-6xl lg:text-7xl -ml-30">
          Custom Development
        </h1>
        <p className="mb-8  md:text-lg font-normal text-gray-300 lg:text-xl sm:px-16 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
          aperiam corporis at quia quis voluptatum quisquam ipsa tempore
          voluptatibus molestiae odio perferendis id non tempora magni alias
          ullam, numquam soluta laudantium laborum veniam sapiente harum nulla
          dolorum! Quia voluptate dolores, consequatur, numquam nihil iste magni
          facilis quas, neque eaque amet!
        </p>
      </div>
    </section>
  );
};

export default HeroSectionCustomDevelopment;
