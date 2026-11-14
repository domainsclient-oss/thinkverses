import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SceneMount } from "../three/SceneMount";
import { HeroEntryCards } from "../HeroEntryCards";

// Hero palette (light, matches the approved reference)
// green #0b6e50 · badge #e8f5ef · heading #14304f · body #4a5868

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;


export function Hero() {
  return (
    <section id="top" data-header-light className="relative isolate overflow-hidden bg-white text-[#14304f]">
      <div className="relative min-h-[100svh]">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f6fbf8_60%,#ffffff_100%)]" />
          <div className="absolute -right-[8%] -top-[15%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,#cfeee0_0%,rgba(207,238,224,0)_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(20,48,79,0.13)_1px,transparent_1.4px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_65%_at_72%_40%,black_10%,transparent_75%)]" />
        </div>

        {/* Readability scrims (desktop, where the scene sits behind the copy) */}
        <div className="pointer-events-none absolute inset-0 -z-[5] hidden lg:block" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-white via-white to-transparent" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        <div className="mx-auto flex min-h-[100svh] max-w-[90rem] flex-col px-4 pb-12 pt-28 sm:px-6 lg:px-10 lg:pt-36">
          <div className="relative z-10 max-w-[44rem]">
            <h1 className="hero-rise-solid display max-w-[15ch] text-[clamp(2.4rem,1.2rem+3.3vw,4.5rem)] leading-[1.02] text-[#14304f]">
              We help industrial teams <span className="text-[#0b6e50]">catch problems early.</span>
            </h1>
            <p className="hero-rise lede mt-7 max-w-[46ch] text-[#4a5868]" style={d(220)}>
              We do it in two ways: a Digital Twin built on your own plant data, and AI robots that inspect your line and
              patrol your site. You can start with either one, and they work better together.
            </p>
            <div className="hero-rise mt-9 flex flex-wrap gap-3" style={d(300)}>
              <Link
                href="/#contact"
                className="btn bg-[#0b6e50] text-white shadow-[0_12px_28px_-14px_rgba(11,110,80,0.8)] hover:bg-[#095c43]"
              >
                Book a discovery call <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/#why"
                className="btn border border-[#14304f]/20 bg-white text-[#14304f] hover:border-[#0b6e50] hover:text-[#0b6e50]"
              >
                Pick your problem
              </Link>
            </div>
          </div>

          {/* Scene: in-flow window on mobile, full-bleed background on desktop */}
          <div className="relative -mx-4 mt-8 h-[22rem] sm:-mx-6 sm:h-[28rem] lg:absolute lg:inset-y-0 lg:left-[44%] lg:right-0 lg:-z-10 lg:mx-0 lg:mt-0 lg:h-auto">
            <SceneMount
              scene="station"
              props={{ mode: "hero", light: true }}
              poster="/scenes/station-hero.webp"
              priority
              posterDesktopOnly
              autoStart
              className="absolute inset-0"
            />
            {/* Edge fades as overlays (a CSS mask on a live WebGL canvas is re-composited every frame) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-white to-transparent lg:hidden" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-white to-transparent lg:hidden" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[24%] bg-gradient-to-r from-white to-transparent lg:block" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[20%] bg-gradient-to-t from-white to-transparent lg:block" aria-hidden="true" />
          </div>

          {/* Two ways in */}
          <div className="hero-rise relative z-10 mt-8 lg:mt-auto lg:pt-12" style={d(480)}>
            <HeroEntryCards />
          </div>
        </div>
      </div>
    </section>
  );
}
