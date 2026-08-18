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
      name: "heroSubtext",
      title: "Homepage Hero — Description",
      type: "text",
      rows: 3,
      description: "The paragraph in the hero's workshops/retreats panel.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
