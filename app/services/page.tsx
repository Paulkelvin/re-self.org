import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Corporate wellness workshops, seminars, wellness programs, and retreat facilitation.",
};

const details = [
  {
    label: "Who it's for",
    items: [
      "HR and People teams planning wellbeing weeks",
      "Leaders managing burnout on high-performing teams",
      "Organizations building a long-term wellness culture",
    ],
  },
  {
    label: "What to expect",
    items: [
      "Pre-engagement discovery to understand your team's needs",
      "Tailored delivery — not off-the-shelf content",
      "Clear outcomes and follow-up materials",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-pine-dark text-white">
        <div className="mx-auto max-w-[1160px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
            Services
          </p>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Premium wellness support for{" "}
            <span className="text-sage">healthier workplace performance.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Choose a focused workshop, a broader wellness program, or a facilitated
            retreat built around your team&apos;s real pressures.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <article
                key={service.title}
                className="group rounded-xl border border-line bg-white p-8 transition-all hover:-translate-y-1 hover:border-sage/30 hover:shadow-xl"
              >
                <p className="mb-5 text-5xl font-extrabold leading-none text-line transition-colors group-hover:text-sage/25">
                  0{i + 1}
                </p>
                <h3 className="mb-3 text-lg font-extrabold leading-tight text-ink">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{service.body}</p>
                <Link
                  href="/book-sonya"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-coral transition-all hover:gap-2"
                >
                  Inquire <span>&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process details */}
      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="mb-12">
            <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
              How It Works
            </p>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink lg:text-5xl">
              What to expect.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {details.map((block) => (
              <div key={block.label} className="rounded-xl border border-line bg-white p-8">
                <h3 className="mb-5 text-sm font-extrabold uppercase tracking-widest text-pine">
                  {block.label}
                </h3>
                <ul className="grid gap-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pine py-20">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
                Need a custom corporate wellness program?
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/70">
                Share your goals, team size, timeline, and budget range. Sonya
                will recommend the right format.
              </p>
            </div>
            <Link
              href="/book-sonya"
              className="inline-flex shrink-0 min-h-[52px] items-center justify-center rounded-lg bg-coral px-7 text-sm font-extrabold text-white shadow-lg shadow-coral/20 transition-all hover:-translate-y-px hover:shadow-xl"
            >
              Start Inquiry &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
