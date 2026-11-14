import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Blocks,
  EyeOff,
  FileSignature,
  Handshake,
  MapPin,
  PhoneCall,
  Server,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { consultationHref, site } from "@/lib/content";
import heroImage from "../../../public/about/AboutHero.jpeg";
import rosLogo from "../../../public/Tools/1.webp";
import tensorflowLogo from "../../../public/Tools/2.webp";
import pythonLogo from "../../../public/Tools/3.webp";
import awsLogo from "../../../public/Tools/4.webp";
import isaacLogo from "../../../public/Tools/5.webp";

const path = "/about";

export const metadata: Metadata = {
  title: "About Thinkverses: Dubai Team for Digital Twin and Physical AI",
  description:
    "Thinkverses Solutions is a Dubai team that builds Digital Twin and Physical AI for industrial operators, turning plant data and what robots see into decisions your team can act on.",
  alternates: { canonical: path },
  openGraph: { url: path, title: "About | Thinkverses Solutions" },
};

const founderLinkedIn = "https://www.linkedin.com/in/vignesh-t-482000b0/";

const founder = {
  name: "Vignesh T",
  role: "Founder",
  photo: "/about/vignesh.webp",
  linkedin: founderLinkedIn,
};

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
const tools = [
  { name: "ROS", logo: rosLogo },
  { name: "TensorFlow", logo: tensorflowLogo },
  { name: "Python", logo: pythonLogo },
  { name: "AWS", logo: awsLogo },
  { name: "NVIDIA Isaac", logo: isaacLogo },
];

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
      founder: { "@type": "Person", name: "Vignesh T", sameAs: [founderLinkedIn] },
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
                We build{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] via-[#14946a] to-[#34c996] bg-clip-text text-transparent">
                  Digital Twin and Physical AI
                </span>{" "}
                for industrial operators
              </h1>
              <p className="lede mt-6 text-[#4b5a74]">
                Thinkverses Solutions started with a simple observation. Industrial plants collect more data than ever,
                but the people running them still wait days for answers. So we build the systems that turn plant data and
                what robots see into decisions your team can act on.
              </p>
            </div>

            <div className="dt-rise dt-rise-late relative">
              <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(52,201,150,0.35),transparent_70%)] blur-2xl" />
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[28px] bg-gradient-to-br from-[#0b6e50] to-[#34c996]"
              />
              <div className="relative aspect-[6/5] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgba(11,26,46,0.6)]">
                <Image
                  src={heroImage}
                  alt="Engineer in a hard hat holding a tablet beside a robotic arm and a digital twin display on a factory floor"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1a2e]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section aria-labelledby="ab-team" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr] lg:grid-cols-[minmax(0,25rem)_1fr] lg:gap-20">
            {/* Portrait: shown whole at its native square ratio, never cropped */}
            <div className="relative isolate mx-auto w-full max-w-[25rem] md:mx-0">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[30px] bg-gradient-to-br from-[#0b6e50] to-[#34c996]"
              />
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role} of Thinkverses`}
                width={400}
                height={400}
                sizes="(min-width: 1024px) 25rem, (min-width: 768px) 20rem, 100vw"
                className="h-auto w-full rounded-[30px] shadow-[0_40px_80px_-40px_rgba(11,26,46,0.6)]"
              />
            </div>

            <div>
              <h2 id="ab-team" className="display text-[clamp(1.8rem,1.2rem+2vw,3rem)]">
                The people you will{" "}
                <span className="bg-gradient-to-r from-[#0b6e50] to-[#34c996] bg-clip-text text-transparent">work with</span>
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] text-[#4b5a74]">
                The same people who scope your project are the ones who build it. You will meet them in the first call.
              </p>

              <div className="mt-10 border-l-4 border-[#34c996] pl-6">
                <h3 className="display text-[clamp(1.5rem,1.2rem+1.2vw,2.2rem)] text-[#14304f]">{founder.name}</h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-[#0b6e50]">{founder.role}</p>
              </div>

              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#14304f]/15 px-5 py-2.5 text-sm font-semibold text-[#14304f] transition hover:border-[#0b6e50] hover:text-[#0b6e50]"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                LinkedIn profile
              </a>
            </div>
          </div>
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
          <div>
            <h2 id="ab-sec" className="display text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)]">
              Your plant data stays yours, and it{" "}
              <span className="bg-gradient-to-r from-[#34c996] to-[#9be8c9] bg-clip-text text-transparent">stays private.</span>
            </h2>
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
            <li className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-[#34c996]/40">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#34c996]/15 text-[#34c996] ring-1 ring-[#34c996]/30">
                <ShieldCheck size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">Certifications</h3>
              <p className="mt-2 text-[#c9d4e5]">Approved by UAE Federal Govt.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* RECOGNITION */}
      <section aria-labelledby="ab-rec" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <h2 id="ab-rec" className="display text-[clamp(1.8rem,1.2rem+2vw,3rem)]">Recognition and partners</h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {recognition.map((label) => (
              <li
                key={label}
                className="grid h-28 place-items-center rounded-2xl border-2 border-dashed border-[#0b6e50]/25 bg-[#f3f8f6] px-3 text-center text-sm font-semibold text-[#0b6e50] transition hover:border-[#0b6e50]/40"
              >
                <span className="flex flex-col items-center gap-2">
                  <Award size={18} aria-hidden="true" />
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-14 text-sm font-semibold uppercase tracking-wider text-[#4b5a74]">Technology we build with</h3>
          <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {tools.map((t) => (
              <li
                key={t.name}
                className="grid h-36 place-items-center rounded-2xl border border-[#14304f]/10 bg-white px-5 shadow-[0_20px_40px_-35px_rgba(20,48,79,0.5)] transition hover:-translate-y-0.5 hover:border-[#0b6e50]/30 sm:h-40"
              >
                <Image src={t.logo} alt={`${t.name} logo`} sizes="170px" className="h-auto w-full max-w-[170px]" />
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
