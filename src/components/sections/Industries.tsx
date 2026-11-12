import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { industries } from "@/lib/content";

// Editorial bento placement per tile, in the same order as `industries`.
const layout = [
  "md:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "md:col-span-2 lg:col-span-4",
];

export function Industries() {
  return (
    <section id="industries" className="relative isolate overflow-hidden surface-void py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-tech-grid opacity-30 mask-fade-y" aria-hidden="true" />
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 className="display h-section">Our Impact in Industries</h2>
          </div>
          <p className="lede text-white/65 lg:col-span-5 lg:col-start-8">
            At Thinkverses Solutions, our innovative Digital Twin technology is empowering industries to achieve
            operational excellence and sustainability. Explore how our solutions are delivering measurable ROI while
            driving a greener future.
          </p>
        </Reveal>

        <ul className="mt-14 grid auto-rows-[minmax(18rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[17rem]">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 3) * 90} className={layout[i]}>
              <Link
                href="/#contact"
                className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[24px] border border-white/[0.08] p-6 text-white transition-[border-color,box-shadow] duration-500 hover:border-cyan/50 hover:shadow-[0_0_0_1px_rgba(62,224,255,0.25),0_40px_80px_-40px_rgba(47,107,255,0.6)] sm:p-7"
              >
                <Image
                  src={ind.image}
                  alt={ind.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"}
                  className="zoom-img -z-10 object-cover saturate-[0.85]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#03060d] via-[#03060d]/65 to-[#03060d]/5" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-volt/25 via-transparent to-cyan/10 opacity-60 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 -z-10 bg-scanlines opacity-30" />
                <span className="hud-corners pointer-events-none absolute inset-3 rounded-[18px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className="glass absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full text-white transition-all duration-500 group-hover:bg-cyan group-hover:text-ink">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
                <h3 className={`display ${i === 0 ? "h-section" : "h-sub"}`}>{ind.name}</h3>
                <p className={`mt-2 max-w-[44ch] text-white/70 ${i === 0 ? "text-[1.05rem]" : "text-[0.95rem]"}`}>{ind.text}</p>
                <span className="sr-only">Talk to us about {ind.name}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
