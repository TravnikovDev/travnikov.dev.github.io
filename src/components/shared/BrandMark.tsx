import React from "react";

/**
 * The turquoise brand sphere, as a ~1KB inline SVG.
 *
 * The hero renders the real thing: an R3F canvas with a distort material and
 * a generated environment map. Putting that in the header would mount a WebGL
 * context and render an env cubemap on every page of the site, to draw
 * something the size of a full stop — which is exactly the performance cost
 * worth avoiding. At this size the wobble is invisible anyway, so this is a
 * static match: same hue, same specular, no canvas, no JS, no repaint.
 */
export default function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="bm-body" cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#9fe8db" />
          <stop offset="42%" stopColor="#4fc3b0" />
          <stop offset="100%" stopColor="#1f6f63" />
        </radialGradient>
        {/* light bouncing back up off the surface below */}
        <radialGradient id="bm-bounce" cx="62%" cy="88%" r="48%">
          <stop offset="0%" stopColor="#8fe4d6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8fe4d6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bm-spec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill="url(#bm-body)" />
      <circle cx="32" cy="32" r="30" fill="url(#bm-bounce)" />
      {/* clearcoat highlight, offset up-left to match the hero's key light */}
      <ellipse cx="23" cy="19" rx="12" ry="9" fill="url(#bm-spec)" />
      {/* rim, so it holds its edge against a light header */}
      <circle
        cx="32"
        cy="32"
        r="29.4"
        fill="none"
        stroke="#1a5a50"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
    </svg>
  );
}
