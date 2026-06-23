import type { SchemaTypeDefinition } from "sanity";

import { service } from "./service";
import { topic } from "./topic";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { achievement } from "./achievement";
import { galleryImage } from "./galleryImage";
import { author } from "./author";
import { article } from "./article";
import { pkg } from "./package";
import { event } from "./event";
import { philosophy } from "./philosophy";
import { timeline } from "./timeline";
import { affirmation } from "./affirmation";
import { value } from "./value";
import { serviceAudience } from "./serviceAudience";
import { processStep } from "./processStep";
import { speakingFormat } from "./speakingFormat";
import { speakingAudience } from "./speakingAudience";
import { guarantee } from "./guarantee";
import { stat } from "./stat";
import { bookingReason } from "./bookingReason";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Site content
  siteSettings,
  service,
  topic,
  testimonial,
  faq,
  achievement,
  galleryImage,
  pkg,
  event,
  philosophy,
  timeline,
  affirmation,
  value,
  serviceAudience,
  processStep,
  speakingFormat,
  speakingAudience,
  guarantee,
  stat,
  bookingReason,
  // Journal
  author,
  article,
];
