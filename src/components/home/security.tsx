import React, { FC } from "react";
import {
  ShieldCheck,
  Code2,
  Lock,
  FileSignature,
  Shield,
  Award,
  Globe,
  HeartPulse,
  Scale,
  Settings,
  Users,
  Activity,
} from "lucide-react";

interface SecurityFeature {
  id: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  certifications?: string[];
}

interface ComplianceStandard {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const SecurityComplianceSection: FC = () => {
  const securityFeatures: SecurityFeature[] = [
    {
      id: 1,
      title: "Secure Development Lifecycle (SDLC)",
      description: "Security integrated at every phase of development, from design to deployment and maintenance.",
      details: [
        "Threat modeling in design phase",
        "Security requirements and coding standards",
        "Automated security testing in CI/CD",
        "Regular penetration testing and audits"
      ],
      icon: <ShieldCheck className="w-8 h-8" />,
      certifications: ["ISO 27001", "OWASP Top 10", "NIST Framework"]
    },
    {
      id: 2,
      title: "Code Reviews & QA Automation",
      description: "Multi-layered quality assurance with automated testing and peer-reviewed code quality gates.",
      details: [
        "Automated SAST/DAST scanning",
        "Peer code review requirements",
        "Automated regression testing suite",
        "Performance and load testing"
      ],
      icon: <Code2 className="w-8 h-8" />,
      certifications: ["SonarQube", "Selenium", "Jest/Cypress"]
    },
    {
      id: 3,
      title: "Data Protection & IP Security",
      description: "End-to-end protection of sensitive data and intellectual property with enterprise-grade encryption.",
      details: [
        "Data encryption at rest and in transit",
        "Role-based access control (RBAC)",
        "Secure data storage and backup",
        "IP protection and audit trails"
      ],
      icon: <Lock className="w-8 h-8" />,
      certifications: ["GDPR", "CCPA", "HIPAA Ready"]
    },
    {
      id: 4,
      title: "NDAs & Confidentiality Assurance",
      description: "Comprehensive legal protections and confidentiality agreements for all client engagements.",
      details: [
        "Standard NDA for all team members",
        "Client-specific confidentiality agreements",
        "Regular security awareness training",
        "Clear data ownership policies"
      ],
      icon: <FileSignature className="w-8 h-8" />,
      certifications: ["Legal Compliance", "Annual Audits"]
    }
  ];

  const complianceStandards: ComplianceStandard[] = [
    { name: "ISO 27001", description: "Information Security Management", icon: <Shield className="w-10 h-10 text-cyan-400" /> },
    { name: "SOC 2 Type II", description: "Security & Availability Controls", icon: <Award className="w-10 h-10 text-cyan-400" /> },
    { name: "GDPR", description: "Data Privacy Regulation", icon: <Globe className="w-10 h-10 text-cyan-400" /> },
    { name: "HIPAA", description: "Healthcare Data Security", icon: <HeartPulse className="w-10 h-10 text-cyan-400" /> },
    { name: "CCPA", description: "California Privacy Rights", icon: <Scale className="w-10 h-10 text-cyan-400" /> },
    { name: "NIST CSF", description: "Cybersecurity Framework", icon: <Settings className="w-10 h-10 text-cyan-400" /> }
  ];

  const securityProcessSteps = [
    { step: 1, title: "Design", description: "Security requirements & threat modeling" },
    { step: 2, title: "Develop", description: "Secure coding & peer reviews" },
    { step: 3, title: "Testing", description: "Automated security scanning & QA" },
    { step: 4, title: "Deploy", description: "Secure configuration & access controls" },
    { step: 5, title: "Maintain", description: "Continuous monitoring & updates" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
              Security First
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Enterprise-Grade{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Security & Compliance
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Protecting your data and intellectual property with industry-leading security practices and compliance standards.
          </p>
        </div>

        {/* Security Process Visualization */}
        <div className="mb-16 md:mb-20">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Secure Development Lifecycle</h3>
            
            {/* Process Steps - Desktop */}
            <div className="hidden md:block relative">
              {/* Connection Line */}
              <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 z-0"></div>
              
              <div className="grid grid-cols-5 gap-4 relative z-10">
                {securityProcessSteps.map((step) => (
                  <div key={step.step} className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex flex-col items-center justify-center mx-auto mb-4 shadow-xl">
                      <span className="text-2xl font-bold">{step.step}</span>
                      <span className="text-sm mt-1">{step.title}</span>
                    </div>
                    <p className="text-sm text-gray-300">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps - Mobile */}
            <div className="md:hidden space-y-6">
              {securityProcessSteps.map((step) => (
                <div key={step.step} className="flex items-center bg-gray-800/50 rounded-xl p-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex flex-col items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold">{step.step}</span>
                    <span className="text-xs">{step.title}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 text-cyan-400">
                  {feature.icon}
                </div>
                {feature.certifications && (
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-1">Certified in</div>
                    <div className="text-sm text-cyan-300 font-medium">
                      {feature.certifications.slice(0, 2).join(", ")}
                    </div>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>

              <ul className="space-y-3">
                {feature.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-cyan-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance Standards */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-4">Compliance Standards We Follow</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Adhering to global security and privacy regulations to ensure your data protection requirements are met.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {complianceStandards.map((standard, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {standard.icon}
                </div>
                <div className="font-bold text-white mb-1">{standard.name}</div>
                <div className="text-sm text-gray-400">{standard.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Protection Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-800/30">
            <div className="text-cyan-400 mb-4">
              <Lock className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Data Encryption</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">• AES-256 encryption at rest</li>
              <li className="text-gray-300">• TLS 1.3 for data in transit</li>
              <li className="text-gray-300">• Key management with HSMs</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl p-8 border border-cyan-800/30">
            <div className="text-cyan-400 mb-4">
              <Users className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Access Control</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">• Multi-factor authentication</li>
              <li className="text-gray-300">• Role-based access control</li>
              <li className="text-gray-300">• Least privilege principle</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-800/30">
            <div className="text-cyan-400 mb-4">
              <Activity className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Audit & Monitoring</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">• 24/7 security monitoring</li>
              <li className="text-gray-300">• Comprehensive audit logs</li>
              <li className="text-gray-300">• Regular vulnerability scans</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityComplianceSection;