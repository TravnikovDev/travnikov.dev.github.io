# Content management (Strapi v5)

Site content — insights (blog), case studies, and experiments — is sourced at
build time from a self-hosted **Strapi v5** instance (`gatsby-node.ts` →
`sourceNodes`, plain REST, no plugin). The site is static: publishing in
Strapi does not change the live site until a rebuild runs.

```
n8n content fabric ──► Strapi (draft) ──► you publish in admin
                                   │
                        Strapi webhook ──► n8n ──► GitHub repository_dispatch
                                                        │
                                     GitHub Actions build (pulls Strapi) ──► GH Pages
```

## Environment

| Variable | Where | Purpose |
| --- | --- | --- |
| `STRAPI_API_URL` | `.env` locally, repo secret in CI | Base URL of the Strapi instance |
| `STRAPI_API_TOKEN` | same | **Read-only** API token for builds |
| `STRAPI_SEED_TOKEN` | local only | Full-access token, only for the seed script |

Behavior without `STRAPI_API_URL`: the build **succeeds with zero content**
(warning in the log) so tooling and hooks work without secrets. With the URL
set but the API failing, the build **fails** — a deploy can never silently
ship an empty site.

Setup: copy `.env.example` → `.env`, fill both values. In GitHub: repo
Settings → Secrets and variables → Actions → add `STRAPI_API_URL` and
`STRAPI_API_TOKEN`.

## Content types

Create these collection types in Strapi (Content-Type Builder), all with
**Draft & Publish enabled** — drafts are the moderation queue.

**Article** (API ID `article`, plural `articles`)

| Field | Type | Notes |
| --- | --- | --- |
| `title` | Text | required |
| `slug` | UID (from title) | becomes `/blog/<slug>/` |
| `date` | Date | display date (falls back to publishedAt) |
| `excerpt` | Text (long) | listing + SEO description |
| `body` | Rich text (Markdown) | the post |
| `tags` | JSON | array of strings, e.g. `["React", "Gatsby"]` |

**Case study** (API ID `case-study`, plural `case-studies`)

| Field | Type | Notes |
| --- | --- | --- |
| `title` | Text | required |
| `slug` | UID (from title) | becomes `/projects/<slug>/` |
| `description` | Text (long) | listing + page lead |
| `category` | Text | e.g. "Web Application" |
| `url` | Text | optional "View live project" link |
| `body` | Rich text (Markdown) | the write-up |
| `tags` | JSON | array of strings |

**Experiment** (API ID `experiment`, plural `experiments`)

| Field | Type | Notes |
| --- | --- | --- |
| `title` | Text | required |
| `slug` | UID (from title) | becomes `/experiments/<slug>/` |
| `description` | Text (long) | listing + page lead |
| `demoUrl` | Text | optional "View live demo" link |
| `body` | Rich text (Markdown) | the write-up |
| `technologies` | JSON | array of strings |

Body fields are **markdown strings**; the site converts them to HTML at build
time (`marked`). Don't repeat the title as an `# h1` in the body.

## API token

Settings → API Tokens → Create: type **Custom**, duration unlimited, grant
`find` + `findOne` on Article, Case study, Experiment. That's the build token.
For seeding, create a second short-lived **Full access** token and delete it
afterwards.

## One-time seed from the repo's markdown

```sh
STRAPI_API_URL=https://<host> STRAPI_SEED_TOKEN=<full-access> \
  node scripts/seed-strapi.mjs          # add --draft to import as drafts
```

Seeds everything under `src/content/`. After verifying the site builds from
Strapi, `src/content/` can be deleted.

## Publish → rebuild

GitHub Pages is static, so publishing needs to trigger the deploy workflow.
The workflow listens for `repository_dispatch` with event type
`strapi_publish`. Strapi's native webhooks can't send GitHub's required body
shape, so route it through n8n:

1. Strapi: Settings → Webhooks → add one pointing at an n8n Webhook node URL,
   events: entry publish/unpublish (and delete).
2. n8n: Webhook node → HTTP Request node:
   - `POST https://api.github.com/repos/<owner>/<repo>/dispatches`
   - Headers: `Authorization: Bearer <GitHub PAT with repo scope>`,
     `Accept: application/vnd.github+json`
   - Body: `{ "event_type": "strapi_publish" }`
3. Optional: debounce in n8n (e.g. wait 2 min, collapse bursts) so a batch of
   publishes triggers one build.

## Local development

`npm run develop` with `.env` filled shows real content. Without it the site
runs with empty listings — layout work is still possible.
