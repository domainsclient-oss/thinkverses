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

/* ---------- Solution previews: one small scene per problem, showing what the answer looks like ---------- */
const T = { fontFamily: "inherit" } as const;

// 0 · Predictive maintenance: a reading drifts up, the twin warns well before the alarm limit.
function PredictScene() {
  return (
    <>
      <text x="16" y="22" fontSize="10" fill="#4a5868" style={T}>Pump 3 · bearing temperature</text>
      <line x1="16" y1="168" x2="304" y2="168" stroke={NAVY} strokeOpacity="0.15" />
      <line x1="16" y1="58" x2="304" y2="58" stroke={ORANGE} strokeDasharray="5 5" strokeOpacity="0.7" />
      <text x="304" y="50" fontSize="9.5" textAnchor="end" fill={ORANGE} style={T}>Alarm limit</text>
      <path d="M16 140 L60 136 L100 142 L140 134 L170 138" fill="none" stroke={NAVY} strokeOpacity="0.45" strokeWidth="2" />
      <path d="M170 138 C 210 132, 240 116, 270 94 S 296 78, 304 74" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="196" y1="168" x2="196" y2="128" stroke={GREEN} strokeDasharray="3 4" />
      <circle cx="196" cy="128" r="11" fill={GREEN} fillOpacity="0.15" className="pulse" />
      <circle cx="196" cy="128" r="5" fill={GREEN} />
      <rect x="120" y="176" width="152" height="20" rx="10" fill="#e8f5ef" />
      <text x="196" y="190" fontSize="10" fontWeight="600" textAnchor="middle" fill={GREEN} style={T}>Early warning, repair planned</text>
    </>
  );
}

// 1 · One source of truth: separate systems feed one shared view.
function SourcesScene() {
  const srcs = [
    { y: 34, label: "SCADA" },
    { y: 92, label: "ERP" },
    { y: 150, label: "Spreadsheets" },
  ];
  return (
    <>
      {srcs.map((s, i) => (
        <g key={s.label}>
          <path d={`M114 ${s.y + 15} C 160 ${s.y + 15}, 170 107, 206 107`} fill="none" stroke={GREEN} strokeOpacity="0.2" strokeWidth="2" />
          <path
            d={`M114 ${s.y + 15} C 160 ${s.y + 15}, 170 107, 206 107`}
            fill="none"
            stroke={GREEN}
            strokeWidth="2"
            strokeDasharray="3 10"
            strokeLinecap="round"
            className="twin-flow"
            style={{ animationDuration: `${1.6 + i * 0.3}s` }}
          />
          <rect x="16" y={s.y} width="98" height="30" rx="8" fill="#fff" stroke={NAVY} strokeOpacity="0.2" />
          <text x="65" y={s.y + 19} fontSize="11" fontWeight="600" textAnchor="middle" fill={NAVY} style={T}>{s.label}</text>
        </g>
      ))}
      <rect x="206" y="72" width="98" height="70" rx="14" fill={GREEN} />
      <text x="255" y="102" fontSize="11" fontWeight="700" textAnchor="middle" fill="#fff" style={T}>One source</text>
      <text x="255" y="117" fontSize="11" fontWeight="700" textAnchor="middle" fill="#fff" style={T}>of truth</text>
      <text x="255" y="160" fontSize="9.5" textAnchor="middle" fill="#4a5868" style={T}>Same numbers for every team</text>
    </>
  );
}

// 2 · Plain-language answers: a leader asks, the twin answers.
function AnswerScene() {
  return (
    <>
      <rect x="96" y="14" width="208" height="46" rx="14" fill="#eef2f7" />
      <text x="110" y="33" fontSize="10.5" fontWeight="600" fill={NAVY} style={T}>Why did line 2 slow down</text>
      <text x="110" y="48" fontSize="10.5" fontWeight="600" fill={NAVY} style={T}>yesterday afternoon?</text>
      <rect x="16" y="74" width="236" height="84" rx="14" fill="#e8f5ef" />
      <circle cx="34" cy="94" r="8" fill={GREEN} />
      <path d="M30 94 l3 3 l5 -6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="50" y="98" fontSize="10.5" fontWeight="600" fill={GREEN} style={T}>Pump 3 ran hot from 14:10.</text>
      <text x="30" y="120" fontSize="10.5" fill={NAVY} style={T}>Output dropped for two hours.</text>
      <text x="30" y="140" fontSize="10.5" fill={NAVY} style={T}>Suggested: check the bearing.</text>
      <text x="16" y="182" fontSize="9.5" fill="#4a5868" style={T}>Answered in seconds, no report needed</text>
    </>
  );
}

