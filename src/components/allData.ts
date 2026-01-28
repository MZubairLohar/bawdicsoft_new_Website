
//   export const allData = [ 
//       {
//     id: 1,
//     category: "NextJS",
//     subCategory: "NextJS-Coin",
//     projectName: "AGUA COIN",
//     projectImage: "/assets/aguaCoin.png",
//     alternate: "AGUA is a DAO token and platform offering stablecoins SAG and SAU.",
//     href: "https://www.aguacoins.com/",
//     projectDesc: "AGUA is a DAO token and platform offering stablecoins SAG and SAU.A decentralized digital currency ecosystem featuring asset‑backed stablecoins tied to physical precious metals.Offers stablecoins backed by real gold (SAU) and silver (SAG), providing enhanced financial stability and inflation protection.Designed to combine blockchain transparency with the security of real‑world assets, aiming for long‑term value preservation.Part of a DAO‑governed ecosystem where holders can participate in governance and future protocol decisions.Enables secure decentralized transactions, liquidity, and asset management through blockchain technology.",
//   },

//    {
//     id: 2,
//     category: "NextJS",
//     subCategory: "NextJS-NFT",
//     projectName: "SIGMANTARIAN",
//     projectImage: "/assets/sigmantarian.png",
//     alternate: "A REVOLUTIONARY CRYPTO PLATFORM OFFERING MAXIMUM REWARDS & SUSTAINABILITY",
//     href: "https://www.sigmantarian.com/",
//     projectDesc: "A Revolutionary Crypto Platform Offering Maximum Rewards & Sustainbility.A blockchain-based affiliate platform enabling secure and transparent crypto rewards.Users can join via membership packages to participate in the ecosystem.Offers affiliate marketing rewards and potential monthly token staking yields.Designed to promote financial independence through decentralized finance (DeFi) integration.Focused on transparency, security, and scalable reward mechanisms for users.",
//   },

//    {
//     id: 3,
//     category: "NextJS",
//     subCategory: "NextJS-Coin",
//     projectName: "HASHFOR",
//     projectImage: "/assets/hashfor.png",
//     alternate: "Boost your online presence with Expert SEO & AEO",
//     href: "https://www.hashfor.com/",
//     projectDesc: "Boost your online presence with Expert SEO & AEO.Hashfor is a professional digital marketing and SEO service provider that focuses on boosting brands’ online visibility, search engine rankings, and organic traffic through data‑driven optimization strategies.Provides targeted SEO (Search Engine Optimization) and AEO (Answer Engine Optimization) strategies to increase organic traffic, improve search ranking, and drive conversions.Offers keyword research, SEO audits, content creation, and analytics to identify growth opportunities.Emphasizes data‑driven approaches to build brand authority and improve user engagement over the long term.Highlights strong client retention and positive results for businesses using its premium SEO solutions.",
//   },

//    {
//     id: 4,
//     category: "NextJS",
//     subCategory: "NextJS-School",
//     projectName: "AL-MADINA",
//     projectImage: "/assets/almadina.png",
//     alternate: "Al Madinah Online is an Official Cambridge International School offering 7 full-time IGCSE subjects including English, Mathematics, and Sciences, alongside Islamic Studies and Arabic.",
//     href: "https://almadinahonline.co.uk/",
//     projectDesc: "Al Madinah Online is an Official Cambridge International School offering 7 full-time IGCSE subjects including English,",
//   },
//   {
//     id: 5,
//     category: "NextJS",
//     subCategory: "NextJS-Foundation",
//     projectName: "FGRF FOUNDATION",
//     projectImage: "/assets/fgrforg.png",
//     alternate: "Faizan Global Relief Foundation",
//     href: "https://fgrf.org/",
//     projectDesc: "Faizan Global Relief Foundation",
//   },
//   {
//     id: 6,
//     category: "Ai",
//     subCategory: "Ai-Foundation",
//     projectName: "Deep-Trace",
//     projectImage: "/assets/deeptrace.png",
//     alternate: "Detect AI-Generated Content With Confidence",
//     href: "https://deep-trace-snowy.vercel.app/",
//     projectDesc: "Advanced AI detection for text, images, and videos. Instantly verify AI-generated or human-written content with scientific accuracy.",
//   },
//   {
//     id: 7,
//     category: "Ai",
//     subCategory: "Ai-Foundation",
//     projectName: "CyberCity",
//     projectImage: "/assets/cyberCity.png",
//     alternate: "Advanced Security Audit Agent to Protect Your Website from Cyber Threats",
//     href: "https://vulnerability-dun.vercel.app/",
//     projectDesc: "Advanced Security Audit Agent to Protect Your Website from Cyber Threats",
//   },
// ];













