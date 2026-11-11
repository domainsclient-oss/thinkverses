import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Blocks,
  Camera,
  EyeOff,
  FileSignature,
  Handshake,
  Lock,
  MapPin,
  PhoneCall,
  Server,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { consultationHref, site } from "@/lib/content";

const path = "/about";

export const metadata: Metadata = {
  title: "About Thinkverses: Dubai Team for Digital Twins and Physical AI",
  description:
    "Thinkverses Solutions is a Dubai team that builds digital twins and Physical AI for industrial operators, turning plant data and what robots see into decisions your team can act on.",
  alternates: { canonical: path },
  openGraph: { url: path, title: "About | Thinkverses Solutions" },
};

// Profile URL not provided yet.
const founderLinkedIn = "#";

const team = [
  { name: "Vignesh T", role: "Founder", bio: "[Two lines on background and why he started Thinkverses.]", linkedin: founderLinkedIn },
  { name: "[Name]", role: "Solution architect", bio: "[Two lines on experience with industrial data.]" },
  { name: "[Name]", role: "Data engineer", bio: "[Two lines on systems connected and scale handled.]" },
  { name: "[Name]", role: "Vision AI and robotics lead", bio: "[Two lines on inspection and patrol work.]" },
];

const principles = [
  { title: "We start small", text: "One line, one route or one use case first, with a measure of success agreed before we begin.", icon: Sprout },
  { title: "We build on what you have", text: "We connect your existing systems instead of asking you to replace them.", icon: Blocks },
  { title: "We tell you when it is not a fit", text: "If we cannot solve the problem well, we will say so in the first call.", icon: Handshake },
];

const rules = [
  { title: "Dummy data in every demo", text: "We never show a client's live dashboard to anyone else.", icon: EyeOff },
  { title: "On your servers if needed", text: "The twin can run inside your plant network.", icon: Server },
  { title: "Written permission only", text: "We name a client only with their written approval.", icon: FileSignature },
];

const recognition = ["[Dubai AI Seal]", "[ICV certificate]", "[Group companies]"];
const partners = ["[Partner logo]", "[Partner logo]", "[Partner logo]"];

