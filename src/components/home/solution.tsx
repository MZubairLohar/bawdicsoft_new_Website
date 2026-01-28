import React, { FC } from "react";

interface Solution {
  id: number;
  title: string;
  description: string;
  idealFor: string[];
  icon: React.ReactNode;
  gradient: string;
}

const EnterpriseSolutionsSection: FC = () => {
  const solutions: Solution[] = [
    {
      id: 1,
      title: "Dedicated Engineering Teams",
      description: "Long-term team augmentation with senior engineers who integrate seamlessly into your workflows, processes, and culture for sustained growth.",
      idealFor: ["Scaling development capacity", "Filling expertise gaps", "Long-term projects with evolving requirements"],
      gradient: "from-blue-600 to-cyan-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Platform Modernization & System Architecture",
      description: "Transform legacy systems into scalable, modern platforms with optimized architecture that supports future growth and innovation.",
      idealFor: ["Technical debt reduction", "Cloud migration", "Microservices adoption", "Performance optimization"],
      gradient: "from-purple-600 to-pink-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4m13 6a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "AI-Driven Automation",
      description: "Implement intelligent automation solutions that streamline operations, enhance decision-making, and create competitive advantages.",
      idealFor: ["Process optimization", "Predictive analytics", "Intelligent workflows", "Data-driven insights"],
      gradient: "from-emerald-600 to-green-400",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Secure Distributed Systems & Web3 Infrastructure",
      description: "Build and secure decentralized applications, blockchain solutions, and distributed systems with enterprise-grade security protocols.",
      idealFor: ["Blockchain development", "Decentralized applications", "Smart contracts", "Security-focused architecture"],
      gradient: "from-orange-600 to-yellow-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 mb-6">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Enterprise Solutions
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Modern Enterprise Challenges
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored technology solutions designed to address complex enterprise needs with precision and scalability.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="group relative bg-white rounded-2xl border border-gray-200 hover:border-transparent p-8 transition-all duration-500 hover:shadow-2xl overflow-hidden"
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon with Gradient Background */}
              <div className="relative mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${solution.gradient} bg-opacity-10 mb-6`}>
                  <div className={`text-transparent bg-clip-text bg-gradient-to-br ${solution.gradient}`}>
                    {solution.icon}
                  </div>
                </div>
                
                {/* Solution Number */}
                <div className="absolute top-0 right-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm">
                  0{solution.id}
                </div>
              </div>

              {/* Solution Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {solution.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Ideal For Section */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3"></div>
                    <span className="font-semibold text-gray-900">Ideal for:</span>
                  </div>
                  <ul className="space-y-3">
                    {solution.idealFor.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className={`mt-6 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${solution.gradient} hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-current`}>
                  Explore {solution.title.split('–')[0]}
                </button>
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 border-2 border-transparent rounded-2xl bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="relative bg-gradient-to-r from-blue-50 via-white to-cyan-50 rounded-2xl p-8 md:p-12 border border-gray-200 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400 rounded-full translate-x-32 translate-y-32"></div>
          </div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center space-x-2 mb-6">
              {solutions.map((solution) => (
                <div
                  key={solution.id}
                  className={`w-3 h-3 rounded-full bg-gradient-to-br ${solution.gradient}`}
                />
              ))}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Need a Custom Solution? We Deliver End-to-End Enterprise Excellence
            </h3>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Our experts work closely with you to understand your unique challenges and deliver tailored solutions that drive real business value.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                Schedule a Technical Consultation
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                View All Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSolutionsSection;