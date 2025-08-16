import { FC } from "react";
interface TokenOfferSectionProps {}
const TokenOfferSection: FC<TokenOfferSectionProps> = () => {
  return (
    <div className="flex justify-center bg-sky-950">
      <div className="pt-10  md:px-16 md:pt-16 pb-20 md:pb-20  max-w-7xl">
        <p className=" text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white">
          What our tokens offer
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2  pt-10 px-5 md:px-16 gap-10">
          <div className=" border-2 hover:border-sky-500  p-6  border-gray-200 rounded-lg shadow ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight  text-white  ">
                Compatibility
              </h5>
            </span>
            <p className="mb-3 font-normal  text-white ">
              Our team follows standard protocols like ERC20 so your tokens are
              compatible with any Blockchain across the market.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-500  p-6  border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight  text-white  ">
                Burnability
              </h5>
            </span>
            <p className="mb-3 font-normal  text-white ">
              With our tokens, you have the full authority to burn tokens in
              case of excess supply or too many rotational funds.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-500  p-6   border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight  text-white  ">
                Minting
              </h5>
            </span>
            <p className="mb-3 font-normal text-white ">
              You can choose to supply more tokens whenever you want as per
              market conditions and specific business needs.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-500   p-6   border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight  text-white  ">
                Pausability
              </h5>
            </span>
            <p className="mb-3 font-normal  text-white ">
              Pausing is required when there is a freeze due to excessive
              movements on the Blockchain. You can pause your tokens at any
              point in time.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-500   p-6   border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight  text-white  ">
                Supply limitation
              </h5>
            </span>
            <p className="mb-3 font-normal  text-white ">
              You must limit the supply of your tokens up to a defined volume to
              keep them valuable and scarce. Our tokens offer complete control
              over the available supply of your tokens. It is known as the cap.
            </p>
          </div>
          <div className=" border-2 hover:border-sky-500   p-6   border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight  text-white  ">
                Authority
              </h5>
            </span>
            <p className="mb-3 font-normal  text-white ">
              Our tokens provide you complete control over all aspects of your
              tokens. You can mint, burn, pause or limit your tokens as and when
              required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TokenOfferSection;
