import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});

const packages = [
  {
    _type: "package",
    title: "Introductory Self-Care Workshop",
    subtitle: "A powerful first step toward a healthier, more resilient team",
    price: 0,
    priceLabel: "Free",
    priceSuffix: "",
    features: [
      "1.5-hour live facilitated session",
      "Evidence-based self-care frameworks",
      "Interactive group exercises & reflection",
      "Personalized self-care starter toolkit",
      "Actionable takeaways your team can use immediately",
    ],
    highlighted: false,
    ctaLabel: "Reserve Your Spot",
    squareItemId: "",
    order: 1,
  },
  {
    _type: "package",
    title: "Four-Week Self-Care Cohort",
    subtitle: "A transformative group journey to build lasting wellness habits",
    price: 50000,
    priceLabel: "$500",
    priceSuffix: "/cohort",
    features: [
      "Four 2-hour facilitated group sessions",
      "Weekly accountability & progress check-ins",
      "Custom self-care plan for each participant",
      "Private cohort community for peer support",
      "Guided journaling & reflection exercises",
      "Certificate of completion",
    ],
    highlighted: true,
    ctaLabel: "Join the Cohort",
    squareItemId: "",
    order: 2,
  },
  {
    _type: "package",
    title: "Individual Self-Care Coaching",
    subtitle: "One-on-one guidance tailored to your unique wellness goals",
    price: 10000,
    priceLabel: "$100",
    priceSuffix: "/hour",
    features: [
      "Private 1-on-1 coaching session",
      "Personalized wellness assessment",
      "Custom self-care action plan",
      "Burnout prevention strategies",
      "Follow-up resources & recommended practices",
      "Flexible scheduling across time zones",
    ],
    highlighted: false,
    ctaLabel: "Book a Session",
    squareItemId: "",
    order: 3,
  },
  {
    _type: "package",
    title: "Corporate Panel Discussions",
    subtitle: "Engaging expert-led conversations that spark organizational change",
    price: 50000,
    priceLabel: "From $500",
    priceSuffix: "",
    features: [
      "Moderated panel with wellness thought leaders",
      "Custom topic selection for your industry",
      "Live audience Q&A segment",
      "Pre-event planning & speaker coordination",
      "Post-event summary & key insights document",
      "Scalable for teams of any size",
    ],
    highlighted: false,
    ctaLabel: "Request a Quote",
    squareItemId: "",
    order: 4,
  },
];

async function seed() {
  console.log("Seeding packages to Sanity...");

  const existing = await client.fetch<{ _id: string; title: string }[]>(
    `*[_type == "package"]{ _id, title }`,
  );

  for (const pkg of packages) {
    const match = existing.find((e) => e.title === pkg.title);
    if (match) {
      await client.patch(match._id).set(pkg).commit();
      console.log(`  Updated: ${pkg.title}`);
    } else {
      await client.create(pkg);
      console.log(`  Created: ${pkg.title}`);
    }
  }

  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
