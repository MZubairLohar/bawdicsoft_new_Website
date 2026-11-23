// // import React, { FC } from "react";

// // interface Advantage {
// //   id: number;
// //   title: string;
// //   description: string;
// //   features: string[];
// //   icon: React.ReactNode;
// //   stats?: {
// //     value: string;
// //     label: string;
// //   };
// // }

// // const WhyBawdicSoftSection: FC = () => {
// //   const advantages: Advantage[] = [
// //     {
// //       id: 1,
// //       title: "Senior-First Engineering Teams",
// //       description: "Every project is led by seasoned engineers with 10+ years of enterprise experience, ensuring architectural excellence and robust solutions.",
// //       features: [
// //         "Principal-level technical leadership",
// //         "Average 10+ years industry experience",
// //         "Cross-domain expertise",
// //         "Mentorship-driven culture"
// //       ],
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
// //         </svg>
// //       ),
// //       stats: {
// //         value: "10+ years",
// //         label: "Average Team Experience"
// //       }
// //     },
// //     {
// //       id: 2,
// //       title: "Enterprise Delivery Frameworks",
// //       description: "Proven Agile & DevSecOps methodologies tailored for enterprise-scale projects with integrated security and continuous delivery.",
// //       features: [
// //         "CI/CD pipeline optimization",
// //         "Sprint planning & retrospectives",
// //         "Automated testing suites",
// //         "Infrastructure as Code (IaC)"
// //       ],
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
// //         </svg>
// //       ),
// //       stats: {
// //         value: "40% faster",
// //         label: "Deployment Cycles"
// //       }
// //     },
// //     {
// //       id: 3,
// //       title: "Security-by-Design Mindset",
// //       description: "Security is embedded into every phase of development, from initial architecture to deployment and maintenance.",
// //       features: [
// //         "Threat modeling & risk assessment",
// //         "Secure code review processes",
// //         "Compliance automation",
// //         "Regular security audits"
// //       ],
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
// //         </svg>
// //       ),
// //       stats: {
// //         value: "99.9%",
// //         label: "Security Compliance"
// //       }
// //     },
// //     {
// //       id: 4,
// //       title: "Transparent Reporting & Communication",
// //       description: "Real-time visibility into project progress with detailed metrics, regular syncs, and proactive stakeholder engagement.",
// //       features: [
// //         "Daily/weekly progress reports",
// //         "Interactive dashboards",
// //         "Risk & dependency tracking",
// //         "Stakeholder alignment sessions"
// //       ],
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// //         </svg>
// //       ),
// //       stats: {
// //         value: "24/7",
// //         label: "Project Visibility"
// //       }
// //     },
// //     {
// //       id: 5,
// //       title: "Flexible Engagement Models",
// //       description: "Choose from dedicated teams, project-based, or managed services that align with your business needs and budget.",
// //       features: [
// //         "Fixed-price projects",
// //         "Time & materials",
// //         "Dedicated development teams",
// //         "Hybrid engagement models"
// //       ],
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
// //         </svg>
// //       ),
// //       stats: {
// //         value: "100%",
// //         label: "Client Retention"
// //       }
// //     },
// //   ];

// //   return (
// //     <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Section Header */}
// //         <div className="text-center mb-16 md:mb-20">
// //           <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
// //             <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// //               Why Choose Us
// //             </span>
// //           </div>
// //           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
// //             The BawdicSoft{" "}
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
// //               Difference
// //             </span>
// //           </h2>
// //           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
// //             What sets us apart in delivering exceptional enterprise software solutions with predictable outcomes.
// //           </p>
// //         </div>

// //         {/* Advantages Grid */}
// //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
// //           {advantages.slice(0, 3).map((advantage) => (
// //             <AdvantageCard key={advantage.id} advantage={advantage} />
// //           ))}
// //         </div>

// //         {/* Middle Row - Centered */}
// //         <div className="flex justify-center mb-16">
// //           <div className="w-full max-w-2xl">
// //             <AdvantageCard advantage={advantages[3]} />
// //           </div>
// //         </div>

