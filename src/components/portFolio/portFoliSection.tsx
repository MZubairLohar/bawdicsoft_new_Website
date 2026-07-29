"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import { allData, ProjectData } from "../allData";

type Category = "all" | "design" | "video" | "content";

const PortfolioSection: FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredData = activeCategory === "all" 
    ? allData 
    : allData.filter((p) => p.category === activeCategory);

  const openModal = (project: ProjectData) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section id="portfolio-grid" className="bg-gray-950 py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {(["all", "design", "video", "content"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm md:text-base font-semibold capitalize transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-500/25"
                  : "bg-transparent border-gray-700 text-gray-400 hover:border-sky-500 hover:text-sky-400"
              }`}
            >
              {cat === "all" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((project) => (
            <div
              key={project.id}
              className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-sky-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/10 cursor-pointer"
              onClick={() => openModal(project)}
            >
              {/* Image / Video Thumbnail Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.projectImage}
                  alt={project.alternate}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Play Icon for Video Category */}
                {project.category === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-sky-600/90 flex items-center justify-center backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-sky-600/80 backdrop-blur-md rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                  {project.projectName}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {project.projectDesc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={closeModal}
          >
            <div
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Media (Video or Image) */}
              <div className="relative w-full aspect-video bg-black">
                {selectedProject.videoUrl ? (
                  <video 
                    src={selectedProject.videoUrl} 
                    controls 
                    autoPlay 
                    muted 
                    loop 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={selectedProject.projectImage}
                    alt={selectedProject.projectName}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-400/10 rounded-full border border-sky-400/20">
                    {selectedProject.category}
                  </span>
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="text-sm text-gray-400">• {tech}</span>
                  ))}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {selectedProject.projectName}
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedProject.detailDesc || selectedProject.projectDesc}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-500 transition-colors"
                  >
                    Visit Live Project
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Animations */}
        <style jsx>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-in { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .animate-fade-in { animation: fade-in 0.3s ease forwards; }
          .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>
      </div>
    </section>
  );
};

export default PortfolioSection;