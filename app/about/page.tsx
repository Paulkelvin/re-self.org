import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { achievements } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Sonya Harris",
  description:
    "Learn about Sonya Harris — corporate wellness consultant, keynote speaker, Air Force veteran, and federal government leader with 21+ years of service.",
};

const timeline = [
  {
    period: "2001 – 2022",
    title: "U.S. Air Force Service",
    description:
      "21 years of distinguished service across domestic and international assignments, leading teams through high-pressure environments, complex organizational change, and mission-critical demands.",
  },
  {
    period: "2012 – 2022",
    title: "Federal Government Leadership",
    description:
      "Concurrently served in federal government roles, developing and implementing leadership development and wellness initiatives for federal workforce organizations.",
  },
  {
    period: "2020 – Present",
    title: "Re-Self Wellness",
    description:
      "Launched Re-Self Wellness to bring military-grade resilience, evidence-based wellness, and human-centered leadership development to corporations, agencies, and institutions nationwide.",
  },
];

const values = [
  {
    title: "Service Before Self",
    body: "Decades of military service ingrained a fundamental belief: genuine impact comes from putting others first. Every engagement is designed with your people at the center.",
  },
  {
    title: "Evidence Over Trend",
    body: "Sonya's programs are grounded in behavioral science, positive psychology, and lived organizational experience — not wellness fads or one-size-fits-all content.",
  },
  {
    title: "Practical Over Performative",
    body: "Real change requires real tools. Every workshop, keynote, and program delivers actionable frameworks people can implement without overhauling their lives.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sage">
            About Sonya
          </p>
          <h1 className="font-serif max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Leadership, Service, and the{" "}
            <span className="italic text-sage">Science of Wellness.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Over two decades of military precision, federal government leadership, and
            human-centered care — now in service of healthier organizations.
          </p>
        </div>
      </section>

      {/* Main story */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <FadeIn direction="left">
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl bg-beige" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85"
                    alt="Sonya Harris"
                    width={800}
                    height={960}
                    className="w-full object-cover"
                    style={{ aspectRatio: "5/6" }}
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={120}>
              <h2 className="font-serif text-3xl font-bold text-forest lg:text-4xl">
                Where Military Precision Meets Human Wellness
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Sonya Harris entered the United States Air Force with a commitment to
                  service that would shape everything she does to this day. Over 21 years,
                  she rose through the ranks leading teams through rapid change,
                  high-stress deployments, and complex organizational transitions —
                  always with an eye on the human cost of performance demands.
                </p>
                <p>
                  It was in those high-stakes environments that Sonya recognized a
                  critical gap: organizations demanded resilience without teaching it.
                  They expected performance without protecting wellbeing. She made it
                  her mission to change that.
                </p>
                <p>
                  After earning her Master of Education and certifications in leadership
                  development and wellness facilitation, Sonya launched Re-Self Wellness —
                  bringing military discipline, evidence-based practices, and authentic
                  human care to corporate clients, federal agencies, and educational
                  institutions across the country.
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {achievements.map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-line bg-beige px-5 py-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="font-serif text-xl font-bold text-forest">{value}</p>
                    <p className="mt-1 text-xs font-medium text-muted">{label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-beige py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">
                Career Journey
              </p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                The Road to Re-Self
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {timeline.map(({ period, title, description }, i) => (
              <FadeIn key={title} direction="up" delay={i * 100}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-sage">
                    {period}
                  </p>
                  <h3 className="font-serif mb-3 text-lg font-bold text-forest">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Values</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                What drives every engagement
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {values.map(({ title, body }, i) => (
              <FadeIn key={title} direction="up" delay={i * 100}>
                <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
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
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <FadeIn direction="up">
            <h2 className="font-serif text-4xl font-bold text-white lg:text-5xl">
              Ready to work with Sonya?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/55">
              Bring her expertise in military resilience, federal leadership, and wellness
              facilitation to your organization.
            </p>
            <Link
              href="/book-sonya"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-forest shadow-xl transition-all hover:-translate-y-px hover:shadow-2xl"
            >
              Book Sonya &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
