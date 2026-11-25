import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const blockchainServices: ServiceDetail[] = [
  {
    slug: "token",
    title: "Launch a token and the community that governs it.",
    description:
      "Token design, smart contracts and DAO voting, built and tested as one system.",
    bestFor: "Founders launching a token or community-owned project.",
    included: [
      "Token design and supply rules",
      "Smart contracts for the token and treasury",
      "DAO voting and proposals",
      "Launch support",
    ],
    project: {
      name: "AGUA",
      description: "Gold and silver backed token with a DAO.",
      image: "/assets/agua-project-preview.png",
    },
  },
  {
    slug: "defi",
    title: "DeFi products with the front end people actually use.",
    description:
      "Staking, yield and swap platforms, with the dashboards your users need to trust them.",
    bestFor: "Teams building financial products on-chain.",
    included: [
      "Staking and reward contracts",
      "Swap and liquidity interfaces",
      "User and admin dashboards",
      "Testing before launch",
    ],
  },
  {
    slug: "wallet",
    title: "Wallets and payment flows that move money on-chain.",
    description:
      "Wallet features, transfers and settlement flows, connected to the rest of your product.",
    bestFor: "Fintech and remittance founders.",
    included: [
      "Wallet creation and connection",
      "Transfers and payment flows",
      "Settlement and reconciliation views",
      "Payments API for your app",
    ],
  },
  {
    slug: "contracts",
    title: "Smart contracts written, tested and ready to deploy.",
    description:
      "Contracts built with automated tests and a deployment plan, prepared for an independent audit.",
    bestFor: "Any project that puts logic or funds on-chain.",
    included: [
      "Contract development",
      "Automated testing",
      "Deployment scripts",
      "Audit preparation",
    ],
  },
];

const legacySlugs: Record<string, string> = {
  "token-and-dao-development": "token",
  "defi-and-staking-platforms": "defi",
  "wallets-and-payments": "wallet",
  "smart-contracts": "contracts",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blockchainServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = legacySlugs[slug] ?? slug;
  const service = blockchainServices.find((item) => item.slug === canonicalSlug);

  if (!service) {
    return { title: "Service not found | BawdicSoft" };
  }

  return {
    title: `${service.title} | Blockchain Services | BawdicSoft`,
    description: service.description,
    alternates: {
      canonical: `https://www.bawdicsoft.com/services/blockchain/${service.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = blockchainServices.find((item) => item.slug === slug);

  if (!service) {
    const shortSlug = legacySlugs[slug];
    if (shortSlug) {
      permanentRedirect(`/services/blockchain/${shortSlug}`);
    }
    notFound();
  }

  return (
    <ServiceDetailPage
      category="Blockchain"
      basePath="/services/blockchain"
      heroBackground="/assets/blockchain-background.png"
      service={service}
      services={blockchainServices}
    />
  );
}
