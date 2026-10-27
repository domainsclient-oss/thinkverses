"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../Reveal";

const testimonials = [
  {
    quote:
      "I came in skeptical. I left with a clear plan for where AI fits in our daily processes. My team is already working differently because of what I brought back from this training.",
    name: "John Smith",
    role: "Operations Manager",
    tone: "from-ink to-volt",
  },
  {
    quote:
      "We’ve been talking about AI adoption for over a year. This program gave us the language, the confidence, and the practical tools to finally act on it. It changed how I think about my role.",
    name: "Prya Morris",
    role: "Head of People Operations",
    tone: "from-volt to-[#0056a7]",
  },
  {
    quote:
      "I didn’t expect to enjoy it this much. The training met me where I was — no technical background needed. I’m already applying it to how I build reports and prep for client meetings.",
    name: "James Brilla",
    role: "Senior Financial Analyst",
    tone: "from-[#0056a7] to-cyan-deep",
  },
  {
    quote:
      "I needed to understand AI well enough to lead through it — not just delegate it. This course gave me exactly that. I made three strategic decisions differently the week after.",
    name: "Lynda Doe",
    role: "Tech student",
    tone: "from-cyan-deep to-volt",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

// First sentence becomes the pull-line; the wording itself is unchanged.
function splitQuote(q: string) {
  const i = q.indexOf(". ");
  return i === -1 ? [q, ""] : [q.slice(0, i + 1), q.slice(i + 2)];
}

function Card({ t, index }: { t: (typeof testimonials)[number]; index: number }) {
  const [lead, rest] = splitQuote(t.quote);
  return (
    <figure className="group relative flex h-full flex-col rounded-[28px] border border-line bg-white p-8 shadow-[0_24px_50px_-36px_rgba(10,22,48,0.3)] transition-colors duration-500 hover:border-ink/50 sm:p-10">
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink" aria-hidden="true">
          <svg viewBox="0 0 64 48" className="h-5 w-7">
            <defs>
              <linearGradient id={`tq-${index}`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#0056a7" />
              </linearGradient>
            </defs>
            <path
              d="M0 48V28C0 12 8 3 24 0l3 7c-8 3-12 8-12 15h11v26zm36 0V28c0-16 8-25 24-28l3 7c-8 3-12 8-12 15h11v26z"
              fill={`url(#tq-${index})`}
            />
          </svg>
        </span>
        <span className="font-display text-sm font-bold tabular-nums text-slate/60 [font-stretch:115%]">
          {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>
      </div>

      <blockquote className="mt-8 flex-1 text-[1.12rem] leading-[1.7] text-slate sm:text-[1.2rem]">
        <p>
          “<span className="font-semibold text-ink">{lead}</span>
          {rest && <> {rest}</>}”
        </p>
      </blockquote>

      <figcaption className="mt-10 flex items-center gap-4 border-t border-line pt-6">
        <span className={`rounded-full bg-gradient-to-br p-[2px] ${t.tone}`} aria-hidden="true">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
            {initials(t.name)}
          </span>
        </span>
        <span>
          <span className="block font-semibold text-ink">{t.name}</span>
          <span className="block text-sm text-slate">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

const AUTOPLAY_MS = 6000;

const padStart = (el: HTMLElement) => parseFloat(getComputedStyle(el).paddingLeft) || 0;

function Carousel() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setMotionOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const n = (i + testimonials.length) % testimonials.length;
      const slide = el.children[n] as HTMLElement | undefined;
      if (slide) el.scrollTo({ left: slide.offsetLeft - padStart(el), behavior: motionOk ? "smooth" : "auto" });
    },
    [motionOk],
  );

  // Derive the active slide from the scroll position so swipes and buttons stay in sync.
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const x = el.scrollLeft + padStart(el);
    const atEnd = x + el.clientWidth >= el.scrollWidth - 4;
    const idx = atEnd
      ? slides.length - 1
      : slides.reduce((best, s, i) => (Math.abs(s.offsetLeft - x) < Math.abs(slides[best].offsetLeft - x) ? i : best), 0);
    setActive(idx);
  };

  useEffect(() => {
    if (!motionOk || paused) return;
    const id = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [motionOk, paused, active, goTo]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <ul
        ref={track}
        onScroll={onScroll}
        className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 sm:scroll-px-0 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <li
            key={t.name}
            className="shrink-0 basis-[88%] snap-start sm:basis-[78%] xl:basis-[72%]"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
          >
            <Card t={t} index={i} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-4">
          <p className="font-display text-sm font-bold tabular-nums text-slate [font-stretch:115%]">
            <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(testimonials.length).padStart(2, "0")}
          </p>
          <div className="flex max-w-xs flex-1 gap-1.5">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === active}
                className="group/dot relative h-6 flex-1"
              >
                <span
                  className={`absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full transition-colors duration-300 ${
                    i === active ? `bg-gradient-to-r ${t.tone}` : "bg-line group-hover/dot:bg-slate/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white ring-1 ring-ink transition-colors hover:bg-white hover:text-ink"
            aria-label="Next testimonial"
          >
            <ChevronRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative isolate overflow-hidden bg-paper py-24 sm:py-32"
    >
      <div
        className="absolute inset-0 -z-10 bg-blueprint-light [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
        aria-hidden="true"
      />
      <div className="absolute -right-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-violet/15 blur-[140px]" aria-hidden="true" />

      <div className="mx-auto grid max-w-[90rem] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Sticky intro */}
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-deep/30 bg-cyan-deep/5 px-3.5 py-1.5 text-sm font-medium text-cyan-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-deep" aria-hidden="true" />
              Testimonials
            </p>
            <h2 id="testimonials-title" className="display h-section">
              What Our{" "}
              <span className="bg-gradient-to-r from-cyan-deep via-volt to-[#0056a7] bg-clip-text text-transparent">Learners</span> Say
            </h2>
            <p className="lede mt-6 text-slate">
              Real outcomes from professionals who turned AI training into new ways of working, leading and deciding.
            </p>

            <div className="mt-10 rounded-[24px] bg-ink p-6 text-white">
              <div className="flex -space-x-3" aria-hidden="true">
                {testimonials.map((t) => (
                  <span key={t.name} className={`rounded-full bg-gradient-to-br p-[2px] ring-4 ring-ink ${t.tone}`}>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-xs font-bold">{initials(t.name)}</span>
                  </span>
                ))}
              </div>
              <p className="mt-5 font-display text-lg font-semibold leading-snug [font-stretch:105%]">
                {testimonials.length} voices, one theme: <span className="text-cyan">AI they can act on.</span>
              </p>
              <p className="mt-2 text-sm text-white/60">From operations and people teams to finance and the next generation of tech talent.</p>
            </div>
          </Reveal>
        </div>

        {/* Carousel */}
        <Reveal delay={120} className="min-w-0 lg:col-span-8 lg:self-center">
          <Carousel />
        </Reveal>
      </div>
    </section>
  );
}
