import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const aiServices: ServiceDetail[] = [
  {
    slug: "custom",
    title: "AI products built around your idea, not a template.",
    description:
      "We take an idea from scoping to a working AI product, including the model choices, the data and the interface.",
    bestFor: "Founders adding AI to a new or existing product.",
    included: [
      "Scoping and AI feasibility check",
      "LLM integration with the leading model providers",
      "Answers grounded in your own documents and data",
      "Admin screen and usage tracking",
    ],
    project: {
      name: "HoloVox",
      description: "An AI coaching platform with real-time voice conversations.",
      image: "/assets/holovox-website-preview.png",
    },
  },
  {
    slug: "agents",
    title: "AI agents that do the repetitive work for you.",
    description:
      "Agents that talk to customers, qualify leads and run routine tasks, with a clean handoff to your team.",
    bestFor: "Teams who lose time on sales follow-up and support.",
    included: [
      "Lead capture and qualification",
      "Support answers from your knowledge base",
      "Connections to CRM, email and WhatsApp",
      "Human handoff when the agent is unsure",
    ],
  },
  {
    slug: "chat",
    title: "Chat and voice assistants your users will actually talk to.",
    description:
      "Website and messaging chatbots, plus real-time voice conversations for products where talking beats typing.",
    bestFor: "Products that need guided conversations or coaching.",
    included: [
      "Website and WhatsApp chatbots",
      "Real-time voice conversations",
      "Multiple languages",
      "Transcripts and summaries",
    ],
    project: {
      name: "HoloVox",
      description: "An AI coaching platform with real-time voice conversations.",
      image: "/assets/holovox-website-preview.png",
    },
  },
  {
    slug: "ml-nlp",
    title: "Models that make sense of your data.",
    description:
      "Practical machine learning and language processing, built into your product and its data pipeline.",
    bestFor: "Products with a lot of text or user data.",
    included: [
      "Text classification and summaries",
      "Semantic search",
      "Scoring and recommendation models",
      "Data pipelines and monitoring",
    ],
  },
];

const legacySlugs: Record<string, string> = {
  "custom-ai-solution": "custom",
  "ai-agents-and-automation": "agents",
  "chatbots-and-voice-agents": "chat",
  "machine-learning-and-nlp": "ml-nlp",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return aiServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = legacySlugs[slug] ?? slug;
  const service = aiServices.find((item) => item.slug === canonicalSlug);

  if (!service) {
    return { title: "Service not found | BawdicSoft" };
  }

  return {
    title: `${service.title} | AI Services | BawdicSoft`,
    description: service.description,
    alternates: {
      canonical: `https://www.bawdicsoft.com/services/ai/${service.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = aiServices.find((item) => item.slug === slug);

  if (!service) {
    const shortSlug = legacySlugs[slug];
    if (shortSlug) {
      permanentRedirect(`/services/ai/${shortSlug}`);
    }
    notFound();
  }

  return (
    <ServiceDetailPage
      category="AI"
      basePath="/services/ai"
      heroBackground="/assets/ai-background.png"
      service={service}
      services={aiServices}
    />
  );
}
