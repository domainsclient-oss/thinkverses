"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Coins, Database, Leaf, ScanEye, Shield, ShieldCheck, Target, TrendingUp, Wrench } from "lucide-react";
import { Reveal } from "../Reveal";
import { SceneMount } from "../three/SceneMount";
import brainImg from "../../../public/images/twin-brain.jpg";

const twin = {
  eyebrow: "Digital Twin",
  title: "A digital twin is worth it only if it changes what happens on your plant floor.",
  text: "So we start with the outcome you want, and then work back to the data you need for it.",
  outcomes: [
    { title: "Higher output", text: "Fewer stoppages mean more production hours.", icon: TrendingUp },
    { title: "Less downtime", text: "Repairs are planned before a breakdown.", icon: Wrench },
    { title: "Lower cost", text: "Energy and spares are used where they matter.", icon: Coins },
    { title: "Consistent quality", text: "Drift is caught before it becomes a reject.", icon: ShieldCheck },
    { title: "Lower emissions", text: "You can see and act on energy waste.", icon: Leaf },
  ],
  pickTitle: "Where are you today?",
  pickText: "Click the layer that sounds like your business. Most companies we speak to start at layer one or two.",
  // `detail` is the panel copy shown when that layer is picked.
  layers: [
    {
      n: 5,
      name: "Business value",
      tag: "Output, cost, risk",
      detail: {
        quote: "Leadership asks what this does for output, cost and risk.",
        text: "We lead with the outcome you care about: higher yield, less downtime, lower cost, consistent quality and lower emissions.",
      },
    },
    {
      n: 4,
      name: "Serve and decide",
      tag: "Answers, alerts",
      detail: {
        quote: "“The data is there, but answers reach us too late.”",
        text: "Dashboards for each role, alerts to the right person, and questions asked in plain language.",
      },
    },
    {
      n: 3,
      name: "Model and analyse",
      tag: "Foresight",
      detail: {
        quote: "“We only see problems after they happen.”",
        text: "A pilot on one use case, such as predictive maintenance, quality, energy or OEE.",
      },
    },
    {
      n: 2,
      name: "Ingest and store",
      tag: "One source of truth",
      detail: {
        quote: "“Our data sits in SCADA, ERP and spreadsheets.”",
        text: "We connect your key sources into one governed source of truth that everyone works from.",
      },
    },
    {
      n: 1,
      name: "Foundation",
      tag: "Every project starts here",
      detail: {
        quote: "“We don’t know where to start.”",
        text: "Every engagement starts here, with a maturity assessment, a map of your data sources and a roadmap.",
      },
    },
  ] as { n: number; name: string; tag: string; detail?: { quote: string; text: string } }[],
  sourcesLabel: "Data sources we connect",
  sources: ["DCS", "SCADA", "PLC", "MES", "ERP", "QMS", "IoT sensors", "Spreadsheets"],
  detailLabel: "Where we start with you",
  alt: "Person standing before a wall of flowing blue data visualization",
  href: "/?topic=digital-twin#contact",
  cta: "Book a maturity assessment call",
};

// Physical AI copy and colours follow the approved reference:
// green #0b6e50 (label, links) · navy #14304f (headings) · grey #4a5868 (body)
const physical = {
  eyebrow: "Robotic Solutions",
  title: "Our robots inspect the line and patrol the site, and they report what they find as it happens.",
  inspection: {
    title: "Visual inspection",
    text: "For quality, production and plant heads. The camera checks every unit on the line, draws a box around each defect it finds, and flags it before the unit moves on.",
    cta: "Book an inspection feasibility call",
    href: "/?topic=robotics#contact",
  },
  patrol: {
    title: "Security patrol",
    text: "For security heads and facility managers. We walk the site with you, map the routes and blind spots, and the robot patrols them through the night alongside your existing security systems.",
    cta: "Book a site assessment call",
    href: "/?topic=security#contact",
  },
  other: {
    title: "Have a different task, such as lifting or packing?",
    text: "Tell us the task, the site and how often it runs. Our team checks the fit and gives you an honest answer.",
    cta: "Tell us your task",
    href: "/?topic=robotics#contact",
  },
};

