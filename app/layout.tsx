import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://re-self.org"),
  title: {
    default: "Sonya Harris | Corporate Wellness Consultant & Keynote Speaker",
    template: "%s | Sonya Harris",
  },
  description:
    "Sonya Harris empowers organizations through transformative wellness programs, keynote speaking, leadership retreats, and corporate wellness facilitation rooted in 21+ years of service.",
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
        className={`${jakarta.variable} ${playfair.variable} font-sans bg-warm-white text-charcoal antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
