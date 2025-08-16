import { FC } from "react";
interface WhyUsSectionProps {}
const WhyUsSectionFullStack: FC<WhyUsSectionProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="pt-10 md:pt-16 pb-20 md:pb-32 max-w-7xl">
        <p className="text-2xl md:text-4xl font-bold text-center">Why Us</p>
        <div className="flex justify-center items-center">
          <p className="text-md text-gray-600 max-w-6xl font-semibold text-center px-5  leading-7 pb-5 pt-5">
            We custom-build your NFT marketplace by analysing your needs with
            market trends and advising you on the right structuring and
            techniques to be used.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 px-5 md:px-24  gap-4 ">
          <div className="border-2 hover:border-sky-800    p-6 bg-white  border-gray-200 rounded-lg shadow ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                Exchange in multiple currencies
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              We connect your marketplace with multiple blockchains by
              integrating the choice of currency for the user to improve ease of
              use and enhance access.
            </p>
          </div>
          <div className="border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl  font-bold tracking-tight text-gray-900 ">
                Data Security
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Integration of Pinata and IPFS applications within your API
              enables your marketplace to safely keep and fetch data wherever
              required.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl  font-bold tracking-tight text-gray-900 ">
                Decentralization
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              We build your NFT marketplace with the minimal need for human
              intervention so there is a direct link between buyers and sellers.
              Customers would have complete security and transparency in their
              transactions.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl  font-bold tracking-tight text-gray-900 ">
                Automation
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              You get a fully automated platform where protocols are pre-built
              for each and every step involved in listing, buying, selling or
              trading NFTs.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl  font-bold tracking-tight text-gray-900 ">
                Customization
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Our design is completely customisable so you can choose to change
              any feature at any point in time and we will do it for you. You
              can start with providing free service and later start charging
              when appropriate and we can easily customise it..
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl  font-bold tracking-tight text-gray-900 ">
                Mobility
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Users can access your platform on any device from anywhere in the
              world so your forum is completely mobile and easy to access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyUsSectionFullStack;
