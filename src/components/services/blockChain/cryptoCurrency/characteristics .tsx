import { FC } from "react";
interface CharacteristicSectionProps {}
const CharacteristicSection: FC<CharacteristicSectionProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="pt-10 max-w-7xl md:pt-16 pb-20 md:pb-32">
        <div className="flex justify-center items-center pb-8">
          <p className="text-2xl md:text-3xl px-5 lg:text-4xl max-w-6xl font-bold text-center">
            Characteristics of a successful Centralized CryptoCurrency exchange
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-5 px-8 md:px-16">
          <div className=" border-2 hover:border-sky-800    p-5 bg-white  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                KYC and AML verification
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              We include security of KYC and AML verification in the login
              process to secure user data.
            </p>
          </div>
          <div className="    border-2 hover:border-sky-800   p-5 bg-white  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                Custom Functionality
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              A crypto exchange offering all custom functionalities such as
              margin trading, lending and borrowing, future trades and pairs has
              a high user following.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-5 bg-white  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                Data-Driven Interface
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Customization with a Data-Driven Interface (DDI) provides
              functionalities specific to your business needs.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-5 bg-white  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                ICO Capability
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Much like the initial offering of stocks or IPO, a successful
              CryptoCurrency exchange can initiate an Initial Coin Offering or
              ICO.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-5 bg-white  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                Liquidity
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Currencies are entirely fluid with the ability to be converted at
              any point in time providing a sense of security to the user.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-5 bg-white  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                Order Matching
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Simultaneous trading is enabled through order matching including
              buying and selling transactions at the same time.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-5 bg-white  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                Bots
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Automated trading with real-time trends and market data makes your
              crypto exchange profitable and desirable.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-800   p-5 bg-white  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">
                Mediation
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700 ">
              Mediation protocols (Escrows) act as intermediaries holding the
              funds until any transaction is finalized. .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CharacteristicSection;
