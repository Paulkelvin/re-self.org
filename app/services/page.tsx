import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { getServices, getServiceAudiences, getProcessSteps } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Workshops, retreats, custom programs, virtual self-care sessions, and journals — Re-Self provides practical, lasting tools for balance, resilience, and well-being.",
};

const stepIcons = [
  <svg key="phone" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  <svg key="pen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  <svg key="pulse" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
];

// Local editorial enrichment for each service (keyed by title) — adds
// substance and rhythm to the showcase without touching shared content.
const serviceMeta: Record<
  string,
  { format: string; deliverables: string[]; bestFor: string[] }
> = {
  "Workshops & Seminars": {
    format: "Half-day · Full-day · Series",
    deliverables: [
      "Live interactive facilitation",
      "Custom resilience toolkit",
      "Take-home practice resources",
    ],
    bestFor: ["Teams", "Departments", "Wellbeing weeks"],
  },
  "Corporate Wellness Programs": {
    format: "6 – 12 week engagements",
    deliverables: [
      "Culture & burnout assessment",
      "Multi-session program design",
      "Measurable outcome reporting",
    ],
    bestFor: ["HR & People teams", "Federal agencies", "Enterprises"],
  },
  "Retreat Facilitation": {
    format: "Half-day to multi-day",
    deliverables: [
      "Immersive retreat design",
      "Leadership & reflection tracks",
      "Renewal & integration plan",
    ],
    bestFor: ["Executive teams", "Leadership offsites", "High-performing groups"],
  },
  "Virtual Self-Care Sessions": {
    format: "60 – 90 min online sessions",
    deliverables: [
      "Live virtual facilitation",
      "Guided self-care practices",
      "Private one-on-one options",
    ],
    bestFor: ["Remote teams", "Busy organizations", "Individual professionals"],
  },
  "Journals & Tools": {
    format: "Self-paced resources",
    deliverables: [
      "Re-Self workbook",
      "Guided journals",
      "Practical wellness materials",
    ],
    bestFor: ["Individuals", "Teams", "Workshop participants"],
  },
};

