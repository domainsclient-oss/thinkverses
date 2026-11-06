import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "../Reveal";
import { ContactForm } from "../forms/ContactForm";
import { site } from "@/lib/content";

// Booking section: copy and colours from the approved reference (navy #14304f ground, white form card).
const steps = ["Answer six short questions", "Pick a slot on our live calendar", "The call opens at the right stage for you"];

export function Contact() {
  const channels = [
    { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref, action: "Call now" },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, action: "Send an email" },
    { icon: MessageCircle, label: "WhatsApp", value: "Message us on WhatsApp", href: site.whatsapp, action: "Start a chat" },
    { icon: MapPin, label: "Headquarters", value: site.headquarters, action: "Serving the UAE & GCC" },
  ];

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[#14304f] py-24 text-white sm:py-32">
      {/* Ambient layers */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]" aria-hidden="true" />
      <div className="absolute -left-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#0b6e50]/35 blur-[140px]" aria-hidden="true" />
      <div className="absolute -bottom-40 right-0 -z-10 h-[30rem] w-[40rem] rounded-full bg-[#5fd4a0]/10 blur-[140px]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#5fd4a0]/50 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[90rem] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Left: pitch, sticky beside the long form on desktop */}
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <h2 className="display text-[clamp(2.1rem,1.4rem+2vw,3rem)] leading-[1.08] tracking-tight text-white">
              Book a 30-minute call, and we will start where you are.
            </h2>
            <p className="mt-6 max-w-[54ch] text-[1.05rem] leading-relaxed text-[#c9d6e8]">
              Tell us what you are looking at and pick a time that suits you. The call goes to the person who handles that
              kind of project, so you do not have to explain yourself twice.
            </p>

            {/* Steps: a connected timeline */}
            <ol className="relative mt-10">
              <span className="absolute bottom-5 left-[1.375rem] top-5 w-px bg-gradient-to-b from-[#5fd4a0] via-[#5fd4a0]/40 to-[#5fd4a0]/10" aria-hidden="true" />
              {steps.map((s, i) => (
                <li key={s} className="group relative flex items-center gap-5 py-2.5">
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#5fd4a0] bg-[#14304f] text-[0.95rem] font-semibold text-[#5fd4a0] transition-colors duration-300 group-hover:bg-[#5fd4a0] group-hover:text-[#14304f]">
                    {i + 1}
                    {i === 0 && <span className="pulse absolute inset-0 rounded-full ring-2 ring-[#5fd4a0]/40" aria-hidden="true" />}
                  </span>
                  <span className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-medium text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-[#5fd4a0]/40 group-hover:bg-white/[0.07]">
                    {s}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-white/35 bg-white/[0.03] px-5 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <MessageCircle size={18} className="text-[#5fd4a0]" aria-hidden="true" /> Message us on WhatsApp
              </a>
              <Link href="/#why" className="group inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-[#c9d6e8] transition-colors hover:text-white">
                Not ready yet? Pick your problem
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right: form card on a layered, glowing frame */}
        <Reveal delay={120} className="lg:col-span-7">
          <div className="relative">
            <span className="absolute inset-x-6 -bottom-3 top-6 rounded-[28px] bg-white/[0.06] ring-1 ring-white/10" aria-hidden="true" />
            <span className="absolute inset-x-12 -bottom-6 top-12 rounded-[28px] bg-white/[0.03] ring-1 ring-white/5" aria-hidden="true" />
            <div className="absolute -inset-px rounded-[29px] bg-gradient-to-br from-[#5fd4a0]/60 via-white/10 to-transparent" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] sm:p-10">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0b6e50] via-[#5fd4a0] to-[#14304f]" aria-hidden="true" />
              <Suspense fallback={<div className="h-[30rem]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Reveal>

        {/* Contact channels: one glass strip */}
        <Reveal className="mt-4 lg:col-span-12">
          <ul className="grid overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.04] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c, i) => {
              const Icon = c.icon;
              const hq = !c.href;
              const inner = (
                <>
                  <span className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#5fd4a0]/10 text-[#5fd4a0] ring-1 ring-[#5fd4a0]/25 transition-colors duration-300 group-hover:bg-[#5fd4a0]/20" aria-hidden="true">
                      <Icon size={19} />
                    </span>
                    {!hq && (
                      <ArrowUpRight size={18} className="text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#5fd4a0]" aria-hidden="true" />
                    )}
                  </span>
                  <span className="mt-5 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#c9d6e8]/70">{c.label}</span>
                  <span className="mt-1 block break-words font-semibold leading-snug text-white">{c.value}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[#5fd4a0]">{c.action}</span>
                </>
              );
              const tile = `group relative flex h-full flex-col p-6 transition-colors duration-300 ${
                i > 0 ? "border-t border-white/10 sm:border-t-0" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-white/10" : ""} ${i >= 2 ? "sm:border-t sm:border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:border-white/10" : ""}`;
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${tile} hover:bg-white/[0.06]`}>
                      <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#5fd4a0] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                      {inner}
                    </a>
                  ) : (
                    <div className={tile}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
