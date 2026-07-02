# Design Vision — "Ethereal Aura" Hero & Site Redesign

> **Status:** Target specification (Jul 2026). Implementation plan lives in
> [HERO_REDESIGN_PLAN.md](./HERO_REDESIGN_PLAN.md). Brand/content structure is defined in
> [BRAND_PIVOT.md](./BRAND_PIVOT.md) and does not change — this is a purely visual redesign.

## 1. The Target (Primary Reference)

The north star is the AI-generated concept image (pastel "aura" hero). What it shows:

**Canvas & atmosphere**
- Near-white, luminous background (soft pearl, almost white — noticeably *lighter* than the
  current beige/ivory build).
- Silky **fluid ribbons** flowing in a diagonal band (top-right → bottom-left): translucent
  layers of mint, pale aqua, powder blue, warm sand, and a few dark slate accents folded in.
  Edges are soft, like ink diffusing in milk — not geometric waves.
- **Glowing bokeh particles** ("bubbles") of strongly varying size, warm-white and pale-aqua,
  concentrated along the fluid diagonal — not uniformly scattered like snow. Additive glow,
  slow drift, gentle shimmer.

**Left side — identity & message**
- "Roman Travnikov" wordmark top-left in a high-contrast **serif**, charcoal ink, with a small
  soft 3D blob logo mark beside it.
- Huge uppercase **grotesque** headline in charcoal: "AUTOMATING ENTERPRISES WITH AI &
  ARCHITECTURE." Tight leading, spans ~half the viewport width, sits *over* the fluid.
- Below it a **frosted-glass card** (backdrop blur, translucent white, hairline border, large
  radius) holding one short paragraph and a white pill CTA: "VIEW CASE STUDIES".

**Right side — the three vectors**
- Three service entries stacked with generous spacing, each: a delicate **3D glyph** + title +
  two-line description (real copy comes from the existing ServiceVector hooks; the reference
  image text is placeholder gibberish).
  1. **AI Automation** — a faceted crystal/gem cluster (refractive, diamond-like).
  2. **Web Architecture** — a fine wireframe cube / isometric lattice.
  3. **Strategic Consulting** — a balancing kinetic sculpture (spheres on a curved beam).

**Overall feel:** light, airy, premium; "generative art meets editorial print". Dark text on
light fluid — the inverse of a typical dev-portfolio dark theme.

## 2. Gap Analysis (reference vs. current build)

| Aspect | Reference | Current (`localhost` capture) |
|---|---|---|
| Canvas | Near-white, luminous | Muddy beige/ivory |
| Fluid | Silky soft-edged ribbons, one diagonal band | Vertex-displaced wave planes, reads as murky texture |
| Particles | Few, clustered on the diagonal, big size variance | ~450 uniform dots everywhere ("snowstorm") |
| Headline | Huge charcoal uppercase grotesque | Small teal gradient text in JetBrains Mono |
| Identity | Serif wordmark, editorial | Mono font everywhere, terminal vibe |
| Content chrome | Full-bleed, one glass card | Boxed beige Mantine cards per section |
| Right column | 3 vectors with 3D glyphs in the hero | Vectors are dark cards below the fold |

## 3. Secondary Reference — "The Living Blueprint" (preserved draft)

The original agent brief below predates the aura concept. Its **color palette and paper/ink
aesthetic are superseded** by the aura direction, but its structural and motion ideas remain
the interaction playbook for the rest of the page (post-hero sections):

**What we keep from it**
- Typography hierarchy: serif display / mono UI labels (uppercase, wide tracking, 12px) /
  humanist sans body at 1.6 line-height.
- Hairline 1px borders instead of drop shadows.
- "Drafting reveal" motion language: elements are *drawn in* (lines animate width 0→100%,
  text reveals by staggered mask), never faded/bounced.
- Scroll-driven service storytelling (pinned diagram that morphs per service: loop → cube →
  spiral) — to be implemented with R3F/scroll observers, **not GSAP/Lenis** (both conflict
  with [PROHIBITED_LIBRARIES.md](./PROHIBITED_LIBRARIES.md); GSAP is explicitly banned).
- Custom cursor: dot/crosshair that expands to a wireframe circle over interactive elements.
- Nav as "architect's ruler": fixed, transparent, 1px scroll-progress line under the header.
- Case studies as horizontal "blueprint table" with ink lines thickening on hover.

**What we drop from it**
- Warm Alabaster `#F2F0E9` / Drafting Blue `#0044CC` palette → replaced by the aura palette
  (`src/theme.ts`, `auraColors`).
- Paper grain texture as the dominant surface → the fluid shader is the surface.

<details>
<summary>Original draft spec (verbatim, for the record)</summary>

