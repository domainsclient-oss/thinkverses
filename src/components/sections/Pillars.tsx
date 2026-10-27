import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Bot } from "lucide-react";
import { Reveal } from "../Reveal";
import brainImg from "../../../public/images/twin-brain.jpg";
import armsImg from "../../../public/images/robotics-arms.jpg";

const pillars = [
  {
    key: "twin",
    icon: BrainCircuit,
    name: "Digital Twin",
    role: "The Brain Decides",
    text: "A living, learning model of the real world simulating scenarios, predicting outcomes, and making decisions before a single physical action is taken. The Digital Twin is where intelligence is formed: perceiving context, reasoning through possibilities, and directing what happens next.",
    points: ["Perceives context", "Reasons through possibilities", "Directs what happens next"],
    image: brainImg,
    alt: "Person standing before a wall of flowing blue data visualisation",
    accent: "text-cyan",
    link: "text-white",
    ring: "border-cyan/30",
    panel: "bg-ink",
    href: "/#digital-twin",
    cta: "See Digital Twin capabilities",
  },
  {
    key: "robotics",
    icon: Bot,
    name: "Robotics",
    role: "The Body that Acts",
    text: "The physical extension of that intelligence translating decisions into motion, manipulation, and real-world execution. Robotics is where thought becomes action, closing the loop between digital cognition and physical outcome.",
    points: ["Motion and manipulation", "Real-world execution", "Closes the loop between digital cognition and physical outcome"],
    image: armsImg,
    alt: "Industrial robotic arms assembling a car body on a production line",
    accent: "text-[#a996ff]",
    link: "text-[#a996ff]",
    ring: "border-violet/40",
    panel: "bg-graphite",
    href: "/?topic=robotics#contact",
    cta: "Discuss a robotics project",
  },
];

const capabilities = [
  "Building intelligent digital replicas of real-world assets and operations.",
  "Combining AI, IoT, and analytics to deliver actionable business insights.",
  "Helping organizations optimize performance, efficiency, and reliability.",
  "Transforming live operational data into smarter decisions.",
  "Empowering industries with scalable, sustainable, and predictive solutions.",
];

function Pillar({ p }: { p: (typeof pillars)[number] }) {
  const Icon = p.icon;
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] ${p.panel} text-white shadow-[0_30px_60px_-30px_rgba(10,22,48,0.55)]`}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" placeholder="blur" className="zoom-img object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <p className={`absolute bottom-5 left-6 inline-flex items-center gap-2 rounded-full border ${p.ring} bg-black/40 px-3.5 py-1.5 text-sm backdrop-blur ${p.accent}`}>
          <Icon size={16} aria-hidden="true" /> {p.role}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="display h-sub">{p.name}</h3>
        <p className="mt-3 text-white/70">{p.text}</p>
        <ul className="mt-6 space-y-2.5">
          {p.points.map((pt) => (
            <li key={pt} className="flex items-center gap-3 text-[0.97rem] text-white/85">
              <span className={`h-px w-5 bg-current ${p.accent}`} aria-hidden="true" />
              {pt}
            </li>
          ))}
        </ul>
        <Link href={p.href} className={`mt-auto inline-flex items-center gap-2 pt-8 font-semibold ${p.link}`}>
          <span className="link-draw">{p.cta}</span> <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center gap-6 py-2 lg:flex-col lg:gap-10 lg:py-0" aria-hidden="true">
      {[
        { label: "Decisions", from: "#0a1630", to: "#0056a7", flip: false },
        { label: "Execution data", from: "#0056a7", to: "#0a1630", flip: true },
      ].map((a, i) => (
        <div key={a.label} className="flex flex-col items-center gap-2 text-center">
          <svg viewBox="0 0 120 24" className={`my-9 h-6 w-24 rotate-90 lg:my-0 lg:rotate-0 ${a.flip ? "-scale-x-100 lg:-scale-x-100" : ""}`}>
            <defs>
              <linearGradient id={`pillar-g-${i}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="120" y2="0">
                <stop offset="0" stopColor={a.from} />
                <stop offset="1" stopColor={a.to} />
              </linearGradient>
            </defs>
            <path d="M4 12h104" stroke={`url(#pillar-g-${i})`} strokeWidth="2" strokeDasharray="5 5" className="twin-flow" />
            <path d="M102 5l10 7-10 7" fill="none" stroke={a.to} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs font-medium text-slate">{a.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Pillars() {
  return (
    <section id="robotics" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="absolute inset-0 bg-blueprint-light [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display h-section lg:col-span-7">Two Pillars, One Intelligence</h2>
          <p className="lede text-slate lg:col-span-5">
            Together, the Digital Twin and Robotics form a single system:{" "}
            <strong className="font-semibold text-ink">think, then move.</strong> One pillar decides, the other
            delivers.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_8.5rem_1fr] lg:gap-0">
          <Reveal>
            <Pillar p={pillars[0]} />
          </Reveal>
          <Connector />
          <Reveal delay={120}>
            <Pillar p={pillars[1]} />
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <ol className="grid h-full gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 xl:grid-cols-5">
            {capabilities.map((c, i) => (
              <li
                key={c}
                className={`flex gap-4 bg-white p-6 xl:flex-col transition-colors hover:bg-paper sm:p-7 ${
                  i === capabilities.length - 1 ? "sm:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <span className="font-display text-sm font-bold text-cyan-deep tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.05rem] font-medium leading-snug text-ink">{c}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
