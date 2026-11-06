import type { CSSProperties, ReactNode } from "react";
import { Bot, BrainCircuit, CheckCheck, Thermometer, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";

// "Better together": robot findings converge on the twin, which sends out one decision.
// Copy from the approved reference. Palette: #0b1a2b ground · #0b6e50 · #5fd4a0 · white.
const steps = [
  { title: "Robot inspection round", text: "Walks the route on schedule", icon: Bot },
  { title: "Readings and thermal images", text: "From gauges sensors cannot reach", icon: Thermometer },
  { title: "The digital twin", text: "Adds them to live plant data", icon: BrainCircuit },
  { title: "An earlier decision", text: "Sent to the person who acts", icon: CheckCheck },
];

/* ---------- Decorative mini visuals ---------- */

/* Patrol route with the robot moving along it */
function RouteVisual() {
  return (
    <svg viewBox="0 0 360 44" className="h-11 w-full" aria-hidden="true">
      <path d="M6 34 H110 V12 H230 V30 H354" fill="none" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="4 5" />
      {[
        [110, 12],
        [230, 12],
        [230, 30],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#0f2236" stroke="#5fd4a0" strokeOpacity="0.6" />
      ))}
      <circle r="4.5" fill="#5fd4a0">
        <animateMotion dur="5s" repeatCount="indefinite" path="M6 34 H110 V12 H230 V30 H354" />
      </circle>
    </svg>
  );
}

/* A gauge reading being scanned */
function ThermalVisual() {
  return (
    <div className="relative h-11 overflow-hidden rounded-lg bg-[#0f2236] ring-1 ring-white/10" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(95,212,160,0.55),transparent_45%),radial-gradient(circle_at_72%_40%,rgba(11,110,80,0.7),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12px_100%]" />
      <span className="bt-scan absolute inset-0">
        <span className="absolute inset-y-0 -left-10 w-10 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </span>
    </div>
  );
}

