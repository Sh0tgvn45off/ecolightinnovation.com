import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/ui/motion-provider";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Solar Energy-as-a-Service for Zambia`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "solar energy as a service",
    "solar subscription",
    "solar home system",
    "solar lighting",
    "Zambia",
    "off-grid energy",
    "rural electrification",
    "Chilumba",
    "energy access",
    "social enterprise",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/images/photos/children-studying-solar.jpg", width: 825, height: 541, alt: "Two pupils studying by solar light" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    images: ["/images/photos/children-studying-solar.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/images/brand/logo-mark-trim.png`,
  email: site.email,
  telephone: site.phone.tel,
  slogan: site.tagline,
  address: { "@type": "PostalAddress", addressLocality: "Lusaka", addressCountry: "ZM" },
  areaServed: { "@type": "Place", name: "Chilumba, Central Province, Zambia" },
  sameAs: [site.socials.facebook, site.socials.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
