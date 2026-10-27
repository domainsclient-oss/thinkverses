"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, MapPin, Network, Radio, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";
import { countries, emirates, serviceRegions, services, solutionPath, type ServiceKey } from "@/lib/locations";

const icons: Record<ServiceKey, LucideIcon> = {
  "digital-twin": Network,
  "robotic-process-automation": Bot,
  iot: Radio,
};

// Pin positions projected from approximate capital coordinates (lon 44–60°E, lat 21–31°N) onto an 800×500 canvas.
const pins: Record<string, { x: number; y: number; labelDx?: number; labelDy?: number }> = {
  kuwait: { x: 199, y: 81 },
  "saudi-arabia": { x: 135, y: 315 },
  bahrain: { x: 327, y: 247, labelDy: -18 },
  qatar: { x: 377, y: 286, labelDy: 28 },
  uae: { x: 560, y: 300, labelDx: 0, labelDy: 40 },
  oman: { x: 720, y: 370 },
};
const emiratePins: Record<string, { x: number; y: number }> = {
  dubai: { x: 565, y: 290 },
  "abu-dhabi": { x: 520, y: 327 },
  sharjah: { x: 572, y: 281 },
  "ras-al-khaimah": { x: 597, y: 260 },
};
const hub = emiratePins.dubai;

function arc(to: { x: number; y: number }) {
  const mx = (hub.x + to.x) / 2;
  const my = Math.min(hub.y, to.y) - Math.abs(hub.x - to.x) * 0.22 - 20;
  return `M${hub.x} ${hub.y} Q${mx} ${my} ${to.x} ${to.y}`;
}

function RegionMap({ available, hovered }: { available: string[]; hovered: string | null }) {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="loc-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="#ffffff" fillOpacity="0.09" />
        </pattern>
        <radialGradient id="loc-hub" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="loc-arc" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#loc-dots)" />
      <circle cx={hub.x} cy={hub.y} r="150" fill="url(#loc-hub)" />

      {countries
        .filter((c) => c.slug !== "uae")
        .map((c) => {
          const on = available.includes(c.slug);
          const hot = hovered === c.slug;
          return (
            <path
              key={c.slug}
              d={arc(pins[c.slug])}
              fill="none"
              stroke="url(#loc-arc)"
              strokeWidth={hot ? 2.4 : 1.4}
              strokeOpacity={on ? (hot ? 1 : 0.55) : 0.1}
              strokeDasharray="5 6"
              className={on ? "twin-flow" : undefined}
              style={{ transition: "stroke-opacity .4s, stroke-width .4s" }}
            />
          );
        })}

      {Object.entries(emiratePins).map(([slug, p]) => (
        <circle
          key={slug}
          cx={p.x}
          cy={p.y}
          r={hovered === slug ? 6 : 3.5}
          fill={hovered === slug ? "#ffffff" : "#a9b6cc"}
          style={{ transition: "r .3s, fill .3s" }}
        />
      ))}

      {countries.map((c) => {
        const p = pins[c.slug];
        const on = available.includes(c.slug);
        const hot = hovered === c.slug || (c.slug === "uae" && !!hovered && hovered in emiratePins);
        const isHub = c.slug === "uae";
        return (
          <g key={c.slug} style={{ opacity: on ? 1 : 0.3, transition: "opacity .4s" }}>
            {on && (
              <circle cx={p.x} cy={p.y} r="10" fill="#ffffff" fillOpacity="0.4" className="pulse" style={{ ["--d" as string]: `${(p.x % 7) * 300}ms` }} />
            )}
            {!isHub && (
              <circle
                cx={p.x}
                cy={p.y}
                r={hot ? 10 : 7}
                fill={hot ? "#ffffff" : "#0f1f40"}
                stroke="#ffffff"
                strokeWidth="2"
                style={{ transition: "r .3s, fill .3s" }}
              />
            )}
            <text
              x={p.x + (p.labelDx ?? 0)}
              y={p.y + (p.labelDy ?? -20)}
              textAnchor="middle"
              fontSize="15"
              className="max-sm:[font-size:26px]"
              fontWeight="600"
              fill="#ffffff"
              fillOpacity={hot ? 1 : 0.7}
              style={{ transition: "fill-opacity .3s" }}
            >
              {c.name}
            </text>
          </g>
        );
      })}

      <g>
        <circle cx={hub.x} cy={hub.y} r="13" fill="#0a1630" stroke="#ffffff" strokeWidth="2.5" />
        <circle cx={hub.x} cy={hub.y} r="5" fill="#ffffff" />
      </g>
    </svg>
  );
}

