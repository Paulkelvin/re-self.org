import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="bg-pine-dark text-white">
      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1160px] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="mb-5 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
          404 &mdash; Not Found
        </p>
        <h1 className="text-6xl font-extrabold leading-none tracking-tight sm:text-8xl lg:text-[10rem]">
          <span className="text-white/10">404</span>
        </h1>
        <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          This page doesn&apos;t exist.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/55">
          You may have followed a broken link or typed the address incorrectly.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-coral px-7 text-sm font-extrabold text-white shadow-lg shadow-coral/20 transition-all hover:-translate-y-px hover:shadow-xl hover:shadow-coral/30"
          >
            Back to Home
          </Link>
          <Link
            href="/book-sonya"
            className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-white/20 px-7 text-sm font-bold text-white/80 transition-all hover:border-white/40 hover:text-white"
          >
            Book Sonya &rarr;
          </Link>
        </div>

        <div className="mt-16 grid gap-3 text-sm sm:flex sm:gap-8">
          {[
            { label: "Services", href: "/services" },
            { label: "Speaking & Events", href: "/speaking-events" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-semibold text-white/40 transition-colors hover:text-white/70"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