/* ---------- Data-source integration graphic: eight feeds converge into the twin ---------- */
function SourceFlow() {
  const nodes = Array.from({ length: 8 }, (_, i) => 18 + i * 52);
  return (
    <svg viewBox="0 0 420 120" className="h-24 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="src-flow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3ee0ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2f6bff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {nodes.map((x, i) => (
        <g key={x}>
          <path d={`M${x} 14 C ${x} 60, 210 60, 210 104`} fill="none" stroke="url(#src-flow)" strokeWidth="1" strokeOpacity="0.45" />
          <path
            d={`M${x} 14 C ${x} 60, 210 60, 210 104`}
            fill="none"
            stroke="#3ee0ff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="3 22"
            className="twin-flow"
            style={{ animationDuration: `${1.6 + (i % 4) * 0.35}s` }}
          />
          <rect x={x - 7} y={4} width="14" height="14" rx="3" fill="#0a1830" stroke="#3ee0ff" strokeOpacity="0.7" />
          <circle cx={x} cy={11} r="2.2" fill="#3ee0ff" className="blink" style={{ animationDelay: `${i * 0.2}s` }} />
        </g>
      ))}
      <circle cx="210" cy="106" r="10" fill="#0a1830" stroke="#3ee0ff" />
      <circle cx="210" cy="106" r="4" fill="#3ee0ff" />
    </svg>
  );
}

/* ---------- Physical AI diagrams ---------- */

/* Live 3D vision cell: units ride the belt under the camera; defects get boxed and tagged */
function InspectionView({ on = true }: { on?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0f1a2b]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" aria-hidden="true" />
      <SceneMount
        scene="inspection"
        eager
        className="absolute inset-0"
        poster="/scenes/inspection.webp"
        paused={!on}
        props={{
          tone: "section",
          tag: {
            text: "Defect",
            className: "rounded bg-[#f5a524] px-2 py-0.5 text-[0.7rem] font-semibold text-[#1a1408] shadow-[0_6px_16px_-6px_rgba(245,165,36,0.8)]",
          },
        }}
      />
      {/* Camera HUD */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(15,26,43,0.65))]" aria-hidden="true" />
      <div className="absolute inset-x-4 top-3.5 flex items-center justify-between text-[0.75rem]">
        <span className="rounded-md bg-[#0f1a2b]/85 px-2 py-1 text-[#c9d2e0]">Camera 02, line 1</span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0f1a2b]/85 px-2 py-1 font-semibold text-[#5fd4a0]">
          <span className="blink h-1.5 w-1.5 rounded-full bg-[#5fd4a0]" aria-hidden="true" />
          Live
        </span>
      </div>
      <p className="absolute inset-x-4 bottom-3 text-[0.72rem] text-[#8b9ab0]">Placeholder: swap for real footage of the vision system</p>
    </div>
  );
}

/* Live 3D site: the robot drives its patrol loop; blind spots turn green once covered */
function PatrolMap({ on = true }: { on?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f3f7f5]">
      <SceneMount scene="patrol" eager className="absolute inset-0" poster="/scenes/patrol.webp" paused={!on} props={{ tone: "section", labels: ["Warehouse A", "Warehouse B", "Gate", "Loading bay"] }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f3f7f5] to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-4 text-[0.72rem] text-[#4a5868]">
        <span className="inline-flex items-center gap-2">
          <span className="h-0 w-5 border-t-2 border-dashed border-[#0b6e50]" aria-hidden="true" />
          Dashed: robot patrol route
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f5a524]/50 ring-1 ring-[#f5a524]" aria-hidden="true" />
          Shaded: blind spots
        </span>
      </div>
    </div>
  );
}

/* Two capabilities, one stage: selectors on the left drive a large 3D-crossfading view */
const MODE_MS = 8000;
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
const motionAllowed = () => window.matchMedia(MOTION_QUERY).matches;
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

