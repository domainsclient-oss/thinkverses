"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Reveal } from "../Reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-paper py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-blueprint-light [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <div className="absolute -right-40 -top-20 -z-10 h-96 w-96 rounded-full bg-cyan/15 glow-soft" aria-hidden="true" />
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="display h-section text-ink">Questions, answered</h2>
            <p className="mt-5 text-slate prose-measure">
              Digital Twin, robotics, IoT, AI, implementation and what it means for your business. If your question is
              not here, ask us directly.
            </p>
            <Link href="/#contact" className="btn btn-outline mt-8">
              Ask our team
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-8">
          <ul className="overflow-hidden rounded-[28px] border border-line bg-white px-6 shadow-[0_40px_80px_-50px_rgba(5,8,15,0.35)] sm:px-8">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${base}-q${i}`;
              const panelId = `${base}-a${i}`;
              return (
                <li key={f.q} className="border-b border-line last:border-b-0">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <span className="flex-1">
                        <span className="block text-sm text-cyan-deep">{f.group}</span>
                        <span className="mt-1 block font-display text-[1.15rem] font-semibold leading-snug text-ink [font-stretch:108%] transition-colors group-hover:text-cyan-deep sm:text-[1.25rem]">
                          {f.q}
                        </span>
                      </span>
                      <span
                        className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isOpen ? "rotate-45 border-transparent bg-gradient-to-br from-cyan to-volt text-white shadow-[0_8px_20px_-8px_rgba(47,107,255,0.8)]" : "border-line bg-white text-ink group-hover:border-cyan-deep"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus size={17} />
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={btnId} className="accordion-panel" data-open={isOpen}>
                    <div>
                      <p className="max-w-[64ch] pb-7 pr-14 text-slate" inert={!isOpen}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