```
This is a design specification for a UI/UX Designer Agent. It synthesizes the visual identity
of "Computational Classicism" (Warm Alabaster/Ink) with the immersive interactivity of
high-end product pages (WebGL/Scrollytelling), adapted for a personal consultant brand.

# Design Task: "The Living Blueprint" System

Objective: Design a single-page scrolling experience that feels like a static architectural
manifesto at rest, but behaves like a fluid, living organism when interacted with. The
aesthetic is "Academic Journal meets Generative Art."

## 1. Design System Foundation (The Physics)

- Color Palette (Strict):
  - Canvas (Background): #F2F0E9 (Warm Alabaster). Subtle grain texture overlay
    (noise opacity: 2%) to simulate high-quality paper.
  - Ink (Primary Text/Lines): #1A1A1A (Charcoal). Never pure black.
  - Annotation (Secondary/Meta): #666666 (Graphite).
  - Active/Hyperlink: #0044CC (Drafting Blue).
- Typography:
  - Display (H1, H2): EB Garamond (Italic). Large, editorial, overlapping with graphics.
  - Data/UI (Nav, Tags, Buttons): Geist Mono (Uppercase). Small (12px), wide tracking.
  - Body: Inter. High readability, relaxed line height (1.6).
- Grid & Layout:
  - The "Golden Guide": a visible 12-column grid overlay appearing on scroll or hover;
    layout feels like a technical schematic.
  - Borders: all containers use 1px solid rgba(26, 26, 26, 0.1). No drop shadows.

## 2. Layout & Component Specification

### A. Navigation (The "Architect's Ruler")
- Fixed top, transparent. Left: "Roman Travnikov" (Serif, Italic).
  Right: [ SERVICES ] [ CASE STUDIES ] [ INSIGHTS ] (Mono, Uppercase).
- On scroll, a fine 1px line draws itself left-to-right under the header (progress bar).

### B. Hero (The "Generative Cover")
- Visual (WebGL): a "Living Wireframe" Orb — a Generative Node Graph. Idles with slow
  "breathing"; on mouse drag the user rotates/distorts the graph (elastic physics).
- H1: "Automating Enterprises with AI & Architecture." Subtext anchored bottom-left.
- Scroll prompt: an animated line drawing itself downwards.

### C. Service Silos (Scrollytelling core)
- Pinned left column: an SVG technical diagram that MORPHS per service:
  AI Automation → recursive loops; Architecture → isometric cube grid;
  Consulting → Golden Ratio spiral.
- Right column: text blocks scrolling over the diagram. Huge serif H2s fade through
  the "active" zone. (Original suggested GSAP pinning.)

### D. Case Studies (The "Blueprint Table")
- Horizontal scroll (sticky). Each project a "File Folder" tab; background paper shifts
  slightly (#EAE8E0) when focused. Hover: ink lines thicken 1px → 3px.

## 3. Interaction & Motion
- "Liquid Ink" smooth scroll (original suggested Lenis): heavy, like turning thick pages.
- Custom cursor: small crosshair/dot; expands to a wireframe circle (Drafting Blue) over
  interactive elements.
- The "Drafting" Reveal: elements are DRAWN in, not faded. Borders animate width 0→100%;
  text reveals line-by-line with a staggered mask.

## 4. Deliverables (original)
- Figma/Penpot mockups (1440px / 390px), 10s motion prototype of the diagram morph,
  SVG glyphs for the 3 service states, seamless paper-grain texture.

Summary: "Create a UI that looks like a printed architectural schematic from 1970, but
functions with the fluidity of a 2026 WebGL experience. Prioritize typography, whitespace,
and 'drawing' animations over shadows and gradients."
```

</details>

## 4. Reconciled Design System

- **Palette:** aura colors from `src/theme.ts` (`auraColors`), with the canvas pushed lighter —
  effective hero background ≈ `#F8F5EE`–`#FAF8F3` range, charcoal `#1A1E21` for ink. Slate
  `#4A5964` for secondary text. No pure black, no pure white.
- **Typography (3 roles):**
  - *Display/wordmark:* a high-contrast serif (self-hosted, e.g. Fraunces or EB Garamond).
  - *Headline & body:* a grotesque sans (e.g. Inter / Inter Tight); headline uppercase,
    `clamp(3rem, 7vw, 6.5rem)`, weight 600–700, letter-spacing slightly negative.
  - *UI labels:* JetBrains Mono (already in the project), uppercase, small, wide tracking —
    used sparingly (badges like `VECTOR A`, nav, meta), no longer the default body font.
- **Surfaces:** full-bleed sections over the fluid canvas; frosted-glass cards
  (`backdrop-filter: blur(16–20px)`, `rgba(255,255,255,0.30–0.45)` fill, 1px
  `rgba(255,255,255,0.5)` border, 20–28px radius). Hairline charcoal borders elsewhere;
  no drop shadows.
- **Motion:** only R3F (`useFrame`) for the 3D layer and CSS transitions/keyframes for DOM —
  per project rules (no GSAP, no framer-motion, no emotion). "Drawn-in" reveals; everything
  respects `prefers-reduced-motion`.
