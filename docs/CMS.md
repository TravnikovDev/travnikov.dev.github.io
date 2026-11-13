# Content management (Strapi v5)

For agent-driven content work, use the API first. See
[`STRAPI_API.md`](./STRAPI_API.md) and the repository
[`AGENTS.md`](../AGENTS.md) for credentials, endpoints, source tracking,
media upload, publication, and verification rules.

Strapi is the source of truth for published content, media, and source identities.
`editorial/` is optional, gitignored local working material; historical batch
links below refer to local research and verification files when available.
Workflow definitions and prompts are maintained in the dedicated sibling
`../n8n-backups` repository.

Batch 02 status: five additional articles are published and verified through
the Strapi API, including covers and original source timestamps. Both
[the original deployment](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/runs/42739486651)
and [one retry](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/runs/42741601354)
passed, and the uploaded artifact contains all five pages. All five canonical
public URLs were verified HTTP 200 on 10 November 2026 at 12:44 Istanbul
(09:44 UTC), including complete reviewed article HTML, canonical links,
Insights entries, cover files, and alternative text. The earlier 404s have
cleared; the served files now carry a Last-Modified value later than the
previous failed check, consistent with delayed Pages activation. No article,
route, DNS, or hosting-setting changes were required. Do not recreate or
republish these articles as new entries. See
[`batch-02/publication.json`](../editorial/batch-02/publication.json).

Batch 03: five more articles were researched, revised, illustrated, and published
entirely through the Strapi API. All five canonical URLs were verified HTTP 200
on 10 November 2026 at 13:40 Istanbul (10:40 UTC). Complete reviewed bodies,
source timestamps, metadata, citation links, canonical links, Insights entries,
covers, and alternative text matched. The final
[deployment](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/runs/42800683354)
passed all build/test/deploy steps, and the public HTML matched its artifact.
See [`batch-03/REVIEW.md`](../editorial/batch-03/REVIEW.md) and
[`publication.json`](../editorial/batch-03/publication.json).

Batch 04: five further articles were published through the Strapi API and
verified live on 10 November 2026 at 14:08 Istanbul (11:08 UTC). All canonical
URLs returned HTTP 200, with complete reviewed bodies, source metadata,
citation links, correct canonical links, Insights entries, covers, and
alternative text. The final
[deployment](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/runs/42804560384)
passed all checks, and its artifact matched the public pages. See
[`batch-04/REVIEW.md`](../editorial/batch-04/REVIEW.md) and
[`publication.json`](../editorial/batch-04/publication.json).

Batch 05: five more articles were published through the Strapi API and verified
live at 14:28 Istanbul (11:28 UTC) on 10 November 2026. All public pages returned
HTTP 200 with complete reviewed bodies, correct metadata, canonical links,
Insights entries, covers, and alternative text. The final
[deployment](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/runs/42807356456)
passed and its artifact matched the live articles. Local optional receipts are
under `editorial/batch-05/`; Strapi holds the canonical content and source IDs.

Batch 06: five additional researched articles and generated covers were published
via the Strapi API and verified live at 14:55 Istanbul (11:55 UTC) on 10 November
2026. All five canonical pages returned HTTP 200; complete bodies, citations,
metadata, canonical links, Insights entries, covers, and alternative text matched
the reviewed content and the final
[deployment artifact](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/runs/42810982402).
All checks passed. Strapi now contains 36 published articles with unique gist
source identities. Optional receipts are under `editorial/batch-06/`.

## Current deployment — verified 10 November 2026

- Admin: <https://cms.travnikov.dev/admin>
- Coolify project: **Strapi DB**, production environment.
- Strapi **5.33.4**, Node **22.22.0**, PostgreSQL.
- Startup runs `npm run build && exec npm run start` in production mode.
  The health check has a 180-second startup allowance for the admin build.
- Config, source schemas, uploads, and PostgreSQL data use persistent volumes.
- Daily local PostgreSQL backups run at **01:00 UTC / 04:00 Istanbul**.
  The first backup completed successfully. Retention is unlimited; there is
  no off-server backup destination configured.
- Article, Case study, and Experiment exist with Draft & Publish enabled.
  Thirty-six articles are published; case studies and experiments currently have no
  entries. Do not run the sample seed against this existing content.

## Publishing to the website

1. Open **Content Manager** and select Article, Case study, or Experiment.
2. Edit the draft and save it. Draft saves do not rebuild the website.
3. Select **Publish** when the entry is ready. Unpublishing or deleting an
   entry also rebuilds the site so removed content disappears from it.
4. Check the [website deployment](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/workflows/pages.yml).
   Deployment success can precede the public host updating. Confirm the
   canonical article URLs return HTTP 200 with the expected content before
   treating publication as complete.

