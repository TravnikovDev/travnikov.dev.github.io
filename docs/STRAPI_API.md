# Strapi API operating instructions

## Access and destination

Production: `https://cms.travnikov.dev`. The current deployment is Strapi 5.33.4.

Use the existing root `.env` values `STRAPI_API_URL` and `STRAPI_API_TOKEN`.
Do not assume `.env.development` refers to the same server or uses the same
token variable. Load credentials privately in the HTTP client and check the
destination before attaching the Authorization header. Do not print env files,
request headers, tokens, cookies, or full authentication responses. Never put
credentials in URLs, committed scripts, screenshots, or publication reports.

Use `Authorization: Bearer <value loaded privately from the environment>`.
Routine content work uses this API, rather than admin-browser forms or SQL.

Verified 10 November 2026:

- The local `.env` credential can read published articles and populated cover metadata.
- A `PUT` targeting a confirmed nonexistent document returned 404 with the token; the unauthenticated control returned 403. This confirms access passed the write authorization gate without modifying an existing document. It is not a test of every write operation or media-upload scope.
- All five Batch 02 articles, full bodies, source timestamps, titles, excerpts, tags, and cover alternative text were read back successfully through the API.
- Batch 03 exercised real authenticated writes: five multipart media uploads, five draft creations, draft readbacks, publication by `documentId`, and published readbacks all succeeded with the existing local credential. Body hashes, cover alternative text, and exact source instants matched the reviewed payloads. Receipts are in `editorial/batch-03/publication.json`.
- Batch 03 public verification passed at 10:40 UTC: all five canonical pages returned HTTP 200 with complete reviewed bodies, correct metadata, citation links, covers, and alternative text. Final deployment 42800683354 and its Pages artifact also passed verification.
- Batch 04 repeated the full API upload/create/publish/readback sequence successfully. At 11:08 UTC, all five public pages passed complete-body, metadata, canonical, listing, cover, and final-artifact checks. Deployment 42804560384 passed. Receipts and reusable clients are in `editorial/batch-04/`.
- Batch 05 passed the same API sequence and all five public-page/artifact checks at 11:28 UTC. Deployment 42807356456 passed. All 31 published articles have unique source IDs. Selection and verification used Strapi directly, with no local n8n folder or migration index.
- Batch 06 passed API upload, draft and published readbacks, then all five public-page and final-artifact checks at 11:55 UTC. Deployment 42810982402 passed type checking, tests, build, and deployment. Strapi holds 36 published articles with unique gist source IDs. Optional receipts are in `editorial/batch-06/`; no local n8n folder or migration index was recreated.
- Do not create another token automatically. If a required operation returns 403, report the exact missing operation and use an existing authorized writer credential where available. Credential creation or permission expansion needs the applicable explicit authorization.

## Supported content shape

The collection endpoint is `/api/articles`. Request JSON writes use a `data`
envelope. Fields used by this website:

| Field | Value |
| --- | --- |
| `title` | Plain string; a specific hook grounded in the article |
| `slug` | Lowercase kebab case; public route `/blog/<slug>/` |
| `date` | Display date, `YYYY-MM-DD`, using the user's Europe/Istanbul date |
| `excerpt` | Concise plain-text summary |
| `body` | Complete Markdown string, without repeating the title as an H1 |
| `tags` | JSON array of strings |
| `cover` | Uploaded media's numeric `id` |
| `sourceId` | `gist:<gist-id>` |
| `sourceUrl` | Canonical original gist URL |
| `sourceCreatedAt` | Original UTC ISO timestamp, including seconds |
| `sourceUpdatedAt` | Original UTC ISO timestamp, including seconds |

The type also has legacy `description`, `author`, `category`, and `blocks`
fields. They are not substitutes for the website's `excerpt` and Markdown
`body`. Local editorial artifacts contain helper fields such as `coverFile`,
`coverAlt`, `citations`, `seoTitle`, and `seoDescription`; do not send those
as Article attributes unless the actual schema has been extended to support
them. Citations belong in the Markdown. Cover alternative text belongs on
the uploaded media record.

## Lookup and duplicate prevention

Use a URL encoder or query builder. Do not interpolate source IDs or filter
expressions into shell commands.

```text
GET /api/articles?filters[sourceId][$eq]=gist:<gist-id>&status=draft&populate=cover
GET /api/articles?filters[sourceId][$eq]=gist:<gist-id>&status=published&populate=cover
```

Check both versions. Deduplicate the combined results by `documentId`, since
one document can have both a draft and a published version. If there is one
matching document, update it. If there are multiple distinct documents, stop
that article and investigate. A failed lookup, 401, 403, timeout, or malformed
response must never fall through to creating a new article.

For older records without source tracking, inspect existing content and slugs
before creating. Preserve public URLs during rewrites. Strapi source identities
are the authoritative migration record; local editorial notes are optional.

## Create, update, and publish

Use explicit status parameters. Do not rely on version-specific defaults.

| Operation | Request |
| --- | --- |
| Create a draft | `POST /api/articles?status=draft` |
| Update a draft | `PUT /api/articles/{documentId}?status=draft` |
| Publish the reviewed version | `PUT /api/articles/{documentId}?status=published` with the validated final Article fields |
| Verify published version | `GET /api/articles/{documentId}?status=published&populate=cover` |

Send only supported Article attributes inside `{ "data": { ... } }`.
Use `documentId` from the API response. Numeric Article `id` values identify
database rows and can differ between versions; do not use them as document URLs.

