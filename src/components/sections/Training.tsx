import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { BackgroundVideo } from "../BackgroundVideo";

const tracks = [
  "Robot inspection round — walks the route on schedule",
  "Readings and thermal images — from gauges sensors cannot reach",
  "The digital twin — adds them to live plant data",
  "An earlier decision — sent to the person who acts",
];

export function Training() {
  return (
    <section id="training" className="bg-white pb-24 sm:pb-32">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="relative isolate grid overflow-hidden rounded-[32px] bg-ink text-white lg:grid-cols-2">
          {/* Video layer, dimmed most where the copy sits */}
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            {/* Mobile: video fills the top window; desktop: whole card */}
            <div className="absolute inset-x-0 top-0 h-[22rem] sm:h-[26rem] lg:inset-0 lg:h-auto">
              <BackgroundVideo name="Training-plan" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/60 lg:to-ink/10" />
            </div>
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet/25 blur-[100px]" />
          </div>

          {/* Open window onto the footage */}
          <div className="min-h-[13rem] sm:min-h-[16rem] lg:order-2 lg:min-h-full" aria-hidden="true" />

          <div className="p-7 sm:p-12 lg:p-16">
            <h2 className="display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)]">What the robots see feeds the twin, so you get one view of your site.</h2>
            <p className="lede mt-6 text-white/75">
              Better together.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {tracks.map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink/40 px-4 py-3 text-[0.95rem] backdrop-blur-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/?topic=training#contact" className="btn btn-primary mt-10">
              Get a Custom Training Plan <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
