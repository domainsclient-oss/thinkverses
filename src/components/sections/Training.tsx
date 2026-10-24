import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import trainingImg from "../../../public/images/training.jpg";

const tracks = ["Digital Twin fundamentals", "AI for operations", "IoT and sensor integration", "Robotics and automation"];

export function Training() {
  return (
    <section id="training" className="bg-white pb-24 sm:pb-32">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="relative isolate grid overflow-hidden rounded-[32px] bg-ink text-white lg:grid-cols-2">
          <div className="absolute inset-0 -z-10 bg-blueprint opacity-70" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-violet/30 blur-[100px]" aria-hidden="true" />
          <div className="relative min-h-[18rem] lg:order-2 lg:min-h-full">
            <Image src={trainingImg} alt="Team mapping out a plan on a whiteboard" fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent lg:bg-gradient-to-r" />
          </div>
          <div className="p-7 sm:p-12 lg:p-16">
            <h2 className="display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)]">Transform Operations with Digital Twins, AI, and Robotics.</h2>
            <p className="lede mt-6 text-white/70">
              Practical training for people who want to grow — and businesses that need to move faster.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {tracks.map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[0.95rem]">
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
