import { FC } from "react";
interface offerSectionProps {}
const OfferSectionWoocommerece: FC<offerSectionProps> = () => {
  return (
    <div>
      <div className=" flex justify-center">
        <div className="max-w-7xl pt-10 md:pt-16 px-5 pb-20 md:pb-32">
          <p className="text-2xl  md:text-4xl font-bold text-center">
            What we offer
          </p>
          <p className="text-md text-gray-600 font-semibold text-center leading-7 pb-5 pt-5 px-10">
            Our NFT development services encompass a wide range of personal and
            business categories in terms of token development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10  md:px-16   ">
            <div className=" border-2 hover:border-sky-800    p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Art
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                Digitalise your creativity by preserving your artwork in the
                form of an NFT token. Keep it, trade it or sell it on an NFT
                marketplace.
              </p>
            </div>
            <div className="  border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Collectibles
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                Secure yourself from theft by getting a blockchain identity.
                Having a unique token saves your data on the blockchain making
                it safe and immutable.
              </p>
            </div>
            <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Lending
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                Securing loans providing a digital asset as security? It can't
                get any easier than that.
              </p>
            </div>
            <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Gaming
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                Hard-earned gaming assets can also be transformed into digital
                assets. Get an NFT for your character cards, videos and other
                gaming assets.
              </p>
            </div>
            <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Fashion1
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                Put a digital value on your fashion stuff by getting a tokenised
                identity for it. Make it theftless and trade in the digital
                world..
              </p>
            </div>
            <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Real-State
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                Put your imagination to the test by designing the interior and
                exterior of digital property and selling it with the help of
                NFT.
              </p>
            </div>
            <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Infrastructure
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                Got infrastructure designing ideas? Get lucrative profits by
                putting a crypto value to your infrastructure design.
              </p>
            </div>
            <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Music & Videos
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                Your talent in music or video creation is secured from copyright
                problems as you can give your creation a digital identity and
                value by creating an NFT .
              </p>
            </div>
            <div className=" border-2 hover:border-sky-800   p-6 bg-white  border-gray-200 rounded-lg shadow  ">
              <span>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Domains
                </h5>
              </span>
              <p className="mb-3 font-normal text-gray-700 ">
                We provide a domain for your domain by creating NFT tokens for
                your domain. Exchange it or sell it easily on the crypto market.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Talk */}
      <div className="flex justify-center">
        <div className="bg-sky-900 mx-5 max-w-7xl text-center  rounded-[20px]    py-8 px-4 md:px-16 flex flex-col justify-center items-center">
          <p className="text-white font-bold text-2xl  md:text-3xl lg:text-4xl">
            Talk to one of our experts and get a quote on your project.
          </p>
          <a className="text-gray-700  font-semibold mt-4 text-md px-5 hover:bg-sky-400 hover:text-white py-3 bg-gray-100">
            Talk To Us
          </a>
        </div>
      </div>
    </div>
  );
};
export default OfferSectionWoocommerece;
