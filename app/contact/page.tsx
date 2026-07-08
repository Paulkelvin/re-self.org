import type { Metadata } from "next";
import { ContactBooking } from "@/components/ContactBooking";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sonya Harris for speaking engagements, workshops, retreats, and corporate wellness programs.",
};

export default function ContactPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7fafa] px-6 pb-20 pt-32">
      {/* Ambient brand graphics */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-sage/[0.12] blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-beige blur-3xl" />
        {/* Botanical leaf */}
        <svg className="absolute right-[8%] top-[15%] h-24 w-24 rotate-[30deg] text-sage/[0.08] lg:h-28 lg:w-28" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M50 95 C50 95 20 70 15 40 C10 10 45 5 50 5 C55 5 90 10 85 40 C80 70 50 95 50 95Z" /><path d="M50 95 C50 95 50 5 50 5" /><path d="M50 30 C50 30 35 25 25 35" /><path d="M50 50 C50 50 65 42 75 48" /><path d="M50 70 C50 70 35 62 28 68" /></svg>
        {/* Cross markers */}
        <span className="absolute left-[15%] top-[40%] select-none text-xl text-forest/[0.06]">+</span>
        <span className="absolute bottom-[25%] right-[12%] select-none text-lg text-sage/[0.08]">+</span>
        {/* Dot grid */}
        <div className="dot-grid absolute bottom-0 left-0 h-[40%] w-[30%] opacity-40" />
      </div>

      <FadeIn direction="up" className="relative z-10 mb-10 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/[0.18] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-amber">Contact</p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
          Let&apos;s start the conversation
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Send a quick question, or book Sonya for a keynote, workshop, or corporate program.
        </p>
        <p className="mx-auto mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-forest"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
          Or call directly: <a href="tel:+12409887490" className="font-semibold text-forest hover:underline">240-988-7490</a>
        </p>
      </FadeIn>

      <div className="relative z-10 flex w-full justify-center">
        <ContactBooking />
      </div>
    </main>
  );
}