function PhysicalShowcase() {
  const modes = [
    { item: physical.inspection, icon: ScanEye, View: InspectionView },
    { item: physical.patrol, icon: Shield, View: PatrolMap },
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const motionOk = useSyncExternalStore(subscribeMotion, motionAllowed, () => false);
  useEffect(() => {
    if (!motionOk || paused) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % 2), MODE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, motionOk]);
  const current = modes[active];
  const CurrentIcon = current.icon;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Header row: headline left, mode switch right */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-2 pr-4 text-sm font-semibold text-[#0b6e50] shadow-[0_10px_24px_-18px_rgba(20,48,79,0.6)] ring-1 ring-[#14304f]/10">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0b6e50] text-white" aria-hidden="true">
              <ScanEye size={11} />
            </span>
            {physical.eyebrow}
          </p>
          <h3 className="display mt-6 max-w-[26ch] text-[clamp(1.95rem,1.4rem+1.9vw,3.1rem)] leading-[1.08] tracking-tight text-[#14304f]">{physical.title}</h3>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5 lg:flex lg:justify-end">
          <div role="tablist" aria-label={physical.eyebrow} className="relative grid w-full grid-cols-2 rounded-2xl bg-white p-1.5 shadow-[0_18px_40px_-28px_rgba(20,48,79,0.6)] ring-1 ring-[#14304f]/10 lg:w-auto">
            <span
              className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-[#0b6e50] shadow-[0_10px_22px_-10px_rgba(11,110,80,0.9)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ transform: `translateX(${active * 100}%)` }}
              aria-hidden="true"
            />
            {modes.map((m, i) => {
              const on = i === active;
              const Icon = m.icon;
              return (
                <button
                  key={m.item.title}
                  type="button"
                  role="tab"
                  id={`pai-tab-${i}`}
                  aria-selected={on}
                  aria-controls="pai-panel"
                  onClick={() => setActive(i)}
                  className={`relative z-10 flex items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-[0.95rem] font-semibold transition-colors duration-300 sm:px-5 ${
                    on ? "text-white" : "text-[#14304f]/60 hover:text-[#14304f]"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span className="text-left sm:whitespace-nowrap">{m.item.title}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Console: live view + details in one frame */}
      <Reveal delay={150} className="mt-12">
        <div className="relative rounded-[36px] bg-gradient-to-br from-white via-white to-[#e8f5ef] p-2.5 shadow-[0_60px_100px_-60px_rgba(20,48,79,0.7)] ring-1 ring-[#14304f]/10">
          <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1fr)_25rem]">
            {/* Stage */}
            <div className="relative h-[18rem] overflow-hidden rounded-[28px] [perspective:1400px] sm:h-[28rem] lg:h-[32rem]">
              {modes.map((m, i) => {
                const on = i === active;
                const View = m.View;
                return (
                  <div
                    key={m.item.title}
                    className="absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? "none" : `translateZ(-80px) rotateY(${i < active ? -14 : 14}deg) scale(0.92)`,
                      pointerEvents: on ? "auto" : "none",
                    }}
                    aria-hidden={!on}
                  >
                    <View on={on} />
                  </div>
                );
              })}
              {/* Viewfinder corners */}
              <div className="pointer-events-none absolute inset-3 z-10" aria-hidden="true">
                {["left-0 top-0 border-l-2 border-t-2 rounded-tl-xl", "right-0 top-0 border-r-2 border-t-2 rounded-tr-xl", "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl", "bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl"].map((c) => (
                  <span key={c} className={`absolute h-6 w-6 border-[#5fd4a0]/70 ${c}`} />
                ))}
              </div>
            </div>

            {/* Details */}
            <div id="pai-panel" role="tabpanel" aria-labelledby={`pai-tab-${active}`} className="relative flex flex-col overflow-hidden rounded-[28px] bg-white p-7 ring-1 ring-[#14304f]/[0.06] sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0b6e50]/[0.08] glow-soft" aria-hidden="true" />
              {/* Radar sweep */}
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72" aria-hidden="true">
                {[0, 1, 2].map((k) => (
                  <span key={k} className="absolute rounded-full border border-dashed border-[#0b6e50]/30" style={{ inset: `${k * 16}%` }} />
                ))}
                <span className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,rgba(11,110,80,0.22),transparent_25%)] [animation-duration:6s] motion-reduce:animate-none" />
              </div>
              <div key={active} className="enter-up relative flex flex-1 flex-col">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0b6e50] text-white shadow-[0_14px_28px_-12px_rgba(11,110,80,0.9)]" aria-hidden="true">
                  <CurrentIcon size={24} />
                </span>
                <p className="mt-6 text-[1.08rem] leading-relaxed text-[#4a5868]">{current.item.text}</p>
                <div className="mt-auto pt-8">
                  <Link
                    href={current.item.href}
                    className="group/l flex w-full items-center justify-between gap-3 rounded-xl border border-[#0b6e50]/20 bg-[#e8f5ef] px-5 py-4 font-semibold text-[#0b6e50] transition-colors hover:border-[#0b6e50]/50"
                  >
                    {current.item.cta}
                    <ArrowRight size={18} className="shrink-0 transition-transform duration-300 group-hover/l:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Auto-advance progress */}
              <div className="relative mt-6 flex items-center gap-3" aria-hidden="true">
                {modes.map((m, i) => (
                  <span key={m.item.title} className="relative h-1 flex-1 overflow-hidden rounded-full bg-[#14304f]/10">
                    {i === active &&
                      (motionOk ? (
                        <span key={active} className="pai-progress absolute inset-0 block origin-left bg-[#0b6e50]" style={{ animationDuration: `${MODE_MS}ms`, animationPlayState: paused ? "paused" : "running" }} />
                      ) : (
                        <span className="absolute inset-0 bg-[#0b6e50]" />
                      ))}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export function Pillars() {
  const [layer, setLayer] = useState(4); // index into twin.layers (4 = Layer 1, preselected)
  const picked = twin.layers[layer];

  return (
    <section id="robotics" className="cv-auto [contain-intrinsic-size:auto_4166px] lg:[contain-intrinsic-size:auto_2557px] relative isolate overflow-hidden text-white">
      {/* ===================== Light band: Digital Twin ===================== */}
      <div id="digital-twin" data-header-light className="relative scroll-mt-[4.5rem] bg-white pb-20 pt-24 text-[#14304f] sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-blueprint-light [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          {/* Intro */}
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#e8f5ef] px-3.5 py-1.5 text-sm font-semibold text-[#0b6e50]">
                <BrainCircuit size={16} aria-hidden="true" /> {twin.eyebrow}
              </p>
              <h3 className="display mt-6 max-w-[22ch] text-[clamp(1.9rem,1.4rem+1.8vw,3rem)] leading-[1.08] text-[#14304f]">{twin.title}</h3>
            </div>

            {/* Outcome first, data second: the approach as a small flow */}
            <div className="group relative overflow-hidden rounded-[22px] border border-[#14304f]/10 bg-gradient-to-br from-white to-[#f3faf6] p-6 shadow-[0_24px_50px_-38px_rgba(20,48,79,0.5)] sm:p-7 lg:col-span-5">
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0b6e50] to-[#2e9c74]" aria-hidden="true" />
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b6e50] text-white shadow-[0_8px_18px_-8px_rgba(11,110,80,0.8)]">
                  <Target size={18} />
                </span>
                <svg viewBox="0 0 120 12" className="h-3 flex-1" preserveAspectRatio="none">
                  <line x1="0" y1="6" x2="120" y2="6" stroke="#0b6e50" strokeOpacity="0.2" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <line x1="0" y1="6" x2="120" y2="6" stroke="#0b6e50" strokeWidth="2" strokeDasharray="4 8" className="twin-flow" vectorEffect="non-scaling-stroke" />
                </svg>
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#14304f]/15 bg-white text-[#14304f] transition-colors duration-500 group-hover:border-[#0b6e50]/40 group-hover:text-[#0b6e50]">
                  <Database size={18} />
                </span>
              </div>
              <p className="mt-5 text-[1.12rem] leading-relaxed text-[#4a5868]">{twin.text}</p>
            </div>
          </Reveal>

          {/* Outcomes */}
          <Reveal className="mt-10">
            <ul className="grid gap-px overflow-hidden rounded-[24px] border border-[#14304f]/10 bg-[#14304f]/10 sm:grid-cols-2 xl:grid-cols-5">
              {twin.outcomes.map((o, i) => {
                const Icon = o.icon;
                return (
                  <li
                    key={o.title}
                    className={`group relative flex gap-4 bg-white p-6 transition-colors duration-500 hover:bg-[#f6fbf8] xl:flex-col ${
                      i === twin.outcomes.length - 1 ? "sm:col-span-2 xl:col-span-1" : ""
                    }`}
                  >
                    <span className="absolute inset-x-0 top-0 h-[3px] bg-[#0b6e50] opacity-80 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8f5ef] text-[#0b6e50]" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block font-semibold text-[#14304f]">{o.title}</span>
                      <span className="mt-1 block text-[0.92rem] leading-snug text-[#4a5868]">{o.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Five-layer architecture */}
          <Reveal className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col lg:col-span-5">
              <h4 className="font-display text-[1.6rem] font-bold leading-tight text-[#14304f] [font-stretch:108%]">{twin.pickTitle}</h4>
              <p className="mt-2 text-[1rem] leading-relaxed text-[#4a5868]">{twin.pickText}</p>

              <ul className="mt-6 space-y-2" role="list">
                {twin.layers.map((l, i) => {
                  const on = i === layer;
                  return (
                    <li key={l.n} className="relative">
                      <button
                        type="button"
                        onClick={() => setLayer(i)}
                        onMouseEnter={() => setLayer(i)}
                        aria-pressed={on}
                        className={`relative isolate flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                          on ? "border-[#14304f] bg-[#14304f]" : "border-[#14304f]/10 bg-[#f6f8fb] hover:border-[#14304f]/30"
                        }`}
                      >
                        <span className={`w-14 shrink-0 text-[0.76rem] font-medium ${on ? "text-white/70" : "text-[#4a5868]"}`}>
                          Layer {l.n}
                        </span>
                        <span className={`text-[0.98rem] font-semibold leading-snug ${on ? "text-white" : "text-[#14304f]"}`}>{l.name}</span>
                        <span className={`ml-auto text-right text-[0.85rem] ${on ? "text-white/80" : "text-[#4a5868]"}`}>{l.tag}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <Link
                href={twin.href}
                className="btn mt-9 self-start bg-[#0b6e50] text-white shadow-[0_12px_28px_-14px_rgba(11,110,80,0.8)] hover:bg-[#095c43]"
              >
                {twin.cta} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="relative h-full min-h-[44rem] overflow-hidden rounded-[32px] bg-[#14304f] shadow-[0_40px_80px_-40px_rgba(20,48,79,0.6)] sm:min-h-[38rem]">
                <Image
                  src={brainImg}
                  alt={twin.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover opacity-[0.12] mix-blend-screen"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(95,212,160,0.16),transparent_65%)]" aria-hidden="true" />

                {/* Picked layer */}
                <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#14304f] via-[#14304f]/90 to-transparent px-6 pb-10 pt-6 sm:px-8">
                  <p className="text-[0.85rem] font-medium text-[#8fb3d9]">
                    You picked layer {picked.n}: {picked.name}
                  </p>
                  {picked.detail && (
                    <div key={picked.n} className="enter-up mt-3">
                      <p className="font-display text-[1.5rem] font-bold leading-snug text-white [font-stretch:105%]">{picked.detail.quote}</p>
                      <p className="mt-4 border-t border-white/10 pt-3 text-[0.82rem] font-semibold text-[#5fd4a0]">{twin.detailLabel}</p>
                      <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed text-white/85">{picked.detail.text}</p>
                    </div>
                  )}
                </div>

                <SceneMount
                  scene="layers"
                  poster="/scenes/layers.webp"
                  props={{ selected: 4 - layer, onSelect: (s: number) => setLayer(4 - s) }}
                  className="absolute inset-x-0 bottom-44 top-56 sm:bottom-36 sm:top-24"
                />

                <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-[#0f2742]/95 px-5 pb-5 pt-3 sm:px-8">
                  <SourceFlow />
                  <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5">
                    <span className="mr-1 text-[0.82rem] font-semibold text-white/80">{twin.sourcesLabel}</span>
                    {twin.sources.map((s) => (
                      <span key={s} className="rounded-md border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[0.76rem] text-white/85">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ===================== Physical AI ===================== */}
      <div data-header-light className="relative overflow-hidden border-t border-[#14304f]/[0.06] bg-[#f7f9fb] py-24 text-[#14304f] sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(20,48,79,0.08)_1px,transparent_1.3px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" aria-hidden="true" />
        <div className="absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-[#0b6e50]/[0.07] glow-soft" aria-hidden="true" />

        <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <PhysicalShowcase />

          {/* Anything else: a closing card */}
          <Reveal className="mt-8">
            <div className="group relative overflow-hidden rounded-[30px] bg-white p-6 shadow-[0_30px_60px_-44px_rgba(20,48,79,0.6)] ring-1 ring-[#14304f]/10 sm:p-8">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(rgba(20,48,79,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,48,79,0.05)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden="true" />
              <span className="absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#0b6e50] to-[#5fd4a0]" aria-hidden="true" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#e8f5ef] text-[#0b6e50] ring-1 ring-[#0b6e50]/20 transition-transform duration-500 group-hover:rotate-[-12deg]" aria-hidden="true">
                    <Wrench size={22} />
                  </span>
                  <div>
                    <p className="font-display text-[1.3rem] font-bold leading-snug text-[#14304f] [font-stretch:104%]">{physical.other.title}</p>
                    <p className="mt-1.5 max-w-[60ch] text-[0.98rem] leading-relaxed text-[#0b6e50]">{physical.other.text}</p>
                  </div>
                </div>
                <Link href={physical.other.href} className="btn group/b shrink-0 self-start bg-[#14304f] text-white shadow-[0_14px_28px_-14px_rgba(20,48,79,0.9)] hover:bg-[#0b6e50] md:self-auto">
                  {physical.other.cta} <ArrowRight size={18} className="transition-transform duration-300 group-hover/b:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
