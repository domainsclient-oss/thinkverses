import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "../Reveal";
import { SocialLinks } from "../SocialIcons";
import { ContactForm } from "../forms/ContactForm";
import { NewsletterForm } from "../forms/NewsletterForm";
import { site } from "@/lib/content";

const steps = ["Answer six short questions", "Pick a slot on our live calendar", "The call opens at the right stage for you"];

export function Contact() {
  const channels = [
    { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref, action: "Call now", tone: "from-ink to-volt" },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, action: "Send an email", tone: "from-volt to-[#0056a7]" },
    { icon: MessageCircle, label: "WhatsApp", value: "Message us on WhatsApp", href: site.whatsapp, action: "Start a chat", tone: "from-[#25d366] to-[#128c7e]" },
    { icon: MapPin, label: "Headquarters", value: site.headquarters, action: "Serving the UAE & GCC", tone: "from-[#0056a7] to-volt" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-[60%] bg-blueprint-light [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <Reveal className="lg:col-span-5">
          <h2 className="display h-hero">Let&apos;s Connect</h2>
          <p className="lede mt-6 text-slate">
            Tell us about the operation you want to improve. We will come back with a clear next step, usually within
            one business day.
          </p>

          <div className="mt-10 rounded-[22px] border border-line bg-white p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold leading-tight [font-stretch:112%]">
              Book a 30-minute call, and we will start where you are.
            </h3>
            <p className="mt-3 leading-relaxed text-slate">
              Tell us what you are looking at and pick a time that suits you. The call goes to the person who handles
              that kind of project, so you do not have to explain yourself twice.
            </p>
            <ol className="mt-6 space-y-3.5">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 font-display text-sm font-semibold text-cyan-deep">
                    {i + 1}
                  </span>
                  <span className="font-medium">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <MessageCircle size={18} aria-hidden="true" /> Message us on WhatsApp
              </a>
              <Link href="/#robotics" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-deep hover:text-charcoal">
                <span className="link-draw">Not ready yet? Pick your problem</span>
              </Link>
            </div>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {channels.map((c) => {
              const Icon = c.icon;
              const hq = !c.href;
              const inner = (
                <>
                  {hq && (
                    <>
                      <span className="absolute inset-0 bg-blueprint opacity-70" aria-hidden="true" />
                      <span className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet/30 blur-3xl" aria-hidden="true" />
                    </>
                  )}
                  <span
                    className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-[0_12px_24px_-12px_rgba(10,22,48,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${c.tone}`}
                  >
                    <Icon size={20} aria-hidden="true" />
                    {hq && <span className="pulse absolute inset-0 rounded-2xl ring-2 ring-violet/60" aria-hidden="true" />}
                  </span>
                  <span className="relative mt-5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate group-[.is-hq]:text-white/50">
                    {c.label}
                  </span>
                  <span className="relative mt-1 block break-words font-display text-[1.05rem] font-semibold leading-snug [font-stretch:105%]">
                    {c.value}
                  </span>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-deep group-hover:text-charcoal group-[.is-hq]:text-cyan">
                    {c.action}
                    {!hq && (
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </>
              );
              const tile =
                "group relative flex h-full flex-col overflow-hidden rounded-[22px] border p-5 transition-all duration-500";
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${tile} border-line bg-white hover:-translate-y-1 hover:border-ink/50 hover:shadow-[0_24px_48px_-28px_rgba(10,22,48,0.45)]`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={`${tile} is-hq border-transparent bg-ink text-white`}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <p className="text-sm font-semibold">Follow Thinkverses</p>
            <div className="mt-3">
              <SocialLinks tone="light" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <div className="rounded-[28px] border border-line bg-white p-6 shadow-[0_40px_80px_-50px_rgba(10,22,48,0.45)] sm:p-10">
            <h3 className="font-display text-2xl font-bold [font-stretch:112%]">Send us a message</h3>
            <Suspense fallback={<div className="mt-8 h-[30rem]" />}>
              <ContactForm />
            </Suspense>
          </div>

          <div className="mt-6 grid gap-5 rounded-[28px] bg-ink p-6 text-white sm:p-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <h3 className="font-display text-xl font-bold [font-stretch:112%]">Get insights in your inbox</h3>
              <p className="mt-1.5 text-[0.95rem] text-white/65">New articles on Digital Twins, AI and robotics. Unsubscribe any time.</p>
            </div>
            <NewsletterForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
