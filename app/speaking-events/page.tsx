import type { Metadata } from "next";
import Link from "next/link";
import { topics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Speaking & Events",
  description: "Book Sonya for wellness keynotes, panels, leadership sessions, and corporate events.",
};

const formats = [
  {
    name: "Keynotes",
    description:
      "45–90 minute stage presentations designed to shift mindset and deliver practical takeaways. Ideal for company-wide events, conferences, and wellbeing weeks.",
  },
  {
    name: "Panels",
    description:
      "Facilitated conversations where Sonya brings a grounded wellness perspective to multi-speaker discussions on leadership, culture, and performance.",
  },
  {
    name: "Leadership Sessions",
    description:
      "Intimate, high-impact sessions for executive and senior teams focused on sustainable performance, stress management, and leading through change.",
  },
];

export default function SpeakingEventsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-pine-dark text-white">
        <div className="mx-auto max-w-[1160px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
            Speaking &amp; Events
          </p>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Wellness keynotes that meet{" "}
            <span className="text-sage">ambitious teams</span> where they are.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Sonya delivers grounded, corporate-friendly talks that help audiences
            understand stress, reset patterns, and leave with practical next steps.
          </p>
          <div className="mt-8">
            <Link
              href="/book-sonya"
              className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-coral px-7 text-sm font-extrabold text-white shadow-lg shadow-coral/20 transition-all hover:-translate-y-px hover:shadow-xl hover:shadow-coral/30"
            >
              Book a Speaking Date
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Topics */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div className="lg:pt-3">
              <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
                Signature Topics
              </p>
              <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink lg:text-5xl">
                Talks that land in the room.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Each talk can be tailored for employee wellbeing weeks, leadership
                retreats, conferences, ERG events, and executive sessions.
              </p>
            </div>

            <ul className="grid gap-0">
              {topics.map((topic, i) => (
                <li key={topic} className="flex gap-5 border-b border-line py-5 last:border-0">
                  <span className="w-6 shrink-0 pt-0.5 text-xs font-extrabold text-coral/50">
                    0{i + 1}
                  </span>
                  <span className="text-base font-medium leading-snug text-ink">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="mb-12">
            <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
              Formats
            </p>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink lg:text-5xl">
              Three ways to bring
              <br />
              Sonya to your audience.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map((format, i) => (
              <article
                key={format.name}
                className="group rounded-xl border border-line bg-white p-8 transition-all hover:-translate-y-1 hover:border-sage/30 hover:shadow-xl"
              >
                <p className="mb-5 text-5xl font-extrabold leading-none text-line transition-colors group-hover:text-sage/25">
                  0{i + 1}
                </p>
                <h3 className="mb-3 text-lg font-extrabold text-ink">{format.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{format.description}</p>
              </article>
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
                Ready to book a speaking date?
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/70">
                Share the event details, format preference, and audience size.
                Sonya will confirm availability and next steps.
              </p>
            </div>
            <Link
              href="/book-sonya"
              className="inline-flex shrink-0 min-h-[52px] items-center justify-center rounded-lg bg-coral px-7 text-sm font-extrabold text-white shadow-lg shadow-coral/20 transition-all hover:-translate-y-px hover:shadow-xl"
            >
              Book Sonya &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