export function Locations() {
  const [active, setActive] = useState<ServiceKey>("digital-twin");
  const [hovered, setHovered] = useState<string | null>(null);
  const available = serviceRegions[active];

  return (
    <section id="locations" className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-blueprint opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="absolute -right-40 -top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-volt/20 blur-[140px]" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-cyan/10 blur-[140px]" aria-hidden="true" />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3.5 py-1.5 text-sm font-medium text-cyan">
              <MapPin size={14} aria-hidden="true" />
              Headquartered in Dubai · Serving the GCC
            </p>
            <h2 className="display h-section max-w-4xl">
              Our Digital Twin, Robotics &amp; IoT Solutions{" "}
              <span className="bg-gradient-to-r from-cyan via-[#7fa0ff] to-[#0056a7] bg-clip-text text-transparent">across Globe!</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Map */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[32px] border border-white/10 bg-ink-2/80 p-4 sm:p-6">
              <div className="flex items-center justify-between px-2 pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                <span>Regional coverage</span>
                <span className="inline-flex items-center gap-2 text-cyan">
                  <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden="true" /> Dubai HQ
                </span>
              </div>
              <div className="mt-2 aspect-[8/5]">
                <RegionMap available={available} hovered={hovered} />
              </div>
            </div>
          </Reveal>

          {/* Service switcher + regions */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-[32px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-7">
              <div role="tablist" aria-label="Solutions" className="grid grid-cols-3 gap-1.5 rounded-2xl bg-ink/60 p-1.5">
                {services.map((s) => {
                  const Icon = icons[s.key];
                  const on = s.key === active;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      role="tab"
                      id={`loc-tab-${s.key}`}
                      aria-selected={on}
                      aria-controls={`loc-panel-${s.key}`}
                      onClick={() => setActive(s.key)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center text-[0.8rem] font-semibold leading-tight transition-all duration-300 sm:text-sm ${
                        on ? "bg-white text-ink shadow-lg" : "text-white/65 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={18} aria-hidden="true" />
                      {s.short === "Robotic Process Automation" ? "Robotics (RPA)" : s.short}
                    </button>
                  );
                })}
              </div>

              {services.map((s) => {
                const regionsForService = countries.filter((c) => serviceRegions[s.key].includes(c.slug));
                return (
                  <div
                    key={s.key}
                    role="tabpanel"
                    id={`loc-panel-${s.key}`}
                    aria-labelledby={`loc-tab-${s.key}`}
                    hidden={s.key !== active}
                    className="mt-6 flex-1"
                  >
                    <h3 className="font-display text-xl font-semibold [font-stretch:110%]">{s.title}</h3>
                    <ul className="mt-4 divide-y divide-white/10" onMouseLeave={() => setHovered(null)}>
                      {regionsForService.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={solutionPath(s.key, c.slug)}
                            onMouseEnter={() => setHovered(c.slug)}
                            onFocus={() => setHovered(c.slug)}
                            onBlur={() => setHovered(null)}
                            className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-white"
                          >
                            <span className="flex items-center gap-3">
                              <span className="h-2 w-2 rounded-full bg-cyan/40 transition-colors group-hover:bg-cyan" aria-hidden="true" />
                              <span className="font-medium">
                                {s.title} in {c.name}
                              </span>
                              {c.slug === "uae" && (
                                <span className="rounded-full bg-cyan/15 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-cyan">HQ</span>
                              )}
                            </span>
                            <ArrowUpRight
                              size={17}
                              className="shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                              aria-hidden="true"
                            />
                          </Link>
                          {c.slug === "uae" && (
                            <ul className="mb-3.5 flex flex-wrap gap-2 pl-5">
                              {emirates
                                .filter((e) => serviceRegions[s.key].includes(e.slug))
                                .map((e) => (
                                  <li key={e.slug}>
                                    <Link
                                      href={solutionPath(s.key, e.slug)}
                                      onMouseEnter={() => setHovered(e.slug)}
                                      onFocus={() => setHovered(e.slug)}
                                      onBlur={() => setHovered(null)}
                                      className="inline-block rounded-full border border-white/15 px-3 py-1 text-sm text-white/70 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
                                    >
                                      <span className="sr-only">{s.title} in </span>
                                      {e.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
