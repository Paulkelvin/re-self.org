import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
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
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sage">
            Speaking &amp; Events
          </p>
          <h1 className="font-serif max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Wellness keynotes that meet{" "}
            <span className="italic text-sage">ambitious teams</span> where they are.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Sonya delivers grounded, corporate-ready talks that help audiences understand
            stress, reset patterns, and leave with practical next steps they can use immediately.
          </p>
          <div className="mt-8">
            <Link
              href="/book-sonya"
              className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-forest shadow-lg transition-all hover:-translate-y-px hover:shadow-xl"
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
                className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-forest px-7 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-forest-light hover:shadow-lg"
              >
                Book Sonya
              </Link>
            </FadeIn>

            <FadeIn direction="up" delay={120}>
              <ul className="divide-y divide-line">
                {topics.map((topic, i) => (
                  <li key={topic.title} className="flex gap-5 py-5 first:pt-0 last:pb-0">
                    <span className="w-7 shrink-0 pt-0.5 font-serif text-xs font-bold text-sage/60">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-base font-semibold leading-snug text-charcoal">{topic.title}</p>
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
                <div className="group h-full rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-sage">{duration}</p>
                  <h3 className="font-serif mb-4 text-xl font-bold text-forest">{name}</h3>
                  <p className="text-sm leading-relaxed text-muted">{description}</p>
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
            <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
              {audiences.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-4 shadow-sm"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                  <span className="text-sm text-charcoal">{item}</span>
                </div>
              ))}
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
                className="inline-flex shrink-0 min-h-[52px] items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-forest shadow-xl transition-all hover:-translate-y-px hover:shadow-2xl"
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
