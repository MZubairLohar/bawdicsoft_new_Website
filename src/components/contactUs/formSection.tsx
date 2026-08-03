// "use client";
// import { FC, useRef, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa6";
// import axiosLib from "./link";
// import Modal from "../modal/modal";
// import Link from "next/link";
// import { MdFacebook } from "react-icons/md";
// import { GrTwitter } from "react-icons/gr";
// import { FaLinkedin } from "react-icons/fa6";
// import HerSectionimg from "../../../public/images/contactus/softwareBgImage.jpg";
// import { StaticImageData } from "next/image";
// import axios from "axios";
// type heroImg = {
//   img: StaticImageData;
// };
// const data: heroImg = { img: HerSectionimg };
// interface formSectionProps { }

// const FormSection: FC<formSectionProps> = () => {
//   const [responseData, setResponseData] = useState("");
//   const [badResponse, setbadResponse] = useState("");

//   const firstNameRef = useRef<HTMLInputElement>(null);
//   const lastNameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const phoneRef = useRef<HTMLInputElement>(null);
//   const subjectRef = useRef<HTMLInputElement>(null);
//   const messageRef = useRef<HTMLTextAreaElement>(null);

// const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (
//       firstNameRef.current &&
//       lastNameRef.current &&
//       emailRef.current &&
//       phoneRef.current &&
//       subjectRef.current &&
//       messageRef.current
//     ) {
//       const formData = {
//         firstName: firstNameRef.current.value,
//         lastName: lastNameRef.current.value,
//         name:
//           firstNameRef.current.value +
//           " " +
//           lastNameRef.current.value,
//         email: emailRef.current.value,
//         phoneNo: phoneRef.current.value,
//         subject: subjectRef.current.value,
//         message: messageRef.current.value,
//       };

//       console.log("📩 Form Data:", formData);

//       // future API call yahan ayegi
//       // axios.post("/api/user", formData)
//     } else {
//       console.error("⚠️ Refs missing");
//     }
//   };

//   return (<div>

//     {/* New code */}
//     <section
//       className="relative bg-center bg-cover bg-no-repeat flex justify-center h-[1200px] md:h-[750px] items-center  bg-gray-400 bg-blend-multiply  md:mb-80"
//       style={{
//         backgroundImage: `url(${data.img.src})`,
//         // height: "calc(100vh - 48px)",
//       }}
//     >

//         <div className="absolute md:-bottom-60 p-5 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 mx-6 rounded-3xl gap-8 md:gap-0  bg-white shadow-2xl max-w-6xl">

//           <div className="flex flex-col">
//             <p className="text-sm md:text-md text-sky-700 py-3">FORM CONTACT</p>
//             <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Let's Talk to Us</h3>
//             <div className="flex flex-row py-2">
//               <span className="bg-sky-600 w-[100px] h-[2px]"></span>
//               <span className="bg-gray-200 w-[300px] h-[2px]"></span>
//             </div>

//             <form onClick={submitHandler} className="flex flex-col gap-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 <div className="flex flex-col">
//                   <label className="pl-4">First Name</label>
//                   <input ref={firstNameRef} type="text" placeholder="First Name" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2" />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="pl-4">Last Name</label>
//                   <input ref={lastNameRef}  type="text" placeholder="Last Name" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 <div className="flex flex-col">
//                   <label className="pl-4">Phone Number</label>
//                   <input ref={phoneRef} type="text" placeholder="Phone Number" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="pl-4">Email</label>
//                   <input ref={emailRef} type="email" placeholder="Email" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <label className="pl-4">Subject</label>
//                 <input ref={subjectRef} type="text" placeholder="Subject" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
//               </div>
//               <div className="flex flex-col">
//                 <label className="pl-4">Message</label>
//                 <textarea ref={messageRef} placeholder="Message" className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-xl p-4 py-2 " />
//               </div>
//               <button className="bg-sky-950 px-8 md:px-16 hover:bg-sky-700 py-3 md:py-4 md:basis-1/4 text-white font-semibold  rounded-3xl"> Submit</button>
//             </form>
//           </div>

//           <div className="md:px-10 lg:px-16 ">
//             <p className="text-sm md:text-md text-sky-700 py-3">SOCIAL MEDIA</p>
//             <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold">Connect With Us</h4>
//             <div className="flex flex-row py-2">
//               <span className="bg-sky-600 w-[100px] h-[2px]"></span>
//               <span className="bg-gray-200 w-[300px] h-[2px]"></span>
//             </div>
//             <p>Stay connected with Bawdicsoft for the latest updates, insights, and innovations in technology. Follow us on social media to join our community and see how we’re shaping the future with cutting-edge solutions in AI, Blockchain, and more.
//             </p>
//             <div className="flex  flex-wrap gap-2 pt-10">
//               <Link href="https://wa.me/+923178866631" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><FaWhatsapp className="text-white text-2xl" /></Link>
//               <Link href="https://www.linkedin.com/company/77098544/admin/feed/posts/" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><FaLinkedin className="text-white text-2xl" /></Link>
//               <Link href="https://twitter.com/BawdicSoft" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><GrTwitter className="text-white text-2xl" /></Link>
//               <Link href="https://www.facebook.com/BawdicSoftPvtLtd" target="_blank" className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "><MdFacebook className="text-white text-2xl" /></Link>

