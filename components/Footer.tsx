"use client";

import Link from "next/link";
import { useState } from "react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Speaking & Events", href: "/speaking-events" },
  { label: "Contact", href: "/contact" },
];

const information = [
  { label: "Book Sonya", href: "/book-sonya" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const EMAIL = "hello@re-self.org";

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 012-2h10" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const social = [
  { href: "#", Icon: FacebookIcon, label: "Facebook" },
  { href: "#", Icon: InstagramIcon, label: "Instagram" },
  { href: "#", Icon: LinkedInIcon, label: "LinkedIn" },
];

export function Footer() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — high-impact contact CTA */}
          <div className="lg:col-span-6">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-300">
              Get In Touch
            </span>
            <h2 className="font-serif mb-8 max-w-md text-3xl font-semibold leading-tight tracking-tight text-white lg:text-4xl">
              Let&rsquo;s Discuss Your Vision. With Us
            </h2>

            <Link
              href="/book-sonya"
              className="flex w-fit items-center gap-2 rounded-full bg-warm-white px-6 py-3.5 text-sm font-medium text-forest transition-opacity hover:opacity-90"
            >
              Schedule a call now
              <ArrowIcon />
            </Link>

            <span className="mt-8 mb-3 block text-[10px] font-bold uppercase tracking-wider text-neutral-300">
              Or Email Us At
            </span>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : `Copy email ${EMAIL}`}
              className="flex w-fit max-w-xs items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10"
            >
              <span className="text-sm text-neutral-200">{EMAIL}</span>
              <span className={copied ? "text-sage" : "text-neutral-400"}>
                {copied ? <CheckIcon /> : <CopyIcon />}
              </span>
            </button>
          </div>

          {/* Right — Quick Links */}
          <div className="lg:col-span-3">
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-300">
              Quick Links
            </span>
            <nav className="flex flex-col space-y-4 text-[15px] font-normal text-neutral-200">
              {quickLinks.map(({ label, href }) => (
                <Link key={href} href={href} className="transition-colors duration-200 hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right — Information */}
          <div className="lg:col-span-3">
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-300">
              Information
            </span>
            <nav className="flex flex-col space-y-4 text-[15px] font-normal text-neutral-200">
              {information.map(({ label, href }) => (
                <Link key={href} href={href} className="transition-colors duration-200 hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light uppercase tracking-wider text-neutral-400">
            &copy; Re-Self {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-x-6 text-neutral-400">
            {social.map(({ href, Icon, label }) => (
              <a key={label} href={href} aria-label={label} className="transition-colors hover:text-white">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
