import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const saasServices: ServiceDetail[] = [
  {
    slug: "mvp",
    title: "The smallest product that proves your idea, launched fast.",
    description:
      "We build the core of your SaaS: sign-in, the main feature, billing and an admin view. Then you find your first users.",
    bestFor: "Founders validating a SaaS idea.",
    included: [
      "Scope cut to the essentials",
      "Sign-in, roles and billing",
      "Admin panel",
      "Launch and first-user support",
    ],
    project: {
      name: "Hashfor",
      description:
        "An AI visibility audit platform for local and service businesses.",
      image: "/assets/hashfor-website-preview.png",
    },
  },
  {
    slug: "web",
    title: "Web apps built to grow with you.",
    description:
      "Full-stack web applications with a clean API, a responsive interface and room to scale.",
    bestFor: "Businesses that need a custom web product.",
    included: [
      "Front end and back end",
      "APIs and integrations",
      "Responsive on every screen",
      "Hosting and deployment",
    ],
  },
  {
    slug: "mobile",
    title: "Mobile apps for iOS and Android.",
    description:
      "Apps for both stores from one codebase where it fits, connected to your back end.",
    bestFor: "Founders who need a mobile product.",
    included: [
      "iOS and Android from one codebase where it fits",
      "Push notifications",
      "Back end and API",
      "App store submission",
    ],
  },
  {
    slug: "dashboard",
    title: "Dashboards and admin panels your team will use daily.",
    description:
      "Clear views of your data, with the controls your team needs to run the product.",
    bestFor: "Teams who run on spreadsheets today.",
    included: [
      "Charts and reports",
      "Roles and permissions",
      "Search, filters and exports",
      "Connections to your data sources",
    ],
    project: {
      name: "Hashfor",
      description:
        "A clear workspace for reviewing AI visibility audits and business data.",
      image: "/assets/hashfor-website-preview.png",
    },
  },
];

const legacySlugs: Record<string, string> = {
  "saas-mvp-development": "mvp",
  "custom-web-apps": "web",
  "mobile-apps": "mobile",
  "dashboards-admin-panels": "dashboard",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return saasServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = legacySlugs[slug] ?? slug;
  const service = saasServices.find((item) => item.slug === canonicalSlug);

  if (!service) {
    return { title: "Service not found | BawdicSoft" };
  }

  return {
    title: `${service.title} | BawdicSoft`,
    description: service.description,
    alternates: {
      canonical: `https://www.bawdicsoft.com/services/saas/${service.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = saasServices.find((item) => item.slug === slug);

  if (!service) {
    const shortSlug = legacySlugs[slug];
    if (shortSlug) {
      permanentRedirect(`/services/saas/${shortSlug}`);
    }
    notFound();
  }

  return (
    <ServiceDetailPage
      category="SaaS and Mobile"
      basePath="/services/saas"
      heroBackground="/assets/saas-background.png"
      service={service}
      services={saasServices}
    />
  );
}
