import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { About } from "@/components/sections/About";
import { WhyThinkverses } from "@/components/sections/WhyThinkverses";
import { CtaBand } from "@/components/sections/CtaBand";
import { Training } from "@/components/sections/Training";
import { Contact } from "@/components/sections/Contact";
import { site, socials } from "@/lib/content";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/logo/footer-logo.webp`,
    email: site.email,
    telephone: site.phone,
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    areaServed: ["AE", "BH", "KW", "OM", "QA", "SA"],
    sameAs: socials.map((s) => s.href).filter((h) => new URL(h).pathname.length > 1),
  }
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <WhyThinkverses />
      <About />
      <Pillars />
      <Training />
      <CtaBand />
      <Contact />
    </>
  );
}
