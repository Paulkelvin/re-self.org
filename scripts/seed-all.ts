import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Helper: upsert documents by a match field
// ---------------------------------------------------------------------------
async function seedType(
  typeName: string,
  items: Record<string, any>[],
  matchField = "title",
) {
  console.log(`\nSeeding ${typeName}...`);
  const existing = await client.fetch<Record<string, any>[]>(
    `*[_type == "${typeName}"]{ _id, ${matchField} }`,
  );

  for (const item of items) {
    const match = existing.find(
      (e: any) => e[matchField] === item[matchField],
    );
    if (match) {
      await client.patch(match._id).set(item).commit();
      console.log(`  Updated ${typeName}: ${item[matchField]}`);
    } else {
      await client.create({ _type: typeName, ...item });
      console.log(`  Created ${typeName}: ${item[matchField]}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 1. Philosophy
// ---------------------------------------------------------------------------
const philosophies = [
  {
    num: "01",
    title: "Discipline",
    body: "Consistent habits compound into lasting resilience. Sonya's frameworks are built on repeatable practices—not motivational quick fixes.",
    order: 1,
  },
  {
    num: "02",
    title: "Resilience",
    body: "Mental and emotional strength aren't innate—they're practiced. Each program equips teams with tools to recover, reset, and re-engage.",
    order: 2,
  },
  {
    num: "03",
    title: "Renewal",
    body: "Sustainable wellness rhythms prevent burnout before it starts. Re-Self teaches leaders and organizations to build recovery into their operating rhythm.",
    order: 3,
  },
];

// ---------------------------------------------------------------------------
// 2. Timeline
// ---------------------------------------------------------------------------
const timelineEntries = [
  {
    period: "1987 – 2010",
    title: "U.S. Air Force Service",
    description:
      "Distinguished service across domestic and international assignments, leading teams through high-pressure environments, complex organizational change, and mission-critical demands.",
    order: 1,
  },
  {
    period: "2012 – 2022",
    title: "Federal Government Leadership",
    description:
      "Concurrently served in federal government roles, developing and implementing leadership development and wellness initiatives for federal workforce organizations.",
    order: 2,
  },
  {
    period: "2022 – Present",
    title: "Re-Self Wellness",
    description:
      "Founded Re-Self, a thoughtfully developed wellness curriculum helping individuals and organizations rediscover their inner strength. Trusted by organizations like the University of California and Phenomenal Women Empowerment Organization, with workshops delivered across the U.S. and internationally.",
    order: 3,
  },
];

// ---------------------------------------------------------------------------
// 3. Affirmation
// ---------------------------------------------------------------------------
const affirmations = [
  {
    title: "Seeking Support: The Strength in Asking for Help",
    affirmations: [
      "Asking for help is a sign of wisdom, not weakness.",
      "I deserve support on my journey to healing and growth.",
      "Seeking guidance honors my commitment to becoming my best self.",
      "I release the belief that I must carry every burden alone.",
      "My healing matters, and I am worthy of receiving help when I need it.",
    ],
    order: 1,
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
    order: 2,
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
    order: 3,
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
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
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
    order: 9,
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
    order: 10,
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
    order: 11,
  },
];

// ---------------------------------------------------------------------------
// 4. Value
// ---------------------------------------------------------------------------
const values = [
  {
    title: "Service Before Self",
    body: "Decades of military service ingrained a fundamental belief: genuine impact comes from putting others first. Every engagement is designed with your people at the center.",
    order: 1,
  },
  {
    title: "Evidence Over Trend",
    body: "Sonya's programs are grounded in behavioral science, positive psychology, and lived organizational experience — not wellness fads or one-size-fits-all content.",
    order: 2,
  },
  {
    title: "Practical Over Performative",
    body: "Real change requires real tools. Every workshop, keynote, and program delivers actionable frameworks people can implement without overhauling their lives.",
    order: 3,
  },
];

// ---------------------------------------------------------------------------
// 5. Service Audience
// ---------------------------------------------------------------------------
const serviceAudiences = [
  {
    title: "HR & People Teams",
    body: "Wellbeing weeks, culture initiatives, and employee wellness campaigns that go beyond box-checking.",
    order: 1,
  },
  {
    title: "High-Performance Leaders",
    body: "Managing burnout on ambitious teams where pressure never lets up and resilience isn't optional.",
    order: 2,
  },
  {
    title: "Federal Agencies",
    body: "Evidence-based programs built for the scale and rigor government workforce wellness demands.",
    order: 3,
  },
  {
    title: "Educational Institutions",
    body: "Sustainable wellness practices for faculty and staff that prevent attrition and restore purpose.",
    order: 4,
  },
  {
    title: "Wellness-First Organizations",
    body: "Long-term cultures of care where wellbeing is woven into leadership, operations, and daily rhythms.",
    order: 5,
  },
  {
    title: "Executive Teams",
    body: "Emotional and strategic support to lead well through change, transition, and high-stakes demands.",
    order: 6,
  },
  {
    title: "Individuals & Groups",
    body: "Individuals seeking self-care tools to incorporate into their lives, women's groups, church groups, and community organizations.",
    order: 7,
  },
];

// ---------------------------------------------------------------------------
// 6. Process Step
// ---------------------------------------------------------------------------
const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    body: "We start with a focused conversation to understand your team, goals, culture, and the specific challenges you want to address.",
    context: "services",
    order: 1,
  },
  {
    step: "02",
    title: "Custom Design",
    body: "Content is designed specifically for your audience — not adapted from a template. Sonya builds each engagement from the ground up.",
    context: "services",
    order: 2,
  },
  {
    step: "03",
    title: "Delivery & Impact",
    body: "Premium delivery with full presence. Every session includes clear takeaways, practical tools, and follow-up resources.",
    context: "services",
    order: 3,
  },
  {
    step: "01",
    title: "Submit your request",
    body: "Fill in the form with your event details, audience, goals, and budget range. The more detail, the better.",
    context: "booking",
    order: 4,
  },
  {
    step: "02",
    title: "Review & fit check",
    body: "Sonya reviews the request for fit, format, timing, and scope — typically within 2 business days.",
    context: "booking",
    order: 5,
  },
  {
    step: "03",
    title: "Follow-up & discovery",
    body: "Sonya follows up with availability and next steps. A short discovery call may be scheduled.",
    context: "booking",
    order: 6,
  },
];

// ---------------------------------------------------------------------------
// 7. Speaking Format
// ---------------------------------------------------------------------------
const speakingFormats = [
  {
    name: "Keynotes",
    duration: "45 – 90 min",
    description:
      "Stage presentations designed to shift mindset and deliver practical, memorable takeaways. Ideal for company-wide events, conferences, and wellbeing weeks.",
    order: 1,
  },
  {
    name: "Panels",
    duration: "60 – 90 min",
    description:
      "Facilitated conversations where Sonya brings a grounded wellness perspective to multi-speaker discussions on leadership, culture, and organizational performance.",
    order: 2,
  },
  {
    name: "Leadership Sessions",
    duration: "Half-day or Full-day",
    description:
      "Intimate, high-impact sessions for executive and senior teams focused on sustainable performance, stress management, and leading through change.",
    order: 3,
  },
];

// ---------------------------------------------------------------------------
// 8. Speaking Audience
// ---------------------------------------------------------------------------
const speakingAudiences = [
  { label: "Corporate all-hands and company-wide events", order: 1 },
  { label: "Government agency training days", order: 2 },
  { label: "HR and People team conferences", order: 3 },
  { label: "Leadership summits and executive offsites", order: 4 },
  { label: "Employee Resource Group events", order: 5 },
  { label: "Educational institution faculty days", order: 6 },
  { label: "Wellbeing weeks and wellness campaigns", order: 7 },
  { label: "Industry conferences and panels", order: 8 },
];

// ---------------------------------------------------------------------------
// 9. Guarantee
// ---------------------------------------------------------------------------
const guarantees = [
  {
    title: "Satisfaction Guaranteed",
    body: "If the session doesn't meet your expectations, we'll work with you to make it right — no questions asked.",
    order: 1,
  },
  {
    title: "Secure Payment",
    body: "All transactions are processed securely through Square — your payment details are never stored on our servers.",
    order: 2,
  },
  {
    title: "Flexible Scheduling",
    body: "Book at a time that works for your team. Sonya accommodates different time zones and organizational calendars.",
    order: 3,
  },
];

// ---------------------------------------------------------------------------
// 10. Stat
// ---------------------------------------------------------------------------
const stats = [
  { value: "200+", label: "Sessions Delivered", order: 1 },
  { value: "98%", label: "Client Satisfaction", order: 2 },
  { value: "50+", label: "Organizations Served", order: 3 },
  { value: "21+", label: "Years of Experience", order: 4 },
];

// ---------------------------------------------------------------------------
// 11. Booking Reason
// ---------------------------------------------------------------------------
const bookingReasons = [
  { label: "21+ years of U.S. Air Force service", order: 1 },
  { label: "Master of Education", order: 2 },
  { label: "Certified Leadership Development Specialist", order: 3 },
  { label: "Federal government leadership experience", order: 4 },
  { label: "100+ workshops and programs delivered", order: 5 },
  { label: "Engagements tailored — not templated", order: 6 },
];

// ---------------------------------------------------------------------------
// 12. FAQ (packages category)
// ---------------------------------------------------------------------------
const faqs = [
  {
    question: "What happens after I purchase a package?",
    answer:
      "You'll receive a confirmation email within minutes. Sonya or her team will reach out within 24 hours to schedule your discovery call and begin designing your custom engagement.",
    category: "packages",
    order: 100,
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Absolutely. If you start with a foundational package and decide you need more depth, the difference can be applied toward an upgrade at any time.",
    category: "packages",
    order: 101,
  },
  {
    question: "Are packages refundable?",
    answer:
      "We offer a full refund if you cancel at least 14 days before your scheduled session. Within 14 days, we'll reschedule at no extra cost. After delivery, our satisfaction guarantee applies.",
    category: "packages",
    order: 102,
  },
  {
    question: "Do you offer custom or enterprise pricing?",
    answer:
      "Yes. For organizations with unique needs, multi-session engagements, or large teams, reach out directly and Sonya will design a custom proposal.",
    category: "packages",
    order: 103,
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards, Apple Pay, Google Pay, and Cash App Pay through our secure Square checkout.",
    category: "packages",
    order: 104,
  },
];

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------
async function seed() {
  console.log("Seeding all content to Sanity...\n");

  await seedType("philosophy", philosophies);
  await seedType("timeline", timelineEntries);
  await seedType("affirmation", affirmations);
  await seedType("value", values);
  await seedType("serviceAudience", serviceAudiences);
  await seedType("processStep", processSteps);
  await seedType("speakingFormat", speakingFormats, "name");
  await seedType("speakingAudience", speakingAudiences, "label");
  await seedType("guarantee", guarantees);
  await seedType("stat", stats, "label");
  await seedType("bookingReason", bookingReasons, "label");
  await seedType("faq", faqs, "question");

  console.log("\nDone! All content seeded.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
