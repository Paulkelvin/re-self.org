export type FieldType =
  | "string"
  | "text"
  | "number"
  | "boolean"
  | "image"
  | "url"
  | "date"
  | "datetime"
  | "slug"
  | "select"
  | "array-strings"
  | "array-objects"
  | "portable-text"
  | "reference";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  rows?: number;
  objectFields?: FieldDef[];
  objectType?: string; // Sanity _type name for array-objects members
  refType?: string;
  autoFrom?: string;
  description?: string;
  initialValue?: unknown;
}

export interface SectionDef {
  label: string;
  type: string;
  titleField: string;
  fields: FieldDef[];
  singleton?: boolean;
  canCreate?: boolean;
  publicPath?: string;
}

const ORDER: FieldDef = { name: "order", label: "Order", type: "number", description: "Lower numbers appear first.", initialValue: 0 };

export const schemas: Record<string, SectionDef> = {
  siteSettings: {
    label: "Site Settings",
    type: "siteSettings",
    singleton: true,
    canCreate: false,
    titleField: "_type",
    fields: [{ name: "heroImage", label: "Hero Image", type: "image" }],
  },
  stat: {
    label: "Stats",
    type: "stat",
    titleField: "value",
    fields: [
      { name: "value", label: "Value", type: "string", required: true, placeholder: "e.g. 500+" },
      { name: "label", label: "Label", type: "string", required: true, placeholder: "e.g. Lives touched" },
      ORDER,
    ],
  },
  testimonial: {
    label: "Testimonials",
    type: "testimonial",
    titleField: "name",
    fields: [
      { name: "quote", label: "Quote", type: "text", required: true, rows: 4 },
      { name: "name", label: "Name", type: "string", required: true },
      { name: "role", label: "Role", type: "string" },
      { name: "org", label: "Organization", type: "string" },
      { name: "image", label: "Photo", type: "image" },
      ORDER,
    ],
  },
  affirmation: {
    label: "Affirmations",
    type: "affirmation",
    titleField: "title",
    fields: [
      { name: "title", label: "Section Title", type: "string", required: true },
      { name: "affirmations", label: "Affirmations", type: "array-strings", required: true },
      ORDER,
    ],
  },
  timeline: {
    label: "Timeline",
    type: "timeline",
    titleField: "title",
    fields: [
      { name: "period", label: "Period", type: "string", required: true },
      { name: "title", label: "Title", type: "string", required: true },
      { name: "description", label: "Description", type: "text", required: true, rows: 4 },
      ORDER,
    ],
  },
  achievement: {
    label: "Achievements",
    type: "achievement",
    titleField: "label",
    fields: [
      { name: "value", label: "Value", type: "string", required: true, placeholder: "e.g. M.Ed." },
      { name: "label", label: "Label", type: "string", required: true, placeholder: "e.g. Master of Education" },
      ORDER,
    ],
  },
  value: {
    label: "Values",
    type: "value",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Body", type: "text", required: true, rows: 4 },
      ORDER,
    ],
  },
  philosophy: {
    label: "Philosophy",
    type: "philosophy",
    titleField: "title",
    fields: [
      { name: "num", label: "Number", type: "string", required: true, placeholder: "e.g. 01" },
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Body", type: "text", required: true, rows: 4 },
      ORDER,
    ],
  },
  galleryImage: {
    label: "Gallery",
    type: "galleryImage",
    titleField: "label",
    fields: [
      { name: "image", label: "Image", type: "image", required: true },
      { name: "label", label: "Caption", type: "string", required: true },
      ORDER,
    ],
  },
  service: {
    label: "Services",
    type: "service",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Description", type: "text", required: true, rows: 3 },
      { name: "image", label: "Image", type: "image", required: true },
      ORDER,
    ],
  },
  serviceAudience: {
    label: "Service Audiences",
    type: "serviceAudience",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Description", type: "text", required: true, rows: 4 },
      ORDER,
    ],
  },
  processStep: {
    label: "Process Steps",
    type: "processStep",
    titleField: "title",
    fields: [
      { name: "step", label: "Step Number", type: "string", required: true, placeholder: "e.g. 1" },
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Description", type: "text", required: true, rows: 4 },
      { name: "context", label: "Context", type: "select", required: true, options: ["services", "booking"] },
      ORDER,
    ],
  },
  guarantee: {
    label: "Guarantees",
    type: "guarantee",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Description", type: "text", required: true, rows: 4 },
      ORDER,
    ],
  },
  faq: {
    label: "FAQs",
    type: "faq",
    titleField: "question",
    fields: [
      { name: "question", label: "Question", type: "string", required: true },
      { name: "answer", label: "Answer", type: "text", required: true, rows: 4 },
      { name: "category", label: "Category", type: "select", options: ["general", "packages"] },
      ORDER,
    ],
  },
  package: {
    label: "Programs",
    type: "package",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "subtitle", label: "Tagline", type: "string", required: true },
      { name: "price", label: "Price (in cents)", type: "number", required: true },
      { name: "priceLabel", label: "Price Label", type: "string", required: true, placeholder: "e.g. $299", description: "Shown to visitors, e.g. '$299'." },
      { name: "priceSuffix", label: "Price Suffix", type: "string", placeholder: "e.g. /session" },
      { name: "features", label: "Features", type: "array-strings", required: true },
      { name: "highlighted", label: "Most Popular?", type: "boolean", initialValue: false },
      { name: "ctaLabel", label: "Button Label", type: "string", placeholder: "Get Started", initialValue: "Get Started" },
      { name: "squareItemId", label: "Square Item ID", type: "string", description: "From your Square dashboard → Items." },
      ORDER,
    ],
  },
  topic: {
    label: "Speaking Topics",
    type: "topic",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "description", label: "Description", type: "text", required: true, rows: 3 },
      ORDER,
    ],
  },
  event: {
    label: "Events",
    type: "event",
    titleField: "title",
    publicPath: "/speaking-events",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "slug", label: "Slug", type: "slug", required: true, autoFrom: "title", description: "Used in the public URL. Auto-fill from title, then adjust if needed." },
      { name: "eventType", label: "Event Type", type: "select", required: true, options: ["Keynote", "Panel", "Workshop", "Retreat", "Podcast", "Conference"] },
      { name: "date", label: "Start Date", type: "datetime", required: true },
      { name: "endDate", label: "End Date (optional)", type: "datetime" },
      { name: "location", label: "Location", type: "string" },
      { name: "isVirtual", label: "Virtual Event?", type: "boolean", initialValue: false },
      { name: "description", label: "Description", type: "text", required: true, rows: 4 },
      { name: "coverImage", label: "Cover Image", type: "image", required: true },
      { name: "registrationUrl", label: "Registration URL", type: "url" },
      {
        name: "speakers",
        label: "Speakers",
        type: "array-objects",
        objectType: "speaker",
        objectFields: [
          { name: "name", label: "Name", type: "string", required: true },
          { name: "role", label: "Role", type: "string" },
          { name: "organization", label: "Organization", type: "string" },
          { name: "image", label: "Photo", type: "image" },
        ],
      },
      { name: "featured", label: "Featured?", type: "boolean", initialValue: false },
      { name: "showSaveToCalendar", label: "Show Save to Calendar?", type: "boolean", initialValue: false },
      ORDER,
    ],
  },
  speakingFormat: {
    label: "Speaking Formats",
    type: "speakingFormat",
    titleField: "name",
    fields: [
      { name: "name", label: "Format Name", type: "string", required: true },
      { name: "duration", label: "Duration", type: "string", required: true, placeholder: "e.g. 60–90 min" },
      { name: "description", label: "Description", type: "text", required: true, rows: 4 },
      ORDER,
    ],
  },
  speakingAudience: {
    label: "Speaking Audiences",
    type: "speakingAudience",
    titleField: "label",
    fields: [
      { name: "label", label: "Audience Label", type: "string", required: true },
      ORDER,
    ],
  },
  bookingReason: {
    label: "Booking Reasons",
    type: "bookingReason",
    titleField: "label",
    fields: [
      { name: "label", label: "Reason", type: "string", required: true },
      ORDER,
    ],
  },
  author: {
    label: "Authors",
    type: "author",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "string", required: true },
      { name: "role", label: "Role", type: "string" },
      { name: "avatar", label: "Avatar", type: "image" },
    ],
  },
  article: {
    label: "Articles",
    type: "article",
    titleField: "title",
    publicPath: "/newsletter",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "slug", label: "Slug", type: "slug", required: true, autoFrom: "title", description: "Used in the public URL. Auto-fill from title, then adjust if needed." },
      { name: "excerpt", label: "Excerpt", type: "text", required: true, rows: 3 },
      { name: "category", label: "Category", type: "select", required: true, options: ["Leadership", "Wellness", "Mindset", "Resilience", "Personal Growth"] },
      { name: "coverImage", label: "Cover Image", type: "image", required: true },
      { name: "publishedAt", label: "Published Date", type: "date", required: true },
      { name: "readingTime", label: "Reading Time (minutes)", type: "number", required: true, description: "Estimated minutes to read." },
      { name: "author", label: "Author", type: "reference", refType: "author", required: true },
      { name: "featured", label: "Featured?", type: "boolean", initialValue: false },
      { name: "body", label: "Body", type: "portable-text", required: true },
    ],
  },
};

