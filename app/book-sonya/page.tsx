import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book Sonya",
  description:
    "Submit a booking request for Sonya's speaking, workshops, seminars, retreats, and corporate wellness programs.",
};

const steps = [
  {
    step: "01",
    title: "Submit your request",
    body: "Fill in the form with your event details, audience, goals, and budget range.",
  },
  {
    step: "02",
    title: "Review & fit check",
    body: "Sonya reviews the request for fit, format, timing, and scope — usually within 2 business days.",
  },
  {
    step: "03",
    title: "Follow-up & discovery",
    body: "Sonya follows up with availability and next steps. A short discovery call may be scheduled for workshops and programs.",
  },
];

export default function BookSonyaPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-pine-dark text-white">
        <div className="mx-auto max-w-[1160px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
            Book Sonya
          </p>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-6xl">
            Request availability for your next event{" "}
            <span className="text-sage">or wellness initiative.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65">
            Complete the booking form with as much detail as possible. You will
            receive a confirmation email after submission.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            {/* Process steps */}
            <div>
              <p className="mb-8 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
                What happens next
              </p>
              <div className="grid gap-6">
                {steps.map(({ step, title, body }) => (
                  <div key={step} className="flex gap-5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine text-sm font-extrabold text-white">
                      {step}
                    </span>
                    <div>
                      <p className="font-extrabold text-ink">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl border border-line bg-white p-6">
                <p className="text-sm font-extrabold text-pine">Prefer email?</p>
                <p className="mt-1 text-sm text-muted">
                  Send your inquiry directly to{" "}
                  <a
                    href="mailto:bookings@re-self.org"
                    className="font-bold text-coral transition-colors hover:text-coral/75"
                  >
                    bookings@re-self.org
                  </a>
                </p>
              </div>
            </div>

            {/* Booking form */}
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
