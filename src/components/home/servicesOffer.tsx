"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContactModal from "./ContactModal";

const serviceGroups = [
  {
    name: "AI",
    items: [
      ["Custom AI Solutions", "AI features and products built around your idea.", "/services/ai/custom"],
      ["AI Agents and Automation", "Agents that handle sales, support and daily workflows.", "/services/ai/agents"],
      ["Chatbots and Voice Agents", "Text and real-time voice assistants for your users.", "/services/ai/chat"],
      ["Machine Learning and NLP", "Models for search, analysis and recommendations.", "/services/ai/ml-nlp"],
    ],
  },
  {
    name: "Blockchain",
    items: [
      ["Token and DAO Development", "Launch a token and the governance around it.", "/services/blockchain/token"],
      ["DeFi and Staking Platforms", "Staking, yield and swap products.", "/services/blockchain/defi"],
      ["Wallets and Payments", "Custody, transfers and settlement flows.", "/services/blockchain/wallet"],
      ["Smart Contracts", "Written, tested and ready to deploy.", "/services/blockchain/contracts"],
    ],
  },
  {
    name: "SaaS and Mobile",
    items: [
      ["SaaS MVP Development", "The smallest product that proves your idea.", "/services/saas/mvp"],
      ["Custom Web Apps", "Full-stack apps built to scale.", "/services/saas/web"],
      ["Mobile Apps (iOS and Android)", "One build for both stores.", "/services/saas/mobile"],
      ["Dashboards and Admin Panels", "Data and control for your team.", "/services/saas/dashboard"],
    ],
  },
];

const steps = [
  ["Free call", "Tell us the idea. 30 minutes."],
  ["Scope and quote", "Fixed scope, clear timeline."],
  ["Build", "Weekly demos you can click."],
  ["Launch", "Live, with support after."],
];

const SevicesOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrimaryCTA = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-slate-900 px-6 py-20 text-center md:py-24">
        <Image
          src="/assets/services-background.png"
          alt=""
          fill
          sizes="100vw"
          fetchPriority="high"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="relative z-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
            Services
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
            What we build for <span className="text-blue-400">founders.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            AI products, blockchain platforms and SaaS and mobile MVPs. Pick an area to see what we deliver.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 px-4 sm:flex-row md:gap-6 md:px-0">
            <button
              onClick={handlePrimaryCTA}
              className="w-full rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 sm:w-auto"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      </section>

      {serviceGroups.map((group, groupIndex) => (
        <section
          key={group.name}
          className={groupIndex % 2 === 1 ? "bg-slate-50 py-16" : "py-16"}
        >
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{group.name}</h2>
            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {group.items.map(([title, description, href]) => (
                <Link
                  key={title}
                  href={href}
                  className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.25)]"
                >
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 group-hover:scale-x-100" />
                  <h3 className="pr-6 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                  <span className="mt-auto inline-flex items-center pt-6 text-sm font-semibold text-blue-600">
                    Learn more
                    <span
                      aria-hidden="true"
                      className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-blue-200 text-base leading-none transition-all group-hover:translate-x-1 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">How it works</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, description], index) => (
              <div key={title}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="bg-blue-600 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">Not sure where to start? Book a free call.</h2>
        <Link
          href="/contact-us"
          className="mt-7 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-slate-100"
        >
          Book a free call
        </Link>
      </section> */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default SevicesOffer;
