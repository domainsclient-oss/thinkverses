"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { setCheckResult } from "./checkStore";

const questions = [
  "Do you know which systems hold your plant data?",
  "Is your key plant data in one place that teams trust?",
  "Do you get warnings before machines fail?",
  "Can leaders get answers without waiting for an analyst?",
];

// Bottom to top: layer 1 is the foundation.
const layers = [
  {
    n: 1,
    name: "Foundation",
    title: "You are at the foundation stage.",
    text: "Most plants start here. A maturity assessment maps your sources and gives you a roadmap.",
  },
  {
    n: 2,
    name: "Ingest and store",
    title: "You are at the ingest and store stage.",
    text: "You know where your data lives. The next step is bringing it into one place your teams trust.",
  },
  {
    n: 3,
    name: "Model and analyse",
    title: "You are at the model and analyse stage.",
    text: "Your data is in one place. The next step is learning each asset's normal pattern so you get warnings early.",
  },
  {
    n: 4,
    name: "Serve and decide",
    title: "You are at the serve and decide stage.",
    text: "You see problems coming. The next step is putting answers in front of leaders without waiting for an analyst.",
  },
  {
    n: 5,
    name: "Business value",
    title: "You are at the business value stage.",
    text: "Your data already drives decisions. A maturity assessment shows where the twin can add the most value next.",
  },
];

type Answer = "yes" | "no" | undefined;

export function MaturityCheck({ bookHref }: { bookHref: string }) {
  const [answers, setAnswers] = useState<Answer[]>([undefined, undefined, undefined, undefined]);

  // Each stage builds on the one below, so the level is the run of "yes" answers from the first question.
  let level = 1;
  for (const a of answers) {
    if (a !== "yes") break;
    level += 1;
  }
  const answered = answers.filter(Boolean).length;
  const result = layers[level - 1];

  useEffect(() => {
    setCheckResult(answered > 0 ? { level, name: result.name } : null);
  }, [answered, level, result.name]);

  const set = (i: number, v: "yes" | "no") =>
    setAnswers((prev) => prev.map((a, j) => (j === i ? v : a)));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
      {/* Questions */}
      <div>
        <div className="mb-5 flex items-center gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#14304f]/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0b6e50] to-[#34c996] transition-[width] duration-500"
              style={{ width: `${(answered / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium tabular-nums text-[#4b5a74]" aria-live="polite">
            {answered} of {questions.length} answered
          </span>
          {answered > 0 && (
            <button
              type="button"
              onClick={() => setAnswers([undefined, undefined, undefined, undefined])}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0b6e50] hover:underline"
            >
              <RotateCcw size={14} aria-hidden="true" /> Reset
            </button>
          )}
        </div>

        <ol className="space-y-3">
          {questions.map((q, i) => {
            const a = answers[i];
            return (
              <li
                key={q}
                className={`flex flex-col gap-4 rounded-2xl border bg-white p-4 transition duration-300 sm:flex-row sm:items-center sm:p-5 ${
                  a ? "border-[#0b6e50]/25 shadow-[0_18px_40px_-28px_rgba(11,110,80,0.6)]" : "border-[#14304f]/10"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${
                    a === "yes"
                      ? "bg-[#0b6e50] text-white"
                      : a === "no"
                        ? "bg-[#fff1df] text-[#d9821f]"
                        : "bg-[#eef2f8] text-[#14304f]"
                  }`}
                  aria-hidden="true"
                >
                  {a === "yes" ? <Check size={16} /> : i + 1}
                </span>
                <p id={`dt-q-${i}`} className="flex-1 font-medium leading-snug text-[#14304f]">
                  {q}
                </p>
                <div
                  role="radiogroup"
                  aria-labelledby={`dt-q-${i}`}
                  className="relative grid shrink-0 grid-cols-2 rounded-full bg-[#eef2f8] p-1"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full shadow transition-all duration-300 ${
                      a === undefined
                        ? "opacity-0"
                        : a === "yes"
                          ? "translate-x-0 bg-[#0b6e50] opacity-100"
                          : "translate-x-full bg-[#14304f] opacity-100"
                    }`}
                  />
                  {(["yes", "no"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={a === v}
                      onClick={() => set(i, v)}
                      className={`relative z-10 min-w-[5.5rem] rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        a === v ? "text-white" : "text-[#14304f] hover:text-[#0b6e50]"
                      }`}
                    >
                      {v === "yes" ? "Yes" : "Not yet"}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Result */}
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0b1a2e] p-6 text-white sm:p-8">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-24 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#34c996]/25 blur-3xl transition-transform duration-700"
          style={{ transform: `translate(-50%, ${(5 - level) * 28}px)` }}
        />

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#34c996]">Your result</p>

        {/* Layer pyramid: top (5) narrowest */}
        <ol className="mt-6 flex flex-col-reverse items-center gap-2" aria-label="Data journey layers">
          {layers.map((l) => {
            const state = l.n === level ? "current" : l.n < level ? "done" : "ahead";
            return (
              <li
                key={l.n}
                aria-current={state === "current" ? "step" : undefined}
                style={{ width: `${100 - (l.n - 1) * 11}%` }}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-all duration-500 ${
                  state === "current"
                    ? "scale-[1.03] bg-gradient-to-r from-[#0b6e50] to-[#34c996] font-semibold text-white shadow-[0_0_30px_-4px_rgba(52,201,150,0.7)]"
                    : state === "done"
                      ? "bg-[#34c996]/15 text-[#bfeedd]"
                      : "border border-dashed border-white/15 text-[#9fb0cc]"
                }`}
              >
                <span className="tabular-nums">Layer {l.n}</span>
                <span className="truncate pl-3 text-right">{l.name}</span>
              </li>
            );
          })}
        </ol>

        <div key={level} className="enter-up mt-8" aria-live="polite">
          <h3 className="display text-[1.6rem] leading-tight">{result.title}</h3>
          <p className="mt-3 text-[#c9d4e5]">{result.text}</p>
        </div>

        <Link
          href={bookHref}
          className="btn group mt-8 bg-white text-[#0b6e50] hover:bg-[#e6f4ee]"
        >
          Book a maturity assessment call <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
