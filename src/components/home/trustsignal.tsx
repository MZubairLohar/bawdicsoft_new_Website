import React, { FC } from "react";

interface TrustSignalItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TrustSignalsSection: FC = () => {
  // Client logos - replace these with actual client logos
const clients = [
  {
    name: "Martin Bobarak - USA",
    detail: "Built a scalable fintech web platform with secure backend architecture.",
  },
  {
    name: "Sophie Williams - UK",
    detail: "Developed high-conversion eCommerce store with custom integrations.",
  },
  {
    name: "Lukas Schneider - Germany",
    detail: "Created smart contracts, DApp, and complete Web3 ecosystem.",
  },
  {
    name: "Daniel Cooper - Canada",
    detail: "Designed SaaS dashboard, APIs, and cloud deployment workflow.",
  },
  {
    name: "Ayesha Khan - UAE",
    detail: "Built secure healthcare portal with data management system.",
  },
  {
    name: "Ryan Mitchell - Australia",
    detail: "Developed interactive EdTech platform with admin panel.",
  },
];



  // Trust indicators
  const trustIndicators: TrustSignalItem[] = [
    {
      title: "Secure Delivery",
      description: "Enterprise-grade security protocols and compliance standards",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Senior Teams",
      description: "10+ years average experience with certified architects",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Enterprise Workflows",
      description: "Proven processes for large-scale development projects",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: "Global Clients",
      description: "Serving startups to Fortune 500 across 15+ countries",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by growing and established companies worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join hundreds of satisfied clients who trust us with their critical software development needs
          </p>
        </div>

        {/* Client Logos Grid */}
        {/* <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="relative w-full h-16 md:h-20 flex items-center justify-center group"
              >
               
                <div className="w-32 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-gray-400 font-semibold text-sm">
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Client Proof Pills */}
<div className="mb-16 md:mb-20">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {clients.map((client, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 rounded-full px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            {client.name}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {client.detail}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Trust Indicators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustIndicators.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-blue-100"
            >
              <div className="flex items-start space-x-4">
                {/* Icon Container */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Stats Section */}
        <div className="mt-16 md:mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">99%</div>
              <div className="text-gray-600">Client Retention</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">250+</div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">15+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">ISO 27001</div>
              <div className="text-gray-600">Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;