import React, { FC, ReactNode, MouseEvent } from "react";

interface StandardTokenSectionProps {}
const StandardTokenSection: FC<StandardTokenSectionProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="py-16 px-8 md:px-2 lg:px-24 max-w-7xl">
        <p className=" text-3xl md:text-4xl font-bold pb-4 text-center">
          Standardized Tokens
        </p>
        <p className="text-md text-gray-700 max-w-7xl leading-7 pt-2 text-center">
          Standardized Tokens We use all the latest token standards to build all
          our cryptocurrency tokens. Having standard logic to build your tokens
          make them reliable, secure and easy to deploy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5 lg:gap-8 pt-8">
          <div>
            <p className="text-2xl font-bold pb-5 text-center">Binance</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                BEP
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center ">
                BEP21
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                ERC20
              </p>
            </div>
          </div>
          <div>
            <p className="text-2xl  font-bold pb-5 text-center">Ehtereum</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <p className="text-xl pt-5 rounded-[10px] px-10 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                ERC20
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                ERC721
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                ERC777
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                ERC223
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                ERC827
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                ERC1155
              </p>
            </div>
          </div>
          <div>
            <p className="text-2xl  font-bold pb-5 text-center">Tron</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                TRX
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                TRC10
              </p>
              <p className="text-xl pt-5 rounded-[10px] px-5 py-3 bg-sky-950 font-bold text-white flex justify-center items-center">
                TRC20
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StandardTokenSection;
