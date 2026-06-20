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
    "Workshops, retreats, custom programs, virtual self-care sessions, and journals — Re-Self provides practical, lasting tools for balance, resilience, and well-being.",
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
    bg: "#c9b89a",
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
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
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
    image: "/executive-cutout.png",
    bg: "#5a7a6d",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    body: "We start with a focused conversation to understand your team, goals, culture, and the specific challenges you want to address.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Custom Design",
    body: "Content is designed specifically for your audience — not adapted from a template. Sonya builds each engagement from the ground up.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Delivery & Impact",
    body: "Premium delivery with full presence. Every session includes clear takeaways, practical tools, and follow-up resources.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
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
        {/* Cross markers */}
        <span aria-hidden="true" className="pointer-events-none absolute right-[12%] top-24 select-none text-xl text-forest/[0.08]">+</span>
        <span aria-hidden="true" className="pointer-events-none absolute left-[8%] top-[45%] select-none text-lg text-sage/[0.12]">+</span>
        <span aria-hidden="true" className="pointer-events-none absolute right-[20%] bottom-32 select-none text-xl text-forest/[0.06]">+</span>
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

      {/* Ideal For */}
      <section className="relative overflow-hidden bg-ambient-beige py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full bg-sage/[0.07] blur-3xl" aria-hidden="true" />
        {/* Ring outline */}
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full border border-sage/15 lg:h-48 lg:w-48" />
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mb-14">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
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

          <FadeIn direction="up" delay={120}>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              {audiences.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 border-b border-[#1e3d38]/10 pb-4 text-sm font-medium text-[#1e3d38]"
                >
                  <span className="mt-2 h-px w-3.5 shrink-0 bg-[#1e3d38]/40" aria-hidden="true" />
                  <div>
                    <span className="font-semibold leading-relaxed">{item.title}</span>
                    <p className="mt-1 text-xs font-normal text-[#1e3d38]/60">{item.body}</p>
                  </div>
                </li>
              ))}
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
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">Process</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">What to expect</h2>
              <div aria-hidden="true" className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-gold" />
            </div>
          </FadeIn>

          <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {/* Dashed timeline connector */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l-2 border-dashed border-forest/[0.08] md:block" />
            {processSteps.map(({ step, title, body, icon }, i) => (
              <FadeIn key={step} direction="up" delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md p-8 shadow-[0_4px_20px_rgba(47,79,79,0.05)] ring-1 ring-forest/[0.04] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(47,79,79,0.08)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest/15">
                    {icon}
                  </div>
                  <span className="mb-3 block font-mono text-[10px] tracking-widest text-forest/40">Step {step}</span>
                  <h3 className="mb-3 text-lg font-semibold text-forest">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