export const navGroups = [
  {
    group: "Homepage",
    items: [
      { key: "siteSettings", label: "Site Settings" },
      { key: "stat", label: "Stats" },
      { key: "testimonial", label: "Testimonials" },
      { key: "affirmation", label: "Affirmations" },
    ],
  },
  {
    group: "About",
    items: [
      { key: "timeline", label: "Timeline" },
      { key: "achievement", label: "Achievements" },
      { key: "value", label: "Values" },
      { key: "philosophy", label: "Philosophy" },
      { key: "galleryImage", label: "Gallery" },
    ],
  },
  {
    group: "Services",
    items: [
      { key: "service", label: "Services" },
      { key: "serviceAudience", label: "Audiences" },
      { key: "processStep", label: "Process Steps" },
      { key: "guarantee", label: "Guarantees" },
      { key: "faq", label: "FAQs" },
    ],
  },
  {
    group: "Programs",
    items: [
      { key: "package", label: "Programs" },
      { key: "topic", label: "Speaking Topics" },
    ],
  },
  {
    group: "Speaking & Events",
    items: [
      { key: "event", label: "Events" },
      { key: "speakingFormat", label: "Formats" },
      { key: "speakingAudience", label: "Audiences" },
      { key: "bookingReason", label: "Booking Reasons" },
    ],
  },
  {
    group: "Journal",
    items: [
      { key: "article", label: "Articles" },
      { key: "author", label: "Authors" },
    ],
  },
];
