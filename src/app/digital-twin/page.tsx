import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Play,
  Gauge,
  ScanSearch,
  Zap,
  Coins,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Wrench,
  Cable,
  MapPin,
  Server,
  Timer,
  BadgeCheck,
  Building2,
  CircuitBoard,
  Cloud,
  Cpu,
  Factory,
  FileSpreadsheet,
  ListChecks,
  Map as MapIcon,
  MonitorDot,
  Radio,
  Target,
  MessageCircleQuestion,
  Plus,
} from "lucide-react";
import { site } from "@/lib/content";
import { MaturityCheck } from "@/components/digital-twin/MaturityCheck";
import { TwinHeroPanel } from "@/components/digital-twin/TwinHeroPanel";
import { AssessmentForm } from "@/components/digital-twin/AssessmentForm";
import { OptimaChat } from "@/components/digital-twin/OptimaChat";

const path = "/digital-twin";

export const metadata: Metadata = {
  title: "Industrial Digital Twin Built on Your Plant Data",
  description:
    "An industrial digital twin built on the data your plant already produces. Every engagement starts with a maturity assessment, then one source of truth, foresight and answers your team can act on.",
  alternates: { canonical: path },
  openGraph: { url: path, title: "Industrial Digital Twin | Thinkverses Solutions" },
};

const bookHref = "#book";
const checkHref = "#two-minute-check";

const systemsLeft = [
  { name: "DCS", icon: Cpu },
  { name: "SCADA", icon: MonitorDot },
  { name: "PLC", icon: CircuitBoard },
  { name: "MES", icon: Factory },
];
const systemsRight = [
  { name: "ERP", icon: Building2 },
  { name: "QMS", icon: BadgeCheck },
  { name: "IoT", icon: Radio },
  { name: "Excel", icon: FileSpreadsheet },
];

const deployments = [
  { title: "On your own servers", text: "For plants where data cannot leave the site.", icon: Server },
  { title: "In the cloud", text: "For groups with several plants and countries.", icon: Cloud },
];

const deliverables = [
  { text: "A map of your data sources", icon: MapIcon },
  { text: "The first use case worth building", icon: Target },
  { text: "A staged roadmap with owners", icon: ListChecks },
];

// No recorded walkthrough is published yet; swap in the video URL when it exists.
const walkthroughHref = "#";

const path4 = [
  { step: "01", title: "Predictive maintenance", text: "Warn the team before a pump, motor or line fails.", icon: Activity, featured: true },
  { step: "02", title: "Quality and traceability", text: "Trace a failed batch to its cause in minutes.", icon: ScanSearch, featured: false },
  { step: "03", title: "Energy monitoring", text: "See energy used per line, per shift and per unit.", icon: Zap, featured: false },
  { step: "04", title: "OEE and productivity", text: "Find where production time really goes.", icon: Gauge, featured: false },
];

const outcomes = [
  { title: "Higher output", text: "Fewer stoppages mean more production hours.", icon: TrendingUp },
  { title: "Less downtime", text: "Repairs are planned before a breakdown.", icon: Wrench },
  { title: "Lower cost", text: "Energy and spares go where they matter.", icon: Coins },
  { title: "Consistent quality", text: "Drift is caught before it becomes a reject.", icon: ShieldCheck },
  { title: "Lower emissions", text: "You see and act on energy waste.", icon: Leaf },
];

const facts = [
  { text: "Based in Dubai Mainland, UAE", icon: MapPin },
  { text: "Live for over a year across six plants in two countries", icon: Timer },
  { text: "Connects SCADA, PLC, DCS, MES, ERP, QMS and IoT data", icon: Cable },
  { text: "Runs on your servers or in the cloud", icon: Server },
];

const industriesHref = "/industries";

