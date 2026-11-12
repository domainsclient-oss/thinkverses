"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { SceneMount } from "../three/SceneMount";

const kpis = [
  { label: "OEE", value: "78%", tone: "text-white" },
  { label: "Energy / unit", value: "+6%", tone: "text-[#f5a03a]" },
  { label: "Assets to watch", value: "3", tone: "text-white" },
];

// Illustrative trend lines (viewBox 0 0 200 70).
const oee = "M0,46 C15,44 25,42 40,43 S65,44 80,39 S105,40 120,36 S145,35 160,31 S185,33 200,32";
const energy = "M0,52 C15,51 25,50 40,51 S65,49 80,48 S105,47 120,43 S145,40 160,32 S185,20 200,13";

export function TwinHeroPanel() {
  const [selected, setSelected] = useState(2);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(52,201,150,0.4),transparent_70%),radial-gradient(50%_50%_at_20%_90%,rgba(245,160,58,0.25),transparent_70%)] blur-2xl"
      />
      <figure
        aria-label="Plant overview, live twin"
        className="relative h-[30rem] overflow-hidden rounded-[28px] border border-white/10 bg-[#06101f] text-white shadow-[0_40px_80px_-30px_rgba(11,26,46,0.7)] sm:h-[34rem]"
      >
        {/* Stage backdrop: visible while the 3D scene boots */}
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_55%,rgba(52,201,150,0.18),transparent_70%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div aria-hidden="true" className="pa-scan absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-[#34c996]/10 to-transparent" />

        <SceneMount
          scene="station"
          label="Wireframe digital twin of an industrial plant with live sensor points"
          props={{ mode: "twin", selected, onSelect: setSelected }}
          autoStart
          className="absolute inset-0"
        />

        {/* Edge fades so overlays stay readable */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#06101f] via-[#06101f]/70 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#06101f] via-[#06101f]/80 to-transparent" />

        {/* Header + KPIs */}
        <div className="pointer-events-none absolute inset-x-0 top-0 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="dt-ping absolute inset-0 rounded-full bg-[#34c996]" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#34c996]" />
              </span>
              <figcaption className="text-[0.95rem] font-semibold">Plant overview, live twin</figcaption>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {kpis.map((k, i) => (
              <div
                key={k.label}
                className="dt-kpi rounded-2xl border border-white/10 bg-[#0b1a2e]/60 px-3 py-2.5 backdrop-blur-md sm:px-4"
                style={{ animationDelay: `${0.3 + i * 0.12}s` }}
              >
                <dt className="text-[0.68rem] text-[#9fb0cc] sm:text-xs">{k.label}</dt>
                <dd className={`display mt-0.5 text-xl sm:text-[1.6rem] ${k.tone}`}>{k.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Trend + alert */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 space-y-3 p-4 sm:p-6">
          <div className="w-full max-w-[19rem] rounded-2xl border border-white/10 bg-[#0b1a2e]/70 p-3 backdrop-blur-md">
            <div className="mb-1.5 flex items-center gap-3 text-[0.65rem] text-[#9fb0cc]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-3.5 rounded-full bg-[#34c996]" /> OEE
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-3.5 rounded-full bg-[#f5a03a]" /> Energy / unit
              </span>
            </div>
            <svg viewBox="0 0 200 70" className="h-auto w-full" role="img" aria-label="OEE holding steady while energy per unit rises">
              <defs>
                <linearGradient id="th-en" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#f5a03a" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#f5a03a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${energy} L200,70 L0,70 Z`} fill="url(#th-en)" />
              <path d={oee} pathLength={1} className="dt-draw" fill="none" stroke="#34c996" strokeWidth="2" strokeLinecap="round" />
              <path d={energy} pathLength={1} className="dt-draw dt-draw-late" fill="none" stroke="#f5a03a" strokeWidth="2" strokeLinecap="round" />
              <circle cx="200" cy="13" r="3" fill="#f5a03a" />
            </svg>
          </div>

          <div className="dt-toast flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-[#14304f] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
            <span className="relative mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#fff1df] text-[#d9821f]">
              <span className="dt-ping absolute inset-0 rounded-full bg-[#f5a03a]/30" />
              <AlertTriangle size={15} aria-hidden="true" className="relative" />
            </span>
            <p className="text-sm font-medium leading-snug">Chiller 2 energy use is above its normal pattern on night shifts.</p>
          </div>
        </div>
      </figure>
    </div>
  );
}
