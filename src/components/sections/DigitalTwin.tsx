import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  Bot,
  BrainCircuit,
  Crosshair,
  Gauge,
  Lightbulb,
  PlayCircle,
  Radio,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { TwinScene } from "../TwinScene";
import { solutionPath } from "@/lib/locations";
import roboticsImg from "../../../public/images/robotics-arms.jpg";

const solutionHighlights = [
  {
    key: "twin",
    title: "Digital Twin",
    role: "Think",
    icon: BrainCircuit,
    href: solutionPath("digital-twin", "uae"),
    cta: "Explore Digital Twin Solutions",
    text: "A Digital Twin is a virtual replica of a physical asset, process, or system that continuously receives real-time data from connected devices and sensors. It enables organizations to monitor performance, predict issues, optimize operations, and make data-driven decisions with greater accuracy and efficiency.",
    highlights: [
      { title: "Real-Time Monitoring", icon: Activity },
      { title: "Predictive Maintenance", icon: Wrench },
      { title: "Operational Optimization", icon: BarChart3 },
      { title: "Data-Driven Insights", icon: Lightbulb },
      { title: "Performance Simulation", icon: PlayCircle },
      { title: "Risk Reduction", icon: ShieldCheck },
      { title: "Improved Asset Lifecycle", icon: RefreshCcw },
      { title: "Enhanced Decision Making", icon: Brain },
    ],
  },
  {
    key: "robotics",
    title: "Robotics",
    role: "Act",
    icon: Bot,
    image: roboticsImg,
    alt: "Industrial robotic arms assembling a car body on a production line",
    href: "/?topic=robotics#contact",
    cta: "Discuss a Robotics Project",
    text: "Robotics combines intelligent automation, artificial intelligence, and advanced control systems to perform complex tasks with precision, efficiency, and consistency. From industrial automation to autonomous robots, robotics solutions help businesses streamline operations, improve productivity, and enhance workplace safety.",
    highlights: [
      { title: "Intelligent Automation", icon: Bot },
      { title: "Autonomous Operations", icon: Radio },
      { title: "Enhanced Productivity", icon: TrendingUp },
      { title: "Precision & Accuracy", icon: Crosshair },
      { title: "Real-Time Decision Making", icon: Gauge },
      { title: "Improved Workplace Safety", icon: ShieldCheck },
      { title: "AI-Powered Capabilities", icon: Sparkles },
      { title: "Scalable Robotic Solutions", icon: RefreshCcw },
    ],
  },
];