const initials = (name: string) =>
  name.startsWith("[")
    ? "?"
    : name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2);

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${site.url}${path}`,
    mainEntity: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
      email: site.email,
      telephone: site.phone,
      founder: { "@type": "Person", name: "Vignesh T" },
      address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    },
  };

  return (
    <div className="bg-white text-[#14304f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3f8f6_0%,#ffffff_75%)]" />
          <div className="absolute inset-0 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="dt-blob absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#34c996]/20 blur-3xl" />
          <div className="dt-blob dt-blob-b absolute -left-40 top-40 h-[26rem] w-[26rem] rounded-full bg-[#14304f]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-[#4b5a74]">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#0b6e50]">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[#4b5a74]/50">/</li>
              <li aria-current="page" className="font-semibold text-[#14304f]">About</li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="dt-rise">
              <h1 className="display text-[clamp(2.2rem,1.3rem+3vw,3.9rem)] text-[#14304f]">
                We are a Dubai team that builds{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] via-[#14946a] to-[#34c996] bg-clip-text text-transparent">
                  digital twins and Physical AI
                </span>{" "}
                for industrial operators
              </h1>
              <p className="lede mt-6 text-[#4b5a74]">
                Thinkverses Solutions started with a simple observation. Industrial plants collect more data than ever,
                but the people running them still wait days for answers. So we build the systems that turn plant data and
                what robots see into decisions your team can act on.
              </p>
            </div>

            {/* Photo placeholder */}
            <div className="dt-rise dt-rise-late relative">
              <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(52,201,150,0.35),transparent_70%)] blur-2xl" />
              <figure className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[28px] border-2 border-dashed border-[#0b6e50]/30 bg-gradient-to-br from-[#0b1a2e] to-[#14304f] p-8 text-center text-white">
                <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-25" />
                <div className="relative">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[#34c996] ring-1 ring-white/15">
                    <Camera size={24} aria-hidden="true" />
                  </span>
                  <figcaption className="mt-4 text-[#c9d4e5]">[Team photo at a client site or the Dubai office]</figcaption>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section aria-labelledby="ab-team" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <h2 id="ab-team" className="display text-[clamp(1.8rem,1.2rem+2vw,3rem)]">
              The people you will{" "}
              <span className="bg-gradient-to-r from-[#0b6e50] to-[#34c996] bg-clip-text text-transparent">work with</span>
            </h2>
            <p className="mt-4 text-[1.05rem] text-[#4b5a74]">
              The same people who scope your project are the ones who build it. You will meet them in the first call.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <li
                key={`${m.role}`}
                className="group relative flex flex-col overflow-hidden rounded-[26px] border border-[#14304f]/10 bg-white p-6 shadow-[0_30px_60px_-45px_rgba(20,48,79,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#0b6e50]/30 hover:shadow-[0_30px_60px_-30px_rgba(11,110,80,0.45)]"
              >
                <div
                  className={`relative grid aspect-square w-24 place-items-center rounded-3xl text-2xl font-bold ${
                    i === 0
                      ? "bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-[0_18px_30px_-12px_rgba(11,110,80,0.7)]"
                      : "bg-[#eef2f8] text-[#14304f]/40"
                  }`}
                >
                  <span className="display">{initials(m.name)}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#14304f]">{m.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#0b6e50]">{m.role}</p>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[#4b5a74]">{m.bio}</p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#14304f]/15 px-4 py-2 text-sm font-semibold text-[#14304f] transition hover:border-[#0b6e50] hover:text-[#0b6e50]"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    LinkedIn profile
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section aria-labelledby="ab-how" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="relative isolate overflow-hidden rounded-[32px] border border-[#14304f]/10 bg-gradient-to-br from-[#eef7f3] via-white to-[#f4f7fb] p-6 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
            <h2 id="ab-how" className="display text-[clamp(1.8rem,1.2rem+2vw,3rem)]">How we work with you</h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {principles.map(({ title, text, icon: Icon }, i) => (
                <li
                  key={title}
                  className="group relative overflow-hidden rounded-3xl border border-[#14304f]/10 bg-white/85 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#0b6e50]/30 sm:p-7"
                >
                  <Icon
                    aria-hidden="true"
                    size={110}
                    strokeWidth={1}
                    className="pointer-events-none absolute -bottom-6 -right-6 text-[#0b6e50]/[0.07] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="display text-3xl text-[#14304f]/10">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#14304f]">{title}</h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-[#4b5a74]">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section aria-labelledby="ab-sec" className="relative isolate overflow-hidden bg-[#0b1a2e] py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#34c996]/15 blur-3xl" />
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#34c996]/30 bg-[#34c996]/10 px-3.5 py-1.5 text-sm font-semibold text-[#34c996]">
                <Lock size={15} aria-hidden="true" /> Security and data handling
              </p>
              <h2 id="ab-sec" className="display mt-6 text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)]">
                Your plant data stays yours, and it{" "}
                <span className="bg-gradient-to-r from-[#34c996] to-[#9be8c9] bg-clip-text text-transparent">stays private.</span>
              </h2>
            </div>
            <p className="text-[1.05rem] leading-relaxed text-[#c9d4e5]">
              The UAE market is small, and we know that what happens in one plant should never reach another. That is
              why we built strict rules into how we work.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {rules.map(({ title, text, icon: Icon }) => (
              <li key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-[#34c996]/40">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#34c996]/15 text-[#34c996] ring-1 ring-[#34c996]/30">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-[#c9d4e5]">{text}</p>
              </li>
            ))}
            <li className="rounded-[24px] border-2 border-dashed border-white/20 p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-[#9fb0cc]">
                <ShieldCheck size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">[Certifications]</h3>
              <p className="mt-2 text-[#9fb0cc]">[ISO or other standards, once confirmed.]</p>
            </li>
          </ul>
        </div>
      </section>

      {/* RECOGNITION */}
      <section aria-labelledby="ab-rec" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <h2 id="ab-rec" className="display text-[clamp(1.8rem,1.2rem+2vw,3rem)]">Recognition and partners</h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[...recognition, ...partners].map((label, i) => (
              <li
                key={`${label}-${i}`}
                className={`grid h-28 place-items-center rounded-2xl border-2 border-dashed px-3 text-center text-sm font-semibold transition hover:border-[#0b6e50]/40 ${
                  i < recognition.length
                    ? "border-[#0b6e50]/25 bg-[#f3f8f6] text-[#0b6e50]"
                    : "border-[#14304f]/15 bg-[#f7f9fc] text-[#4b5a74]"
                }`}
              >
                <span className="flex flex-col items-center gap-2">
                  {i < recognition.length && <Award size={18} aria-hidden="true" />}
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VISIT */}
      <section aria-labelledby="ab-visit" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="relative isolate grid overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0b6e50] via-[#0d7a59] to-[#14304f] text-white lg:grid-cols-[1.3fr_1fr]">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-20" />
            <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#34c996]/40 blur-3xl" />
            <div className="p-8 sm:p-12 lg:p-14">
              <h2 id="ab-visit" className="display text-[clamp(1.8rem,1.2rem+2vw,3rem)]">Visit us in Dubai</h2>
              <p className="mt-5 flex items-start gap-3 text-[1.05rem] text-white/85">
                <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#9be8c9]" />
                <span>[Full office address], Dubai Mainland, UAE</span>
              </p>
              <p className="mt-8 text-lg font-semibold">Meet the team on a 30-minute call.</p>
              <Link href={consultationHref} className="btn group mt-5 bg-white text-[#0b6e50] hover:bg-[#e6f4ee]">
                <PhoneCall size={18} aria-hidden="true" /> Book a discovery call
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            {/* Map motif */}
            <div aria-hidden="true" className="relative hidden min-h-72 lg:block">
              <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 8 }).map((_, i) => (
                  <path key={`h${i}`} d={`M0 ${i * 40 + 10} H300`} stroke="rgba(255,255,255,0.08)" />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <path key={`v${i}`} d={`M${i * 40 + 10} 0 V300`} stroke="rgba(255,255,255,0.08)" />
                ))}
                <path d="M0 220 C80 200 120 240 300 160" stroke="rgba(155,232,201,0.35)" strokeWidth="10" fill="none" />
                <circle cx="150" cy="140" r="40" fill="#34c996" fillOpacity="0.2" className="dt-ping" />
                <circle cx="150" cy="140" r="12" fill="#ffffff" />
                <circle cx="150" cy="140" r="5" fill="#0b6e50" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
