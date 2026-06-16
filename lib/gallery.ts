import { groq } from "next-sanity";
import type { Image } from "sanity";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export interface GalleryImage {
  src: string;
  /** Short caption shown on hover / in the lightbox. */
  label: string;
}

// Sourced from Sanity. Add images in the Studio (Gallery Image) — the page
// renders a fixed preview and the rest appear in the lightbox automatically.
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const data = await client.fetch<{ image: Image; label: string }[]>(
    groq`*[_type == "galleryImage"] | order(order asc){ image, label }`,
  );
  return data.map((g) => ({
    label: g.label,
    src: urlForImage(g.image).width(1400).quality(80).url(),
  }));
}
