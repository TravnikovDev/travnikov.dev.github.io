# Repository instructions

## Strapi: use the API first

- Read [docs/STRAPI_API.md](docs/STRAPI_API.md) before CMS work. Use HTTP API calls for article lookup, creation, editing, media upload, publishing, and verification. Use the GitHub API/CLI for deployment checks.
- Check existing local environment files before asking for credentials or opening an admin UI. `.env` contains `STRAPI_API_URL` and `STRAPI_API_TOKEN`. Keep credentials in memory; never print them, commit them, include them in reports, or copy them into example commands.
- Verify the configured destination before sending its token. The production CMS is `https://cms.travnikov.dev`.
- Browser use is a fallback for unavailable API capabilities, user sign-in, or a final visual check/screenshot. Do not perform repetitive CMS form filling when API access works. Do not extract browser cookies or local storage to obtain API access.
- Use Strapi's supported APIs for ordinary content and metadata writes. Do not bypass them with SQL or use Coolify's browser terminal as the normal CMS interface.
- Use `sourceId = gist:<gist-id>` as the migration identity. Query existing drafts and published versions before creating. Update by Strapi 5 `documentId`, never the numeric database `id`. A changed title or slug does not imply a new source.
- Preserve an existing article's slug and display date unless the user asks to change them. Preserve exact original UTC `sourceCreatedAt` and `sourceUpdatedAt` values. Explicitly select `status=draft` or `status=published` on API calls.
- Gist migration uses batches of five. Select the next unused gists chronologically, checking Strapi drafts and published entries by `sourceId` for migration progress. Read the current prompt sources in the dedicated sibling `../n8n-backups` repository, research dated claims, critique and revise the articles, generate covers, then publish when authorized by the user. Workflow definitions and backups belong in that dedicated repository; do not recreate a local `n8n/` folder. Do not edit original gists or trigger social publishing as part of website migration.
- Strapi is the source of truth for article content, media, and migration identity. `editorial/` is optional, gitignored local working material for research, source snapshots, prompts, and verification receipts; the website does not depend on it. Never record a draft save or deployment success as proof that the public page is live.
- Read article bodies and source fields back through the API after writes. Verify media URLs and alternative text, published status, required CI checks, and public HTTP pages. Record partial results honestly if the public host has not updated yet.

## PDF handling

1. First check `command -v pdf2md`.
2. If available, use `pdf2md "<path-to-pdf>" eng` as the default extraction tool.
3. For PDFs that may contain Russian or Turkish, use `pdf2md "<path-to-pdf>" eng+rus+tur`.
4. Read the generated Markdown from `.codex-pdf-cache/` and use it as the working source for text comparison, summarization, rubric checking, and review.
5. Do not try `strings`, `mdls`, `qlmanage`, `sips`, random Python PDF libraries, Ghostscript, or MuPDF before trying `pdf2md`.
6. If `pdf2md` fails, report the exact error before trying another method.
