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
  refType?: string;
  autoFrom?: string;
}

export interface SectionDef {
  label: string;
  type: string;
  titleField: string;
  fields: FieldDef[];
  singleton?: boolean;
  canCreate?: boolean;
}

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
      { name: "order", label: "Order", type: "number" },
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
      { name: "order", label: "Order", type: "number" },
    ],
  },
  affirmation: {
    label: "Affirmations",
    type: "affirmation",
    titleField: "title",
    fields: [
      { name: "title", label: "Section Title", type: "string", required: true },
      { name: "affirmations", label: "Affirmations", type: "array-strings", required: true },
      { name: "order", label: "Order", type: "number" },
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
      { name: "order", label: "Order", type: "number" },
    ],
  },
  achievement: {
    label: "Achievements",
    type: "achievement",
    titleField: "label",
    fields: [
      { name: "value", label: "Value", type: "string", required: true, placeholder: "e.g. M.Ed." },
      { name: "label", label: "Label", type: "string", required: true, placeholder: "e.g. Master of Education" },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  value: {
    label: "Values",
    type: "value",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Body", type: "text", required: true, rows: 4 },
      { name: "order", label: "Order", type: "number" },
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
      { name: "order", label: "Order", type: "number" },
    ],
  },
  galleryImage: {
    label: "Gallery",
    type: "galleryImage",
    titleField: "label",
    fields: [
      { name: "image", label: "Image", type: "image", required: true },
      { name: "label", label: "Caption", type: "string", required: true },
      { name: "order", label: "Order", type: "number" },
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
      { name: "order", label: "Order", type: "number" },
    ],
  },
  serviceAudience: {
    label: "Service Audiences",
    type: "serviceAudience",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Description", type: "text", required: true, rows: 4 },
      { name: "order", label: "Order", type: "number" },
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
      { name: "order", label: "Order", type: "number" },
    ],
  },
  guarantee: {
    label: "Guarantees",
    type: "guarantee",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "body", label: "Description", type: "text", required: true, rows: 4 },
      { name: "order", label: "Order", type: "number" },
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
      { name: "order", label: "Order", type: "number" },
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
      { name: "priceLabel", label: "Price Label", type: "string", required: true, placeholder: "e.g. $299" },
      { name: "priceSuffix", label: "Price Suffix", type: "string", placeholder: "e.g. /session" },
      { name: "features", label: "Features", type: "array-strings", required: true },
      { name: "highlighted", label: "Most Popular?", type: "boolean" },
      { name: "ctaLabel", label: "Button Label", type: "string", placeholder: "Get Started" },
      { name: "squareItemId", label: "Square Item ID", type: "string" },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  topic: {
    label: "Speaking Topics",
    type: "topic",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "description", label: "Description", type: "text", required: true, rows: 3 },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  event: {
    label: "Events",
    type: "event",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "slug", label: "Slug", type: "slug", required: true, autoFrom: "title" },
      { name: "eventType", label: "Event Type", type: "select", required: true, options: ["Keynote", "Panel", "Workshop", "Retreat", "Podcast", "Conference"] },
      { name: "date", label: "Start Date", type: "datetime", required: true },
      { name: "endDate", label: "End Date (optional)", type: "datetime" },
      { name: "location", label: "Location", type: "string" },
      { name: "isVirtual", label: "Virtual Event?", type: "boolean" },
      { name: "description", label: "Description", type: "text", required: true, rows: 4 },
      { name: "coverImage", label: "Cover Image", type: "image", required: true },
      { name: "registrationUrl", label: "Registration URL", type: "url" },
      {
        name: "speakers",
        label: "Speakers",
        type: "array-objects",
        objectFields: [
          { name: "name", label: "Name", type: "string", required: true },
          { name: "role", label: "Role", type: "string" },
          { name: "organization", label: "Organization", type: "string" },
          { name: "image", label: "Photo", type: "image" },
        ],
      },
      { name: "featured", label: "Featured?", type: "boolean" },
      { name: "showSaveToCalendar", label: "Show Save to Calendar?", type: "boolean" },
      { name: "order", label: "Order", type: "number" },
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
      { name: "order", label: "Order", type: "number" },
    ],
  },
  speakingAudience: {
    label: "Speaking Audiences",
    type: "speakingAudience",
    titleField: "label",
    fields: [
      { name: "label", label: "Audience Label", type: "string", required: true },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  bookingReason: {
    label: "Booking Reasons",
    type: "bookingReason",
    titleField: "label",
    fields: [
      { name: "label", label: "Reason", type: "string", required: true },
      { name: "order", label: "Order", type: "number" },
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
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "slug", label: "Slug", type: "slug", required: true, autoFrom: "title" },
      { name: "excerpt", label: "Excerpt", type: "text", required: true, rows: 3 },
      { name: "category", label: "Category", type: "string", required: true },
      { name: "coverImage", label: "Cover Image", type: "image", required: true },
      { name: "publishedAt", label: "Published Date", type: "date", required: true },
      { name: "readingTime", label: "Reading Time (minutes)", type: "number", required: true },
      { name: "author", label: "Author", type: "reference", refType: "author", required: true },
      { name: "featured", label: "Featured?", type: "boolean" },
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
