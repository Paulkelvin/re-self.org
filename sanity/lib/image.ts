import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** Build a URL for a Sanity image source (chain .width()/.height()/.url()). */
export function urlForImage(source: Image) {
  return builder.image(source);
}
