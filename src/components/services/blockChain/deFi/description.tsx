import React, { FC, ReactNode, MouseEvent } from "react";
interface descriptionProps {}
const DescriptionSection: FC<descriptionProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="pt-16 pb-16 px-5 md:px-16 max-w-7xl">
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center pb-8">
          What is DeFi?
        </p>
        <p className=" text-md md:text-lg text-gray-800 text-center pb-4">
          {" "}
          Blockchains and Cryptocurrencies have been redefining the way business
          is conducted removing barriers and enabling individuals and businesses
          to make swift and secured transactions over the internet. Most
          recently, the concept of DeFi or Decentralized Finance has emerged
          that suggests removing the need to have intermediaries such as banks
          and financial institutions to keep and exchange money without the need
          to pay fees for financial services.
        </p>
        <p className=" text-md md:text-lg text-gray-800 text-center">
          We are not your average software development company just developing
          what you describe. We rather act as a development consultancy advising
          you along the way using our expertise in the NFT market. We can update
          you with the market trends and provide the latest industry information
          regarding how the NFT market is evolving and how you can operate this
          profitable business effectively. You get complete automation so there
          is little to no technical knowledge required to operate your NFT
          marketplace.
        </p>
      </div>
    </div>
  );
};

export default DescriptionSection;
