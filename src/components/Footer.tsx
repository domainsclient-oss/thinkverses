import Link from "next/link";
import { FooterLogo } from "./Logo";
import { SocialLinks } from "./SocialIcons";

const footerMenu = [
  {
    title: "Solutions",
    links: [
      { label: "Digital Twin", href: "#" },
      { label: "Physical AI", href: "#" },
      { label: "Use cases", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About and team", href: "/#about" },
      { label: "Case studies", href: "#" },
      { label: "Security and data handling", href: "#" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Insights", href: "#" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export function Footer() {
  return (
    <footer className="cv-auto [contain-intrinsic-size:auto_1031px] lg:[contain-intrinsic-size:auto_478px] relative isolate overflow-hidden bg-[#0b1a2b] text-white">
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

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {footerMenu.map((col) => (
              <div key={col.title}>
                <h2 className="text-[0.95rem] font-semibold text-white">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="link-draw text-[#8fb3d9] transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© Thinkverses Solutions LLC. All rights reserved.</p>
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
