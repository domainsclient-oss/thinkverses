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
    text: "A digital twin is worth it only if it changes what happens on your plant floor. So we start with the outcome you want, and then work back to the data you need for it. “We only see problems after they happen.” “Our data sits in SCADA, ERP and spreadsheets.” “The data is there, but answers reach us too late.”",
    points: [
      "Layer 5 · Business value: output, cost, risk",
      "Layer 4 · Serve and decide: answers, alerts",
      "Layer 3 · Model and analyze: foresight",
      "Layer 2 · Ingest and store: one source of truth",
      "Layer 1 · Foundation: every project starts here",
      "Data sources we connect: DCS, SCADA, PLC, MES, ERP, QMS, IoT sensors, spreadsheets",
    ],
    image: brainImg,
    alt: "Person standing before a wall of flowing blue data visualization",
    accent: "text-cyan",
    link: "text-white",
    ring: "border-cyan/30",
    panel: "bg-ink",
    href: "/?topic=digital-twin#contact",
    cta: "Book a maturity assessment call",
  },
  {
    key: "robotics",
    icon: Bot,
    name: "Physical AI",
    role: "The Body That Acts",
    text: "Our robots inspect the line and patrol the site, and they report what they find as it happens. “Defects still reach customers, and manual checks slip on night shifts.” “The site is too big to watch every corner, especially at night.”",
    points: [
      "Visual inspection · For quality, production and plant heads. The camera checks every unit on the line, draws a box around each defect it finds, and flags it before the unit moves on.",
      "Security patrol · For security heads and facility managers. We walk the site with you, map the routes and blind spots, and the robot patrols them through the night alongside your existing security systems.",
      "Have a different task, such as lifting or packing? Tell us the task, the site and how often it runs. Our team checks the fit and gives you an honest answer.",
    ],
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
  "Higher output: fewer stoppages mean more production hours.",
  "Less downtime: repairs are planned before a breakdown.",
  "Lower cost: energy and spares are used where they matter.",
  "Consistent quality: drift is caught before it becomes a reject.",
  "Lower emissions: you can see and act on energy waste.",
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
          <h2 className="display h-section lg:col-span-7">Which of these sounds most like your operation today?</h2>
          <p className="lede text-slate lg:col-span-5">
            Pick your problem. <strong className="font-semibold text-ink">Don&apos;t know where to start?</strong>{" "}
            Start with a maturity assessment. Where are you today? Most companies we speak to start at layer one or two.
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