Validate locally before a write: source identity, title, stable slug, body,
citation links, tags, dates, cover path, and the completed editorial critique.
Do not regenerate or rewrite the article during upload.

After publication, require a non-null `publishedAt` and compare the returned
body to the reviewed source, preferably with a SHA-256 hash. Compare the other
fields as values too. Compare timestamps as instants so `Z` and `+00:00`
formatting differences do not produce false failures.

## Cover upload

```text
POST /api/upload
Content-Type: multipart/form-data; boundary generated by the HTTP client

files: binary image file
fileInfo: JSON string containing name, alternativeText, and caption
```

Let the multipart client generate its own boundary. Do not set a JSON
Content-Type on an upload. The response is a media array; use its numeric
`id` as the Article's `cover` relation and keep its returned `url` for checks.
Resolve relative media URLs against the CMS origin.

Use meaningful alternative text describing the actual visible image. The
caption can disclose that the illustration was generated with AI. Reuse the
existing cover when replaying a publication unless replacement is requested.
Do not blindly re-upload on a retry or remove assets on a partial failure.

Cover art direction comes from the `Image Prompt Agent` in
`../n8n-backups/workflows/4rmbY55rfTJ2dHzz.json`: light neutral ground, muted
pastels, precise hand-drawn vector-style outlines, one central recognizable
object with 2-3 supporting icons, no people or literal text, and 2:1 landscape.
Save final generated assets and full prompts in the batch directory.

## Client pattern

Node's built-in `fetch`, `FormData`, and `Blob` are sufficient. For an ordinary
project script running from the repository root, this keeps credentials in
memory and avoids putting them in process arguments:

```js
import { readFile } from 'node:fs/promises';
import path from 'node:path';

process.loadEnvFile('.env');
const base = new URL(process.env.STRAPI_API_URL);
if (base.origin !== 'https://cms.travnikov.dev') {
  throw new Error('Unexpected CMS destination');
}
const token = process.env.STRAPI_API_TOKEN;
if (!token) throw new Error('Missing STRAPI_API_TOKEN');

async function api(method, route, body) {
  const multipart = body instanceof FormData;
  const response = await fetch(new URL(route, base), {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(!multipart && body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? (multipart ? body : JSON.stringify(body)) : undefined,
  });
  if (!response.ok) {
    throw new Error(`${method} ${route}: HTTP ${response.status}`);
  }
  return response.status === 204 ? null : response.json();
}

async function lookup(sourceId, status) {
  const query = new URLSearchParams({
    'filters[sourceId][$eq]': sourceId,
    status,
    populate: 'cover',
  });
  return api('GET', `/api/articles?${query}`);
}

async function uploadCover(file, alternativeText) {
  const form = new FormData();
  form.append('files', new Blob([await readFile(file)], {
    type: 'image/png',
  }), path.basename(file));
  form.append('fileInfo', JSON.stringify({
    name: path.basename(file),
    alternativeText,
    caption: 'Illustration generated with AI using the Content fabric art direction.',
  }));
  const uploaded = await api('POST', '/api/upload', form);
  if (!Array.isArray(uploaded) || !uploaded[0]?.id) {
    throw new Error('Upload did not return a media ID');
  }
  return uploaded[0];
}
```

These are reusable building blocks, not an instruction to re-publish an old
batch. Assemble the final Article fields explicitly and follow the lookup,
review, and verification steps above. Do not log the token or headers.

## Errors and retries

- 400: inspect supported field names, JSON shape, timestamp format, and media relation.
- 401: the credential is missing, invalid, or expired; do not fall back to public access.
- 403: required permission is absent; do not broaden roles or mint credentials without authorization.
- 404: check document identity and the requested draft/published version.
- Timeout after a write: query by `sourceId` before retrying. A response can be lost after a successful create.
- Keep transient retries bounded. A retry must not create duplicate articles, covers, or social posts.

## Website delivery and completion evidence

Publishing triggers the existing Strapi webhook, which calls the narrow n8n
rebuild workflow and GitHub's `strapi_publish` repository dispatch. No model
API calls or social publishers are needed for this handoff.

Check deployments through `gh run list` / `gh run view`, not repeated browser
navigation. Publishing five articles can cancel superseded builds because
the Pages workflow uses `cancel-in-progress`; verify the final run.

A successful build or deployment is separate from a live public page. Check
canonical page HTTP status, title, full article start/end, and cover response.
If the public host serves an older deployment, inspect response headers and
the uploaded Pages artifact, then wait and verify again. Do not repeatedly
republish unchanged articles or modify infrastructure merely to force a refresh.

Batch 02 demonstrated this distinction: two successful deployments contained
the correct files while early public requests still returned 404. Follow-up
API/CLI checks verified all five URLs live without content or routing changes.
When waiting for a deployment, use bounded HTTP polling (for example, every
30 seconds), and require both HTTP 200 and the expected article content.
Re-fetch the canonical response rather than relying on an old browser tab.
Record the check time and response metadata; a Last-Modified timestamp is
evidence about the served file, not an exact activation timestamp. If the
wait times out, retain an explicit pending status and diagnose the deployed
artifact and host before retrying a deployment. Do not label this a missing
CMS entry when the API and artifact already contain it.

Strapi holds canonical content, media, and migration identities. Optional local
research and verification receipts can live under gitignored `editorial/`;
existing batch paths in this document refer to those local files. Workflow
definitions and prompts belong in the dedicated `../n8n-backups` repository.
Use Strapi drafts and published versions to identify already migrated sources.
Record CMS publication separately from pending public-host verification.
Use a browser only for an optional final visual
check and the required screenshot proof, rather than the content operations.
