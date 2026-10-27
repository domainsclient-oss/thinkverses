import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { Reveal } from "../Reveal";
import { article } from "@/lib/content";
import { articleSlug } from "@/lib/locations";
import { articleSections } from "@/lib/article";
import articleImg from "../../../public/images/article-dubai.jpg";
import techImg from "../../../public/images/data-center.jpg";
import uaeImg from "../../../public/images/smart-buildings.jpg";
import appsImg from "../../../public/images/energy.jpg";

// Chapters of the featured article promoted as image-led previews.
const spotlight: { id: string; image: StaticImageData; tag: string }[] = [
  { id: "key-technologies", image: techImg, tag: "Technology" },
  { id: "why-growing-in-uae", image: uaeImg, tag: "Market" },
  { id: "applications", image: appsImg, tag: "Industries" },
];

export function Insights() {
  const href = `/articles/${articleSlug}`;
  const chapterNo = (id: string) => articleSections.findIndex((s) => s.id === id) + 1;
  const previews = spotlight.map((p) => ({ ...p, section: articleSections.find((s) => s.id === p.id)! }));

  return (
    <section id="insights" className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-blueprint opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <div className="absolute -left-40 top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-volt/20 blur-[140px]" aria-hidden="true" />
      <div className="absolute -right-40 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-violet/20 blur-[140px]" aria-hidden="true" />
      <p
        className="pointer-events-none absolute -top-6 right-0 -z-10 select-none font-display text-[clamp(6rem,18vw,17rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] [font-stretch:125%]"
        aria-hidden="true"
      >
        INSIGHTS
      </p>

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3.5 py-1.5 text-sm font-medium text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              Articles &amp; Insights from the Thinkverses Team
            </p>
            <h2 className="display h-section max-w-4xl">
              Insights to Help Your Team Move{" "}
              <span className="bg-gradient-to-r from-cyan via-[#7fa0ff] to-[#0056a7] bg-clip-text text-transparent">
                Faster with AI
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link href={href} className="btn btn-ghost">
              Read the latest <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Featured story */}
          <Reveal as="article" className="group relative lg:col-span-8">
            <div className="relative flex min-h-[34rem] h-full flex-col justify-end overflow-hidden rounded-[32px] border border-white/10 lg:min-h-[40rem]">
              <Image
                src={articleImg}
                alt={article.alt}
                fill
                placeholder="blur"
                priority={false}
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="zoom-img -z-10 object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-volt/25 via-transparent to-cyan/10 mix-blend-screen" />

              <div className="absolute left-6 top-6 flex flex-wrap gap-2 sm:left-8 sm:top-8">
                <span className="rounded-full bg-cyan px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink">Featured</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                  Digital Twin
                </span>
              </div>

              <div className="absolute right-6 top-6 hidden w-56 rounded-2xl border border-white/15 bg-ink/50 p-4 backdrop-blur-md sm:right-8 sm:top-8 md:block">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                  <BookOpen size={14} aria-hidden="true" /> In this article
                </p>
                <p className="mt-2 font-display text-3xl font-bold [font-stretch:115%]">
                  {articleSections.length}
                  <span className="ml-1.5 text-sm font-medium text-white/60">chapters</span>
                </p>
                <div className="mt-3 flex gap-1" aria-hidden="true">
                  {articleSections.map((s, i) => (
                    <span key={s.id} className={`h-1 flex-1 rounded-full ${i < 3 ? "bg-cyan" : "bg-white/15"}`} />
                  ))}
                </div>
              </div>

              <div className="p-6 pt-20 sm:p-10">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                  <time dateTime={article.date}>{article.dateLabel}</time>
                  <span className="h-3 w-px bg-white/25" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden="true" /> {article.readingTime}
                  </span>
                </div>
                <h3 className="display mt-4 max-w-3xl text-[clamp(1.7rem,1.2rem+1.9vw,3rem)] leading-[1.06]">
                  <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-white/75">{article.excerpt}</p>
                <span className="btn btn-primary relative mt-8 pointer-events-none">
                  Read More <ArrowRight size={18} aria-hidden="true" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Chapter previews */}
          <div className="grid gap-5 lg:col-span-4">
            {previews.map((p, i) => (
              <Reveal as="article" key={p.id} delay={100 + i * 90} className="group relative">
                <div className="relative flex h-full gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-cyan/40 group-hover:bg-white/[0.08] lg:flex-col xl:flex-row">
                  <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-[18px] sm:w-32 lg:aspect-[16/7] lg:w-full xl:aspect-square xl:w-32">
                    <Image src={p.image} alt="" fill sizes="(min-width: 1280px) 8rem, (min-width: 1024px) 30vw, 8rem" className="zoom-img object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col py-1.5 pr-2 lg:px-2 lg:pb-3 xl:px-0 xl:pb-1.5">
                    <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                      <span className="text-cyan">{p.tag}</span>
                      <span className="text-white/40">Ch. {String(chapterNo(p.id)).padStart(2, "0")}</span>
                    </p>
                    <h3 className="mt-2 font-display text-[1.05rem] font-semibold leading-snug [font-stretch:108%]">
                      <Link href={`${href}#${p.id}`} className="after:absolute after:inset-0 after:content-['']">
                        {p.section.title}
                      </Link>
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-white/60 transition-colors group-hover:text-white">
                      Read chapter <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