// 3 · Visual inspection: a camera checks every unit and boxes the defect.
function InspectScene() {
  const parts = [36, 96, 156, 216, 276];
  return (
    <>
      <rect x="148" y="10" width="24" height="18" rx="4" fill={NAVY} />
      <circle cx="160" cy="28" r="4" fill={ORANGE} />
      <path d="M156 32 L134 118 L186 118 L164 32 Z" fill={ORANGE} fillOpacity="0.12" />
      <rect x="10" y="132" width="300" height="12" rx="6" fill={NAVY} fillOpacity="0.12" />
      {parts.map((x) => (
        <g key={x}>
          <rect x={x - 13} y="106" width="26" height="26" rx="4" fill="#fff" stroke={NAVY} strokeOpacity="0.35" />
          {x !== 156 && (
            <path d={`M${x - 5} 120 l4 4 l7 -8`} fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </g>
      ))}
      <rect x="143" y="106" width="26" height="26" rx="4" fill={ORANGE} fillOpacity="0.12" />
      <path d="M149 109 l6 6 l-4 4 l7 5 l-3 5" fill="none" stroke={ORANGE} strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="138" y="100" width="36" height="38" rx="5" fill="none" stroke={ORANGE} strokeWidth="2" strokeDasharray="4 3" />
      <rect x="178" y="84" width="48" height="18" rx="5" fill={ORANGE} />
      <text x="202" y="96.5" fontSize="10" fontWeight="700" textAnchor="middle" fill="#fff" style={T}>Defect</text>
      <text x="160" y="174" fontSize="9.5" textAnchor="middle" fill="#4a5868" style={T}>Every unit checked, flagged before it moves on</text>
    </>
  );
}

// 4 · Security patrol: a robot walks the route at night, covering blind spots.
function PatrolScene() {
  return (
    <>
      <rect x="12" y="12" width="296" height="150" rx="12" fill="#14304f" />
      <rect x="40" y="36" width="70" height="44" rx="4" fill="#fff" fillOpacity="0.1" />
      <rect x="210" y="36" width="72" height="56" rx="4" fill="#fff" fillOpacity="0.1" />
      <rect x="130" y="104" width="64" height="38" rx="4" fill="#fff" fillOpacity="0.1" />
      <circle cx="268" cy="132" r="22" fill={ORANGE} fillOpacity="0.18" />
      <text x="268" y="135" fontSize="8.5" textAnchor="middle" fill="#ffd2a8" style={T}>blind spot</text>
      <path d="M30 96 H 120 V 26 H 196 V 100 H 296 V 150 H 30 Z" fill="none" stroke={ORANGE} strokeOpacity="0.25" strokeWidth="2" />
      <path
        d="M30 96 H 120 V 26 H 196 V 100 H 296 V 150 H 30 Z"
        fill="none"
        stroke={ORANGE}
        strokeWidth="2"
        strokeDasharray="4 9"
        strokeLinecap="round"
        className="twin-flow"
      />
      <circle cx="196" cy="70" r="10" fill={ORANGE} fillOpacity="0.25" className="pulse" />
      <circle cx="196" cy="70" r="5" fill={ORANGE} />
      <text x="160" y="184" fontSize="9.5" textAnchor="middle" fill="#4a5868" style={T}>Mapped route, patrolled through the night</text>
    </>
  );
}

// 5 · Maturity assessment: five layers, every project starts at the foundation.
function AssessScene() {
  return (
    <>
      {[5, 4, 3, 2, 1].map((n, i) => {
        const w = 120 + (5 - n) * 40; // pyramid: layer 1 widest at the bottom
        const y = 14 + i * 30;
        const start = n === 1;
        return (
          <g key={n}>
            <rect
              x={160 - w / 2}
              y={y}
              width={w}
              height="24"
              rx="7"
              fill={start ? NAVY : "#fff"}
              stroke={NAVY}
              strokeOpacity={start ? 1 : 0.25}
              strokeDasharray={start ? undefined : "4 4"}
            />
            <text x="160" y={y + 16} fontSize="10" fontWeight={start ? 700 : 500} textAnchor="middle" fill={start ? "#fff" : "#4a5868"} style={T}>
              {start ? "Layer 1 · Start here" : `Layer ${n}`}
            </text>
          </g>
        );
      })}
      <text x="160" y="182" fontSize="9.5" textAnchor="middle" fill="#4a5868" style={T}>A map of your data and a roadmap to follow</text>
    </>
  );
}

const scenes = [PredictScene, SourcesScene, AnswerScene, InspectScene, PatrolScene, AssessScene];

function SolutionPreview({ index }: { index: number }) {
  const p = problems[index];
  const t = tones[p.tone];
  const Scene = scenes[index];
  return (
    <div key={index} className="enter-up">
      <p className="text-[0.8rem] font-medium text-[#4a5868]">If this sounds like you, we start with</p>
      <p className={`mt-1 text-[1.05rem] font-semibold leading-snug ${t.answer}`}>{p.answer}</p>
      <svg viewBox="0 0 320 200" className="mt-4 h-auto w-full" aria-hidden="true">
        <Scene />
      </svg>
    </div>
  );
}

export function WhyThinkverses() {
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(0); // preview stays on the last problem hovered
  const hover = (i: number) => {
    setActive(i);
    setShown(i);
  };

  return (
    <section id="why" data-header-light className="cv-auto [contain-intrinsic-size:auto_1146px] lg:[contain-intrinsic-size:auto_833px] relative isolate overflow-hidden bg-[#f7f9fb] py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(20,48,79,0.08)_1px,transparent_1.3px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" aria-hidden="true" />
      <div className="absolute -left-48 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#0b6e50]/[0.07] glow-soft" aria-hidden="true" />

      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Left: question + preview of the matching solution */}
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="display text-[clamp(2rem,1.4rem+1.9vw,2.85rem)] leading-[1.08] text-[#14304f]">
              Which of these sounds most like your operation today?
            </h2>
            <div className="mt-8 hidden rounded-[24px] border border-[#14304f]/10 bg-white/90 px-6 py-5 shadow-[0_24px_50px_-40px_rgba(20,48,79,0.5)] lg:block">
              <SolutionPreview index={shown} />
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
                  onMouseEnter={() => hover(i)}
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
