import Image from "next/image";
import React, { FC } from "react";

// Ensure these paths match your actual public folder structure
import webAppImg from "../../../public/images/portFolio/Web-Application-Development.png";
import blockchainImg from "../../../public/images/portFolio/Block-Chain-Development.png";
import defiImg from "../../../public/images/portFolio/DeFi-Development.png";
import nftImg from "../../../public/images/portFolio/NFT-Development.png";
import nftMarketImg from "../../../public/images/portFolio/NFT-Marketplace-Development.png";
import cryptoExchangeImg from "../../../public/images/portFolio/Cryptocurrency-Exchange-Platforms.png";
import tokenImg from "../../../public/images/portFolio/Token-Development.png";
import web3Img from "../../../public/images/portFolio/web3-icon.png";


interface ServiceItem {
  title: string;
  desc: string;
  icon: any;
}

const services: ServiceItem[] = [
  { title: "Web Application", desc: "Scalable, high-performance web apps.", icon: webAppImg },
  { title: "Blockchain", desc: "Secure, decentralized ledger solutions.", icon: blockchainImg },
  { title: "DeFi Development", desc: "Decentralized finance protocols & dApps.", icon: defiImg },
  { title: "NFT Development", desc: "Custom NFT minting and integration.", icon: nftImg },
  { title: "NFT Marketplace", desc: "End-to-end NFT trading platforms.", icon: nftMarketImg },
  { title: "Crypto Exchange", desc: "Robust, secure digital asset trading.", icon: cryptoExchangeImg },
  { title: "Token Development", desc: "ERC-20, BEP-20, and custom tokenomics.", icon: tokenImg },
  { title: "Web3 Integration", desc: "Seamless wallet and dApp connectivity.", icon: web3Img },
];

const ProductServices: FC = () => {
  return (
    <section className="border-t border-gray-900 bg-gray-950 px-4 py-14 sm:px-6 sm:py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-3 text-3xl font-extrabold text-white sm:mb-4 sm:text-4xl md:text-5xl">
            Our Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Enterprise-grade solutions built with security, scalability, and innovation at the core.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group min-w-0 rounded-2xl border border-gray-800 bg-gray-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:bg-gray-800/50 sm:p-6"
            >
              <div className="relative mb-4 h-14 w-14 sm:mb-6 sm:h-16 sm:w-16">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 50px, 64px"
                  className="object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
              <h3 className="mb-2 break-words text-lg font-bold text-white transition-colors group-hover:text-sky-400 sm:text-xl">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductServices;