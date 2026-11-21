// import React, { FC } from "react";

// interface PainPoint {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
// }

// const EnterprisePainPointsSection: FC = () => {
//   const painPoints: PainPoint[] = [
//     {
//       title: "No Engineering Team",
//       description: "You have the idea but no developers, and hiring takes months",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Slow Launches",
//       description: "Every month of delay costs users, revenue and investor interest",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//         </svg>
//       ),
//     },
//     {
//       title: "Budget Overruns",
//       description: " Open-ended development with no fixed scope and surprise costs",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Scarce Expertise.",
//       description: " AI and blockchain skills are hard and expensive to hire",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Security Gaps",
//       description: "Weak security in a token or AI product can destroy trust on day one",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Building the Wrong Thing",
//       description: " Features nobody asked for, before the idea is even proven",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <section className="py-16 md:py-24 bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title and Introduction */}
//         <div className="text-center mb-16 md:mb-20">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//             Built for Founders Who Need to Move Faster
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//               Safely
//             </span>
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Common challenges founders face when turning an idea into a product
//           </p>
//         </div>

//         {/* Pain Points Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
//           {painPoints.map((point, index) => (
//             <div
//               key={index}
//               className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300"
//             >
//               {/* Background Glow Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-900/0 to-blue-900/0 rounded-2xl group-hover:from-blue-900/20 group-hover:to-cyan-900/20 transition-all duration-500" />

//               {/* Number Indicator */}
//               <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">
//                 {index + 1}
//               </div>

//               <div className="relative">
//                 {/* Icon and Title Row */}
//                 <div className="flex items-center space-x-4 mb-4">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center text-blue-400">
//                     {point.icon}
//                   </div>
//                   <h3 className="text-xl font-bold text-white">
//                     {point.title}
//                   </h3>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-300 leading-relaxed">
//                   {point.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Bar (Optional) */}
//         {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//           <div className="bg-gray-800/50 rounded-xl p-6">
//             <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">40%</div>
//             <div className="text-gray-300 text-sm">Faster Time-to-Market</div>
//           </div>
//           <div className="bg-gray-800/50 rounded-xl p-6">
//             <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">60%</div>
//             <div className="text-gray-300 text-sm">Reduced Development Costs</div>
//           </div>
//           <div className="bg-gray-800/50 rounded-xl p-6">
//             <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">99.9%</div>
//             <div className="text-gray-300 text-sm">Uptime Guarantee</div>
//           </div>
//           <div className="bg-gray-800/50 rounded-xl p-6">
//             <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">24/7</div>
//             <div className="text-gray-300 text-sm">Support Coverage</div>
//           </div>
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default EnterprisePainPointsSection;

import React, { FC } from "react";

interface PainPoint {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const EnterprisePainPointsSection: FC = () => {
  const painPoints: PainPoint[] = [
    {
      title: "No Engineering Team",
      description:
        "You have the idea but no developers, and hiring takes months",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Slow Launches",
      description:
        "Every month of delay costs users, revenue and investor interest",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Budget Overruns",
      description:
        "Open-ended development with no fixed scope and surprise costs",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Scarce Expertise",
      description: "AI and blockchain skills are hard and expensive to hire",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Security Gaps",
      description:
        "Weak security in a token or AI product can destroy trust on day one",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Building the Wrong Thing",
      description: "Features nobody asked for, before the idea is even proven",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-.654-.052-1.296-.152-1.922z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Introduction */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
            Built for Founders Who Need to Move Faster -
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Safely
            </span>
          </h2>

          <p className="text-[12px] md:text-[16px] text-gray-300 max-w-3xl mx-auto">
            Common challenges founders face when turning an idea into a product
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-7 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/0 to-blue-900/0 rounded-2xl group-hover:from-blue-900/20 group-hover:to-cyan-900/20 transition-all duration-500" />

              <div className="relative">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 shrink-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-cyan-400 transition-colors duration-300">
                    {point.icon}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {point.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-[14px] md:text-[16px]">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterprisePainPointsSection;
