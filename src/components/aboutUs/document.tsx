import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface documentsProps {}
const DocumtentsSectins: FC<documentsProps> = () => {
  return (
    // <div className="flex justify-center">
    //   <div className="py-16 md:py-24 px-5 md:px-16  flex flex-col gap-5 max-w-7xl">
    //     <p className="text-center text-gray-700 text-lg md:text-xl leading-7">
    //       We are a group of people with diversified experiences in tech gathered
    //       in one place with a will to leave an impact on the industry which is
    //       constantly transforming each day. Our motive is to provide services in
    //       emerging tech with ease of development process incorporating the
    //       mantra of Innovation, speed, automation, and security.
    //     </p>
    //     <p className="text-center text-gray-700 text-lg md:text-xl leading-7">
    //       We started our operations as freelancers, by understanding problems in
    //       the freelance world and the software industry we have created a
    //       business model where both of these factors are coped with from the
    //       client’s perspective and customer satisfaction is prioritized at the
    //       highest level. We are keen to implement blockchain applications
    //       parallel to the existing business logic of our customers.
    //     </p>
    //     <p className="text-center text-gray-700 text-lg md:text-xl leading-7">
    //       Our business model involved providing cost effective development with
    //       the customer's involvement in each step along the way. We keep our
    //       customers updated with what has been done in their project and also
    //       keep inquiring what more does the customer desire to make prompt
    //       changes wherever required.
    //     </p>
    //   </div>
    // </div>

    // new
    <div className="flex justify-center items-center">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 place-items-center py-16 md:px-5  max-w-7xl">
      <div className="px-5"> 
        <Image src={"/images/aboutImages/mission.jpg"}  alt="image" width={400} height={600} className="h-60 w-full md:h-[440px]   rounded-3xl"/>
      </div>
      <div className="flex flex-col gap-3 px-5">
        <p className="text-sky-950">About Us</p>
        <h4 className="  text-2xl  md:text-4xl lg:text-5xl font-bold">We Are Professional Software Service & development</h4>
        <p>Founded with a vision to redefine technological excellence, BawdicSoft is a dynamic team of skilled professionals passionate about harnessing the power of technology to solve real-world challenges. Our expertise spans across Artificial Intelligence (AI), Blockchain, Web Applications, Mobile Applications, and WordPress Website Development, enabling us to provide holistic solutions tailored to your unique needs.</p>
        <div className="flex gap-1 md:gap-3 items-center pt-5">
          <Link href={""} className="bg-sky-950 text-white  py-3 px-2 text-sm md:text-lg text-center md:py-4 md:px-4 lg:px-16 hover:bg-sky-700 rounded-xl font-semibold">Show More</Link>
          <Link href={""} className="bg-sky-950 text-white p-2 md:p-3 lg:p-4 rounded-full hover:bg-sky-700"><Image src="/images/aboutImages/videoicon.svg" alt="" width={30} height={30} className=""/></Link>
          <p className="text-black  text-sm md:text-md">WATCH VIDEO</p>
        </div>
      </div>
    </div>
    </div>
  );
};
export default DocumtentsSectins;
