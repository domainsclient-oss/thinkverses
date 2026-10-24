"use client";

import { useState } from "react";
import { Boxes, Cpu, Radio, Sparkles, Target, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";
import { differentiators } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  context: Boxes,
  genai: Sparkles,
  iot: Radio,
  custom: Cpu,
  decision: Target,
};

const C = 260;
const R = 190;

function Hub({ active }: { active: number }) {
  const nodes = differentiators.map((d, i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return { ...d, x: Math.round(C + R * Math.cos(a)), y: Math.round(C + R * Math.sin(a)) };
  });
  return (
    <svg viewBox="0 0 520 520" className="mx-auto w-full max-w-[34rem]" aria-hidden="true">
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(169,182,204,0.18)" strokeDasharray="2 8" />
      <circle cx={C} cy={C} r={R - 70} fill="none" stroke="rgba(169,182,204,0.1)" />
      {nodes.map((n, i) => (
        <line
          key={`l-${n.key}`}
          x1={C}
          y1={C}
          x2={n.x}
          y2={n.y}
          stroke={i === active ? "#1fc8e8" : "rgba(169,182,204,0.28)"}
          strokeWidth={i === active ? 2 : 1}
          strokeDasharray={i === active ? "6 6" : undefined}
          className={i === active ? "twin-flow" : undefined}
          style={{ transition: "stroke 0.3s" }}
        />
      ))}
      <circle cx={C} cy={C} r="78" fill="#0a1630" stroke="#1fc8e8" strokeOpacity="0.6" />
      <circle cx={C} cy={C} r="92" fill="none" stroke="#1fc8e8" strokeOpacity="0.15" />
      <text x={C} y={C - 6} textAnchor="middle" fill="#fff" fontSize="19" fontWeight="700" style={{ fontFamily: "var(--font-display)", fontStretch: "112%" }}>
        Your next
      </text>
      <text x={C} y={C + 18} textAnchor="middle" fill="#1fc8e8" fontSize="19" fontWeight="700" style={{ fontFamily: "var(--font-display)", fontStretch: "112%" }}>
        decision
      </text>
      {nodes.map((n, i) => (
        <g key={n.key} style={{ transition: "opacity 0.3s" }} opacity={i === active ? 1 : 0.75}>
          <circle cx={n.x} cy={n.y} r="38" fill={i === active ? "#1fc8e8" : "#252f3f"} stroke={i === active ? "#1fc8e8" : "rgba(169,182,204,0.35)"} style={{ transition: "fill 0.3s" }} />
          <text x={n.x} y={n.y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={i === active ? "#0a1630" : "#e3e9f3"}>
            {n.short}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function WhyThinkverses() {
  const [active, setActive] = useState(4);

  return (
    <section id="why" className="relative overflow-hidden bg-graphite py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-blueprint opacity-60 [mask-image:radial-gradient(ellipse_at_25%_50%,black,transparent_65%)]" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-violet/15 blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display h-section lg:col-span-7">Transforming Industries with Digital Twin Solutions</h2>
          <p className="lede text-white/65 lg:col-span-5">
            Five choices shape every system we build, and they all point to the same place: the decision your team needs
            to make next.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 hidden sm:block lg:order-1">
            <Hub active={active} />
          </Reveal>

          <Reveal as="ul" delay={120} className="order-1 divide-y divide-white/10 border-y border-white/10 lg:order-2">
            {differentiators.map((d, i) => {
              const Icon = icons[d.key];
              const on = i === active;
              return (
                <li
                  key={d.key}
                  onMouseEnter={() => setActive(i)}
                  className={`relative flex gap-5 py-6 pl-5 [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-cyan [&:has(:focus-visible)]:outline transition-colors duration-300 ${on ? "bg-white/[0.04]" : ""}`}
                >
                  <span className={`absolute inset-y-0 left-0 w-0.5 transition-colors duration-300 ${on ? "bg-cyan" : "bg-transparent"}`} aria-hidden="true" />
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${on ? "border-cyan bg-cyan text-ink" : "border-white/20 text-cyan"}`}>
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.2rem] font-semibold [font-stretch:110%]">
                      <button type="button" onClick={() => setActive(i)} onFocus={() => setActive(i)} aria-pressed={on} className="text-left after:absolute after:inset-0 focus-visible:outline-none">
                        {d.title}
                      </button>
                    </h3>
                    <p className="mt-1.5 max-w-[52ch] text-[0.97rem] leading-relaxed text-white/65">{d.text}</p>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
