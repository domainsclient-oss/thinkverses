import Link from "next/link";
import { ArrowRight, Bot, BrainCircuit } from "lucide-react";
import { TwinScene } from "../TwinScene";
import { HeroBackdrop } from "../HeroBackdrop";
import { BackgroundVideo } from "../BackgroundVideo";
import { valueProps } from "@/lib/content";

const propIcons = [BrainCircuit, Bot];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-white">
      {/* Video layer: looping digital-twin footage, dimmed for legibility */}
      <div className="absolute inset-0 -z-30 overflow-hidden" aria-hidden="true">
        <BackgroundVideo name="hero" />
        <div className="absolute inset-0 bg-ink/60 lg:bg-ink/40" />
      </div>

      <HeroBackdrop minimal />

      <div className="mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-10 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-12 lg:px-10 lg:pb-16 lg:pt-32">
        <div className="relative z-10 lg:col-span-7">
          <p className="hero-rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-fog backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
            Digital twin live with a UAE operator for over a year
          </p>
          <h1 className="hero-rise display h-hero" style={{ "--d": "80ms" } as React.CSSProperties}>
            We help industrial teams in the UAE catch problems early.
          </h1>
          <p className="hero-rise lede mt-7 text-white/75" style={{ "--d": "180ms" } as React.CSSProperties}>
            We do it in two ways: digital twins built on your own plant data, and AI robots that inspect your line
            and patrol your site. You can start with either one, and they work better together.
          </p>
          <div className="hero-rise mt-9 flex flex-wrap gap-3" style={{ "--d": "260ms" } as React.CSSProperties}>
            <Link href="/#contact" className="btn btn-primary">
              Book a discovery call <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/#robotics" className="btn btn-ghost">
              Pick your problem
            </Link>
          </div>

          <ul
            className="hero-rise mt-14 grid gap-6 border-t border-white/12 pt-8 sm:grid-cols-2 sm:gap-0"
            style={{ "--d": "380ms" } as React.CSSProperties}
          >
            {valueProps.map((v, i) => {
              const Icon = propIcons[i];
              return (
                <li key={v.title} className="sm:border-l sm:border-white/12 sm:px-5 sm:first:border-l-0 sm:first:pl-0">
                  <Icon size={20} className="text-cyan" aria-hidden="true" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{v.eyebrow}</p>
                  <p className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug [font-stretch:110%]">
                    {v.title}
                  </p>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-white/60">{v.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Twin layer: overlaps the photo edge on desktop, sits on its own panel on mobile */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-[40rem] overflow-hidden rounded-[28px] border border-white/10 lg:overflow-visible lg:rounded-none lg:border-0">
            <TwinScene className="relative w-full drop-shadow-[0_0_30px_rgba(255, 255, 255,0.25)] lg:origin-center lg:scale-[1.3]" />

            <div className="hero-rise absolute -left-[6%] top-[2%] hidden max-w-[15rem] rounded-2xl border border-white/15 bg-ink/70 p-4 shadow-2xl backdrop-blur-md sm:block" style={{ "--d": "1300ms" } as React.CSSProperties}>
              <p className="flex items-center gap-2 text-xs text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" /> Predicted
              </p>
              <p className="mt-1.5 text-sm font-semibold">Tank T-2 pump bearing wear</p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">Schedule inspection before next production run</p>
            </div>
            <div className="hero-rise absolute -bottom-[4%] right-0 hidden max-w-[15rem] rounded-2xl border border-violet/40 bg-ink/70 p-4 shadow-2xl backdrop-blur-md sm:block" style={{ "--d": "1600ms" } as React.CSSProperties}>
              <p className="flex items-center gap-2 text-xs text-[#a996ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" /> Executing
              </p>
              <p className="mt-1.5 text-sm font-semibold">Scenario B sent to robotic cell</p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">Simulated first, then dispatched to the line</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
