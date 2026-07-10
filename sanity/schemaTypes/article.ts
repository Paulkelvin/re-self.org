import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Journal Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "One- or two-sentence summary used on cards and meta descriptions.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "Leadership" },
          { title: "Wellness", value: "Wellness" },
          { title: "Mindset", value: "Mindset" },
          { title: "Resilience", value: "Resilience" },
          { title: "Personal Growth", value: "Personal Growth" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published date", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "readingTime",
      title: "Reading time (minutes)",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "At most one article should be featured.",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          // Paragraphs (normal), section headings (h2), and bullet lists.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [],
          },
        }),
        // Pull-quote with optional attribution.
        defineArrayMember({
          type: "object",
          name: "quote",
          title: "Pull Quote",
          fields: [
            { name: "text", type: "text", rows: 3, validation: (r) => r.required() },
            { name: "cite", title: "Attribution", type: "string" },
          ],
          preview: {
            select: { title: "text", subtitle: "cite" },
            prepare: ({ title, subtitle }) => ({
              title: title ? `“${title}”` : "Quote",
              subtitle,
            }),
          },
        }),
      ],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
