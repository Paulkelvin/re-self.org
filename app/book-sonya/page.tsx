import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { FadeIn } from "@/components/FadeIn";
import { getProcessSteps, getBookingReasons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book Sonya",
  description:
    "Submit a booking request for Sonya Harris — keynote speaking, workshops, corporate wellness programs, and retreat facilitation.",
};

export const revalidate = 60;

export default async function BookSonyaPage() {
  const [steps, reasons] = await Promise.all([
    getProcessSteps("booking"),
    getBookingReasons(),
  ]);
  return (
    <>
      {/* Hero */}
      <section className="grain-overlay relative overflow-hidden bg-forest-deep px-6 py-16 text-white md:py-24 lg:px-16">
        {/* Botanical leaf */}
        <svg aria-hidden="true" className="pointer-events-none absolute -right-4 -top-2 h-24 w-24 rotate-[60deg] text-white/[0.04] lg:right-16 lg:top-8 lg:h-32 lg:w-32" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M50 95 C50 95 20 70 15 40 C10 10 45 5 50 5 C55 5 90 10 85 40 C80 70 50 95 50 95Z" /><path d="M50 95 C50 95 50 5 50 5" /><path d="M50 30 C50 30 35 25 25 35" /><path d="M50 50 C50 50 65 42 75 48" /><path d="M50 70 C50 70 35 62 28 68" /></svg>
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
        {/* Glass orb */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-24 left-[4%] h-14 w-14 rounded-full bg-sage/20 backdrop-blur-sm lg:h-20 lg:w-20" />
        {/* Ring outline */}
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full border border-sage/15 lg:h-36 lg:w-36" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
          {/* Info sidebar — drops below the form on mobile */}
          <div className="order-2 space-y-8 lg:order-1 lg:col-span-5">
            <FadeIn direction="up">
              <div>
                <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-forest/[0.12] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-forest">
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
                    <li key={r.label} className="flex items-start gap-2.5 text-xs text-neutral-600">
                      <span className="mt-1.5 h-px w-3 shrink-0 bg-sage" aria-hidden="true" />
                      {r.label}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 block text-xs font-light text-neutral-400">
                  Prefer direct email? Contact us at{" "}
                  <a
                    href="mailto:sharris@re-self.org"
                    className="underline-offset-2 transition-colors hover:text-forest hover:underline"
                  >
                    sharris@re-self.org
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