// //         {/* Bottom Row */}
// //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
// //           <div className="hidden lg:block"></div> {/* Empty spacer */}
// //           <AdvantageCard advantage={advantages[4]} />
// //           <div className="hidden lg:block"></div> {/* Empty spacer */}
// //         </div>

// //         {/* Comparison Table */}
// //        <div className="bg-gradient-to-r from-sky-950 via-sky-700 to-sky-600 rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
// //   <h3 className="text-2xl font-bold text-white mb-8 text-center">
// //     How We Compare to Traditional Vendors
// //   </h3>
// //   <div className="overflow-x-auto">
// //     <table className="w-full">
// //       <thead>
// //         <tr className="border-b border-white/20">
// //           <th className="text-left py-4 px-4 font-semibold text-white/90">Criteria</th>
// //           <th className="text-center py-4 px-4 font-semibold text-white bg-white/20 rounded-lg">BawdicSoft</th>
// //           <th className="text-center py-4 px-4 font-semibold text-white/70">Typical Vendors</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
// //           <td className="py-4 px-4 font-medium text-white">Team Experience Level</td>
// //           <td className="py-4 px-4 text-center">
// //             <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold backdrop-blur-sm">
// //               <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// //                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
// //               </svg>
// //               Senior-First
// //             </span>
// //           </td>
// //           <td className="py-4 px-4 text-center text-white/70">Mixed experience levels</td>
// //         </tr>
// //         <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
// //           <td className="py-4 px-4 font-medium text-white">Security Integration</td>
// //           <td className="py-4 px-4 text-center">
// //             <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold backdrop-blur-sm">
// //               Built-in from Day 1
// //             </span>
// //           </td>
// //           <td className="py-4 px-4 text-center text-white/70">Often added later</td>
// //         </tr>
// //         <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
// //           <td className="py-4 px-4 font-medium text-white">Communication Frequency</td>
// //           <td className="py-4 px-4 text-center">
// //             <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold backdrop-blur-sm">
// //               Daily & Real-time
// //             </span>
// //           </td>
// //           <td className="py-4 px-4 text-center text-white/70">Weekly or bi-weekly</td>
// //         </tr>
// //         <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
// //           <td className="py-4 px-4 font-medium text-white">Engagement Flexibility</td>
// //           <td className="py-4 px-4 text-center">
// //             <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold backdrop-blur-sm">
// //               Multiple Models
// //             </span>
// //           </td>
// //           <td className="py-4 px-4 text-center text-white/70">Limited options</td>
// //         </tr>
// //       </tbody>
// //     </table>
// //   </div>
// // </div>

// //         {/* Bottom CTA */}
// //         {/* <div className="text-center">
// //           <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
// //             Ready to Experience the Difference?
// //           </h3>
// //           <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
// //             See how our approach translates to better outcomes for your enterprise.
// //           </p>
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
// //               <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //               </svg>
// //               Schedule a Discovery Call
// //             </button>
// //             <button className="px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
// //               <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
// //               </svg>
// //               View Client Success Stories
// //             </button>
// //           </div>
// //         </div> */}
// //       </div>
// //     </section>
// //   );
// // };

// // // Advantage Card Component
// // const AdvantageCard: FC<{ advantage: Advantage }> = ({ advantage }) => {
// //   return (
// //     <div className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-500">
// //       {/* Top Decorative Element */}
// //       <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
// //       <div className="relative">
// //         {/* Icon and Title */}
// //         <div className="flex items-start justify-between mb-6">
// //           <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600">
// //             {advantage.icon}
// //           </div>
// //           {advantage.stats && (
// //             <div className="text-right">
// //               <div className="text-2xl font-bold text-gray-900">{advantage.stats.value}</div>
// //               <div className="text-sm text-gray-500">{advantage.stats.label}</div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Content */}
// //         <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
// //           {advantage.title}
// //         </h3>
        
