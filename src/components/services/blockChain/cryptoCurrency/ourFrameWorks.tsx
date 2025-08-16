import Image, { StaticImageData } from "next/image";
interface OurFrameWorkProps {}
import { FC } from "react";
import image1 from "../../../../../public/images/blockChain/cryptoCurrency/icons8-deployment-80.png";
import image2 from "../../../../../public/images/blockChain/cryptoCurrency/icons8-development-80.png";
import image3 from "../../../../../public/images/blockChain/cryptoCurrency/icons8-requirements-80.png";
import image4 from "../../../../../public/images/blockChain/cryptoCurrency/icons8-test-passed-80.png";
import image5 from "../../../../../public/images/blockChain/cryptoCurrency/icons8-windows-10-personalization-80.png";

type imageList = {
  title: String;
  image: StaticImageData;
};

const dataList: imageList[] = [
  { title: "Requirements​", image: image3 },
  { title: "Design", image: image5 },
  { title: "Development", image: image2 },
  { title: "Testing", image: image4 },
  { title: "Deployment", image: image1 },
];

const OurFrameWork: FC<OurFrameWorkProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-sky-950 pb-16 max-w-7xl py-10 px-10 md:px-20 mx-8   mb-14 text-white mt-12 rounded-3xl">
        <p className="text-white font-bold text-3xl md:text-4xl text-center pb-10">
          Our Framework
        </p>
        <div className="grid gird-cols-1 md:grid-cols-3 place-items-center gap-6 lg:grid-cols-5 md:gap-20 ">
          {dataList.map((p) => {
            return (
              <div
                key={Math.random()}
                className="flex flex-col justify-center items-center gap-2 md:gap-3"
              >
                <div>
                  <Image
                    src={p.image.src}
                    alt=""
                    width={400}
                    height={400}
                    className="w-24 h-24 md:w-24 md:h-24"
                  />
                </div>
                <p className="text-lg">{p.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default OurFrameWork;
