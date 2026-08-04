import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Background image for the homepage hero section.",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Homepage Hero — Small Label",
      type: "string",
      description: 'Small label above the headline, e.g. "Corporate Wellness · Keynote Speaker".',
    }),
    defineField({
      name: "heroHeadline",
      title: "Homepage Hero — Headline",
      type: "text",
      rows: 2,
      description: 'The big bold headline, e.g. "Stronger Leaders. Healthier Organizations." Put a line break where you want the text to wrap onto a new line.',
    }),
    defineField({
      name: "heroSubtext",
      title: "Homepage Hero — Description",
      type: "text",
      rows: 3,
      description: "The paragraph under the headline.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
