import { FC } from "react";
interface toeknProps {}
const TokenSectionSupportMaintanence: FC<toeknProps> = () => {
  return (
    <div className="flex justify-center bg-sky-950 ">
      <div className="pt-10 md:pt-16 pb-20 md:pb-32 max-w-7xl">
        <div className="flex justify-center">
          <p className=" md:text-3xl lg:text-4xl  text-2xl  text-white max-w-5xl font-bold text-center pt-5 pb-5 px-16">
            We use ERC721 and ERC1155 token standards
          </p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mx-5 md:mx-32 ">
          <div className="pb-4  border-2 border-gray-200 hover:border-blue-400  p-3   rounded-lg  ">
            <span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                ERC721
              </h5>
            </span>
            <p className="mb-3 font-normal  text-white">
              ERC721 is an effective and highly functional token standard that
              is exclusively used to run non-fungible token functionalities in a
              perfect manner. We design and develop your NFT marketplace using
              our unique and business-specific ERC-721 token.
            </p>
          </div>
          <div className=" pb-4 border-2 border-gray-200 hover:border-blue-400  p-3  rounded-lg  ">
            <span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                ERC1155
              </h5>
            </span>
            <p className="mb-3 font-normal  text-white">
              Being developed significantly by the Enjin Network, it works well
              for all clone-based NFT marketplace software. It is used to create
              both fungible and non-fungible assets in the Ethereum blockchain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TokenSectionSupportMaintanence;
