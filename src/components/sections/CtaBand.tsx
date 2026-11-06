import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Database, Factory, FileSpreadsheet, FileText, Radio, Sheet, Target } from "lucide-react";
import { Reveal } from "../Reveal";
import { CountUp } from "../motion/CountUp";
import { solutionPath } from "@/lib/locations";
import manufacturingImg from "../../../public/images/manufacturing.jpg";
import energyImg from "../../../public/images/energy.jpg";

// "Proof": copy from the approved reference. Palette: green #0b6e50 · navy #14304f · grey #4a5868.

const stats = [
  { figure: "40,000+", label: "sensors connected", count: true, icon: Radio },
  { figure: "6 plants", label: "across two countries", count: true, icon: Factory },
  { figure: "[Result]", label: "one measured result, to add", count: false, icon: Target },
];

/* ---------- Before: a weekly report assembled by hand (animated, decorative) ---------- */
function ManualReport() {
  const COLS = 5;
  const ROWS = 5;
  // Fill order wanders across the sheet, like someone pasting values in one at a time
  const order = [0, 6, 1, 12, 7, 2, 18, 13, 8, 3, 24, 19, 14, 9, 4, 20, 15, 10, 21, 16, 22, 11, 17, 23, 5];
  const step = (i: number) => order.indexOf(i);
  return (
    <div className="relative mt-8" aria-hidden="true">
      {/* Paper stack */}
      <span className="absolute inset-0 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-2xl bg-white/60 ring-1 ring-[#14304f]/10" />
      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[0.6deg] rounded-2xl bg-white/80 ring-1 ring-[#14304f]/10" />

      <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-[#14304f]/10">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-[#14304f]/[0.07] bg-[#f7f9fb] px-3.5 py-2">
          {[0, 1, 2].map((k) => (
            <span key={k} className="h-2 w-2 rounded-full bg-[#dfe5ec]" />
          ))}
          <span className="ml-3 h-1.5 w-20 rounded-full bg-[#dfe5ec]" />
        </div>

        <div className="flex">
          {/* Row numbers */}
          <div className="grid w-6 shrink-0 gap-1.5 border-r border-[#14304f]/[0.07] bg-[#f7f9fb] py-3">
            {Array.from({ length: ROWS + 1 }, (_, r) => (
              <span key={r} className="mx-auto h-2.5 w-1.5 rounded-sm bg-[#dfe5ec]" />
            ))}
          </div>
          <div className="relative flex-1 p-3">
            {/* Header row */}
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
              {Array.from({ length: COLS }, (_, c) => (
                <span key={c} className="h-2.5 rounded-sm bg-[#c5ced9]" />
              ))}
            </div>
            {/* Cells filling in one at a time */}
            <div className="mt-1.5 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
              {Array.from({ length: COLS * ROWS }, (_, i) => (
                <span key={i} className="relative h-2.5 rounded-sm bg-[#f0f3f6]">
                  <span
                    className="proof-cell absolute inset-y-0 left-0 rounded-sm bg-[#dfe5ec]"
                    style={{ width: `${55 + ((i * 37) % 45)}%`, ["--d" as string]: `${step(i) * 0.24}s` }}
                  />
                  <span className="proof-cursor absolute -inset-[3px] rounded-[4px] ring-[1.5px] ring-[#4a5868]/70" style={{ ["--d" as string]: `${step(i) * 0.24}s` }} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exports arriving from separate systems */}
      <div className="absolute -left-3 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:-left-4">
        {[Database, FileSpreadsheet, Sheet].map((Icon, k) => (
          <span
            key={k}
            className="proof-file grid h-8 w-8 place-items-center rounded-lg bg-white text-[#4a5868] shadow-[0_8px_18px_-10px_rgba(20,48,79,0.6)] ring-1 ring-[#14304f]/10"
            style={{ ["--d" as string]: `${k * 1.1}s` }}
          >
            <Icon size={15} />
          </span>
        ))}
      </div>

      {/* Waiting on someone to explain it */}
      <span className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-white shadow-[0_10px_20px_-10px_rgba(20,48,79,0.6)] ring-1 ring-[#14304f]/10 sm:-right-4 sm:-top-4">
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <circle cx="12" cy="12" r="9" fill="none" stroke="#c5ced9" strokeWidth="2" />
          <line x1="12" y1="12" x2="12" y2="7.5" stroke="#4a5868" strokeWidth="2" strokeLinecap="round" className="proof-hand-h" />
          <line x1="12" y1="12" x2="15.5" y2="12" stroke="#4a5868" strokeWidth="1.6" strokeLinecap="round" className="proof-hand-m" />
          <circle cx="12" cy="12" r="1.4" fill="#4a5868" />
        </svg>
      </span>
    </div>
  );
}

/* ---------- Industries ---------- */

function AgricultureArt() {
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="300" height="200" fill="#0f2a22" />
      {[0, 1, 2].map((r) => (
        <g key={r} transform={`translate(0 ${26 + r * 60})`}>
          <rect x="0" y="0" width="300" height="4" fill="#c9a6ff" opacity="0.8" />
          <rect x="0" y="4" width="300" height="30" fill="#c9a6ff" opacity="0.08" />
          <rect x="0" y="36" width="300" height="5" fill="#173a30" />
          {Array.from({ length: 16 }, (_, i) => (
            <path key={i} transform={`translate(${10 + i * 19} 36)`} d={`M0 0 C -5 -8, -2 -15, 0 -${12 + ((i + r) % 3) * 4} C 2 -15, 5 -8, 0 0`} fill="#5fd4a0" />
          ))}
        </g>
      ))}
    </svg>
  );
}

const industries: { name: string; image: StaticImageData | null }[] = [
  { name: "Manufacturing", image: manufacturingImg },
  { name: "Water and power utilities", image: energyImg },
  { name: "Controlled-environment agriculture", image: null },
];

/* ---------- Pilot: one line lit among many ---------- */
function OneLine() {
  return (
    <svg viewBox="0 0 260 90" preserveAspectRatio="xMidYMid meet" className="h-28 w-full sm:h-32" aria-hidden="true">
      {[12, 30, 48, 66, 84].map((y, i) => (
        <g key={y}>
          <line x1="0" y1={y} x2="260" y2={y} stroke="#ffffff" strokeOpacity={i === 2 ? 0.9 : 0.15} strokeWidth={i === 2 ? 3 : 1.5} strokeLinecap="round" />
          {i === 2 && (
            <circle r="5" cy={y} fill="#ffffff">
              <animate attributeName="cx" from="0" to="260" dur="2.6s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" data-header-light className="relative isolate overflow-hidden bg-[#f5f8f7] py-24 text-[#14304f] sm:py-32">
      {/* Ambient light, dot grid and vertical rails */}
      <div className="absolute -left-40 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#0b6e50]/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#14304f]/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(20,48,79,0.07)_1px,transparent_1.3px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-full max-w-[90rem] -translate-x-1/2 justify-between px-10 lg:flex" aria-hidden="true">
        <span className="w-px bg-gradient-to-b from-transparent via-[#14304f]/10 to-transparent" />
        <span className="w-px bg-gradient-to-b from-transparent via-[#14304f]/10 to-transparent" />
      </div>

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        {/* Header + case file */}
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-2 pr-4 text-sm font-semibold text-[#0b6e50] shadow-[0_10px_24px_-18px_rgba(20,48,79,0.6)] ring-1 ring-[#14304f]/10">
              <span className="relative grid h-5 w-5 place-items-center rounded-full bg-[#e8f5ef]" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-[#0b6e50]" />
                <span className="absolute inset-0 animate-ping rounded-full bg-[#0b6e50]/25 motion-reduce:animate-none" />
              </span>
              Proof
            </p>
            <h2 id="cta-title" className="display mt-6 max-w-[24ch] text-[clamp(2.1rem,1.4rem+2.4vw,3.5rem)] leading-[1.06] tracking-tight">
              What changed for a UAE operator that has run our digital twin for over a year.
            </h2>
          </div>

          {/* Case file: a folder with a tab */}
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <div className="group relative w-full max-w-sm pt-4 transition-transform duration-500 hover:-translate-y-1">
              <span className="absolute left-6 top-0 h-6 w-28 rounded-t-xl bg-[#14304f]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl rounded-tl-md bg-white p-5 shadow-[0_30px_60px_-36px_rgba(20,48,79,0.6)] ring-1 ring-[#14304f]/10">
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#14304f] via-[#0b6e50] to-[#5fd4a0]" aria-hidden="true" />
                <div className="flex items-center gap-4">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#14304f] text-white" aria-hidden="true">
                    <FileText size={20} />
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#5fd4a0] ring-2 ring-white" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.85rem] text-[#4a5868]">[Client name, pending approval]</p>
                    <Link href={solutionPath("digital-twin", "uae")} className="mt-0.5 inline-flex items-center gap-1.5 font-semibold text-[#0b6e50] after:absolute after:inset-0 after:content-['']">
                      Read the case study <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5" aria-hidden="true">
                  <span className="block h-1.5 w-full rounded-full bg-[#eef1f5]" />
                  <span className="block h-1.5 w-4/5 rounded-full bg-[#eef1f5]" />
                  <span className="block h-1.5 w-3/5 rounded-full bg-[#e8f5ef]" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* KPI counters: a slim navy strip */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-[28px] bg-[#14304f] text-white shadow-[0_40px_80px_-50px_rgba(20,48,79,0.9)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]" aria-hidden="true" />
            <div className="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-[#0b6e50]/40 blur-[80px]" aria-hidden="true" />
            <span className="proof-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />

            <ol className="relative grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.figure} className="group relative flex items-center gap-5 px-6 py-7 sm:px-8 sm:py-9">
                    <span
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-1 transition-colors duration-500 ${
                        s.count ? "bg-[#0b6e50]/30 text-[#5fd4a0] ring-[#5fd4a0]/30 group-hover:ring-[#5fd4a0]/70" : "bg-white/[0.05] text-white/45 ring-white/10"
                      }`}
                      aria-hidden="true"
                    >
                      <Icon size={24} />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`font-display text-[clamp(2.2rem,1.7rem+1.6vw,3.2rem)] font-bold leading-none tracking-tight tabular-nums [font-stretch:112%] ${
                          s.count ? "text-white" : "text-white/45"
                        }`}
                      >
                        {s.count ? <CountUp value={s.figure} duration={2.2} /> : s.figure}
                      </p>
                      <p className="mt-2 text-[0.95rem] text-white/65">{s.label}</p>
                    </div>
                    {/* Progress line drawn on reveal */}
                    <span className="absolute inset-x-6 bottom-0 h-[2px] overflow-hidden sm:inset-x-8" aria-hidden="true">
                      <span
                        className={`proof-fill absolute inset-0 origin-left ${s.count ? "bg-gradient-to-r from-[#0b6e50] via-[#5fd4a0] to-transparent" : "bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.3)_0_6px,transparent_6px_12px)]"}`}
                        style={{ ["--d" as string]: `${300 + i * 250}ms` }}
                      />
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        {/* Before → After: one split slab */}
        <Reveal className="mt-8">
          <div className="relative grid overflow-hidden rounded-[32px] bg-white shadow-[0_40px_80px_-50px_rgba(20,48,79,0.55)] ring-1 ring-[#14304f]/10 lg:grid-cols-2">
            {/* Before */}
            <div className="relative bg-[#eef1f5] p-7 pb-12 sm:p-10 sm:pb-14 lg:pb-10 lg:pr-16">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-white px-3 py-1 text-[0.8rem] font-semibold text-[#4a5868] ring-1 ring-[#14304f]/10">Before</span>
                <span className="text-[0.82rem] text-[#4a5868]">Weekly report, built by hand</span>
              </div>
              <ManualReport />
              <p className="mt-8 max-w-[46ch] text-[1rem] leading-relaxed text-[#4a5868]">
                The team exported data from several systems, put it together, and leaders waited for someone to explain it.
              </p>
            </div>

            {/* After */}
            <div className="relative p-7 pt-12 sm:p-10 sm:pt-14 lg:pl-16 lg:pt-10">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0b6e50] via-[#5fd4a0] to-[#14304f]" aria-hidden="true" />
              <span className="absolute left-1/2 top-0 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0b6e50] text-white shadow-[0_16px_34px_-12px_rgba(11,110,80,0.9)] ring-8 ring-white lg:hidden" aria-hidden="true">
                <ArrowRight size={18} className="rotate-90" />
              </span>
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#5fd4a0]/15 blur-[70px]" aria-hidden="true" />
              <div className="relative flex items-center justify-between gap-4">
                <span className="rounded-full bg-[#e8f5ef] px-3 py-1 text-[0.8rem] font-semibold text-[#0b6e50]">After</span>
                <span className="text-[0.82rem] text-[#0b6e50]">Asked in plain language</span>
              </div>
              <div className="relative mt-8 space-y-3">
                <p className="proof-bubble w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[#eef2f7] px-4 py-2.5 text-[0.9rem] text-[#14304f]" style={{ ["--d" as string]: "200ms" }}>
                  “Is energy use linked to output at this site?”
                </p>
                <p
                  className="proof-bubble ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-[#14304f] px-4 py-2.5 text-[0.9rem] leading-snug text-white shadow-[0_14px_28px_-16px_rgba(20,48,79,0.8)]"
                  style={{ ["--d" as string]: "700ms" }}
                >
                  Here is the trend, by unit, with the source behind every number.
                </p>
              </div>
              <p className="relative mt-8 max-w-[46ch] text-[1rem] leading-relaxed text-[#14304f]">Reports are produced automatically, and leaders read technical reports on their own.</p>
            </div>

            {/* Seam: a dividing line with the transformation knob */}
            <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block" aria-hidden="true">
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#0b6e50]/40 to-transparent" />
              <span className="proof-drop absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#0b6e50] to-transparent" />
            </div>
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0b6e50] text-white shadow-[0_16px_34px_-12px_rgba(11,110,80,0.9)] ring-8 ring-white lg:grid" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#0b6e50]/20 [animation-duration:2.4s] motion-reduce:animate-none" />
              <ArrowRight size={20} className="relative rotate-90 lg:rotate-0" />
            </span>
          </div>
        </Reveal>

        {/* Industries: expanding panels */}
        <Reveal className="mt-14">
          <div className="flex items-center gap-4">
            <p className="text-[0.95rem] font-semibold text-[#14304f]">Industries we work with</p>
            <span className="h-px flex-1 bg-gradient-to-r from-[#14304f]/15 to-transparent" aria-hidden="true" />
          </div>
          <ul className="mt-5 flex flex-col gap-4 sm:flex-row">
            {industries.map((ind) => (
              <li
                key={ind.name}
                className="group relative isolate flex h-52 items-end overflow-hidden rounded-[24px] p-6 text-white shadow-[0_24px_44px_-30px_rgba(20,48,79,0.7)] transition-[flex-grow] duration-700 ease-out sm:h-72 sm:flex-1 sm:hover:flex-[1.7]"
              >
                {ind.image ? (
                  <Image src={ind.image} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" className="zoom-img -z-10 object-cover" />
                ) : (
                  <div className="zoom-img absolute inset-0 -z-10">
                    <AgricultureArt />
                  </div>
                )}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b1a2b] via-[#0b1a2b]/40 to-transparent" aria-hidden="true" />
                <span className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-[#5fd4a0]/50" aria-hidden="true" />
                <span className="absolute left-5 top-5 h-1.5 w-1.5 rounded-full bg-[#5fd4a0] shadow-[0_0_10px_3px_rgba(95,212,160,0.6)]" aria-hidden="true" />
                <span className="block">
                  <span className="mb-3 block h-0.5 w-8 rounded-full bg-[#5fd4a0] transition-[width] duration-500 group-hover:w-14" aria-hidden="true" />
                  <span className="font-display text-[1.15rem] font-semibold leading-snug [font-stretch:106%]">{ind.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Pilot banner */}
        <Reveal className="mt-6">
          <div className="relative grid overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0b6e50] to-[#095c43] text-white shadow-[0_40px_70px_-40px_rgba(11,110,80,0.9)] lg:grid-cols-12 lg:items-center">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" aria-hidden="true" />
            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" aria-hidden="true" />
            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#5fd4a0]/20 blur-[80px]" aria-hidden="true" />
            <div className="relative p-7 sm:p-10 lg:col-span-7">
              <p className="font-display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] font-bold leading-tight [font-stretch:106%]">Try it on one line first</p>
              <p className="mt-3 max-w-[52ch] text-[1rem] leading-relaxed text-white/85">
                A fixed-scope pilot on one line, route or asset keeps your risk small and shows you the result before you commit to more.
              </p>
              <Link href="/?topic=digital-twin#contact" className="btn group mt-7 bg-white text-[#0b6e50] hover:bg-[#e8f5ef]">
                Ask about a pilot <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <div className="relative px-7 pb-8 lg:col-span-5 lg:px-10 lg:pb-0">
              <div className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15 backdrop-blur-sm">
                <OneLine />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
