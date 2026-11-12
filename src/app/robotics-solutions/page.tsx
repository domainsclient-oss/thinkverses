import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  Camera,
  CheckCircle2,
  Footprints,
  MessageCircleQuestion,
  Network,
  Plus,
  Route,
  ScanLine,
  Search,
  Send,
  ShieldAlert,
  ClipboardList,
  Target,
} from "lucide-react";
import { site } from "@/lib/content";
import { TaskForm } from "@/components/physical-ai/TaskForm";
import heroImg from "../../../public/robotics-solutions/RoboticAi.webp";

const path = "/robotics-solutions";

export const metadata: Metadata = {
  title: "Robotics Solutions: Visual Inspection and Site Patrol",
  description:
    "Physical AI that inspects your line and patrols your site. Robots and cameras report what they find as it happens, and what they see can feed straight into your digital twin.",
  alternates: { canonical: path },
  openGraph: { url: path, title: "Robotics Solutions | Thinkverses Solutions", images: [{ url: "/home/RoboticAI.webp" }] },
};

const inspectionHref = "/#contact";
const siteAssessmentHref = "/#contact";
const pilotHref = "/#contact";

const intents = [
  { label: "I need inspection", href: "#inspection", icon: ScanLine },
  { label: "I need patrol", href: "#patrol", icon: ShieldAlert },
  { label: "Another task", href: "#another-task", icon: Boxes },
];

const jobs = [
  {
    id: "inspection",
    audience: "For quality, production and plant heads",
    title: "Visual inspection",
    quote: "Defects still reach customers.",
    text: "Every unit checked on every shift, with each defect boxed and logged.",
    cta: "Book an inspection feasibility call",
    href: inspectionHref,
    icon: ScanLine,
  },
  {
    id: "patrol",
    audience: "For security heads and facility managers",
    title: "Security patrol",
    quote: "The site is too big to watch every corner.",
    text: "Routes and blind spots covered through the night, with alerts to the control room.",
    cta: "Book a site assessment call",
    href: siteAssessmentHref,
    icon: ShieldAlert,
  },
  {
    id: "rounds",
    audience: "For maintenance heads · to confirm",
    title: "Asset inspection rounds",
    quote: "Daily rounds take hours and depend on who is on shift.",
    text: "A robot walks the same route every day, reads gauges and takes thermal images for the twin.",
    cta: "Ask about a one-route pilot",
    href: pilotHref,
    icon: Footprints,
  },
];

const flow = [
  { title: "Robot round", text: "Images, gauges, thermal", icon: Bot },
  { title: "Digital twin", text: "Adds it to live plant data", icon: Network },
  { title: "The cause, found early", text: "Sent to the person who acts", icon: Target },
];

const taskSteps = [
  { title: "You describe the task", icon: ClipboardList },
  { title: "Our team checks the fit", icon: Search },
  { title: "A feasibility call, or an honest reply", icon: Send },
];

const faqs = [
  {
    q: "Do we need a digital twin to use your robots?",
    a: "No. Inspection and patrol work on their own. The twin is an option that adds more value later, when you want to link what the robots see with how the plant runs.",
  },
  {
    q: "Whose robots and cameras do you use?",
    a: "[To confirm: own hardware or partner hardware with Thinkverses vision AI. Partner names once agreements are signed.]",
  },
  {
    q: "How is Physical AI different from robotic process automation?",
    a: "Robotic process automation is software that automates office tasks on a computer. Physical AI works in the real world, with robots and cameras on your line or your site.",
  },
];

