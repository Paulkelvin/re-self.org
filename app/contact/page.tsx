import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sonya Harris for speaking engagements, workshops, retreats, and corporate wellness programs.",
};

const channels = [
  {
    label: "General enquiries",
    value: "hello@re-self.org",
    href: "mailto:hello@re-self.org",
  },
  {
    label: "Bookings & events",
    value: "bookings@re-self.org",
    href: "mailto:bookings@re-self.org",
  },
  {
    label: "Phone",
    value: "+1 (202) 555-0100",
    href: "tel:+12025550100",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sage">Contact</p>
          <h1 className="font-serif max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
            Let&apos;s build the right wellness experience{" "}
            <span className="italic text-sage">for your audience.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
            Have a question before committing to a full booking request? Use this form to
            start the conversation.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            {/* Left */}
            <div className="space-y-5">
              <FadeIn direction="up">
                <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-sage">
                  Direct contact
                </p>

                {channels.map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-line bg-white p-6 shadow-sm"
                  >
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
                      {label}
                    </p>
                    <a
                      href={href}
                      className="mt-1.5 block text-base font-semibold text-forest transition-colors hover:text-forest-light"
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </FadeIn>

              <FadeIn direction="up" delay={100}>
                <div className="rounded-xl bg-beige p-6">
                  <p className="text-sm font-semibold text-forest">Need a formal booking?</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    For speaking dates, workshops, programs, and retreats — use the dedicated
                    booking form where you can include full event details.
                  </p>
                  <a
                    href="/book-sonya"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest transition-all hover:gap-2"
                  >
                    Go to Book Sonya &rarr;
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <FadeIn direction="up" delay={80}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
