import Link from "next/link";
import { ArrowRight, BrainCircuit, Check, Factory, LineChart, Rocket } from "lucide-react";
import { Reveal } from "../Reveal";
import { consultationHref } from "@/lib/content";
import { solutionPath } from "@/lib/locations";

const audience = [
  {
    icon: Factory,
    text: "Businesses that want to enhance asset tracking, predictive maintenance, and operational efficiency.",
  },
  { icon: BrainCircuit, text: "Companies looking for AI-driven insights to optimize their processes." },
  { icon: LineChart, text: "Industry leaders seeking data-driven decision-making tools." },
];

const perks = [
  "Exclusive access to our product before public release.",
  "Direct input in feature development tailored to their needs.",
  "Dedicated support & consultation during implementation.",
];

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-blueprint" aria-hidden="true" />
      <svg className="absolute -right-40 top-24 -z-10 h-[56rem] w-[56rem] opacity-70" viewBox="0 0 800 800" aria-hidden="true">
        {[380, 310, 240, 170, 100].map((r, i) => (
          <circle key={r} cx="400" cy="400" r={r} fill="none" stroke={i % 2 ? "#7c5cff" : "#1fc8e8"} strokeOpacity={0.12 + i * 0.05} strokeDasharray={i % 2 ? "2 10" : undefined} />
        ))}
        <circle cx="400" cy="400" r="40" fill="#1fc8e8" fillOpacity="0.25" />
      </svg>
      <div className="absolute -left-20 bottom-0 -z-10 h-80 w-[40rem] rounded-full bg-volt/25 blur-[120px]" aria-hidden="true" />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="cta-title" className="display h-hero">Start Your Digital Twin Journey Now!</h2>
            <p className="lede mt-6 text-white/70">
              Transform operational complexity into intelligent decisions with Digital Twins, AI, IoT, and Robotics.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link href={consultationHref} className="btn btn-primary">
              Book a Consultation <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/#contact" className="btn btn-ghost">
              Contact Our Team
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">Who is this for?</p>
              <ul className="mt-8 divide-y divide-white/10">
                {audience.map((a) => {
                  const Icon = a.icon;
                  return (
                    <li key={a.text} className="group flex items-start gap-5 py-5 first:pt-0 last:pb-0">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan transition-colors duration-300 group-hover:bg-cyan group-hover:text-ink">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <p className="pt-2.5 text-[1.05rem] leading-relaxed text-white/85">{a.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="h-full rounded-[28px] bg-gradient-to-br from-cyan via-volt to-violet p-px shadow-[0_40px_80px_-40px_rgba(31,200,232,0.5)]">
              <div className="flex h-full flex-col rounded-[27px] bg-ink-2 p-6 sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a996ff]">Early adopter program</p>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet text-ink">
                    <Rocket size={19} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="display mt-5 h-sub">What do early adopters get?</h3>
                <ol className="mt-8 space-y-4">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-3.5">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-[1.02rem] leading-relaxed text-white/85">{p}</span>
                    </li>
                  ))}
                </ol>
                <Link
                  href={solutionPath("digital-twin", "uae")}
                  className="mt-auto inline-flex items-center gap-2 pt-10 font-semibold text-cyan"
                >
                  <span className="link-draw">Learn more</span> <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
