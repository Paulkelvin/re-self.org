import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { AffirmationsAccordion } from "@/components/AffirmationsAccordion";

export const metadata: Metadata = {
  title: "Affirmations & Principles",
  description:
    "Re-Self affirmations and words of encouragement — eleven guiding principles to support your healing, growth, and self-care journey.",
};

const principles = [
  {
    title: "Seeking Support: The Strength in Asking for Help",
    affirmations: [
      "Asking for help is a sign of wisdom, not weakness.",
      "I deserve support on my journey to healing and growth.",
      "Seeking guidance honors my commitment to becoming my best self.",
      "I release the belief that I must carry every burden alone.",
      "My healing matters, and I am worthy of receiving help when I need it.",
    ],
  },
  {
    title: "The Healing Power of Forgiveness",
    affirmations: [
      "I forgive myself for what I did not know then.",
      "I choose peace over resentment and freedom over bitterness.",
      "My past does not define my future.",
      "Forgiveness is a gift I give myself.",
      "I release what no longer serves my healing.",
    ],
  },
  {
    title: "Rest Without Guilt",
    affirmations: [
      "Rest is productive because it restores my mind, body, and spirit.",
      "I give myself permission to pause and recharge.",
      "My worth is not measured by my productivity.",
      "Taking care of myself allows me to better serve others.",
      "I honor my need for rest without apology.",
    ],
  },
  {
    title: "Kindness as a Self-Care Practice",
    affirmations: [
      "Every act of kindness creates positive energy within and around me.",
      "I choose compassion in my thoughts, words, and actions.",
      "Kindness begins with how I treat myself.",
      "The love I share returns to me in meaningful ways.",
      "Today I will be a source of light for myself and others.",
    ],
  },
  {
    title: "Quiet the Mind, Quiet the Noise",
    affirmations: [
      "Peace lives within me, even when life feels chaotic.",
      "I release what I cannot control and embrace the present moment.",
      "My mind deserves moments of stillness and calm.",
      "I create space for clarity through silence and reflection.",
      "Each breath brings me back to center.",
    ],
  },
  {
    title: "Mindful Consumption",
    affirmations: [
      "I choose what nourishes my mind, body, and spirit.",
      "I protect my energy by being intentional about what I consume.",
      "I deserve environments that support my growth.",
      "I welcome information, relationships, and experiences that align with my well-being.",
      "I am mindful of what I allow into my life.",
    ],
  },
  {
    title: "Personal Responsibility and Self-Empowerment",
    affirmations: [
      "I cannot control everything, but I can control how I respond.",
      "My choices have the power to transform my life.",
      "I take ownership of my actions with grace and courage.",
      "Every day I have the opportunity to choose differently.",
      "I am empowered by focusing on what is within my control.",
    ],
  },
  {
    title: "Speaking Life: The Power of Positive Language",
    affirmations: [
      "My words have power, and I choose them wisely.",
      "I speak to myself with kindness and compassion.",
      "I replace criticism with encouragement.",
      "My voice can inspire healing, hope, and possibility.",
      "What I speak today shapes my tomorrow.",
    ],
  },
  {
    title: "The Power of Choice",
    affirmations: [
      "I choose thoughts, habits, and actions that support my highest good.",
      "Every choice I make is an opportunity for growth.",
      "I am creating the life I desire one decision at a time.",
      "What I invest in today will shape my future.",
      "I choose purpose over fear and intention over reaction.",
    ],
  },
  {
    title: "Balancing Feminine and Masculine Energy",
    affirmations: [
      "I honor both my intuition and my ability to take action.",
      "I embrace balance, harmony, and wholeness within myself.",
      "I am strong enough to lead and wise enough to listen.",
      "I trust both my inner knowing and my outer capabilities.",
      "I welcome the balance of being and doing.",
    ],
  },
  {
    title: "Living with Gratitude",
    affirmations: [
      "Gratitude transforms what I have into enough.",
      "I find blessings in both the ordinary and extraordinary moments of life.",
      "Each day offers something worth appreciating.",
      "The more grateful I become, the more abundance I notice.",
      "I choose gratitude as a way of life.",
    ],
  },
];

export default function AffirmationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f3535] px-6 py-24 text-white lg:px-16">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#0a1e1e] via-[#0f3535] to-[#134545]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-sage/[0.07] blur-3xl" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-2 select-none font-serif text-[9rem] font-bold leading-none text-white/[0.05] lg:text-[14rem]"
        >
          Affirm
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-sage/[0.10] px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">
            Affirmations &amp; Principles
          </p>
          <h1 className="font-serif max-w-3xl text-3xl font-medium leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl">
            Words that restore, ground, and remind you of who you are.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
            Eleven guiding principles from the Re-Self curriculum — each one a doorway
            into deeper self-care, healing, and intentional living.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-ambient-warm py-20 lg:py-28">
        <div className="mx-auto max-w-[860px] px-4">
          <FadeIn direction="up">
            <div className="mb-12">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
                11 Principles
              </p>
              <h2 className="font-serif text-3xl font-bold text-forest lg:text-4xl">
                Expand each principle to read its affirmations.
              </h2>
              <div aria-hidden="true" className="mt-4 h-[3px] w-12 rounded-full bg-gold" />
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={80}>
            <AffirmationsAccordion items={principles} />
          </FadeIn>

          <FadeIn direction="up" delay={120}>
            <div className="mt-16 rounded-2xl border border-forest/10 bg-forest/[0.03] p-8 text-center">
              <p className="mb-2 font-serif text-lg font-semibold text-forest">
                Ready to go deeper?
              </p>
              <p className="mb-6 text-sm leading-relaxed text-muted">
                These principles come to life in Sonya&apos;s workshops, keynotes, and corporate programs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                >
                  Explore Services
                </Link>
                <Link
                  href="/book-sonya"
                  className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-7 py-3 text-xs font-semibold uppercase tracking-widest text-forest transition-all duration-300 hover:bg-forest/[0.04] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Sonya
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
