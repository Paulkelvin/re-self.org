"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Speaking & Events", href: "/speaking-events" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line/50 bg-warm-white/95 backdrop-blur-lg transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 transition-all duration-300 ${
          scrolled ? "min-h-[60px]" : "min-h-[76px]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="grid shrink-0 gap-0.5 leading-none" onClick={() => setOpen(false)}>
          <span
            className={`font-serif font-bold tracking-tight text-forest transition-all duration-300 ${
              scrolled ? "text-[1rem]" : "text-[1.15rem]"
            }`}
          >
            Re-Self
          </span>
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-sage/80">
            Wellness Strategy
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 lg:flex">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium tracking-wide transition-opacity ${
                pathname === href ? "font-semibold text-forest opacity-100" : "text-muted opacity-70 hover:opacity-100"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book-sonya"
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-forest px-5 text-sm font-semibold text-white shadow-md shadow-forest/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-lg hover:shadow-forest/30"
          >
            Book Sonya
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="flex flex-col items-end gap-[5px] p-2 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-[2px] w-6 rounded-full bg-forest transition-all duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-4 rounded-full bg-forest transition-all duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded-full bg-forest transition-all duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-line/50 bg-warm-white transition-all duration-200 lg:hidden ${
          open ? "max-h-[440px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3 pb-5">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-beige ${
                pathname === href ? "bg-beige font-semibold text-forest" : "text-charcoal"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book-sonya"
            onClick={() => setOpen(false)}
            className="mt-2 flex min-h-[46px] items-center justify-center rounded-lg bg-forest text-sm font-semibold text-white"
          >
            Book Sonya
          </Link>
        </div>
      </div>
    </header>
  );
}
