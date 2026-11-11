"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Camera, Check, Sparkles } from "lucide-react";

type Kind = "twin" | "physical";
type Filter = "all" | Kind;

const twinHref = "/digital-twin";
const roboticsHref = "/robotics-solutions";

/* ---------- Mini visuals (labels come from the page copy; figures are illustrative) ---------- */

function PredictiveVisual() {
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 300 120" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="48" width="300" height="34" fill="#34c996" fillOpacity="0.12" />
        <path d="M0 66 C30 60 50 72 80 64 S130 60 160 66 S200 62 220 58 S260 40 300 22" fill="none" stroke="#34c996" strokeWidth="2.5" />
        <circle cx="262" cy="38" r="5" fill="#f5a03a" />
        <circle cx="262" cy="38" r="5" fill="#f5a03a" className="dt-ping" />
      </svg>
      <span className="absolute left-3 top-[42%] text-[0.65rem] font-semibold uppercase tracking-wider text-[#34c996]">Normal pattern</span>
      <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-[#f5a03a] px-2.5 py-1 text-[0.7rem] font-bold text-[#0b1a2e]">
        Plan a check Thursday
      </span>
    </div>
  );
}

function TraceVisual() {
  const node = "rounded-md border px-2 py-1 text-[0.68rem] font-semibold whitespace-nowrap";
  return (
    <div className="relative grid h-full grid-cols-3 items-center gap-2">
      <svg viewBox="0 0 300 120" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d="M70 60 C95 60 95 32 120 32 M70 60 C95 60 95 88 120 88 M180 32 C205 32 205 32 230 32 M180 88 C205 88 205 88 230 88" fill="none" stroke="#34c996" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 4" className="dt-flow" />
      </svg>
      <div className="relative flex justify-start">
        <span className={`${node} border-white/20 bg-white/10 text-white`}>Raw lot</span>
      </div>
      <div className="relative flex flex-col items-center gap-8">
        <span className={`${node} border-white/20 bg-white/10 text-white`}>Mixer 1</span>
        <span className={`${node} border-[#f5a03a]/60 bg-[#f5a03a]/15 text-[#f5a03a]`}>Mixer 2</span>
      </div>
      <div className="relative flex flex-col items-end gap-8">
        <span className={`${node} border-white/20 bg-white/10 text-white`}>Batch 41</span>
        <span className={`${node} border-[#f5a03a] bg-[#f5a03a] text-[#0b1a2e]`}>Batch 42</span>
      </div>
    </div>
  );
}

