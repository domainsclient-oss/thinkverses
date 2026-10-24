import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Industries } from "@/components/sections/Industries";
import { About } from "@/components/sections/About";
import { DigitalTwin } from "@/components/sections/DigitalTwin";
import { WhyThinkverses } from "@/components/sections/WhyThinkverses";
import { CtaBand } from "@/components/sections/CtaBand";
import { Tools } from "@/components/sections/Tools";
import { Insights } from "@/components/sections/Insights";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Training } from "@/components/sections/Training";
import { Locations } from "@/components/sections/Locations";
import { Contact } from "@/components/sections/Contact";
import { faqs, site, socials } from "@/lib/content";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: site.email,
    telephone: site.phone,
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    areaServed: ["AE", "BH", "KW", "OM", "QA", "SA"],
    sameAs: socials.map((s) => s.href).filter((h) => new URL(h).pathname.length > 1),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Pillars />
      <About />
      <DigitalTwin />
      <WhyThinkverses />
      <Industries />
      <CtaBand />
      <Tools />
      <Insights />
      <Testimonials />
      <Faq />
      <Training />
      <Locations />
      <Contact />
    </>
  );
}
