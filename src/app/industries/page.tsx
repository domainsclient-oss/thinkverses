import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Droplets, Factory, PhoneCall, Sprout, Thermometer } from "lucide-react";
import { consultationHref, site } from "@/lib/content";

const path = "/industries";

export const metadata: Metadata = {
  title: "Industries: Manufacturing, Utilities and Controlled-Environment Agriculture",
  description:
    "Digital twins and Physical AI for businesses that run heavy physical operations: manufacturing, water and power utilities, and controlled-environment agriculture.",
  alternates: { canonical: path },
  openGraph: { url: path, title: "Industries | Thinkverses Solutions" },
};

const caseStudyHref = "/case-studies/controlled-environment-agriculture";

/* ---------- Illustrations (labels from the page copy; shapes are illustrative) ---------- */

function ManufacturingVisual() {
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ind-mfg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f5a03a" stopOpacity="0.35" />
            <stop offset="1" stopColor="#f5a03a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[50, 100, 150].map((y) => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
        ))}
        <rect x="0" y="110" width="400" height="40" fill="#34c996" fillOpacity="0.1" />
        <path d="M0 132 C40 126 70 138 110 130 S170 128 200 132 S250 126 280 118 S340 92 400 60" fill="none" stroke="#34c996" strokeWidth="2.5" pathLength={1} className="dt-draw" />
        <path d="M280 118 S340 92 400 60 L400 220 L280 220 Z" fill="url(#ind-mfg)" />
        <path d="M280 118 S340 92 400 60" fill="none" stroke="#f5a03a" strokeWidth="3" />
        <circle cx="352" cy="88" r="6" fill="#f5a03a" />
        <circle cx="352" cy="88" r="6" fill="#f5a03a" className="dt-ping" />
        {/* conveyor */}
        <rect x="20" y="186" width="360" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
        {[40, 110, 180, 250, 320].map((x) => (
          <rect key={x} x={x} y="166" width="34" height="20" rx="4" fill="rgba(201,212,229,0.35)" />
        ))}
      </svg>
      <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-[#f5a03a] px-3 py-1.5 text-xs font-bold text-[#0b1a2e] shadow-lg">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0b1a2e]" /> Line 2: energy drift
      </span>
    </div>
  );
}

function UtilitiesVisual() {
  const pumps = [
    { id: "P1", x: 60 },
    { id: "P2", x: 140 },
    { id: "P3", x: 220, alert: true },
    { id: "P4", x: 300 },
  ];
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M60 150 H360" stroke="rgba(255,255,255,0.15)" strokeWidth="10" strokeLinecap="round" />
        <path d="M60 150 H360" stroke="#34c996" strokeWidth="2" strokeDasharray="6 8" className="dt-flow" />
        <path d="M352 140 L370 150 L352 160" fill="none" stroke="#34c996" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pumps.map((p) => (
          <g key={p.id}>
            <line x1={p.x} x2={p.x} y1="110" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            {p.alert && <circle cx={p.x} cy="86" r="30" fill="#f5a03a" fillOpacity="0.15" />}
            <circle cx={p.x} cy="86" r="24" fill={p.alert ? "#f5a03a" : "#0e2038"} stroke={p.alert ? "#f5a03a" : "#34c996"} strokeWidth="2" />
            {p.alert && <circle cx={p.x} cy="86" r="24" fill="none" stroke="#f5a03a" strokeWidth="2" className="dt-ping" />}
          </g>
        ))}
      </svg>
      {pumps.map((p) => (
        <span
          key={p.id}
          className={`absolute -translate-x-1/2 -translate-y-1/2 text-xs font-bold ${p.alert ? "text-[#0b1a2e]" : "text-white"}`}
          style={{ left: `${(p.x / 400) * 100}%`, top: `${(86 / 220) * 100}%` }}
        >
          {p.id}
        </span>
      ))}
      <span className="absolute bottom-3 right-3 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#c9d4e5] ring-1 ring-white/15">
        To network
      </span>
    </div>
  );
}

function AgricultureVisual() {
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M40 200 V100 L200 30 L360 100 V200 Z" fill="rgba(52,201,150,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M200 30 V200 M120 65 V200 M280 65 V200" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        {[0, 1, 2].map((r) =>
          [70, 110, 150, 230, 270, 310].map((x) => (
            <g key={`${r}-${x}`}>
              <path
                d={`M${x} ${190 - r * 34} q-8 -12 0 -20 q8 8 0 20`}
                fill="#34c996"
                fillOpacity={0.5 + r * 0.15}
              />
            </g>
          )),
        )}
        <circle cx="300" cy="96" r="22" fill="#34c996" fillOpacity="0.15" className="dt-ping" />
      </svg>
      <span className="absolute right-[18%] top-[30%] inline-flex items-center gap-1.5 rounded-full bg-[#0b1a2e]/85 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#34c996]/50 backdrop-blur">
        <Thermometer size={13} className="text-[#34c996]" aria-hidden="true" /> Climate sensor
      </span>
    </div>
  );
}

/* ---------- Data ---------- */

type Industry = {
  id: string;
  name: string;
  text: string;
  tags: string[];
  cta: string;
  href: string;
  icon: typeof Factory;
  visual: ReactNode;
  badge?: string;
};

