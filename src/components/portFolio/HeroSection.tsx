"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    // EXACT THEME MATCH: Uses your darkSkyBlue (#0f3654) and brand-950 (#082f49)
    <section className="relative flex flex-col items-center justify-center min-h-[87vh]  bg-gradient-to-r from-sky-950   via-sky-700 via-30% to-sky-600 to-70% text-white px-4 md:px-12 overflow-hidden">
      
      {/* Blue Radial Glow (Using your exact brand-500) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0ea5e9]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
          <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-gray-100">
            BawdicSoft Portfolio
          </span>
        </motion.div>

        {/* Massive Fluid Typography with Blue Gradient */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[14vw] md:text-[10vw] lg:text-[9vw] font-bold leading-[0.9] tracking-tighter mb-8"
        >
          Crafting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] mr-8">
            Digital
          </span>

          <span className="text-[14vw] md:text-[10vw] lg:text-[9vw] font-bold leading-[0.9] tracking-tighter mb-8">
             Futures.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed"
        >
          We engineer robust, high-performance web, Web3, and AI solutions. 
          Security-by-design, built for scale.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;