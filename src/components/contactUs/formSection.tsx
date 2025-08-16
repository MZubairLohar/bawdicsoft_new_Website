"use client";
import { FC, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import axiosLib from "./link";
import Modal from "../modal/modal";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { GrTwitter } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa6";
import HerSectionimg from "../../../public/images/contactus/softwareBgImage.jpg";
import { StaticImageData } from "next/image";
type heroImg = {
  img: StaticImageData;
};
const data: heroImg = { img: HerSectionimg };
interface formSectionProps { }

const FormSection: FC<formSectionProps> = () => {
  const [responseData, setResponseData] = useState("");
  const [badResponse, setbadResponse] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const filRef = useRef<HTMLInputElement | null>(null);


  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      firstNameRef.current &&
      lastNameRef.current &&
      emailRef.current &&
      phoneRef.current &&
      messageRef.current &&
      filRef.current
    ) {
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const name = firstName + lastName;
      const email = emailRef.current.value;
      const phoneNo = phoneRef.current.value;
      const message = messageRef.current.value;
      const fileInput = filRef.current;
      const file = fileInput.files && fileInput.files[0];
      axiosLib
        .post("/api/user", {
          name,
          email,
          phoneNo,
          message,
          file,
        })
        .then((res) => setResponseData(res.data.message))
        .catch((err) => setbadResponse(err));
    } else {
      // Handle the case where one or more refs are undefined
      console.error("One or more refs are undefined");
    }
  };

  return (<div>
    {/* <div className="flex justify-center items-center">
    {responseData && <Modal result1={responseData} result2={badResponse} />}
    
        {badResponse && <Modal result2={badResponse} result1={responseData} />}

        <div className=" grid grid-cols-1 md:gap-32 md:grid-cols-2 pt-20 pb-20  px-5 ">
          <div>
          <p className=" text-2xl md:text-3xl text-center font-extrabold text-sky-900 leading-7 pb-4">
          Message Us
            </p>
            <form className="" onSubmit={submitHandler}>
            <div className="relative z-0  mb-5 group">
            <input
            type="text"
            ref={nameRef}
            name="name"
                  id="floating_email"
                  className="block hover:border-blue-500 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="relative z-0 mb-5 group">
              <input
              type="email"
              ref={emailRef}
              name="email"
              id="floating_email"
              className="block hover:border-blue-500 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Email"
              required
              />
              </div>
              <div className="relative z-0  mb-5 group">
                <input
                type="number"
                  ref={phoneRef}
                  name="phoneNumber"
                  id="floating_email"
                  className="block hover:border-blue-500 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Phone"
                  required
                  />
                  </div>
                  
                  <textarea
                  id="message"
                  ref={messageRef}
                  name="message"
                  rows={4}
                  className="block  hover:border-blue-500  border-2 peer p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Enter Your Message..."
                  ></textarea>
                  <input
                  type="file"
                  className="block w-full text-sm 
                  file:mr-4 file:py-2 file:px-4 file:rounded-md
                  file:border-0 file:text-sm file:font-semibold
                  file:bg-sky-950 file:text-white pt-5
                  hover:file:bg-sky-700"
                  />
                  <button
                type="submit"
                className="block py-2.5 px-16 text-sm bg-sky-950  text-white   font-semibold rounded-[12px] mt-8  hover:bg-sky-700"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="flex   pt-16 md:pt-0 flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="font-black text-[20px] leading-5 text-sky-900">
              Email:
              </p>
              <p className="text-gray-700 text-lg leading-4">
              info@bawdicsoft.com
              </p>
              </div>
              <div className="flex flex-col gap-4">
              <p className="font-black text-[20px] leading-5 text-sky-900">
              Phone:
              </p>
              <p className="text-gray-700 text-lg ">+1(203)-902-1401</p>
              <a
              href="https://wa.me/+923178866631"
              target="_blank"
              className="bg-sky-950 py-2 hover:bg-sky-700  rounded-[8px] flex justify-center gap-2 md:gap-4 w-[180px] md:w-[220px] items-center"
              >
              <FaWhatsapp className="text-white font-bold  text-[20px] md:text-[30px] " />
              <span className="text-white font-bold text-16px md:text-[18px]">
              For Whatsapp
              </span>
              </a>
            </div>
          </div>
        </div>
      </div> */}
    {/* New Code */}
    {/* <div className="bg-gray-200 flex  flex-col items-center px-2 md:px-8">
      {responseData && <Modal result1={responseData} result2={badResponse} />}

      {badResponse && <Modal result2={badResponse} result1={responseData} />}
      <h4 className="  text-2xl md:text-3xl lg:text-4xl font-bold text-center pt-16">Message Us</h4>
      <div className="">
        <div className="grid  grid-cols-1 md:grid-cols-2 justify-items-start md:justify-items-end md:px-8 max-w-7xl">
           left container
          <div className="bg-white flex flex-col items-center  pt-10 pb-16 my-20 rounded-3xl">
            <h3 className="font-bold text-xl md:text-3xl text-gray-600 px-4 md:px-8 text-center">We are Here Whenever Your Need Us</h3>
            <p className=" text-[16px] text-gray-600 text-center px-8 ">Trust Us With Confidence, Knowing that Your Inquiries and Needs are Our Top Priority.</p>
            <form className="max-w-md px-5 pt-8" onSubmit={submitHandler}>
              <div className="flex flex-col gap-8">
                <div className="flex gap-2 md:gap-4">
                  <div className="relative w-full  h-10 md:h-12">
                    <input
                      className=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50   placeholder-shown:border-blue-gray-200   border  border-t-transparent text-sm px-3 py-2.5 rounded-[7px]  border-sky-700"
                      ref={firstNameRef} /><label
                        className="flex w-full h-full  pointer-events-none absolute left-0 font-normal  transition-all -top-1.5  text-sm    before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1  before:rounded-tl-md before:border-t  before:border-l before:pointer-events-none before:transition-all  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1  after:rounded-tr-md  after:border-t   after:border-r after:pointer-events-none     text-sky-700 before:border-sky-700  after:border-sky-700">
                      First Name
                    </label>
                  </div>

                  <div className="relative w-full  h-10 md:h-12">
                    <input
                      className=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50   placeholder-shown:border-blue-gray-200   border  border-t-transparent text-sm px-3 py-2.5 rounded-[7px]  border-sky-700"
                      ref={lastNameRef} /><label
                        className="flex w-full h-full  pointer-events-none absolute left-0 font-normal  transition-all -top-1.5  text-sm    before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1  before:rounded-tl-md before:border-t  before:border-l before:pointer-events-none before:transition-all  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1  after:rounded-tr-md  after:border-t   after:border-r after:pointer-events-none    text-sky-700 before:border-sky-700  after:border-sky-700">
                      Last Name
                    </label>
                  </div>
                </div>
                <div className="relative w-full  h-10 md:h-12">
                  <input
                    className=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50   placeholder-shown:border-blue-gray-200   border  border-t-transparent text-sm px-3 py-2.5 rounded-[7px]  border-sky-700"
                    ref={emailRef} /><label
                      className="flex w-full h-full  pointer-events-none absolute left-0 font-normal  transition-all -top-1.5  text-sm    before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1  before:rounded-tl-md before:border-t  before:border-l before:pointer-events-none before:transition-all  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1  after:rounded-tr-md  after:border-t   after:border-r after:pointer-events-none    text-sky-700 before:border-sky-700  after:border-sky-700">
                    Email
                  </label>
                </div>
                <div className="relative w-full  h-10 md:h-12">
                  <input
                    className=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50   placeholder-shown:border-blue-gray-200   border  border-t-transparent text-sm px-3 py-2.5 rounded-[7px]  border-sky-700"
                    ref={phoneRef} /><label
                      className="flex w-full h-full  pointer-events-none absolute left-0 font-normal  transition-all -top-1.5  text-sm    before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1  before:rounded-tl-md before:border-t  before:border-l before:pointer-events-none before:transition-all t after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1  after:rounded-tr-md  after:border-t   after:border-r after:pointer-events-none    text-sky-700  before:border-sky-700  after:border-sky-700">
                    Phone Number
                  </label>
                </div>
                <div className="relative w-full ">
                  <textarea
                    className=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50   placeholder-shown:border-blue-gray-200   border  border-t-transparent text-sm px-3 py-2.5 rounded-[7px]  border-sky-700"
                    ref={messageRef}></textarea><label
                      className="flex w-full h-full  pointer-events-none absolute left-0 font-normal  transition-all -top-1.5  text-sm    before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1  before:rounded-tl-md before:border-t  before:border-l before:pointer-events-none before:transition-all t after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1  after:rounded-tr-md  after:border-t  after:border-r after:pointer-events-none    text-sky-700  before:border-sky-700  after:border-sky-700">
                    Message Here
                  </label>
                </div>
                <input
                  type="file"
                  ref={filRef}
                  className="block w-full text-sm 
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-sky-950 file:text-white pt-5
        hover:file:bg-sky-700"
                />
              </div>

              <button
                type="submit"
                className="block py-3.5 px-0 w-full text-sm bg-sky-950 hover:bg-sky-700  text-white   font-semibold rounded-[12px]  mt-10"
              >
                Share Your Profile
              </button>
            </form>
          </div>
           right container 
          <div className="flex gap-5 md:gap-10 flex-col md:w-[280px] lg:w-[400px] xl:w-[450px]  md:pt-10 pb-16   md:my-16">
            <div className="bg-white flex-col gap-2 p-5 rounded-3xl  w-full  shadow-md">
              <h3 className="font-bold text-[20px]  text-gray-700 ">Working Hours</h3>
              <div className="flex gap-2 pt-5"> <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                <p className="text-[16px] text-gray-600 font-normal">Mon-Sat: 8 AM-18 PM</p></div>
            </div>
            <div className="bg-white flex-col gap-2 p-5 rounded-3xl  w-full shadow-md">
              <h3 className="font-bold text-[20px] text-gray-700">Address</h3>
              <div className="flex gap-2 pt-5 "><svg className="w-6 h-6 text-gray-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 21">
                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
                </g>
              </svg>

                <p className="text-[16px] text-gray-600 font-normal">Farzana Building karachi,Pakistan</p>  </div>
            </div>
            <div className="bg-sky-950 flex-col gap-2 p-5 rounded-3xl  w-full shadow-md">
              <h3 className="font-bold text-[20px] text-white">Email</h3>
              <div className="flex gap-2 pt-5"><svg xmlns="http://www.w3.org/2000/svg" fill="#eee" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
                <p className="text-[16px] text-gray-200 font-normal">info@bawdicsoft.com</p></div>
            </div>
            <div className="bg-sky-950 flex-col gap-2 p-5 rounded-3xl w-full  shadow-md">
              <h3 className="font-bold text-[20px] text-white">Call Us</h3>
              <div className="flex gap-2 pt-5"> <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
                <p className="text-[16px] text-gray-200 font-normal">+1(203)-902-1401</p></div>
            </div>
            <Link
              href="https://wa.me/+923178866631"
              target="_blank"
              className="bg-sky-950 py-3 hover:bg-sky-700   w-full  rounded-[8px] flex px-5 gap-2 md:gap-2   items-center"
            >
              <FaWhatsapp className="text-white font-bold  text-[20px] md:text-[30px] " />
              <span className="text-white font-bold text-16px md:text-[18px]">
                For Whatsapp
              </span>
            </Link>

          </div>
        </div>
      </div>
    </div> */}


    {/* New code */}
    <section
      className="relative bg-center bg-cover bg-no-repeat flex justify-center h-[1200px] md:h-[750px] items-center  bg-gray-400 bg-blend-multiply  md:mb-80"
      style={{
        backgroundImage: `url(${data.img.src})`,
        // height: "calc(100vh - 48px)",
      }}
    >

        <div className="absolute md:-bottom-60 p-5 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 mx-6 rounded-3xl gap-8 md:gap-0  bg-white shadow-2xl max-w-6xl">
       
          <div className="flex flex-col">
            <p className="text-sm md:text-md text-sky-700 py-3">FORM CONTACT</p>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Let's Talk to Us</h3>
            <div className="flex flex-row py-2">
              <span className="bg-sky-600 w-[100px] h-[2px]"></span>
              <span className="bg-gray-200 w-[300px] h-[2px]"></span>
            </div>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="pl-4">First Name</label>
                  <input type="text" placeholder="First Name" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2" />
                </div>
                <div className="flex flex-col">
                  <label className="pl-4">Last Name</label>
                  <input type="text" placeholder="Last Name" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="pl-4">Phone Number</label>
                  <input type="text" placeholder="Phone Number" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
                </div>
                <div className="flex flex-col">
                  <label className="pl-4">Email</label>
                  <input type="email" placeholder="Email" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="pl-4">Subject</label>
                <input type="text" placeholder="Subject" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
              </div>
              <div className="flex flex-col">
                <label className="pl-4">Message</label>
                <textarea  placeholder="Message" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
              </div>
              <button className="bg-sky-950 px-8 md:px-16 hover:bg-sky-700 py-3 md:py-4 md:basis-1/4 text-white font-semibold  rounded-3xl"> Submit</button>
            </form>
          </div>
       
          <div className="md:px-10 lg:px-16 ">
            <p className="text-sm md:text-md text-sky-700 py-3">SOCIAL MEDIA</p>
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold">Connect With Us</h4>
            <div className="flex flex-row py-2">
              <span className="bg-sky-600 w-[100px] h-[2px]"></span>
              <span className="bg-gray-200 w-[300px] h-[2px]"></span>
            </div>
            <p>Stay connected with Bawdicsoft for the latest updates, insights, and innovations in technology. Follow us on social media to join our community and see how we’re shaping the future with cutting-edge solutions in AI, Blockchain, and more.
            </p>
            <div className="flex  flex-wrap gap-2 pt-10">
              <Link href="https://wa.me/+923178866631" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><FaWhatsapp className="text-white text-2xl" /></Link>
              <Link href="https://www.linkedin.com/company/77098544/admin/feed/posts/" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><FaLinkedin className="text-white text-2xl" /></Link>
              <Link href="https://twitter.com/BawdicSoft" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><GrTwitter className="text-white text-2xl" /></Link>
              <Link href="https://www.facebook.com/BawdicSoftPvtLtd" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><MdFacebook className="text-white text-2xl" /></Link>


            </div>
          </div>
        </div>
   
    </section>
  </div>
  );
};
export default FormSection;