export default async function ServicesPage() {
  const [services, audiences, processSteps] = await Promise.all([
    getServices(),
    getServiceAudiences(),
    getProcessSteps("services"),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[62vh] flex-col justify-center overflow-hidden bg-forest-deep px-6 py-24 text-white lg:min-h-[68vh] lg:px-16">
        {/* Full-bleed background image + contrast overlays */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Left-weighted gradient keeps the headline on a dark field for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/78 to-forest-deep/35" />
          <div className="absolute inset-0 bg-forest-deep/25" />
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-2 select-none font-serif text-[9rem] font-bold leading-none text-white/[0.06] lg:text-[14rem]"
        >
          Services
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-sage/[0.10] border border-white/15 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">
            Services
          </p>
          <h1 className="font-serif max-w-4xl text-3xl font-normal leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-5xl lg:text-6xl">
            Premium wellness support for healthier workplace performance.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Choose a focused workshop, a broader wellness program, or a facilitated retreat
            built around your team&apos;s real pressures.
          </p>
        </div>
      </section>

      {/* Service showcase — editorial, alternating */}
      <section className="relative overflow-hidden bg-ambient-warm py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-sage/[0.06] blur-3xl" aria-hidden="true" />
        {/* Cross markers */}
        <span aria-hidden="true" className="pointer-events-none absolute right-[12%] top-24 select-none text-xl text-forest/[0.08]">+</span>
        <span aria-hidden="true" className="pointer-events-none absolute left-[8%] top-[45%] select-none text-lg text-sage/[0.12]">+</span>
        <span aria-hidden="true" className="pointer-events-none absolute right-[20%] bottom-32 select-none text-xl text-forest/[0.06]">+</span>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          {/* Section intro */}
          <FadeIn direction="up">
            <div className="mb-4 flex flex-col gap-4 border-b border-neutral-200/70 pb-10 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif max-w-md text-3xl font-bold text-charcoal lg:text-4xl">
                Three ways to work together.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Every engagement is built from the ground up — never templated — around your
                team&apos;s real pressures and goals.
              </p>
            </div>
          </FadeIn>

          {services.map((service, i) => {
            const flip = i % 2 === 1;
            const meta = serviceMeta[service.title];
            return (
              <FadeIn key={service.title} direction="up" delay={i * 80}>
                <article
                  className={`group grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-20 ${
                    i === services.length - 1 ? "" : "border-b border-neutral-200/60"
                  }`}
                >
                  {/* Image — arched portal with offset outline + hover zoom */}
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                    <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                      {/* Offset outline line tracing the arch */}
                      <div
                        aria-hidden="true"
                        className={`absolute -top-3 bottom-3 rounded-[999px_999px_1.25rem_1.25rem] border-2 border-sage/30 ${
                          flip ? "-left-3 right-3" : "-right-3 left-3"
                        }`}
                      />
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_1.25rem_1.25rem] shadow-2xl shadow-forest/20">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`relative lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                    {/* Ghost numeral watermark */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-16 right-0 select-none font-serif text-[7rem] font-bold leading-none text-forest/[0.05] lg:text-[9rem]"
                    >
                      0{i + 1}
                    </span>

                    <span className="relative mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      <span className="h-px w-6 bg-sage" />
                      {meta?.format ?? `Service 0${i + 1}`}
                    </span>

                    <h3 className="font-serif relative text-3xl font-bold text-charcoal lg:text-4xl">
                      {service.title}
                    </h3>
                    <p className="relative mt-4 max-w-xl text-base leading-relaxed text-muted">
                      {service.body}
                    </p>

                    {/* Deliverables */}
                    {meta && (
                      <ul className="relative mt-7 grid gap-y-3 sm:grid-cols-2">
                        {meta.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-charcoal">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-1 shrink-0 text-forest/60"><polyline points="20 6 9 17 4 12" /></svg>
                            <span className="leading-snug">{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Best-for chips + CTA */}
                    <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                      <Link
                        href="/book-sonya"
                        className="group/btn inline-flex w-fit items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-forest-deep"
                      >
                        Inquire
                        <svg
                          width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        >
                          <path d="M2 7h10M8 3l4 4-4 4" />
                        </svg>
                      </Link>
                      {meta && (
                        <div className="flex flex-wrap gap-2">
                          {meta.bestFor.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-forest/[0.05] px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-forest/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Ideal For */}
      <section className="relative overflow-hidden bg-ambient-beige py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full bg-sage/[0.07] blur-3xl" aria-hidden="true" />
        {/* Ring outline */}
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full border border-sage/15 lg:h-48 lg:w-48" />
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mb-14">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/[0.18] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-amber">
                Ideal For
              </p>
              <h2 className="font-serif text-4xl font-bold text-charcoal lg:text-5xl">
                Who Sonya serves best
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-forest/70">
                Sonya&apos;s engagements are most impactful for organizations where
                leadership drives culture — and where investment in people is treated as
                a strategic priority, not a perk.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={120}>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              {audiences.map((item, i) => {
                const audienceIcons = [
                  <svg key="users" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
                  <svg key="zap" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
                  <svg key="building" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" /></svg>,
                  <svg key="book" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>,
                  <svg key="heart" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
                  <svg key="target" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
                ];
                return (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 border-b border-forest-light/10 pb-4 text-sm font-medium text-forest"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest/[0.08] text-forest">
                      {audienceIcons[i % audienceIcons.length]}
                    </div>
                    <div>
                      <span className="font-semibold leading-relaxed">{item.title}</span>
                      <p className="mt-1 text-xs font-normal text-forest/60">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-ambient-warm py-24 lg:py-32">
        <div className="pointer-events-none absolute -right-32 -top-20 h-[400px] w-[400px] rounded-full bg-sage/[0.06] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-charcoal/[0.12] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-charcoal">Process</p>
              <h2 className="font-serif text-4xl font-bold text-charcoal lg:text-5xl">What to expect</h2>
              <div aria-hidden="true" className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-gold" />
            </div>
          </FadeIn>

          <div className="relative mx-auto mt-16 max-w-6xl">
            {/* Connected horizontal line behind cards (desktop only) */}
            <div aria-hidden="true" className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[60px] hidden h-[2px] bg-gradient-to-r from-forest/5 via-forest/15 to-forest/5 md:block" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0">
              {processSteps.map(({ step, title, body }, i) => {
                const icon = stepIcons[i % stepIcons.length];
                return (
                <FadeIn key={step} direction="up" delay={i * 100}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Step circle on the connector line */}
                    <div className="relative z-10 mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-forest/20 bg-white shadow-md shadow-forest/10 transition-all duration-300 hover:border-forest/40 hover:shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest">
                        {icon}
                      </div>
                    </div>

                    {/* Arrow connector between cards (desktop only) */}
                    {i < processSteps.length - 1 && (
                      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[34px] z-20 hidden -translate-y-1/2 translate-x-1/2 md:block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-forest/30">
                          <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}

                    {/* Card content */}
                    <div className="group rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-forest/[0.06] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-forest/[0.12] md:mx-4">
                      <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">{step}</span>
                      <h3 className="mb-2 text-lg font-semibold text-charcoal">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted">{body}</p>
                    </div>
                  </div>
                </FadeIn>
              );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
