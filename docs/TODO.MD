# TODO (Based on Current Implementation)

This list reflects what is missing or planned relative to the current codebase.

## Content and Data
- Move `ShowcaseGrid` items out of `src/pages/index.tsx` into a JSON file or CMS model.
- Add real logos/images for projects and employers.
- Fill in missing sections (My apps, YouTube widget, What I can help you with) or remove them.

## Pages and Features
- Build dedicated pages for Projects, Blog, Experiments, and Contact.
- Add contact form integration (Strapi webhook).
- Add experiments gallery with demo previews and tags.

## CMS and Automation
- Integrate Strapi content types (Blog, Projects, Experiments, About, Contact).
- Add n8n workflows for publish + deploy + social posting.

## UX and Accessibility
- Add keyboard navigation and focus states for `ShowcaseGrid` tiles.
- Review mobile spacing and grid breakpoints for the landing sections.

## SEO and Performance
- Add JSON-LD structured data for Person and Project schemas.
- Audit Core Web Vitals once content is finalized.
