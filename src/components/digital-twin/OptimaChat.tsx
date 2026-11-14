"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Database, Sparkles } from "lucide-react";

/* Animated Optima console: a question is typed, Optima "thinks", then answers in text,
   headline numbers and a chart. Cycles through a few example conversations. */

type Stat = { value: string; label: string; tone: "amber" | "green" | "navy" };
type Chart =
  | { kind: "bars"; groups: { label: string; a: number; b: number }[]; legend: [string, string] }
  | { kind: "hbars"; rows: { label: string; value: number; highlight?: boolean }[]; unit: string }
  | { kind: "line"; points: number[]; labels: string[] };

type Convo = { q: string; a: string; stats: Stat[]; chart: Chart; source: string };

const convos: Convo[] = [
  {
    q: "Compare energy per unit on day and night shifts at Plant 3 this quarter.",
    a: "Energy per unit rose 11% on night shifts while output stayed flat. Most of the increase came from Line B.",
    stats: [
      { value: "+11%", label: "energy / unit, nights", tone: "amber" },
      { value: "0%", label: "change in output", tone: "green" },
      { value: "Line B", label: "biggest contributor", tone: "navy" },
    ],
    chart: {
      kind: "bars",
      legend: ["Day", "Night"],
      groups: [
        { label: "Line A", a: 58, b: 61 },
        { label: "Line B", a: 62, b: 88 },
        { label: "Line C", a: 55, b: 60 },
        { label: "Line D", a: 60, b: 63 },
      ],
    },
    source: "Plant 3 energy meters · MES output",
  },
  {
    q: "Which plant had the most unplanned downtime last month?",
    a: "Plant 5 lost 14.2 hours, mostly from two chiller faults. That is 38% above its six-month average.",
    stats: [
      { value: "14.2 h", label: "downtime at Plant 5", tone: "amber" },
      { value: "+38%", label: "vs six-month average", tone: "amber" },
      { value: "2", label: "chiller faults", tone: "navy" },
    ],
    chart: {
      kind: "hbars",
      unit: "h",
      rows: [
        { label: "Plant 1", value: 4.1 },
        { label: "Plant 2", value: 6.8 },
        { label: "Plant 3", value: 3.2 },
        { label: "Plant 4", value: 7.5 },
        { label: "Plant 5", value: 14.2, highlight: true },
        { label: "Plant 6", value: 5.0 },
      ],
    },
    source: "Maintenance logs · SCADA alarms",
  },
  {
    q: "How has water use per tonne changed across all six plants this year?",
    a: "Water use per tonne is down 9% since January, with the biggest drop after the March irrigation change.",
    stats: [
      { value: "−9%", label: "water per tonne, YTD", tone: "green" },
      { value: "6", label: "plants compared", tone: "navy" },
      { value: "March", label: "largest drop", tone: "green" },
    ],
    chart: {
      kind: "line",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      points: [100, 99, 97, 93, 92.5, 92, 91.6, 91.4, 91.2, 91],
    },
    source: "Flow meters · production records",
  },
];

type Phase = "typing" | "thinking" | "answering" | "visual" | "hold";

const TYPE_MS = 28;
const ANSWER_MS = 16;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

