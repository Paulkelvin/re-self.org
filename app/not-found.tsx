import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="bg-forest text-white">
      <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-[1200px] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-sage">
          404 — Not Found
        </p>
        <p className="font-serif text-[7rem] font-bold leading-none text-white/8 sm:text-[10rem] lg:text-[13rem]">
          404
        </p>
        <h2 className="font-serif mt-4 text-3xl font-bold text-white sm:text-4xl">
          This page doesn&apos;t exist.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/50">
          You may have followed a broken link or typed the address incorrectly.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-forest shadow-lg transition-all hover:-translate-y-px hover:shadow-xl"
          >
            Back to Home
          </Link>
          <Link
            href="/book-sonya"
            className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-white/20 px-8 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white"
          >
            Book Sonya &rarr;
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm">
          {[
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Speaking & Events", href: "/speaking-events" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-medium text-white/35 transition-colors hover:text-white/65"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
