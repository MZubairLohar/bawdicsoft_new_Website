import { FC } from "react";
import lapImg from "../../../public/images/WebApplication.jpg";
import lockImg from "../../../public/images/Blockchainweb3.jpg";
import Image from "next/image";
import AnimatedComponent from "./animationLeft";
import AnimatedComponentLeft from "./animationLeft";
import AnimatedComponentRight from "./animationRight";
interface expserTisePropse { }
const Expertise: FC<expserTisePropse> = () => {
  return (
    <div className="bg-sky-950 flex justify-center">
      <div className="max-w-7xl  pt-16 pb-16 px-5 md:px-10 lg:px-12">
        <p className="mb-4 text-2xl  md:text-3xl text-start md:text-center font-extrabold tracking-tight leading-none text-white lg:text-4xl xl:text-5xl ">
          Our Expertise
        </p>
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-10  md:gap-20 ">
          <div className="flex flex-col self-center ">
            <p className="mb-4  text-xl text-start font-extrabold tracking-tight leading-none text-white md:text-2xl lg:text-4xl">
              Web Application Development
            </p>
            <p className="mb-4 text-start  leading-7 tracking-tight  text-white ">
              {" "}
              We specialize in creating responsive UI and UX design using React,
              Vue, and Next JS. By integrating database such as Mongo DB, AWS,
              or Firebase we provide end to end web application development
              solutions.
            </p>
            <p className="mb-4  text-start  leading-7 tracking-tight  text-white ">
              {" "}
              Be it your website, web application or E-Store, we cover it all
              for you. We secure the frontend results with structured backend
              code that completely fulfills customer requirements.
            </p>
          </div>
          <AnimatedComponentRight>
            <div>
              <Image
                src={lapImg}
                alt=""
                className="w-full h-60 max-w-3xl md:h-80 rounded-3xl"
              />
            </div>
          </AnimatedComponentRight>
        </div>
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-10  md:gap-20">
          <AnimatedComponentLeft>
            <div>
              <Image
                src={lockImg}
                alt=""
                className="w-full h-60 max-w-3xl md:h-80 order-1 rounded-3xl"
              />
            </div>
          </AnimatedComponentLeft>
          <div className="flex flex-col self-center  content-beteen order-first md:order-none ">
            <p className="mb-4  text-xl text-start font-extrabold tracking-tight leading-none text-white md:text-2xl lg:text-4xl">
              Blockchain / Web3 Development
            </p>
            <p className="mb-4 text-start    text-white leading-7 ">
              BawdicSoft modernizes your business using emerging Blockchain /
              web3 technology in the digital world. We strengthen businesses and
              bring agility using custom logic and smart contracts. We are an
              NFT development company dealing in NFTs, NFT marketplace, Defi,
              Smart contracts, DEX (decentralized exchange), DAO, Dapp, Crypto,
              Blockchain ecosystems, Tokenomics, Wallet (i.e. Metamask),
              Cryptocurrency, and Metaverse. We integrate efficiency and
              security with automation into the mix.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Expertise;
