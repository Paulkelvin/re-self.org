import { defineArrayMember, defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
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
      name: "eventType",
      title: "Event type",
      type: "string",
      options: {
        list: [
          { title: "Keynote", value: "Keynote" },
          { title: "Panel", value: "Panel" },
          { title: "Workshop", value: "Workshop" },
          { title: "Retreat", value: "Retreat" },
          { title: "Podcast", value: "Podcast" },
          { title: "Conference", value: "Conference" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Start date & time",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date & time",
      type: "datetime",
      description: "Optional — for multi-day events like retreats.",
    }),
    defineField({
      name: "location",
      type: "string",
      description: 'e.g. "Zoom", "Hope Houston, TX", "Bamble Beach Villa, Jamaica"',
    }),
    defineField({
      name: "isVirtual",
      title: "Virtual event?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      description: "Link for attendees to register or RSVP.",
    }),
    defineField({
      name: "speakers",
      title: "Speakers / Co-hosts",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "speaker",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "role",
              type: "string",
              description: 'e.g. "Host", "Panelist", "Facilitator", "Guest"',
            }),
            defineField({ name: "organization", type: "string" }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "showSaveToCalendar",
      title: "Show Save to Calendar",
      type: "boolean",
      description: "Show a Save to Calendar button on this event's card.",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Pin this event as the featured hero event.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Date (newest)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "coverImage" },
  },
});
