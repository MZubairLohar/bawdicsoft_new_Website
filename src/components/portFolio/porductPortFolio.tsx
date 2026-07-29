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
    <section className="bg-gray-950 py-24 px-4 md:px-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Our Expertise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Enterprise-grade solutions built with security, scalability, and innovation at the core.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-sky-500/50 hover:bg-gray-800/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 mb-6 relative">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 50px, 64px"
                  className="object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
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