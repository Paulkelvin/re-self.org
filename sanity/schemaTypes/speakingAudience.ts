import { defineField, defineType } from "sanity";

export const speakingAudience = defineType({
  name: "speakingAudience",
  title: "Speaking Audience",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "label" } },
});
