import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { article, consultationHref, site } from "@/lib/content";
import { articleSections } from "@/lib/article";
import { articleSlug } from "@/lib/locations";
import articleImg from "../../../../public/images/article-dubai.jpg";

const path = `/articles/${articleSlug}`;

export const metadata: Metadata = {
  title: "Digital Twin Technology Growing in Dubai & UAE",
  description:
    "What Digital Twin technology is, why adoption is accelerating across Dubai and the UAE, key benefits, industry applications and how businesses can get started.",
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    title: article.title,
    url: path,
    publishedTime: article.date,
    images: [{ url: "/images/article-dubai.jpg" }],
  },
};

export default function ArticlePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    image: `${site.url}/images/article-dubai.jpg`,
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` } },
    mainEntityOfPage: `${site.url}${path}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="relative isolate overflow-hidden bg-ink pb-16 pt-36 text-white sm:pb-24 sm:pt-44">
        <div className="absolute inset-0 -z-10 bg-blueprint [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" aria-hidden="true" />
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <Link href="/#insights" className="inline-flex items-center gap-2 text-sm text-fog hover:text-white">
            <ArrowLeft size={16} aria-hidden="true" /> Articles &amp; Insights
          </Link>
          <h1 className="display mt-6 max-w-5xl text-[clamp(2.1rem,1.3rem+3.4vw,4.25rem)]">{article.title}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fog">
            <span>By {site.name}</span>
            <span className="h-3 w-px bg-white/25" aria-hidden="true" />
            <time dateTime={article.date}>{article.dateLabel}</time>
            <span className="h-3 w-px bg-white/25" aria-hidden="true" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="bg-white">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="relative -mt-2 aspect-[21/9] overflow-hidden rounded-b-[28px] sm:rounded-[28px] lg:-mt-10">
            <Image src={articleImg} alt={article.alt} fill preload placeholder="blur" sizes="100vw" className="object-cover" />
          </div>

          <div className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
            <aside className="lg:col-span-3">
              <nav aria-label="In this article" className="lg:sticky lg:top-28">
                <p className="font-display font-bold [font-stretch:110%]">In this article</p>
                <ol className="mt-4 space-y-2 border-l border-line text-[0.93rem]">
                  {articleSections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-slate transition-colors hover:border-volt hover:text-ink">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="article-body text-[1.1rem] leading-[1.75] lg:col-span-7 lg:col-start-5">
              <p className="!text-[1.25rem] !leading-relaxed !text-ink">{article.excerpt}</p>
              {articleSections.map((s) => (
                <section key={s.id} aria-labelledby={s.id}>
                  <h2 id={s.id}>{s.title}</h2>
                  {s.blocks.map((b, i) => {
                    if ("p" in b) return <p key={i}>{b.p}</p>;
                    if ("h3" in b) return <h3 key={i}>{b.h3}</h3>;
                    if ("ul" in b)
                      return (
                        <ul key={i}>
                          {b.ul.map((li) => (
                            <li key={li}>{li}</li>
                          ))}
                        </ul>
                      );
                    return (
                      <ol key={i}>
                        {b.ol.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ol>
                    );
                  })}
                </section>
              ))}

              <div className="mt-14 rounded-[24px] bg-ink p-8 text-white">
                <p className="font-display text-2xl font-bold leading-tight [font-stretch:112%] !text-white">
                  Planning a Digital Twin in the UAE?
                </p>
                <p className="mt-2 !text-white/70">Talk to our team about the decision you want to improve first.</p>
                <Link href={consultationHref} className="btn btn-primary mt-6">
                  Book a Consultation <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
