# Content fabric

Three workflows. Two of them form the pipeline, split at the point a human
decides; the third feeds it ideas. Import all three, keep them inactive until
you have walked the checklist below.

```
03 scout (weekday 08:00) ──► research ──► ideas ──► Telegram
                                                       │
                                       you pick one and forward it
                                                       │
                                                       ▼
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

| | 01 capture | 02 syndicate | 03 scout |
|---|---|---|---|
| Trigger | Telegram message, or Manual | Strapi `entry.publish` webhook, or Manual | Weekdays 08:00, or Manual |
| Writes | one Strapi **draft** | LinkedIn, X, Telegram, site rebuild | nothing — one Telegram message |
| Idempotent | yes, by slug | no — re-running posts again | yes, it only reads |

## 03 scout

Runs every weekday morning, reads what is already in Strapi so it stops
pitching things you have covered, scans the last fortnight in your three
service areas, and sends 3-5 ideas to Telegram.

Each idea arrives with a hook, what happened and when, who it is for, and the
angle only you can take — plus a pasteable brief block. Copy the block, send it
to the capture bot, and 01 turns it into a draft. That is the whole loop.

It is the safest of the three: it has no write path anywhere. Turn it on first.

The dedupe is deliberately crude — significant-word overlap against existing
titles, dropping anything over 60%. It exists to catch the model re-pitching a
topic because the research surfaced the same source again. Lower the threshold
in `Normalize And Dedupe` if it starts eating good ideas.

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

0. `03`: import, Manual Trigger, read what lands in Telegram. Nothing it does
   is destructive, so if the ideas are good, activate it and leave it running
   while you work through the rest.
1. Import all three. **Leave 01 and 02 inactive.**
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

## Node versions and error handling

Validated against the n8n node database, not written from memory. Every node
sits on its current `typeVersion`:

| Node | Version | | Node | Version |
|---|---|---|---|---|
| agent | 3.1 | | httpRequest | 4.5 |
| lmChatOpenAi | 1.3 | | set | 3.5 |
| openAi (langchain) | 2.3 | | if | 2.3 |
| perplexity | 2 | | switch | 3.4 |
| telegramTrigger | 1.5 | | merge | 3.2 |
| telegram | 1.2 | | webhook | 2.1 |
| scheduleTrigger | 1.3 | | code | 2 |

Two things the template carried that are now stale:

- **`continueOnFail` is deprecated.** Replaced with `onError:
  "continueRegularOutput"` everywhere. Both express the same intent, but only
  the new one is read by current n8n.
- **Agent nodes were on 1.7.** That is three majors behind; 3.1 is current.

Every node that touches the network — Strapi, Perplexity, OpenAI, Telegram,
LinkedIn, X, GitHub — also carries `retryOnFail` with two tries and a two
second gap. A provider blip should cost a retry, not the whole run.

## Providers

Only OpenAI and Perplexity do the thinking:

- **OpenAI** — gpt-5.4 for the article and the idea scout, gpt-5.4-mini for the
  LinkedIn post, gpt-5.4-nano for the brief, X version, image prompt and the
  Russian caption, gpt-image-2 for images, gpt-transcribe for voice.
- **Perplexity** — sonar-pro, both research stages, as the native node.

Everything else is a destination, not a model: Telegram, LinkedIn, X, GitHub,
Strapi.
