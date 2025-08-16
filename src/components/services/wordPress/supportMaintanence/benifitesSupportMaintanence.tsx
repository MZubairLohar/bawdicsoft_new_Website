import { FC } from "react";
interface BenifiteNftSectionProps {}
const BenifiteFullStackSupportMaintanence: FC<BenifiteNftSectionProps> = () => {
  return (
    <div className="bg-sky-950 flex justify-center">
      <div className="max-w-7xl pt-10 md:pt-16 pb-20 md:pb-32 ">
        <div className="flex justify-center">
          <p className=" md:text-3xl lg:text-4xl  text-2xl  text-white max-w-5xl font-bold text-center pt-5 pb-5 px-16">
            Benefits of having your own NFT marketplace business
          </p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mx-8 md:mx-16">
          <div className="pb-4  border-2 border-gray-200 hover:border-sky-950  p-3   rounded-lg  ">
            <span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                Huge Demand
              </h5>
            </span>
            <p className="mb-3 font-normal   text-white">
              The Crypto industry is booming with the trading of NFTs and
              marketplaces are a buzz on the ground. There is a huge number of
              potential customers who you can reach through having a platform of
              your own.
            </p>
          </div>
          <div className=" pb-4 border-2 border-gray-200 hover:border-sky-950   p-3   rounded-lg  ">
            <a>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                Secured investment
              </h5>
            </a>
            <p className="mb-3 font-normal   text-white">
              Your investments are secured as all transactions take place within
              a blockchain with cryptocurrency. Deals are solid and transfers
              are instant.
            </p>
          </div>
          <div className="pb-4 border-2 border-gray-200 hover:border-sky-950   p-3   rounded-lg  ">
            <span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                Fluid assets
              </h5>
            </span>
            <p className="mb-3 font-normal   text-white">
              Marketplaces enhance the liquidity of digital assets making it
              easy to sell or buy one.
            </p>
          </div>
          <div className=" pb-4 border-2 border-gray-200 hover:border-sky-950   p-3   rounded-lg  ">
            <span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                Transparency
              </h5>
            </span>
            <p className="mb-3 font-normal   text-white">
              Customers prefer to buy, sell and trade NFTs on marketplaces as
              transactions are transparent and fraud-free.
            </p>
          </div>
          <div className="pb-4 border-2 border-gray-200 hover:border-sky-950   p-3   rounded-lg  ">
            <span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                Customization​
              </h5>
            </span>
            <p className="mb-3 font-normal   text-white">
              You can have it custom built to your target audience and connect
              with the right users to gain lucrative profits.
            </p>
          </div>
          <div className=" pb-4 border-2 border-gray-200 hover:border-sky-950   p-3   rounded-lg  ">
            <span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                Huge Profits​
              </h5>
            </span>
            <p className="mb-3 font-normal   text-white">
              The return on investment is quite high as costs are way lower
              compared to the profits you can generate with your own NFT
              marketplace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BenifiteFullStackSupportMaintanence;
