import Link from "next/link";

const nav = [
  { label: "Speaking & Events", href: "/speaking-events" },
  { label: "Services", href: "/services" },
  { label: "Book Sonya", href: "/book-sonya" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-pine-dark text-white">
      <div className="mx-auto max-w-[1160px] px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="grid leading-tight">
              <span className="text-xl font-extrabold tracking-tight text-white">Re-Self</span>
              <span className="text-[0.62rem] font-bold uppercase tracking-widest text-coral">Wellness Strategy</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Premium corporate wellness consulting, keynote speaking, and facilitation for high-performing teams that refuse to burn out.
            </p>
          </div>

          <div>
            <p className="mb-4 text-[0.65rem] font-extrabold uppercase tracking-widest text-white/30">
              Navigation
            </p>
            <ul className="grid gap-2.5">
              {nav.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[0.65rem] font-extrabold uppercase tracking-widest text-white/30">
              Contact
            </p>
            <ul className="grid gap-2.5 text-sm">
              <li>
                <a
                  href="mailto:hello@re-self.org"
                  className="text-white/55 transition-colors hover:text-white"
                >
                  hello@re-self.org
                </a>
              </li>
              <li>
                <a
                  href="mailto:bookings@re-self.org"
                  className="text-white/55 transition-colors hover:text-white"
                >
                  bookings@re-self.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Re-Self. All rights reserved.
          </p>
          <Link
            href="/book-sonya"
            className="text-xs font-bold text-coral transition-colors hover:text-coral/75"
          >
            Book a session &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