The **Rebuild travnikov dev** Strapi webhook calls the authenticated
[Strapi → Rebuild travnikov.dev workflow](https://v2202511309590395560.hotsrv.de/workflow/755WtJgGo0wUsOON)
in n8n. It filters for the three website content types and sends GitHub's
`strapi_publish` repository dispatch using the existing GitHub credential.
It does not run the social publishing workflow.

The shared `X-Strapi-Webhook-Secret` value lives only in the Strapi webhook
headers and the n8n **Strapi website rebuild** Header Auth credential.
Requests without it are rejected. Workflow execution payloads are not saved
because incoming headers contain this secret. Keep workflow exports in the
dedicated `../n8n-backups` repository. After importing an export of the live
rebuild workflow, select the Header Auth credential and verify the existing
GitHub credential before publishing the workflow.

Strapi's webhook **Trigger** button tests the entire connection, including
requesting a real website rebuild, without editing or republishing an article.
To troubleshoot, check its delivery result, n8n's execution status, then GitHub
Actions. The webhook test's `trigger-test` event is intentionally accepted.

End-to-end verification on 10 November 2026: the Strapi test succeeded,
unauthenticated requests received HTTP 403, and
[the resulting deployment passed](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/runs/42726027887)
(type check, tests, Gatsby build, GitHub Pages deployment). All six articles
were present on the live Insights page after deployment.

## Architecture

Site content — insights (blog), case studies, and experiments — is sourced at
build time from a self-hosted **Strapi v5** instance (`gatsby-node.ts` →
`sourceNodes`, plain REST, no plugin). The site is static: publishing in
Strapi does not change the live site until a rebuild runs.

```
Research / editing / CMS admin ──► Strapi (draft) ──► Publish
                                                       │
                         Strapi webhook ──► n8n 04 ──► GitHub repository_dispatch
                                                       │
                                    GitHub Actions build (pulls Strapi) ──► GH Pages
```

## Environment

| Variable | Where | Purpose |
| --- | --- | --- |
| `STRAPI_API_URL` | `.env` locally, repo secret in CI | Base URL of the Strapi instance |
| `STRAPI_API_TOKEN` | same variable name locally and in CI | Build-time reads; the existing local credential also has verified Article and media write access. CI credential scope is managed separately. |
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
| `cover` | Media (single image) | include meaningful asset alternative text |
| `sourceId` | Text | migration identity, e.g. `gist:<gist-id>` |
| `sourceUrl` | Text | original source URL |
| `sourceCreatedAt` | Datetime | original source creation time, preserved in UTC |
| `sourceUpdatedAt` | Datetime | original source revision time, preserved in UTC |

The source fields are optional and were added to the persistent Article
schema on 10 November 2026. The six previously migrated articles have their
source identities backfilled. Always check draft and published source
identities in Strapi before creating another article; a rewritten title or slug is not a
reliable deduplication key.

Batch 01 added five researched rewrites with the user's saved illustration
style. Full body hashes matched all ten draft/published database rows, display
dates and source identities matched, and original UTC source timestamps were
preserved. [Deployment 42736408578](https://github.com/TravnikovDev/travnikov.dev.github.io/actions/runs/42736408578)
passed type checks, tests, build, and deployment. All five public pages and
loaded covers were verified. See
[`editorial/batch-01/publication.json`](../editorial/batch-01/publication.json).

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

## Recreating the publish → rebuild connection

GitHub Pages is static, so publishing needs to trigger the deploy workflow.
The workflow listens for `repository_dispatch` with event type
`strapi_publish`. Strapi's native webhooks can't send GitHub's required body
shape, so route it through n8n:

1. Import an export of **Strapi → Rebuild travnikov.dev** from the dedicated
   n8n repository, or export the existing live workflow if its backup is missing.
   The verified workflow uses HTTP Request node version 4.3.
2. Select a Header Auth credential using header `X-Strapi-Webhook-Secret`.
   Keep its value private and configure the same header in Strapi.
3. Verify the existing GitHub credential on the HTTP Request node:
   - `POST https://api.github.com/repos/<owner>/<repo>/dispatches`
   - Headers: `Authorization: Bearer <GitHub PAT with repo scope>`,
     `Accept: application/vnd.github+json`
   - Body: `{ "event_type": "strapi_publish" }`
4. Publish the n8n workflow, then create the Strapi webhook using its
   **Production URL**. Enable only `entry.publish`, `entry.unpublish`, and
   `entry.delete`. The workflow ignores events for unrelated content types.
5. Disable saving successful, failed, and manual execution payloads in this
   workflow's settings so the shared header is not retained in execution data.
6. Use Strapi's **Trigger** button and wait for a successful GitHub deployment.

The GitHub workflow already serializes deployments with its `pages`
concurrency group. The rebuild connection does not require a new GitHub token
or a public Strapi Content API role.

## Local development

`npm run dev` with `.env` filled shows real content. Without it the site
runs with empty listings — layout work is still possible.
