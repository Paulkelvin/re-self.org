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
    <main className="relative min-h-screen overflow-hidden bg-warm-white">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-sage/[0.08] blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-beige/60 blur-[80px]" />
        <div className="absolute left-1/2 top-[30%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-forest/[0.03] blur-[60px]" />
      </div>

      {/* Hero header */}
      <section className="relative z-10 px-6 pb-6 pt-32 sm:pt-36 lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <FadeIn direction="up">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-forest/20 to-transparent" />
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-forest/60">
                Legal
              </p>
              <span className="h-px flex-1 bg-gradient-to-l from-forest/20 to-transparent" />
            </div>
            <h1 className="text-center font-serif text-4xl font-bold tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-5 text-center text-sm tracking-wide text-muted">
              Last updated July 11, 2025
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-forest/30 to-transparent" />
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-8">
        <FadeIn direction="up" delay={0.05}>
          <div className="text-[0.9375rem] leading-[1.8] text-charcoal/85">
            <p>
              Re-Self (&ldquo;Re-Self,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit{" "}
              <Link href="/" className="font-medium text-forest underline decoration-forest/30 underline-offset-3 hover:decoration-forest/70">
                www.re-self.org
              </Link>{" "}
              (the &ldquo;Site&rdquo;), subscribe to our newsletter, register for a workshop, retreat, cohort, or coaching program, or otherwise interact with our services (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p className="mt-5">
              By using the Site or our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use the Site.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Policy sections */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-10">
            {/* Section 1 */}
            <PolicySection number="01" title="Information We Collect">
              <p>We collect information in the following ways:</p>

              <div className="mt-5 space-y-5 border-l-2 border-forest/10 pl-5">
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
              </div>
            </PolicySection>

            {/* Section 2 */}
            <PolicySection number="02" title="How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="mt-4 space-y-2.5">
                <BulletItem>Respond to inquiries and provide the Services you request, including scheduling and delivering keynotes, retreats, workshops, cohorts, and coaching sessions</BulletItem>
                <BulletItem>Process payments and manage program registrations</BulletItem>
                <BulletItem>Send our newsletter and other communications you&apos;ve opted into</BulletItem>
                <BulletItem>Improve and maintain the Site, including analyzing usage trends and troubleshooting technical issues</BulletItem>
                <BulletItem>Communicate with you about your account, bookings, or requests</BulletItem>
                <BulletItem>Comply with legal obligations and enforce our terms</BulletItem>
              </ul>
              <p className="mt-5 rounded-lg border border-forest/10 bg-forest/[0.03] px-4 py-3 text-sm font-medium text-charcoal">
                We do not sell your personal information to third parties for their own marketing purposes.
              </p>
            </PolicySection>

            {/* Section 3 */}
            <PolicySection number="03" title="Cookies and Tracking Technologies">
              <p>
                The Site uses cookies and similar technologies to support site functionality, remember your preferences, and analyze traffic through analytics tools. You can control cookies through your browser settings, including blocking or deleting them; note that disabling cookies may affect certain features of the Site.
              </p>
            </PolicySection>

            {/* Section 4 */}
            <PolicySection number="04" title="How We Share Your Information">
              <p>We may share your information with:</p>
              <ul className="mt-4 space-y-2.5">
                <BulletItem>
                  <strong className="font-semibold text-charcoal">Service providers</strong> who perform functions on our behalf, such as payment processing, email delivery for newsletters, scheduling, and website analytics. These providers are only permitted to use your information to perform services for us.
                </BulletItem>
                <BulletItem>
                  <strong className="font-semibold text-charcoal">Legal and safety purposes,</strong> where required to comply with a legal obligation, protect our rights, or respond to a valid legal request.
                </BulletItem>
                <BulletItem>
                  <strong className="font-semibold text-charcoal">Business transfers,</strong> in connection with a merger, acquisition, or sale of assets, in which case personal information may be transferred as part of that transaction.
                </BulletItem>
              </ul>
              <p className="mt-4">
                We do not share your personal information with third parties for their independent marketing use without your consent.
              </p>
            </PolicySection>

            {/* Section 5 */}
            <PolicySection number="05" title="Data Retention">
              <p>
                We retain personal information for as long as necessary to fulfill the purposes described in this policy, including to provide the Services you&apos;ve requested, maintain business records, and comply with legal obligations. When information is no longer needed, we take reasonable steps to delete or anonymize it.
              </p>
            </PolicySection>

            {/* Section 6 */}
            <PolicySection number="06" title="Your Privacy Rights">
              <div className="space-y-5 border-l-2 border-forest/10 pl-5">
                <PolicySub title="All users">
                  You may opt out of our newsletter at any time by using the unsubscribe link in any email or by contacting us directly. You may also request that we correct or delete personal information we hold about you, subject to any legal or contractual obligations that require us to retain it.
                </PolicySub>
                <PolicySub title="California residents (CCPA)">
                  If you are a California resident, you have the right to:
                </PolicySub>
              </div>
              <ul className="mt-4 space-y-2.5">
                <BulletItem>Know what personal information we have collected about you and how it has been used and shared</BulletItem>
                <BulletItem>Request deletion of personal information we have collected from you, subject to certain exceptions</BulletItem>
                <BulletItem>Correct inaccurate personal information</BulletItem>
                <BulletItem>Opt out of the sale or sharing of personal information (we do not sell personal information)</BulletItem>
                <BulletItem>Not receive discriminatory treatment for exercising your privacy rights</BulletItem>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us using the information in Section 11 below. We will verify your request before responding.
              </p>
            </PolicySection>

            {/* Section 7 */}
            <PolicySection number="07" title="Children&apos;s Privacy">
              <p>
                Our Services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have inadvertently collected such information, we will take steps to delete it.
              </p>
            </PolicySection>

            {/* Section 8 */}
            <PolicySection number="08" title="Third-Party Links">
              <p>
                The Site may contain links to third-party websites, including social media platforms. We are not responsible for the privacy practices of those third parties, and we encourage you to review their privacy policies before providing them with any information.
              </p>
            </PolicySection>

            {/* Section 9 */}
            <PolicySection number="09" title="Data Security">
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
              <div className="mt-5 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                <div className="h-1 bg-gradient-to-r from-forest to-forest-light" />
                <div className="px-6 py-5">
                  <p className="font-serif text-lg font-semibold text-charcoal">Re-Self</p>
                  <div className="mt-3 space-y-1.5 text-sm text-charcoal/80">
                    <p className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest/60" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                      <a href="mailto:sharris@re-self.org" className="font-medium text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest/70">
                        sharris@re-self.org
                      </a>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest/60" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      <a href="tel:+12409887490" className="font-medium text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest/70">
                        (240) 988-7490
                      </a>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest/60" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                      <Link href="/" className="font-medium text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest/70">
                        www.re-self.org
                      </Link>
                    </p>
                  </div>
                </div>
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
    <div className="group">
      <div className="mb-4 flex items-center gap-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest/[0.07] font-mono text-xs font-bold text-forest/70">
          {number}
        </span>
        <h2 className="font-serif text-xl font-semibold tracking-tight text-charcoal sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="ml-12 space-y-3 text-[0.9375rem] leading-[1.8] text-charcoal/85">
        {children}
      </div>
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

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[0.6rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-forest/40" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