//             </div>
//           </div>
//         </div>

//     </section>
//   </div>
//   );
// };
// export default FormSection;

"use client";
import { FC, useRef, useState } from "react";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa6";
import { MdFacebook } from "react-icons/md";
import { GrTwitter } from "react-icons/gr";
import Link from "next/link";
import HerSectionimg from "../../../public/images/contactus/softwareBgImage.jpg";
import { StaticImageData } from "next/image";
import axios from "axios";

type heroImg = {
  img: StaticImageData;
};

const data: heroImg = { img: HerSectionimg };

const FormSection: FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  //
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      firstNameRef.current &&
      lastNameRef.current &&
      emailRef.current &&
      phoneRef.current &&
      subjectRef.current &&
      messageRef.current
    ) {
      setIsSubmitting(true);

      const formData = {
        name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        service: subjectRef.current.value,
        message: messageRef.current.value,
      };

      try {
        const response = await axios.post("/api/admin/leads", formData);

        if (response.data.success) {
          alert("Message sent successfully! We'll get back to you soon.");
          // Clear the form
          firstNameRef.current.value = "";
          lastNameRef.current.value = "";
          emailRef.current.value = "";
          phoneRef.current.value = "";
          subjectRef.current.value = "";
          messageRef.current.value = "";
        } else {
          alert("Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error("️ Refs missing");
      alert("Please fill in all required fields.");
    }
  };

  return (
    <section
      className="relative bg-center bg-cover bg-no-repeat flex justify-center h-[1200px] md:h-[750px] items-center bg-gray-400 bg-blend-multiply md:mb-80"
      style={{ backgroundImage: `url(${data.img.src})` }}
    >
      <div className="absolute md:-bottom-60 p-5 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 mx-6 rounded-3xl gap-8 bg-white shadow-2xl max-w-6xl">
        {/* FORM */}
        <div>
          <p className="text-sky-700 py-3">FORM CONTACT</p>
          <h3 className="text-3xl font-bold">Let's Talk to Us</h3>

          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-2">
              <input
                ref={firstNameRef}
                placeholder="First Name"
                className="bg-sky-100 rounded-xl p-3"
              />
              <input
                ref={lastNameRef}
                placeholder="Last Name"
                className="bg-sky-100 rounded-xl p-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <input
                ref={phoneRef}
                placeholder="Phone Number"
                className="bg-sky-100 rounded-xl p-3"
              />
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                className="bg-sky-100 rounded-xl p-3"
              />
            </div>

            <input
              ref={subjectRef}
              placeholder="Subject"
              className="bg-sky-100 rounded-xl p-3"
            />
            <textarea
              ref={messageRef}
              placeholder="Message"
              className="bg-sky-100 rounded-xl p-3"
            />

            {/* <button
              type="submit"
              className="bg-sky-950 hover:bg-sky-700 text-white font-semibold py-3 rounded-3xl"
            >
              Submit
            </button> */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-sky-950 hover:bg-sky-700 text-white font-semibold py-3 rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        {/* SOCIAL */}
        <div className="md:px-10 lg:px-16 ">
          <p className="text-sm md:text-md text-sky-700 py-3">SOCIAL MEDIA</p>
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Connect With Us
          </h4>
          <div className="flex flex-row py-2">
            <span className="bg-sky-600 w-[100px] h-[2px]"></span>
            <span className="bg-gray-200 w-[300px] h-[2px]"></span>
          </div>
          <p>
            Stay connected with Bawdicsoft for the latest updates, insights, and
            innovations in technology. Follow us on social media to join our
            community and see how we’re shaping the future with cutting-edge
            solutions in AI, Blockchain, and more.
          </p>
          <div className="flex  flex-wrap gap-2 pt-10">
            <Link
              href="https://wa.me/+923178866631"
              target="_blank"
              className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "
            >
              <FaWhatsapp className="text-white text-2xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/77098544/admin/feed/posts/"
              target="_blank"
              className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "
            >
              <FaLinkedin className="text-white text-2xl" />
            </Link>
            <Link
              href="https://twitter.com/BawdicSoft"
              target="_blank"
              className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "
            >
              <GrTwitter className="text-white text-2xl" />
            </Link>
            <Link
              href="https://www.facebook.com/BawdicSoftPvtLtd"
              target="_blank"
              className="flex rounded-full bg-sky-900 justify-center items-center p-2 cursor-pointer "
            >
              <MdFacebook className="text-white text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* </div> */}
    </section>
  );
};

export default FormSection;
