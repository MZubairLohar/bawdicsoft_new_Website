import { FC } from "react";
import monitor from "../../../../../public/images/blockChain/DeFi/monitor.webp";
import vailate from "../../../../../public/images/blockChain/DeFi/vailate.webp";
import Image from "next/image";
import { StaticImageData } from "next/image";
interface WeOfferSectionProps {}
type imageList = {
  image: StaticImageData;
};
const imageData1: imageList = { image: monitor };
const imageData2: imageList = { image: vailate };

const WeOfferSection: FC<WeOfferSectionProps> = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="pt-10 md:pt-16 pb-20 md:pb-32 max-w-7xl ">
          <div className="flex justify-center">
            <p className=" md:text-3xl lg:text-4xl  text-3xl   max-w-5xl font-extrabold text-center pt-5 pb-7 px-16">
              What we offer
            </p>
          </div>
          <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4 mx-5 md:mx-16 ">
            <div className="pb-4  border-2 border-gray-200 hover:border-sky-900  p-3   rounded-lg  ">
              <Image
                src={imageData1.image.src}
                alt=""
                width={300}
                height={300}
                className=" w-48 h-40 md:w-16 md:h-16 "
              />
              <span>
                <h5 className="mb-2 text-xl font-extrabold tracking-tight text-gray-900 pt-5 ">
                  DeFi Smart Contract
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700  text-lg ">
                DeFi smart contracts enable you to couple the business logic
                with Decentralized Finance. Initiate your own DeFi Smart
                Contracts with us.
              </p>
            </div>
            <div className=" pb-4 border-2 border-gray-200 hover:border-sky-900   p-3   rounded-lg  ">
              <Image
                src={imageData2.image.src}
                alt=""
                width={300}
                height={300}
                className=" w-48 h-40 md:w-16 md:h-16 "
              />
              <span>
                <h5 className="mb-2 text-xl font-extrabold tracking-tight text-gray-900  pt-5">
                  Automated
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700  text-lg ">
                We use vigorously tested token standards to generate your
                specific tokens making the creation process automated..
              </p>
            </div>
            <div className=" pb-4 border-2 border-gray-200 hover:border-sky-900   p-3   rounded-lg  ">
              <Image
                src={imageData1.image.src}
                alt=""
                width={300}
                height={300}
                className=" w-48 h-40 md:w-16 md:h-16 "
              />
              <a>
                <h5 className="mb-2 text-xl font-extrabold tracking-tight text-gray-900 pt-5 ">
                  Easy to use
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700   text-lg ">
                Our DeFi tokens provide global access to your business as anyone
                from any part of the world can engage in business transactions
                using these tokens.
              </p>
            </div>
            <div className=" pb-4 border-2 border-gray-200 hover:border-sky-900   p-3   rounded-lg  ">
              <Image
                src={imageData1.image.src}
                alt=""
                width={300}
                height={300}
                className=" w-48 h-40 md:w-16 md:h-16 "
              />
              <span>
                <h5
                  className="mb-2 text-xl font-extrabold tracking-tight text-gray-900 pt-5
                        "
                >
                  Reliable
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700  text-lg l">
                Your tokens are highly reliable backed by smart contracts
                generated using ERC20 standards providing security and
                reliability while using them.
              </p>
            </div>
            <div className="pb-4  border-2 border-gray-200 hover:border-sky-900  p-3   rounded-lg  ">
              <Image
                src={imageData1.image.src}
                alt=""
                width={300}
                height={300}
                className=" w-48 h-40 md:w-16 md:h-16 "
              />
              <span>
                <h5
                  className="mb-2 text-xl font-extrabold tracking-tight text-gray-900 pt-5
                        "
                >
                  Customized
                </h5>
              </span>
              <p
                className="mb-3 font-normal text-gray-700  text-lg 
                    "
              >
                Our tokens are fully customized to your business needs
                fulfilling all the requirements specific to your enterprise.
              </p>
            </div>
            <div className=" pb-4 border-2 border-gray-200 hover:border-sky-900   p-3   rounded-lg  ">
              <Image
                src={imageData2.image.src}
                alt=""
                width={300}
                height={300}
                className=" w-48 h-40 md:w-16 md:h-16 "
              />
              <span>
                <h5
                  className="mb-2 text-xl font-extrabold tracking-tight text-gray-900 pt-5
                        "
                >
                  Automated
                </h5>
              </span>
              <p
                className="mb-3 font-normal text-gray-700  text-lg 
                    "
              >
                We use vigorously tested token standards to generate your
                specific tokens making the creation process automated..
              </p>
            </div>
            <div className=" pb-4 border-2 border-gray-200 hover:border-sky-900   p-3   rounded-lg  ">
              <Image
                src={imageData1.image.src}
                alt=""
                width={300}
                height={300}
                className=" w-48 h-40 md:w-16 md:h-16 "
              />
              <span>
                <h5
                  className="mb-2 text-xl font-extrabold tracking-tight text-gray-900  pt-5
                        "
                >
                  Easy to use
                </h5>
              </span>
              <p
                className="mb-3 font-normal text-gray-700   text-lg 
                    "
              >
                Our DeFi tokens provide global access to your business as anyone
                from any part of the world can engage in business transactions
                using these tokens.
              </p>
            </div>
            <div className=" pb-4 border-2 border-gray-200 hover:border-sky-900   p-3   rounded-lg  ">
              <Image
                src={imageData2.image.src}
                alt=""
                width={300}
                height={300}
                className=" w-48 h-40 md:w-16 md:h-16 "
              />
              <span>
                <h5
                  className="mb-2 text-xl font-extrabold tracking-tight text-gray-900 pt-5
                        "
                >
                  Reliable
                </h5>
              </span>
              <p
                className="mb-3 font-normal text-gray-700  text-lg 
                    "
              >
                Your tokens are highly reliable backed by smart contracts
                generated using ERC20 standards providing security and
                reliability while using them.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Talk */}
      <div className="flex justify-center">
        <div className="bg-sky-900 mx-5 max-w-7xl text-center  rounded-[20px]    py-8 px-4 md:px-16 flex flex-col justify-center  items-center">
          <p className="text-white font-bold text-2xl  md:text-3xl lg:text-4xl">
            Talk to one of our experts and get a quote on your project.
          </p>
          <a href="/contact-us" className="text-gray-700  font-semibold mt-4 text-md px-5 hover:bg-sky-400 hover:text-white py-3 bg-gray-100">
            Talk To Us
          </a>
        </div>
      </div>
    </div>
  );
};
export default WeOfferSection;
