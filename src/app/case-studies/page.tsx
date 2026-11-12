import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarCheck,
  Database,
  FileText,
  Globe2,
  Layers,
  LineChart,
  MapPinned,
  MessagesSquare,
  PhoneCall,
  Quote,
  Sparkles,
} from "lucide-react";
import { consultationHref } from "@/lib/content";
import { CountUp } from "@/components/motion/CountUp";
import { PdfRequestForm } from "@/components/case-studies/PdfRequestForm";

const path = "/case-studies";

export const metadata: Metadata = {
  title: "Case Study: Automatic Reports Across Six Plants",
  description:
    "How a controlled-environment agriculture group in the UAE stopped building weekly reports by hand: a digital twin reads 40,000+ sensors across six plants in two countries.",
  alternates: { canonical: path },
  // Client name, dates and results are still placeholders; keep out of search until approved.
  robots: { index: false, follow: true },
};

const glance = [
  { label: "Client", value: "[Client name, pending written approval]", icon: Building2 },
  { label: "Scope", value: "6 plants, 2 countries, 40,000+ sensors", icon: Globe2 },
  { label: "Solution", value: "Digital twin with Optima decision intelligence", icon: Sparkles },
  { label: "Live since", value: "[Month and year]", icon: CalendarCheck },
];

const stats = [
  { value: "40,000+", label: "sensors read by one system", count: true },
  { value: "100M+", label: "data points in the twin", count: true },
  { value: "1 year+", label: "running live", count: true },
  { value: "[X] hours", label: "of manual reporting saved each week", count: false },
];

const layers = [
  { n: 1, name: "Foundation", text: "Every sensor and system mapped across six plants.", icon: MapPinned },
  { n: 2, name: "Ingest and store", text: "40,000+ sensors connected into one source of truth.", icon: Database },
  { n: 3, name: "Model and analyse", text: "Trends and correlations across plants and seasons.", icon: LineChart },
  { n: 4, name: "Serve and decide", text: "Automatic reports and plain-language questions through Optima.", icon: MessagesSquare },
];