const industries: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    text: "For factories where a stopped line, a failed batch or a rising energy bill hits the month's numbers.",
    tags: ["Predictive maintenance", "Quality and traceability", "OEE", "Visual inspection"],
    cta: "See manufacturing use cases",
    href: "/use-cases",
    icon: Factory,
    visual: <ManufacturingVisual />,
  },
  {
    id: "utilities",
    name: "Water and power utilities",
    text: "For pumping stations, networks and plants where one unplanned failure can interrupt supply to thousands of people.",
    tags: ["Predictive maintenance", "Energy monitoring", "Asset inspection rounds", "Security patrol"],
    cta: "See utilities use cases",
    href: "/use-cases",
    icon: Droplets,
    visual: <UtilitiesVisual />,
  },
  {
    id: "agriculture",
    name: "Controlled-environment agriculture",
    text: "For indoor farms and greenhouses where climate, water and energy have to be controlled tightly to protect the yield.",
    tags: ["Plain-language reports", "Energy and resources", "One source of truth"],
    cta: "Read the case study",
    href: caseStudyHref,
    icon: Sprout,
    visual: <AgricultureVisual />,
    badge: "Live client",
  },
];

export default function IndustriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industries",
    url: `${site.url}${path}`,
    about: industries.map((i) => i.name),
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  return (
    <div className="bg-white text-[#14304f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3f8f6_0%,#ffffff_75%)]" />
          <div className="absolute inset-0 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="dt-blob absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#34c996]/20 blur-3xl" />
          <div className="dt-blob dt-blob-b absolute -left-40 top-40 h-[26rem] w-[26rem] rounded-full bg-[#14304f]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-[#4b5a74]">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#0b6e50]">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[#4b5a74]/50">/</li>
              <li aria-current="page" className="font-semibold text-[#14304f]">Industries</li>
            </ol>
          </nav>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="dt-rise">
              <h1 className="display text-[clamp(2.3rem,1.3rem+3.2vw,4.1rem)] text-[#14304f]">
                Digital twins and Physical AI for businesses that run{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] via-[#14946a] to-[#34c996] bg-clip-text text-transparent">
                  heavy physical operations
                </span>
              </h1>
              <p className="lede mt-6 text-[#4b5a74]">
                We focus on three industries where downtime, quality and safety cost the most. Pick yours to see the
                problems we solve there and where most of our clients start.
              </p>
            </div>

            {/* Jump links */}
            <ul className="dt-rise dt-rise-late grid gap-3">
              {industries.map(({ id, name, icon: Icon }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-[#14304f]/10 bg-white/80 p-3 pr-5 shadow-[0_18px_40px_-30px_rgba(20,48,79,0.5)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-[#0b6e50]/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="flex-1 font-semibold text-[#14304f]">{name}</span>
                    <span aria-hidden="true" className="display text-lg text-[#14304f]/15">0{i + 1}</span>
                    <ArrowRight size={16} aria-hidden="true" className="text-[#0b6e50] transition-transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section aria-label="Industries we serve" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] space-y-6 px-4 sm:px-6 lg:space-y-8 lg:px-10">
          {industries.map(({ id, name, text, tags, cta, href, icon: Icon, visual, badge }, i) => (
            <article
              key={id}
              id={id}
              aria-labelledby={`ind-${id}`}
              className="group scroll-mt-28 overflow-hidden rounded-[32px] border border-[#14304f]/10 bg-white shadow-[0_30px_60px_-45px_rgba(20,48,79,0.5)] transition duration-300 hover:border-[#0b6e50]/25 hover:shadow-[0_30px_60px_-30px_rgba(11,110,80,0.4)]"
            >
              <div className={`grid lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative m-2 min-h-64 overflow-hidden rounded-[26px] bg-[#0b1a2e] p-5 sm:min-h-72 lg:min-h-80">
                  <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
                  <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#34c996]/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
                  <div className="relative h-full min-h-56 sm:min-h-64 lg:min-h-72">{visual}</div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e6f4ee] text-[#0b6e50] ring-1 ring-[#0b6e50]/15">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="display text-3xl text-[#14304f]/10">0{i + 1}</span>
                    {badge && (
                      <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#0b6e50] px-3 py-1 text-xs font-semibold text-white">
                        <span className="relative flex h-2 w-2">
                          <span className="dt-ping absolute inset-0 rounded-full bg-[#34c996]" />
                          <span className="relative h-2 w-2 rounded-full bg-[#34c996]" />
                        </span>
                        {badge}
                      </span>
                    )}
                  </div>
                  <h2 id={`ind-${id}`} className="display mt-6 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] text-[#14304f]">
                    {name}
                  </h2>
                  <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed text-[#4b5a74]">{text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[#14304f]/10 bg-[#f7f9fc] px-3.5 py-1.5 text-[0.85rem] font-medium text-[#14304f]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className="group/link mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#0b6e50] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(11,110,80,0.7)] transition-colors hover:bg-[#095c43]"
                  >
                    {cta}
                    <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NOT LISTED */}
      <section aria-labelledby="ind-other" className="relative isolate overflow-hidden bg-[#0b1a2e] py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#34c996]/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -right-32 -z-10 h-[24rem] w-[24rem] rounded-full bg-[#f5a03a]/10 blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 id="ind-other" className="display text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)]">
            Your industry is{" "}
            <span className="bg-gradient-to-r from-[#34c996] to-[#9be8c9] bg-clip-text text-transparent">not listed</span> here?
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-[1.05rem] text-[#c9d4e5]">
            If your business runs physical assets and collects data from them, there is a good chance the same approach
            applies. Tell us what you run, and we will tell you honestly.
          </p>
          <Link
            href={consultationHref}
            className="btn group mt-9 bg-[#34c996] text-[#0b1a2e] shadow-[0_14px_34px_-12px_rgba(52,201,150,0.7)] hover:bg-[#4fd8a8]"
          >
            <PhoneCall size={18} aria-hidden="true" /> Book a discovery call
          </Link>
        </div>
      </section>
    </div>
  );
}
