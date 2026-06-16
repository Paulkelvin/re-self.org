interface Props {
  className?: string;
  /** Spin the opposite direction for visual variety between instances. */
  reverse?: boolean;
}

/**
 * Ambient brand graphic — concentric "wellness orbit" rings with small
 * orbiting markers. The whole SVG rotates slowly; because the rings are
 * concentric, the motion only reads on the off-center dots, giving a calm,
 * continuous orbit that echoes the footer sphere and the spinning accents on
 * the About/Services heroes. Decorative only (uses currentColor, so tint it
 * with a `text-*` class and dial opacity at the call site).
 */
export function BrandOrbit({ className = "", reverse = false }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={`${reverse ? "animate-spin-slow-reverse" : "animate-spin-slow"} ${className}`}
    >
      <g strokeWidth="0.5">
        <circle cx="100" cy="100" r="94" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="46" />
        <circle cx="100" cy="100" r="22" />
      </g>
      {/* Off-center markers — these are what visibly orbit */}
      <circle cx="100" cy="6" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="100" cy="30" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="170" cy="100" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