// src/components/allData.ts

export interface Product {
  id: number;
  category: string;
  subCategory: string;
  projectName: string;
  projectImage: string;
  alternate: string;
  href: string;
  projectDesc: string;

  // 🔹 Optional detail-page fields
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

export const allData: Product[] = [
  {
    id: 1,
    category: "NextJS",
    subCategory: "NextJS-Coin",
    projectName: "AGUA COIN",
    projectImage: "/assets/aguacoin.png",
    alternate:
      "AGUA is a DAO token and platform offering stablecoins SAG and SAU.",
    href: "https://www.aguacoins.com/",
    projectDesc:
      "AGUA is a DAO token and platform offering stablecoins SAG and SAU.A decentralized digital currency ecosystem featuring asset-backed stablecoins tied to physical precious metals.Offers stablecoins backed by real gold (SAU) and silver (SAG), providing enhanced financial stability and inflation protection.Designed to combine blockchain transparency with the security of real-world assets, aiming for long-term value preservation.Part of a DAO-governed ecosystem where holders can participate in governance and future protocol decisions.Enables secure decentralized transactions, liquidity, and asset management through blockchain technology.",

    // ✅ Detail page extras (optional)
    Video: "/videos/agua.mp4",
    mainTitle: "AGUA – Asset-Backed Digital Currency",
  },

  {
    id: 2,
    category: "NextJS",
    subCategory: "NextJS-NFT",
    projectName: "SIGMANTARIAN",
    projectImage: "/assets/sigmantarian.png",
    alternate:
      "A REVOLUTIONARY CRYPTO PLATFORM OFFERING MAXIMUM REWARDS & SUSTAINABILITY",
    href: "https://www.sigmantarian.com/",
    projectDesc:
      "A Revolutionary Crypto Platform Offering Maximum Rewards & Sustainbility.A blockchain-based affiliate platform enabling secure and transparent crypto rewards.Users can join via membership packages to participate in the ecosystem.Offers affiliate marketing rewards and potential monthly token staking yields.Designed to promote financial independence through decentralized finance (DeFi) integration.Focused on transparency, security, and scalable reward mechanisms for users.",
  },

  {
    id: 3,
    category: "NextJS",
    subCategory: "NextJS-Coin",
    projectName: "HASHFOR",
    projectImage: "/assets/hashfor.png",
    alternate: "Boost your online presence with Expert SEO & AEO",
    href: "https://www.hashfor.com/",
    projectDesc:
      "Boost your online presence with Expert SEO & AEO.Hashfor is a professional digital marketing and SEO service provider that focuses on boosting brands’ online visibility, search engine rankings, and organic traffic through data-driven optimization strategies.",
  },

  {
    id: 4,
    category: "NextJS",
    subCategory: "NextJS-School",
    projectName: "AL-MADINA",
    projectImage: "/assets/almadina.png",
    alternate:
      "Al Madinah Online is an Official Cambridge International School offering 7 full-time IGCSE subjects including English, Mathematics, and Sciences, alongside Islamic Studies and Arabic.",
    href: "https://almadinahonline.co.uk/",
    projectDesc:
      "Al Madinah Online is an Official Cambridge International School offering 7 full-time IGCSE subjects including English.",
  },

  {
    id: 5,
    category: "NextJS",
    subCategory: "NextJS-Foundation",
    projectName: "FGRF FOUNDATION",
    projectImage: "/assets/fgrforg.png",
    alternate: "Faizan Global Relief Foundation",
    href: "https://fgrf.org/",
    projectDesc: "Faizan Global Relief Foundation",
  },

  {
    id: 6,
    category: "Ai",
    subCategory: "Ai-Foundation",
    projectName: "Deep-Trace",
    projectImage: "/assets/deeptrace.png",
    alternate: "Detect AI-Generated Content With Confidence",
    href: "https://deep-trace-snowy.vercel.app/",
    projectDesc:
      "Advanced AI detection for text, images, and videos. Instantly verify AI-generated or human-written content with scientific accuracy.",
  },

  {
    id: 7,
    category: "Ai",
    subCategory: "Ai-Foundation",
    projectName: "CyberCity",
    projectImage: "/assets/cyberCity.png",
    alternate:
      "Advanced Security Audit Agent to Protect Your Website from Cyber Threats",
    href: "https://vulnerability-dun.vercel.app/",
    projectDesc:
      "Advanced Security Audit Agent to Protect Your Website from Cyber Threats",
  },
];
