import React, { FC } from "react";

interface PainPoint {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const EnterprisePainPointsSection: FC = () => {
  const painPoints: PainPoint[] = [
    {
      title: "Engineering Bottlenecks",
      description: "Stalled projects due to limited resources or expertise gaps slowing down your roadmap",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Legacy Systems",
      description: "Outdated technology stacks hindering innovation and increasing maintenance costs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Delayed Launches",
      description: "Missed deadlines and extended timelines impacting market opportunities and revenue",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Security Concerns",
      description: "Compliance risks and security vulnerabilities in critical business applications",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "High Costs",
      description: "Budget overruns and unpredictable expenses from inefficient development cycles",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Scalability Issues",
      description: "Systems unable to handle growth or increased demand, limiting business expansion and user adoption",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Introduction */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Built for Teams That Need to Move Faster —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Safely
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Common challenges enterprise engineering teams face when scaling their technology initiatives
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/0 to-blue-900/0 rounded-2xl group-hover:from-blue-900/20 group-hover:to-cyan-900/20 transition-all duration-500" />
              
              {/* Number Indicator */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              
              <div className="relative">
                {/* Icon and Title Row */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center text-blue-400">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {point.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar (Optional) */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">40%</div>
            <div className="text-gray-300 text-sm">Faster Time-to-Market</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">60%</div>
            <div className="text-gray-300 text-sm">Reduced Development Costs</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">99.9%</div>
            <div className="text-gray-300 text-sm">Uptime Guarantee</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-gray-300 text-sm">Support Coverage</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterprisePainPointsSection;