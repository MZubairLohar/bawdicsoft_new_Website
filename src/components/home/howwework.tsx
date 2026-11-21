// "use client";
// import React, { FC, useState } from "react";

// interface WorkStep {
//   id: number;
//   title: string;
//   description: string;
//   duration: string;
//   deliverables: string[];
//   icon: React.ReactNode;
//   keyActivities: string[];
// }

// interface ProcessBenefit {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
// }

// const HowWeWorkSection: FC = () => {
//   const [activeStep, setActiveStep] = useState<number>(1);

//   const workSteps: WorkStep[] = [
//     {
//       id: 1,
//       title: "Discovery & Strategy",
//       description: "Deep dive into your business objectives, technical requirements, and success metrics to develop a comprehensive roadmap.",
//       duration: "1-2 weeks",
//       deliverables: [
//         "Technical requirements document",
//         "Project roadmap & timeline",
//         "Resource & budget estimation",
//         "Risk assessment matrix"
//       ],
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//         </svg>
//       ),
//       keyActivities: [
//         "Stakeholder interviews",
//         "Technology assessment",
//         "Architecture planning",
//         "Success criteria definition"
//       ]
//     },
//     {
//       id: 2,
//       title: "Pilot Project",
//       description: "Execute a focused 30-60 day pilot to validate approach, demonstrate value, and build confidence before full-scale engagement.",
//       duration: "30-60 days",
//       deliverables: [
//         "Working prototype / MVP",
//         "Performance benchmarks",
//         "Team velocity metrics",
//         "Scalability assessment"
//       ],
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//         </svg>
//       ),
//       keyActivities: [
//         "Agile sprint planning",
//         "Weekly demo sessions",
//         "Continuous feedback loops",
//         "Process optimization"
//       ]
//     },
//     {
//       id: 3,
//       title: "Dedicated Team Ramp-up",
//       description: "Scale the team with specialized engineers who integrate seamlessly into your workflows and processes.",
//       duration: "2-4 weeks",
//       deliverables: [
//         "Fully integrated team",
//         "Process documentation",
//         "Communication protocols",
//         "Knowledge transfer sessions"
//       ],
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//         </svg>
//       ),
//       keyActivities: [
//         "Team onboarding",
//         "Toolchain setup",
//         "Process alignment",
//         "Integration planning"
//       ]
//     },
//     {
//       id: 4,
//       title: "Continuous Delivery",
//       description: "Sustainable development with regular releases, continuous improvement, and proactive maintenance.",
//       duration: "Ongoing",
//       deliverables: [
//         "Regular feature releases",
//         "Performance optimization",
//         "Security updates",
//         "Scalability enhancements"
//       ],
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//         </svg>
//       ),
//       keyActivities: [
//         "CI/CD pipeline management",
//         "Automated testing",
//         "Performance monitoring",
//         "Regular retrospectives"
//       ]
//     }
//   ];

//   const processBenefits: ProcessBenefit[] = [
//     {
//       title: "Weekly Reporting & Transparency",
//       description: "Comprehensive progress reports delivered weekly with detailed metrics, burn charts, and actionable insights.",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//         </svg>
//       )
//     },
//     {
//       title: "Named Account Manager",
//       description: "A dedicated point of contact responsible for your success, ensuring alignment and proactive communication.",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         </svg>
//       )
//     },
//     {
//       title: "Service Level Agreements (SLAs)",
//       description: "Guaranteed response times, uptime commitments, and performance metrics with clear escalation paths.",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     }
//   ];

//   const activeStepData = workSteps.find(step => step.id === activeStep) || workSteps[0];

//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16 md:mb-20">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 mb-6">
//             <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
//               Our Process
//             </span>
//           </div>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//             How We Deliver{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//               Enterprise Excellence
//             </span>
//           </h2>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//             A structured, transparent approach that ensures predictable outcomes and minimizes risk for enterprise clients.
//           </p>
//         </div>

