import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { BrandOrbit } from "@/components/BrandOrbit";
import { topics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Speaking & Events",
  description:
    "Book Sonya Harris for wellness keynotes, leadership panels, executive sessions, and corporate events. Tailored for organizations, government agencies, and conferences.",
};

const formats = [
  {
    name: "Keynotes",
    duration: "45 – 90 min",
    description:
      "Stage presentations designed to shift mindset and deliver practical, memorable takeaways. Ideal for company-wide events, conferences, and wellbeing weeks.",
  },
  {
    name: "Panels",
    duration: "60 – 90 min",
    description:
      "Facilitated conversations where Sonya brings a grounded wellness perspective to multi-speaker discussions on leadership, culture, and organizational performance.",
  },
  {
    name: "Leadership Sessions",
    duration: "Half-day or Full-day",
    description:
      "Intimate, high-impact sessions for executive and senior teams focused on sustainable performance, stress management, and leading through change.",
  },
];

const audiences = [
  "Corporate all-hands and company-wide events",
  "Government agency training days",
  "HR and People team conferences",
  "Leadership summits and executive offsites",
  "Employee Resource Group events",
  "Educational institution faculty days",
  "Wellbeing weeks and wellness campaigns",
  "Industry conferences and panels",
];

export default function SpeakingEventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[75vh] flex flex-col justify-center overflow-hidden bg-[#23423c] px-6 py-24 text-white lg:px-16">
        {/* Decorative animated geometry */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <BrandOrbit className="absolute -right-28 -top-24 h-[34rem] w-[34rem] text-sage/15" />
          <div className="absolute bottom-10 right-24 h-40 w-40 rounded-full bg-sage/5 blur-2xl animate-float-slow" />
          <div className="absolute left-6 top-1/3 h-28 w-28 opacity-30 animate-drift [background-image:radial-gradient(var(--color-sage)_1.2px,transparent_1.2px)] [background-size:12px_12px]" />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-2 select-none font-serif text-[9rem] font-bold leading-none text-white/[0.03] lg:text-[14rem]"
        >
          Speaking
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-sage">
            Speaking &amp; Events
          </p>
          <h1 className="font-serif max-w-4xl text-3xl font-medium leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl">
            Wellness keynotes that meet ambitious teams where they are.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Sonya delivers grounded, corporate-ready talks that help audiences understand
            stress, reset patterns, and leave with practical next steps they can use immediately.
          </p>
          <div className="mt-10">
            <Link
              href="/book-sonya"
              className="inline-flex w-fit items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#1e3d38] shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a Speaking Date
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Topics */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <FadeIn direction="up">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">
                Signature Topics
              </p>
              <h2 className="font-serif text-4xl font-bold leading-tight text-forest lg:text-5xl">
                Talks that land in the room.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Each talk can be tailored for employee wellbeing weeks, leadership retreats,
                conferences, ERG events, and executive sessions.
              </p>
              <Link
                href="/book-sonya"
                className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#1e3d38] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Sonya
              </Link>
            </FadeIn>

            <FadeIn direction="up" delay={120}>
              <ul className="space-y-8">
                {topics.map((topic, i) => (
                  <li
                    key={topic.title}
                    className="group flex cursor-pointer gap-5 border-b border-line pb-8 transition-colors duration-300 last:border-0 last:pb-0 hover:border-forest/40"
                  >
                    <span className="w-7 shrink-0 pt-0.5 font-mono text-xs tracking-widest text-neutral-400">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-base font-semibold leading-snug text-charcoal transition-colors duration-300 group-hover:text-forest">
                        {topic.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{topic.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-beige py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Formats</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                Three ways to bring Sonya to your audience.
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {formats.map(({ name, duration, description }, i) => (
              <FadeIn key={name} direction="up" delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-neutral-200/50 bg-white p-8 shadow-none transition-colors duration-300 hover:border-forest/30 md:p-10">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-1 top-4 font-serif text-7xl font-bold leading-none text-sage/15 transition-colors duration-300 group-hover:text-sage/25"
                  >
                    0{i + 1}
                  </span>
                  <span className="relative mb-5 inline-block rounded-full border border-neutral-200 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                    {duration}
                  </span>
                  <h3 className="font-serif relative mb-4 text-xl font-bold text-forest">{name}</h3>
                  <p className="relative text-sm leading-relaxed text-muted">{description}</p>
                  <span className="relative mt-6 block h-px w-10 bg-forest/30 transition-all duration-300 group-hover:w-20" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Audiences</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                Where Sonya speaks
              </h2>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <div className="mx-auto mt-12 max-w-6xl border-l border-t border-line">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {audiences.map((item, i) => (
                  <div
                    key={item}
                    className="group relative flex min-h-[148px] flex-col justify-between border-b border-r border-line p-6 transition-colors duration-300 hover:bg-forest/[0.04]"
                  >
                    <span className="font-mono text-xs tracking-widest text-sage transition-colors duration-300 group-hover:text-forest">
                      0{i + 1}
                    </span>
                    <span className="mt-6 text-sm leading-relaxed text-charcoal transition-colors duration-300 group-hover:text-forest">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-24">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <FadeIn direction="up">
              <h2 className="font-serif text-3xl font-bold text-white lg:text-4xl">
                Ready to book a speaking date?
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/55">
                Share the event details, format preference, and audience size. Sonya will
                confirm availability and next steps within 2 business days.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <Link
                href="/book-sonya"
                className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#1e3d38] shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Sonya &rarr;
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
