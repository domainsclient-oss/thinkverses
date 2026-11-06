"use client";

import { useState } from "react";
import { ArrowRight, CircleHelp, Clock, LayoutGrid, ScanEye, Shield, TrendingUp, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";

// Palette from the approved reference: green #0b6e50 · navy #14304f · orange #c2671c on a light ground.
type Tone = "twin" | "ai" | "start";

const problems: { quote: string; answer: string; icon: LucideIcon; tone: Tone }[] = [
  { quote: "“We only see problems after they happen.”", answer: "Digital Twin: predictive maintenance", icon: TrendingUp, tone: "twin" },
  { quote: "“Our data sits in SCADA, ERP and spreadsheets.”", answer: "Digital Twin: one source of truth", icon: LayoutGrid, tone: "twin" },
  { quote: "“The data is there, but answers reach us too late.”", answer: "Digital Twin: dashboards and plain-language answers", icon: Clock, tone: "twin" },
  { quote: "“Defects still reach customers, and manual checks slip on night shifts.”", answer: "Robotic Solutions: visual inspection", icon: ScanEye, tone: "ai" },
  { quote: "“The site is too big to watch every corner, especially at night.”", answer: "Robotic Solutions: security patrol", icon: Shield, tone: "ai" },
  { quote: "“We don’t know where to start.”", answer: "Start with a maturity assessment", icon: CircleHelp, tone: "start" },
];

const GREEN = "#0b6e50";
const ORANGE = "#c2671c";
const NAVY = "#14304f";

const tones: Record<Tone, { color: string; tile: string; tileOn: string; answer: string; border: string }> = {
  twin: {
    color: GREEN,
    tile: "bg-[#e8f5ef] text-[#0b6e50]",
    tileOn: "bg-[#0b6e50] text-white",
    answer: "text-[#0b6e50]",
    border: "border-[#0b6e50]/40",
  },
  ai: {
    color: ORANGE,
    tile: "bg-[#fdf1e6] text-[#c2671c]",
    tileOn: "bg-[#c2671c] text-white",
    answer: "text-[#b35c12]",
    border: "border-[#c2671c]/40",
  },
  start: {
    color: NAVY,
    tile: "bg-[#eef2f7] text-[#14304f]",
    tileOn: "bg-[#14304f] text-white",
    answer: "text-[#0b6e50]",
    border: "border-[#14304f]/40",
  },
};

/* Each problem routes to its solution; the hovered route lights up */
function Routing({ active }: { active: number | null }) {
  const ys = [22, 62, 102, 142, 182, 222];
  const hubs = [
    { y: 82, c: GREEN, bg: "#e8f5ef" },
    { y: 162, c: ORANGE, bg: "#fdf1e6" },
    { y: 222, c: NAVY, bg: "#eef2f7" },
  ];
  const hubFor = (i: number) => (i < 3 ? hubs[0] : i < 5 ? hubs[1] : hubs[2]);
  return (
    <svg viewBox="0 0 320 244" className="mx-auto h-auto w-full max-w-[19rem] overflow-visible will-change-transform" aria-hidden="true">
      {ys.map((y, i) => {
        const h = hubFor(i);
        const on = active === null || active === i;
        const d = `M30 ${y} C 150 ${y}, 160 ${h.y}, 268 ${h.y}`;
        return (
          <g key={y} style={{ opacity: on ? 1 : 0.2, transition: "opacity .35s" }}>
            <path d={d} fill="none" stroke={h.c} strokeOpacity="0.22" strokeWidth="1.5" />
            <path
              d={d}
              fill="none"
              stroke={h.c}
              strokeWidth={active === i ? 2.6 : 1.8}
              strokeLinecap="round"
              strokeDasharray="3 16"
              className="twin-flow"
              style={{ animationDuration: `${active === i ? 1.1 : 2 + i * 0.2}s` }}
            />
            <rect x="12" y={y - 9} width="18" height="18" rx="6" fill="#fff" stroke={h.c} strokeOpacity={active === i ? 1 : 0.4} strokeWidth={active === i ? 2 : 1} />
            <circle cx="21" cy={y} r="3" fill={h.c} />
          </g>
        );
      })}
      {hubs.map((h, k) => {
        const lit = active === null || hubFor(active) === h;
        return (
          <g key={h.y} style={{ opacity: lit ? 1 : 0.3, transition: "opacity .35s" }}>
            <circle cx="284" cy={h.y} r={k === 2 ? 15 : 22} fill={h.bg} />
            <circle cx="284" cy={h.y} r={k === 2 ? 15 : 22} fill="none" stroke={h.c} strokeOpacity="0.35" className="pulse" />
            <circle cx="284" cy={h.y} r={k === 2 ? 8 : 12} fill={h.c} />
            <circle cx="284" cy={h.y} r={k === 2 ? 3 : 4.5} fill="#fff" />
          </g>
        );
      })}
    </svg>
  );
}

export function WhyThinkverses() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="why" data-header-light className="cv-auto [contain-intrinsic-size:auto_1146px] lg:[contain-intrinsic-size:auto_833px] relative isolate overflow-hidden bg-[#f7f9fb] py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(20,48,79,0.08)_1px,transparent_1.3px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" aria-hidden="true" />
      <div className="absolute -left-48 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#0b6e50]/[0.07] glow-soft" aria-hidden="true" />

      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Left: question + routing map */}
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-[#0b6e50] ring-1 ring-[#14304f]/10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b6e50]" aria-hidden="true" />
              Pick your problem
            </p>
            <h2 className="display mt-5 text-[clamp(2rem,1.4rem+1.9vw,2.85rem)] leading-[1.08] text-[#14304f]">
              Which of these sounds most like your operation today?
            </h2>
            <div className="mt-8 hidden rounded-[24px] border border-[#14304f]/10 bg-white/90 px-6 py-5 shadow-[0_24px_50px_-40px_rgba(20,48,79,0.5)] lg:block">
              <Routing active={active} />
            </div>
          </div>
        </Reveal>

        {/* Right: problems */}
        <ol className="space-y-3 lg:col-span-7" onMouseLeave={() => setActive(null)}>
          {problems.map((p, i) => {
            const Icon = p.icon;
            const t = tones[p.tone];
            const on = active === i;
            return (
              <Reveal as="li" key={p.answer} delay={i * 60}>
                <div
                  onMouseEnter={() => setActive(i)}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-white px-4 py-4 transition-all duration-300 sm:gap-5 sm:px-5 sm:py-5 ${
                    on ? `${t.border} shadow-[0_20px_40px_-28px_rgba(20,48,79,0.45)]` : "border-[#14304f]/10 shadow-[0_1px_2px_rgba(20,48,79,0.04)]"
                  }`}
                >
                  {/* Colour sweep from the left on hover */}
                  <span
                    className="absolute inset-y-0 left-0 w-1 transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-1.5"
                    style={{ background: t.color }}
                    aria-hidden="true"
                  />
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${on ? t.tileOn : t.tile}`}
                  >
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.05rem] font-semibold leading-snug text-[#14304f] sm:text-[1.1rem]">{p.quote}</span>
                    <span className={`mt-1 block text-[0.86rem] font-medium ${t.answer}`}>{p.answer}</span>
                  </span>
                  <span
                    className={`hidden h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 sm:grid ${
                      on ? "translate-x-0 border-transparent text-white" : "-translate-x-1 border-[#14304f]/10 text-[#14304f]/40"
                    }`}
                    style={on ? { background: t.color } : undefined}
                    aria-hidden="true"
                  >
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
