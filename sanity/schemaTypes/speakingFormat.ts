import { defineField, defineType } from "sanity";

export const speakingFormat = defineType({
  name: "speakingFormat",
  title: "Speaking Format",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "duration", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "duration" } },
});
