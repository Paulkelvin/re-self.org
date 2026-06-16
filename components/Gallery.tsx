"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { type GalleryImage } from "@/lib/gallery";

// The page only ever renders these 5 tiles, in this deliberate bento layout.
// Everything beyond the 5th lives in the lightbox, so the section's height
// never grows as the image list does.
const PREVIEW_COUNT = 5;
const PREVIEW_SPANS = [
  "col-span-2 aspect-[16/11] lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full",
  "aspect-square lg:col-span-2 lg:aspect-auto lg:h-full",
  "aspect-square lg:col-span-2 lg:aspect-auto lg:h-full",
  "aspect-square lg:col-span-2 lg:aspect-auto lg:h-full",
  "aspect-square lg:col-span-2 lg:aspect-auto lg:h-full",
];

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const total = images.length;
  const preview = images.slice(0, PREVIEW_COUNT);
  const extra = Math.max(0, total - PREVIEW_COUNT);

  // null = closed; otherwise the active image index.
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % total)),
    [total],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total],
  );

  // Keyboard navigation + background scroll lock while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, close, next, prev]);

  return (
    <section className="bg-beige py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-4 lg:px-8">
        <FadeIn direction="up">
          <div className="mb-10 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                Gallery
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-forest sm:text-4xl lg:text-[2.8rem]">
                Moments in the Room
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:items-end">
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Keynotes, workshops, and retreats — wellness and leadership in action
                across organizations nationwide.
              </p>
              <button
                type="button"
                onClick={() => setIndex(0)}
                className="group inline-flex items-center gap-2 rounded-full border border-forest/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-forest transition-all duration-200 hover:border-forest hover:bg-forest hover:text-white"
              >
                View all {total} photos
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Fixed 5-tile bento preview */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6 lg:auto-rows-[15rem] xl:auto-rows-[17rem]">
          {preview.map(({ src, label }, i) => {
            const isLast = i === PREVIEW_COUNT - 1;
            return (
              <FadeIn key={src} direction="up" delay={i * 80} className={PREVIEW_SPANS[i]}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Open ${label} in gallery`}
                  className="group relative h-full w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5"
                >
                  <Image
                    src={src}
                    alt={label}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 440px" : "(max-width: 1024px) 50vw, 440px"}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95"
                  />

                  {/* "+N more" affordance on the final preview tile */}
                  {isLast && extra > 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-forest-dark/55 text-white backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-forest-dark/65">
                      <span className="font-serif text-3xl font-semibold leading-none">+{extra}</span>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/85">
                        View gallery
                      </span>
                    </div>
                  )}

                  {/* Caption — always on mobile, reveals on hover at lg */}
                  {!(isLast && extra > 0) && (
                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4 lg:p-5">
                      <span aria-hidden="true" className="h-px w-5 shrink-0 bg-sage transition-all duration-300 group-hover:w-8" />
                      <span className="text-sm font-semibold text-white transition-all duration-300 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                        {label}
                      </span>
                    </div>
                  )}
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {open && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="animate-fade-in fixed inset-0 z-[100] flex flex-col bg-forest-dark/95 backdrop-blur-md"
          onClick={close}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 text-white/80 lg:px-8">
            <span className="font-mono text-xs tracking-widest">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex flex-1 items-center justify-center px-4 pb-2 lg:px-20" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-forest-dark/40 text-white transition-all hover:bg-white/15 lg:left-6"
            >
              <ArrowIcon dir="left" />
            </button>

            <figure key={index} className="animate-pop-in flex h-full max-h-[72vh] w-full max-w-[1100px] flex-col items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src={images[index].src}
                  alt={images[index].label}
                  fill
                  sizes="(max-width: 768px) 92vw, 80vw"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-2.5 text-white/85">
                <span aria-hidden="true" className="h-px w-6 bg-sage" />
                <span className="text-sm font-semibold tracking-wide">{images[index].label}</span>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-forest-dark/40 text-white transition-all hover:bg-white/15 lg:right-6"
            >
              <ArrowIcon dir="right" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex justify-center px-4 pb-5 pt-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  type="button"
                  key={img.src}
                  onClick={() => setIndex(i)}
                  aria-label={`View ${img.label}`}
                  aria-current={i === index}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                    i === index ? "ring-sage opacity-100" : "ring-transparent opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
