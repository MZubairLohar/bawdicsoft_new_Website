// src/data/blogs.ts

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image?: string;
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "ai-automation-2026",
    title: "AI Automation in 2026: What Businesses Need",
    excerpt: "AI ka future aur business par asar.",
    content: `Yahan apna poora mazmoon likhein...`,
    date: "2026-08-18",
    author: "BawdicSoft Team",
    category: "Artificial Intelligence",
    readTime: "5 min read",
  },
  {
    id: 2,
    slug: "blockchain-defi-infrastructure",
    title: "Building DeFi Infrastructure That Scales",
    excerpt: "Blockchain aur DeFi ka safar.",
    content: `Yahan dosra mazmoon likhein...`,
    date: "2026-08-15",
    author: "BawdicSoft Team",
    category: "Blockchain",
    readTime: "7 min read",
  },
  // 🔥 3rd blog (new)
  {
    id: 3,
    slug: "web3-digital-ownership-2026",
    title: "How Web3 is Transforming Digital Ownership",
    excerpt: "Exploring the shift from centralized platforms to decentralized ownership models powered by blockchain technology.",
    content: `The internet is undergoing a fundamental transformation. Web3, powered by blockchain technology, is reshaping how we think about digital ownership, identity, and value exchange.

Unlike the traditional web where platforms like Google, Facebook, and Amazon control user data and content, Web3 puts the power back into the hands of users. Through decentralized applications (dApps) and smart contracts, individuals can truly own their digital assets—whether it's art, music, in-game items, or even their personal identity.

Key innovations driving this shift include:
• Non-Fungible Tokens (NFTs) enabling verifiable digital scarcity
• Decentralized Autonomous Organizations (DAOs) for community governance
• Self-Sovereign Identity (SSI) giving users control over their personal data

For businesses, this represents a paradigm shift in customer engagement. Brands that embrace Web3 principles can build deeper trust, create new revenue streams through tokenization, and foster loyal communities that actively participate in their ecosystem.

At BawdicSoft, we're helping enterprises navigate this transition by building secure, scalable Web3 infrastructure—from NFT marketplaces to DeFi platforms—that prioritizes user ownership and transparency.

The future of the internet is decentralized. Are you ready to build it?`,
    date: "2026-08-19",
    author: "BawdicSoft Team",
    category: "Blockchain",
    readTime: "6 min read",
  }
];

export const blogCategories: string[] = [
  "All",
  "Artificial Intelligence",
  "Blockchain",
  "Cybersecurity",
  "DeFi",
  "Web Development"
];

export const blogTopics: string[] = [
  "AI Automation",
  "DeFi Infrastructure",
  "Cybersecurity",
  "Web3",
  "NFT Development"
];