import { FC } from "react";
interface heroSectionProps {}
import HerSectionimg from "../../../public/images/contactus.jpg";
import { StaticImageData } from "next/image";
type heroImg = {
  img: StaticImageData;
};
const data: heroImg = { img: HerSectionimg };
const HeroSection: FC<heroSectionProps> = () => {
  return (
    // <div>
    //   <section
    //     className=" bg-center bg-cover bg-no-repeat  bg-gray-400 bg-blend-multiply"
    //     style={{
    //       backgroundImage: `url(${data.img.src})`,
    //       height: "calc(100vh - 48px)",
    //     }}
    //   >
    //     <div className="px-4 mx-auto  text-center pt-44 md:py-56">
    //       <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-5 text-white md:text-5xl lg:text-5xl -ml-30">
    //         Feel Free To​
    //       </h1>
    //       <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
    //         Contact Us
    //       </p>
    //     </div>
    //   </section>
    // </div>

    // New Code
    <section
      className="flex justify-center flex-col items-center  bg-gradient-to-r from-sky-950 px-8  via-sky-700 via-30% to-sky-600 to-70%
    bg-blend-multiply"
      style={{
        height: "calc(100vh - 48px)",
      }}
    >
      <h4 className=" text-3xl md:text-4xl  lg:text-7xl font-bold text-white text-center ">
        Join Our Team
      </h4>
      <p className="mb-8 text-lg md:text-xl font-normal text-gray-200 pt-5 max-w-5xl text-center">
        At BawdicSoft, we believe in fostering a collaborative and inclusive environment where creativity and innovation thrive. Our team is composed of talented individuals who are driven to push boundaries and deliver transformative solutions. Whether you’re a seasoned professional or an emerging talent, we offer exciting opportunities to grow, learn, and contribute to groundbreaking projects in AI, blockchain, and digital development. Join us to shape the future of technology and build a rewarding career.
      </p>
    </section>
  );
};
export default HeroSection;
