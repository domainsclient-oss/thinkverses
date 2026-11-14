"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Crosshair,
  Gauge,
  Leaf,
  Radio,
  RefreshCcw,
  ShieldCheck,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { SceneMount } from "../three/SceneMount";
import roboticsImg from "../../../public/home/RoboticAI.webp";

const solutionHighlights = [
  {
    key: "twin",
    title: "Digital Twin",
    role: "Think",
    icon: BrainCircuit,
    href: "/#contact",
    cta: "Book a maturity assessment call",
    text: "A digital twin is worth it only if it changes what happens on your plant floor. So we start with the outcome you want, and then work back to the data you need for it.",
    highlights: [
      { title: "Higher output", icon: TrendingUp },
      { title: "Less downtime", icon: Wrench },
      { title: "Lower cost", icon: BarChart3 },
      { title: "Consistent quality", icon: ShieldCheck },
      { title: "Lower emissions", icon: Leaf },
      { title: "Connects DCS, SCADA, PLC, MES, ERP, QMS and IoT sensors", icon: Activity },
    ],
  },
  {
    key: "robotics",
    title: "Robotics AI",
    role: "Act",
    icon: Bot,
    image: roboticsImg,
    alt: "Humanoid robot with a tablet inspecting parts on a production line while another robot patrols the floor",
    href: "/#contact",
    cta: "Tell us your task",
    text: "Our robots inspect the line and patrol the site, and they report what they find as it happens.",
    highlights: [
      { title: "Visual inspection", icon: Crosshair },
      { title: "Every defect flagged before the unit moves on", icon: Gauge },
      { title: "Security patrol", icon: ShieldCheck },
      { title: "Routes and blind spots mapped with you", icon: Radio },
      { title: "Night patrols alongside your security systems", icon: Bot },
      { title: "Other tasks, such as lifting or packing", icon: RefreshCcw },
    ],
  },
];

// Interactive twin of the pumping station; readouts are illustrative, not customer figures.
function TwinView() {
  const [selected, setSelected] = useState(2);
  return (
    <div className="absolute inset-0 bg-[#040811]">
      <div className="absolute inset-0 bg-tech-grid opacity-40" aria-hidden="true" />
      <SceneMount
        scene="station"
        label="Wireframe digital twin of an industrial plant with live sensor points"
        props={{ mode: "twin", selected, onSelect: setSelected }}
        className="absolute inset-0"
      />
      <div aria-hidden="true" className="pointer-events-none">
        <span className="glass absolute right-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-cyan sm:right-7 sm:top-7">
          <span className="relative flex h-2 w-2">
            <span className="pulse absolute inset-0 rounded-full bg-cyan" />
            <span className="relative h-2 w-2 rounded-full bg-cyan" />
          </span>
          Live sensor sync
        </span>
        <div className="glass-strong absolute left-5 top-[30%] hidden rounded-xl px-3.5 py-2.5 text-white sm:left-7 sm:block">
          <p className="mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/50">Tank T-1 · Temp</p>
          <p className="mt-0.5 font-display text-lg font-bold">
            72.4°C <span className="text-xs font-semibold text-cyan">Normal</span>
          </p>
        </div>
        <div className="glass-strong absolute bottom-16 left-5 hidden rounded-xl px-3.5 py-2.5 text-white sm:left-7 sm:block">
          <p className="mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/50">Predicted maintenance</p>
          <p className="mt-0.5 font-display text-lg font-bold">
            Conveyor C-2 <span className="text-xs font-semibold text-amber">in 14 days</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Half({ solution, index }: { solution: (typeof solutionHighlights)[number]; index: number }) {
  const robotics = solution.key === "robotics";
  const RoleIcon = solution.icon;
  return (
    <article className={`relative flex flex-col ${robotics ? "bg-[#070d1b]" : "bg-[#060b17]"}`}>
      <div className="group relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
        {solution.image ? (
          <>
            <Image src={solution.image} alt={solution.alt ?? ""} fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="zoom-img object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-40" aria-hidden="true" />
          </>
        ) : (
          <TwinView />
        )}
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${robotics ? "from-[#070d1b]" : "from-[#060b17]"} via-transparent to-transparent`} />
        <span className="glass pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan sm:left-8 sm:top-7">
          <RoleIcon size={14} aria-hidden="true" /> {String(index + 1).padStart(2, "0")} · {solution.role}
        </span>
      </div>

      <div className="relative -mt-12 flex flex-1 flex-col px-6 pb-8 text-white sm:px-10 sm:pb-10 xl:px-12">
        <h3 className="display h-section">{solution.title}</h3>
        <p className="mt-5 text-[1.03rem] leading-relaxed text-white/65">{solution.text}</p>

        <div className="mt-9 flex items-center gap-4">
          <p className="kicker shrink-0">Key Highlights</p>
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
        </div>

        <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
          {solution.highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <li key={h.title} className="group/h flex items-center gap-3 border-b border-white/[0.07] py-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyan/10 text-cyan transition-colors duration-300 group-hover/h:bg-cyan group-hover/h:text-ink">
                  <Icon size={15} aria-hidden="true" />
                </span>
                <span className="flex-1 text-[0.95rem] font-semibold leading-snug text-white/85">{h.title}</span>
                <span className="mono text-xs font-bold tabular-nums text-white/25">{String(i + 1).padStart(2, "0")}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-10">
          <Link href={solution.href} className={`btn ${robotics ? "btn-ghost" : "btn-primary"}`}>
            {solution.cta} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Connector() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden -translate-x-1/2 lg:block" aria-hidden="true">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan/50 to-transparent" />
      <div className="beam absolute inset-y-0 left-1/2 w-px -translate-x-1/2 [&::after]:rotate-90" />
      <div className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid h-24 w-24 place-items-center">
          <div className="spin-slow absolute inset-0 rounded-full border border-dashed border-cyan/50" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan via-volt to-[#1f3a72] opacity-50 blur-md" />
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-ink font-display text-3xl font-bold text-white ring-1 ring-white/20">+</div>
        </div>
        <p className="glass mt-3 whitespace-nowrap rounded-full px-3 py-1 text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/80">
          Think <span className="text-cyan">→</span> Act
        </p>
      </div>
    </div>
  );
}

export function DigitalTwin() {
  return (
    <section id="digital-twin" className="relative isolate overflow-hidden surface-void py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-tech-grid opacity-30 mask-fade-y" aria-hidden="true" />
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display h-section lg:col-span-8">
            Digital Twin <span className="text-brand-gradient-light">+</span> Robotics AI
          </h2>
          <p className="lede text-white/65 lg:col-span-4">
            One system, two strengths: the Digital Twin works out what should happen, and Robotics AI makes it happen.
          </p>
        </Reveal>

        <Reveal delay={100} className="relative mt-14">
          <div className="ring-metal relative grid overflow-hidden rounded-[36px] border border-white/[0.06] shadow-[0_60px_120px_-60px_rgba(47,107,255,0.45)] lg:grid-cols-2">
            {solutionHighlights.map((solution, i) => (
              <Half key={solution.key} solution={solution} index={i} />
            ))}
            <Connector />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
