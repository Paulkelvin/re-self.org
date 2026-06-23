import { defineField, defineType } from "sanity";

export const affirmation = defineType({
  name: "affirmation",
  title: "Affirmation",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "affirmations",
      title: "Affirmations",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title" } },
});
