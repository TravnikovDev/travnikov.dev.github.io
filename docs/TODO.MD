# TODO (Based on Current Implementation)

This list is ordered so CMS integration happens first, then structure and content follow.

## Phase 1 — Strapi First (Foundation)
- Stand up Strapi and define content types: Blog, Projects, Experiments, About, Contact.
- Wire Gatsby to Strapi (REST or GraphQL), confirm data fetching works in dev.
- Add a deploy webhook from Strapi to GitHub Actions.

## Phase 2 — Data and Structure
- Move `ShowcaseGrid` items out of `src/pages/index.tsx` into Strapi content.
- Create a shared data layer for the landing page sections (query + mapping).
- Decide which landing sections stay and remove commented blocks or fill them.
- Add real logos/images for projects and employers.

## Phase 3 — Pages and Features
- Build dedicated pages for Projects, Blog, Experiments, and Contact.
- Add contact form integration (Strapi webhook).
- Add experiments gallery with demo previews and tags.

## Phase 4 — UX, Accessibility, and SEO
- Add keyboard navigation and focus states for `ShowcaseGrid` tiles.
- Review mobile spacing and grid breakpoints for the landing sections.
- Add JSON-LD structured data for Person and Project schemas.
- Audit Core Web Vitals after content stabilizes.

## Phase 5 — Automation (Optional)
- Add n8n workflows for publish + deploy + social posting.
