# Content fabric

Two workflows, split at the point a human decides. Import both, keep both
inactive until you have walked the checklist below.

```
Telegram (text or voice)
   └─► 01 capture ──► research ──► article ──► Strapi DRAFT
                                                  │
                                        you read it and publish
                                                  │
                                    Strapi webhook (entry.publish)
                                                  │
   ┌──────────────────────────────────────────────┘
   └─► 02 syndicate ──┬─► LinkedIn (post + image)
                      ├─► X
                      ├─► Telegram channel (RU, with image)
                      └─► GitHub dispatch ──► site rebuild
```

## Why two workflows and not one

The original fabric generated and published in a single pass, which means the
only way to stop a bad article is to be fast enough to catch it. Splitting at
the draft makes the review step structural rather than optional: capture can
only ever write a draft, and syndication only ever fires on something already
published by hand.

It also makes each half independently testable, and lets you re-run
syndication for an article that already exists without regenerating it.

| | 01 capture | 02 syndicate |
|---|---|---|
| Trigger | Telegram message, or Manual | Strapi `entry.publish` webhook, or Manual |
| Writes | one Strapi **draft** | LinkedIn, X, Telegram, site rebuild |
| Idempotent | yes, by slug | no — re-running posts again |

## Environment

Set on the n8n instance (Settings → Variables, or the container env):

| Variable | Used by | Value |
|---|---|---|
| `STRAPI_URL` | both | `https://cms.travnikov.dev` |
| `STRAPI_API_TOKEN` | both | Strapi API token with read + write on Article |

Credentials referenced by ID, already on the instance: OpenAI, Perplexity,
Telegram, LinkedIn, X, GitHub. On import n8n binds them by ID; if any come up
empty, re-select them once in the node.

## Rollout

1. Import both. **Leave them inactive.**
2. `01`: Manual Trigger → Staging Test Input with a real idea, `publishStrapi`
   still **false**. Confirm the article body in the execution log reads like
   you and the slug is sane.
3. `01`: set `publishStrapi = true`. Run again. Confirm a draft appears in
   Strapi, and that re-running the same idea *updates* it rather than creating
   a duplicate.
4. Activate `01`. Point Telegram at it. Send a voice note.
5. `02`: Manual Trigger with the slug of something already published, all
   flags **false**. Confirm the fetch resolves and the LinkedIn/X/RU drafts in
   the log are worth posting.
6. `02`: enable one flag at a time — `rebuildSite` first, it is the cheapest
   to undo. Then `generateImage`, then `publishTelegram`, then `publishX`,
   then `publishLinkedIn` last, because it is the one with an audience that
   matters.
7. Activate `02` and add the Strapi webhook: Settings → Webhooks → new, URL =
   the production webhook URL from the trigger node, event `entry.publish`,
   scoped to Article.

Rollback at any point: deactivate, flip the flag back to false.

## Notes

**Every branch reports.** Published or skipped, each platform emits one
`{platform, status, url|reason|error}` object into the merge, so the summary
message distinguishes "skipped because the flag is off" from "failed". Silent
success and silent failure look identical otherwise, which is how a broken
publisher goes unnoticed for a week.

**LinkedIn and Telegram need the image.** Both attach one, so both are skipped
when `generateImage` is false — the skip reason says which flag caused it.

**Image style is for LinkedIn, not the site.** The prompt in `02` is the pastel
Boho/Bauhaus icon style, which suits a light social feed. The site's article
covers use a different, darker language that sits on the ink sheets. If you
ever have `02` write a cover back to Strapi, it needs the dark variant, not
this one.

**Voice uses `gpt-transcribe` over raw HTTP**, not n8n's Transcribe operation,
which still pins `whisper-1`.

**Article agent is told to date seasonal pieces.** A post about an upcoming
event that cites last year's numbers reads as stale unless the target year is
in the title and first line — that is a real failure this content already hit
once.
