import { FC } from "react";
import mission from "../../../public/images/aboutImages/mission.jpg";
import vision from "../../../public/images/aboutImages/vision.jpg";
import { StaticImageData } from "next/image";
import Image from "next/image";

import AnimatedComponentLeft from "../home/animationLeft";
import AnimatedComponentRight from "../home/animationRight";
interface OurVisionMissionProps { }
type heroImg = {
  img: StaticImageData;
};
const data: heroImg[] = [{ img: mission }, { img: vision }];
const OurVisionMission: FC<OurVisionMissionProps> = () => {
  return (
    // <div className="flex justify-center">
    //   <div className="bg-white pt-5 md:pt-20 md:px-20 px-5 pb-16 max-w-7xl">
    //     {/*  */}
    //     <div className="grid grid-clos-1 md:grid-cols-2  gap-16 pt-10 ">
    //       <div className="flex flex-col  ">
    //         <p className="mb-4  text-2xl text-start font-extrabold tracking-tight leading-none  md:text-3xl lg:text-4xl">
    //           Our Vision
    //         </p>
    //         <p className="mb-4 text-start text-lg  text-semibold leading-7  tracking-tight   ">
    //           We desire to generate ideas that would make an impact in the
    //           digital era. We strive to make technology accessible to everyone
    //           regardless of geographical and intellectual boundaries. We want to
    //           be the desirable choice for our customers and to serve them with
    //           the best possible innovative solutions..
    //         </p>
    //       </div>
    //       <AnimatedComponentLeft>
    //         <div>
    //           <Image
    //             src={data[1].img.src}
    //             alt=""
    //             className="w-full h-60 md:w-[500px] md:h-80 "
    //             width={600}
    //             height={600}
    //           />
    //         </div>
    //       </AnimatedComponentLeft>
    //     </div>

    //     {/*  */}
    //     <div className="grid grid-clos-1 md:grid-cols-2  gap-16 pt-10 ">
    //       <AnimatedComponentRight>
    //         <div>
    //           <Image
    //             src={data[0].img.src}
    //             alt=""
    //             className="w-full h-60 md:w-[500px] md:h-80 order-1"
    //             width={600}
    //             height={600}
    //           />
    //         </div>
    //       </AnimatedComponentRight>
    //       <div className="flex flex-col   order-first md:order-none ">
    //         <p className="mb-4  text-2xl text-start font-extrabold tracking-tight leading-none  md:text-3xl lg:text-4xl">
    //           Our Mission
    //         </p>
    //         <p className="mb-4 text-start  text-lg  text-semibold  leading-7 ">
    //           To deliver customized and cost effective digital solutions to our
    //           clients while providing efficiency, automation, and enhanced
    //           security..
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section className="flex justify-center py-20   bg-gradient-to-r from-sky-950   via-sky-700 via-30% to-sky-600 to-70%
    bg-blend-multiply" >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl px-5 md:px-10">
        <div className="text-center bg-white p-8 rounded-3xl flex flex-col justify-start items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="52px" height="52px"><path fill="#fff" d="M113,67.7c0,19.9-21.4,48-49,48s-49-28.1-49-48c0,0,21.4-24,49-24S113,67.7,113,67.7z" /><circle cx="64" cy="79" r="15" fill="#90caf9" /><path fill="#000" d="M124,86.6c-1.1,0-2.1-0.6-2.6-1.6C108.6,61.7,85.6,46,64,46S19.4,61.7,6.6,85.1c-0.8,1.5-2.6,2-4.1,1.2 c-1.5-0.8-2-2.6-1.2-4.1C15.3,56.6,39.9,40,64,40s48.7,16.6,62.6,42.2c0.8,1.5,0.3,3.3-1.2,4.1C125,86.5,124.5,86.6,124,86.6z" /><path fill="#90caf9 " d="M64,118.3c-18.7,0-36.1-12.1-47.6-33.3c-0.8-1.5-0.3-3.3,1.2-4.1c1.5-0.8,3.3-0.3,4.1,1.2 c10.5,19.2,25.9,30.1,42.4,30.1s31.9-11,42.4-30.1c0.8-1.5,2.6-2,4.1-1.2c1.5,0.8,2,2.6,1.2,4.1C100.1,106.2,82.7,118.3,64,118.3z" /><path fill="#90caf9" d="M64,31c-1.7,0-3-1.3-3-3V10c0-1.7,1.3-3,3-3s3,1.3,3,3v18C67,29.7,65.7,31,64,31z" /><path fill="#90caf9" d="M24.1,42.5c-0.7,0-1.4-0.3-2-0.8L16,36.2c-1.2-1.1-1.3-3-0.2-4.2c1.1-1.2,3-1.3,4.2-0.2l6.1,5.5 c1.2,1.1,1.3,3,0.2,4.2C25.7,42.2,24.9,42.5,24.1,42.5z" /><path fill="#90caf9" d="M103.7,42.4c-0.8,0-1.5-0.3-2.1-0.9c-1.2-1.2-1.2-3.1,0-4.2l5.3-5.4c1.2-1.2,3.1-1.2,4.2,0 c1.2,1.2,1.2,3.1,0,4.2l-5.3,5.4C105.3,42.1,104.5,42.4,103.7,42.4z" /><path fill="#90caf9" d="M84.1,33.5c-0.4,0-0.8-0.1-1.1-0.2c-1.5-0.6-2.3-2.4-1.6-3.9l6.1-14.8c0.6-1.5,2.4-2.3,3.9-1.6 c1.5,0.6,2.3,2.4,1.6,3.9l-6.1,14.8C86.4,32.8,85.3,33.5,84.1,33.5z" /><path fill="#90caf9" d="M44,33.6c-1.2,0-2.3-0.7-2.8-1.9L35.1,17c-0.6-1.5,0.1-3.3,1.6-3.9c1.5-0.6,3.3,0.1,3.9,1.6l6.1,14.8 c0.6,1.5-0.1,3.3-1.6,3.9C44.7,33.6,44.4,33.6,44,33.6z" /></svg>
          <h1 className="text-2xl md:text-3xl font-bold uppercase">Vision</h1>
          <p className="text-md text-gray-700">To be a global leader in innovative technology solutions, empowering businesses and individuals to achieve unparalleled success through the seamless integration of AI, blockchain, and digital platforms.</p>
        </div>
        <div className="text-center bg-white p-8 rounded-3xl flex flex-col justify-start items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="52px" height="52px"><path fill="#fff" d="M64,14h30l0,0c-5.5,5.5-5.5,14.5,0,20l0,0H64V14z" /><polygon fill="#fff" points="4,124 64,70 124,124" /><path fill="#90caf9" d="M64,58c-1.7,0-3-1.3-3-3V14c0-1.7,1.3-3,3-3h30c1.2,0,2.3,0.7,2.8,1.9s0.2,2.4-0.7,3.3 C94,18.2,92.9,21,92.9,24s1.2,5.8,3.3,7.9c0.9,0.9,1.1,2.1,0.7,3.3S95.2,37,94,37H67v18C67,56.7,65.7,58,64,58z M67,31h21.4 c-2-4.4-2-9.6,0-14H67V31z" /><path fill="#444b54" d="M126,121.8l-60-54c-1.1-1-2.9-1-4,0l-60,54c-1.2,1.1-1.3,3-0.2,4.2c1.1,1.2,3,1.3,4.2,0.2L64,74l19.4,17.5 L74,100l-8-7.2c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.1-0.2-0.1c-0.1,0-0.2-0.1-0.3-0.1 c-0.1,0-0.2-0.1-0.3-0.1c-0.1,0-0.2,0-0.3-0.1c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0 c-0.1,0-0.2,0-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.2,0.1c-0.1,0.1-0.2,0.1-0.3,0.2 c0,0-0.1,0.1-0.1,0.1l-8,7.2l-3-2.7c-1.2-1.1-3.1-1-4.2,0.2c-1.1,1.2-1,3.1,0.2,4.2l5,4.5c0.6,0.5,1.3,0.8,2,0.8s1.4-0.3,2-0.8 l8-7.2l8,7.2c0.6,0.5,1.3,0.8,2,0.8s1.4-0.3,2-0.8l11.9-10.7l34.1,30.7c0.6,0.5,1.3,0.8,2,0.8c0.8,0,1.6-0.3,2.2-1 C127.3,124.8,127.2,122.9,126,121.8z" /></svg>
          <h1 className="text-2xl md:text-3xl font-bold uppercase">Mission</h1>
          <p className="text-md text-gray-700">At BawdicSoft, our mission is to empower businesses and individuals with innovative technology solutions that drive growth, foster trust, and create lasting impact. We aim to bridge the gap between ideas and reality by delivering reliable, scalable, and transformative digital experiences.</p>
        </div>
        <div className="text-center bg-white p-8 rounded-3xl flex flex-col justify-start items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="52px" height="52px"><path fill="#fff" d="M64,14h30l0,0c-5.5,5.5-5.5,14.5,0,20l0,0H64V14z" /><polygon fill="#fff" points="4,124 64,70 124,124" /><path fill="#90caf9" d="M64,58c-1.7,0-3-1.3-3-3V14c0-1.7,1.3-3,3-3h30c1.2,0,2.3,0.7,2.8,1.9s0.2,2.4-0.7,3.3 C94,18.2,92.9,21,92.9,24s1.2,5.8,3.3,7.9c0.9,0.9,1.1,2.1,0.7,3.3S95.2,37,94,37H67v18C67,56.7,65.7,58,64,58z M67,31h21.4 c-2-4.4-2-9.6,0-14H67V31z" /><path fill="#444b54" d="M126,121.8l-60-54c-1.1-1-2.9-1-4,0l-60,54c-1.2,1.1-1.3,3-0.2,4.2c1.1,1.2,3,1.3,4.2,0.2L64,74l19.4,17.5 L74,100l-8-7.2c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.1-0.2-0.1c-0.1,0-0.2-0.1-0.3-0.1 c-0.1,0-0.2-0.1-0.3-0.1c-0.1,0-0.2,0-0.3-0.1c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0 c-0.1,0-0.2,0-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.2,0.1c-0.1,0.1-0.2,0.1-0.3,0.2 c0,0-0.1,0.1-0.1,0.1l-8,7.2l-3-2.7c-1.2-1.1-3.1-1-4.2,0.2c-1.1,1.2-1,3.1,0.2,4.2l5,4.5c0.6,0.5,1.3,0.8,2,0.8s1.4-0.3,2-0.8 l8-7.2l8,7.2c0.6,0.5,1.3,0.8,2,0.8s1.4-0.3,2-0.8l11.9-10.7l34.1,30.7c0.6,0.5,1.3,0.8,2,0.8c0.8,0,1.6-0.3,2.2-1 C127.3,124.8,127.2,122.9,126,121.8z" /></svg>
          <h1 className="text-2xl md:text-3xl font-bold uppercase">Motto</h1>
          <p className="text-md text-gray-700">"Innovate. Transform. Succeed."
We believe in pushing boundaries, transforming ideas into reality, and paving the way for success through technology.</p>
        </div>
        {/* <div className="text-center bg-white p-8 rounded-lg">
  <h1 className="text-2xl md:text-3xl font-bold">Vision</h1>
  <p className="text-md text-gray-700"> We desire to generate ideas that would make an impact in the
             digital era. We strive to make technology accessible to everyone
           regardless of geographical and intellectual boundaries. We want to
             be the desirable choice for our customers and to serve them with
             the best possible innovative solutions.</p>
      </div> */}
      </div>
    </section>
  );
};
export default OurVisionMission;