function EnergyVisual() {
  const bars = [
    { l: "Line A", v: 48 },
    { l: "Line B", v: 86, hot: true },
    { l: "Line C", v: 56 },
    { l: "Line D", v: 40 },
  ];
  return (
    <div className="flex h-full flex-col">
      <span className="self-end rounded-full bg-[#f5a03a]/15 px-2 py-0.5 text-[0.65rem] font-semibold text-[#f5a03a] ring-1 ring-[#f5a03a]/40">
        Night shift
      </span>
      <div className="mt-2 flex flex-1 items-end gap-3">
        {bars.map((b) => (
          <div key={b.l} className="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div className={`rounded-t-md ${b.hot ? "bg-[#f5a03a]" : "bg-[#34c996]/60"}`} style={{ height: `${b.v}%` }} />
            <span className="text-center text-[0.65rem] text-[#9fb0cc]">{b.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OeeVisual() {
  const parts = [
    { l: "Running", w: 68, c: "bg-[#34c996]" },
    { l: "Changeover", w: 18, c: "bg-[#9fb0cc]" },
    { l: "Unplanned stops", w: 14, c: "bg-[#f5a03a]" },
  ];
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex h-8 overflow-hidden rounded-lg">
        {parts.map((p) => (
          <div key={p.l} className={p.c} style={{ width: `${p.w}%` }} />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {parts.map((p) => (
          <li key={p.l} className="inline-flex items-center gap-1.5 text-[0.68rem] text-[#c9d4e5]">
            <span className={`h-2 w-2 rounded-full ${p.c}`} /> {p.l}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.65rem] text-[#9fb0cc]">One shift, Line 2 (illustrative)</p>
    </div>
  );
}

function SourceVisual() {
  const src = ["SCADA", "ERP", "Sensors", "Spreadsheets"];
  return (
    <div className="relative grid h-full grid-cols-[1fr_auto] items-center gap-6">
      <svg viewBox="0 0 300 120" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        {[18, 46, 74, 102].map((y) => (
          <path key={y} d={`M110 ${y} C160 ${y} 160 60 205 60`} fill="none" stroke="#34c996" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 4" className="dt-flow" />
        ))}
      </svg>
      <div className="relative flex flex-col gap-1.5">
        {src.map((s) => (
          <span key={s} className="w-fit rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[0.68rem] font-semibold text-white">
            {s}
          </span>
        ))}
      </div>
      <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-center text-[0.68rem] font-bold leading-tight text-white shadow-[0_0_30px_-4px_rgba(52,201,150,0.7)]">
        One source
        <br />
        of truth
      </span>
    </div>
  );
}

function AnswerVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      <p className="self-end rounded-2xl rounded-br-md bg-[#34c996] px-3 py-1.5 text-[0.75rem] font-semibold text-[#0b1a2e]">
        Which pumps need attention?
      </p>
      <p className="flex max-w-[85%] items-start gap-2 rounded-2xl rounded-tl-md border border-white/10 bg-white/10 px-3 py-1.5 text-[0.75rem] text-white">
        <Sparkles size={13} className="mt-0.5 shrink-0 text-[#34c996]" aria-hidden="true" />
        <span>
          Pump 3. Plan a bearing check
          <br />
          in Thursday&apos;s day shift.
        </span>
      </p>
    </div>
  );
}

function InspectionVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(135deg,#13294a,#0b1a2e)]">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-5 h-6 bg-white/5" />
      {[12, 38, 64].map((l, i) => (
        <span
          key={l}
          aria-hidden="true"
          className={`absolute bottom-7 h-9 w-12 rounded-md ${i === 1 ? "bg-[#c9d4e5]" : "bg-[#c9d4e5]/60"}`}
          style={{ left: `${l}%` }}
        />
      ))}
      <div className="pa-box absolute bottom-5 left-[35%] h-[3.6rem] w-[4.6rem] rounded-md border-2 border-[#f5a03a]">
        <span className="absolute -top-5 left-0 rounded bg-[#f5a03a] px-1.5 text-[0.62rem] font-bold text-[#0b1a2e]">Defect</span>
      </div>
      <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-[#0b1a2e]/80 px-2 py-0.5 text-[0.62rem] font-semibold text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a4f]" />
        <Camera size={11} aria-hidden="true" /> Camera 02, line 1
      </span>
      <div aria-hidden="true" className="pa-scan absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-[#34c996]/25 to-transparent" />
    </div>
  );
}

function PatrolVisual() {
  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" aria-hidden="true">
      <rect x="6" y="6" width="288" height="108" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" />
      <rect x="40" y="26" width="60" height="34" rx="4" fill="rgba(255,255,255,0.06)" />
      <rect x="130" y="70" width="70" height="30" rx="4" fill="rgba(255,255,255,0.06)" />
      <rect x="220" y="22" width="50" height="40" rx="4" fill="rgba(255,255,255,0.06)" />
      <path d="M24 96 L24 18 L118 18 L118 64 L210 64 L210 18 L282 18 L282 100 L24 100" fill="none" stroke="#34c996" strokeWidth="2" strokeDasharray="5 5" className="dt-flow" />
      <circle cx="210" cy="64" r="22" fill="#f5a03a" fillOpacity="0.12" />
      <circle cx="118" cy="40" r="6" fill="#34c996" />
      <circle cx="118" cy="40" r="6" fill="#34c996" className="dt-ping" />
    </svg>
  );
}

function RoundsVisual() {
  return (
    <div className="relative grid h-full grid-cols-[1fr_auto] items-center gap-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <p className="text-[0.65rem] font-semibold text-[#9fb0cc]">Daily round, Pump house 2</p>
        <div className="mt-2 flex items-center gap-3">
          <svg viewBox="0 0 40 24" className="h-8 w-12" aria-hidden="true">
            <path d="M4 22 A16 16 0 0 1 36 22" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
            <path d="M4 22 A16 16 0 0 1 28 8" fill="none" stroke="#34c996" strokeWidth="3" />
          </svg>
          <span aria-hidden="true" className="h-8 w-12 rounded-md bg-gradient-to-r from-[#2f6bff] via-[#f5a03a] to-[#ff5a4f] opacity-80" />
        </div>
      </div>
      <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-xs font-bold text-white shadow-[0_0_30px_-4px_rgba(52,201,150,0.7)]">
        Twin
      </span>
      <svg viewBox="0 0 300 120" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d="M205 60 L230 60" stroke="#34c996" strokeWidth="1.5" strokeDasharray="3 4" className="dt-flow" />
      </svg>
    </div>
  );
}

/* ---------- Data ---------- */

type UseCase = {
  title: string;
  kinds: Kind[];
  tag: string;
  quote: string;
  text: string;
  audience: string;
  href: string;
  visual: ReactNode;
  toConfirm?: boolean;
};

const useCases: UseCase[] = [
  {
    title: "Predictive maintenance",
    kinds: ["twin"],
    tag: "Digital Twin",
    quote: "We only see problems after they happen.",
    text: "The twin learns how each pump, motor or line normally behaves and warns your team when it starts to drift, so repairs happen in a planned shift.",
    audience: "For plant and maintenance heads",
    href: twinHref,
    visual: <PredictiveVisual />,
  },
  {
    title: "Quality and batch traceability",
    kinds: ["twin"],
    tag: "Digital Twin",
    quote: "When a batch fails, it takes days to find out why.",
    text: "Every batch is linked back to its raw material, machine and settings, so your quality team can trace a problem to its cause in minutes instead of days.",
    audience: "For quality heads",
    href: twinHref,
    visual: <TraceVisual />,
  },
  {
    title: "Energy monitoring",
    kinds: ["twin"],
    tag: "Digital Twin",
    quote: "Our energy bill keeps rising, and we can't see where it goes.",
    text: "You see energy used per line, per shift and per unit produced, so you know which part of the plant to fix first and can track emissions as you go.",
    audience: "For plant heads and sustainability teams",
    href: twinHref,
    visual: <EnergyVisual />,
  },
  {
    title: "OEE and productivity",
    kinds: ["twin"],
    tag: "Digital Twin",
    quote: "We don't know where we lose production time.",
    text: "The twin splits every shift into running time, changeovers and stops, so you can see the real bottleneck and plan output with numbers you trust.",
    audience: "For production and operations heads",
    href: twinHref,
    visual: <OeeVisual />,
  },
  {
    title: "One source of truth for plant data",
    kinds: ["twin"],
    tag: "Digital Twin",
    quote: "Our data sits in SCADA, ERP and spreadsheets.",
    text: "We connect your key systems into one governed place, so every team works from the same numbers. This is usually the first building block.",
    audience: "For CXOs and digital transformation heads",
    href: twinHref,
    visual: <SourceVisual />,
  },
  {
    title: "Dashboards, alerts and plain-language answers",
    kinds: ["twin"],
    tag: "Digital Twin",
    quote: "The data is there, but answers reach us too late.",
    text: "Each role gets its own view, alerts go to the person who has to act, and leaders can ask a question in plain English and get the report back.",
    audience: "For CXOs, plant heads and supervisors",
    href: twinHref,
    visual: <AnswerVisual />,
  },
  {
    title: "AI visual inspection",
    kinds: ["physical"],
    tag: "Physical AI",
    quote: "Defects still reach customers, and manual checks slip on night shifts.",
    text: "A camera checks every unit on the line, boxes each defect it finds and flags it before the unit moves on, on every shift.",
    audience: "For quality, production and plant heads",
    href: roboticsHref,
    visual: <InspectionVisual />,
  },
  {
    title: "Security patrol",
    kinds: ["physical"],
    tag: "Physical AI",
    quote: "The site is too big to watch every corner, especially at night.",
    text: "We map your routes and blind spots with you, and the robot patrols them through the night, reporting anything unusual to your control room as it happens.",
    audience: "For security heads and facility managers",
    href: roboticsHref,
    visual: <PatrolVisual />,
  },
  {
    title: "Asset inspection rounds",
    kinds: ["physical", "twin"],
    tag: "Physical AI + Digital Twin",
    quote: "Daily rounds take hours and depend on who is on shift.",
    text: "A robot walks the same route every day, reads gauges and takes thermal images, and the readings go straight into the twin.",
    audience: "For maintenance heads at utilities and plants",
    href: roboticsHref,
    visual: <RoundsVisual />,
    toConfirm: true,
  },
];

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All use cases" },
  { key: "twin", label: "Digital Twin" },
  { key: "physical", label: "Physical AI" },
];

export function UseCaseGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = useCases.filter((u) => filter === "all" || u.kinds.includes(filter));
  const count = (f: Filter) => (f === "all" ? useCases.length : useCases.filter((u) => u.kinds.includes(f)).length);

  return (
    <div>
      <div role="group" aria-label="Filter use cases" className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-[#14304f]/10 bg-white p-1.5 shadow-[0_18px_40px_-30px_rgba(20,48,79,0.5)]">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                active ? "bg-[#0b6e50] text-white shadow-md" : "text-[#14304f] hover:bg-[#e6f4ee] hover:text-[#0b6e50]"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 text-[0.7rem] tabular-nums ${active ? "bg-white/20" : "bg-[#eef2f8] text-[#4b5a74]"}`}
              >
                {count(f.key)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} use cases
      </p>

      <ul key={filter} className="enter-up mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((u) => (
          <li
            key={u.title}
            className="group relative flex flex-col overflow-hidden rounded-[26px] border border-[#14304f]/10 bg-white shadow-[0_30px_60px_-45px_rgba(20,48,79,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#0b6e50]/30 hover:shadow-[0_30px_60px_-30px_rgba(11,110,80,0.45)]"
          >
            <div className="relative m-2 h-44 overflow-hidden rounded-[20px] bg-[#0b1a2e] p-4">
              <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#34c996]/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />
              <div className="relative h-full">{u.visual}</div>
            </div>

            <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider ${
                    u.kinds.length > 1
                      ? "bg-gradient-to-r from-[#e6f4ee] to-[#fff1df] text-[#14304f]"
                      : u.kinds[0] === "twin"
                        ? "bg-[#e6f4ee] text-[#0b6e50]"
                        : "bg-[#eef2f8] text-[#14304f]"
                  }`}
                >
                  {u.tag}
                </span>
                {u.toConfirm && (
                  <span className="rounded-full border border-dashed border-[#d9821f]/60 px-2.5 py-0.5 text-[0.7rem] font-semibold text-[#d9821f]">
                    To confirm
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#14304f]">{u.title}</h3>
              <blockquote className="mt-3 border-l-4 border-[#f5a03a] pl-3 text-[0.98rem] font-medium italic text-[#14304f]">
                “{u.quote}”
              </blockquote>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-[#4b5a74]">{u.text}</p>
              <p className="mt-5 flex items-center gap-2 text-[0.82rem] font-medium text-[#4b5a74]">
                <Check size={15} className="shrink-0 text-[#0b6e50]" aria-hidden="true" /> {u.audience}
              </p>
              <Link
                href={u.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0b6e50] after:absolute after:inset-0 after:content-['']"
              >
                See how it works
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                <span className="sr-only">: {u.title}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
