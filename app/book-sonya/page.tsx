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
    body: "Sonya follows up with availability and next steps. A short discovery call may be scheduled.",
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
      <section className="bg-[#23423c] px-6 py-16 text-white md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-sage/[0.10] border border-white/15 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">Book Sonya</p>
          <h1 className="font-serif max-w-3xl text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Request availability for your next event or wellness initiative.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
            Complete the booking form with as much detail as possible. You will receive a
            confirmation email after submission.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative overflow-hidden bg-ambient-warm">
        <div className="pointer-events-none absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-sage/[0.06] blur-3xl" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
          {/* Info sidebar — drops below the form on mobile */}
          <div className="order-2 space-y-8 lg:order-1 lg:col-span-5">
            <FadeIn direction="up">
              <div>
                <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-forest/60">
                  What happens next
                </p>
                <div className="flex flex-col gap-6 sm:flex-row lg:flex-col">
                  {steps.map(({ step, title, body }) => (
                    <div key={step} className="flex gap-3 sm:flex-1 lg:flex-none">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 font-mono text-xs text-white">
                        {step}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{title}</p>
                        <p className="mt-1 max-w-xs text-xs leading-relaxed text-neutral-500">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <div className="rounded-xl border border-neutral-200/30 bg-neutral-100/50 p-6 shadow-md shadow-forest/[0.05]">
                <p className="font-serif mb-4 text-base font-bold text-forest">
                  Why organizations choose Sonya
                </p>
                <ul className="space-y-3">
                  {reasons.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-xs text-neutral-600">
                      <span className="mt-1.5 h-px w-3 shrink-0 bg-sage" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 block text-xs font-light text-neutral-400">
                  Prefer direct email? Contact us at{" "}
                  <a
                    href="mailto:bookings@re-self.org"
                    className="underline-offset-2 transition-colors hover:text-forest hover:underline"
                  >
                    bookings@re-self.org
                  </a>
                  .
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Booking form — renders first on mobile (the form provides its own card) */}
          <FadeIn direction="up" delay={80} className="order-1 lg:order-2 lg:col-span-7">
            <BookingForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
