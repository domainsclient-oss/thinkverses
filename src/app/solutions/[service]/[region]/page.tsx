import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { industries, processSteps } from "@/lib/content";
import { getRegion, getService, regions, serviceRegions, services, solutionPath, type ServiceKey } from "@/lib/locations";

export function generateStaticParams() {
  return services.flatMap((s) => serviceRegions[s.key].map((region) => ({ service: s.key, region })));
}

function resolve(serviceKey: string, regionSlug: string) {
  const service = getService(serviceKey);
  const region = getRegion(regionSlug);
  if (!service || !region || !serviceRegions[service.key].includes(region.slug)) return null;
  return { service, region };
}

export async function generateMetadata({ params }: PageProps<"/solutions/[service]/[region]">): Promise<Metadata> {
  const { service: s, region: r } = await params;
  const found = resolve(s, r);
  if (!found) return {};
  const { service, region } = found;
  return {
    title: `${service.title} in ${region.name}`,
    description: `${service.short} solutions in ${region.name} from Thinkverses. ${service.summary}`.slice(0, 160),
    alternates: { canonical: solutionPath(service.key, region.slug) },
  };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[service]/[region]">) {
  const { service: s, region: r } = await params;
  const found = resolve(s, r);
  if (!found) notFound();
  const { service, region } = found;
  const parent = region.parent ? getRegion(region.parent) : undefined;
  const otherServices = services.filter((x) => x.key !== service.key && serviceRegions[x.key].includes(region.slug));
  const nearby = regions.filter((x) => x.slug !== region.slug && serviceRegions[service.key].includes(x.slug));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-44">
        <div className="absolute inset-0 -z-10 bg-blueprint [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" aria-hidden="true" />
        <div className="absolute -right-32 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-volt/25 blur-[130px]" aria-hidden="true" />
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-fog">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#locations" className="hover:text-white">{service.short}</Link>
              </li>
              {parent && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={solutionPath(service.key, parent.slug)} className="hover:text-white">{parent.name}</Link>
                  </li>
                </>
              )}
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">{region.name}</li>
            </ol>
          </nav>
          <h1 className="display h-hero mt-8 max-w-5xl">
            {service.title} in {region.name}
          </h1>
          <p className="lede mt-7 text-white/75">{service.summary}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/?topic=${service.key === "iot" ? "iot" : service.key === "digital-twin" ? "digital-twin" : "robotics"}#contact`} className="btn btn-primary">
              Talk to our team <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/#industries" className="btn btn-ghost">See industries we serve</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-[90rem] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <h2 className="display h-section">What you get</h2>
            <p className="mt-5 text-slate prose-measure">
              Delivered by our Dubai-based team for organisations in {region.name}, built on your own data and systems and
              shaped around the decisions that matter most to your operation.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {service.capabilities.map((c) => (
              <li key={c} className="flex gap-3 rounded-2xl border border-line bg-paper p-5">
                <Check size={20} className="mt-0.5 shrink-0 text-cyan-deep" aria-hidden="true" />
                <span className="font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-20 max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <h2 className="font-display text-2xl font-bold [font-stretch:112%]">How we deliver</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <li key={p.title}>
                <span className="font-display text-4xl font-bold text-volt [font-stretch:125%]">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-semibold">{p.title}</p>
                <p className="mt-1.5 text-[0.95rem] text-slate">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-10">
          <div>
            <h2 className="font-display text-xl font-bold [font-stretch:112%]">Industries</h2>
            <ul className="mt-4 space-y-2 text-slate">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/?topic=${ind.slug}#contact`} className="link-draw hover:text-ink">{ind.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {otherServices.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold [font-stretch:112%]">More in {region.name}</h2>
              <ul className="mt-4 space-y-2 text-slate">
                {otherServices.map((o) => (
                  <li key={o.key}>
                    <Link href={solutionPath(o.key as ServiceKey, region.slug)} className="link-draw hover:text-ink">{o.title} in {region.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="font-display text-xl font-bold [font-stretch:112%]">{service.short} in other locations</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link href={solutionPath(service.key, n.slug)} className="inline-block rounded-full border border-line bg-white px-3.5 py-1.5 text-sm transition-colors hover:border-ink">
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
