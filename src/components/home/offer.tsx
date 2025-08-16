import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
interface OfferSectionProps { }

const OfferSection: FC<OfferSectionProps> = () => {
  return (
    <div className="bg-gray-200 flex justify-center">
      <div className="grid max-w-7xl  grid-cols-1 md:grid-cols-2 px-5 md:px-10 gap-8 md:gap-20 pt-16 pb-16">
        <div className="">
          <p className="text-black  md:text-start text-xl md:text-3xl lg:text-4xl ">
            We offer Innovation, Optimization, Automation, and enhanced
            Security...
          </p>
        </div>
        <div className="">
          <span className="text-semibold text-lg  text-gray-600">
            {" "}
            BawdicSoft is a web application development and Web3 solutions
            provider founded in 2018.
          </span>
          <span className="text-semibold text-lg   text-gray-600">
            We present all the latest technologies such as Web3.0, Web
            development, Software Development,{" "}
            <Link
              href="/web-application"
              className="text-bold text-md text-blue-800"
            >
              {" "}
              Web application
            </Link>
            , E-Commerce & Web store development, Decentralised exchanges,{" "}
            <Link
              href="/nft-marketplace-development"
              className="text-bold text-md text-blue-800"
            >
              {" "}
              NFT Market development
            </Link>{" "}
            Artificial Intelligence, and AR/VR all under one umbrella. We aim to
            provide full-stack digital solutions to our customers integrating
            state-of-the-art technologies and emerging ideas into their
            business.
          </span>
        </div>
      </div>
    </div>
  );
};
export default OfferSection;
