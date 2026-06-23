"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Programs", href: "/packages" },
  { label: "Speaking & Events", href: "/speaking-events" },
  { label: "Newsletter", href: "/newsletter" },
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

  // Lock background scroll while the full-screen mobile overlay is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line/50 bg-warm-white/95 backdrop-blur-lg transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 transition-all duration-300 ${
          scrolled ? "min-h-[64px]" : "min-h-[80px]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)} aria-label="Re-Self home">
          <Image
            src="/reself-logo.png"
            alt="Re-Self — reimagine self care"
            width={223}
            height={200}
            priority
            className={`logo-harmonize w-auto transition-all duration-300 ${scrolled ? "h-11" : "h-14"}`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-x-10 lg:flex">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              data-active={pathname === href}
              className={`link-underline text-sm font-medium tracking-wide uppercase transition-colors ${
                pathname === href ? "text-forest" : "text-neutral-700 hover:text-neutral-900"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book-sonya"
            className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-white shadow-md shadow-forest/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-lg hover:shadow-forest/30 active:scale-[0.98]"
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

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: {
                opacity: 0,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              },
              show: {
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                  when: "beforeChildren",
                  staggerChildren: 0.07,
                  delayChildren: 0.1,
                },
              },
            }}
            className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col bg-white px-7 py-7 lg:hidden"
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="flex items-center justify-between"
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center"
                aria-label="Re-Self home"
              >
                <Image
                  src="/reself-logo.png"
                  alt="Re-Self — reimagine self care"
                  width={223}
                  height={200}
                  className="logo-harmonize h-14 w-auto"
                />
              </Link>
              <button
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
                className="-mr-1 p-2 text-forest transition-transform duration-300 hover:rotate-90"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </motion.div>

            <nav className="mt-14 flex flex-col gap-7">
              {links.map(({ label, href }) => (
                <motion.div
                  key={href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`font-serif text-3xl font-medium transition-colors duration-300 ${
                      pathname === href ? "text-forest" : "text-charcoal hover:text-forest"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="mt-auto pt-8"
            >
              <Link
                href="/book-sonya"
                onClick={() => setOpen(false)}
                className="flex min-h-[54px] items-center justify-center rounded-full bg-forest text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-forest-light active:scale-[0.98]"
              >
                Book Sonya
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
