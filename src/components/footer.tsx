"use client"
import { FC, useState } from "react"
import logo from "../../public/images/logo.png"
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdFacebook } from "react-icons/md";
import { GrTwitter } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import Image from "next/image"
import Link from "next/link";
interface footerProps { }
const Footer: FC<footerProps> = () => {
    const [showServices, setShowServices] = useState(false);
    return (
    // <footer className="bg-black mt-16 ">
    //     <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    //         <div className="md:flex md:justify-evenly md:gap-30">
    //             <div className="mb-6 md:mb-0">
    //                 <a href="/" className="flex items-center">
    //                     <Image src={logo} className="h-12 w-12  " alt="BowdicSoft Logo" />
    //                     <span className="self-center text-3xl font-semibold  text-white pl-2">BawdicSoft</span>
    //                 </a>
    //                 <p className="text-gray-200 leading-5 text-lg sm:w-[220px]  md:w-[300px]  lg:w-[500px] pt-4">BawdicSoft is a web application, blockchain, DeFi, NFT, and NFT Marketplace Development Company delivering quick and innovative web and web3 solutions with improved security and optimized performance.</p>
    //             </div>
    //             <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
    //                 <div>
    //                     <h2 className="mb-6 text-lg font-extrabold  uppercase text-white">Company</h2>
    //                     <ul className="text-gray-100 font-medium">
    //                         <li className="mb-4">
    //                             <a href="/" className="hover:text-blue-400">Home</a>
    //                         </li>
    //                         <li className="mb-4">
    //                             <a href="/portfolio" className="hover:text-blue-400">Portfolio</a>
    //                         </li>
    //                         <li className="mb-4">
    //                             <a href="/about-us" className="hover:text-blue-400">About Us</a>
    //                         </li>
    //                         <li className="mb-4">
    //                             <a href="/careers" className="hover:text-blue-400">Careers</a>
    //                         </li>
    //                         <li className="mb-4">
    //                             <a href="/contact-us" className="hover:text-blue-400">Contact Us</a>
    //                         </li>
    //                     </ul>
    //                 </div>
    //                 <div>
    //                     <h2 className="mb-6 text-lg  font-extrabold  uppercase  text-white">Services</h2>
    //                     <ul className="text-gray-100  font-medium">
    //                         <li className="mb-4">
    //                             <a href="/web-application" className=" hover:text-blue-400">Web Application</a>
    //                         </li>
    //                         <li className="mb-4">
    //                             <a href="/defi" className="hover:text-blue-400">Blockchain</a>
    //                         </li>
    //                         <li>
    //                             <a href="/artificial-intelligence" className="hover:text-blue-400">Artifitial Intiligiance</a>
    //                         </li>
    //                     </ul>
    //                 </div>
    //                 <div className="md:flex-none flex justify-center md:mt-0 sm:-mt-16 md:justify-start md:items-start items-start flex-col">
    //                     <h2 className="mb-6 text-lg  font-extrabold  uppercase  text-white">Contact Us</h2>
    //                     <ul className="text-gray-100  font-medium">
    //                         <li className="mb-4 flex gap-2">
    //                             <MdOutlineMailOutline className="text-white text-2xl" /><span className="">info@bawdicsoft.com</span>
    //                         </li>
    //                         <li className="flex gap-2">
    //                             <FaPhone className="text-white text-2xl" /> <span className="">+1(203)-902-1401</span>
    //                         </li>
    //                     </ul>

    //                     <div className="flex justify-evenly  flex-wrap gap-2 pt-10 ">
    //                         <Link href="https://wa.me/+923178866631" target="_blank" className="flex rounded-full bg-green-500 justify-center items-center p-2 cursor-pointer "><FaWhatsapp className="text-white text-2xl" /></Link>
    //                         <Link href="https://www.linkedin.com/company/77098544/admin/feed/posts/" target="_blank" className="flex rounded-full bg-sky-700 justify-center items-center p-2 cursor-pointer "><FaLinkedin className="text-white text-2xl" /></Link>
    //                         <Link href="https://twitter.com/BawdicSoft" target="_blank" className="flex rounded-full bg-sky-600 justify-center items-center p-2 cursor-pointer "><GrTwitter className="text-white text-2xl" /></Link>
    //                         <Link href="https://www.facebook.com/BawdicSoftPvtLtd" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><MdFacebook className="text-white text-2xl" /></Link>


    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
    //         <div className="sm:flex sm:items-center sm:justify-between md:px-14">
    //             <span className="text-md  text-gray-300 sm:text-center ">© 2018 <a href="/" className="hover:underline">BawdicSoft LLC</a>. All rights reserved.
    //             </span>

    //             <div>
    //                 <p className="text-white text-md ">Privacy Policy</p>
    //             </div>
    //         </div>
    //     </div>
    // </footer>

    // New Footer
 <div className="py-10 mt-52 bg-gradient-to-r from-sky-950 rounded-tr-[420px]  rounded-tl-[420px]   via-sky-700 via-30% to-sky-600 to-70%">
 <div className="flex justify-center items-center">
    <div className="max-w-7xl flex flex-col justify-center gap-3 items-center px-5">
  <div className="mb-6 md:mb-0 flex flex-col gap-3">
              <a href="/" className="flex items-center justify-center">
                  <Image src={logo} className="h-12 w-12  " alt="BowdicSoft Logo" />
                  <span className="self-center text-2xl md:text-3xl font-bold  text-white pl-2">BawdicSoft</span>
              </a>
                  <p className="text-md font-semibold text-gray-200 text-center">Sofware Services and Development</p>
                  <div className="flex justify-evenly  flex-wrap gap-2 py-5"> 
                    <Link href="https://wa.me/+923178866631" target="_blank" className=" cursor-pointer "><FaWhatsapp className="text-gray-100 text-2xl lg:text-3xl"/></Link>
                    <Link href="https://www.linkedin.com/company/77098544/admin/feed/posts/" target="_blank" className=" cursor-pointer "><FaLinkedin className="text-gray-100 text-2xl lg:text-3xl"/></Link>
                    <Link href="https://twitter.com/BawdicSoft" target="_blank" className=" cursor-pointer "><GrTwitter  className="text-gray-100 text-2xl lg:text-3xl"/></Link>
                    <Link href="https://www.facebook.com/BawdicSoftPvtLtd" target="_blank" className=" cursor-pointer "><MdFacebook   className="text-gray-100 text-2xl lg:text-3xl"/></Link>
                  </div>
          </div>
 
 <div className="flex justify-evenly flex-wrap items-center">
    
    <Link href={"/"} className="text-white px-5 hover:text-gray-500 font-medium text-sm">Home</Link>
<button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-white " type="button">Services<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" onClick={() => setShowServices(!showServices)}>
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>
{showServices && <div id="dropdownDelay" className="z-10 bg-sky-100 divide-y divide-gray-100 rounded-lg shadow w-44 ">
    <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDelayButton">
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Dashboard</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Settings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Earnings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Sign out</a>
      </li>
    </ul>
</div>}
<Link href={"/"} className="text-white hover:text-gray-500  px-5 font-medium text-sm">Portfolio</Link>
<Link href={"/"} className="text-white hover:text-gray-500 px-5 font-medium text-sm">About Us</Link>
<Link href={"/"} className="text-white hover:text-gray-500  px-5 font-medium text-sm">Careers</Link>
<Link href={"/"} className="text-white hover:text-gray-500 px-5 font-medium text-sm">Contact Us</Link>
 </div>
 < p className="text-sm md:text-base text-gray-200 text-center">© 2018 BawdicSoft. All rights reserved.</p>
    </div>
  </div> 
    </div>
    )
}
export default Footer;