// //         <p className="text-gray-600 mb-6 leading-relaxed">
// //           {advantage.description}
// //         </p>

// //         {/* Features List */}
// //         <ul className="space-y-3">
// //           {advantage.features.map((feature, index) => (
// //             <li key={index} className="flex items-center">
// //               <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
// //                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
// //               </svg>
// //               <span className="text-gray-700">{feature}</span>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* Hover Indicator */}
// //       <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //     </div>
// //   );
// // };

// // export default WhyBawdicSoftSection;


// import React, { FC } from "react";

// interface Advantage {
//   id: number;
//   title: string;
//   description: string;
//   features: string[];
//   badge: string;
//   icon: React.ReactNode;
// }

// const WhyBawdicSoftSection: FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const advantages: Advantage[] = [
//     {
//       id: 1,
//       title: "Three Skills, One Team",
//       description: "AI, blockchain and software engineering under one roof.",
//       features: [
//         "AI agents and automation",
//         "Smart contracts and Web3",
//         "SaaS and mobile products",
//       ],
//       badge: "22 engineers",
//       icon: (
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: 2,
//       title: "Secure by Default",
//       description: "Security is part of the build from day one.",
//       features: [
//         "ISO 27001 certified",
//         "NDA on every project",
//         "Secure code reviews",
//       ],
//       badge: "ISO 27001",
//       icon: (
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: 3,
//       title: "Clear Communication",
//       description:
//         "A senior team you can reach, and no guessing where the project stands.",
//       features: [
//         "Weekly progress updates",
//         "Regular demos",
//         "Support after go-live",
//       ],
//       badge: "Weekly updates",
//       icon: (
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M8 10h8m-8 4h5m-9 5l3-3h10a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h1v5z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: 4,
//       title: "Fixed Scope for MVPs",
//       description: "A fixed plan and quote, so no surprises on cost.",
//       features: [
//         "Scope agreed before we build",
//         "Fixed quote",
//         "Changes discussed before work starts",
//       ],
//       badge: "Fixed quote",
//       icon: (
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: 5,
//       title: "Flexible Ways to Work",
//       description: "Choose what fits your stage.",
//       features: ["White-label build", "Fixed project", "Dedicated team"],
//       badge: "3 models",
//       icon: (
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4"
//           />
//         </svg>
//       ),
//     },
//   ];

//   const nextCard = () => {
//     setActiveIndex((prev) => (prev + 1) % advantages.length);
//   };

//   return (
//     <section className="py-12 md:py-18 bg-[#FEFEFF] overflow-hidden">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
//             The BawdicSoft <span className="text-blue-600">Difference</span>
//           </h2>
//           <p className="text-[12px] md:text-[16px] text-gray-500 max-w-xl mx-auto">
//             What you get when you build with us
//           </p>
//         </div>

//         {/* Interactive Slider */}
//         <div className="relative h-[450px] flex justify-center items-center">
//           {advantages.map((advantage, index) => {
//             let offset = index - activeIndex;
//             if (offset > 2) offset -= advantages.length;
//             if (offset < -2) offset += advantages.length;

//             const isActive = offset === 0;
//             const isLeft = offset === -1;
//             const isRight = offset === 1;

//             if (Math.abs(offset) > 1) return null;

//             return (
//               <motion.div
//                 key={advantage.id}
//                 initial={false}
//                 animate={{
//                   x: isActive ? 0 : isLeft ? "-70%" : "70%",
//                   scale: isActive ? 1 : 0.88,
//                   zIndex: isActive ? 30 : 10,
//                   opacity: isActive ? 1 : 0.7,
//                 }}
//                 transition={{ type: "spring", stiffness: 260, damping: 28 }}
//                 className={`absolute top-0 w-full sm:w-[85%] md:w-[60%] h-full rounded-[2rem] overflow-hidden cursor-pointer ${
//                   isActive
//                     ? "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
//                     : "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] grayscale-[30%]"
//                 }`}
//                 onClick={() => !isActive && setActiveIndex(index)}
//               >
//                 {/* Card Number Badge */}
//                 <div className="absolute top-6 left-6 z-40">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold backdrop-blur-md border ${
//                       isActive
//                         ? "bg-white/90 text-gray-900 border-white/50 shadow-sm"
//                         : "bg-white/50 text-gray-500 border-gray-200"
//                     }`}
//                   >
//                     {String(advantage.id).padStart(2, "0")}
//                   </div>
//                 </div>

