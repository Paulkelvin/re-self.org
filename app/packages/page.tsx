import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PackageCard } from "@/components/PackageCard";
import { BrandOrbit } from "@/components/BrandOrbit";
import { getPackages } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Choose the right wellness program for your organization. Transparent pricing, premium delivery, and measurable impact.",
};

const stats = [
  { value: "200+", label: "Sessions Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Organizations Served" },
  { value: "21+", label: "Years of Experience" },
];

const guarantees = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Satisfaction Guaranteed",
    body: "If the session doesn't meet your expectations, we'll work with you to make it right — no questions asked.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "Secure Payment",
    body: "All transactions are processed securely through Square — your payment details are never stored on our servers.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Flexible Scheduling",
    body: "Book at a time that works for your team. Sonya accommodates different time zones and organizational calendars.",
  },
];

const faqItems = [
  {
    question: "What happens after I purchase a package?",
    answer:
      "You'll receive a confirmation email within minutes. Sonya or her team will reach out within 24 hours to schedule your discovery call and begin designing your custom engagement.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Absolutely. If you start with a foundational package and decide you need more depth, the difference can be applied toward an upgrade at any time.",
  },
  {
    question: "Are packages refundable?",
    answer:
      "We offer a full refund if you cancel at least 14 days before your scheduled session. Within 14 days, we'll reschedule at no extra cost. After delivery, our satisfaction guarantee applies.",
  },
  {
    question: "Do you offer custom or enterprise pricing?",
    answer:
      "Yes. For organizations with unique needs, multi-session engagements, or large teams, reach out directly and Sonya will design a custom proposal.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards, Apple Pay, Google Pay, and Cash App Pay through our secure Square checkout.",
  },
];

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#16322c] px-6 py-24 text-white lg:px-16 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1c18] via-[#16322c] to-[#1e3d38]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,181,162,0.15),transparent_70%)]" />
        </div>

        <BrandOrbit className="pointer-events-none absolute -right-28 -top-28 h-[32rem] w-[32rem] text-sage/10" />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-2 select-none font-serif text-[9rem] font-bold leading-none text-white/[0.04] lg:text-[14rem]"
        >
          Programs
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <FadeIn direction="up">
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-sage">
              <span className="h-px w-8 bg-sage/60" />
              Investment
            </p>
            <h1 className="font-serif max-w-3xl text-3xl font-normal leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-5xl lg:text-6xl">
              Invest in your team&apos;s
              <br className="hidden sm:block" />
              wellbeing and performance.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Transparent pricing. Premium delivery. Measurable impact.
              Choose the engagement level that fits your goals.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-b border-line bg-warm-white py-10">
        <div className="mx-auto max-w-[1200px] px-6">
          <FadeIn direction="up">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-3xl font-bold text-forest lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-warm-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">
                Programs
              </p>
              <h2 className="font-serif text-3xl font-bold text-forest lg:text-5xl">
                Find the right fit for your organization.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Every package includes a discovery call, custom-designed
                content, and follow-up resources. No templates — ever.
              </p>
            </div>
          </FadeIn>

          {packages.length > 0 ? (
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-2 sm:grid-cols-2 lg:grid-cols-4">
              {packages.map((pkg, i) => (
                <FadeIn key={pkg.title} direction="up" delay={i * 100}>
                  <PackageCard pkg={pkg} index={i} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn direction="up">
              <div className="mx-auto max-w-lg rounded-2xl border border-line bg-white p-12 text-center shadow-sm">
                <p className="font-serif text-xl font-semibold text-forest">
                  Packages coming soon
                </p>
                <p className="mt-2 text-sm text-muted">
                  We&apos;re finalizing our offerings. In the meantime, reach
                  out directly to discuss your needs.
                </p>
                <Link
                  href="/book-sonya"
                  className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-forest-light"
                >
                  Book a Discovery Call
                </Link>
              </div>
            </FadeIn>
          )}

          {/* Custom / Enterprise callout */}
          <FadeIn direction="up" delay={400}>
            <div className="mx-auto mt-12 max-w-2xl text-center">
              <p className="text-sm text-muted">
                Need something custom?{" "}
                <Link
                  href="/book-sonya"
                  className="font-semibold text-forest underline underline-offset-4 decoration-forest/30 transition-colors hover:decoration-forest"
                >
                  Let&apos;s design a bespoke engagement
                </Link>{" "}
                tailored to your organization.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust / Guarantees */}
      <section className="bg-[#eae6df] py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1e3d38]/60">
                Why Choose Re-Self
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#1e3d38] lg:text-4xl">
                Your investment is protected.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {guarantees.map((g, i) => (
              <FadeIn key={g.title} direction="up" delay={i * 100}>
                <div className="rounded-2xl border border-[#1e3d38]/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                    {g.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e3d38]">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1e3d38]/70">
                    {g.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-warm-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn direction="up" className="lg:col-span-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">
                FAQ
              </p>
              <h2 className="font-serif text-3xl font-bold text-forest lg:text-4xl">
                Common questions
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Everything you need to know about working with Sonya and
                investing in your team&apos;s wellness.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={120} className="lg:col-span-8">
              <FaqAccordion items={faqItems} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-forest py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <FadeIn direction="up">
              <h2 className="font-serif text-3xl font-bold text-white lg:text-4xl">
                Ready to invest in your team?
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/55">
                Choose a package above, or reach out for a custom proposal
                tailored to your organization&apos;s needs.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <Link
                href="/book-sonya"
                className="inline-flex shrink-0 min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-forest shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98]"
              >
                Book a Call &rarr;
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
