import { ArrowRight, BrainCircuit, Gauge, Layers } from "lucide-react";
import { Reveal } from "../Reveal";
import { approach } from "@/lib/content";

const icons = [Layers, BrainCircuit, Gauge];
const stages = ["Connect", "Predict", "Optimize"];

// Decorative micro-visuals for each approach card; illustrative only.
function IntegrationVisual() {
  const sources = [
    { label: "IoT", y: 30 },
    { label: "ERP", y: 80 },
    { label: "Cloud", y: 130 },
  ];
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      {sources.map((s) => (
        <g key={s.label}>
          <path d={`M86 ${s.y} C150 ${s.y} 170 80 222 80`} fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="4 5" className="twin-flow" />
          <rect x="22" y={s.y - 13} width="64" height="26" rx="13" fill="#0f1f40" stroke="#ffffff" strokeOpacity="0.15" />
          <text x="54" y={s.y + 4} textAnchor="middle" fontSize="11" fill="#ffffff" fillOpacity="0.75">
            {s.label}
          </text>
        </g>
      ))}
      <circle cx="252" cy="80" r="34" fill="#ffffff" fillOpacity="0.08" />
      <circle cx="252" cy="80" r="22" fill="#ffffff" fillOpacity="0.18" stroke="#ffffff" strokeOpacity="0.7" />
      <circle cx="252" cy="80" r="6" fill="#ffffff" />
    </svg>
  );
}

function ForecastVisual() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="about-fc" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="190" y1="18" x2="190" y2="142" stroke="#ffffff" strokeOpacity="0.15" strokeDasharray="3 4" />
      <text x="196" y="28" fontSize="10" fill="#ffffff" fillOpacity="0.45">forecast</text>
      <path d="M20 112 C50 104 70 70 100 78 S150 112 190 86 V142 H20z" fill="url(#about-fc)" />
      <path d="M20 112 C50 104 70 70 100 78 S150 112 190 86" fill="none" stroke="#ffffff" strokeWidth="2.2" />
      <path d="M190 86 C220 66 245 92 270 58 S295 40 304 36" fill="none" stroke="#7c5cff" strokeWidth="2.2" strokeDasharray="5 5" className="twin-flow" />
      <circle cx="270" cy="58" r="11" fill="#7c5cff" fillOpacity="0.2" />
      <circle cx="270" cy="58" r="4.5" fill="#a996ff" />
    </svg>
  );
}

function OptimizeVisual() {
  const bars = [46, 58, 52, 72, 80, 96, 112];
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="about-bar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#3a66ff" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <rect key={i} x={28 + i * 40} y={140 - h} width="22" height={h} rx="6" fill="url(#about-bar)" fillOpacity={0.35 + i * 0.1} />
      ))}
      <path d="M39 86 L79 74 L119 80 L159 60 L199 50 L239 36 L279 22" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="279" cy="22" r="4.5" fill="#ffffff" />
    </svg>
  );
}

const visuals = [IntegrationVisual, ForecastVisual, OptimizeVisual];

export function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-graphite py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-blueprint opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />
      <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-violet/15 blur-[130px]" aria-hidden="true" />
      <div className="absolute -bottom-48 -left-40 h-[34rem] w-[34rem] rounded-full bg-cyan/10 blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3.5 py-1.5 text-sm font-medium text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              Intelligence for the physical world
            </p>
            <h2 className="display h-section">Thinkverses — Infinite Insight, Infinite Impact.</h2>
          </div>
          <p className="lede text-white/65 lg:col-span-5">
            Thinkverses builds Digital Twin decision-intelligence systems and robotics solutions for operations that
            run complex physical environments. Where other technology stops at showing operators what is happening,
            Thinkverses is built around what should happen next.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-5 lg:grid-cols-3">
          {approach.map((a, i) => {
            const Icon = icons[i];
            const Visual = visuals[i];
            return (
              <Reveal
                as="li"
                key={a.title}
                delay={i * 100}
                className="group relative list-none rounded-[28px] bg-gradient-to-b from-white/15 to-white/[0.03] p-px transition-all duration-500 hover:-translate-y-1 hover:from-cyan/70 hover:to-[#0056a7]/50"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-[27px] bg-graphite p-5 sm:p-6">
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan/0 blur-3xl transition-colors duration-500 group-hover:bg-cyan/15" aria-hidden="true" />
                  <div className="relative h-40 overflow-hidden rounded-[20px] border border-white/10 bg-ink/70 bg-blueprint">
                    <Visual />
                  </div>
                  <div className="relative mt-6 flex items-center gap-3 px-1">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan transition-colors duration-300 group-hover:bg-cyan group-hover:text-ink">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                      {String(i + 1).padStart(2, "0")} · {stages[i]}
                    </span>
                  </div>
                  <h3 className="relative mt-5 px-1 font-display text-xl font-semibold leading-snug [font-stretch:110%]">{a.title}</h3>
                  <p className="relative mt-3 px-1 pb-2 text-[0.98rem] leading-relaxed text-white/60">{a.text}</p>
                </div>
                {i < approach.length - 1 && (
                  <span
                    className="absolute -right-[1.15rem] top-20 z-10 hidden h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink text-cyan shadow-lg lg:grid"
                    aria-hidden="true"
                  >
                    <ArrowRight size={16} />
                  </span>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
