"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { allData, ProjectData } from "../allData";

const AgencyPortfolio = () => {
  const [mongoProjects, setMongoProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/admin/projects');
        const data = await res.json();
        
        if (data.success) {
          // Convert MongoDB projects to match ProjectData interface
          const formattedProjects = data.data.map((p: any) => ({
            id: p._id, 
            category: p.category || "design",
            projectName: p.projectName,
            // ✅ AUTO-FIX: If the URL starts with 'public/', remove it.
            projectImage: p.projectImage ? p.projectImage.replace('public/', '/') : '/assets/placeholder.png',
            alternate: p.alternate || p.projectName,
            href: p.href || "#",
            projectDesc: p.projectDesc,
            technologies: p.technologies || [],
            detailDesc: p.detailDesc,
            challenge: p.challenge,
            solution: p.solution,
            features: p.features || [],
            result: p.result,
          }));
          setMongoProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Combine existing projects (allData) with new MongoDB projects
  const allProjects = [...allData, ...mongoProjects];

  return (
    <section className="relative bg-white text-gray-900 py-24 px-4 md:px-12 overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32 text-center">
          <h2 className="text-sm md:text-base font-medium text-blue-600 tracking-widest uppercase mb-6">
            Selected Works of our Team
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto text-gray-900">
            A curated selection of our most <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-600">
              impactful digital products.
            </span>
          </h3>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading projects...</p>
          </div>
        )}

        {/* Project List with Alternating Layout */}
        <div className="space-y-24 md:space-y-40">
          {allProjects.map((project, index) => {
            const isReversed = index % 2 !== 0; // Odd indices: image on right

            // 1. The Image Card (Scales as a whole unit)
            const imageCard = (
              <div 
                onClick={() => setSelectedProject(project)}
                className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 cursor-pointer shadow-md transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:shadow-2xl hover:border-brand-500/50 group"
              >
                {/* Image fits perfectly inside, no cropping */}
                <Image
                  src={project.projectImage}
                  alt={project.alternate}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                  className="object-contain p-4 md:p-8" 
                  priority={index < 3}
                />
              </div>
            );

            // 2. The Text Content (Static, no hover effects)
            const textContent = (
              <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-600">
                  {project.projectName}
                </h3>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {project.projectDesc}
                </p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full border border-gray-300 text-blue-600 bg-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <a 
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base font-medium text-gray-900 hover:text-brand-600 transition-colors duration-300"
                  >
                    View Live Project
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                  
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 text-base font-medium text-brand-600 hover:text-brand-500 transition-colors duration-300"
                  >
                    View Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </button>
                </div>
              </div>
            );

            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {isReversed ? (
                  <>
                    {textContent}
                    {imageCard}
                  </>
                ) : (
                  <>
                    {imageCard}
                    {textContent}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CASE STUDY MODAL (Dark Theme) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* FIXED Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="fixed top-4 right-4 md:top-8 md:right-8 z-[60] p-2 rounded-full bg-gray-800/80 backdrop-blur-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header Image */}
              <div className="relative w-full aspect-video bg-black">
                <Image
                  src={selectedProject.projectImage}
                  alt={selectedProject.projectName}
                  fill
                  className="object-contain p-4 md:p-8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12 -mt-20 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                  {selectedProject.projectName}
                </h2>
                
                <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
                  <p>{selectedProject.detailDesc || selectedProject.projectDesc}</p>
                  
                  {selectedProject.challenge && (
                    <div>
                      <h4 className="text-brand-400 font-semibold mb-2 text-xl">The Challenge</h4>
                      <p className="text-gray-400">{selectedProject.challenge}</p>
                    </div>
                  )}

                  {selectedProject.solution && (
                    <div>
                      <h4 className="text-brand-400 font-semibold mb-2 text-xl">Our Solution</h4>
                      <p className="text-gray-400">{selectedProject.solution}</p>
                    </div>
                  )}

                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <h4 className="text-brand-400 font-semibold mb-3 text-xl">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-400">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProject.result && (
                    <div>
                      <h4 className="text-brand-400 font-semibold mb-2 text-xl">The Result</h4>
                      <p className="text-gray-400">{selectedProject.result}</p>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h4 className="text-white font-semibold mb-3 text-xl">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm border border-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AgencyPortfolio;