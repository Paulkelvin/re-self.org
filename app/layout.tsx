import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://re-self.org"),
  title: {
    default: "Re-Self | Corporate Wellness, Speaking & Facilitation",
    template: "%s | Re-Self",
  },
  description:
    "Book Sonya for wellness keynotes, leadership retreats, corporate wellness workshops, and practical resilience programs.",
  openGraph: {
    title: "Re-Self | Corporate Wellness, Speaking & Facilitation",
    description:
      "Premium wellness consulting, keynote speaking, and corporate facilitation for healthier teams.",
    url: "https://re-self.org",
    siteName: "Re-Self",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans bg-paper text-ink antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
