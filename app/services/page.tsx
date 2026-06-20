import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { BrandOrbit } from "@/components/BrandOrbit";
import { getServices } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Corporate wellness workshops, programs, retreat facilitation, and keynote speaking tailored for organizations, government agencies, and educational institutions.",
};

const audiences: {
  title: string;
  body: string;
  variant: "image" | "plain" | "person";
  image?: string;
  bg?: string;
}[] = [
  {
    title: "HR & People Teams",
    body: "Wellbeing weeks, culture initiatives, and employee wellness campaigns that go beyond box-checking.",
    variant: "image",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "High-Performance Leaders",
    body: "Managing burnout on ambitious teams where pressure never lets up and resilience isn't optional.",
    variant: "plain",
    bg: "#e8e2d8",
  },
  {
    title: "Federal Agencies",
    body: "Evidence-based programs built for the scale and rigor government workforce wellness demands.",
    variant: "plain",
    bg: "#c5cec0",
  },
  {
    title: "Educational Institutions",
    body: "Sustainable wellness practices for faculty and staff that prevent attrition and restore purpose.",
    variant: "image",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Wellness-First Organizations",
    body: "Long-term cultures of care where wellbeing is woven into leadership, operations, and daily rhythms.",
    variant: "image",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Executive Teams",
    body: "Emotional and strategic support to lead well through change, transition, and high-stakes demands.",
    variant: "person",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bg: "#5a7a6d",
  },
];

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
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[62vh] flex-col justify-center overflow-hidden bg-[#16322c] px-6 py-24 text-white lg:min-h-[68vh] lg:px-16">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1c18]/95 via-[#0c1c18]/78 to-[#16322c]/35" />
          <div className="absolute inset-0 bg-[#0c1c18]/25" />
        </div>

        <BrandOrbit className="pointer-events-none absolute -right-28 -top-28 h-[32rem] w-[32rem] text-sage/15" />
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
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          {/* Section intro */}
          <FadeIn direction="up">
            <div className="mb-4 flex flex-col gap-4 border-b border-neutral-200/70 pb-10 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif max-w-md text-3xl font-bold text-forest lg:text-4xl">
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

                    <h3 className="font-serif relative text-3xl font-bold text-forest lg:text-4xl">
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
                        className="group/btn inline-flex w-fit items-center gap-2 rounded-full bg-[#1e3d38] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#152b27]"
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

      {/* Ideal For — Split-Screen Sticky Imagery */}
      <section className="relative overflow-hidden bg-ambient-beige py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full bg-sage/[0.07] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mb-14">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-forest/60">
                Ideal For
              </p>
              <h2 className="font-serif text-4xl font-bold text-[#1e3d38] lg:text-5xl">
                Who Sonya serves best
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#1e3d38]/70">
                Sonya&apos;s engagements are most impactful for organizations where
                leadership drives culture — and where investment in people is treated as
                a strategic priority, not a perk.
              </p>
            </div>
          </FadeIn>

          {/* Row 1 — image (wide) | plain (narrow) */}
          <FadeIn direction="up">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr]">
              {/* Image card */}
              <div className="group relative min-h-[260px] overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:min-h-[320px]">
                <Image
                  src={audiences[0].image!}
                  alt={audiences[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <h3 className="font-serif text-xl font-bold text-white">{audiences[0].title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">{audiences[0].body}</p>
                </div>
              </div>
              {/* Plain card */}
              <div
                className="group flex min-h-[260px] flex-col justify-end rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:min-h-[320px] lg:p-8"
                style={{ backgroundColor: audiences[1].bg }}
              >
                <h3 className="font-serif text-xl font-bold text-forest">{audiences[1].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest/70">{audiences[1].body}</p>
              </div>
            </div>
          </FadeIn>

          {/* Row 2 — plain (narrow) | image (wide) */}
          <FadeIn direction="up" delay={100}>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1.4fr]">
              {/* Plain card */}
              <div
                className="group flex min-h-[260px] flex-col justify-end rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:min-h-[320px] lg:p-8"
                style={{ backgroundColor: audiences[2].bg }}
              >
                <h3 className="font-serif text-xl font-bold text-forest">{audiences[2].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest/70">{audiences[2].body}</p>
              </div>
              {/* Image card */}
              <div className="group relative min-h-[260px] overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:min-h-[320px]">
                <Image
                  src={audiences[3].image!}
                  alt={audiences[3].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <h3 className="font-serif text-xl font-bold text-white">{audiences[3].title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">{audiences[3].body}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Row 3 — image (wide) | person cutout (narrow) */}
          <FadeIn direction="up" delay={200}>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr]">
              {/* Image card */}
              <div className="group relative min-h-[260px] overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:min-h-[320px]">
                <Image
                  src={audiences[4].image!}
                  alt={audiences[4].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <h3 className="font-serif text-xl font-bold text-white">{audiences[4].title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">{audiences[4].body}</p>
                </div>
              </div>
              {/* Person cutout card */}
              <div
                className="group relative flex min-h-[260px] overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:min-h-[320px]"
                style={{ backgroundColor: audiences[5].bg }}
              >
                <div className="relative z-10 flex flex-col justify-end p-6 lg:max-w-[55%] lg:p-8">
                  <h3 className="font-serif text-xl font-bold text-white">{audiences[5].title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{audiences[5].body}</p>
                </div>
                <div className="absolute bottom-0 right-0 h-full w-1/2 lg:w-[55%]">
                  <Image
                    src={audiences[5].image!}
                    alt={audiences[5].title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain object-right-bottom mix-blend-multiply"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-ambient-warm py-24 lg:py-32">
        <div className="pointer-events-none absolute -right-32 -top-20 h-[400px] w-[400px] rounded-full bg-sage/[0.06] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-forest/60">Process</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">What to expect</h2>
            </div>
          </FadeIn>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
            {process.map(({ step, title, body }, i) => (
              <FadeIn key={step} direction="up" delay={i * 100}>
                <div className="border-t border-[#1e3d38]/15 pt-6">
                  <span className="mb-3 block font-mono text-xs tracking-widest text-[#1e3d38]/50">{step}</span>
                  <h3 className="mb-2 text-lg font-medium text-[#1e3d38]">{title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{body}</p>
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
                className="inline-flex shrink-0 min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-forest shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98]"
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
