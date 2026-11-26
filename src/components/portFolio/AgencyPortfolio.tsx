"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { allData, ProjectData } from "../allData";

type ProjectFilter = "All" | "Blockchain" | "Web" | "AI" | "Education";

interface EnterpriseCaseStudy {
  id: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Array<{ value: string; label: string }>;
  technologies: string[];
  client: string;
  description: string;
}

const enterpriseCaseStudies: EnterpriseCaseStudy[] = [
  {
    id: "saas",
    industry: "SaaS",
    title: "Scaling a SaaS Platform with a Dedicated Engineering Team",
    challenge: "The client was experiencing rapid customer growth but faced engineering capacity bottlenecks, delayed feature releases, increasing pressure on the in-house team, and difficulty hiring senior engineers quickly.",
    solution: "BawdicSoft deployed a dedicated senior engineering team that integrated directly with the client's internal processes. Senior full-stack engineers aligned with the client's agile delivery, sprint planning, reporting, code reviews and enterprise standards.",
    results: ["Feature release velocity increased by 2x", "Reduced development backlog by 40%", "Enabled the internal team to focus on core architecture", "Lowered overall development cost compared to local hiring"],
    metrics: [{ value: "2x", label: "Feature release velocity" }, { value: "40%", label: "Development backlog reduced" }, { value: "100%", label: "Enterprise alignment" }, { value: "200+", label: "Company size supported" }],
    technologies: ["Agile Delivery", "Full-Stack Engineering", "Code Reviews", "Enterprise Standards", "Team Integration"],
    client: "Confidential B2B SaaS Company",
    description: "US-based SaaS company with approximately 200 employees",
  },
  {
    id: "fintech",
    industry: "FinTech",
    title: "Modernizing a Legacy Platform for a FinTech Company",
    challenge: "The client's legacy platform struggled with poor scalability during peak usage, slow transaction processing, increasing maintenance costs, and limited flexibility.",
    solution: "BawdicSoft led a modernization initiative focused on performance, security and future scalability through architecture assessment, modular services, performance optimization and CI/CD.",
    results: ["Improved system performance", "Reduced production incidents", "Strengthened security posture", "Prepared the platform for future growth"],
    metrics: [{ value: "45%", label: "Performance improvement" }, { value: "70%", label: "Production incidents reduced" }, { value: "99.9%", label: "Security compliance" }, { value: "24/7", label: "Live operations maintained" }],
    technologies: ["Architecture Assessment", "Performance Optimization", "Security", "CI/CD", "Risk Management"],
    client: "Confidential Financial Technology Provider",
    description: "Financial technology provider in the Middle East",
  },
  {
    id: "automation",
    industry: "SaaS / Operations",
    title: "AI Automation to Reduce Operational Costs",
    challenge: "The client relied heavily on manual processes for data processing, internal reporting and customer operations. These workflows were time-consuming, inconsistent and expensive.",
    solution: "BawdicSoft designed AI-driven automation workflows, automated data classification and processing, and integrated the solution with the client's existing systems.",
    results: ["Reduced operational costs by 30%+", "Cut manual processing time by over 50%", "Improved accuracy and reporting consistency", "Freed internal teams for higher-value work"],
    metrics: [{ value: "30%+", label: "Operational cost reduction" }, { value: "50%+", label: "Processing time reduction" }, { value: "99.5%", label: "Processing accuracy" }, { value: "150+", label: "Employees supported" }],
    technologies: ["AI Automation", "Data Processing", "System Integration", "Workflow Optimization", "Monitoring"],
    client: "Confidential Operations Platform",
    description: "Operations platform with approximately 150 employees",
  },
  {
    id: "blockchain",
    industry: "FinTech / Digital Assets",
    title: "Secure Blockchain Infrastructure for a Digital Asset Platform",
    challenge: "The client required secure, scalable blockchain infrastructure to support digital asset transactions while ensuring system integrity, smart contract security and long-term maintainability.",
    solution: "BawdicSoft delivered enterprise-grade distributed systems with audit-ready smart contracts, blockchain-integrated backends, monitoring, logging and failure handling.",
    results: ["Secure and reliable transaction processing", "Platform scaled as usage increased", "Reduced operational risk", "Enabled confident commercialization"],
    metrics: [{ value: "100%", label: "Secure transaction processing" }, { value: "99.99%", label: "System reliability" }, { value: "Zero", label: "Critical security incidents" }, { value: "24/7", label: "Monitoring and logging" }],
    technologies: ["Blockchain", "Smart Contract Security", "Distributed Systems", "Monitoring", "Web3 Infrastructure"],
    client: "Stealth Web3 Infrastructure Company",
    description: "Web3 infrastructure company in Europe",
  },
];

