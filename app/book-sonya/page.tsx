import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Book Sonya",
  description:
    "Submit a booking request for Sonya Harris — keynote speaking, workshops, corporate wellness programs, and retreat facilitation.",
};

const steps = [
  {
    step: "01",
    title: "Submit your request",
    body: "Fill in the form with your event details, audience, goals, and budget range. The more detail, the better.",
  },
  {
    step: "02",
    title: "Review & fit check",
    body: "Sonya reviews the request for fit, format, timing, and scope — typically within 2 business days.",
  },
  {
    step: "03",
    title: "Follow-up & discovery",
    body: "Sonya follows up with availability and next steps. A short discovery call may be scheduled for workshops and programs.",
  },
];

const reasons = [
  "21+ years of U.S. Air Force service",
  "Master of Education",
  "Certified Leadership Development Specialist",
  "Federal government leadership experience",
  "100+ workshops and programs delivered",
  "Engagements tailored — not templated",
];

export default function BookSonyaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sage">Book Sonya</p>
          <h1 className="font-serif max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
            Request availability for your next event{" "}
            <span className="italic text-sage">or wellness initiative.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
            Complete the booking form with as much detail as possible. You will receive a
            confirmation email after submission.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            {/* Left */}
            <div className="space-y-8">
              <FadeIn direction="up">
                <div>
                  <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-sage">
                    What happens next
                  </p>
                  <div className="grid gap-6">
                    {steps.map(({ step, title, body }) => (
                      <div key={step} className="flex gap-5">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
                          {step}
                        </span>
                        <div>
                          <p className="font-semibold text-charcoal">{title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={100}>
                <div className="rounded-2xl bg-beige p-7">
                  <p className="font-serif mb-4 text-base font-bold text-forest">
                    Why organizations choose Sonya
                  </p>
                  <ul className="grid gap-2.5">
                    {reasons.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={150}>
                <div className="rounded-2xl border border-line bg-white p-6">
                  <p className="text-sm font-semibold text-forest">Prefer email?</p>
                  <p className="mt-1 text-sm text-muted">
                    Send your inquiry to{" "}
                    <a
                      href="mailto:bookings@re-self.org"
                      className="font-semibold text-forest transition-colors hover:text-forest-light"
                    >
                      bookings@re-self.org
                    </a>
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <FadeIn direction="up" delay={80}>
              <BookingForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