const faqs = [
  {
    q: "How is a digital twin different from a dashboard?",
    a: "A dashboard shows you what happened. A digital twin understands how each asset normally behaves, so it can tell you what is about to happen and what to do about it.",
  },
  {
    q: "Do we need to replace our SCADA or ERP?",
    a: "No. The twin reads from the systems you already have. That is why the maturity assessment comes first, so we know exactly what to connect.",
  },
  {
    q: "How long before we see something useful?",
    a: "We agree one use case and one line in the assessment, and the pilot is scoped so your team sees a working result early. [Typical timeline to confirm with Thinkverses.]",
  },
  {
    q: "Which industries do you work with?",
    a: "Manufacturing, water and power utilities, and controlled-environment agriculture.",
    link: { before: "See our ", label: "industries", after: " page.", href: industriesHref },
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function DigitalTwinPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Industrial digital twin",
    serviceType: "Industrial digital twin",
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
    areaServed: "AE",
    url: `${site.url}${path}`,
    description:
      "A live digital copy of a plant, line or asset, built from its real operating data, that helps teams predict problems and decide what to do before they cost money.",
  };

  return (
    <div className="bg-white text-[#14304f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3f8f6_0%,#ffffff_70%)]" />
          <div className="absolute inset-0 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="dt-blob absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#34c996]/20 blur-3xl" />
          <div className="dt-blob dt-blob-b absolute -left-40 top-56 h-[26rem] w-[26rem] rounded-full bg-[#14304f]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-[#4b5a74]">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#0b6e50]">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[#4b5a74]/50">/</li>
              <li aria-current="page" className="font-semibold text-[#14304f]">Digital Twin</li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="dt-rise">
              <span className="inline-flex items-center gap-3 rounded-2xl border border-[#0b6e50]/25 bg-[#e6f4ee] py-2 pl-2.5 pr-5 text-[0.95rem] font-medium leading-snug text-[#0b6e50] shadow-[0_10px_30px_-18px_rgba(11,110,80,0.6)] sm:rounded-full sm:text-base">
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[#0b6e50]/15">
                  <span className="dt-ping absolute h-2.5 w-2.5 rounded-full bg-[#0b6e50]" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#0b6e50]" />
                </span>
                <span>
                  <strong className="font-bold text-[#14304f]">Live in KSA &amp; UAE</strong> across 6 factories running for 18 months
                </span>
              </span>

              <h1 className="display mt-6 text-[clamp(2.3rem,1.3rem+3.2vw,4.1rem)] text-[#14304f]">
                An industrial{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] via-[#14946a] to-[#34c996] bg-clip-text text-transparent">
                  digital twin
                </span>
                , built on the data your plant already produces
              </h1>

              <p className="lede mt-6 text-[#4b5a74]">
                Every engagement starts with a maturity assessment. From there, we build one source of truth, then
                foresight, and then answers your team can act on. You do not have to replace your systems, and you do
                not have to do it all at once.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={bookHref}
                  className="btn group bg-[#0b6e50] text-white shadow-[0_14px_30px_-12px_rgba(11,110,80,0.7)] hover:bg-[#095c43]"
                >
                  Book a maturity assessment call <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  href={checkHref}
                  className="btn border border-[#14304f]/20 bg-white text-[#14304f] hover:border-[#0b6e50] hover:text-[#0b6e50]"
                >
                  <Timer size={18} aria-hidden="true" /> Take the two-minute check
                </Link>
              </div>
            </div>

            <div className="dt-rise dt-rise-late">
              <TwinHeroPanel />
            </div>
          </div>
        </div>
      </section>

      {/* DEFINITION + FACTS */}
      <section aria-labelledby="dt-what" className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-[90rem] gap-5 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-10">
          <div className="relative overflow-hidden rounded-[28px] bg-[#0b1a2e] p-8 text-white sm:p-12">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#34c996]/25 blur-3xl" />
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-30 [mask-image:linear-gradient(to_left,black,transparent_60%)]" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#34c996]">
                <span className="h-px w-8 bg-[#34c996]" /> Definition
              </p>
              <h2 id="dt-what" className="display mt-4 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]">
                What is an industrial digital twin?
              </h2>
              <p className="mt-5 max-w-[62ch] text-[1.08rem] leading-relaxed text-[#c9d4e5]">
                An industrial digital twin is a live digital copy of a plant, line or asset, built from its real
                operating data. It shows how the asset is behaving right now, compares that with its normal pattern,
                and helps your team predict problems and decide what to do before they cost money.
              </p>
            </div>
          </div>

          <aside
            aria-labelledby="dt-facts"
            className="rounded-[28px] border border-[#14304f]/10 bg-gradient-to-b from-[#f3f8f6] to-white p-8 sm:p-10"
          >
            <h2 id="dt-facts" className="text-lg font-semibold text-[#14304f]">Key facts about Thinkverses</h2>
            <ul className="mt-6 space-y-4">
              {facts.map(({ text, icon: Icon }) => (
                <li key={text} className="flex items-start gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#0b6e50] shadow-sm ring-1 ring-[#14304f]/10">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className="pt-1.5 text-[0.97rem] leading-snug text-[#33445f]">{text}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* OUTCOMES */}
      <section aria-labelledby="dt-outcomes" className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="relative isolate overflow-hidden rounded-[32px] border border-[#14304f]/10 bg-gradient-to-br from-[#eef7f3] via-white to-[#f4f7fb] p-6 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
            <div aria-hidden="true" className="absolute -bottom-32 -right-32 -z-10 h-96 w-96 rounded-full bg-[#34c996]/15 blur-3xl" />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 id="dt-outcomes" className="display max-w-3xl text-[clamp(1.8rem,1.2rem+2vw,3rem)] text-[#14304f]">
                We start with the{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] to-[#34c996] bg-clip-text text-transparent">outcome</span>{" "}
                your leadership cares about, and work back to the data.
              </h2>
              {/* outcome -> data, drawn right to left */}
              <svg aria-hidden="true" viewBox="0 0 220 40" className="hidden h-10 w-56 shrink-0 lg:block">
                <circle cx="200" cy="20" r="8" fill="#0b6e50" />
                <circle cx="200" cy="20" r="14" fill="none" stroke="#0b6e50" strokeOpacity="0.25" />
                <path d="M186 20 H30" stroke="#0b6e50" strokeWidth="2" strokeDasharray="4 6" className="dt-flow" />
                <path d="M38 12 L28 20 L38 28" fill="none" stroke="#0b6e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="10" width="20" height="20" rx="5" fill="none" stroke="#14304f" strokeOpacity="0.4" strokeWidth="2" />
              </svg>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {outcomes.map(({ title, text, icon: Icon }, i) => (
                <li
                  key={title}
                  className={`group relative overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1 ${
                    i < 2 ? "lg:col-span-3" : "lg:col-span-2"
                  } ${
                    i === 0
                      ? "bg-[#0b1a2e] text-white shadow-[0_30px_60px_-30px_rgba(11,26,46,0.7)] sm:col-span-2 lg:col-span-3"
                      : "border border-[#14304f]/10 bg-white/80 backdrop-blur hover:border-[#0b6e50]/30 hover:shadow-[0_30px_50px_-30px_rgba(11,110,80,0.45)]"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    size={120}
                    strokeWidth={1}
                    className={`pointer-events-none absolute -bottom-6 -right-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                      i === 0 ? "text-[#34c996]/15" : "text-[#0b6e50]/[0.07]"
                    }`}
                  />
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${
                      i === 0
                        ? "bg-[#34c996] text-[#0b1a2e]"
                        : "bg-gradient-to-br from-[#e6f4ee] to-white text-[#0b6e50] ring-1 ring-[#0b6e50]/15"
                    }`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className={`mt-8 text-xl font-semibold ${i === 0 ? "text-white" : "text-[#14304f]"}`}>{title}</h3>
                  <p className={`mt-2 max-w-[34ch] text-[0.97rem] leading-relaxed ${i === 0 ? "text-[#c9d4e5]" : "text-[#4b5a74]"}`}>
                    {text}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0b6e50] to-[#34c996] transition-transform duration-500 group-hover:scale-x-100"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PATH */}
      <section aria-labelledby="dt-path" className="relative pb-20 sm:pb-24">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <h2 id="dt-path" className="sr-only">What the twin does on your plant floor</h2>
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-[#0b6e50]/30 to-transparent lg:block"
            />
            {path4.map(({ step, title, text, icon: Icon, featured }) => (
              <li
                key={step}
                className="group relative rounded-3xl border border-[#14304f]/10 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(20,48,79,0.4)] transition duration-300 hover:-translate-y-1 hover:border-[#0b6e50]/30 hover:shadow-[0_30px_50px_-30px_rgba(11,110,80,0.45)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="display text-3xl text-[#14304f]/10 transition-colors group-hover:text-[#0b6e50]/25">
                    {step}
                  </span>
                </div>
                {featured && (
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#0b6e50]">Most requested</p>
                )}
                <h3 className={`${featured ? "mt-1" : "mt-5"} text-lg font-semibold text-[#14304f]`}>{title}</h3>
                <p className="mt-1 text-[0.95rem] text-[#4b5a74]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TWO-MINUTE CHECK */}
      <section
        id="two-minute-check"
        aria-labelledby="dt-check"
        className="relative isolate overflow-hidden bg-gradient-to-b from-[#f3f8f6] to-white py-20 sm:py-28"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <h2 id="dt-check" className="display text-[clamp(1.8rem,1.2rem+2vw,3rem)] text-[#14304f]">
              Where is your plant on the{" "}
              <span className="bg-gradient-to-r from-[#0b6e50] to-[#34c996] bg-clip-text text-transparent">data journey</span>{" "}
              today?
            </h2>
            <p className="mt-4 text-[1.05rem] text-[#4b5a74]">
              Answer four questions honestly. There is no wrong answer, because every stage has a clear first step.
            </p>
          </div>
          <div className="mt-10">
            <MaturityCheck bookHref={bookHref} />
          </div>
        </div>
      </section>

      {/* OPTIMA */}
      <section aria-labelledby="dt-optima" className="relative isolate overflow-hidden bg-[#0b1a2e] py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#34c996]/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-32 -bottom-32 -z-10 h-[24rem] w-[24rem] rounded-full bg-[#f5a03a]/10 blur-3xl" />

        <div className="mx-auto grid max-w-[90rem] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10">
          <div>
            <h2 id="dt-optima" className="display text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)]">
              Ask a question in plain English, and see{" "}
              <span className="bg-gradient-to-r from-[#34c996] to-[#9be8c9] bg-clip-text text-transparent">
                exactly where the answer came from.
              </span>
            </h2>
            <p className="mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-[#c9d4e5]">
              Leaders do not need to learn a dashboard. They type the question, and Optima answers from the twin, with
              the query behind every number available for audit.
            </p>
            <Link
              href={walkthroughHref}
              className="btn group mt-9 bg-[#34c996] text-[#0b1a2e] shadow-[0_14px_34px_-12px_rgba(52,201,150,0.7)] hover:bg-[#4fd8a8]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0b1a2e] text-[#34c996]">
                <Play size={12} fill="currentColor" aria-hidden="true" />
              </span>
              Watch a recorded Optima walkthrough
            </Link>
          </div>

          {/* Console mock */}
          <figure className="relative" aria-label="Optima answering questions in plain English">
            <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-[#34c996]/25 via-transparent to-[#f5a03a]/15 blur-2xl" />
            <OptimaChat />
          </figure>
        </div>
      </section>

      {/* SYSTEMS + DEPLOYMENT */}
      <section aria-label="Integrations and deployment" className="relative isolate overflow-hidden py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="mx-auto grid max-w-[90rem] gap-6 px-4 sm:px-6 lg:grid-cols-[1.55fr_1fr] lg:px-10">
          {/* Systems hub */}
          <div className="rounded-[28px] border border-[#14304f]/10 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(20,48,79,0.45)] sm:p-10">
            <h2 className="display text-[clamp(1.5rem,1.1rem+1.2vw,2.2rem)] text-[#14304f]">
              Connects to the systems you{" "}
              <span className="bg-gradient-to-r from-[#0b6e50] to-[#34c996] bg-clip-text text-transparent">already run</span>
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
              {[systemsLeft, systemsRight].map((col, c) => (
                <ul key={c} className={`grid gap-3 ${c === 1 ? "sm:order-3" : ""}`}>
                  {col.map(({ name, icon: Icon }) => (
                    <li
                      key={name}
                      className={`group flex items-center gap-3 rounded-2xl border border-[#14304f]/10 bg-[#f7f9fc] px-3.5 py-3 transition duration-300 hover:border-[#0b6e50]/30 hover:bg-white hover:shadow-[0_14px_30px_-20px_rgba(11,110,80,0.6)] ${
                        c === 1 ? "sm:flex-row-reverse sm:text-right" : ""
                      }`}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#0b6e50] ring-1 ring-[#14304f]/10 transition-colors group-hover:bg-[#0b6e50] group-hover:text-white">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="flex-1 font-semibold text-[#14304f]">{name}</span>
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#34c996] shadow-[0_0_0_4px_rgba(52,201,150,0.15)]" />
                    </li>
                  ))}
                </ul>
              ))}

              {/* hub */}
              <div aria-hidden="true" className="relative hidden h-full min-h-56 w-44 place-items-center sm:order-2 sm:grid">
                <svg viewBox="0 0 176 240" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  {[30, 90, 150, 210].map((y) => (
                    <g key={y}>
                      <path d={`M0 ${y} C50 ${y} 50 120 88 120`} fill="none" stroke="#0b6e50" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 6" className="dt-flow" />
                      <path d={`M176 ${y} C126 ${y} 126 120 88 120`} fill="none" stroke="#0b6e50" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 6" className="dt-flow" />
                    </g>
                  ))}
                </svg>
                <span className="dt-ping absolute h-24 w-24 rounded-full bg-[#34c996]/25" />
                <span className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#0b1a2e] to-[#14304f] text-center shadow-[0_20px_40px_-15px_rgba(11,26,46,0.7)] ring-4 ring-white">
                  <span className="text-[0.62rem] font-semibold uppercase leading-tight tracking-wider text-[#34c996]">
                    Digital
                    <br />
                    twin
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Deployment */}
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#eef7f3] to-[#f4f7fb] p-6 sm:p-10">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#34c996]/20 blur-3xl" />
            <h2 className="display relative text-[clamp(1.5rem,1.1rem+1.2vw,2.2rem)] text-[#14304f]">Runs where you want it</h2>
            <ul className="relative mt-8 space-y-4">
              {deployments.map(({ title, text, icon: Icon }) => (
                <li
                  key={title}
                  className="group flex items-start gap-4 rounded-2xl border border-white bg-white/80 p-5 shadow-[0_18px_40px_-30px_rgba(20,48,79,0.5)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-[#0b6e50]/25"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#14304f]">{title}</h3>
                    <p className="mt-1 text-[0.95rem] text-[#4b5a74]">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section
        id="book"
        aria-labelledby="dt-book"
        className="relative isolate overflow-hidden bg-[#0b1a2e] py-20 text-white sm:py-28"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-25 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -right-40 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#34c996]/20 blur-3xl" />

        <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-10">
          <div>
            <h2 id="dt-book" className="display text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)]">
              Every engagement starts with a{" "}
              <span className="bg-gradient-to-r from-[#34c996] to-[#9be8c9] bg-clip-text text-transparent">maturity assessment.</span>
            </h2>
            <p className="mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-[#c9d4e5]">
              We map your data sources, check what is reliable, and agree on the one use case that would pay back first.
              You leave with a roadmap, whether or not you work with us.
            </p>
            <ol className="mt-9 space-y-3">
              {deliverables.map(({ text, icon: Icon }, i) => (
                <li
                  key={text}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#34c996]/15 text-[#34c996] ring-1 ring-[#34c996]/30">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="flex-1 font-medium">{text}</span>
                  <span aria-hidden="true" className="display text-lg text-white/20">0{i + 1}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-[#34c996]/30 via-transparent to-[#f5a03a]/15 blur-2xl" />
            <div className="rounded-[28px] bg-white p-6 text-[#14304f] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8">
              <h3 className="text-xl font-semibold">Book a maturity assessment call</h3>
              <div className="mt-5">
                <AssessmentForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="dt-faq" className="relative isolate overflow-hidden bg-gradient-to-b from-[#f3f8f6] to-white py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
        <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16 lg:px-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
              <MessageCircleQuestion size={22} aria-hidden="true" />
            </span>
            <h2 id="dt-faq" className="display mt-6 text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)] text-[#14304f]">
              Questions about{" "}
              <span className="bg-gradient-to-r from-[#0b6e50] to-[#34c996] bg-clip-text text-transparent">Digital Twin</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-2xl border border-[#14304f]/10 bg-white shadow-[0_18px_40px_-34px_rgba(20,48,79,0.5)] transition-[border-color,box-shadow] duration-300 open:border-[#0b6e50]/25 open:shadow-[0_24px_50px_-30px_rgba(11,110,80,0.45)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className="display w-8 shrink-0 text-lg text-[#14304f]/20 transition-colors group-open:text-[#0b6e50]">
                    0{i + 1}
                  </span>
                  <h3 className="flex-1 text-[1.05rem] font-semibold text-[#14304f] sm:text-lg">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef2f8] text-[#14304f] transition duration-300 group-open:rotate-45 group-open:bg-[#0b6e50] group-open:text-white"
                  >
                    <Plus size={18} />
                  </span>
                </summary>
                <p className="px-5 pb-6 pl-[4.25rem] pr-6 text-[0.98rem] leading-relaxed text-[#4b5a74] sm:pr-16">
                  {f.a}
                  {f.link && (
                    <>
                      {" "}
                      {f.link.before}
                      <Link href={f.link.href} className="font-semibold text-[#0b6e50] underline underline-offset-4 hover:text-[#095c43]">
                        {f.link.label}
                      </Link>
                      {f.link.after}
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
