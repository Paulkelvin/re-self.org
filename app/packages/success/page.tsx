import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Payment Confirmed",
  description: "Your payment has been received. Welcome to Re-Self.",
};

export default function SuccessPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-warm-white px-6 py-24 text-center">
      <FadeIn direction="up">
        <div className="mx-auto max-w-lg">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-forest/10">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-forest"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <h1 className="font-serif text-3xl font-bold text-charcoal lg:text-4xl">
            Payment confirmed!
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Thank you for investing in your team&apos;s wellbeing. You&apos;ll
            receive a confirmation email shortly. Sonya or her team will reach
            out within 24 hours to schedule your discovery call.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-forest px-8 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-lg active:scale-[0.98]"
            >
              Back to Home
            </Link>
            <Link
              href="/book-sonya"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-forest/20 px-8 text-sm font-semibold text-forest transition-all hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-sm active:scale-[0.98]"
            >
              Schedule Now
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
