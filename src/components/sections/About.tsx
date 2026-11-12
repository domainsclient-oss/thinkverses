import { Activity, ArrowRight, BrainCircuit, Layers, MessageSquareText, RefreshCcw } from "lucide-react";
import { Reveal } from "../Reveal";
import { TiltCard } from "../motion/TiltCard";

// Text colours follow the approved "How it works" reference:
// green #5fd4a0 (labels, notes) · white (headings) · grey #8b9ab0 (secondary) · amber #f5a524 (warnings)
const GREEN = "text-[#5fd4a0]";
const GREY = "text-[#8b9ab0]";
const AMBER = "text-[#f5a524]";

const icons = [Activity, Layers, BrainCircuit, MessageSquareText];
const VIOLET = "#7c6cf0";

/* Shared frame: navy panel with a fine grid; .hiw-panel lifts it off the card on hover */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="hiw-panel relative h-52 overflow-hidden rounded-[22px] border border-white/10 bg-[#0f1830] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px] shadow-[0_24px_40px_-24px_rgba(0,0,0,0.8)]">
      {children}
    </div>
  );
}

/* 1 · Motor driving a pump: spinning impeller, energy running down the shaft, live sensors */
function PumpVisual() {
  return (
    <Panel>
      <div className="hiw-stage absolute inset-0">
        <svg viewBox="0 0 340 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="hiw-pump-glow">
              <stop offset="0" stopColor={VIOLET} stopOpacity="0.55" />
              <stop offset="1" stopColor={VIOLET} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="230" y="118" width="96" height="12" rx="3" fill="#2a3550" />
          <rect x="150" y="118" width="40" height="12" fill="#2a3550" />
          {[
            { x: 100, y: 64, label: "Vibration", c: "#8b9ab0", ly: 48 },
            { x: 190, y: 50, label: "Temperature", c: "#f5a524", ly: 34 },
          ].map((s, i) => (
            <g key={s.label}>
              <text x={s.x} y={s.ly} textAnchor="middle" fontSize="11" fill={s.c}>
                {s.label}
              </text>
              <line x1={s.x} y1={s.y} x2={s.x} y2={s.y + 28} stroke="#8a96b3" strokeDasharray="2 4" className="twin-flow" style={{ animationDuration: `${1.6 + i * 0.4}s` }} />
              <circle cx={s.x} cy={s.y + 2} r="4" fill={i === 1 ? "#f5a524" : "#5fd4a0"} />
              <circle cx={s.x} cy={s.y + 2} r="9" fill="none" stroke={i === 1 ? "#f5a524" : "#5fd4a0"} className="pulse" style={{ ["--d" as string]: `${i * 600}ms` }} />
            </g>
          ))}
          <line x1="278" y1="96" x2="278" y2="118" stroke="#8a96b3" strokeDasharray="2 4" className="twin-flow" />
          <circle cx="278" cy="96" r="4" fill="#5fd4a0" />
          <circle cx="278" cy="96" r="9" fill="none" stroke="#5fd4a0" className="pulse" style={{ ["--d" as string]: "1200ms" }} />
          <text x="278" y="152" textAnchor="middle" fontSize="11" fill="#8b9ab0">
            Flow, pressure
          </text>

          {/* Energy pulses travelling from the motor through the pump and down the line */}
          {[0, 0.6, 1.2].map((b) => (
            <circle key={b} r="3" fill="#a99cff">
              <animateMotion dur="1.8s" begin={`${b}s`} repeatCount="indefinite" path="M148 124 L326 124" />
            </circle>
          ))}

          <rect x="38" y="98" width="110" height="52" rx="8" fill="#14254a" stroke="#3a4f80" />
          {[0, 1, 2, 3, 4].map((k) => (
            <rect key={k} x={50 + k * 18} y="140" width="10" height="3" rx="1.5" fill="#3a4f80" />
          ))}
          <text x="93" y="129" textAnchor="middle" fontSize="13" fill="#ffffff">
            Motor
          </text>

          <circle cx="190" cy="124" r="46" fill="url(#hiw-pump-glow)" />
          <circle cx="190" cy="124" r="32" fill="#0f1830" stroke="#d6dcff" strokeWidth="2.5" />
          {/* Impeller */}
          <g className="hiw-spin" style={{ transformOrigin: "190px 124px", transformBox: "view-box" }}>
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <path key={a} d="M190 124 Q 202 112 212 116" fill="none" stroke={VIOLET} strokeOpacity="0.55" strokeWidth="2" transform={`rotate(${a} 190 124)`} />
            ))}
          </g>
          <circle cx="190" cy="124" r="32" fill="none" stroke={VIOLET} strokeOpacity="0.5" className="pulse" />
          <text x="190" y="129" textAnchor="middle" fontSize="13" fill="#ffffff">
            Pump
          </text>
        </svg>
      </div>
    </Panel>
  );
}

