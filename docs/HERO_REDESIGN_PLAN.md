# Hero Redesign — Implementation Plan

> Target: the "Ethereal Aura" hero described in [DESIGN_VISION.md](./DESIGN_VISION.md).
> Constraints: Gatsby 5 + Mantine 7 + CSS Modules + React Three Fiber only.
> **No GSAP, no framer-motion, no emotion** ([PROHIBITED_LIBRARIES.md](./PROHIBITED_LIBRARIES.md)).

## Why the current approach can't get there

The current background (`src/components/3d/3dBackground.tsx`) builds the fluid from
vertex-displaced `WavePlane`/`StreamBand` meshes with physical materials plus ~450 bokeh
points. Geometry displacement can't produce the reference's soft, ink-in-milk ribbon edges —
lit 3D planes always read as "surfaces", and the uniform particle field reads as snow.
The fix is to move the fluid into a **fragment shader** (2D domain-warped noise → pastel
gradient) and keep 3D geometry only for what actually benefits from it: the bokeh layer and
the three service glyphs.

## Phase 1 — Design tokens & typography (foundation)

1. **Fonts** (self-hosted via Fontsource, zero-config with Gatsby):
   - `@fontsource-variable/fraunces` (or `@fontsource/eb-garamond`) — wordmark/display serif.
   - `@fontsource-variable/inter` — headline + body.
   - Keep JetBrains Mono for small UI labels only.
2. **`src/theme.ts`**: change default `fontFamily` to Inter; add `fontFamilyMonospace`;
   register a `display` serif via CSS variable (`--font-display`); bump `h1` scale for the
   hero (`clamp(3rem, 7vw, 6.5rem)` handled in the hero CSS module, not globally).
3. **`src/global.css`**: lighten page background to the near-white pearl tone; define
   `--ink`, `--ink-soft`, `--glass-fill`, `--glass-border` custom properties; remove the
   global `textShadow` on `Title` (dark-theme leftover, wrong on a light canvas).

Acceptance: typecheck passes; site renders with new type stack, no layout work yet.

## Phase 2 — `FluidBackground` shader (the "fluids")

Replace the `WavePlane`/`StreamBand`/`HazePlane` stack inside the existing fullscreen canvas
with one fullscreen quad + custom `THREE.ShaderMaterial`:

1. **New** `src/components/3d/FluidBackground.tsx`:
   - Fragment shader: simplex/value-noise **fbm with domain warping**
     (`n = fbm(p + k·fbm(p + t))`) advected along the diagonal flow direction.
   - Map noise through a 5-stop pastel palette (uniforms fed from `auraColors`):
     pearl → paleAqua → mint → warmSand, with a low-weight slate stop for the dark folds.
   - Multiply by a **diagonal band mask** (smoothstep on rotated Y) so ribbons concentrate
     top-right → bottom-left and the corners stay near-white, as in the reference.
   - Add ~2% film grain in the same shader (cheap, replaces any texture asset).
   - Uniforms: `uTime`, `uPointer` (subtle parallax warp), `uResolution`, palette colors.
   - One draw call; runs fine on mobile GPUs.
2. **Retune `BokehParticles`** (component already exists and is good):
   - Total count 450 → **~90–120** across 2 layers (large blurred back layer, small crisp
     front layer); size variance widened (~0.15–1.2).
   - **Spawn along the same diagonal band** as the shader mask instead of uniform spread
     (pass the band axis in, reject/re-roll positions outside a gaussian around it).
   - Colors: warm white / cream / paleAqua; keep additive blending and shimmer.
3. **Scene hygiene**: drop lights no longer needed by the removed physical materials; keep
   `dpr={[1, 2]}`; add `prefers-reduced-motion` check → render a single static frame
   (`frameloop="never"` after first render) instead of the rAF loop.

Acceptance: background alone matches the reference's atmosphere (light canvas, silky diagonal
ribbons, clustered glow), steady 60fps on the MacBook, GPU frame < 3ms.

## Phase 3 — Hero layout & typography

Rework `src/components/landing/HeroSection.tsx` + its CSS module:

1. **Full-bleed hero**: `min-height: 100svh`, content over the fixed canvas; delete the boxed
   `heroBox`/`heroBackground` card chrome, floating shapes, and the `HolographicAvatar`
   column (superseded by the vector glyphs).
2. **Left block** (7/12 desktop): wordmark handled by Header/Logo (serif restyle there);
   uppercase charcoal headline "AUTOMATING ENTERPRISES WITH AI & ARCHITECTURE."; the existing
   scroll-parallax on the title stays.
3. **Glass card** under the headline: real positioning copy (from BRAND_PIVOT hero copy
   logic) + pill CTA `VIEW CASE STUDIES` → `/projects/`, secondary text link `Get in touch`.
   `backdrop-filter: blur(18px)`; fallback solid `rgba(255,255,255,0.75)` via `@supports`.
4. **De-clutter**: "Senior Frontend Developer" gradient badge, tech-stack badges, and the
   double scroll indicators are removed from the hero (mono-label style may reappear as a
   small `AVAILABLE FOR NEW OPPORTUNITIES` line).
5. Mobile (≤48em): headline `clamp`, glass card full-width, vectors stack below.

Acceptance: hero matches reference composition at 1440px and 390px; Lighthouse a11y ≥ 95
(contrast of charcoal-on-pearl passes AA at all sizes).

## Phase 4 — Service vectors with 3D glyphs (right column, 5/12)

1. **One shared canvas** for all three glyphs using drei `<View>` (three viewports, one WebGL
   context — avoids 3 extra contexts on top of the background canvas).
2. Glyph components in `src/components/3d/glyphs/`:
   - `CrystalGlyph` — icosahedron cluster, `MeshPhysicalMaterial` with `transmission: 1`,
     low roughness, `ior ≈ 1.5`, small drei `<Environment>` for refraction sparkle.
   - `LatticeGlyph` — nested box `EdgesGeometry` line segments, slate color, slow rotation.
   - `BalanceGlyph` — curved beam (torus arc) + matte spheres, gentle see-saw `useFrame` tilt.
3. Row content reuses the existing `ServiceVector` copy/links; layout becomes
   glyph (≈120px) + title + 2-line description, hairline divider between rows.
   Idle: slow rotation. Hover: rotation speeds up slightly + row link underline draws in
   (CSS). Click → service page (unchanged routes).
4. Below-fold `ServiceVector` card section is then removed from `index.tsx` (the hero column
   replaces it), or kept temporarily behind the fold until case studies section is redesigned.

Acceptance: three distinct glyphs render sharply on retina, total JS for drei additions kept
in check (`ANALYSE_BUNDLE=1` statoscope check), no context-loss warnings.

## Phase 5 — Motion polish & performance

1. Pointer parallax: single `pointermove` listener → lerped `uPointer` uniform + a few px of
   translate on the glyph column (CSS `transform`, no re-render).
2. "Drawn-in" reveals for hero text (staggered clip-path/mask keyframes, CSS only).
3. Scroll cue: thin vertical line that draws itself downward (CSS keyframe).
4. Perf pass: `npx update-browserslist-db`, verify `gatsby build`, Lighthouse performance
   ≥ 90 mobile; fix whatever typecheck issues the redesign introduced (`npm run typecheck`
   green again).
5. Later (separate effort, post-hero): apply the Living Blueprint interaction playbook to the
   rest of the page — header progress line, scroll-driven service silos (IntersectionObserver
   + R3F, no GSAP), blueprint-table case studies, custom cursor.

## Order of work & checkpoints

| Step | Deliverable | Verify |
|---|---|---|
| 1 | Fonts + tokens | typecheck, visual smoke |
| 2 | Fluid shader + bokeh retune | side-by-side vs reference image, fps |
| 3 | Hero layout | 1440/390 screenshots |
| 4 | Vector glyphs | hover states, bundle size |
| 5 | Polish | Lighthouse, `gatsby build`, deploy to gh-pages |

Each phase is a separate commit and leaves `main` deployable (single hero, no feature flags
needed — the site is a personal project deployed from `main` via GitHub Actions → Pages).