//         {/* Process Steps Navigation */}
//         <div className="relative mb-12">
//           {/* Connection Line */}
//           <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 z-0"></div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
//             {workSteps.map((step) => (
//               <button
//                 key={step.id}
//                 onClick={() => setActiveStep(step.id)}
//                 className={`flex flex-col items-center text-center p-4 md:p-6 rounded-2xl transition-all duration-300 ${activeStep === step.id
//                     ? 'bg-white shadow-2xl border-2 border-blue-500 transform scale-105'
//                     : 'bg-white shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300'
//                   }`}
//               >
//                 {/* Step Number */}
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${activeStep === step.id
//                     ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
//                     : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600'
//                   }`}>
//                   <span className="text-lg font-bold">{step.id}</span>
//                 </div>

//                 {/* Step Title */}
//                 <h3 className={`font-bold mb-2 ${activeStep === step.id ? 'text-blue-700' : 'text-gray-900'}`}>
//                   {step.title}
//                 </h3>

//                 {/* Duration */}
//                 <span className={`text-sm px-3 py-1 rounded-full ${activeStep === step.id
//                     ? 'bg-blue-100 text-blue-700'
//                     : 'bg-gray-100 text-gray-600'
//                   }`}>
//                   {step.duration}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Active Step Details */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-16">
//           {/* Left Column: Step Details */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeStepData.title}</h3>
//                 <div className="flex items-center text-gray-500">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Duration: {activeStepData.duration}
//                 </div>
//               </div>
//               <div className="text-blue-600">
//                 {activeStepData.icon}
//               </div>
//             </div>

//             <p className="text-gray-600 mb-8 leading-relaxed">
//               {activeStepData.description}
//             </p>

//             {/* Key Activities */}
//             <div className="mb-8">
//               <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
//                 <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
//                 Key Activities
//               </h4>
//               <div className="space-y-3">
//                 {activeStepData.keyActivities.map((activity, index) => (
//                   <div key={index} className="flex items-center">
//                     <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-gray-700">{activity}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Deliverables */}
//             <div>
//               <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
//                 <div className="w-2 h-2 rounded-full bg-cyan-500 mr-3"></div>
//                 Key Deliverables
//               </h4>
//               <div className="grid sm:grid-cols-2 gap-3">
//                 {activeStepData.deliverables.map((deliverable, index) => (
//                   <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
//                     <div className="flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-cyan-500 mr-3"></div>
//                       <span className="text-gray-700">{deliverable}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Process Benefits */}
//           <div>
//             <div className="bg-gradient-to-br from-blue-900 to-cyan-900 rounded-2xl p-8 mb-8">
//               <h3 className="text-2xl font-bold text-white mb-6">What's Included in Every Engagement</h3>
//               <div className="space-y-6">
//                 {processBenefits.map((benefit, index) => (
//                   <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
//                     <div className="flex items-start">
//                       <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mr-4">
//                         {benefit.icon}
//                       </div>
//                       <div>
//                         <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
//                         <p className="text-blue-100">{benefit.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* SLA Metrics */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Our Performance Guarantees</h3>
//               <div className="space-y-6">
//                 <div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-gray-700 font-medium">Response Time SLA</span>
//                     <span className="text-blue-600 font-bold">≤ 2 hours</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-11/12"></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-gray-700 font-medium">System Uptime</span>
//                     <span className="text-blue-600 font-bold">99.95%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-full"></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-gray-700 font-medium">Weekly Report Delivery</span>
//                     <span className="text-blue-600 font-bold">Every Monday</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-10/12"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Process Timeline Visualization */}
//         <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-16">
//           <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our 4-Phase Delivery Model</h3>
//           <div className="relative">
//             {/* Timeline Line */}
//             <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-cyan-300 transform -translate-y-1/2"></div>

//             <div className="grid md:grid-cols-4 gap-8 relative">
//               {workSteps.map((step) => (
//                 <div key={step.id} className="text-center">
//                   <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${activeStep === step.id
//                       ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl'
//                       : 'bg-white text-blue-600 shadow-lg'
//                     }`}>
//                     <span className="text-xl font-bold">{step.id}</span>
//                   </div>
//                   <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
//                   <p className="text-sm text-gray-600">{step.duration}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         {/* <div className="text-center">
//           <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
//             Ready to Start Your Journey?
//           </h3>
//           <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//             Let's discuss how our structured process can help you achieve your technology goals with confidence.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
//               <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               Schedule Discovery Session
//             </button>
//             <button className="px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
//               <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
//               </svg>
//               Download Process Guide (PDF)
//             </button>
//           </div>
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default HowWeWorkSection;

"use client";
import React, { FC, useState } from "react";

const HowWeWorkSection: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const workSteps = [
    {
      id: 1,
      title: "Free call",
      duration: "15 minutes",
      items: [
        "Tell us your idea",
        "We ask about goals, users and budget",
        "You get honest feedback",
      ],
    },
    {
      id: 2,
      title: "Clear plan",
      duration: "",
      items: ["Features and scope agreed", "Timeline", "Fixed quote"],
    },
    {
      id: 3,
      title: "Build and launch",
      duration: "",
      items: [
        "Weekly updates and demos",
        "You approve each stage",
        "Support after go-live",
      ],
    },
  ];

  const processBenefits = [
    "Weekly progress report",
    "A named point of contact",
    "Support after launch",
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest">
              Our Process
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
            From Idea to Launch in{" "}
            <span className="text-blue-600">Three Steps</span>
          </h2>
          <p className="text-[16px] sm:text-[12px] md:text-[16px] text-gray-500 max-w-2xl mx-auto px-2">
            A clear process, so you always know what happens next.
          </p>
        </div>

        {/* Three Step Cards with Blue Connection Line */}
        <div className="relative mb-6 sm:mb-8">
          {/* Blue Connection Line (behind cards, desktop only) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-blue-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 relative z-10">
            {workSteps.map((step, i) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                style={{ animationDelay: `${i * 120}ms` }}
                className={`animate-card-in opacity-0 bg-white rounded-2xl p-5 sm:p-6 border cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl ${
                  activeStep === step.id
                    ? "border-blue-500 shadow-xl ring-1 ring-blue-100"
                    : "border-gray-100 shadow-lg shadow-gray-200/60"
                }`}
              >
                {/* Step Number */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-200">
                  <span className="text-sm sm:text-base font-bold">
                    {step.id}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                  {step.title}
                </h3>

                {/* Duration */}
                {step.duration && (
                  <span className="inline-block text-[11px] sm:text-xs font-medium text-gray-500 bg-gray-100 px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                    {step.duration}
                  </span>
                )}

                {/* Bullet Items */}
                <div
                  className={`space-y-2 sm:space-y-2.5 ${step.duration ? "" : "mt-3 sm:mt-4"}`}
                >
                  {step.items.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-2.5 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Included in every project — Premium Dark Card (Fully Responsive) */}
        <div className="relative overflow-hidden rounded-2xl bg-[#111827] p-5 sm:p-6 md:p-8 shadow-2xl shadow-gray-900/30">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            {/* Title row */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                Included in every project
              </h3>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 w-full lg:flex-1 lg:max-w-2xl">
              {processBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors hover:bg-white/10"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium text-gray-200 leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card entrance animation */}
      <style jsx>{`
        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.animate-card-in) {
          animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default HowWeWorkSection;