//                 {/* Top Section (White/Glass) */}
//                 <div
//                   className={`absolute top-0 left-0 right-0 h-[45%] flex flex-col items-center justify-center z-10 rounded-b-[2.5rem] transition-colors duration-500 ${
//                     isActive ? "bg-white" : "bg-gray-50"
//                   }`}
//                 >
//                   <div
//                     className={`mb-3 transition-colors duration-300 ${isActive ? "text-blue-600" : "text-gray-400"}`}
//                   >
//                     {advantage.icon}
//                   </div>
//                   <h3
//                     className={`text-xl md:text-2xl font-extrabold text-center px-6 transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-500"}`}
//                   >
//                     {advantage.title}
//                   </h3>
//                 </div>

//                 {/* Bottom Dark Section (#111827) */}
//                 <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-[#111827] z-20 flex flex-col justify-end p-6 md:p-8 rounded-t-[2.5rem] shadow-[inset_0_4px_20px_rgba(0,0,0,0.2)]">
//                   <div className="flex flex-col h-full justify-end">
//                     <p
//                       className={`text-center text-xs md:text-sm mb-6 transition-colors duration-300 ${isActive ? "text-gray-300" : "text-gray-500"}`}
//                     >
//                       {advantage.description}
//                     </p>

//                     {/* Features Centered */}
//                     <ul className="space-y-2.5 mb-8 w-full">
//                       {advantage.features.map((feature, i) => (
//                         <li
//                           key={i}
//                           className="flex items-center justify-center"
//                         >
//                           <svg
//                             className={`w-4 h-4 mr-2 flex-shrink-0 transition-colors duration-300 ${isActive ? "text-green-400" : "text-gray-600"}`}
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M5 13l4 4L19 7"
//                             />
//                           </svg>
//                           <span
//                             className={`text-center text-xs md:text-sm transition-colors duration-300 ${isActive ? "text-gray-200" : "text-gray-500"}`}
//                           >
//                             {feature}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>

//                     <div className="flex items-center justify-between mt-auto">
//                       <span
//                         className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors duration-300 ${
//                           isActive
//                             ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
//                             : "bg-white/5 text-gray-500 border border-white/5"
//                         }`}
//                       >
//                         {advantage.badge}
//                       </span>

//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           nextCard();
//                         }}
//                         className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
//                           isActive
//                             ? "bg-white text-[#111827] hover:bg-blue-50 hover:scale-105"
//                             : "bg-white/10 text-white/50"
//                         }`}
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M14 5l7 7m0 0l-7 7m7-7H3"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Dots Navigation */}
//         <div className="flex justify-center gap-2 mt-10">
//           {advantages.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveIndex(index)}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 activeIndex === index
//                   ? "w-10 bg-blue-600"
//                   : "w-2 bg-gray-300 hover:bg-gray-400"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyBawdicSoftSection;







// import React, { FC } from "react";

// interface Advantage {
//   id: number;
//   title: string;
//   description: string;
//   features: string[];
//   badge: string;
//   icon: React.ReactNode;
// }

