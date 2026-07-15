"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import ContactModal from "./ContactModal";

interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrimaryCTA = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsModalOpen(true); // ✅ open modal
  };

  const handleSecondaryCTA = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push("/casestudies");
  };

  return (
    <>
      <section className="relative min-h-[calc(100vh-48px)] flex items-center justify-center overflow-hidden">
        {/* 🎥 Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full opacity-90 object-cover"
        >
          <source src="/assets/bawdicsoft-bg-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 px-4 mx-auto max-w-5xl text-center pt-32 md:pt-44 lg:pt-20">
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight leading-tight text-white md:text-4xl lg:text-5xl xl:text-5xl px-2 md:px-4">
            We Build AI Systems, Blockchain Platforms & Web Applications That Scale
          </h1>

          <p className="mb-10 text-lg font-normal text-gray-200 lg:text-xl xl:text-xl max-w-4xl mx-auto px-4 md:px-8 leading-relaxed">
            BawdicSoft is a Karachi-based software agency trusted by global clients across 15+ countries. From AI automation to DeFi infrastructure — we turn complex ideas into production-ready products.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4 md:px-0">
            <button
              onClick={handlePrimaryCTA}
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg"
            >
              Book a Free 30-Min Strategy Call
            </button>

            <button
              onClick={handleSecondaryCTA}
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white/10 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50 backdrop-blur-sm"
            >
              See Our Work
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Modal Component */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;
