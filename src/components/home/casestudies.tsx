"use client";
import React, { FC, useState } from "react";
import Image from "next/image";

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
      industry: "Financial Technology",
      title: "Modernizing Legacy Banking Infrastructure",
      challenge: "A leading European bank struggled with 20-year-old monolithic systems that couldn't scale, were costly to maintain, and couldn't support modern digital banking features, resulting in poor customer experience and high operational costs.",
      solution: "We architected and implemented a microservices-based platform with containerized deployment, real-time transaction processing, and enhanced security protocols. Migrated critical services to cloud-native architecture with zero downtime.",
      results: [
        "Enabled launch of new digital banking platform 6 months ahead of schedule",
        "Successfully processed 100K+ concurrent transactions during peak loads",
        "Achieved full regulatory compliance across EU and UK markets",
        "Trained and transitioned knowledge to internal teams within 3 months"
      ],
      metrics: [
        { value: "60%", label: "Reduction in operational costs", change: "positive" },
        { value: "99.99%", label: "System uptime", change: "positive" },
        { value: "2.5s", label: "Average transaction time", change: "positive" },
        { value: "3M+", label: "Active users migrated", change: "positive" }
      ],
      client: {
        name: "Global European Bank",
        description: "A multinational banking institution serving 15+ countries",
        anonymous: true
      }
    },
    {
      id: 2,
      industry: "Healthcare Technology",
      title: "AI-Powered Patient Management System",
      challenge: "A healthcare provider network needed to consolidate 8 disparate patient management systems into a unified platform while ensuring HIPAA compliance, real-time data synchronization, and integration with existing medical devices.",
      solution: "Developed an enterprise-grade healthcare platform with AI-driven patient insights, secure cloud infrastructure, and API-first architecture. Implemented advanced data anonymization and end-to-end encryption for sensitive health records.",
      results: [
        "Unified patient data from 8 systems into single source of truth",
        "Reduced patient data entry errors by 92% through automation",
        "Achieved HIPAA, GDPR, and HITRUST certifications",
        "Enabled predictive analytics for patient risk assessment"
      ],
      metrics: [
        { value: "40%", label: "Faster patient processing", change: "positive" },
        { value: "99.95%", label: "Data accuracy rate", change: "positive" },
        { value: "75%", label: "Reduction in manual work", change: "positive" },
        { value: "1M+", label: "Patient records secured", change: "positive" }
      ],
      client: {
        name: "Regional Healthcare Network",
        description: "Network of 50+ hospitals and clinics across 3 states",
        anonymous: true
      }
    },
    {
      id: 3,
      industry: "Retail & E-commerce",
      title: "Scalable E-commerce Platform Migration",
      challenge: "A major retail chain's legacy e-commerce platform couldn't handle holiday season traffic spikes, causing 30% cart abandonment rates and significant revenue loss during peak shopping periods.",
      solution: "Built a cloud-native, auto-scaling e-commerce platform with edge computing for global performance. Implemented real-time inventory management, AI-powered recommendations, and seamless payment processing across 20+ countries.",
      results: [
        "Handled 500K concurrent users during Black Friday without downtime",
        "Reduced page load times from 8s to 0.8s globally",
        "Integrated with 15+ payment gateways and local tax systems",
        "Enabled real-time inventory across 500+ physical stores"
      ],
      metrics: [
        { value: "200%", label: "Increase in peak traffic capacity", change: "positive" },
        { value: "85%", label: "Reduction in cart abandonment", change: "positive" },
        { value: "45%", label: "Increase in conversion rate", change: "positive" },
        { value: "$50M+", label: "Additional revenue", change: "positive" }
      ],
      client: {
        name: "Global Retail Chain",
        description: "Fortune 500 retailer with 500+ stores worldwide",
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 mb-6">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              Case Studies
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Enterprise Success{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
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
                        ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-emerald-200 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCase === caseStudy.id
                          ? 'bg-emerald-100 text-emerald-800'
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center text-white text-sm font-bold mr-3">
                          {caseStudy.client.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{caseStudy.client.name}</div>
                          <div className="text-xs text-gray-500">{caseStudy.client.description}</div>
                        </div>
                      </div>
                      {selectedCase === caseStudy.id && (
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="p-8 md:p-10 bg-gradient-to-r from-emerald-500 to-green-500">
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
                    <div className="text-emerald-100 text-sm">{selectedCaseStudy.client.description}</div>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="p-8 md:p-10">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {selectedCaseStudy.metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-5 text-center">
                      <div className={`text-2xl md:text-3xl font-bold mb-2 ${metric.change === 'positive' ? 'text-emerald-600' : 'text-gray-900'}`}>
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
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3"></div>
                    <h4 className="text-lg font-bold text-gray-900">Key Results</h4>
                  </div>
                  <ul className="space-y-4">
                    {selectedCaseStudy.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used (Optional) */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Technologies & Methodologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedCaseStudy.industry === "Financial Technology" && (
                      <>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Microservices</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Kubernetes</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">AWS</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">React/Node.js</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">DevSecOps</span>
                      </>
                    )}
                    {selectedCaseStudy.industry === "Healthcare Technology" && (
                      <>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">HIPAA Compliance</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">AI/ML</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Azure Cloud</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Python/Django</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Data Encryption</span>
                      </>
                    )}
                    {selectedCaseStudy.industry === "Retail & E-commerce" && (
                      <>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Cloud Scaling</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Edge Computing</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Next.js</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Payment Integration</span>
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">CI/CD</span>
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