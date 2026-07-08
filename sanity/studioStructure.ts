import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Re-Self Studio")
    .items([
      // ── Site Settings ──────────────────────────────────────────────
      S.listItem()
        .title("Site Settings")
        .icon(() => "⚙️")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),

      S.divider(),

      // ── Homepage ───────────────────────────────────────────────────
      S.listItem()
        .title("Homepage")
        .icon(() => "🏠")
        .child(
          S.list()
            .title("Homepage")
            .items([
              S.documentTypeListItem("stat").title("Stats"),
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("affirmation").title("Affirmations"),
            ])
        ),

      // ── About ─────────────────────────────────────────────────────
      S.listItem()
        .title("About")
        .icon(() => "👤")
        .child(
          S.list()
            .title("About")
            .items([
              S.documentTypeListItem("timeline").title("Timeline"),
              S.documentTypeListItem("achievement").title("Achievements"),
              S.documentTypeListItem("value").title("Values"),
              S.documentTypeListItem("philosophy").title("Philosophy"),
              S.documentTypeListItem("galleryImage").title("Gallery"),
            ])
        ),

      // ── Services ──────────────────────────────────────────────────
      S.listItem()
        .title("Services")
        .icon(() => "🛠️")
        .child(
          S.list()
            .title("Services")
            .items([
              S.documentTypeListItem("service").title("Services"),
              S.documentTypeListItem("serviceAudience").title("Audience Types"),
              S.documentTypeListItem("processStep").title("Process Steps"),
              S.documentTypeListItem("guarantee").title("Guarantees"),
              S.documentTypeListItem("faq").title("FAQs"),
            ])
        ),

      // ── Programs ──────────────────────────────────────────────────
      S.listItem()
        .title("Programs")
        .icon(() => "📦")
        .child(
          S.list()
            .title("Programs")
            .items([
              S.documentTypeListItem("package").title("Packages"),
              S.documentTypeListItem("topic").title("Topics"),
            ])
        ),

      // ── Speaking & Events ─────────────────────────────────────────
      S.listItem()
        .title("Speaking & Events")
        .icon(() => "🎤")
        .child(
          S.list()
            .title("Speaking & Events")
            .items([
              S.documentTypeListItem("event").title("Events"),
              S.documentTypeListItem("speakingFormat").title("Speaking Formats"),
              S.documentTypeListItem("speakingAudience").title("Speaking Audiences"),
              S.documentTypeListItem("bookingReason").title("Booking Reasons"),
            ])
        ),

      // ── Journal ───────────────────────────────────────────────────
      S.listItem()
        .title("Journal")
        .icon(() => "📝")
        .child(
          S.list()
            .title("Journal")
            .items([
              S.documentTypeListItem("article").title("Articles"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),
    ]);