const AgencyPortfolio = () => {
  const [mongoProjects, setMongoProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedCase, setSelectedCase] = useState<EnterpriseCaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/admin/projects");
        const data = await response.json();
        if (data.success) {
          const formattedProjects: ProjectData[] = data.data.map((project: Record<string, unknown>) => ({
            id: String(project._id),
            category: (project.category as ProjectData["category"]) || "design",
            projectName: String(project.projectName || "Untitled Project"),
            projectImage: typeof project.projectImage === "string"
              ? project.projectImage.replace("public/", "/")
              : "/assets/placeholder.png",
            alternate: String(project.alternate || project.projectName || "Project"),
            href: String(project.href || "#"),
            projectDesc: String(project.projectDesc || ""),
            technologies: Array.isArray(project.technologies) ? project.technologies.map(String) : [],
            detailDesc: typeof project.detailDesc === "string" ? project.detailDesc : undefined,
            challenge: typeof project.challenge === "string" ? project.challenge : undefined,
            solution: typeof project.solution === "string" ? project.solution : undefined,
            features: Array.isArray(project.features) ? project.features.map(String) : [],
            result: typeof project.result === "string" ? project.result : undefined,
            createdAt: typeof project.createdAt === "string" ? project.createdAt : undefined,
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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setSelectedCase(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const allProjects = [...allData, ...mongoProjects]
    .sort((a, b) => new Date(b.createdAt || "2000-01-01").getTime() - new Date(a.createdAt || "2000-01-01").getTime());

  const getProjectFilter = (project: ProjectData): ProjectFilter => {
    const text = `${project.projectName} ${project.projectDesc} ${project.technologies.join(" ")}`.toLowerCase();
    if (text.includes("school") || text.includes("education") || text.includes("igcse")) return "Education";
    if (text.includes("ai") || text.includes("python") || text.includes("tensorflow") || text.includes("data")) return "AI";
    if (text.includes("blockchain") || text.includes("web3") || text.includes("defi") || text.includes("crypto") || text.includes("solidity")) return "Blockchain";
    return "Web";
  };

  const filteredProjects = allProjects.filter((project) => {
    const matchesFilter = activeFilter === "All" || getProjectFilter(project) === activeFilter;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${project.projectName} ${project.projectDesc} ${project.technologies.join(" ")}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const closeModals = () => {
    setSelectedProject(null);
    setSelectedCase(null);
  };

  return (
    <>
      <section id="portfolio-grid" className="bg-white px-4 py-12 text-gray-900 sm:px-6 sm:py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          {/* <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Selected work of our team</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Digital products built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">make an impact.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
              Explore products, platforms and digital experiences delivered by BawdicSoft.
            </p>
          </div> */}

          <div className="mb-6 flex flex-col items-stretch justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {(["All", "Blockchain", "Web", "AI", "Education"] as ProjectFilter[]).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-3 py-2 text-[11px] font-bold transition sm:px-4 sm:text-xs ${activeFilter === filter
                    ? "border-blue-600 bg-blue-600 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"}`}
                >
                  {filter === "All" ? "All Projects" : filter === "AI" ? "AI & Data" : filter === "Web" ? "Web Development" : filter}
                </button>
              ))}
            </div>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects..."
              className="min-w-0 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:w-64"
            />
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500">Loading projects...</div>
          ) : (
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <article key={project.id} className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,35,60,.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_55px_rgba(12,32,58,.12)]">
                  <div className="relative h-48 overflow-hidden bg-slate-100 sm:h-56 md:h-60">
                    <Image src={project.projectImage} alt={project.alternate} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4 sm:p-5 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 p-4 sm:p-5 md:p-6">
                    <h3 className="break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{project.projectName}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500 sm:min-h-16">{project.projectDesc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((technology) => (
                        <span key={technology} className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">{technology}</span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      {project.href && project.href !== "#" ? (
                        <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-600 hover:text-blue-600">
                          View Live Project ↗
                        </a>
                      ) : <span />}
                      <button type="button" onClick={() => setSelectedProject(project)} className="text-xs font-bold text-blue-600 hover:text-blue-800">
                        View Case Study ↗
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          {!loading && filteredProjects.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-500">No projects match your search.</div>
          )}
        </div>
      </section>

      <section id="case-studies" className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">From challenge to measurable impact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">Enterprise success stories.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base">
              Real-world examples of how we help enterprises overcome challenges and achieve measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {enterpriseCaseStudies.map((caseStudy) => (
              <article key={caseStudy.id} className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_25px_rgba(16,43,74,.06)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(16,43,74,.10)] sm:min-h-[250px] sm:p-6">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700">{caseStudy.industry}</span>
                  <span className="text-[10px] text-slate-400">Case study · Anonymized client</span>
                </div>
                <h3 className="mt-3 break-words text-lg font-bold leading-snug text-slate-900 sm:mt-4 sm:text-xl">{caseStudy.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{caseStudy.challenge}</p>
                <div className="mt-auto flex flex-col items-start gap-3 pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                  <span className="text-xs font-bold text-slate-600">{caseStudy.client}</span>
                  <button type="button" onClick={() => setSelectedCase(caseStudy)} className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                    Read case study ↗
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Project and enterprise case-study modals */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-2 backdrop-blur-sm sm:p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative my-auto max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-gray-800 bg-[#0a0a0a] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* FIXED Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-3 top-3 z-20 rounded-full border border-gray-700 bg-gray-800/90 p-2 text-gray-300 backdrop-blur-md transition-colors hover:bg-gray-700 hover:text-white sm:right-4 sm:top-4"
                aria-label="Close project case study"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header Image */}
              <div className="relative aspect-[4/3] w-full bg-black sm:aspect-video">
                <Image
                  src={selectedProject.projectImage}
                  alt={selectedProject.projectName}
                  fill
                  className="object-contain p-4 md:p-8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>

              {/* Modal Content */}
              <div className="relative z-10 -mt-12 px-5 pb-6 sm:-mt-20 sm:p-8 md:p-12">
                <h2 className="mb-6 break-words text-2xl font-bold text-white sm:mb-8 sm:text-3xl md:text-5xl">
                  {selectedProject.projectName}
                </h2>
                
                <div className="space-y-6 text-base leading-relaxed text-gray-300 sm:space-y-8 sm:text-lg">
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

      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-2 backdrop-blur-sm sm:p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 18 }}
              className="relative my-auto max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="enterprise-case-title"
            >
              <div className="relative bg-gradient-to-r from-blue-700 to-cyan-500 px-4 py-6 text-white sm:px-6 sm:py-7 md:px-8">
                <button type="button" onClick={closeModals} aria-label="Close case study" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 text-xl hover:bg-white/20 sm:right-5 sm:top-5">×</button>
                <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Enterprise case study</span>
                <h2 id="enterprise-case-title" className="mt-3 max-w-3xl break-words pr-9 text-xl font-bold leading-tight sm:pr-10 sm:text-2xl md:text-3xl">{selectedCase.title}</h2>
                <p className="mt-2 text-sm text-blue-50">{selectedCase.client} · {selectedCase.description}</p>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                {selectedCase.metrics.length > 0 && (
                  <div className="mb-7 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {selectedCase.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl bg-slate-50 px-3 py-4 text-center">
                        <strong className="block text-xl font-bold text-blue-600 md:text-2xl">{metric.value}</strong>
                        <span className="mt-1 block text-[10px] leading-4 text-slate-500">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="flex items-center text-sm font-bold text-slate-900"><span className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500" />The Challenge</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{selectedCase.challenge}</p>
                  </div>
                  <div>
                    <h3 className="flex items-center text-sm font-bold text-slate-900"><span className="mr-2 h-2.5 w-2.5 rounded-full bg-blue-500" />Our Approach</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{selectedCase.solution}</p>
                  </div>
                </div>
                <div className="mt-7">
                  <h3 className="text-sm font-bold text-slate-900">Key Results</h3>
                  <ul className="mt-3 grid gap-2 md:grid-cols-2">
                    {selectedCase.results.map((result) => (
                      <li key={result} className="text-sm leading-6 text-slate-600"><span className="mr-2 font-bold text-blue-600">✓</span>{result}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-7 rounded-xl bg-sky-50 p-5">
                  <h3 className="text-sm font-bold text-slate-900">Technologies &amp; Methodologies</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCase.technologies.map((technology) => (
                      <span key={technology} className="rounded-full border border-sky-100 bg-white px-3 py-1.5 text-[11px] text-slate-600">{technology}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AgencyPortfolio;