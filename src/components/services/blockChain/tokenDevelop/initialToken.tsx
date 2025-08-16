import { FC } from "react";
interface InitialTokenOfferSectionProps {}
const InitialTokenOfferSection: FC<InitialTokenOfferSectionProps> = () => {
  return (
    <div>
      <div className="flex justify-center bg-sky-950">
        <div className="pt-10  md:px-24 md:pt-16 pb-20 md:pb-20  max-w-7xl">
          <p className="  text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white">
            Initial Token Offering
          </p>
          <p className="text-md text-gray-200  text-center leading-7 px-5 pb-5 pt-5">
            Initial Coin Offering (ICO), Initial Exchange Offering (IEO),
            Security Token Offering (STO) or Initial DEX Offering (IDO), we have
            it all for you. Trust our services to build your initial offering
            tokens and we take care of the whole end-to-end development for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2  px-5 md:px-8 gap-10">
            <div className=" border-2 hover:border-sky-500   p-6   border-gray-200 rounded-lg shadow ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white text-center ">
                  ICO
                </h5>
              </span>
              <p className="mb-3 font-normal  text-white text-center">
                Wanna go public? Offer coins in an ICO and build your brand in
                the crypto market with capital raised from your Initial Coin
                Offering..
              </p>
            </div>
            <div className=" border-2 hover:border-sky-500  p-6   border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white  text-center">
                  IEO
                </h5>
              </span>
              <p className="mb-3 font-normal  text-white text-center">
                Raise funds from across the existing crypto market or exchange
                equity in return for crypto funds.
              </p>
            </div>
            <div className=" border-2 hover:border-sky-500  p-6   border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white  text-center">
                  STO
                </h5>
              </span>
              <p className="mb-3 font-normal  text-white text-center">
                Decentralize your tangible assets by creating Security Tokens
                against them. Get loans and enrich your business with an STO
                drive.
              </p>
            </div>
            <div className=" border-2 hover:border-sky-500   p-6   border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white  text-center">
                  IDO
                </h5>
              </span>
              <p className="mb-3 font-normal   text-white text-center">
                You can gain funds for your crypto projects by having your IDO
                exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-sky-900 text-center my-8  md:my-16  rounded-[20px] max-w-7xl    py-8 px-4 flex flex-col justify-center items-center">
          <p className="text-white font-bold text-2xl  md:text-3xl ">
            Need tokens? Talk to one of our experts and get a quote on your
            project.
          </p>
          <a href="/contact-us" className="text-gray-700 max-w-sm font-semibold  text-md px-5 hover:bg-sky-400 hover:text-white py-3 bg-gray-100 mt-5">
            Talk To Us
          </a>
        </div>
      </div>
    </div>
  );
};
export default InitialTokenOfferSection;
