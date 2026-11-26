"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-sky-950 via-sky-700 via-30% to-sky-600 to-70% px-4 py-16 text-white sm:min-h-[87vh] sm:px-6 sm:py-20 md:px-12">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[min(500px,80vh)] w-[min(800px,120vw)] -translate-x-1/2 rounded-full bg-[#0ea5e9]/15 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:mb-8 sm:px-4"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#0ea5e9]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-100 sm:text-sm sm:tracking-widest">
            BawdicSoft Portfolio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-[clamp(3.25rem,13vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.06em] sm:mb-8 sm:text-[clamp(4rem,10vw,8rem)]"
        >
          <span className="block sm:inline">Crafting</span>{" "}
          <span className="block bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] bg-clip-text text-transparent sm:inline">
            Digital
          </span>
          <span className="block sm:ml-4 sm:inline">
            Futures.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-2xl px-1 text-base leading-7 text-gray-100 sm:px-0 sm:text-lg md:text-xl md:leading-relaxed"
        >
          We engineer robust, high-performance web, Web3, and AI solutions.
          Security-by-design, built for scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row"
        >
          <a
            href="#portfolio-grid"
            className="w-full max-w-xs rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:w-auto"
          >
            Explore our work ↗
          </a>
          <a
            href="#case-studies"
            className="w-full max-w-xs rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:w-auto"
          >
            Explore case studies
          </a>
          
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;