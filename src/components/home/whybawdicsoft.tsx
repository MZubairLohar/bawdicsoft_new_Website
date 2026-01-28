import React, { FC } from "react";

interface Advantage {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  stats?: {
    value: string;
    label: string;
  };
}

const WhyBawdicSoftSection: FC = () => {
  const advantages: Advantage[] = [
    {
      id: 1,
      title: "Senior-First Engineering Teams",
      description: "Every project is led by seasoned engineers with 10+ years of enterprise experience, ensuring architectural excellence and robust solutions.",
      features: [
        "Principal-level technical leadership",
        "Average 10+ years industry experience",
        "Cross-domain expertise",
        "Mentorship-driven culture"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      stats: {
        value: "15+ years",
        label: "Average Team Experience"
      }
    },
    {
      id: 2,
      title: "Enterprise Delivery Frameworks",
      description: "Proven Agile & DevSecOps methodologies tailored for enterprise-scale projects with integrated security and continuous delivery.",
      features: [
        "CI/CD pipeline optimization",
        "Sprint planning & retrospectives",
        "Automated testing suites",
        "Infrastructure as Code (IaC)"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      stats: {
        value: "40% faster",
        label: "Deployment Cycles"
      }
    },
    {
      id: 3,
      title: "Security-by-Design Mindset",
      description: "Security is embedded into every phase of development, from initial architecture to deployment and maintenance.",
      features: [
        "Threat modeling & risk assessment",
        "Secure code review processes",
        "Compliance automation",
        "Regular security audits"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      stats: {
        value: "99.9%",
        label: "Security Compliance"
      }
    },
    {
      id: 4,
      title: "Transparent Reporting & Communication",
      description: "Real-time visibility into project progress with detailed metrics, regular syncs, and proactive stakeholder engagement.",
      features: [
        "Daily/weekly progress reports",
        "Interactive dashboards",
        "Risk & dependency tracking",
        "Stakeholder alignment sessions"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      stats: {
        value: "24/7",
        label: "Project Visibility"
      }
    },
    {
      id: 5,
      title: "Flexible Engagement Models",
      description: "Choose from dedicated teams, project-based, or managed services that align with your business needs and budget.",
      features: [
        "Fixed-price projects",
        "Time & materials",
        "Dedicated development teams",
        "Hybrid engagement models"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      stats: {
        value: "100%",
        label: "Client Retention"
      }
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The BawdicSoft{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Difference
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            What sets us apart in delivering exceptional enterprise software solutions with predictable outcomes.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {advantages.slice(0, 3).map((advantage) => (
            <AdvantageCard key={advantage.id} advantage={advantage} />
          ))}
        </div>

        {/* Middle Row - Centered */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-2xl">
            <AdvantageCard advantage={advantages[3]} />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="hidden lg:block"></div> {/* Empty spacer */}
          <AdvantageCard advantage={advantages[4]} />
          <div className="hidden lg:block"></div> {/* Empty spacer */}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How We Compare to Traditional Vendors
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Criteria</th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-600 bg-blue-50 rounded-lg">BawdicSoft</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-500">Typical Vendors</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Team Experience Level</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Senior-First
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">Mixed experience levels</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Security Integration</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                      Built-in from Day 1
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">Often added later</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Communication Frequency</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                      Daily & Real-time
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">Weekly or bi-weekly</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Engagement Flexibility</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold">
                      Multiple Models
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">Limited options</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience the Difference?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            See how our approach translates to better outcomes for your enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Discovery Call
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              View Client Success Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Advantage Card Component
const AdvantageCard: FC<{ advantage: Advantage }> = ({ advantage }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-500">
      {/* Top Decorative Element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        {/* Icon and Title */}
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600">
            {advantage.icon}
          </div>
          {advantage.stats && (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{advantage.stats.value}</div>
              <div className="text-sm text-gray-500">{advantage.stats.label}</div>
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
          {advantage.title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {advantage.description}
        </p>

        {/* Features List */}
        <ul className="space-y-3">
          {advantage.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default WhyBawdicSoftSection;