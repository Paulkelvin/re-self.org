"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Speaking & Events", href: "/speaking-events" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-pine/10 bg-paper/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-4 min-h-[72px]">
        <Link
          href="/"
          className="grid leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-lg font-extrabold tracking-tight text-pine">Re-Self</span>
          <span className="text-[0.62rem] font-bold uppercase tracking-widest text-coral">Wellness Strategy</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors hover:text-pine ${
                pathname === href ? "text-pine" : "text-muted"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book-sonya"
            className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-coral px-5 text-sm font-extrabold text-white shadow-sm transition-all hover:-translate-y-px hover:shadow-md hover:shadow-coral/30 active:translate-y-0"
          >
            Book Sonya
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="flex flex-col items-end gap-[5px] p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-[2px] w-6 rounded-full bg-pine transition-all duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full bg-pine transition-all duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded-full bg-pine transition-all duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-pine/10 bg-paper/98 transition-all duration-200 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3 pb-5">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-mist ${
                pathname === href ? "bg-mist text-pine" : "text-muted"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book-sonya"
            onClick={() => setOpen(false)}
            className="mt-2 flex min-h-[46px] items-center justify-center rounded-lg bg-coral text-sm font-extrabold text-white"
          >
            Book Sonya
          </Link>
        </div>
      </div>
    </header>
  );
}