export function OptimaChat() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [qChars, setQChars] = useState(0);
  const [aChars, setAChars] = useState(0);

  const convo = convos[index];

  // Only run while the console is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Phase machine.
  useEffect(() => {
    if (reduced) return;
    if (!inView) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (qChars < convo.q.length) t = setTimeout(() => setQChars((c) => c + 1), TYPE_MS);
      else t = setTimeout(() => setPhase("thinking"), 350);
    } else if (phase === "thinking") {
      t = setTimeout(() => setPhase("answering"), 1100);
    } else if (phase === "answering") {
      if (aChars < convo.a.length) t = setTimeout(() => setAChars((c) => c + 2), ANSWER_MS);
      else t = setTimeout(() => setPhase("visual"), 200);
    } else if (phase === "visual") {
      t = setTimeout(() => setPhase("hold"), 1200);
    } else {
      t = setTimeout(() => goTo((index + 1) % convos.length), 4200);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qChars, aChars, inView, reduced, index]);

  function goTo(i: number) {
    setIndex(i);
    setQChars(0);
    setAChars(0);
    setPhase("typing");
  }

  // Reduced motion: show the finished conversation, no typing.
  const showAll = reduced;
  const qText = showAll ? convo.q : convo.q.slice(0, qChars);
  const showAnswer = showAll || phase === "answering" || phase === "visual" || phase === "hold";
  const aText = showAll ? convo.a : convo.a.slice(0, aChars);
  const showVisual = showAll || phase === "visual" || phase === "hold";

  return (
    <div ref={rootRef}>
      {/* Screen readers get the conversations as plain text. */}
      <ul className="sr-only">
        {convos.map((c) => (
          <li key={c.q}>
            Question: {c.q} Answer: {c.a}
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9fb0cc]">
            <Sparkles size={12} className="text-[#34c996]" /> Optima
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[0.7rem] text-[#9fb0cc]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34c996]" /> Connected to the twin
          </span>
        </div>

        <div className="flex min-h-[34rem] flex-col gap-5 p-5 sm:min-h-[31rem] sm:p-7">
          {/* question */}
          <div className="flex justify-end">
            <p className="max-w-[90%] rounded-2xl rounded-br-md bg-[#34c996] px-4 py-3 text-[0.95rem] font-medium text-[#0b1a2e]">
              {qText}
              {!showAll && phase === "typing" && (
                <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[#0b1a2e]" />
              )}
            </p>
          </div>

          {/* answer */}
          {phase !== "typing" || showAll ? (
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0b6e50] to-[#34c996]">
                <Sparkles size={14} />
              </span>
              <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-white/10 bg-[#0e2038] p-4 sm:p-5">
                {!showAnswer ? (
                  <div className="flex items-center gap-2 py-1 text-[0.85rem] text-[#9fb0cc]">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#34c996]"
                          style={{ animationDelay: `${d * 140}ms` }}
                        />
                      ))}
                    </span>
                    Reading the twin…
                  </div>
                ) : (
                  <>
                    <p className="text-[0.95rem] leading-relaxed text-white">{aText}</p>

                    <div
                      className={`transition-all duration-700 ease-out ${
                        showVisual ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      }`}
                    >
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {convo.stats.map((s, i) => (
                          <div
                            key={s.label}
                            className="rounded-xl bg-white/[0.05] px-3 py-2.5 transition-all duration-500"
                            style={{ transitionDelay: showVisual ? `${i * 120}ms` : "0ms" }}
                          >
                            <p
                              className={`font-display text-[1.15rem] font-bold leading-none sm:text-[1.3rem] ${
                                s.tone === "amber" ? "text-[#f5a03a]" : s.tone === "green" ? "text-[#34c996]" : "text-white"
                              }`}
                            >
                              {s.value}
                            </p>
                            <p className="mt-1.5 text-[0.68rem] leading-tight text-[#9fb0cc]">{s.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 rounded-xl bg-white/[0.04] p-3 sm:p-4">
                        <ChartView key={index} chart={convo.chart} play={showVisual} />
                      </div>

                      <p className="mt-3 inline-flex items-center gap-1.5 text-[0.7rem] text-[#9fb0cc]">
                        <Database size={11} className="text-[#34c996]" /> From: {convo.source}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Conversation picker */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {convos.map((c, i) => (
          <button
            key={c.q}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show example question ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-[#34c996]" : "w-2 bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ChartView({ chart, play }: { chart: Chart; play: boolean }) {
  // Grow from zero after mount so the CSS transition runs.
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    if (!play) return;
    const id = setTimeout(() => setGrown(true), 40);
    return () => clearTimeout(id);
  }, [play]);

  if (chart.kind === "bars") {
    return (
      <div>
        <div className="mb-2 flex gap-3 text-[0.65rem] text-[#9fb0cc]">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-[#f5a03a]/40" /> {chart.legend[0]}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-[#f5a03a]" /> {chart.legend[1]}
          </span>
        </div>
        <div className="flex h-24 items-end gap-3">
          {chart.groups.map((g, i) => (
            <div key={g.label} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-20 w-full items-end gap-1">
                {[g.a, g.b].map((v, j) => (
                  <div
                    key={j}
                    className={`flex-1 rounded-t-[4px] bg-[#f5a03a] transition-[height] duration-700 ease-out ${j === 0 ? "opacity-40" : ""}`}
                    style={{ height: grown ? `${v}%` : "0%", transitionDelay: `${i * 90 + j * 60}ms` }}
                  />
                ))}
              </div>
              <span className="text-[0.62rem] text-[#9fb0cc]">{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (chart.kind === "hbars") {
    const max = Math.max(...chart.rows.map((r) => r.value));
    return (
      <div className="space-y-1.5">
        {chart.rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-2 text-[0.65rem]">
            <span className={`w-11 shrink-0 ${r.highlight ? "font-semibold text-white" : "text-[#9fb0cc]"}`}>{r.label}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className={`h-full rounded-full transition-[width] duration-700 ease-out ${r.highlight ? "bg-[#f5a03a]" : "bg-[#34c996]/50"}`}
                style={{ width: grown ? `${(r.value / max) * 100}%` : "0%", transitionDelay: `${i * 70}ms` }}
              />
            </div>
            <span className={`w-9 shrink-0 text-right tabular-nums ${r.highlight ? "font-semibold text-[#f5a03a]" : "text-[#9fb0cc]"}`}>
              {r.value}
              {chart.unit}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // line
  const W = 300;
  const H = 90;
  const min = Math.min(...chart.points) - 2;
  const max = Math.max(...chart.points) + 1;
  const xy = chart.points.map((p, i) => [
    (i / (chart.points.length - 1)) * W,
    H - ((p - min) / (max - min)) * H,
  ]);
  const d = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${W},${H} L0,${H} Z`;
  const [lx, ly] = xy[xy.length - 1];
  return (
    <div>
      <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-24 w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="optima-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#34c996" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#34c996" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#optima-area)" className="transition-opacity duration-700" style={{ opacity: grown ? 1 : 0, transitionDelay: "500ms" }} />
        <path
          d={d}
          fill="none"
          stroke="#34c996"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={grown ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
      <span
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34c996] shadow-[0_0_0_4px_rgba(52,201,150,0.25)] transition-opacity duration-300"
        style={{ left: `${(lx / W) * 100}%`, top: `${(ly / H) * 100}%`, opacity: grown ? 1 : 0, transitionDelay: "1.1s" }}
      />
      </div>
      <div className="mt-1 flex justify-between text-[0.6rem] text-[#9fb0cc]">
        {chart.labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}
