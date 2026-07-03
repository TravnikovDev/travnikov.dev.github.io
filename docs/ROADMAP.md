# Redesign Roadmap — Remaining Work

> Status: hero shipped through the cinematic art-direction + palette passes
> (Jul 2026, commits `fda8564`..`47d1219`). This file tracks what's left.
> Vision: [DESIGN_VISION.md](./DESIGN_VISION.md) · Original hero plan:
> [HERO_REDESIGN_PLAN.md](./HERO_REDESIGN_PLAN.md) (phases 1–5 complete).

## Track A — Hero: last gaps vs the reference

> A1–A3 shipped in `6a1a657` (Jul 2026).

- **A1. Silk volume.** ✅ Reference folds are wider/more voluminous with
  soft-focus edges; ours are narrower strands. Lower fold frequency a touch,
  raise relief amplitude, vary edge softness per fold (some crisp, some
  defocused) in `src/components/3d/FluidBackground.tsx`.
- **A2. Signature dark droplet.** ✅ One deliberate dark teardrop anchoring the
  band (reference places it just below the crystal). Add an explicit
  parameterized dark blob in the shader — position/size tunable — instead of
  relying on noise-mask intersections.
- **A3. Glyph grounding.** ✅ Put the dark droplet behind the crystal's screen
  position (contrast is what makes refraction sparkle); subtle warm backdrop
  glows behind lattice/balance; crystal scale +10%.
- **A4. Pointer parallax layering.** Glyph column ±6px and glass card ±3px
  counter-movement on pointer (CSS transforms, single listener). Background
  already tracks the pointer.
- **A5. Motion & perf QA.** Real-browser fps (preview tab throttles rAF),
  reduced-motion audit, mobile shader tuning.

## Track B — Rest of the site (still old design)

- **B1. Below-fold sections** ✅ (`552033e`, Jul 2026): beige glass cards
  dropped; hairline editorial rows on the canvas, mono uppercase labels, serif
  case titles, ink slide-in on hover. Remaining nice-to-have: scroll-triggered
  reveals via IntersectionObserver (currently a load-fade).
- **B2. Footer** ✅ (`552033e`): light wash + hairline rule, serif wordmark,
  mono link groups, Fraunces italic/bold "Build the Future" sign-off.
- **B3. Service pages** (`/ai-automation-engineer`,
  `/react-performance-consulting`, `/fractional-cto`): shared fluid canvas,
  typographic hero, restyled content blocks + CTAs. These are the funnel
  targets from [BRAND_PIVOT.md](./BRAND_PIVOT.md).
- **B4. Blog & projects pages**: typography/chrome pass to match.
- **B5. Mobile nav drawer**: header shows wordmark only on phones; add a
  drawer (mono link list overlay, drawn-in underlines).
- **B6. Housekeeping** (from the original audit):
  - delete redundant `.github/workflows/deploy.yml` (Pages deploys via
    `pages.yml`, source = GitHub Actions);
  - fix or replace the broken Footer test; re-enable typecheck in CI;
  - refresh design docs to shipped state;
  - Lighthouse pass after B1–B2 (backdrop-filters + shader perf check).

## Suggested order

A1–A3 (one shader/glyph session) → B1+B2 → A4–A5 → B3 → B5 → B4 → B6.