function CameraPanel() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(52,201,150,0.35),transparent_70%),radial-gradient(50%_50%_at_20%_90%,rgba(245,160,58,0.25),transparent_70%)] blur-2xl"
      />
      <figure className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1a2e] p-2.5 shadow-[0_40px_80px_-30px_rgba(11,26,46,0.65)]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[20px]">
          <Image
            src={heroImg}
            alt="Wheeled inspection robot in a factory, its mast-mounted camera scanning an engine on the conveyor and flagging a machine for a closer check"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1a2e]/70 via-transparent to-[#0b1a2e]/40" />
          <div aria-hidden="true" className="pa-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#34c996]/25 to-transparent" />

          {/* corner brackets */}
          <div aria-hidden="true" className="absolute inset-4">
            <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-white/70" />
            <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-white/70" />
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-white/70" />
            <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-white/70" />
          </div>

          <figcaption className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-[#0b1a2e]/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="dt-ping absolute inset-0 rounded-full bg-[#ff5a4f]" />
              <span className="relative h-2 w-2 rounded-full bg-[#ff5a4f]" />
            </span>
            <Camera size={13} aria-hidden="true" /> Inspection robot 01 · live vision
          </figcaption>

          {/* Tag for the item the robot's vision flagged (the image draws the amber box) */}
          <div aria-hidden="true" className="absolute left-[80%] top-[33%] h-[24%] w-[14%]">
            <span className="pa-box absolute -top-7 right-0 whitespace-nowrap rounded-md bg-[#f5a03a] px-2 py-0.5 text-xs font-bold text-[#0b1a2e] shadow-[0_0_20px_rgba(245,160,58,0.5)]">
              Flagged for check
            </span>
          </div>
        </div>
      </figure>
    </div>
  );
}

