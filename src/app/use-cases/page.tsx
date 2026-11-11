import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CalendarClock, Network, PhoneCall, Timer, Zap } from "lucide-react";
import { consultationHref, site } from "@/lib/content";
import { UseCaseGrid } from "@/components/use-cases/UseCaseGrid";

const path = "/use-cases";

export const metadata: Metadata = {
  title: "Use Cases for Industrial Digital Twins and Physical AI",
  description:
    "Use cases for industrial digital twins and Physical AI: predictive maintenance, batch traceability, energy monitoring, OEE, visual inspection, security patrol and asset inspection rounds.",
  alternates: { canonical: path },
  openGraph: { url: path, title: "Use Cases | Thinkverses Solutions" },
};

const checkHref = "/digital-twin#two-minute-check";

export default function UseCasesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Use cases for industrial digital twins and Physical AI",
    url: `${site.url}${path}`,
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  return (
    <div className="bg-white text-[#14304f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32">
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
              <li aria-current="page" className="font-semibold text-[#14304f]">Use cases</li>
            </ol>
          </nav>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div className="dt-rise">
              <h1 className="display text-[clamp(2.3rem,1.3rem+3.2vw,4.1rem)] text-[#14304f]">
                Use cases for industrial{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] via-[#14946a] to-[#34c996] bg-clip-text text-transparent">
                  digital twins
                </span>{" "}
                and{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] via-[#14946a] to-[#34c996] bg-clip-text text-transparent">
                  Physical AI
                </span>
              </h1>
              <p className="lede mt-6 text-[#4b5a74]">
                Every use case below starts with a problem a plant head, quality head or security manager has told us
                about. Pick the one that sounds like your operation, and we will show you how it gets solved and what the
                first step looks like.
              </p>
            </div>

            {/* Quick answer */}
            <aside
              aria-labelledby="uc-quick"
              className="dt-rise dt-rise-late relative overflow-hidden rounded-[28px] bg-[#0b1a2e] p-7 text-white shadow-[0_40px_80px_-30px_rgba(11,26,46,0.6)] sm:p-8"
            >
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#34c996]/25 blur-3xl" />
              <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
              <div className="relative">
                <h2 id="uc-quick" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#34c996]">
                  <Zap size={14} aria-hidden="true" /> Quick answer
                </h2>
                <p className="mt-4 leading-relaxed text-[#c9d4e5]">
                  Thinkverses works on two kinds of use cases.{" "}
                  <strong className="font-semibold text-white">Digital twin use cases</strong> use your plant data to
                  catch problems early. <strong className="font-semibold text-white">Physical AI use cases</strong> use
                  robots and cameras to inspect lines and patrol sites. Many sites use both, because what the robots see
                  feeds the twin.
                </p>
                <div aria-hidden="true" className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-[#34c996] ring-1 ring-white/15">
                    <Bot size={20} />
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/10 via-[#34c996] to-white/10" />
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white">
                    <Network size={20} />
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section aria-label="All use cases" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <UseCaseGrid />
        </div>
      </section>

      {/* NOT SURE */}
      <section aria-labelledby="uc-unsure" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="relative isolate overflow-hidden rounded-[32px] border border-[#14304f]/10 bg-gradient-to-br from-[#eef7f3] via-white to-[#f4f7fb] p-8 sm:p-12 lg:p-14">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
            <div aria-hidden="true" className="absolute -bottom-32 -right-32 -z-10 h-96 w-96 rounded-full bg-[#34c996]/20 blur-3xl" />
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
                  <Timer size={22} aria-hidden="true" />
                </span>
                <h2 id="uc-unsure" className="display mt-6 text-[clamp(1.8rem,1.2rem+2vw,3rem)] text-[#14304f]">
                  Not sure which use case fits your plant?
                </h2>
                <p className="mt-4 max-w-[60ch] text-[1.05rem] text-[#4b5a74]">
                  Most companies we speak to have two or three of these problems at once. The quickest way to find the
                  right starting point is a two-minute check on where your data is today.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={checkHref}
                  className="btn group flex-1 bg-[#0b6e50] text-white shadow-[0_14px_30px_-12px_rgba(11,110,80,0.7)] hover:bg-[#095c43]"
                >
                  <Timer size={18} aria-hidden="true" /> Take the two-minute check
                </Link>
                <Link
                  href={consultationHref}
                  className="btn group flex-1 border border-[#14304f]/20 bg-white text-[#14304f] hover:border-[#0b6e50] hover:text-[#0b6e50]"
                >
                  <PhoneCall size={18} aria-hidden="true" /> Book a discovery call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL */}
      <section aria-labelledby="uc-call" className="relative isolate overflow-hidden bg-[#0b1a2e] py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#34c996]/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -right-32 -z-10 h-[24rem] w-[24rem] rounded-full bg-[#f5a03a]/10 blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#34c996]/15 text-[#34c996] ring-1 ring-[#34c996]/30">
            <CalendarClock size={24} aria-hidden="true" />
          </span>
          <h2 id="uc-call" className="display mt-6 text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)]">
            Tell us the problem, and we will tell you{" "}
            <span className="bg-gradient-to-r from-[#34c996] to-[#9be8c9] bg-clip-text text-transparent">honestly</span>{" "}
            whether we can solve it.
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-[1.05rem] text-[#c9d4e5]">
            A 30-minute call with the person who handles that kind of project. You pick the time on our live calendar.
          </p>
          <Link
            href={consultationHref}
            className="btn group mt-9 bg-[#34c996] text-[#0b1a2e] shadow-[0_14px_34px_-12px_rgba(52,201,150,0.7)] hover:bg-[#4fd8a8]"
          >
            Book a 30-minute call <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
