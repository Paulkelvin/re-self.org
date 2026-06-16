import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

// Both are variable fonts — omitting `weight` loads a single file per family
// that covers the full weight axis (Jakarta 200–800, Playfair 400–900),
// instead of one file per weight.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

// A real monospaced face for the recurring micro-label motif (step numbers,
// eyebrows, timestamps). Gives that system a deliberate, cross-OS-consistent
// typeface instead of whatever default mono each device happens to ship.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://re-self.org"),
  title: {
    default: "Sonya Harris | Corporate Wellness Consultant & Keynote Speaker",
    template: "%s | Sonya Harris",
  },
  description:
    "Sonya Harris empowers organizations through transformative wellness programs, keynote speaking, leadership retreats, and corporate wellness facilitation rooted in 21+ years of service.",
  icons: {
    icon: "/reself-logo.png",
    apple: "/reself-logo.png",
  },
  keywords: [
    "corporate wellness consultant",
    "keynote speaker",
    "wellness facilitator",
    "leadership development",
    "burnout prevention",
    "retreat facilitation",
    "Air Force veteran speaker",
  ],
  openGraph: {
    title: "Sonya Harris | Corporate Wellness Consultant & Keynote Speaker",
    description:
      "Transformative wellness programs, keynote speaking, and corporate facilitation for high-performing teams and organizations.",
    url: "https://re-self.org",
    siteName: "Re-Self",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Sonya Harris",
      jobTitle: "Corporate Wellness Consultant & Keynote Speaker",
      url: "https://re-self.org",
      description:
        "Sonya Harris is a corporate wellness consultant, keynote speaker, and retreat facilitator with 21+ years of U.S. Air Force service and 10+ years of federal government leadership experience.",
      knowsAbout: [
        "Corporate Wellness",
        "Leadership Development",
        "Burnout Prevention",
        "Resilience Training",
        "Retreat Facilitation",
        "Keynote Speaking",
      ],
    },
    {
      "@type": "ProfessionalService",
      name: "Re-Self Wellness",
      url: "https://re-self.org",
      description:
        "Premium corporate wellness consulting, keynote speaking, and facilitation services for organizations, government agencies, and educational institutions.",
      provider: { "@type": "Person", name: "Sonya Harris" },
      serviceType: [
        "Corporate Wellness Programs",
        "Keynote Speaking",
        "Workshop Facilitation",
        "Retreat Facilitation",
        "Leadership Development",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${playfair.variable} ${plexMono.variable} font-sans bg-warm-white text-charcoal antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
