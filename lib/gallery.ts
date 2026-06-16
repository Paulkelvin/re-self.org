export interface GalleryImage {
  src: string;
  /** Short caption shown on hover / in the lightbox. */
  label: string;
}

// Single source of truth for the homepage gallery. Add as many as you like —
// the page only renders a fixed 5-tile preview; the rest appear in the
// lightbox ("View all"). No layout changes needed when this list grows.
export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    label: "Keynotes & Sessions",
  },
  {
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80",
    label: "Team Workshops",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=80",
    label: "Wellbeing Practice",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1100&q=80",
    label: "Leadership Sessions",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1100&q=80",
    label: "Executive Retreats",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1100&q=80",
    label: "Group Coaching",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1100&q=80",
    label: "Strategy Offsites",
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1100&q=80",
    label: "Cohort Programs",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1100&q=80",
    label: "Conference Stages",
  },
];
