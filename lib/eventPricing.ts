import type { SiteEvent } from "@/lib/content";

export function getCurrentEventPrice(event: SiteEvent): number | null {
  if (!event.earlyBirdPrice && !event.regularPrice) return null;
  if (event.earlyBirdPrice && event.regularPrice && event.earlyBirdDeadline) {
    const deadline = new Date(event.earlyBirdDeadline + "T23:59:59");
    return new Date() <= deadline ? event.earlyBirdPrice : event.regularPrice;
  }
  return event.regularPrice ?? event.earlyBirdPrice ?? null;
}
