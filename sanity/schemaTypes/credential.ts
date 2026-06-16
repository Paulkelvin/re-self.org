import { defineField, defineType } from "sanity";

// The dark "credibility bar" stats on the homepage (e.g. "21+" / "Years…").
export const credential = defineType({
  name: "credential",
  title: "Credential Stat",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'Big figure, e.g. "21+" or "Thousands"',
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
