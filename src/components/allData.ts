// export interface ProjectData {
//   id: number;
//   category: "design" | "video" | "content";
//   projectName: string;
//   projectImage: string;
//   alternate: string;
//   href: string;
//   projectDesc: string;
//   technologies: string[];
//   videoUrl?: string;
//   detailDesc?: string;
  
//   // New Case Study Fields
//   challenge?: string;
//   solution?: string;
//   features?: string[];
//   result?: string;
// }

// export const allData: ProjectData[] = [
//   {
//     id: 1,
//     category: "content",
//     projectName: "AGUA COIN",
//     projectImage: "/assets/aguacoin.png",
//     alternate: "AGUA is a DAO token and platform offering stablecoins SAG and SAU.",
//     href: "https://www.aguacoins.com/",
//     projectDesc: "Decentralized digital currency ecosystem featuring asset-backed stablecoins tied to physical precious metals.",
//     technologies: ["Next.js", "Web3.js", "Tailwind CSS", "Solidity"],
//     videoUrl: "/videos/agua.mp4",
//     detailDesc: "A comprehensive Web3 platform enabling users to trade asset-backed stablecoins with full transparency.",
//     challenge: "The client needed a secure, decentralized currency platform backed by physical precious metals, requiring real-time pricing integration and complex smart contract architecture.",
//     solution: "We engineered a full-stack Web3 ecosystem with live gold/silver price APIs, multi-signature wallet integration, and a robust DAO governance structure.",
//     features: ["Real-time precious metal pricing API", "Multi-signature wallet integration", "DAO governance dashboard", "Asset-backed stablecoin minting"],
//     result: "Successfully launched a secure, scalable platform enabling global users to trade asset-backed stablecoins with complete financial transparency."
//   },
//   {
//     id: 2,
//     category: "design",
//     projectName: "SIGMANTARIAN",
//     projectImage: "/assets/sigmantarian.png",
//     alternate: "A Revolutionary Crypto Platform Offering Maximum Rewards & Sustainability",
//     href: "https://www.sigmantarian.com/",
//     projectDesc: "A blockchain-based affiliate platform enabling secure and transparent crypto rewards with DeFi integration.",
//     technologies: ["React", "Node.js", "Blockchain", "Figma"],
//     detailDesc: "A revolutionary crypto platform offering maximum rewards and sustainability through DeFi integration.",
//     challenge: "Building a transparent, scalable affiliate marketing platform on the blockchain that could handle complex reward distributions and staking mechanisms.",
//     solution: "We developed a high-performance React frontend paired with a secure Node.js backend, integrating smart contracts for automated, transparent reward distribution.",
//     features: ["Automated affiliate reward distribution", "Monthly token staking yields", "DeFi integration for financial independence", "Transparent blockchain ledger"],
//     result: "Delivered a fully functional, secure crypto ecosystem that promotes financial independence through decentralized finance."
//   },
//   {
//     id: 3,
//     category: "content",
//     projectName: "HASHFOR",
//     projectImage: "/assets/hashfor.png",
//     alternate: "Boost your online presence with Expert SEO & AEO",
//     href: "https://www.hashfor.com/",
//     projectDesc: "Professional digital marketing and SEO service provider focusing on boosting brands’ online visibility.",
//     technologies: ["Next.js", "SEO Optimization", "Analytics", "Tailwind CSS"],
//     detailDesc: "A professional digital marketing and SEO service provider focusing on boosting brands’ online visibility.",
//     challenge: "Creating a high-converting, data-driven platform to showcase SEO and Answer Engine Optimization (AEO) services while providing interactive audit tools.",
//     solution: "We built a lightning-fast Next.js application featuring interactive SEO/AEO audit tools, real-time analytics dashboards, and a conversion-optimized UI.",
//     features: ["Interactive SEO & AEO Audit Tools", "Real-time ranking analytics dashboard", "Data-driven optimization strategies", "High-converting landing pages"],
//     result: "Increased organic traffic and search engine rankings for clients through a highly optimized, user-friendly digital presence."
//   },
//   {
//     id: 4,
//     category: "design",
//     projectName: "AL-MADINA ONLINE",
//     projectImage: "/assets/almadina.png",
//     alternate: "Official Cambridge International School",
//     href: "https://almadinahonline.co.uk/",
//     projectDesc: "Official Cambridge International School offering 7 full-time IGCSE subjects alongside Islamic Studies and Arabic.",
//     technologies: ["WordPress", "Custom Theme", "LMS Integration", "UI/UX Design"],
//     detailDesc: "An Official Cambridge International School offering 7 full-time IGCSE subjects.",
//     challenge: "Developing a comprehensive, user-friendly online learning environment for an international school that seamlessly blends academic and Islamic studies.",
//     solution: "We designed a custom WordPress theme with integrated Learning Management System (LMS) capabilities, ensuring a smooth experience for students, parents, and teachers.",
//     features: ["Custom LMS Integration", "Seamless parent-teacher-student portal", "Responsive design for all devices", "Secure student data management"],
//     result: "Launched a robust digital campus that successfully delivers 7 full-time IGCSE subjects alongside Islamic Studies to a global student body."
//   },
//   {
//     id: 5,
//     category: "design",
//     projectName: "FGRF FOUNDATION",
//     projectImage: "/assets/fgrforg.png",
//     alternate: "Faizan Global Relief Foundation",
//     href: "https://fgrf.org/",
//     projectDesc: "A non-profit foundation website designed for clarity, trust, and seamless donation navigation.",
//     technologies: ["Next.js", "Framer Motion", "Stripe API", "Tailwind CSS"],
//     detailDesc: "A clean, accessible, and trustworthy digital presence designed to maximize donor engagement.",
//     challenge: "Creating a trustworthy, highly accessible digital presence for a global relief foundation to maximize donor engagement and showcase impact.",
//     solution: "We built a fast, accessible Next.js website with smooth Framer Motion animations and a secure, frictionless Stripe donation integration.",
//     features: ["Frictionless Stripe donation flow", "Interactive global impact map", "Accessibility-first design (WCAG compliant)", "Secure donor data handling"],
//     result: "Significantly increased online donation conversion rates and global donor engagement through a clean, trustworthy interface."
//   },
//   {
//     id: 6,
//     category: "video",
//     projectName: "DEEP-TRACE",
//     projectImage: "/assets/deeptrace.png",
//     alternate: "Detect AI-Generated Content With Confidence",
//     href: "https://deep-trace-snowy.vercel.app/",
//     projectDesc: "Advanced AI detection for text, images, and videos. Instantly verify AI-generated content with scientific accuracy.",
//     technologies: ["Python", "TensorFlow", "Next.js", "Data Visualization"],
//     videoUrl: "/videos/deeptrace-demo.mp4",
//     detailDesc: "Advanced AI detection for text, images, and videos with scientific accuracy.",
//     challenge: "Building a highly accurate, real-time AI detection engine capable of analyzing text, images, and video to distinguish human from machine-generated content.",
//     solution: "We engineered a Python-based TensorFlow backend for deep learning analysis, paired with a sleek Next.js frontend for instant, visual result reporting.",
//     features: ["Multi-modal AI detection (Text, Image, Video)", "Real-time probability breakdowns", "Scientific accuracy algorithms", "Instant visual reporting dashboard"],
//     result: "Delivered a powerful, production-ready AI tool that helps users instantly verify content authenticity with high scientific confidence."
//   },
//   {
//     id: 7,
//     category: "video",
//     projectName: "CYBERCITY",
//     projectImage: "/assets/cyberCity.png",
//     alternate: "Advanced Security Audit Agent",
//     href: "https://vulnerability-dun.vercel.app/",
//     projectDesc: "Advanced Security Audit Agent to Protect Your Website from Cyber Threats with real-time monitoring.",
//     technologies: ["Cybersecurity", "React", "Node.js", "Docker"],
//     videoUrl: "/videos/cybercity-demo.mp4",
//     detailDesc: "Advanced Security Audit Agent to Protect Your Website from Cyber Threats.",
//     challenge: "Creating an automated, comprehensive security audit agent that could scan websites for vulnerabilities and provide actionable, real-time reports.",
//     solution: "We developed a robust React and Node.js platform containerized with Docker, featuring automated scanning scripts and a real-time vulnerability dashboard.",
//     features: ["Automated vulnerability scanning", "Real-time security alerts", "Comprehensive PDF reporting", "Actionable remediation steps"],
//     result: "Empowered businesses to proactively identify and fix security flaws, significantly reducing their cyber risk exposure."
//   },
// ];


