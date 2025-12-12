// "use client";
// import Image from "next/image";
// import React, { FC, useState } from "react";
// import { allData } from "../allData";

// interface PortFolioSectionProps {}


// const PortFolioSection: FC<PortFolioSectionProps> = () => {
//   const [data, setData] = useState(allData);
//   const [selectedProject, setSelectedProject] = useState<typeof allData[0] | null>(null);
//   const [showWordPressSub, setShowWordPressSub] = useState(false);

//   const openModal = (project: typeof allData[0]) => setSelectedProject(project);
//   const closeModal = () => setSelectedProject(null);

//   // Filter main categories
//   const filterHandler = (category: string) => {
//     setShowWordPressSub(false); // reset sub-buttons visibility
//     if (category === "all") {
//       setData(allData);
//     } else if (category === "wordpress") {
//       setData(allData.filter(p => p.category === "wordpress"));
//       setShowWordPressSub(true); // show sub-buttons
//     } else {
//       setData(allData.filter(p => p.category === category));
//     }
//   };

//   // Filter WordPress sub-categories
//   const filterWordPressSub = (subCategory: string) => {
//     setData(allData.filter(p => p.subCategory === subCategory));
//   };

//   return (
//      <div className="bg-gradient-to-r from-sky-950 via-sky-700 via-30% to-sky-600 to-70% flex justify-center min-h-screen">
//       <div className="pt-24 max-w-7xl w-full px-5 md:px-12">
//         <div className="text-center mb-16">
//   <a className="text-3xl md:text-4xl font-bold py-3 md:py-5 px-10 md:px-40 border-4 border-white rounded-[35px] bg-sky-700 text-white hover:bg-sky-600 transition-all duration-300 cursor-pointer">
//     Portfolio
//   </a>
// </div>
    

//         {/* Main Filter Buttons */}
//         <div className="py-20 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 md:px-12 px-5 ">
//           <button
//             className="text-lg border-blue-400 md:text-xl font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600 py-3 min-w-min text-white"
//             onClick={() => filterHandler("all")}
//           >
//             All
//           </button>
//           <button
//             className="text-lg border-blue-400 md:text-xl font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
//             onClick={() => filterHandler("wordpress")}
//           >
//             WordPress
//           </button>
//           <button
//             className="text-lg border-blue-400 md:text-xl font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
//             onClick={() => filterHandler("ai")}
//           >
//             AI
//           </button>
//           <button
//             className="text-lg border-blue-400 md:text-xl font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
//             onClick={() => filterHandler("threeDWeb")}
//           >
//             3D Model Website
//           </button>
//         </div>

//         {/* WordPress Sub-Category Buttons */}
//         {showWordPressSub && (
//           <div className="flex justify-center items-center mb-10 gap-4">
//             <button
//               className="text-md border-blue-400 md:text-md font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 px-5 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
//               onClick={() => filterWordPressSub("wordpress-ecommerce")}
//             >
//               E-commerce
//             </button>
//             <button
//               className="text-md border-blue-400 md:text-md font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 px-12 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
//               onClick={() => filterWordPressSub("wordpress-blog")}
//             >
//               Blog
//             </button>
//             <button
//               className="text-md border-blue-400 md:text-md font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 px-12 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
//               onClick={() => filterWordPressSub("wordpress-others")}
//             >
//               Others
//             </button>
//           </div>
//         )}

//         Cards
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {data.map((product) => (
//             <div key={product.id} className="relative group">
//               {/* CARD IMAGE */}
//               <div className="relative overflow-hidden rounded-tl-[40px] rounded-tr-[40px] rounded-bl-[0px] rounded-br-[40px] shadow-lg transition-transform group-hover:scale-105 cursor-pointer">
//                 <Image
//                   src={product.projectImage}
//                   alt={product.projectName}
//                   width={600}
//                   height={400}
//                   className="w-full h-72 object-cover"
//                 />

//                 {/* Hover overlay */}
//                 <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <h3 className="text-white text-lg font-bold mb-2">
//                     {product.projectName}
//                   </h3>
//                   <p className="text-white text-sm">{product.projectDesc}</p>
//                 </div>
//               </div>

//               {/* VIEW DETAILS BUTTON */}
//               <button
//                 onClick={() => openModal(product)}
//                 className="mt-3 w-full py-3 bg-blue-600 text-white font-semibold rounded-b-[40px] hover:bg-blue-700 transition-all duration-300 shadow-md"
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* MODAL */}
//         {selectedProject && (
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in"
//             onClick={closeModal}
//           >
//             <div
//               className="bg-white rounded-xl w-11/12 md:w-2/3 lg:w-1/2 shadow-2xl relative transform scale-95 transition-transform duration-300 animate-slide-in"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Close Button */}
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-gray-700 text-3xl font-bold hover:text-gray-900 transition"
//               >
//                 &times;
//               </button>

//               {/* Modal Content (NO IMAGE) */}
//               <div className="p-6 md:p-8">
//                 <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
//                   {selectedProject.projectName}
//                 </h3>
//                 <p className="text-gray-700 mb-6">{selectedProject.projectDesc}</p>
//                 <a
//                   href={selectedProject.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
//                 >
//                   Visit Project
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Animations */}
//         <style jsx>{`
//           .animate-fade-in {
//             animation: fadeIn 0.3s ease forwards;
//           }
//           .animate-slide-in {
//             animation: slideIn 0.3s ease forwards;
//           }
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//             }
//             to {
//               opacity: 1;
//             }
//           }
//           @keyframes slideIn {
//             from {
//               opacity: 0;
//               transform: translateY(-20px) scale(0.95);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0) scale(1);
//             }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default PortFolioSection;

"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import { allData } from "../allData";

interface PortFolioSectionProps {}

const PortFolioSection: FC<PortFolioSectionProps> = () => {
  const [data, setData] = useState(allData);
  const [selectedProject, setSelectedProject] = useState<typeof allData[0] | null>(null);
  const [showWordPressSub, setShowWordPressSub] = useState(false);

  const openModal = (project: typeof allData[0]) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  // Filter main categories
  const filterHandler = (category: string) => {
    setShowWordPressSub(false); // reset sub-buttons visibility
    if (category === "all") {
      setData(allData);
    } else if (category === "wordpress") {
      setData(allData.filter(p => p.category === "wordpress"));
      setShowWordPressSub(true); // show sub-buttons
    } else {
      setData(allData.filter(p => p.category === category));
    }
  };

  // Filter WordPress sub-categories
  const filterWordPressSub = (subCategory: string) => {
    setData(allData.filter(p => p.subCategory === subCategory));
  };

  return (
    <div className="bg-gradient-to-r from-sky-950 via-sky-700 via-30% to-sky-600 to-70% flex justify-center min-h-screen">
      <div className="pt-24 max-w-7xl w-full px-5 md:px-12">
        {/* Portfolio Heading */}
        <div className="text-center mb-16">
          <a className="text-3xl md:text-4xl font-bold py-3 md:py-5 px-10 md:px-40 border-4 border-white rounded-[35px] bg-sky-700 text-white hover:bg-sky-600 transition-all duration-300 cursor-pointer">
            Portfolio
          </a>
        </div>

        {/* Main Filter Buttons */}
        <div className="py-20 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 md:px-12 px-5 ">
          <button
            className="text-lg border-blue-400 md:text-xl font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600 py-3 min-w-min text-white"
            onClick={() => filterHandler("all")}
          >
            All
          </button>
          <button
            className="text-lg border-blue-400 md:text-xl font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
            onClick={() => filterHandler("wordpress")}
          >
            WordPress
          </button>
          <button
            className="text-lg border-blue-400 md:text-xl font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
            onClick={() => filterHandler("ai")}
          >
            AI
          </button>
          <button
            className="text-lg border-blue-400 md:text-xl font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
            onClick={() => filterHandler("threeDWeb")}
          >
            3D Model Website
          </button>
        </div>

        {/* WordPress Sub-Category Buttons */}
        {showWordPressSub && (
          <div className="flex justify-center items-center mb-10 gap-4">
            <button
              className="text-md border-blue-400 md:text-md font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 px-5 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
              onClick={() => filterWordPressSub("wordpress-ecommerce")}
            >
              E-commerce
            </button>
            <button
              className="text-md border-blue-400 md:text-md font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 px-12 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
              onClick={() => filterWordPressSub("wordpress-blog")}
            >
              Blog
            </button>
            <button
              className="text-md border-blue-400 md:text-md font-bold cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 px-12 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600"
              onClick={() => filterWordPressSub("wordpress-others")}
            >
              Others
            </button>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {data.map((product) => (
            <div key={product.id} className="relative group">
              {/* CARD IMAGE */}
              <div className="relative overflow-hidden rounded-tl-[40px] rounded-tr-[40px] rounded-bl-[0px] rounded-br-[40px] shadow-lg transition-transform group-hover:scale-105 cursor-pointer">
                <Image
                  src={product.projectImage}
                  alt={product.projectName}
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover"
                />

                {/* Hover overlay with short description */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-white text-lg font-bold mb-1">
                    {product.projectName}
                  </h3>
                  <p className="text-white text-sm line-clamp-2">
                    {product.projectDesc}
                  </p>
                </div>
              </div>

              {/* VIEW DETAILS BUTTON */}
              <button
                onClick={() => openModal(product)}
                className="mt-3 w-full py-3 bg-blue-600 text-white font-semibold rounded-b-[40px] hover:bg-blue-700 transition-all duration-300 shadow-md"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl w-11/12 md:w-2/3 lg:w-1/2 shadow-2xl relative transform scale-95 transition-transform duration-300 animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-700 text-3xl font-bold hover:text-gray-900 transition"
              >
                &times;
              </button>

              {/* Modal Content WITHOUT IMAGE */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                  {selectedProject.projectName}
                </h3>
                <p className="text-gray-700 mb-6 whitespace-pre-line">
                  {selectedProject.projectDesc}
                </p>
                <a
                  href={selectedProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Visit Project
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.3s ease forwards;
          }
          .animate-slide-in {
            animation: slideIn 0.3s ease forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PortFolioSection;



{
  /* <Link
key={product.id}
href={`${product.href}`}
className="relative"
>
<div className="relative">
  <Image
    width={500}
    height={500}
    alt={product.alternate}
    src={product.projectImage}
    className="rounded-2xl"
  />
  <div className="hover:bg-[#3e7cba] opacity-[0.8] absolute top-0 w-full rounded-2xl h-full transition duration-500">
    <div className="flex gap-2 justify-center items-center h-full opacity-0 hover:opacity-100">
      <div className="font-extrabold text-slate-100 text-2xl">
        {product.projectName}
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 font-extrabold text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
<div className="mt-4 text-center md:text-xl text-base  text-white font-mono">
  <h4>{product.mainTitle}</h4>
</div>
</Link> */
}
