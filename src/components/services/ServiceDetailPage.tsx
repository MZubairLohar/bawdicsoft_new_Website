"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ContactModal from "@/components/home/ContactModal";

export type ServiceDetail = {
  slug: string;
  title: string;
  description: string;
  bestFor: string;
  included: string[];
  project?: {
    name: string;
    description: string;
    image?: string;
  };
};

const processSteps = [
  ["Free call", "Tell us the idea. 15 minutes."],
  ["Scope and quote", "Fixed scope, fixed price."],
  ["Build", "Weekly demos you can click."],
  ["Launch", "Live, with support after."],
];

type ServiceDetailPageProps = {
  category: string;
  basePath: string;
  heroBackground?: string;
  service: ServiceDetail;
  services: ServiceDetail[];
};

export default function ServiceDetailPage({
  category,
  basePath,
  heroBackground,
  service,
  services,
}: ServiceDetailPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const relatedServices = services.filter(
    (relatedService) => relatedService.slug !== service.slug
  );

  const openBookingModal = () => setIsModalOpen(true);

  return (
    <>
      <main className="bg-white text-slate-900">
        <section className="relative isolate overflow-hidden bg-slate-900 px-6 py-16 text-center text-white md:py-20">
          {heroBackground && (
            <div aria-hidden="true" className="absolute inset-0">
              <Image
                src={heroBackground}
                alt=""
                fill
                sizes="100vw"
                fetchPriority="high"
                className="object-cover object-center opacity-60"
              />
              <div className="absolute inset-0 bg-slate-950/45" />
            </div>
          )}

          <div className="relative z-10">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-xs text-slate-300"
            >
              <Link href="/services" className="text-blue-300 hover:text-white">
                Services
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span>{category}</span>
            </nav>

            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                {category}
              </p>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                {service.title}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                {service.description}
              </p>
              <button
                type="button"
                onClick={openBookingModal}
                className="mt-7 inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                Book a free call
              </button>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.35fr_1fr] md:gap-16">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                What is included
              </h2>
              <ul className="mt-5">
                {service.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-slate-200 py-3 text-sm leading-6 text-slate-700"
                  >
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 shrink-0 rounded-sm bg-blue-600"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-2xl bg-slate-50 p-6 md:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                Best for
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {service.bestFor}
              </p>

              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                Also in {category}
              </p>
              <ul className="mt-2 space-y-1.5">
                {relatedServices.map((relatedService) => (
                  <li key={relatedService.slug}>
                    <Link
                      href={`${basePath}/${relatedService.slug}`}
                      className="text-sm text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      {relatedService.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {service.project && (
          <section className="bg-slate-50 px-5 py-14 md:px-8 md:py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold md:text-3xl">Built by us</h2>
              <article className="mt-6 max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="relative aspect-[16/7] overflow-hidden bg-slate-200">
                  {service.project.image ? (
                    <Image
                      src={service.project.image}
                      alt={`${service.project.name} website homepage`}
                      fill
                      sizes="(max-width: 448px) 100vw, 448px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-xs font-medium text-slate-400">
                        Project screenshot
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{service.project.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {service.project.description}
                  </p>
                </div>
              </article>
            </div>
          </section>
        )}

        <section className="px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold md:text-3xl">How it works</h2>
            <ol className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(([title, description], index) => (
                <li key={title}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* <section className="bg-blue-600 px-5 py-12 text-center text-white md:px-8 md:py-14">
          <h2 className="mx-auto max-w-3xl text-2xl font-bold md:text-3xl">
            Have an idea for {service.title}? Let&apos;s build it.
          </h2>
          <button
            type="button"
            onClick={openBookingModal}
            className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            Book a free call
          </button>
        </section> */}
      </main>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
