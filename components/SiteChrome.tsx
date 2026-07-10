"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

/**
 * Wraps the site in its Header/Footer chrome — except on /studio, where the
 * embedded Sanity Studio should own the full viewport with no site nav.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio") || pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      <Header />
      <div className="h-20" aria-hidden="true" />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
