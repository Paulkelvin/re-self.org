import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Re-Self Privacy Policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7fafa]">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-sage/[0.10] blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-beige blur-3xl" />
      </div>

      {/* Header */}
      <section className="relative z-10 pb-10 pt-32 text-center">
        <FadeIn direction="up">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.08] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-forest">
            Legal
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-charcoal sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Effective July 11, 2025
          </p>
        </FadeIn>
      </section>

      {/* Content */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <FadeIn direction="up" delay={0.1}>
          <div className="rounded-2xl border border-line bg-white/80 px-6 py-10 shadow-sm backdrop-blur-sm sm:px-10 sm:py-12">
            <div className="space-y-8 text-[0.9375rem] leading-relaxed text-charcoal/90">
              <p>
                Re-Self (&ldquo;Re-Self,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit{" "}
                <Link href="/" className="font-medium text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest">
                  www.re-self.org
                </Link>{" "}
                (the &ldquo;Site&rdquo;), subscribe to our newsletter, register for a workshop, retreat, cohort, or coaching program, or otherwise interact with our services (collectively, the &ldquo;Services&rdquo;).
              </p>
              <p>
                By using the Site or our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use the Site.
              </p>

              {/* Section 1 */}
              <PolicySection number="1" title="Information We Collect">
                <p>We collect information in the following ways:</p>
                <PolicySub title="Information you provide directly">
                  When you fill out a contact or inquiry form, subscribe to our newsletter, book Sonya for a speaking engagement, or register for a workshop, retreat, cohort, or coaching session, we may collect your name, email address, phone number, organization or company name, mailing address, and any details you include in a message (such as event needs or scheduling preferences).
                </PolicySub>
                <PolicySub title="Payment information">
                  When you purchase coaching sessions, cohort enrollment, panel participation, or other paid programs, payment is processed through a third-party payment processor (such as Stripe, PayPal, or Square). We do not store your full credit card number or banking details on our own servers — that information is collected and processed directly by our payment processor, subject to that processor&apos;s own privacy policy.
                </PolicySub>
                <PolicySub title="Information collected automatically">
                  When you visit the Site, we and our service providers may automatically collect certain information about your device and usage, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visits. We use cookies and similar tracking technologies (such as analytics tools) for this purpose.
                </PolicySub>
                <PolicySub title="Information from third parties">
                  If you interact with us through social media platforms (such as Facebook or Instagram), we may receive information from those platforms consistent with your privacy settings on those services.
                </PolicySub>
              </PolicySection>

              {/* Section 2 */}
              <PolicySection number="2" title="How We Use Your Information">
                <p>We use the information we collect to:</p>
                <ul className="ml-1 list-inside list-disc space-y-2 marker:text-forest/40">
                  <li>Respond to inquiries and provide the Services you request, including scheduling and delivering keynotes, retreats, workshops, cohorts, and coaching sessions</li>
                  <li>Process payments and manage program registrations</li>
                  <li>Send our newsletter and other communications you&apos;ve opted into</li>
                  <li>Improve and maintain the Site, including analyzing usage trends and troubleshooting technical issues</li>
                  <li>Communicate with you about your account, bookings, or requests</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
                <p className="mt-4 font-medium text-charcoal">
                  We do not sell your personal information to third parties for their own marketing purposes.
                </p>
              </PolicySection>

              {/* Section 3 */}
              <PolicySection number="3" title="Cookies and Tracking Technologies">
                <p>
                  The Site uses cookies and similar technologies to support site functionality, remember your preferences, and analyze traffic through analytics tools. You can control cookies through your browser settings, including blocking or deleting them; note that disabling cookies may affect certain features of the Site.
                </p>
              </PolicySection>

              {/* Section 4 */}
              <PolicySection number="4" title="How We Share Your Information">
                <p>We may share your information with:</p>
                <ul className="ml-1 list-inside list-disc space-y-2 marker:text-forest/40">
                  <li>
                    <strong className="font-semibold text-charcoal">Service providers</strong> who perform functions on our behalf, such as payment processing, email delivery for newsletters, scheduling, and website analytics. These providers are only permitted to use your information to perform services for us.
                  </li>
                  <li>
                    <strong className="font-semibold text-charcoal">Legal and safety purposes,</strong> where required to comply with a legal obligation, protect our rights, or respond to a valid legal request.
                  </li>
                  <li>
                    <strong className="font-semibold text-charcoal">Business transfers,</strong> in connection with a merger, acquisition, or sale of assets, in which case personal information may be transferred as part of that transaction.
                  </li>
                </ul>
                <p className="mt-4">
                  We do not share your personal information with third parties for their independent marketing use without your consent.
                </p>
              </PolicySection>

              {/* Section 5 */}
              <PolicySection number="5" title="Data Retention">
                <p>
                  We retain personal information for as long as necessary to fulfill the purposes described in this policy, including to provide the Services you&apos;ve requested, maintain business records, and comply with legal obligations. When information is no longer needed, we take reasonable steps to delete or anonymize it.
                </p>
              </PolicySection>

              {/* Section 6 */}
              <PolicySection number="6" title="Your Privacy Rights">
                <PolicySub title="All users">
                  You may opt out of our newsletter at any time by using the unsubscribe link in any email or by contacting us directly. You may also request that we correct or delete personal information we hold about you, subject to any legal or contractual obligations that require us to retain it.
                </PolicySub>
                <PolicySub title="California residents (CCPA)">
                  If you are a California resident, you have the right to:
                </PolicySub>
                <ul className="ml-1 list-inside list-disc space-y-2 marker:text-forest/40">
                  <li>Know what personal information we have collected about you and how it has been used and shared</li>
                  <li>Request deletion of personal information we have collected from you, subject to certain exceptions</li>
                  <li>Correct inaccurate personal information</li>
                  <li>Opt out of the sale or sharing of personal information (we do not sell personal information)</li>
                  <li>Not receive discriminatory treatment for exercising your privacy rights</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us using the information in Section 11 below. We will verify your request before responding.
                </p>
              </PolicySection>

              {/* Section 7 */}
              <PolicySection number="7" title="Children&apos;s Privacy">
                <p>
                  Our Services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have inadvertently collected such information, we will take steps to delete it.
                </p>
              </PolicySection>

              {/* Section 8 */}
              <PolicySection number="8" title="Third-Party Links">
                <p>
                  The Site may contain links to third-party websites, including social media platforms. We are not responsible for the privacy practices of those third parties, and we encourage you to review their privacy policies before providing them with any information.
                </p>
              </PolicySection>

              {/* Section 9 */}
              <PolicySection number="9" title="Data Security">
                <p>
                  We use reasonable administrative, technical, and physical safeguards designed to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </PolicySection>

              {/* Section 10 */}
              <PolicySection number="10" title="International Visitors">
                <p>
                  Re-Self is based in the United States, and our Services may be delivered internationally. If you access the Site from outside the United States, your information may be transferred to, stored, and processed in the United States, where privacy laws may differ from those of your home country.
                </p>
              </PolicySection>

              {/* Section 11 */}
              <PolicySection number="11" title="Contact Us">
                <p>
                  If you have questions about this Privacy Policy or wish to exercise your privacy rights, contact us at:
                </p>
                <div className="mt-3 rounded-xl border border-line bg-[#f7fafa] px-5 py-4">
                  <p className="font-semibold text-charcoal">Re-Self</p>
                  <p className="mt-1">
                    Email:{" "}
                    <a href="mailto:sharris@re-self.org" className="font-medium text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest">
                      sharris@re-self.org
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a href="tel:+12409887490" className="font-medium text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest">
                      (240) 988-7490
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <Link href="/" className="font-medium text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest">
                      www.re-self.org
                    </Link>
                  </p>
                </div>
              </PolicySection>

              {/* Section 12 */}
              <PolicySection number="12" title="Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will post the revised policy on this page with an updated effective date. Your continued use of the Site after changes take effect constitutes acceptance of the updated policy.
                </p>
              </PolicySection>

              {/* Section 13 */}
              <PolicySection number="13" title="Governing Law">
                <p>
                  This Privacy Policy is governed by the laws of the State of Maryland, without regard to its conflict of law principles.
                </p>
              </PolicySection>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 flex items-baseline gap-2 font-serif text-xl font-semibold tracking-tight text-charcoal sm:text-[1.35rem]">
        <span className="text-forest/50">{number}.</span> {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function PolicySub({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-1 text-[0.9375rem] font-semibold text-charcoal">
        {title}
      </h3>
      <p>{children}</p>
    </div>
  );
}