// Illustrative readouts showing the twin syncing with live sensor data; not customer figures.
function TwinView() {
  return (
    <div className="absolute inset-0 bg-ink">
      <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 grid place-items-center pt-6">
        <TwinScene className="h-[112%] w-auto max-w-none drop-shadow-[0_0_24px_rgba(255, 255, 255,0.3)]" />
      </div>
      <div aria-hidden="true">
        <span className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-ink/70 px-3 py-1.5 text-xs font-semibold text-cyan backdrop-blur sm:right-8 sm:top-8">
          <span className="relative flex h-2 w-2">
            <span className="pulse absolute inset-0 rounded-full bg-cyan" />
            <span className="relative h-2 w-2 rounded-full bg-cyan" />
          </span>
          Live sensor sync
        </span>
        <div className="absolute left-6 top-[38%] hidden rounded-xl border border-white/15 bg-ink/75 px-3.5 py-2.5 text-white shadow-lg backdrop-blur sm:left-8 sm:block">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/50">Tank T-1 · Temp</p>
          <p className="mt-0.5 font-display text-lg font-bold">
            72.4°C <span className="text-xs font-semibold text-cyan">Normal</span>
          </p>
        </div>
        <div className="absolute bottom-16 right-6 hidden rounded-xl border border-violet/40 bg-ink/75 px-3.5 py-2.5 text-white shadow-lg backdrop-blur sm:right-8 sm:block">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/50">Predicted maintenance</p>
          <p className="mt-0.5 font-display text-lg font-bold">
            Conveyor C-2 <span className="text-xs font-semibold text-[#c9bcff]">in 14 days</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Half({ solution, index }: { solution: (typeof solutionHighlights)[number]; index: number }) {
  const dark = solution.key === "robotics";
  const RoleIcon = solution.icon;
  return (
    <article className={`relative flex flex-col ${dark ? "bg-graphite text-white" : "bg-white text-ink"}`}>
      {dark && <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-violet/20 blur-[100px]" aria-hidden="true" />}

      {/* Image header */}
      <div className="group relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
        {solution.image ? (
          <Image
            src={solution.image}
            alt={solution.alt ?? ""}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="zoom-img object-cover"
          />
        ) : (
          <TwinView />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${dark ? "from-graphite" : "from-white"} via-transparent to-ink/30`} />
        <span
          className={`absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur sm:left-10 sm:top-8 ${
            dark ? "border-violet/50 bg-ink/50 text-[#c9bcff]" : "border-cyan/50 bg-ink/50 text-cyan"
          }`}
        >
          <RoleIcon size={14} aria-hidden="true" /> {String(index + 1).padStart(2, "0")} · {solution.role}
        </span>
      </div>

      <div className="relative -mt-14 flex flex-1 flex-col px-6 pb-8 sm:px-10 sm:pb-10 xl:px-12">
        <h3 className="display h-section">{solution.title}</h3>
        <p className={`mt-5 text-[1.03rem] leading-relaxed ${dark ? "text-white/70" : "text-slate"}`}>{solution.text}</p>

        <div className="mt-9 flex items-center gap-4">
          <p className={`shrink-0 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/50" : "text-slate"}`}>
            Key Highlights
          </p>
          <span className={`h-px flex-1 ${dark ? "bg-white/10" : "bg-line"}`} aria-hidden="true" />
        </div>

        <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
          {solution.highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <li
                key={h.title}
                className={`group/h flex items-center gap-3 border-b py-3 ${dark ? "border-white/10" : "border-line"}`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors duration-300 ${
                    dark
                      ? "bg-violet/20 text-[#c9bcff] group-hover/h:bg-violet group-hover/h:text-white"
                      : "bg-cyan-deep/10 text-cyan-deep group-hover/h:bg-cyan-deep group-hover/h:text-white"
                  }`}
                >
                  <Icon size={15} aria-hidden="true" />
                </span>
                <span className="flex-1 text-[0.95rem] font-semibold leading-snug">{h.title}</span>
                <span className={`font-display text-xs font-bold tabular-nums ${dark ? "text-white/25" : "text-ink/20"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-10">
          <Link href={solution.href} className={`btn ${dark ? "btn-primary" : "btn-dark"}`}>
            {solution.cta} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// The node joining the two halves: decisions flow from the twin to the robots.
function Connector() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden -translate-x-1/2 lg:block" aria-hidden="true">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-deep/50 to-transparent" />
      <div className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid h-24 w-24 place-items-center">
          <div className="spin-slow absolute inset-0 rounded-full border border-dashed border-cyan/50" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan via-volt to-[#0056a7] opacity-40 blur-md" />
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-ink font-display text-3xl font-bold text-white ring-1 ring-white/20">
            +
          </div>
        </div>
        <p className="mt-3 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/80 ring-1 ring-white/15">
          Think <span className="text-cyan">→</span> Act
        </p>
      </div>
    </div>
  );
}

export function DigitalTwin() {
  return (
    <section id="digital-twin" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="absolute inset-0 bg-blueprint-light [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display h-section lg:col-span-8">
            Digital Twins{" "}
            <span className="bg-gradient-to-r from-cyan-deep via-volt to-[#0056a7] bg-clip-text text-transparent">+</span>{" "}
            Robotics for Growth
          </h2>
          <p className="lede text-slate lg:col-span-4">
            One system, two strengths: the Digital Twin works out what should happen, and Robotics makes it happen.
          </p>
        </Reveal>

        <Reveal delay={100} className="relative mt-14">
          <div className="relative grid overflow-hidden rounded-[36px] border border-line shadow-[0_50px_100px_-50px_rgba(10,22,48,0.55)] lg:grid-cols-2">
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