/* 2 · Four sources slide in, packets stream into a rotating hub */
function DataVisual() {
  const src = ["SCADA: live readings", "Maintenance records", "ERP: spares and costs", "Robot inspection data"];
  return (
    <Panel>
      <div className="hiw-stage absolute inset-0">
        <svg viewBox="0 0 340 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {src.map((s, i) => {
            const y = 36 + i * 43;
            const d = `M196 ${y} C 240 ${y}, 250 100, 286 100`;
            return (
              <g key={s}>
                <path d={d} fill="none" stroke="#c9d2ea" strokeOpacity="0.45" strokeDasharray="3 4" className="twin-flow" style={{ animationDuration: `${2 + i * 0.3}s` }} />
                <circle r="2.6" fill="#5fd4a0">
                  <animateMotion dur={`${1.6 + i * 0.25}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
                </circle>
              </g>
            );
          })}
        </svg>
        <ul className="absolute left-4 top-4 flex w-[58%] flex-col gap-[9px]">
          {src.map((s, i) => (
            <li
              key={s}
              className="hiw-src truncate rounded-lg border border-[#3a4f80] bg-[#14254a] px-3 py-[7px] text-[0.78rem] text-white shadow-[0_8px_16px_-10px_rgba(0,0,0,0.8)]"
              style={{ ["--d" as string]: `${200 + i * 140}ms` }}
            >
              {s}
            </li>
          ))}
        </ul>
        <span className="absolute right-[6%] top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center" aria-hidden="true">
          <span className="absolute -inset-3 rounded-full bg-[#5fd4a0]/15 blur-md" />
          <span className="hiw-ring absolute -inset-2 rounded-full border border-dashed border-[#5fd4a0]/60" />
          <span className="absolute inset-0 rounded-full border-2 border-[#d6dcff] bg-[#1a2440]" />
          <span className="relative h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_14px_4px_rgba(95,212,160,0.6)]" />
        </span>
      </div>
    </Panel>
  );
}

/* 3 · Live mirror over a moving perspective floor; the chart draws itself */
function TwinVisual() {
  const line = "M20 160 L70 156 L110 160 L150 154 L190 158 L230 146 L270 128 L310 100";
  return (
    <Panel>
      <div className="hiw-floor absolute inset-x-[-30%] bottom-0 h-24 overflow-hidden" aria-hidden="true">
        <div className="hiw-floor-grid absolute inset-x-0 -top-[26px] bottom-0" />
      </div>
      <div className="hiw-stage absolute inset-0">
        <div className="absolute inset-x-5 top-5">
          <p className="font-display text-[1.1rem] font-bold text-white [font-stretch:105%]">Pump 3: live mirror</p>
          <div className="mt-2 flex items-center gap-3">
            <span className={`text-[0.78rem] ${GREY}`}>Health</span>
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <span className="hiw-fill block h-full w-[55%] rounded-full bg-[#f5a524] shadow-[0_0_10px_rgba(245,165,36,0.8)]" />
            </span>
          </div>
        </div>
        <svg viewBox="0 0 340 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="hiw-twin-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={VIOLET} stopOpacity="0.35" />
              <stop offset="1" stopColor={VIOLET} stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="20" y1="168" x2="320" y2="168" stroke="#ffffff" strokeOpacity="0.15" strokeDasharray="3 5" />
          <path d={`${line} L310 190 L20 190 Z`} fill="url(#hiw-twin-area)" />
          <path d={line} fill="none" stroke={VIOLET} strokeWidth="2.5" strokeLinecap="round" className="hiw-draw" />
          <circle r="4" fill="#ffffff">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={line} />
          </circle>
          <circle cx="310" cy="100" r="11" fill={VIOLET} fillOpacity="0.25" className="pulse" />
          <circle cx="310" cy="100" r="5" fill="#a99cff" />
        </svg>
        <span className="hiw-scan pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" aria-hidden="true" />
      </div>
    </Panel>
  );
}

/* 4 · The question flips in, the twin "types", the answer flips in; loops */
function DecisionVisual() {
  return (
    <Panel>
      <div className="hiw-stage absolute inset-4 flex flex-col justify-center gap-3 [perspective:600px]">
        <p className="hiw-q w-[86%] origin-top rounded-xl bg-[#ececf2] px-3.5 py-2.5 text-[0.82rem] leading-snug text-[#1a2440] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.8)]">
          “Which pumps need attention this week?”
        </p>
        <span className="hiw-typing absolute bottom-6 right-3 flex gap-1 rounded-full bg-[#0b6e50] px-3 py-2" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <p className="hiw-a ml-auto w-[88%] origin-top rounded-xl border border-[#0b6e50] bg-[#0b6e50] px-3.5 py-2.5 text-[0.82rem] leading-snug text-white shadow-[0_16px_30px_-14px_rgba(11,110,80,0.9)]">
          Pump 3. Plan a bearing check in Thursday’s day shift, before it fails.
        </p>
      </div>
    </Panel>
  );
}

const steps = [
  { label: "1 The real pump", Visual: PumpVisual, note: "A robot inspection round adds gauge readings and thermal images.", tone: "text-white/90" },
  { label: "2 The data comes together", Visual: DataVisual, note: "Checked, cleaned and kept in one place.", tone: GREY },
  { label: "3 The digital twin", Visual: TwinVisual, note: "The bearing temperature is rising above this pump’s normal pattern.", tone: AMBER },
  { label: "4 The decision", Visual: DecisionVisual, note: "Asked in plain language and answered from the twin.", tone: GREY },
];

export function About() {
  return (
    <section id="about" className="cv-auto [contain-intrinsic-size:auto_2244px] lg:[contain-intrinsic-size:auto_931px] relative isolate overflow-hidden bg-[#0b1a2b] py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />
      <div className="absolute -right-32 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#7c6cf0]/15 glow-soft" aria-hidden="true" />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className={`text-[0.9rem] font-semibold ${GREEN}`}>How it works</p>
            <h2 className="display h-section mt-4 max-w-[22ch] text-white">Let&apos;s say, for example, one pump at a water pumping station starts running hot.</h2>
          </div>
          <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
            <p className={`flex items-start gap-3 text-[1.02rem] leading-relaxed lg:text-right ${GREEN}`}>
              <RefreshCcw size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
              The team fixes the pump in a planned shift, the station keeps supplying water, and the twin learns from the result.
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = icons[i];
            const Visual = s.Visual;
            return (
              <Reveal as="li" key={s.label} delay={i * 120} className="reveal-3d group relative list-none">
                <TiltCard className="h-full rounded-[30px] border border-white/10 bg-[#222938] p-5 sm:p-6">
                  <Visual />
                  <div className="hiw-copy">
                    <div className="mt-7 flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-white transition-all duration-500 group-hover:-rotate-6 group-hover:border-[#7c6cf0]/60 group-hover:bg-[#7c6cf0]/20">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <h3 className={`font-display text-[1.15rem] font-semibold leading-snug [font-stretch:105%] ${GREEN}`}>{s.label}</h3>
                    </div>
                    <p className={`mt-5 text-[1.02rem] leading-relaxed ${s.tone}`}>{s.note}</p>
                  </div>
                </TiltCard>
                {i < steps.length - 1 && (
                  <span
                    className="absolute -right-[1.45rem] top-[7.5rem] z-10 hidden h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#161b26] text-white shadow-lg xl:grid"
                    aria-hidden="true"
                  >
                    <ArrowRight size={18} />
                  </span>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
