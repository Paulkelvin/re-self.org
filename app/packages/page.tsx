import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PackageCard } from "@/components/PackageCard";
import { getPackages, getStats, getGuarantees, getFaqByCategory } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Choose the right wellness program for your organization. Transparent pricing, premium delivery, and measurable impact.",
};

const guaranteeIcons = [
  <svg key="shield" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg key="lock" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
  <svg key="clock" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
];

export default async function PackagesPage() {
  const [packages, stats, guarantees, faqItems] = await Promise.all([
    getPackages(),
    getStats(),
    getGuarantees(),
    getFaqByCategory("packages"),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#0f3535] px-6 py-24 text-white lg:px-16 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1e1e] via-[#0f3535] to-[#134545]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,181,162,0.15),transparent_70%)]" />
        </div>


        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-2 select-none font-serif text-[9rem] font-bold leading-none text-white/[0.04] lg:text-[14rem]"
        >
          Programs
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <FadeIn direction="up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-sage/[0.10] border border-white/15 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">
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
      <section className="border-b border-line bg-ambient-warm py-10">
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
      <section className="relative overflow-hidden bg-ambient-warm py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-sage/[0.07] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mb-16 text-center">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
                Programs
              </p>
              <h2 className="font-serif text-3xl font-bold text-forest lg:text-5xl">
                Find the right fit for your organization.
              </h2>
              <div aria-hidden="true" className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-gold" />
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
      <section className="relative overflow-hidden bg-ambient-beige py-20 lg:py-28">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-sage/[0.07] blur-3xl" aria-hidden="true" />
        {/* Dot grid texture */}
        <div aria-hidden="true" className="dot-grid pointer-events-none absolute left-0 top-0 h-[50%] w-[35%] opacity-50" />
        {/* Botanical branch */}
        <svg aria-hidden="true" className="pointer-events-none absolute -right-4 top-16 h-28 w-28 rotate-[25deg] text-sage/[0.10] lg:right-8 lg:h-36 lg:w-36" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 90 C30 70 40 50 50 30 C55 20 60 10 70 8" /><path d="M35 65 C28 60 22 52 18 45" /><path d="M42 50 C50 48 58 42 62 35" /><path d="M48 38 C42 32 38 25 36 18" /><path d="M55 25 C60 22 68 18 74 15" /></svg>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
                Why Choose Re-Self
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#134545] lg:text-4xl">
                Your investment is protected.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {guarantees.map((g, i) => (
              <FadeIn key={g.title} direction="up" delay={i * 100}>
                <div className="rounded-2xl border border-[#134545]/10 bg-white p-8 shadow-md shadow-forest/[0.06] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-forest/[0.10]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                    {guaranteeIcons[i % guaranteeIcons.length]}
                  </div>
                  <h3 className="text-lg font-semibold text-[#134545]">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#134545]/70">
                    {g.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={300}>
            <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-forest/10 bg-white/60 p-8 text-center shadow-sm lg:p-10">
              <p className="text-sm leading-relaxed text-[#134545]/80">
                Organizations like the University of California and Phenomenal Women Empowerment
                Organization have trusted Re-Self to empower their teams. Clients consistently invite Sonya back for her authenticity, impact, and lasting results.
              </p>
              <p className="mt-4 text-sm text-[#134545]/70">
                For more information or to book a free discovery call{" "}
                <a href="tel:+12409887490" className="font-semibold text-forest hover:underline">240-988-7490</a>
                {" "}or{" "}
                <Link href="/" className="font-semibold text-forest hover:underline">www.re-self.org</Link>
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-forest/10 bg-forest/[0.03] p-8 lg:p-10">
              <h3 className="font-serif text-lg font-semibold text-[#134545]">About Re-Self</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#134545]/70">
                Founded by Sonya Harris, M.Ed., a retired USAF veteran, HR professional, and self-care advocate, Re-Self is a thoughtfully developed wellness curriculum that helps individuals and organizations rediscover their inner strength. With workshops delivered across the U.S. and internationally, Re-Self provides practical, lasting tools for balance, resilience, and well-being.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-ambient-warm py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-32 top-20 h-[400px] w-[400px] rounded-full bg-sage/[0.06] blur-3xl" aria-hidden="true" />
        {/* Glass orb */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-6 top-1/3 h-14 w-14 rounded-full bg-sage/20 backdrop-blur-sm lg:left-4 lg:h-20 lg:w-20" />
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn direction="up" className="lg:col-span-4">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
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

    </>
  );
}
