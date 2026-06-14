import Image from "next/image";
import Link from "next/link";

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

const labelCls =
  "mb-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40";

/* Low-opacity "organizational sphere" graphic for the CTA banner. */
function SphereGraphic() {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden="true" className="h-full w-full">
      <g strokeWidth="0.5">
        <circle cx="100" cy="100" r="92" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="48" />
        <circle cx="100" cy="100" r="26" />
        <ellipse cx="100" cy="100" rx="92" ry="38" />
        <ellipse cx="100" cy="100" rx="92" ry="64" />
        <ellipse cx="100" cy="100" rx="38" ry="92" />
        <ellipse cx="100" cy="100" rx="64" ry="92" />
        <line x1="8" y1="100" x2="192" y2="100" />
        <line x1="100" y1="8" x2="100" y2="192" />
      </g>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" />
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
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* 1 — Floating overlap CTA banner */}
      <div className="relative z-20 -mb-24 px-6 pt-20 lg:px-16 lg:pt-28">
        <div className="relative mx-auto grid min-h-[260px] max-w-6xl grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2a4d46] to-[#152b27] p-8 shadow-2xl md:grid-cols-12 md:p-12">
          {/* Right abstract graphic */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 top-1/2 hidden h-[360px] w-[360px] -translate-y-1/2 text-sage/20 md:block"
          >
            <span className="absolute inset-8 rounded-full border border-sage/10 animate-spin-slow" />
            <SphereGraphic />
          </div>

          {/* Left content */}
          <div className="relative z-10 md:col-span-7">
            <h2 className="font-serif mb-2 text-2xl font-medium leading-tight tracking-tight text-white md:text-4xl">
              Ready to work with Sonya?
            </h2>
            <p className="max-w-md text-sm font-light leading-relaxed text-neutral-300">
              Bring her expertise in military resilience, federal leadership, and wellness
              facilitation to your organization.
            </p>
            <Link
              href="/book-sonya"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1e3d38] transition-all hover:bg-[#eae6df]"
            >
              Book Sonya
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* 2 — Lower footer container */}
      <div className="relative z-10 overflow-hidden bg-[#122421] px-6 pb-12 pt-40 text-white lg:px-16">
        {/* Brand mark */}
        <div className="mx-auto mb-12 max-w-6xl">
          <Image
            src="/reself-logo.png"
            alt="Re-Self — reimagine self care"
            width={264}
            height={192}
            className="h-24 w-auto"
          />
        </div>

        {/* 3 — Asymmetrical directory grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 border-b border-white/5 pb-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Direct Line */}
          <div className="lg:col-span-4">
            <span className={labelCls}>Direct Line</span>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-block border-b border-white/20 pb-1 font-serif text-lg text-white/90 transition-all hover:border-white hover:text-white"
            >
              {EMAIL}
            </a>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <span className={labelCls}>Explore</span>
            <nav className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <Link key={href} href={href} className="block text-xs text-white/60 transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal & Utility */}
          <div className="lg:col-span-3">
            <span className={labelCls}>Legal &amp; Utility</span>
            <nav className="space-y-3">
              {information.map(({ label, href }) => (
                <Link key={href} href={href} className="block text-xs text-white/60 transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Current Time */}
          <div className="lg:col-span-2">
            <span className={labelCls}>Current Time</span>
            <p className="font-mono text-xs text-white/60">EST / WASHINGTON, DC</p>
          </div>
        </div>

        {/* Luxury signature watermark */}
        <div
          aria-hidden="true"
          className="my-4 select-none text-center font-serif text-[14vw] font-bold uppercase leading-none tracking-tighter text-white/[0.02] pointer-events-none"
        >
          Re-Self
        </div>

        {/* 4 — Ultra-minimal copyright basebar */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-[10px] font-mono tracking-widest text-white/40 sm:flex-row">
          <p>&copy; {year} RE-SELF. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-x-6 text-white/50">
            {social.map(({ href, Icon, label }) => (
              <a key={label} href={href} aria-label={label} className="transition-opacity hover:text-white">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
