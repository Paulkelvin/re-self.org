import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Programs", href: "/packages" },
  { label: "Speaking & Events", href: "/speaking-events" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
];


const EMAIL = "sharris@re-self.org";

const labelCls =
  "mb-4 flex items-center gap-2 font-serif text-base font-semibold tracking-tight text-white";

/* Sage tick that precedes each column heading — small brand accent. */
function HeadingTick() {
  return <span aria-hidden="true" className="h-3 w-px bg-sage" />;
}

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
  { href: "https://www.facebook.com/profile.php?id=61574713893151", Icon: FacebookIcon, label: "Facebook" },
  { href: "https://www.instagram.com/__reself__?igsh=MThqZ2tya3dvNTRsbg==", Icon: InstagramIcon, label: "Instagram" },
  { href: "#", Icon: LinkedInIcon, label: "LinkedIn" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Lower footer container */}
      <div className="relative z-10 overflow-hidden bg-[#1a2618] px-6 pb-8 pt-12 text-white md:pb-12 md:pt-16 lg:px-16">
        {/* Brand mark */}
        <div className="mx-auto mb-8 max-w-6xl md:mb-12">
          <Image
            src="/reself-logo.png"
            alt="Re-Self — reimagine self care"
            width={223}
            height={200}
            className="logo-harmonize h-20 w-auto brightness-125"
          />
        </div>

        {/* 3 — Asymmetrical directory grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-9 pb-8 md:grid-cols-2 md:gap-12 md:pb-16 lg:grid-cols-12 lg:gap-8">
          {/* Direct Line */}
          <div className="lg:col-span-5">
            <span className={labelCls}><HeadingTick />Direct Line</span>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-block border-b border-white/20 pb-1 font-serif text-lg text-white/90 transition-all hover:border-white hover:text-white"
            >
              {EMAIL}
            </a>
            <br />
            <a
              href="tel:+12409887490"
              className="mt-2 inline-block border-b border-white/20 pb-1 font-serif text-lg text-white/90 transition-all hover:border-white hover:text-white"
            >
              (240) 988-7490
            </a>
          </div>

          {/* Explore */}
          <div className="lg:col-span-4">
            <span className={labelCls}><HeadingTick />Explore</span>
            <nav className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <Link key={href} href={href} className="block w-fit text-sm text-white/65 transition-all duration-300 hover:translate-x-1 hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Ultra-minimal copyright basebar */}
        <div className="mx-auto mt-4 flex max-w-6xl flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-[10px] font-mono tracking-widest text-white/40 sm:flex-row md:mt-12 md:pt-8">
          <p>&copy; {year} RE-SELF. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-x-6 text-white/50">
            {social.map(({ href, Icon, label }) => {
              const external = href !== "#";
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
