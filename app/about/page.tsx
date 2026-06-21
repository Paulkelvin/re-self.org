import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { AffirmationsAccordion } from "@/components/AffirmationsAccordion";
import { getAchievements, getTimeline, getValues, getAffirmations } from "@/lib/content";
import { getGalleryImages } from "@/lib/gallery";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Sonya Harris",
  description:
    "Learn about Sonya Harris, M.Ed. — retired USAF veteran, HR professional, self-care advocate, and founder of Re-Self, a wellness curriculum helping individuals and organizations rediscover their inner strength.",
};


export default async function AboutPage() {
  const [achievements, galleryImages, timeline, values, principles] = await Promise.all([
    getAchievements(),
    getGalleryImages(),
    getTimeline(),
    getValues(),
    getAffirmations(),
  ]);
  const heroImage = galleryImages[0]?.src;

  return (
    <>
      {/* Cinematic background hero */}
      <section className="relative isolate flex min-h-[66vh] items-center overflow-hidden bg-[#0f3535] text-white lg:min-h-[76vh]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a1e1e] via-[#0f3535] to-[#134545]" />

        {/* Brand watermark + ambient orbit */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-2 select-none font-serif text-[10rem] font-bold leading-none text-white/[0.06] lg:text-[16rem]"
        >
          About
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-16 lg:py-32">
          <FadeIn direction="up" className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-sage/[0.10] border border-white/15 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">
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
      <section className="relative overflow-hidden bg-ambient-warm py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-40 -top-20 h-[500px] w-[500px] rounded-full bg-sage/[0.07] blur-3xl" aria-hidden="true" />
        {/* Glass orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute right-[10%] top-20 h-14 w-14 rounded-full bg-sage/20 backdrop-blur-sm lg:h-20 lg:w-20" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-16 left-[6%] h-10 w-10 rounded-full bg-forest/10 backdrop-blur-sm lg:h-14 lg:w-14" />
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Portrait */}
            <FadeIn direction="left" className="lg:col-span-6">
              <div className="relative h-[360px] w-full overflow-hidden rounded-xl shadow-2xl shadow-forest/20 lg:h-[520px]">
                <Image
                  src={heroImage || "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85"}
                  alt="Sonya Harris"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>

            {/* Floating narrative panel — overlaps the portrait on desktop */}
            <FadeIn direction="up" delay={120} className="lg:col-span-6">
              <div className="relative z-10 rounded-xl border border-white/10 bg-[#184c4c] p-7 text-white shadow-xl shadow-forest/25 md:p-9 lg:-ml-24">
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
                      <p className="font-mono text-3xl font-light leading-none text-[#e4ecec]">{value}</p>
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
      <section className="grain-overlay bg-[#134545] px-6 py-24 text-white lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn direction="up">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-sage/[0.10] border border-white/15 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">
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
                    <span className="mb-6 inline-block rounded-full bg-[#e4ecec] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[#134545]">
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
      <section className="relative overflow-hidden bg-ambient-beige">
        {/* Botanical leaf */}
        <svg aria-hidden="true" className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 rotate-[140deg] text-sage/[0.10] lg:bottom-8 lg:right-8 lg:h-36 lg:w-36" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M50 95 C50 95 20 70 15 40 C10 10 45 5 50 5 C55 5 90 10 85 40 C80 70 50 95 50 95Z" /><path d="M50 95 C50 95 50 5 50 5" /><path d="M50 30 C50 30 35 25 25 35" /><path d="M50 50 C50 50 65 42 75 48" /><path d="M50 70 C50 70 35 62 28 68" /></svg>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 border-t border-[#134545]/20 lg:grid-cols-12">
            {/* Anchor header */}
            <FadeIn direction="up" className="self-start lg:sticky lg:top-12 lg:col-span-4">
              <p className="pt-16 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
                Values
              </p>
              <h2 className="font-serif pb-16 pt-4 text-3xl font-medium tracking-tight text-[#134545] md:text-5xl lg:pb-0">
                What drives every engagement
              </h2>
            </FadeIn>

            {/* Interlocking value panels */}
            <div className="lg:col-span-8">
              {values.map(({ title, body }, i) => (
                <FadeIn key={title} direction="up" delay={i * 80}>
                  <div className="group border-b border-[#134545]/10 bg-white/50 p-10 shadow-sm shadow-forest/[0.04] transition-all duration-300 hover:bg-white hover:shadow-md hover:shadow-forest/[0.08]">
                    <span className="mb-3 block font-mono text-xs text-neutral-400 transition-colors group-hover:text-[#134545]">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif mb-2 text-xl font-medium text-[#134545] md:text-2xl">
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

      {/* Affirmations & Words of Encouragement */}
      <section className="bg-ambient-warm py-20 lg:py-28">
        <div className="mx-auto max-w-[860px] px-6">
          <FadeIn direction="up">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
              Words of Encouragement
            </p>
            <h2 className="font-serif text-3xl font-bold text-forest lg:text-4xl">
              Re-Self Affirmations
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Eleven guiding principles from the Re-Self curriculum. Expand each one to read its affirmations.
            </p>
            <div aria-hidden="true" className="mt-5 h-[3px] w-12 rounded-full bg-gold" />
          </FadeIn>

          <FadeIn direction="up" delay={80}>
            <div className="mt-12">
              <AffirmationsAccordion items={principles} />
            </div>
          </FadeIn>
        </div>
      </section>

    </>
  );
}
