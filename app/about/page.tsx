import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { BrandOrbit } from "@/components/BrandOrbit";
import { getAchievements } from "@/lib/content";

export const revalidate = 60;

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

export default async function AboutPage() {
  const achievements = await getAchievements();

  return (
    <>
      {/* Cinematic background hero */}
      <section className="relative isolate flex min-h-[66vh] items-center overflow-hidden bg-pine-700 text-white lg:min-h-[76vh]">
        {/* Full-bleed background image + contrast overlays */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Left-weighted gradient keeps the headline on a dark field for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-pine-950/95 via-pine-950/78 to-pine-700/35" />
          <div className="absolute inset-0 bg-pine-950/25" />
        </div>

        {/* Brand watermark + ambient orbit */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-2 select-none font-serif text-[10rem] font-bold leading-none text-white/[0.06] lg:text-[16rem]"
        >
          About
        </span>
        <BrandOrbit className="pointer-events-none absolute -right-28 -top-28 h-[32rem] w-[32rem] text-sage/15" />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-16 lg:py-32">
          <FadeIn direction="up" className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-sage">
              <span className="h-px w-8 bg-sage/60" />
              About Sonya
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">
              Leadership, Service, and the Science of Wellness.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Over two decades of military precision, federal government leadership, and
              human-centered care — now in service of healthier organizations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Overlapping magazine profile */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Portrait */}
            <FadeIn direction="left" className="lg:col-span-6">
              <div className="relative h-[360px] w-full overflow-hidden rounded-xl shadow-2xl shadow-forest/20 lg:h-[520px]">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85"
                  alt="Sonya Harris"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>

            {/* Floating narrative panel — overlaps the portrait on desktop */}
            <FadeIn direction="up" delay={120} className="lg:col-span-6">
              <div className="relative z-10 rounded-xl border border-white/10 bg-pine-500 p-7 text-white shadow-xl shadow-forest/25 md:p-9 lg:-ml-24">
                <h2 className="font-serif text-2xl font-medium leading-tight text-white lg:text-3xl">
                  Where Military Precision Meets Human Wellness
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-snug text-white/70">
                  <p>
                    Sonya Harris entered the United States Air Force with a commitment to
                    service that shaped everything she does. Over 21 years she rose through
                    the ranks, leading teams through rapid change and high-stress deployments.
                  </p>
                  <p>
                    She recognized a critical gap: organizations demanded resilience without
                    teaching it. She launched Re-Self Wellness to bring military discipline,
                    evidence-based practice, and authentic care to clients nationwide.
                  </p>
                </div>

                {/* Hyper-bold stats bar */}
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/20 pt-6">
                  {achievements.map(({ value, label }) => (
                    <div key={label}>
                      <p className="font-mono text-3xl font-light leading-none text-sand">{value}</p>
                      <p className="mt-1.5 text-[10px] font-medium uppercase tracking-widest text-white/50">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Brutalist time track */}
      <section className="bg-pine-600 px-6 py-24 text-white lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn direction="up">
            <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-sage">
              <span className="h-px w-8 bg-sage/60" />
              Career Journey
            </p>
            <h2 className="font-serif text-4xl font-light tracking-tight text-white lg:text-6xl">
              The Road to Re-Self
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {timeline.map(({ period, title, description }, i) => (
              <FadeIn key={title} direction="up" delay={i * 120}>
                <div className="relative overflow-hidden pt-20">
                  {/* Massive structural watermark */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-4 -top-16 select-none font-sans text-[12rem] font-black leading-none text-white/[0.03]"
                  >
                    0{i + 1}
                  </span>
                  <div className="relative">
                    <span className="mb-6 inline-block rounded-full bg-sand px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-pine-600">
                      {period}
                    </span>
                    <h3 className="font-serif mb-3 text-2xl font-medium text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-300/90">{description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetric color-block values */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 border-t border-pine-600/20 lg:grid-cols-12">
            {/* Anchor header */}
            <FadeIn direction="up" className="self-start lg:sticky lg:top-12 lg:col-span-4">
              <p className="pt-16 text-xs font-semibold uppercase tracking-widest text-pine-600/50">
                Values
              </p>
              <h2 className="font-serif pb-16 pt-4 text-3xl font-medium tracking-tight text-pine-600 md:text-5xl lg:pb-0">
                What drives every engagement
              </h2>
            </FadeIn>

            {/* Interlocking value panels */}
            <div className="lg:col-span-8">
              {values.map(({ title, body }, i) => (
                <FadeIn key={title} direction="up" delay={i * 80}>
                  <div className="group border-b border-pine-600/10 bg-white/50 p-10 transition-all duration-300 hover:bg-white">
                    <span className="mb-3 block font-mono text-xs text-neutral-400 transition-colors group-hover:text-pine-600">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif mb-2 text-xl font-medium text-pine-600 md:text-2xl">
                      {title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">{body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
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
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-forest shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98]"
            >
              Book Sonya &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
