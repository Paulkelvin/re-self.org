import type { Metadata } from "next";
import { ContactBooking } from "@/components/ContactBooking";
import { FadeIn } from "@/components/FadeIn";
import { BrandOrbit } from "@/components/BrandOrbit";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sonya Harris for speaking engagements, workshops, retreats, and corporate wellness programs.",
};

export default function ContactPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAF9F6] px-6 pb-20 pt-32">
      {/* Ambient brand graphics */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 h-[460px] w-[460px] rounded-full bg-sage/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-beige blur-3xl" />
        <BrandOrbit className="absolute -right-24 top-24 h-72 w-72 text-forest/[0.06]" />
        <BrandOrbit reverse className="absolute -left-28 bottom-16 h-64 w-64 text-forest/[0.05]" />
      </div>

      <FadeIn direction="up" className="relative z-10 mb-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Contact</p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-forest sm:text-4xl">
          Let&apos;s start the conversation
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Send a quick question, or book Sonya for a keynote, workshop, or corporate program.
        </p>
      </FadeIn>

      <div className="relative z-10 flex w-full justify-center">
        <ContactBooking />
      </div>
    </main>
  );
}
