/**
 * Newsletter / Journal content.
 *
 * This is the single source of truth for articles today. It is shaped to map
 * cleanly onto a future Sanity schema so the migration is a drop-in: replace
 * the hardcoded `articles` array with a Sanity fetch that returns the same
 * `Article` shape, and the pages/components below keep working unchanged.
 *
 *   Article.body  ->  Portable Text (each block maps 1:1 to the union below)
 *   Article.*     ->  document fields of the same name
 */

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  /** URL-safe identifier — becomes the Sanity slug. */
  slug: string;
  title: string;
  /** One- or two-sentence summary used on cards and meta descriptions. */
  excerpt: string;
  category: string;
  coverImage: string;
  /** ISO 8601 date string. */
  publishedAt: string;
  /** Estimated reading time, in minutes. */
  readingTime: number;
  author: Author;
  /** At most one article should be flagged featured. */
  featured?: boolean;
  body: ArticleBlock[];
}

const SONYA: Author = {
  name: "Sonya Harris",
  role: "Founder, Re-Self Wellness",
  avatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=160&h=160&q=85",
};

export const articles: Article[] = [
  {
    slug: "wellness-is-a-leadership-strategy",
    title: "Wellness Is Not a Perk. It's a Leadership Strategy.",
    excerpt:
      "Why the highest-performing teams treat wellbeing as infrastructure — not a benefit to be cut when budgets tighten.",
    category: "Leadership",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    publishedAt: "2026-05-28",
    readingTime: 6,
    author: SONYA,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "For most of my 21 years in the Air Force, wellness was never framed as a luxury. It was readiness. A team that isn't rested, regulated, and resourced doesn't perform — it fails, often at the worst possible moment. I've carried that lesson into every organization I work with since.",
      },
      {
        type: "paragraph",
        text: "Yet in corporate settings, wellbeing is still treated as a perk: a meditation app license, a wellness week, a fruit bowl in the break room. These things aren't wrong. They're just not a strategy. And when the quarter gets hard, they're the first line item to disappear.",
      },
      { type: "heading", text: "Reframe wellbeing as infrastructure" },
      {
        type: "paragraph",
        text: "Infrastructure is what everything else runs on. You don't celebrate it; you depend on it. When leaders start treating their people's capacity the same way they treat their data systems or supply chains, the conversation changes entirely.",
      },
      {
        type: "quote",
        text: "Burnout is not a personal failure of resilience. It is, far more often, a structural failure of leadership.",
        cite: "Sonya Harris",
      },
      {
        type: "paragraph",
        text: "Three shifts move wellbeing from perk to strategy in nearly every team I've advised:",
      },
      {
        type: "list",
        items: [
          "Measure capacity, not just output. Track the leading indicators of burnout before they show up in attrition.",
          "Make recovery a visible norm. When senior leaders model rest, the rest of the organization is allowed to.",
          "Design the load, don't just manage the symptoms. Most burnout is a workload problem wearing a wellness costume.",
        ],
      },
      {
        type: "paragraph",
        text: "The organizations that thrive over the next decade won't be the ones with the most aggressive targets. They'll be the ones whose people can still hit those targets in year five without breaking. That is a leadership decision — and it starts long before anyone feels tired.",
      },
    ],
  },
  {
    slug: "the-myth-of-the-quick-fix-reset",
    title: "The Myth of the Quick-Fix Reset",
    excerpt:
      "A weekend off doesn't undo a year of depletion. Here's what actually restores capacity — and why it takes rhythm, not heroics.",
    category: "Resilience",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85",
    publishedAt: "2026-05-12",
    readingTime: 5,
    author: SONYA,
    body: [
      {
        type: "paragraph",
        text: "Every January and every summer, I watch the same pattern: exhausted leaders book a retreat, a long weekend, a digital detox — and expect to come back whole. They return rested, briefly, and depleted again within two weeks. The reset didn't fail them. The expectation did.",
      },
      { type: "heading", text: "Depletion compounds; so does recovery" },
      {
        type: "paragraph",
        text: "Capacity isn't a tank you empty and refill on demand. It's closer to a financial account that earns or loses interest daily. Small, consistent deposits — sleep, boundaries, movement, connection — compound. So do the withdrawals. One big deposit can't offset a year of overdraft.",
      },
      {
        type: "quote",
        text: "Sustainable performance is built in the ordinary week, not rescued on the extraordinary weekend.",
      },
      {
        type: "paragraph",
        text: "When I work with executive teams, we stop chasing the dramatic reset and start engineering the unremarkable rhythm: protected recovery windows, realistic load, and recovery that's scheduled with the same seriousness as a board meeting.",
      },
      {
        type: "list",
        items: [
          "Replace the annual reset with a weekly one you actually keep.",
          "Protect sleep first — it's the multiplier on every other intervention.",
          "Treat recovery as a calendar commitment, not a reward you earn after the work.",
        ],
      },
      {
        type: "paragraph",
        text: "The quick fix is seductive because it asks nothing of the system that caused the depletion. Real renewal is quieter, slower, and far more durable. It's also the only kind that lasts.",
      },
    ],
  },
  {
    slug: "leading-through-change-without-burning-out",
    title: "Leading Through Change Without Burning Out Your Team",
    excerpt:
      "Reorganizations, new mandates, constant pivots. How to carry a team through uncertainty while protecting the energy they'll need on the other side.",
    category: "Leadership",
    coverImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=85",
    publishedAt: "2026-04-22",
    readingTime: 7,
    author: SONYA,
    body: [
      {
        type: "paragraph",
        text: "Change is not the problem. Unmetabolized change is. Teams can absorb an extraordinary amount of disruption when they understand it, trust the people leading it, and are given room to process it. They break when change arrives faster than they can make sense of it.",
      },
      { type: "heading", text: "Name the cost out loud" },
      {
        type: "paragraph",
        text: "In the military, we never pretended a hard transition was easy. We named it, planned for it, and resourced it. The most damaging thing a leader can do during change is perform optimism while the team feels the strain. People don't need you to be unbothered. They need you to be honest and steady.",
      },
      {
        type: "quote",
        text: "Your team can handle the truth about how hard this is. What erodes trust is pretending it isn't.",
      },
      { type: "heading", text: "Protect the recovery, not just the timeline" },
      {
        type: "paragraph",
        text: "Every change initiative has a project plan. Almost none have a recovery plan. Yet the team that delivers the reorganization still has to operate the week after it ships. Build in the downshift deliberately, or the organization will pay for it in turnover and quiet quitting later.",
      },
      {
        type: "list",
        items: [
          "Communicate more often than feels necessary — uncertainty fills silence with worst-case stories.",
          "Cut something for every new thing you add. Change without subtraction is just accumulation.",
          "Schedule the recovery before the push, not after the damage.",
        ],
      },
      {
        type: "paragraph",
        text: "Leading through change is less about charisma and more about care under pressure. The leaders people follow into uncertainty are the ones who've shown they'll protect them inside it.",
      },
    ],
  },
  {
    slug: "self-care-beyond-the-buzzword",
    title: "Self-Care Beyond the Buzzword",
    excerpt:
      "Self-care has been flattened into bath bombs and spa days. The real practice is far less glamorous — and far more powerful.",
    category: "Wellness",
    coverImage:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1600&q=85",
    publishedAt: "2026-04-03",
    readingTime: 4,
    author: SONYA,
    body: [
      {
        type: "paragraph",
        text: "Somewhere along the way, self-care got rebranded as self-indulgence. The marketing version is soft lighting and an expensive candle. The real version is often the opposite: saying no to a meeting, having the hard conversation, going to bed on time when you'd rather scroll.",
      },
      {
        type: "quote",
        text: "Real self-care is frequently the least relaxing thing on your list — and the most necessary.",
      },
      {
        type: "paragraph",
        text: "I define self-care as any decision that honors your future self over your present comfort. Sometimes that looks restful. Often it looks like discipline. The two are not opposites; in my experience they're the same muscle.",
      },
      {
        type: "list",
        items: [
          "Boundaries are self-care. Every yes you protect is a no you were willing to say.",
          "Honesty is self-care. Carrying an unspoken resentment costs more than the awkward conversation.",
          "Maintenance is self-care. The unglamorous basics — sleep, food, movement — outperform every hack.",
        ],
      },
      {
        type: "paragraph",
        text: "When you strip away the aesthetics, self-care is just leadership pointed inward: the willingness to make the responsible choice when the easy one is right there. That's available to everyone, on any budget, today.",
      },
    ],
  },
  {
    slug: "building-habits-that-survive-pressure",
    title: "Building Habits That Survive Pressure",
    excerpt:
      "Most habits collapse the moment life gets hard — exactly when you need them most. How to design routines that hold under load.",
    category: "Habits",
    coverImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=85",
    publishedAt: "2026-03-18",
    readingTime: 6,
    author: SONYA,
    body: [
      {
        type: "paragraph",
        text: "Anyone can keep a routine on a good week. The test of a habit is what happens during a bad one — the deadline, the crisis, the travel stretch. That's when the well-intentioned morning ritual quietly disappears, and with it the stability you built it for.",
      },
      { type: "heading", text: "Design for your worst week, not your best" },
      {
        type: "paragraph",
        text: "Military training taught me to build for the conditions you'll actually face, not the ones you hope for. A habit engineered for a calm Tuesday is fragile by design. Shrink it until it's almost embarrassingly small, and it becomes nearly unbreakable.",
      },
      {
        type: "quote",
        text: "A two-minute habit you keep under pressure beats a one-hour habit you abandon the moment it matters.",
      },
      {
        type: "list",
        items: [
          "Anchor new habits to something you already do without fail.",
          "Define a 'minimum viable' version for hard days — the floor you never go below.",
          "Track consistency, not intensity. Showing up imperfectly compounds; perfectionism quits.",
        ],
      },
      {
        type: "paragraph",
        text: "The goal isn't an impressive routine. It's a resilient one — small enough to survive your hardest seasons, and therefore present when you need it most. Durability beats ambition every time.",
      },
    ],
  },
  {
    slug: "what-the-military-taught-me-about-rest",
    title: "What the Military Taught Me About Rest",
    excerpt:
      "The most disciplined environment I've ever worked in took recovery more seriously than any corporation I've advised since. Here's why.",
    category: "Resilience",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    publishedAt: "2026-02-26",
    readingTime: 5,
    author: SONYA,
    body: [
      {
        type: "paragraph",
        text: "People are often surprised when I say the military taught me to rest. They picture relentless intensity — and there's plenty of that. But sustained operations require sustained people, and you cannot sustain people you never let recover. Rest wasn't soft. It was operational.",
      },
      {
        type: "quote",
        text: "We didn't rest because we'd earned it. We rested because the mission depended on it.",
      },
      {
        type: "paragraph",
        text: "Recovery was planned, not improvised. It was protected by leadership, not left to individual willpower. And critically, it was understood as part of the work — not a reward that came after it. That single reframe would transform most of the corporate cultures I see today.",
      },
      {
        type: "list",
        items: [
          "Plan recovery into the operation; don't leave it to chance.",
          "Make rest a leadership responsibility, not a personal indulgence.",
          "Judge readiness by sustainability, not by how hard someone is willing to push today.",
        ],
      },
      {
        type: "paragraph",
        text: "The strongest teams I've ever served on weren't the ones who pushed hardest. They were the ones who knew exactly when to recover — and had leaders who made sure they did.",
      },
    ],
  },
];

/** Distinct categories, in first-seen order, for filter UI. */
export const categories: string[] = Array.from(
  new Set(articles.map((a) => a.category)),
);

export const featuredArticle: Article =
  articles.find((a) => a.featured) ?? articles[0];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Human-readable date, e.g. "May 28, 2026". */
export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
