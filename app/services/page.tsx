import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Corporate wellness workshops, programs, retreat facilitation, and keynote speaking tailored for organizations, government agencies, and educational institutions.",
};

const process = [
  {
    step: "01",
    title: "Discovery Call",
    body: "We start with a focused conversation to understand your team, goals, culture, and the specific challenges you want to address.",
  },
  {
    step: "02",
    title: "Custom Design",
    body: "Content is designed specifically for your audience — not adapted from a template. Sonya builds each engagement from the ground up.",
  },
  {
    step: "03",
    title: "Delivery & Impact",
    body: "Premium delivery with full presence. Every session includes clear takeaways, practical tools, and follow-up resources.",
  },
];

const audiences = [
  "HR and People teams planning wellbeing weeks",
  "Leaders managing burnout on high-performing teams",
  "Federal agencies investing in workforce wellness",
  "Educational institutions supporting faculty and staff",
  "Organizations building a long-term wellness culture",
  "Executive teams navigating change and high pressure",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sage">Services</p>
          <h1 className="font-serif max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Premium wellness support for{" "}
            <span className="italic text-sage">healthier workplace performance.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Choose a focused workshop, a broader wellness program, or a facilitated retreat
            built around your team&apos;s real pressures.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-8">
            {services.map((service, i) => (
              <FadeIn key={service.title} direction="up" delay={i * 80}>
                <article className={`grid gap-0 overflow-hidden rounded-2xl border border-line bg-white shadow-sm lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative min-h-[280px] lg:min-h-[360px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-forest/10" />
                  </div>
                  <div className="flex flex-col justify-center p-10 lg:p-12">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">
                      Service 0{i + 1}
                    </p>
                    <h2 className="font-serif text-3xl font-bold text-forest">{service.title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">{service.body}</p>
                    <Link
                      href="/book-sonya"
                      className="mt-7 inline-flex min-h-[48px] w-fit items-center justify-center rounded-lg bg-forest px-7 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-forest-light hover:shadow-lg"
                    >
                      Inquire About This Service
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-beige py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <FadeIn direction="up">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Ideal For</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                Who Sonya serves best
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Sonya&apos;s engagements are most impactful for organizations where
                leadership drives culture — and where investment in people is treated as
                a strategic priority, not a perk.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={120}>
              <ul className="grid gap-3">
                {audiences.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-white px-5 py-4 shadow-sm">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Process</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">What to expect</h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {process.map(({ step, title, body }, i) => (
              <FadeIn key={step} direction="up" delay={i * 100}>
                <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
                  <p className="font-serif mb-4 text-4xl font-bold text-line">{step}</p>
                  <h3 className="font-serif mb-3 text-lg font-bold text-forest">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-24">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <FadeIn direction="up">
              <h2 className="font-serif text-3xl font-bold text-white lg:text-4xl">
                Need a custom corporate wellness program?
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/55">
                Share your goals, team size, timeline, and budget. Sonya will recommend
                the right format and scope.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <Link
                href="/book-sonya"
                className="inline-flex shrink-0 min-h-[52px] items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-forest shadow-xl transition-all hover:-translate-y-px hover:shadow-2xl"
              >
                Start Inquiry &rarr;
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
