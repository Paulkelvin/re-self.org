import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Re-Self for speaking engagements, workshops, retreats, and corporate wellness programs.",
};

const channels = [
  { label: "General enquiries", value: "hello@re-self.org", href: "mailto:hello@re-self.org" },
  { label: "Bookings & events", value: "bookings@re-self.org", href: "mailto:bookings@re-self.org" },
];

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-pine-dark text-white">
        <div className="mx-auto max-w-[1160px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
            Contact
          </p>
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-6xl">
            Let&apos;s build the right wellness experience{" "}
            <span className="text-sage">for your audience.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65">
            Have a question before committing to a full booking request? Use this
            form to start the conversation. For formal booking inquiries, visit{" "}
            <a href="/book-sonya" className="font-bold text-coral underline-offset-2 hover:underline">
              Book Sonya
            </a>
            .
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            {/* Left: contact info */}
            <div>
              <p className="mb-8 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
                Direct contact
              </p>

              <div className="grid gap-4">
                {channels.map(({ label, value, href }) => (
                  <div key={label} className="rounded-xl border border-line bg-white p-6">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-muted">
                      {label}
                    </p>
                    <a
                      href={href}
                      className="mt-1.5 block text-base font-bold text-pine transition-colors hover:text-coral"
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl bg-mist p-6">
                <p className="text-sm font-extrabold text-ink">Need a formal booking?</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  For speaking dates, workshops, programs, and retreats — use the
                  dedicated booking form where you can include full event details.
                </p>
                <a
                  href="/book-sonya"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-coral transition-all hover:gap-2"
                >
                  Go to Book Sonya &rarr;
                </a>
              </div>
            </div>

            {/* Right: contact form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
