# TODO (Based on Current Implementation)

## Phase 1: Data Modeling & Backend Configuration (Strapi)
- Objective: Establish the database schema to support the 3‑pillar silo structure (Services, Topics, Articles).

### Service Collection Type
- Create a new Collection Type named "Service".
- Add text fields: Title, Slug (UID), Short Description, Hero Headline.
- Add Rich Text (or Dynamic Zone) field for Body content.
- Add text field for Price/Rate or Pricing Model.
- Add string fields for Call to Action Label and Call to Action URL.
- Enable Draft/Publish system.

### Topic Collection Type (Clusters)
- Create a new Collection Type named "Topic" (or "Cluster").
- Add fields: Name, Slug.
- Add text field for Description (used as intro on the topic archive page).
- Add Media field for an icon or cover image representing the cluster.

### Article Collection Type (Update)
- Modify the existing Article definition.
- Add relation: Article belongs to one Topic.
- Add relation: Article relates to one Service (optional, for explicit up‑selling).
- Add SEO component/fields: Meta Title, Meta Description, Keywords.
- Add JSON field `StructuredData` (to store pre‑generated schema from n8n).

## Phase 2: Gatsby Routing & Core Refactor
- Objective: Transition from a single‑page app to a multi‑route static site generator using `gatsby-node.js`.

### Clean Current Structure
- Move the current `index.js` content into a new component or page named `About` or `LegacyHome` to preserve assets.
- Reset `index.js` to serve as the new Router/Landing page foundation.

### Create Template Files
- Create `src/templates/service-template.js` to render individual service landing pages.
- Create `src/templates/topic-template.js` to render a list of articles belonging to a specific cluster.
- Create `src/templates/article-template.js` to render the actual blog posts.

### Configure `gatsby-node.js` for Page Generation
- Write a GraphQL query to fetch all Services, Topics, and Articles from Strapi.
- Iterate through Services: use `createPage` to generate pages at `/services/{service.slug}` with the service template.
- Iterate through Topics: use `createPage` to generate pages at `/topics/{topic.slug}` with the topic template.
- Iterate through Articles: use `createPage` to generate pages at `/blog/{article.slug}` with the article template; pass `topic.slug` as context to enable "related articles" queries.

## Phase 3: Frontend Implementation & Internal Linking
- Objective: Build the visible structure that enforces the Semantic Core silos.

### Global Navigation
- Update the main `Layout` component.
- Replace single‑page anchor links with routing links: Services, Blog, About.
- Ensure the Services link opens a dropdown or leads to a Services index.

### Service Template
- Display the Hero Headline prominently.
- Render the Body content.
- Include a "Relevant Case Studies" section (hardcoded or dynamic).
- Embed the Pricing and Call to Action fields clearly at the bottom.

### Topic Template (Cluster Page)
- Display the Topic Name and Description.
- Create a grid layout listing all Articles associated with this specific topic.
- Ensure each card in the grid links to `/blog/{article.slug}`.

### Article Template
- Render the main article content.
- Sidebar/Footer: display a "Service Call to Action" based on topic (e.g., if the topic is "Automation", show a card linking to `/services/ai-automation`).
- Add breadcrumbs: Home > Topics > {Topic Name} > {Article Title}.

## Phase 4: Technical SEO & Schema Integration
- Objective: Optimize the site for crawlers and LLM entity extraction.

### SEO Component
- Update or create a robust SEO/Head component using Gatsby Head API or React Helmet.
- Accept props: title, description, image, pathname.
- Generate the correct canonical URL for every page.

### Dynamic JSON‑LD (Schema.org)
- In `service-template.js`, inject `Service` or `Product` schema; map price and description fields appropriately.
- In `article-template.js`, inject `TechArticle` schema; use the `StructuredData` field from Strapi when available; otherwise, fallback to standard `Article` schema using title, date, and author (Roman Travnikov).
- In `index.js`, inject `Person` and `ProfessionalService` schema that defines the Organization and lists `knowsAbout` (skills) and `hasOfferCatalog` (services).

### Sitemap Configuration
- Configure `gatsby-plugin-sitemap`.
- Explicitly include the new `/services/`, `/topics/`, and `/blog/` paths.
- Exclude any utility pages or `404` pages.