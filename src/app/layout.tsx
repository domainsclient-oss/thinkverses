import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { site } from "@/lib/content";
import "./globals.css";

// Fonts are self-hosted so builds and the dev server never depend on reaching Google Fonts.
// Archivo is variable on weight and width; the site uses font-stretch for its wide display style.
const Archivo = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [
    { prop: "font-family", value: "Archivo" },
    { prop: "font-stretch", value: "62% 125%" },
  ],
});

// IBM Plex Sans (body) is declared in globals.css so --font-plex can use the exact family names.

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
    <html lang="en" className={Archivo.variable} suppressHydrationWarning>
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
