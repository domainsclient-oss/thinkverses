import { Activity, ArrowRight, BrainCircuit, Layers, MessageSquareText, RefreshCcw } from "lucide-react";
import { Reveal } from "../Reveal";
import { approach } from "@/lib/content";

const icons = [Activity, Layers, BrainCircuit, MessageSquareText];

// Decorative micro-visuals for each step; illustrative only.
function PumpVisual() {
  const sensors = [
    { label: "Vibration", x: 96, y: 52, tone: "#ffffff" },
    { label: "Temperature", x: 178, y: 40, tone: "#a996ff" },
    { label: "Flow, pressure", x: 262, y: 64, tone: "#ffffff" },
  ];
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      <rect x="196" y="92" width="110" height="14" rx="3" fill="#ffffff" fillOpacity="0.12" />
      <rect x="128" y="92" width="34" height="14" fill="#ffffff" fillOpacity="0.2" />
      <rect x="34" y="76" width="96" height="46" rx="10" fill="#0f1f40" stroke="#ffffff" strokeOpacity="0.25" />
      <text x="82" y="103" textAnchor="middle" fontSize="12" fill="#ffffff" fillOpacity="0.85">Motor</text>
      <circle cx="178" cy="99" r="28" fill="#0f1f40" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="2" />
      <text x="178" y="103" textAnchor="middle" fontSize="12" fill="#ffffff">Pump</text>
      {sensors.map((s) => (
        <g key={s.label}>
          <line x1={s.x} y1={s.y + 6} x2={s.x} y2={s.y + 22} stroke={s.tone} strokeOpacity="0.35" strokeDasharray="2 3" />
          <circle cx={s.x} cy={s.y} r="5" fill={s.tone} className="pulse" />
          <text x={s.x} y={s.y - 11} textAnchor="middle" fontSize="10" fill={s.tone} fillOpacity="0.75">
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function IntegrationVisual() {
  const sources = [
    { label: "SCADA", y: 24 },
    { label: "Records", y: 61 },
    { label: "ERP", y: 98 },
    { label: "Robot", y: 135 },
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
      <text x="196" y="28" fontSize="10" fill="#ffffff" fillOpacity="0.45">bearing temp</text>
      <path d="M20 112 C50 104 70 70 100 78 S150 112 190 86 V142 H20z" fill="url(#about-fc)" />
      <path d="M20 112 C50 104 70 70 100 78 S150 112 190 86" fill="none" stroke="#ffffff" strokeWidth="2.2" />
      <path d="M190 86 C220 66 245 92 270 58 S295 40 304 36" fill="none" stroke="#7c5cff" strokeWidth="2.2" strokeDasharray="5 5" className="twin-flow" />
      <circle cx="270" cy="58" r="11" fill="#7c5cff" fillOpacity="0.2" />
      <circle cx="270" cy="58" r="4.5" fill="#a996ff" />
    </svg>
  );
}

function DecisionVisual() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      <rect x="20" y="20" width="230" height="44" rx="14" fill="#ffffff" fillOpacity="0.9" />
      <text x="36" y="47" fontSize="11.5" fill="#0a1630">Which pumps need attention?</text>
      <rect x="70" y="80" width="230" height="58" rx="14" fill="#7c5cff" fillOpacity="0.35" stroke="#a996ff" strokeOpacity="0.6" />
      <text x="86" y="104" fontSize="11.5" fill="#ffffff">Pump 3. Plan a bearing check</text>
      <text x="86" y="122" fontSize="11.5" fill="#ffffff" fillOpacity="0.8">Thursday, day shift</text>
    </svg>
  );
}

const visuals = [PumpVisual, IntegrationVisual, ForecastVisual, DecisionVisual];

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
              How it works
            </p>
            <h2 className="display h-section">
              Let&apos;s say one pump at a water pumping station starts running hot.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <span className="inline-flex rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/65">
              Illustrative example
            </span>
            <p className="lede mt-5 flex gap-3 text-white/65">
              <RefreshCcw size={20} className="mt-1.5 shrink-0 text-cyan" aria-hidden="true" />
              The team fixes the pump in a planned shift, the station keeps supplying water, and the twin learns from
              the result.
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
                      {String(i + 1).padStart(2, "0")} · {a.stage}
                    </span>
                  </div>
                  <h3 className="relative mt-5 px-1 font-display text-xl font-semibold leading-snug [font-stretch:110%]">{a.title}</h3>
                  <p className="relative mt-3 px-1 pb-2 text-[0.98rem] leading-relaxed text-white/60">{a.text}</p>
                </div>
                {i < approach.length - 1 && (
                  <span
                    className="absolute -right-[1.15rem] top-20 z-10 hidden h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink text-cyan shadow-lg xl:grid"
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
