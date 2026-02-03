import React from "react";

const Cta = () => {
  return (
    <div className="flex justify-center mt-20">
      <div className="relative w-[80%] bg-gradient-to-r from-blue-500 to-cyan-700 rounded-2xl p-8 md:p-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="relative text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white leading-relaxed">
            BawdicSoft acts as an extension of your engineering organization —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              not just another vendor
            </span>
          </h3>

          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-8">
            We integrate seamlessly with your team, adopting your processes and
            culture while bringing enterprise-grade development practices and
            scalable solutions.
          </p>

          {/* CTA Button */}
          <button className="inline-flex text-white items-center px-8 py-4 bg-blue-700 hover:bg-blue-800 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-xl">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Transform Your Engineering Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cta;
