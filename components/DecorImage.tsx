"use client";

import { useState } from "react";

interface Props {
  src: string;
  className?: string;
}

/**
 * Purely decorative image that quietly removes itself if the asset fails to
 * load (no broken-image glyph). Hidden from assistive tech. Use for accent
 * graphics where a missing file should leave no trace.
 */
export function DecorImage({ src, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