// const WhyBawdicSoftSection: FC = () => {
//   const advantages: Advantage[] = [
//     {
//       id: 1,
//       title: "Three Skills, One Team",
//       description: "AI, blockchain and software engineering under one roof.",
//       features: [
//         "AI agents and automation",
//         "Smart contracts and Web3",
//         "SaaS and mobile products",
//       ],
//       badge: "22 engineers",
//       icon: (
//         <svg
//           className="w-7 h-7"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: 2,
//       title: "Secure by Default",
//       description: "Security is part of the build from day one.",
//       features: [
//         "ISO 27001 certified",
//         "NDA on every project",
//         "Secure code reviews",
//       ],
//       badge: "ISO 27001",
//       icon: (
//         <svg
//           className="w-7 h-7"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: 3,
//       title: "Clear Communication",
//       description:
//         "A senior team you can reach, and no guessing where the project stands.",
//       features: [
//         "Weekly progress updates",
//         "Regular demos",
//         "Support after go-live",
//       ],
//       badge: "Weekly updates",
//       icon: (
//         <svg
//           className="w-7 h-7"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M8 10h8m-8 4h5m-9 5l3-3h10a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h1v5z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: 4,
//       title: "Fixed Scope for MVPs",
//       description: "A fixed plan and quote, so no surprises on cost.",
//       features: [
//         "Scope agreed before we build",
//         "Fixed quote",
//         "Changes discussed before work starts",
//       ],
//       badge: "Fixed quote",
//       icon: (
//         <svg
//           className="w-7 h-7"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: 5,
//       title: "Flexible Ways to Work",
//       description: "Choose what fits your stage.",
//       features: ["White-label build", "Fixed project", "Dedicated team"],
//       badge: "3 models",
//       icon: (
//         <svg
//           className="w-7 h-7"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4"
//           />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-12 md:mb-16">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
//             The BawdicSoft{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//               Difference
//             </span>
//           </h2>

//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//             What you get when you build with us
//           </p>
//         </div>

//         {/* Advantages Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {advantages.map((advantage) => (
//             <AdvantageCard key={advantage.id} advantage={advantage} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Advantage Card
// const AdvantageCard: FC<{ advantage: Advantage }> = ({ advantage }) => {
//   return (
//     <div className="group relative bg-white rounded-2xl border border-gray-200 p-6 md:p-7 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
//       {/* Top Hover Line */}
//       <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//       <div className="relative">
//         {/* Icon */}
//         <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center mb-5 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
//           {advantage.icon}
//         </div>

//         {/* Title */}
//         <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
//           {advantage.title}
//         </h3>

//         {/* Description */}
//         <p className="text-gray-600 leading-relaxed mb-5">
//           {advantage.description}
//         </p>

//         {/* Features */}
//         <ul className="space-y-3 mb-6">
//           {advantage.features.map((feature, index) => (
//             <li key={index} className="flex items-start gap-3">
//               <svg
//                 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>

//               <span className="text-gray-700 text-sm md:text-base">
//                 {feature}
//               </span>
//             </li>
//           ))}
//         </ul>

//         {/* Badge */}
//         <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
//           {advantage.badge}
//         </div>
//       </div>

//       {/* Bottom Hover Indicator */}
//       <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     </div>
//   );
// };

// export default WhyBawdicSoftSection;

"use client";
import React, { FC, useState } from "react";
import { motion } from "framer-motion";

interface Advantage {
  id: number;
  title: string;
  description: string;
  features: string[];
  badge: string;
  icon: React.ReactNode;
}

const WhyBawdicSoftSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const advantages: Advantage[] = [
    {
      id: 1,
      title: "Three Skills, One Team",
      description: "AI, blockchain and software engineering under one roof.",
      features: [
        "AI agents and automation",
        "Smart contracts and Web3",
        "SaaS and mobile products",
      ],
      badge: "22 engineers",
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
            strokeWidth="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Secure by Default",
      description: "Security is part of the build from day one.",
      features: [
        "ISO 27001 certified",
        "NDA on every project",
        "Secure code reviews",
      ],
      badge: "ISO 27001",
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
            strokeWidth="1.5"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Clear Communication",
      description:
        "A senior team you can reach, and no guessing where the project stands.",
      features: [
        "Weekly progress updates",
        "Regular demos",
        "Support after go-live",
      ],
      badge: "Weekly updates",
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
            strokeWidth="1.5"
            d="M8 10h8m-8 4h5m-9 5l3-3h10a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h1v5z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Fixed Scope for MVPs",
      description: "A fixed plan and quote, so no surprises on cost.",
      features: [
        "Scope agreed before we build",
        "Fixed quote",
        "Changes discussed before work starts",
      ],
      badge: "Fixed quote",
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
            strokeWidth="1.5"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Flexible Ways to Work",
      description: "Choose what fits your stage.",
      features: ["White-label build", "Fixed project", "Dedicated team"],
      badge: "3 models",
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
            strokeWidth="1.5"
            d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
  ];

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % advantages.length);
  };

  return (
    <section className="py-12 md:py-18 bg-[#FEFEFF] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
            The BawdicSoft <span className="text-blue-600">Difference</span>
          </h2>
          <p className="text-[12px] md:text-[16px] text-gray-500 max-w-xl mx-auto">
            What you get when you build with us
          </p>
        </div>

        {/* Interactive Slider */}
        <div className="relative h-[450px] flex justify-center items-center">
          {advantages.map((advantage, index) => {
            let offset = index - activeIndex;
            if (offset > 2) offset -= advantages.length;
            if (offset < -2) offset += advantages.length;

            const isActive = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            if (Math.abs(offset) > 1) return null;

            return (
              <motion.div
                key={advantage.id}
                initial={false}
                animate={{
                  x: isActive ? 0 : isLeft ? "-70%" : "70%",
                  scale: isActive ? 1 : 0.88,
                  zIndex: isActive ? 30 : 10,
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className={`absolute top-0 w-full sm:w-[85%] md:w-[60%] h-full rounded-[2rem] overflow-hidden cursor-pointer ${
                  isActive
                    ? "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
                    : "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] grayscale-[30%]"
                }`}
                onClick={() => !isActive && setActiveIndex(index)}
              >
                {/* Card Number Badge */}
                <div className="absolute top-6 left-6 z-40">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold backdrop-blur-md border ${
                      isActive
                        ? "bg-white/90 text-gray-900 border-white/50 shadow-sm"
                        : "bg-white/50 text-gray-500 border-gray-200"
                    }`}
                  >
                    {String(advantage.id).padStart(2, "0")}
                  </div>
                </div>

                {/* Top Section (White/Glass) */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[45%] flex flex-col items-center justify-center z-10 rounded-b-[2.5rem] transition-colors duration-500 ${
                    isActive ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`mb-3 transition-colors duration-300 ${isActive ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {advantage.icon}
                  </div>
                  <h3
                    className={`text-xl md:text-2xl font-extrabold text-center px-6 transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-500"}`}
                  >
                    {advantage.title}
                  </h3>
                </div>

                {/* Bottom Dark Section (#111827) */}
                <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-[#111827] z-20 flex flex-col justify-end p-6 md:p-8 rounded-t-[2.5rem] shadow-[inset_0_4px_20px_rgba(0,0,0,0.2)]">
                  <div className="flex flex-col h-full justify-end">
                    <p
                      className={`text-center text-xs md:text-sm mb-6 transition-colors duration-300 ${isActive ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {advantage.description}
                    </p>

                    {/* Features Centered */}
                    <ul className="space-y-2.5 mb-8 w-full">
                      {advantage.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-center"
                        >
                          <svg
                            className={`w-4 h-4 mr-2 flex-shrink-0 transition-colors duration-300 ${isActive ? "text-green-400" : "text-gray-600"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span
                            className={`text-center text-xs md:text-sm transition-colors duration-300 ${isActive ? "text-gray-200" : "text-gray-500"}`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mt-auto">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors duration-300 ${
                          isActive
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : "bg-white/5 text-gray-500 border border-white/5"
                        }`}
                      >
                        {advantage.badge}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextCard();
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-white text-[#111827] hover:bg-blue-50 hover:scale-105"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-10">
          {advantages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-10 bg-blue-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBawdicSoftSection;