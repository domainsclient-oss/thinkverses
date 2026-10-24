import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { industries } from "@/lib/content";

// Bento placement per tile, in the same order as `industries`.
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
    <section id="industries" className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32">
      <div className="absolute inset-0 bg-blueprint-light [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3.5 py-1.5 text-sm font-medium text-cyan-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-deep" aria-hidden="true" />
              Industries
            </p>
            <h2 className="display h-section">Our Impact in Industries</h2>
          </div>
          <p className="lede text-slate lg:col-span-5 lg:col-start-8">
            At Thinkverses Solutions, our innovative Digital Twin technology is empowering industries to achieve
            operational excellence and sustainability. Explore how our solutions are delivering measurable ROI while
            driving a greener future.
          </p>
        </Reveal>

        <ul className="mt-14 grid auto-rows-[minmax(17rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[16.5rem]">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 3) * 90} className={layout[i]}>
              <Link
                href={`/?topic=${ind.slug}#contact`}
                className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[20px] border border-line p-6 text-white shadow-[0_24px_48px_-32px_rgba(10,22,48,0.45)] transition-[border-color,box-shadow] duration-500 hover:border-cyan/60 hover:shadow-[0_32px_60px_-30px_rgba(10,22,48,0.55)] sm:p-7"
              >
                <Image
                  src={ind.image}
                  alt={ind.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"}
                  className="zoom-img -z-10 object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/5" />
                <div className="absolute inset-0 -z-10 bg-volt/0 transition-colors duration-500 group-hover:bg-volt/10" />
                <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-ink/40 text-white backdrop-blur transition-all duration-500 group-hover:border-cyan group-hover:bg-cyan group-hover:text-ink">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
                <h3 className={`display ${i === 0 ? "h-section" : "h-sub"}`}>{ind.name}</h3>
                <p className={`mt-2 max-w-[44ch] text-white/75 ${i === 0 ? "text-[1.05rem]" : "text-[0.95rem]"}`}>{ind.text}</p>
                <span className="sr-only">Talk to us about {ind.name}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
