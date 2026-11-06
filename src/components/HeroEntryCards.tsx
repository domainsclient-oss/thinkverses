"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* Isometric stack of the five twin layers; slabs fan apart on hover */
function LayersVisual() {
  const slabs = ["#14304f", "#1d4a63", "#0b6e50", "#1f8a64", "#2e9c74"];
  return (
    <span className="entry-iso relative block h-full w-full" aria-hidden="true">
      {slabs.map((c, i) => (
        <span
          key={c}
          className="entry-slab absolute left-1/2 top-1/2 h-14 w-14 rounded-[6px]"
          style={
            {
              background: `linear-gradient(135deg, ${c}, ${c}cc)`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 14px -6px rgba(20,48,79,0.55)",
              "--i": i,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

/* Inspection camera frame: scan line sweeps, defect box locks on hover */
function CameraVisual() {
  return (
    <span className="relative grid h-full w-full place-items-center" aria-hidden="true">
      <span className="relative h-[3.6rem] w-[5rem] overflow-hidden rounded-md border border-white/10 bg-[#3d5068] shadow-[inset_0_0_18px_rgba(0,0,0,0.35)]">
        <span className="entry-scan absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-transparent via-[#5fd4a0]/35 to-transparent" />
        <span className="entry-defect absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 border-2 border-[#f5a524] shadow-[0_0_14px_rgba(245,165,36,0.6)]" />
      </span>
      {[
        "left-2 top-2 border-l-2 border-t-2",
        "right-2 top-2 border-r-2 border-t-2",
        "bottom-2 left-2 border-b-2 border-l-2",
        "bottom-2 right-2 border-b-2 border-r-2",
      ].map((c) => (
        <span key={c} className={`absolute h-3 w-3 border-[#5fd4a0]/70 ${c}`} />
      ))}
      <span className="absolute right-3 top-3 h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5d6c]" />
    </span>
  );
}

type Entry = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  tone: "light" | "dark";
  visual: ReactNode;
};

const entries: Entry[] = [
  {
    eyebrow: "Start here if you run a plant or utility",
    title: "Digital Twin",
    text: "Higher output and less downtime, from the data your plant already produces.",
    href: "/#digital-twin",
    tone: "light",
    visual: <LayersVisual />,
  },
  {
    eyebrow: "Start here if you inspect or secure a site",
    title: "Physical AI",
    text: "Robots that inspect the line and patrol the site, and report what they find as it happens.",
    href: "/#robotics",
    tone: "dark",
    visual: <CameraVisual />,
  },
];

function Card({ e }: { e: Entry }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Pointer position drives the tilt and the spotlight through CSS variables (no re-renders)
  const move = (ev: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || ev.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width;
    const y = (ev.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  const well =
    e.tone === "light"
      ? "bg-[linear-gradient(145deg,#f1faf5,#dcefe5)] ring-1 ring-[#0b6e50]/10"
      : "bg-[linear-gradient(145deg,#1c2733,#0f1720)] ring-1 ring-white/5";

  return (
    <Link ref={ref} href={e.href} onPointerMove={move} onPointerLeave={leave} className="entry-card group relative block h-full rounded-[24px]">
      <span className="entry-ring pointer-events-none absolute -inset-px rounded-[25px]" aria-hidden="true" />
      <span className="entry-body relative flex h-full items-center gap-5 overflow-hidden rounded-[24px] border border-[#14304f]/10 bg-white/95 p-4 pr-6 backdrop-blur sm:gap-6 sm:p-5 sm:pr-8">
        {/* Cursor spotlight */}
        <span className="entry-spot pointer-events-none absolute inset-0" aria-hidden="true" />

        <span className={`entry-well relative grid h-[6.5rem] w-[6.5rem] shrink-0 place-items-center overflow-hidden rounded-[18px] sm:h-[7.25rem] sm:w-[7.25rem] ${well}`}>
          {e.visual}
        </span>

        <span className="entry-copy relative min-w-0 flex-1">
          <span className="block text-[0.78rem] font-semibold text-[#0b6e50]">{e.eyebrow}</span>
          <span className="mt-1 block font-display text-[1.5rem] font-bold leading-tight text-[#14304f] [font-stretch:108%]">{e.title}</span>
          <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-[#4a5868]">{e.text}</span>
          <span className="mt-3 block h-[2px] w-10 origin-left rounded-full bg-gradient-to-r from-[#0b6e50] to-[#2e9c74] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-24" aria-hidden="true" />
        </span>

        <span
          className="entry-arrow absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[#14304f]/15 bg-white text-[#14304f] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:border-transparent group-hover:bg-[#0b6e50] group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowUpRight size={17} className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </span>
    </Link>
  );
}

export function HeroEntryCards({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <ul className={`grid gap-4 md:grid-cols-2 md:gap-5 ${className}`} style={style}>
      {entries.map((e) => (
        <li key={e.title} className="[perspective:1100px]">
          <Card e={e} />
        </li>
      ))}
    </ul>
  );
}
