import { FC } from "react";
import artImage from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/artsimg.jpg";
import musicimg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/musicimg.jpg";
import gamesimg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/gamesimg.jpg";
import digitalColletibleimg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/digitalColletibleimg.jpg";
import fantasySportImg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/fantasySportImg.jpg";
import accessoriesimg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/accessoriesimg.jpg";
import videoimg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/videoimg.jpg";
import infraStructureImg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/infraStructureImg.jpg";
import domainNameImg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/domainNameImg.jpg";
import photoGraphyimg from "../../../../../../public/images/blockChain/NFT/nftMarketPlace/photoGraphyimg.jpg";
import Image, { StaticImageData } from "next/image";

type imageList = {
  title: string;
  image: string;
};

const allImageData: imageList[] = [
  { title: "Art", image: "/images/blockChain/NFT/nftMarketPlace/artsimg.jpg" },
  {
    title: "Music",
    image: "/images/blockChain/NFT/nftMarketPlace/musicimg.jpg",
  },
  {
    title: "Games",
    image: "/images/blockChain/NFT/nftMarketPlace/gamesimg.jpg",
  },
  {
    title: "Digital collectibles",
    image: "/images/blockChain/NFT/nftMarketPlace/digitalColletibleimg.jpg",
  },
  {
    title: "Fantasty sports",
    image: "/images/blockChain/NFT/nftMarketPlace/fantasySportImg.jpg",
  },
  {
    title: "Accessories",
    image: "/images/blockChain/NFT/nftMarketPlace/accessoriesimg.jpg",
  },
  {
    title: "Video",
    image: "/images/blockChain/NFT/nftMarketPlace/videoimg.jpg",
  },
  {
    title: "Infrastructure development",
    image: "/images/blockChain/NFT/nftMarketPlace/videoimg.jpg",
  },
  {
    title: "Domain names",
    image: "/images/blockChain/NFT/nftMarketPlace/domainNameImg.jpg",
  },
  {
    title: "Photography",
    image: "/images/blockChain/NFT/nftMarketPlace/photoGraphyimg.jpg",
  },
];
interface ourServicesProprs {}
const OurServicesSectionResponsiveWebApp: FC<ourServicesProprs> = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-7xl">
        <p className="font-bold text-2xl md:text-4xl pt-8 md:pt-20 text-center">
          Our Services
        </p>
        <p className="mb-8  md:text-md font-normal text-gray-900 lg:text-lg px-5 pt-5 sm:px-16  text-center">
          We provide NFT marketplaces for general trading as well as for
          specific categories such as Collectables, Art, Music, Gaming,
          Infrastructure or any of your creative ideas that can be converted
          into NFTs. Having specialised forums attract targeted audiences who
          could benefit you greatly in terms of earning potential profit from
          your marketplace.
        </p>

        <div className="grid  grid-cols-1 md:grid-cols-3 gap-6  max-auto  mx-8 md:mx-24  pb-20">
          {allImageData.map((img) => {
            return (
              <div
                key={img.title}
                className="relative flex items-center justify-end"
              >
                <Image
                  src={img.image}
                  alt=""
                  width={300}
                  height={300}
                  className="md:w-80 md:h-64 w-full h-74 rounded-[20px] "
                />
                <span className="absolute bg-sky-800 text-white  py-4 px-10 md:px-8 md:py-4  hover:bg-sky-500">
                  {img.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Talk */}
        <div className="flex justify-center">
          <div className="bg-sky-900 mx-5 max-w-7xl text-center  rounded-[20px]    py-8 px-4 flex flex-col justify-center  items-center">
            <p className="text-white font-bold text-2xl  md:text-3xl lg:text-4xl">
              Talk to one of our experts and get a quote on your project.
            </p>
            <a href="/contact-us" className="text-gray-700  font-semibold mt-4 text-md px-5 hover:bg-sky-400 hover:text-white py-3 bg-gray-100">
              Talk To Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurServicesSectionResponsiveWebApp;
