import Link from "next/link";
import { FooterLogo } from "./Logo";
import { SocialLinks } from "./SocialIcons";
import { nav, site } from "@/lib/content";
import { services, solutionPath, articleSlug } from "@/lib/locations";

const legalLinks = [
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-blueprint opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[90rem] px-4 pb-10 pt-20 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FooterLogo />
            <p className="mt-5 max-w-sm text-white/65">
              Digital Twin decision-intelligence systems and robotics solutions for operationally complex environments.
              Headquartered in Dubai, UAE.
            </p>
            <div className="mt-7">
              <SocialLinks />
            </div>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-sm font-semibold text-cyan">Company</h2>
              <ul className="mt-4 space-y-2.5 text-white/70">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-draw hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-cyan">Solutions</h2>
              <ul className="mt-4 space-y-2.5 text-white/70">
                {services.map((s) => (
                  <li key={s.key}>
                    <Link href={solutionPath(s.key, "uae")} className="link-draw hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/?topic=training#contact" className="link-draw hover:text-white">
                    Training &amp; Consultation
                  </Link>
                </li>
                <li>
                  <Link href={`/articles/${articleSlug}`} className="link-draw hover:text-white">
                    Latest article
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-cyan">Contact</h2>
              <ul className="mt-4 space-y-2.5 text-white/70">
                <li>
                  <a href={site.phoneHref} className="link-draw hover:text-white">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="link-draw hover:text-white">
                    {site.email}
                  </a>
                </li>
                <li>{site.headquarters}</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <p>© Thinkverses Solutions LLC. All rights reserved.</p>
            <span className="hidden text-white/20 sm:inline" aria-hidden="true">|</span>
            <p>Digital Twin, AI, IoT and Robotics</p>
          </div>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-draw transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
