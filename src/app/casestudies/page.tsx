"use client";
import React, { FC, useState } from "react";

interface CaseStudy {
  id: number;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Array<{
    value: string;
    label: string;
    change?: string;
  }>;
  client: {
    name: string;
    description: string;
    logo?: string;
    anonymous?: boolean;
  };
}

const CaseStudiesSection: FC = () => {
  const [selectedCase, setSelectedCase] = useState<number>(1);

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      industry: "SaaS",
      title: "Scaling a SaaS Platform with a Dedicated Engineering Team",
      challenge: "The client was experiencing rapid customer growth but faced: Engineering capacity bottlenecks, delayed feature releases, increasing pressure on the in-house team, and difficulty hiring senior engineers quickly. They needed to scale delivery fast without compromising code quality or security.",
      solution: "BawdicSoft deployed a dedicated senior engineering team that integrated directly with the client's internal processes. What we delivered: Senior full-stack engineers aligned with the client's tech stack, agile delivery with sprint planning and weekly reporting, code reviews and QA aligned with enterprise standards, and close collaboration with the client's product and engineering leads.",
      results: [
        "Feature release velocity increased by 2×",
        "Reduced development backlog by 40%",
        "Enabled the internal team to focus on core architecture and roadmap",
        "Lowered overall development cost compared to local hiring"
      ],
      metrics: [
        { value: "2×", label: "Feature release velocity increase", change: "positive" },
        { value: "40%", label: "Reduction in development backlog", change: "positive" },
        { value: "100%", label: "Enterprise standards alignment", change: "positive" },
        { value: "200+", label: "Company size supported", change: "positive" }
      ],
      client: {
        name: "Confidential B2B SaaS Company",
        description: "US-based SaaS company with ~200 employees",
        anonymous: true
      }
    },
    {
      id: 2,
      industry: "FinTech",
      title: "Modernizing a Legacy Platform for a FinTech Company",
      challenge: "The client's legacy platform struggled with: Poor scalability during peak usage, slow transaction processing, increasing maintenance costs, and security and compliance concerns. They needed a modern, secure, and scalable architecture without disrupting live operations.",
      solution: "BawdicSoft led a platform modernization initiative, focusing on performance, security, and future scalability. Key actions: Conducted full architecture and risk assessment, refactored legacy components into modular services, implemented performance optimization and security best practices, and introduced automated testing and CI/CD pipelines.",
      results: [
        "Improved system performance by 45%",
        "Reduced production incidents significantly",
        "Strengthened security posture for sensitive financial data",
        "The platform is ready to support future growth and integrations"
      ],
      metrics: [
        { value: "45%", label: "System performance improvement", change: "positive" },
        { value: "99.9%", label: "Security compliance", change: "positive" },
        { value: "70%", label: "Reduction in production incidents", change: "positive" },
        { value: "24/7", label: "Live operations maintained", change: "positive" }
      ],
      client: {
        name: "Confidential Financial Technology Provider",
        description: "Financial Technology Provider in Middle East region",
        anonymous: true
      }
    },
    {
      id: 3,
      industry: "SaaS / Operations",
      title: "AI Automation to Reduce Operational Costs",
      challenge: "The client relied heavily on manual processes for: Data processing, internal reporting, and customer operations. These workflows were time-consuming, error-prone, and expensive.",
      solution: "BawdicSoft designed and implemented AI-driven automation workflows tailored to the client's operations. Scope included: Automated data classification and processing, intelligent workflow automation, system integration with existing tools, and monitoring and performance optimization.",
      results: [
        "Reduced operational costs by 30%+",
        "Cut manual processing time by over 50%",
        "Improved accuracy and reporting consistency",
        "Freed internal teams to focus on higher-value work"
      ],
      metrics: [
        { value: "30%+", label: "Reduction in operational costs", change: "positive" },
        { value: "50%+", label: "Manual processing time reduction", change: "positive" },
        { value: "99.5%", label: "Processing accuracy rate", change: "positive" },
        { value: "150+", label: "Employees supported", change: "positive" }
      ],
      client: {
        name: "Confidential Operations Platform",
        description: "Operations platform with ~150 employees",
        anonymous: true
      }
    },
    {
      id: 4,
      industry: "FinTech / Digital Assets",
      title: "Secure Blockchain Infrastructure for a Digital Asset Platform",
      challenge: "The client required a secure, scalable blockchain infrastructure to support digital asset transactions while ensuring: High system integrity, smart contract security, long-term maintainability, and regulatory awareness.",
      solution: "BawdicSoft delivered an enterprise-grade distributed system, emphasizing security and reliability. What we built: Secure smart contracts with audit-ready architecture, backend systems integrated with blockchain infrastructure, monitoring, logging, and failure handling mechanisms, and clear documentation for long-term maintenance.",
      results: [
        "Secure and reliable transaction processing",
        "Platform scaled smoothly as usage increased",
        "Reduced operational risk through robust system design",
        "Enabled the client to move confidently toward commercialization"
      ],
      metrics: [
        { value: "100%", label: "Secure transaction processing", change: "positive" },
        { value: "99.99%", label: "System reliability", change: "positive" },
        { value: "Zero", label: "Critical security incidents", change: "positive" },
        { value: "24/7", label: "Monitoring & logging", change: "positive" }
      ],
      client: {
        name: "Stealth Web3 Infrastructure Company",
        description: "Web3 Infrastructure Company in Europe region",
        anonymous: true
      }
    }
  ];

  const selectedCaseStudy = caseStudies.find(cs => cs.id === selectedCase) || caseStudies[0];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 mb-6">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Case Studies
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Enterprise Success{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Stories
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world examples of how we help enterprises overcome challenges and achieve measurable results.
          </p>
        </div>

        {/* Case Studies Selector */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Case Studies List */}
          <div className="lg:w-2/5 space-y-4">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Select Case Study</h3>
              <div className="space-y-4">
                {caseStudies.map((caseStudy) => (
                  <button
                    key={caseStudy.id}
                    onClick={() => setSelectedCase(caseStudy.id)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${selectedCase === caseStudy.id
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCase === caseStudy.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                        }`}>
                        {caseStudy.industry}
                      </span>
                      {caseStudy.client.anonymous && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">
                          Anonymized
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{caseStudy.title}</h4>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{caseStudy.challenge.substring(0, 100)}...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold mr-3">
                          {caseStudy.client.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{caseStudy.client.name}</div>
                          <div className="text-xs text-gray-500">{caseStudy.client.description}</div>
                        </div>
                      </div>
                      {selectedCase === caseStudy.id && (
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Case Study Details */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Case Study Header */}
              <div className="p-8 md:p-10 bg-gradient-to-r from-blue-500 to-cyan-500">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {selectedCaseStudy.industry}
                  </span>
                  {selectedCaseStudy.client.anonymous && (
                    <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded text-xs font-medium text-white">
                      Case Study • Anonymized Client
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {selectedCaseStudy.title}
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold mr-4">
                    {selectedCaseStudy.client.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{selectedCaseStudy.client.name}</div>
                    <div className="text-blue-100 text-sm">{selectedCaseStudy.client.description}</div>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="p-8 md:p-10">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {selectedCaseStudy.metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-5 text-center">
                      <div className={`text-2xl md:text-3xl font-bold mb-2 ${metric.change === 'positive' ? 'text-blue-600' : 'text-gray-900'}`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                      <h4 className="text-lg font-bold text-gray-900">The Challenge</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{selectedCaseStudy.challenge}</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                      <h4 className="text-lg font-bold text-gray-900">Our Solution</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{selectedCaseStudy.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-10">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                    <h4 className="text-lg font-bold text-gray-900">Key Results</h4>
                  </div>
                  <ul className="space-y-4">
                    {selectedCaseStudy.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used (Optional) */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Technologies & Methodologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedCaseStudy.industry === "SaaS" && (
                      <>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Agile Delivery</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Full-Stack Engineering</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Code Reviews</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Enterprise Standards</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Team Integration</span>
                      </>
                    )}
                    {selectedCaseStudy.industry === "FinTech" && (
                      <>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Architecture Assessment</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Performance Optimization</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Security Best Practices</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">CI/CD Pipelines</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Risk Management</span>
                      </>
                    )}
                    {selectedCaseStudy.industry === "SaaS / Operations" && (
                      <>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">AI Automation</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Workflow Optimization</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">System Integration</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Performance Monitoring</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">ROI Focus</span>
                      </>
                    )}
                    {selectedCaseStudy.industry === "FinTech / Digital Assets" && (
                      <>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Blockchain Infrastructure</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Smart Contract Security</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Distributed Systems</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">System Monitoring</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Regulatory Awareness</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you overcome your enterprise challenges and achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50">
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              Schedule a Case Study Review
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-semibold border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50">
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download All Case Studies (PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;