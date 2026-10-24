"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { consultationHref, nav, site } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        solid
          ? "border-b border-white/10 bg-ink/90 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative block rounded-full px-3 py-2 text-[0.92rem] font-medium text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-cyan transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={consultationHref} className="btn btn-primary hidden !min-h-[2.75rem] !px-5 sm:inline-flex">
            Book a Consultation
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-ink bg-blueprint xl:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[90rem] px-4 pb-10 pt-4 sm:px-6">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-[1.35rem] font-semibold text-white [font-stretch:112%]"
                >
                  {item.label}
                  <ArrowRight size={18} className="text-cyan" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={consultationHref} onClick={() => setOpen(false)} className="btn btn-primary mt-8 w-full">
            Book a Consultation
          </Link>
          <p className="mt-6 text-sm text-fog">
            <a href={site.phoneHref} className="text-white">
              {site.phone}
            </a>
            <span className="mx-2 text-white/30">/</span>
            <a href={`mailto:${site.email}`} className="text-white">
              {site.email}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