/* The decision travelling to one person */
function SendVisual() {
  return (
    <svg viewBox="0 0 360 44" className="h-11 w-full" aria-hidden="true">
      <line x1="8" y1="22" x2="332" y2="22" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="4 5" />
      <circle cx="346" cy="22" r="11" fill="#0b6e50" fillOpacity="0.35" stroke="#5fd4a0" strokeOpacity="0.7" />
      <circle cx="346" cy="18.5" r="3.2" fill="#5fd4a0" />
      <path d="M339.5 28.5 C 341 24, 351 24, 352.5 28.5" fill="none" stroke="#5fd4a0" strokeWidth="2" strokeLinecap="round" />
      <circle r="4" cy="22" fill="#ffffff">
        <animate attributeName="cx" values="8;332" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ---------- Building blocks ---------- */

function StepCard({
  icon: Icon,
  title,
  text,
  visual,
  connector,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  visual: ReactNode;
  connector: "right" | "left";
}) {
  return (
    <div className="group relative">
      {/* Connector towards the hub (desktop) */}
      <span
        className={`absolute top-1/2 hidden h-px w-14 -translate-y-1/2 bg-gradient-to-r lg:block ${
          connector === "right" ? "left-full from-[#5fd4a0]/50 to-[#5fd4a0]/10" : "right-full from-[#5fd4a0]/10 to-[#5fd4a0]/50"
        }`}
        aria-hidden="true"
      >
        <span className="bt-dot absolute inset-0">
          <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#5fd4a0] shadow-[0_0_10px_2px_rgba(95,212,160,0.7)]" />
        </span>
      </span>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-white/20 via-white/[0.06] to-white/[0.02] p-px transition-transform duration-500 group-hover:-translate-y-1">
        <div className="relative h-full rounded-[21px] bg-[#0b1a2b]/90 p-5 backdrop-blur sm:p-6">
          <span className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#0b6e50]/0 glow-soft transition-colors duration-700 group-hover:bg-[#0b6e50]/40" aria-hidden="true" />
          <div className="relative flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#5fd4a0]/30 bg-[#0f2236] text-[#5fd4a0] transition-colors duration-500 group-hover:border-[#5fd4a0]/70" aria-hidden="true">
              <Icon size={22} />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-[1.12rem] font-semibold leading-snug [font-stretch:106%]">{title}</h3>
              <p className="mt-1.5 text-[0.95rem] text-white/60">{text}</p>
            </div>
          </div>
          <div className="relative mt-5">{visual}</div>
        </div>
      </div>
    </div>
  );
}

/* Vertical connector for the stacked mobile layout */
function MobileLink() {
  return (
    <span className="relative mx-auto block h-10 w-px bg-gradient-to-b from-[#5fd4a0]/50 to-[#5fd4a0]/10 lg:hidden" aria-hidden="true">
      <span className="bt-dot-y absolute inset-0">
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#5fd4a0] shadow-[0_0_10px_2px_rgba(95,212,160,0.7)]" />
      </span>
    </span>
  );
}

function Hub({ title, text }: { title: string; text: string }) {
  const orbit = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return { left: `${50 + 50 * Math.sin(a)}%`, top: `${50 - 50 * Math.cos(a)}%` } as CSSProperties;
  };
  return (
    <div className="relative mx-auto grid aspect-square w-[min(20rem,86vw)] place-items-center lg:w-[23rem]">
      {/* Glow */}
      <div className="absolute inset-[12%] rounded-full bg-[#0b6e50]/40 glow-soft" aria-hidden="true" />
      {/* Rotating rings */}
      <div className="absolute inset-0 animate-spin rounded-full border border-dashed border-[#5fd4a0]/45 [animation-duration:40s] motion-reduce:animate-none" aria-hidden="true">
        {[0, 120, 240].map((d) => (
          <span key={d} className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5fd4a0] shadow-[0_0_14px_3px_rgba(95,212,160,0.6)]" style={orbit(d)} />
        ))}
      </div>
      <div className="absolute inset-[9%] animate-spin rounded-full border border-white/20 [animation-direction:reverse] [animation-duration:28s] motion-reduce:animate-none" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
      </div>
      <div className="pulse absolute inset-[18%] rounded-full ring-2 ring-[#5fd4a0]/40" aria-hidden="true" />

      {/* Core */}
      <div className="relative grid aspect-square w-[64%] place-items-center rounded-full border border-[#5fd4a0]/60 bg-[radial-gradient(circle_at_30%_25%,#0b6e50,#0b1a2b_78%)] p-6 text-center shadow-[0_0_60px_-6px_rgba(95,212,160,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
        <div>
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#0b6e50] text-white shadow-[0_0_30px_-4px_rgba(95,212,160,0.8)] ring-1 ring-[#5fd4a0]/60" aria-hidden="true">
            <BrainCircuit size={22} />
          </span>
          <h3 className="mt-3 font-display text-[1.12rem] font-semibold leading-snug [font-stretch:106%]">{title}</h3>
          <p className="mx-auto mt-1 max-w-[14ch] text-[0.9rem] leading-snug text-white/60">{text}</p>
        </div>
      </div>
    </div>
  );
}

export function Training() {
  const [robot, readings, twin, decision] = steps;
  return (
    <section id="training" className="cv-auto [contain-intrinsic-size:auto_1406px] lg:[contain-intrinsic-size:auto_938px] relative isolate overflow-hidden bg-[#0b1a2b] py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0b6e50]/20 glow-soft" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#5fd4a0]/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-[#5fd4a0]/25 bg-[#5fd4a0]/[0.06] px-4 py-1.5 text-sm font-semibold text-[#5fd4a0]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5fd4a0] shadow-[0_0_8px_2px_rgba(95,212,160,0.7)]" aria-hidden="true" />
            Better together
          </p>
          <h2 className="display mt-6 text-[clamp(2.1rem,1.4rem+2.4vw,3.4rem)] leading-[1.08] tracking-tight">
            What the robots see feeds the twin, so you get one view of your site.
          </h2>
        </Reveal>

        {/* Convergence: two inputs → the twin → one decision */}
        <div className="mt-16 grid items-center gap-0 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-14">
          <div className="grid gap-0 lg:gap-6">
              <Reveal>
                <StepCard icon={robot.icon} title={robot.title} text={robot.text} visual={<RouteVisual />} connector="right" />
              </Reveal>
              <MobileLink />
              <Reveal delay={120}>
                <StepCard icon={readings.icon} title={readings.title} text={readings.text} visual={<ThermalVisual />} connector="right" />
              </Reveal>
          </div>
          <MobileLink />
          <Reveal delay={220}>
            <Hub title={twin.title} text={twin.text} />
          </Reveal>
          <MobileLink />
          <Reveal delay={320}>
            <StepCard icon={decision.icon} title={decision.title} text={decision.text} visual={<SendVisual />} connector="left" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
