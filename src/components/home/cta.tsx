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
            Ready to Build Something Powerful?
          </h3>

          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-6">
            Book your 30-minute call with Syed Bilal — CEO of BawdicSoft. No sales pitch. Just clarity on your next step.
          </p>

          {/* 2 Buttons Container */}
<div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
  
  <a 
  href="https://calendly.com/lishayarain087/30min" 
  target="_blank" 
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 hover:bg-gray-100 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
>
  Book My Free Call →
</a>

 {/* Secondary Button: WhatsApp */}
<a 
  href="https://wa.me/+923178866631" 
  target="_blank" 
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
>
   WhatsApp Us Directly →
</a>

</div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
