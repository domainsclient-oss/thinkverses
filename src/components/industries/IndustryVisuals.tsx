import { Activity, Factory, Thermometer, Wifi } from "lucide-react";
import { BackgroundVideo } from "../BackgroundVideo";

// Labels come from the page copy; shapes and lines are illustrative.

function Hud({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/15 bg-[#0b1a2e]/55 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

function Corners() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4">
      <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-white/50" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-white/50" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-white/50" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-white/50" />
    </div>
  );
}

export function ManufacturingVisual() {
  return (
    <div className="absolute inset-0">
      <BackgroundVideo name="Training-plan" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-[#0b1a2e]/90 via-[#0b1a2e]/35 to-[#0b1a2e]/10" />
      <div aria-hidden="true" className="pa-scan absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-[#34c996]/15 to-transparent" />
      <Corners />

      <span className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-[#f5a03a] px-3 py-1.5 text-xs font-bold text-[#0b1a2e] shadow-[0_0_30px_rgba(245,160,58,0.55)]">
        <span className="relative flex h-2 w-2">
          <span className="dt-ping absolute inset-0 rounded-full bg-[#0b1a2e]" />
          <span className="relative h-2 w-2 rounded-full bg-[#0b1a2e]" />
        </span>
        Line 2: energy drift
      </span>

      <Hud className="absolute bottom-6 left-6 w-[min(18rem,calc(100%-3rem))] p-3.5">
        <div className="flex items-center gap-2 text-[0.7rem] font-semibold text-white">
          <Factory size={13} className="text-[#34c996]" aria-hidden="true" /> Line 2
          <Activity size={13} className="ml-auto text-[#f5a03a]" aria-hidden="true" />
        </div>
        <svg viewBox="0 0 200 60" className="mt-2 h-auto w-full" aria-hidden="true">
          <defs>
            <linearGradient id="iv-mfg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#f5a03a" stopOpacity="0.4" />
              <stop offset="1" stopColor="#f5a03a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="32" width="200" height="16" fill="#34c996" fillOpacity="0.12" />
          <path d="M0 42 C20 40 35 44 55 41 S90 40 110 42 S135 38 150 34 S180 18 200 10" fill="none" stroke="#34c996" strokeWidth="2" pathLength={1} className="dt-draw" />
          <path d="M140 36 S180 18 200 10 L200 60 L140 60 Z" fill="url(#iv-mfg)" />
          <path d="M140 36 S180 18 200 10" fill="none" stroke="#f5a03a" strokeWidth="2.5" />
          <circle cx="200" cy="10" r="3" fill="#f5a03a" />
        </svg>
      </Hud>
    </div>
  );
}

export function UtilitiesVisual() {
  const pumps = ["P1", "P2", "P3", "P4"];
  return (
    <div className="absolute inset-0">
      <BackgroundVideo name="hero" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1a2e]/90 via-[#0b1a2e]/25 to-[#0b1a2e]/30" />
      <Corners />


      <div className="absolute inset-x-6 bottom-6">
        <ul className="grid grid-cols-4 gap-2">
          {pumps.map((p) => {
            const alert = p === "P3";
            return (
              <li
                key={p}
                className={`relative flex flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 backdrop-blur-md ${
                  alert
                    ? "border-[#f5a03a] bg-[#f5a03a]/20 shadow-[0_0_30px_-4px_rgba(245,160,58,0.7)]"
                    : "border-white/15 bg-[#0b1a2e]/55"
                }`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  {alert && <span className="dt-ping absolute inset-0 rounded-full bg-[#f5a03a]" />}
                  <span className={`relative h-2.5 w-2.5 rounded-full ${alert ? "bg-[#f5a03a]" : "bg-[#34c996]"}`} />
                </span>
                <span className={`text-sm font-bold ${alert ? "text-[#f5a03a]" : "text-white"}`}>{p}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-2.5 flex items-center gap-3">
          <span aria-hidden="true" className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className="iv-flow absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#34c996] to-transparent" />
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur-md">
            To network →
          </span>
        </div>
      </div>
    </div>
  );
}

export function AgricultureVisual() {
  const racks = [0, 1, 2, 3];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#2a1846_0%,#12142e_45%,#0b1a2e_100%)]">
      {/* grow-light haze */}
      <div aria-hidden="true" className="iv-breathe absolute -top-24 left-1/2 h-72 w-[130%] -translate-x-1/2 rounded-full bg-[#c04bff]/25 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-15" />

      {/* vertical farm racks in perspective */}
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="iv-led" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ff7ae0" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff7ae0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="iv-leaf" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#6ef0b8" />
            <stop offset="1" stopColor="#1f9e6e" />
          </linearGradient>
        </defs>
        {racks.map((r) => {
          const y = 40 + r * 52;
          return (
            <g key={r}>
              {/* LED bar */}
              <rect x="30" y={y} width="340" height="4" rx="2" fill="#ffb3ef" />
              <path d={`M30 ${y + 4} H370 L380 ${y + 40} H20 Z`} fill="url(#iv-led)" className="iv-breathe" style={{ animationDelay: `${r * 0.4}s` }} />
              {/* tray */}
              <rect x="20" y={y + 40} width="360" height="6" rx="2" fill="#1d2b48" stroke="rgba(255,255,255,0.15)" />
              {/* plants */}
              {Array.from({ length: 14 }).map((_, i) => {
                const x = 34 + i * 24.5;
                return (
                  <g key={i} className="iv-sway" style={{ transformOrigin: `${x}px ${y + 40}px`, animationDelay: `${(i % 5) * 0.3}s` }}>
                    <path d={`M${x} ${y + 40} q-9 -10 -2 -20 q7 6 2 20`} fill="url(#iv-leaf)" />
                    <path d={`M${x} ${y + 40} q9 -8 4 -17 q-8 5 -4 17`} fill="url(#iv-leaf)" opacity="0.85" />
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* rack posts */}
        <rect x="16" y="30" width="4" height="230" fill="#1d2b48" />
        <rect x="380" y="30" width="4" height="230" fill="#1d2b48" />
        {/* sensor signal */}
        <circle cx="290" cy="118" r="5" fill="#34c996" />
        <circle cx="290" cy="118" r="5" fill="#34c996" className="dt-ping" />
      </svg>

      {/* rising particles (water / airflow) */}
      <div aria-hidden="true" className="absolute inset-0">
        {[12, 28, 44, 61, 77, 90].map((l, i) => (
          <span
            key={l}
            className="iv-rise absolute bottom-0 h-1.5 w-1.5 rounded-full bg-[#9be8ff]/70"
            style={{ left: `${l}%`, animationDelay: `${i * 0.9}s` }}
          />
        ))}
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b1a2e] to-transparent" />
      <Corners />

      <Hud className="absolute right-6 top-[38%] flex items-center gap-2 px-3 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#34c996]/20 text-[#34c996]">
          <Thermometer size={14} aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold text-white">Climate sensor</span>
        <Wifi size={13} className="text-[#34c996]" aria-hidden="true" />
      </Hud>
    </div>
  );
}
