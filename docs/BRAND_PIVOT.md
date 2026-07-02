# Brand Pivot — Rationale & Structure (Preserved)

> **Status:** Shipped (Dec 2025). Preserved here as a permanent reference so the reasoning
> survives future rewrites of `TODO.MD`. The visual redesign on top of this structure is
> specified in [DESIGN_VISION.md](./DESIGN_VISION.md) and [HERO_REDESIGN_PLAN.md](./HERO_REDESIGN_PLAN.md).

## The Core Idea

Move from a **"Generalist Developer Portfolio"** to a **"Specialized Expert Hub."**

The key shift is psychological: a portfolio says *"Look at what I can do."* A personal brand
website says *"Here is exactly how I can solve your problem."*

The homepage is no longer a resume. It is a **traffic controller** ("Launchpad, not a parking
lot") sending visitors to three Authority Pillars.

## The Three Vectors (Service Silos)

Static Gatsby pages at root routes (no `/services/` prefix), so the core stays fast and
SEO-friendly while copy can iterate. The Strapi/n8n content pipeline was deliberately deferred.

1. **Vector A: AI Automation** — `/ai-automation-engineer`
   - Hook: "I replace manual operations with intelligent n8n workflows and AI Agents."
   - Key section: "The Automation Stack" (n8n + OpenAI + Supabase). CTA: "Book a Workflow Audit."
2. **Vector B: Web Architecture** — `/react-performance-consulting`
   - Hook: "I build scalable, sub-second React applications and Gatsby systems."
   - Key section: Performance metrics / Core Web Vitals. CTA: "Audit My Architecture."
3. **Vector C: Strategic Consulting** — `/fractional-cto`
   - Hook: "Fractional CTO services to bridge the gap between business goals and tech stacks."
   - Key section: "My Philosophy." CTA: "Discuss Your Vision."

## Structural Decisions (and Why)

- **Skills section removed** — listing "HTML/CSS" implies junior; expertise should be implied
  by content.
- **Chrome extensions demoted** off the homepage (→ "Open Source"/Labs) — they distract from
  the high-ticket funnel.
- **Navigation renamed** from `Projects | Blog | Experiments | Contact` to
  **AI Automation | Web Performance | Fractional CTO | Insights**.
  Footer keeps: Home | Case Studies | Contact | Experiments.
- **Homepage sections**: Hero (value proposition + Three.js/R3F visual as a "show, don't tell"
  signal of frontend mastery) → 3 Vectors → Recent Insights (latest 3 markdown posts:
  date + title + read time) → Selected Case Studies (top 2 only, "View all" link).
- **Hero copy logic**: "I engineer autonomous AI systems and high-performance web architecture
  for startups."

## Implementation Status

All four steps of the original checklist (cleanup, vectors, service pages, home sections) were
completed — see git history around commits `a423bfb` and `9bf2483` (Dec 2025).
