import type { SchemaTypeDefinition } from "sanity";

import { service } from "./service";
import { topic } from "./topic";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { credential } from "./credential";
import { achievement } from "./achievement";
import { galleryImage } from "./galleryImage";
import { author } from "./author";
import { article } from "./article";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Site content
  service,
  topic,
  testimonial,
  faq,
  credential,
  achievement,
  galleryImage,
  // Journal
  author,
  article,
];
