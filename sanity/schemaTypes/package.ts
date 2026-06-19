import { defineField, defineType } from "sanity";

export const pkg = defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "subtitle",
      title: "Short tagline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (cents)",
      type: "number",
      description: "Price in cents, e.g. 29900 = $299.00",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "priceLabel",
      title: "Price display label",
      type: "string",
      description: 'e.g. "$299", "$1,499", "Custom"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "priceSuffix",
      title: "Price suffix",
      type: "string",
      description: 'e.g. "/session", "/program", "" (leave empty for one-time)',
    }),
    defineField({
      name: "features",
      title: "Included features",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "highlighted",
      title: "Most popular?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "Button label",
      type: "string",
      initialValue: "Get Started",
    }),
    defineField({
      name: "squareItemId",
      title: "Square Catalog Item ID",
      type: "string",
      description: "Links this package to a Square catalog item for checkout.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "priceLabel" },
  },
});
