import type { Metadata } from "next";
import { ContactBooking } from "@/components/ContactBooking";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sonya Harris for speaking engagements, workshops, retreats, and corporate wellness programs.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F6] px-6 pb-20 pt-32">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Contact</p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-forest sm:text-4xl">
          Let&apos;s start the conversation
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Send a quick question, or book Sonya for a keynote, workshop, or corporate program.
        </p>
      </div>

      <ContactBooking />
    </main>
  );
}