export interface ProjectData {
  id: number;
  category: "design" | "video" | "content";
  projectName: string;
  projectImage: string;
  alternate: string;
  href: string;
  projectDesc: string;
  technologies: string[];
  
  // New Portfolio Fields
  videoUrl?: string;
  detailDesc?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  result?: string;

  // Legacy Fields (Optional) to prevent breaking the old productDetailes page
  Video?: string;
  mainTitle?: string;
  ourAIpowered?: string;
  thinkAboutIt?: string;
  thisIsnt?: string;
  WithOurEas?: string;
  iReally?: string;
  theGoal?: string;
  imReally?: string;
  thisWould?: string;
  imExcited?: string;
  foodRecognization?: string;
  foodRecognizationDec?: string;
  qualityAssessment?: string;
  qualityAssessmentDec?: string;
  realTimeMonitoring?: string;
  realTimeMonitoringDec?: string;
  Applications?: string;
  applicationsDec?: string;
}

export const allData: ProjectData[] = [
  {
    id: 1,
    category: "content",
    projectName: "AGUA COIN",
    projectImage: "/assets/aguacoin.png",
    alternate: "AGUA is a DAO token and platform offering stablecoins SAG and SAU.",
    href: "https://www.aguacoins.com/",
    projectDesc: "Decentralized digital currency ecosystem featuring asset-backed stablecoins tied to physical precious metals.",
    technologies: ["Next.js", "Web3.js", "Tailwind CSS", "Solidity"],
    videoUrl: "/videos/agua.mp4",
    detailDesc: "A comprehensive Web3 platform enabling users to trade asset-backed stablecoins with full transparency.",
    challenge: "The client needed a secure, decentralized currency platform backed by physical precious metals, requiring real-time pricing integration and complex smart contract architecture.",
    solution: "We engineered a full-stack Web3 ecosystem with live gold/silver price APIs, multi-signature wallet integration, and a robust DAO governance structure.",
    features: ["Real-time precious metal pricing API", "Multi-signature wallet integration", "DAO governance dashboard", "Asset-backed stablecoin minting"],
    result: "Successfully launched a secure, scalable platform enabling global users to trade asset-backed stablecoins with complete financial transparency."
  },
  {
    id: 2,
    category: "design",
    projectName: "SIGMANTARIAN",
    projectImage: "/assets/sigmantarian.png",
    alternate: "A Revolutionary Crypto Platform Offering Maximum Rewards & Sustainability",
    href: "https://www.sigmantarian.com/",
    projectDesc: "A blockchain-based affiliate platform enabling secure and transparent crypto rewards with DeFi integration.",
    technologies: ["React", "Node.js", "Blockchain", "Figma"],
    detailDesc: "A revolutionary crypto platform offering maximum rewards and sustainability through DeFi integration.",
    challenge: "Building a transparent, scalable affiliate marketing platform on the blockchain that could handle complex reward distributions and staking mechanisms.",
    solution: "We developed a high-performance React frontend paired with a secure Node.js backend, integrating smart contracts for automated, transparent reward distribution.",
    features: ["Automated affiliate reward distribution", "Monthly token staking yields", "DeFi integration for financial independence", "Transparent blockchain ledger"],
    result: "Delivered a fully functional, secure crypto ecosystem that promotes financial independence through decentralized finance."
  },
  {
    id: 3,
    category: "content",
    projectName: "HASHFOR",
    projectImage: "/assets/hashfor.png",
    alternate: "Boost your online presence with Expert SEO & AEO",
    href: "https://www.hashfor.com/",
    projectDesc: "Professional digital marketing and SEO service provider focusing on boosting brands’ online visibility.",
    technologies: ["Next.js", "SEO Optimization", "Analytics", "Tailwind CSS"],
    detailDesc: "A professional digital marketing and SEO service provider focusing on boosting brands’ online visibility.",
    challenge: "Creating a high-converting, data-driven platform to showcase SEO and Answer Engine Optimization (AEO) services while providing interactive audit tools.",
    solution: "We built a lightning-fast Next.js application featuring interactive SEO/AEO audit tools, real-time analytics dashboards, and a conversion-optimized UI.",
    features: ["Interactive SEO & AEO Audit Tools", "Real-time ranking analytics dashboard", "Data-driven optimization strategies", "High-converting landing pages"],
    result: "Increased organic traffic and search engine rankings for clients through a highly optimized, user-friendly digital presence."
  },
  {
    id: 4,
    category: "design",
    projectName: "AL-MADINA ONLINE",
    projectImage: "/assets/almadina.png",
    alternate: "Official Cambridge International School",
    href: "https://almadinahonline.co.uk/",
    projectDesc: "Official Cambridge International School offering 7 full-time IGCSE subjects alongside Islamic Studies and Arabic.",
    technologies: ["WordPress", "Custom Theme", "LMS Integration", "UI/UX Design"],
    detailDesc: "An Official Cambridge International School offering 7 full-time IGCSE subjects.",
    challenge: "Developing a comprehensive, user-friendly online learning environment for an international school that seamlessly blends academic and Islamic studies.",
    solution: "We designed a custom WordPress theme with integrated Learning Management System (LMS) capabilities, ensuring a smooth experience for students, parents, and teachers.",
    features: ["Custom LMS Integration", "Seamless parent-teacher-student portal", "Responsive design for all devices", "Secure student data management"],
    result: "Launched a robust digital campus that successfully delivers 7 full-time IGCSE subjects alongside Islamic Studies to a global student body."
  },
  {
    id: 5,
    category: "design",
    projectName: "FGRF FOUNDATION",
    projectImage: "/assets/fgrforg.png",
    alternate: "Faizan Global Relief Foundation",
    href: "https://fgrf.org/",
    projectDesc: "A non-profit foundation website designed for clarity, trust, and seamless donation navigation.",
    technologies: ["Next.js", "Framer Motion", "Stripe API", "Tailwind CSS"],
    detailDesc: "A clean, accessible, and trustworthy digital presence designed to maximize donor engagement.",
    challenge: "Creating a trustworthy, highly accessible digital presence for a global relief foundation to maximize donor engagement and showcase impact.",
    solution: "We built a fast, accessible Next.js website with smooth Framer Motion animations and a secure, frictionless Stripe donation integration.",
    features: ["Frictionless Stripe donation flow", "Interactive global impact map", "Accessibility-first design (WCAG compliant)", "Secure donor data handling"],
    result: "Significantly increased online donation conversion rates and global donor engagement through a clean, trustworthy interface."
  },
  {
    id: 6,
    category: "video",
    projectName: "DEEP-TRACE",
    projectImage: "/assets/deeptrace.png",
    alternate: "Detect AI-Generated Content With Confidence",
    href: "https://deep-trace-snowy.vercel.app/",
    projectDesc: "Advanced AI detection for text, images, and videos. Instantly verify AI-generated content with scientific accuracy.",
    technologies: ["Python", "TensorFlow", "Next.js", "Data Visualization"],
    videoUrl: "/videos/deeptrace-demo.mp4",
    detailDesc: "Advanced AI detection for text, images, and videos with scientific accuracy.",
    challenge: "Building a highly accurate, real-time AI detection engine capable of analyzing text, images, and video to distinguish human from machine-generated content.",
    solution: "We engineered a Python-based TensorFlow backend for deep learning analysis, paired with a sleek Next.js frontend for instant, visual result reporting.",
    features: ["Multi-modal AI detection (Text, Image, Video)", "Real-time probability breakdowns", "Scientific accuracy algorithms", "Instant visual reporting dashboard"],
    result: "Delivered a powerful, production-ready AI tool that helps users instantly verify content authenticity with high scientific confidence."
  },
  {
    id: 7,
    category: "video",
    projectName: "CYBERCITY",
    projectImage: "/assets/cyberCity.png",
    alternate: "Advanced Security Audit Agent",
    href: "https://vulnerability-dun.vercel.app/",
    projectDesc: "Advanced Security Audit Agent to Protect Your Website from Cyber Threats with real-time monitoring.",
    technologies: ["Cybersecurity", "React", "Node.js", "Docker"],
    videoUrl: "/videos/cybercity-demo.mp4",
    detailDesc: "Advanced Security Audit Agent to Protect Your Website from Cyber Threats.",
    challenge: "Creating an automated, comprehensive security audit agent that could scan websites for vulnerabilities and provide actionable, real-time reports.",
    solution: "We developed a robust React and Node.js platform containerized with Docker, featuring automated scanning scripts and a real-time vulnerability dashboard.",
    features: ["Automated vulnerability scanning", "Real-time security alerts", "Comprehensive PDF reporting", "Actionable remediation steps"],
    result: "Empowered businesses to proactively identify and fix security flaws, significantly reducing their cyber risk exposure."
  },
];