export default function CaseStudyPage() {
  return (
    <div className="bg-white text-[#14304f]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3f8f6_0%,#ffffff_75%)]" />
          <div className="absolute inset-0 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="dt-blob absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#34c996]/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-[#4b5a74]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#0b6e50]">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[#4b5a74]/50">/</li>
              <li>
                <Link href="/case-studies" className="hover:text-[#0b6e50]">Case studies</Link>
              </li>
              <li aria-hidden="true" className="text-[#4b5a74]/50">/</li>
              <li aria-current="page" className="font-semibold text-[#14304f]">[Client name]</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="dt-rise">
              <h1 className="display text-[clamp(2.1rem,1.2rem+3vw,3.8rem)] text-[#14304f]">
                How [Client name] stopped building{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] via-[#14946a] to-[#34c996] bg-clip-text text-transparent">
                  weekly reports by hand
                </span>{" "}
                across six plants
              </h1>
              <p className="lede mt-6 text-[#4b5a74]">
                The leadership team used to wait on technical staff for every report. Today, a digital twin reads more
                than 40,000 sensors across six plants in two countries, the reports are produced automatically, and
                leaders read them on their own.
              </p>
            </div>

            <aside
              aria-labelledby="cs-glance"
              className="dt-rise dt-rise-late relative self-start overflow-hidden rounded-[28px] bg-[#0b1a2e] p-7 text-white shadow-[0_40px_80px_-30px_rgba(11,26,46,0.6)] sm:p-8"
            >
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#34c996]/25 blur-3xl" />
              <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
              <h2 id="cs-glance" className="relative text-xs font-semibold uppercase tracking-[0.18em] text-[#34c996]">
                At a glance
              </h2>
              <dl className="relative mt-5 divide-y divide-white/10">
                {glance.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-[#34c996] ring-1 ring-white/10">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-[0.75rem] text-[#9fb0cc]">{label}</dt>
                      <dd className="mt-0.5 font-semibold leading-snug">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section aria-label="Results in numbers" className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <dl className="grid overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b6e50] via-[#0d7a59] to-[#14304f] text-white shadow-[0_40px_80px_-40px_rgba(11,110,80,0.6)] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`relative p-7 sm:p-9 ${i > 0 ? "border-t border-white/15 sm:border-t-0" : ""} ${
                  i % 2 ? "sm:border-l sm:border-white/15" : ""
                } ${i > 1 ? "sm:border-t sm:border-white/15 lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-white/15" : ""}`}
              >
                <dd className="display text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-none">
                  {s.count ? <CountUp value={s.value} /> : s.value}
                </dd>
                <dt className="mt-3 text-[0.95rem] text-white/80">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CHALLENGE */}
      <section aria-labelledby="cs-challenge" className="pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-[90rem] gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16 lg:px-10">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1df] text-[#d9821f]">
              <AlertTriangle size={22} aria-hidden="true" />
            </span>
            <h2 id="cs-challenge" className="display mt-5 text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)]">The challenge</h2>
          </div>
          <p className="rounded-[24px] border-l-4 border-[#f5a03a] bg-[#fff8ef] p-6 text-[1.08rem] leading-relaxed text-[#33445f] sm:p-8">
            Each plant collected a huge amount of data from climate, water and energy sensors. But the data sat in
            separate systems, and turning it into a report meant someone exporting, cleaning and pasting it every week.
            By the time leadership saw a number, it was already old, and they still needed someone to explain it.
          </p>
        </div>
      </section>

      {/* WHAT WE DID */}
      <section aria-labelledby="cs-did" className="relative isolate overflow-hidden bg-[#0b1a2e] py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#34c996]/15 blur-3xl" />
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#34c996]/15 text-[#34c996] ring-1 ring-[#34c996]/30">
              <Layers size={22} aria-hidden="true" />
            </span>
            <h2 id="cs-did" className="display mt-5 text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)]">What we did</h2>
            <p className="mt-4 text-[1.05rem] text-[#c9d4e5]">
              We started at the foundation, by mapping every data source in every plant. Then we built the layers one
              by one.
            </p>
          </div>

          <ol className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-[#34c996]/0 via-[#34c996]/60 to-[#34c996]/0 lg:block"
            />
            {layers.map(({ n, name, text, icon: Icon }) => (
              <li
                key={n}
                className={`relative rounded-[24px] border p-6 backdrop-blur ${
                  n === 4
                    ? "border-[#34c996]/40 bg-gradient-to-br from-[#0b6e50]/50 to-[#0e2038] shadow-[0_0_40px_-10px_rgba(52,201,150,0.5)]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[#0b1a2e] text-[#34c996] ring-1 ring-[#34c996]/40">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-[#34c996]/15 px-3 py-1 text-xs font-semibold text-[#34c996]">Layer {n}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{name}</h3>
                <p className="mt-2 text-[#c9d4e5]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RESULT + QUOTE */}
      <section aria-labelledby="cs-result" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-[90rem] gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <div className="rounded-[28px] border border-[#14304f]/10 bg-gradient-to-br from-[#eef7f3] to-white p-8 sm:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
              <LineChart size={22} aria-hidden="true" />
            </span>
            <h2 id="cs-result" className="display mt-5 text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)]">The result</h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-[#33445f]">
              Reports that used to take [time] are now produced automatically. Leaders ask their own questions and read
              the answers without waiting for the technical team. [One measured business result to add, with client
              approval.]
            </p>
          </div>

          <figure className="relative overflow-hidden rounded-[28px] bg-[#0b1a2e] p-8 text-white sm:p-10">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#34c996]/25 blur-3xl" />
            <Quote size={56} aria-hidden="true" className="relative text-[#34c996]/40" />
            <blockquote className="relative mt-4 text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] font-medium leading-snug">
              “[A one or two line quote from the client champion, about time saved or a decision made faster.]”
            </blockquote>
            <figcaption className="relative mt-6 flex items-center gap-3 text-[#c9d4e5]">
              <span aria-hidden="true" className="h-px w-8 bg-[#34c996]" />
              [Name], Head of Digital Transformation, [Client name]
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SHARE + CTA */}
      <section aria-label="Share and next steps" className="pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-[90rem] gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <div className="rounded-[28px] border border-[#14304f]/10 bg-white p-8 shadow-[0_30px_60px_-45px_rgba(20,48,79,0.5)] sm:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e6f4ee] text-[#0b6e50] ring-1 ring-[#0b6e50]/15">
              <FileText size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold text-[#14304f]">Want to share this with your team?</h2>
            <p className="mt-2 text-[#4b5a74]">Download a two-page PDF version for your next internal meeting.</p>
            <div className="mt-6">
              <PdfRequestForm caseStudy="Controlled-environment agriculture, six plants" />
            </div>
          </div>

          <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b6e50] via-[#0d7a59] to-[#14304f] p-8 text-white sm:p-10">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-20" />
            <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#34c996]/40 blur-3xl" />
            <h2 className="display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]">Have a similar problem with reports or plant data?</h2>
            <p className="mt-4 max-w-[52ch] text-white/80">
              We will walk you through how this project started and what the first step would look like in your plant.
            </p>
            <Link href={consultationHref} className="btn group mt-8 bg-white text-[#0b6e50] hover:bg-[#e6f4ee]">
              <PhoneCall size={18} aria-hidden="true" /> Book a discovery call
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
