import { FC } from "react";
interface MapSectionProps {}
import HerSectionimg from "../../../public/images/contactus.jpg";
import { StaticImageData } from "next/image";
type heroImg = {
  img: StaticImageData;
};
const data: heroImg = { img: HerSectionimg };
const MapSection: FC<MapSectionProps> = () => {
  return (
    // New Code 
    <div className="flex justify-center items-center my-14 md:my-16 mx-5">
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-7xl lg:px-8 ">
<div className="md:pl-4 md:col-span-2"><iframe className="h-60  md:h-full w-full rounded-3xl" id="gmap_canvas" src="https://maps.google.com/maps?q=Farazana+building+karachi+pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"  scrolling="no" ></iframe></div>
<div className="flex flex-col md:pl-8  p-5 lg:p-12 md:pr-4 gap-5 justify-start md:items-start bg-white shadow-2xl rounded-3xl" style={{
  boxShadow: "0px 4px 13px 3px  rgba(0,0,0,0.10)",
}}>
  <p className="text-sm md:text-md text-sky-700 ">BRANCH</p>
  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">Get in Direction</h2>
  <div className="flex flex-row py-1 md:py-2">
              <span className="bg-sky-600 w-16 lg:w-20 h-[2px]"></span>
              <span className="bg-gray-200 w-32 lg:w-40 h-[2px]"></span>
            </div>
           
            <p className="text-md text-gray-600">Have a vision for your business? Let Bawdicsoft turn it into reality. Contact us today to discuss your project requirements, get a quote, or learn more about how our innovative solutions in AI, Blockchain, Web Apps, WordPress, and Mobile Development can drive your success.</p>
            <div className="flex flex-col gap-2">
              <p className="text-gray-900 font-semibold pb-2">Pakistan</p>
              <div className="flex flex-col gap-5">
                <div className="flex gap-1">  <svg className="w-6 h-6  text-sky-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 21">
    <svg stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
      <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
      <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z"/>
    </svg>
  </svg><p>Farazan Building Karachi, Pakistan</p></div>
                <div className="flex gap-1"> <svg className="w-6 h-6 text-sky-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z"/>
  </svg><p>+92317-8866631</p></div>
                <div className="flex gap-1"> <svg className="w-6 h-6  text-sky-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2"/>
  </svg><p>info@bawdicsoft.com</p></div>
               
              </div>
            </div>
</div>
</div>
   </div>
  );
};
export default MapSection;