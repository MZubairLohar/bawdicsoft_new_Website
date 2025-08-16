import Image from "next/image";
import { FC } from "react";
import cryptoimg from "../../../../../public/images/blockChain/cryptoCurrency/cryptoWorks.jpeg";
interface cryptoWork {}
const CryptoWorkSection: FC<cryptoWork> = () => {
  return (
    <div className="pb-16">
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-2xl md:text-3xl  lg:text-4xl font-bold text-center ">
          {" "}
          How a Centralized Crypto Exchange works​
        </p>
        <Image
          src={cryptoimg}
          alt=""
          width={500}
          height={400}
          className="h-44 md:h-60 w-full md:w-[700px] lg:w-[800px]"
        />
      </div>
    </div>
  );
};
export default CryptoWorkSection;
