import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { site } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Thinkverses Solutions | Digital Twin & Robotics Solutions in the UAE",
    template: "%s | Thinkverses Solutions",
  },
  description:
    "Thinkverses builds Digital Twin decision-intelligence systems and robotics solutions for oil & gas, manufacturing, energy, facilities and logistics across the UAE and GCC.",
  applicationName: site.name,
  keywords: [
    "Digital Twin",
    "Robotics",
    "IoT",
    "AI",
    "Dubai",
    "UAE",
    "Industrial automation",
    "Predictive maintenance",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AE",
    url: "/",
    images: [{ url: "/images/hero-plant.jpg", width: 2200, height: 1467 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a1630",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plex.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
