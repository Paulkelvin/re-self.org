import { defineField, defineType } from "sanity";

export const serviceAudience = defineType({
  name: "serviceAudience",
  title: "Service Audience",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title" } },
});
