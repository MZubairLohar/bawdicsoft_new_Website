import React, { FC, ReactNode, MouseEvent } from "react";

interface TrustSectionProps {}
const TrustSection: FC<TrustSectionProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="py-16 px-8 md:px-16 max-w-7xl">
        <p className=" text-2xl md:text-3xl lg:text-4xl font-bold pb-4 text-center">
          Trusted Token development services
        </p>
        <p className="text-md text-gray-700 leading-7 px-2 pt-2 text-center">
          We help you initiate custom-built crypto tokens on any Blockchain of
          your choice. We assist in every step along the way from designing the
          exact logic for your custom crypto tokens to deploying your crypto
          tokens on the Blockchain. Our team of expert developers can deliver
          quickly and precisely to fulfil your business needs.
        </p>
      </div>
    </div>
  );
};

export default TrustSection;