export default function RoboticsSolutionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Robotics Solutions",
    serviceType: "Visual inspection and security patrol robotics",
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
    areaServed: "AE",
    url: `${site.url}${path}`,
    description:
      "Physical AI is artificial intelligence that works in the physical world through robots, cameras and sensors, used for visual inspection of products and assets and security patrol of large sites.",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // The hardware answer is still a placeholder, so it stays out of structured data.
    mainEntity: faqs
      .filter((f) => !f.a.startsWith("["))
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="bg-white text-[#14304f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3f8f6_0%,#ffffff_70%)]" />
          <div className="absolute inset-0 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="dt-blob absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#34c996]/20 blur-3xl" />
          <div className="dt-blob dt-blob-b absolute -left-40 top-56 h-[26rem] w-[26rem] rounded-full bg-[#14304f]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-[#4b5a74]">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#0b6e50]">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[#4b5a74]/50">/</li>
              <li aria-current="page" className="font-semibold text-[#14304f]">Robotics Solutions</li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="dt-rise">
              <h1 className="display text-[clamp(2.3rem,1.3rem+3.2vw,4.1rem)] text-[#14304f]">
                <span className="bg-gradient-to-r from-[#0b6e50] via-[#14946a] to-[#34c996] bg-clip-text text-transparent">
                  Physical AI
                </span>{" "}
                that inspects your line and patrols your site
              </h1>
              <p className="lede mt-6 text-[#4b5a74]">
                Our robots and cameras do two jobs well: they inspect products and assets, and they patrol large sites.
                They report what they find as it happens, and what they see can feed straight into your digital twin.
              </p>

              <ul className="mt-9 grid gap-3 sm:grid-cols-3">
                {intents.map(({ label, href, icon: Icon }, i) => (
                  <li key={label}>
                    <a
                      href={href}
                      className={`group flex h-full items-center gap-3 rounded-2xl border px-4 py-3.5 font-semibold transition duration-300 hover:-translate-y-0.5 ${
                        i === 0
                          ? "border-transparent bg-[#0b6e50] text-white shadow-[0_14px_30px_-12px_rgba(11,110,80,0.7)] hover:bg-[#095c43]"
                          : "border-[#14304f]/15 bg-white text-[#14304f] hover:border-[#0b6e50] hover:text-[#0b6e50]"
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                          i === 0 ? "bg-white/15" : "bg-[#e6f4ee] text-[#0b6e50]"
                        }`}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-[0.95rem] leading-tight">{label}</span>
                      <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dt-rise dt-rise-late">
              <CameraPanel />
            </div>
          </div>
        </div>
      </section>

      {/* DEFINITION */}
      <section aria-labelledby="pa-what" className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[28px] bg-[#0b1a2e] p-8 text-white sm:p-12">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#34c996]/25 blur-3xl" />
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-30 [mask-image:linear-gradient(to_left,black,transparent_60%)]" />
            <div className="relative grid gap-6 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#34c996]">
                  <span className="h-px w-8 bg-[#34c996]" /> Definition
                </p>
                <h2 id="pa-what" className="display mt-4 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]">
                  What is Physical AI?
                </h2>
              </div>
              <p className="text-[1.08rem] leading-relaxed text-[#c9d4e5] lg:pt-2">
                Physical AI is artificial intelligence that works in the physical world through robots, cameras and
                sensors. Instead of only analysing data on a screen, it sees, moves and acts on a real site. At
                Thinkverses, we use it for two jobs: visual inspection of products and assets, and security patrol of
                large sites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section aria-label="What Physical AI does" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <ul className="grid gap-5 lg:grid-cols-3">
            {jobs.map(({ id, audience, title, quote, text, cta, href, icon: Icon }, i) => (
              <li
                key={id}
                id={id}
                className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-[28px] border border-[#14304f]/10 bg-white p-7 shadow-[0_30px_60px_-45px_rgba(20,48,79,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#0b6e50]/30 hover:shadow-[0_30px_60px_-30px_rgba(11,110,80,0.45)] sm:p-8"
              >
                <Icon
                  aria-hidden="true"
                  size={140}
                  strokeWidth={1}
                  className="pointer-events-none absolute -right-8 -top-8 text-[#0b6e50]/[0.06] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                />
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="display text-2xl text-[#14304f]/10">0{i + 1}</span>
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#0b6e50]">{audience}</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#14304f]">{title}</h2>
                <blockquote className="mt-5 rounded-2xl border-l-4 border-[#f5a03a] bg-[#fff8ef] px-4 py-3 text-[1.02rem] font-medium italic text-[#14304f]">
                  {quote.startsWith("“") ? quote : `“${quote}”`}
                </blockquote>
                <p className="mt-5 flex flex-1 items-start gap-2.5 text-[0.98rem] leading-relaxed text-[#4b5a74]">
                  <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#0b6e50]" />
                  {text}
                </p>
                <Link
                  href={href}
                  className="mt-7 inline-flex items-center justify-between gap-2 rounded-xl border border-[#14304f]/10 bg-[#f7f9fc] px-4 py-3 text-[0.95rem] font-semibold text-[#0b6e50] transition-colors group-hover:border-[#0b6e50] group-hover:bg-[#0b6e50] group-hover:text-white"
                >
                  {cta}
                  <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section aria-labelledby="pa-diff" className="relative isolate overflow-hidden bg-[#0b1a2e] py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#34c996]/15 blur-3xl" />
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
            <h2 id="pa-diff" className="display text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)]">
              What makes us different is that the{" "}
              <span className="bg-gradient-to-r from-[#34c996] to-[#9be8c9] bg-clip-text text-transparent">
                robots and the twin come from one team.
              </span>
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-[#c9d4e5]">
              Most robot suppliers stop at the alert. Because we also build the digital twin, what the robot sees on its
              round can be linked to how the plant is running, so you find the cause and not only the symptom.
            </p>
          </div>

          <ol className="relative mt-14 grid gap-4 md:grid-cols-3">
            <span
              aria-hidden="true"
              className="absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-gradient-to-r from-[#34c996]/0 via-[#34c996]/60 to-[#34c996]/0 md:block"
            />
            {flow.map(({ title, text, icon: Icon }, i) => (
              <li
                key={title}
                className={`relative rounded-[24px] border p-6 backdrop-blur sm:p-7 ${
                  i === 2
                    ? "border-[#34c996]/40 bg-gradient-to-br from-[#0b6e50]/50 to-[#0e2038] shadow-[0_0_40px_-10px_rgba(52,201,150,0.5)]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#34c996]/15 text-[#34c996] ring-1 ring-[#34c996]/30">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  {i < 2 && (
                    <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-[#34c996] text-[#0b1a2e] md:absolute md:-right-6 md:top-1/2 md:z-10 md:-translate-y-1/2">
                      <ArrowRight size={16} />
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-1 text-[#c9d4e5]">{text}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/digital-twin"
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:border-[#34c996] hover:bg-[#34c996]/10"
          >
            See how the digital twin works
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ANOTHER TASK */}
      <section
        id="another-task"
        aria-labelledby="pa-task"
        className="relative isolate scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#f3f8f6] to-white py-20 sm:py-28"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
        <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
              <Boxes size={22} aria-hidden="true" />
            </span>
            <h2 id="pa-task" className="display mt-6 text-[clamp(1.8rem,1.2rem+2vw,3rem)] text-[#14304f]">
              Have a different task, such as{" "}
              <span className="bg-gradient-to-r from-[#0b6e50] to-[#34c996] bg-clip-text text-transparent">lifting or packing?</span>
            </h2>
            <p className="mt-5 max-w-[56ch] text-[1.05rem] leading-relaxed text-[#4b5a74]">
              Our focus is vision work, but we do not want to turn a good enquiry away. Tell us about the task, and our
              team will check the fit. If it is a good fit, we will set up a feasibility call. If it is not, we will tell
              you honestly and stay in touch.
            </p>
            <ol className="relative mt-9 space-y-4">
              <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-[#0b6e50] to-[#34c996]/20" />
              {taskSteps.map(({ title, icon: Icon }, i) => (
                <li key={title} className="relative flex items-center gap-4">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#0b6e50] shadow-md ring-1 ring-[#0b6e50]/20">
                    <Icon size={19} aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#0b6e50] text-[0.65rem] font-bold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <span className="font-semibold text-[#14304f]">{title}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative lg:self-center">
            <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-[#34c996]/25 via-transparent to-[#14304f]/10 blur-2xl" />
            <div className="rounded-[28px] border border-[#14304f]/10 bg-white p-6 shadow-[0_40px_80px_-40px_rgba(20,48,79,0.45)] sm:p-8">
              <TaskForm />
            </div>
          </div>
        </div>
      </section>

      {/* PILOT */}
      <section aria-labelledby="pa-pilot" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0b6e50] via-[#0d7a59] to-[#14304f] p-8 text-white sm:p-12 lg:p-16">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-20 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
            <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#34c996]/40 blur-3xl" />
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  <Route size={22} aria-hidden="true" />
                </span>
                <h2 id="pa-pilot" className="display mt-6 text-[clamp(1.8rem,1.2rem+2vw,3rem)]">
                  Start with a fixed-scope pilot on one line or one route.
                </h2>
                <p className="mt-4 max-w-[56ch] text-[1.05rem] text-white/80">
                  We agree the measure of success before we start, so the pilot gives you a clear yes or no.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={inspectionHref} className="btn group flex-1 bg-white text-[#0b6e50] hover:bg-[#e6f4ee]">
                  <ScanLine size={18} aria-hidden="true" /> Inspection feasibility call
                </Link>
                <Link
                  href={siteAssessmentHref}
                  className="btn group flex-1 border border-white/40 text-white hover:border-white hover:bg-white/10"
                >
                  <ShieldAlert size={18} aria-hidden="true" /> Site assessment call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="pa-faq" className="relative isolate overflow-hidden bg-gradient-to-b from-[#f3f8f6] to-white py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
        <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16 lg:px-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6e50] to-[#34c996] text-white shadow-md">
              <MessageCircleQuestion size={22} aria-hidden="true" />
            </span>
            <h2 id="pa-faq" className="display mt-6 text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)] text-[#14304f]">
              Questions about{" "}
              <span className="bg-gradient-to-r from-[#0b6e50] to-[#34c996] bg-clip-text text-transparent">Physical AI</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-2xl border border-[#14304f]/10 bg-white shadow-[0_18px_40px_-34px_rgba(20,48,79,0.5)] transition-[border-color,box-shadow] duration-300 open:border-[#0b6e50]/25 open:shadow-[0_24px_50px_-30px_rgba(11,110,80,0.45)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className="display w-8 shrink-0 text-lg text-[#14304f]/20 transition-colors group-open:text-[#0b6e50]">
                    0{i + 1}
                  </span>
                  <h3 className="flex-1 text-[1.05rem] font-semibold text-[#14304f] sm:text-lg">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef2f8] text-[#14304f] transition duration-300 group-open:rotate-45 group-open:bg-[#0b6e50] group-open:text-white"
                  >
                    <Plus size={18} />
                  </span>
                </summary>
                <p className="px-5 pb-6 pl-[4.25rem] pr-6 text-[0.98rem] leading-relaxed text-[#4b5a74] sm:pr-16">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
