import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { impact } from "@/lib/content";

const topics = ["oil-gas", "smart-buildings", "manufacturing"];

export function Impact() {
  return (
    <section id="impact" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display h-section lg:col-span-7">Real-World Intelligence. Measurable Impact.</h2>
          <p className="lede text-slate lg:col-span-5">
            Three places where a Digital Twin changes how decisions are made, what we build for each, and the measures
            we agree with you up front.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {impact.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal as="article" key={c.title} className="grid items-center lg:grid-cols-12">
                <div className={`group relative aspect-[16/10] overflow-hidden rounded-[28px] lg:col-span-7 lg:row-start-1 ${flip ? "lg:col-start-6" : "lg:col-start-1"}`}>
                  <Image src={c.image} alt={c.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="zoom-img object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                </div>

                <div
                  className={`relative z-10 -mt-16 mx-3 rounded-[24px] border border-line bg-white p-6 shadow-[0_40px_80px_-40px_rgba(10,22,48,0.4)] sm:mx-8 sm:p-9 lg:col-span-6 lg:row-start-1 lg:mx-0 lg:mt-0 ${
                    flip ? "lg:col-start-1" : "lg:col-start-7"
                  }`}
                >
                  <h3 className="display h-sub">{c.title}</h3>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="text-sm font-semibold text-cyan-deep">The challenge</dt>
                      <dd className="mt-1 text-slate">{c.challenge}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-cyan-deep">What we build</dt>
                      <dd className="mt-1 text-slate">{c.approach}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-cyan-deep">What we measure</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {c.measures.map((m) => (
                          <span key={m} className="rounded-full bg-paper px-3 py-1.5 text-sm text-ink">
                            {m}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                  <Link href={`/?topic=${topics[i]}#contact`} className="mt-8 inline-flex items-center gap-2 font-semibold text-volt">
                    <span className="link-draw">Explore more</span>
                    <ArrowRight size={17} aria-hidden="true" />
                    <span className="sr-only">about {c.title}</span>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
