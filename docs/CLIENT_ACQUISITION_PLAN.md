# Client Acquisition Plan

> **Goal:** travnikov.dev turns a stranger into a qualified inbound inquiry.
> Not a blog, not a portfolio — a sales instrument for Roman Travnikov,
> AI automation & web architecture specialist.
>
> Written 2026-08-04, after the lead-generation audit. Companion docs:
> [CMS.md](./CMS.md) (content pipeline) · [DESIGN_VISION.md](./DESIGN_VISION.md)
> (visual system, considered complete).

---

## 1. The one-sentence test

> A CTO with a budget lands on the site from a Google search, has never heard
> of Roman, and within four minutes sends an inquiry.

Every item below either removes a reason they don't, or a reason they can't.

---

## 2. Honest diagnosis (as of 2026-08-04)

The design is finished and strong. The **funnel** is not.

| Buyer stage | State | Verdict |
| --- | --- | --- |
| Get found | No sitemap, no analytics, `og:url` broken sitewide | ❌ Invisible & unmeasurable |
| Understand the offer | Clear hero, 3 named services, dedicated pages | ✅ **The site's real strength** |
| Believe he can do it | No case studies live, no testimonials, no metrics, no logos | ❌ **Fatal** |
| Trust the person | No photo, no bio, no about page, no entity | ❌ Fatal |
| Know the terms | No pricing, no engagement model, no scope signals | ❌ Causes hesitation |
| Take the next step | All forms are `mailto:` launchers that store nothing | ❌ **Silently loses leads** |
| Get a fast reply | No notification, no CRM, no auto-reply | ❌ No mechanism |

### The three deal-losers

1. **No proof.** The employment list is a CV (*was he employed?*), not client
   evidence (*has he solved my problem, and what changed?*). The primary CTA
   "View case studies" currently lands on an empty state.
2. **The doorbell isn't wired.** Every form does
   `window.location.href = mailto:…`. On mobile and for webmail users this
   frequently does nothing visible — the prospect assumes it's broken and
   leaves. Nothing is recorded, so lost leads are undetectable.
3. **Nobody to hire.** No face, no bio, no credentials. LinkedIn — the
   strongest credibility asset — is one small footer link.

### Secondary issues

- Copy sells **activities** ("I design automation systems") not **outcomes**
  ("cut 15 hours/week of ops work").
- The actual differentiator (AI automation **+** frontend architecture in one
  person) is stated but never argued.
- Site is **live with zero content** right now (post-Strapi-cutover), so the
  blank money page is currently literal.

---

## 3. Success metrics

**You cannot improve what you cannot see — analytics is Phase 1 for a reason.**

| Metric | Type | Baseline | 6-month target |
| --- | --- | --- | --- |
| Qualified inbound inquiries / month | Lagging ⭐ | unknown (0?) | **2–5** |
| Intro calls booked / month | Lagging | 0 | 2–4 |
| Sessions / month | Leading | unmeasured | 400+ |
| Service-page → form-start rate | Leading | unmeasured | ≥8% |
| Form-start → submit rate | Leading | **unknown, likely leaking** | ≥60% |
| Case studies published | Input | 0 | ≥3 |
| Testimonials published | Input | 0 | ≥3 |
| Indexed pages in Google | Leading | unverified | all |

⭐ = the only one that pays. Everything else is a proxy.

Review cadence: check leading metrics monthly; re-run the full funnel audit
quarterly.

---

## 4. Ownership

| Owner | Scope |
| --- | --- |
| **Roman** | Client facts, numbers, testimonials, photo, bio, rates, approvals. **Irreducible — nobody else can supply these, and they are the highest-impact items.** |
| **Claude** | All code, plumbing, templates, layout, copy drafting from Roman's raw input. |

The pattern that works: Roman supplies raw material (bullet points, a dictated
voice note, a screenshot of a metric); Claude turns it into shipped pages.

---

## Phase 0 — Unblock (prerequisite, in flight)

*Nothing below matters while the site serves zero content.*

- [ ] **Strapi HTTPS.** Domains field needs the scheme so Coolify issues a
      cert: `https://strapi-…sslip.io:1337`. Currently 503 (no certificate).
- [ ] **Unblock the admin host.** Add env var
      `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=strapi-iow0oc4c0wssgwwkgoosscgw.159.195.20.145.sslip.io`,
      restart. Strapi's dev-mode Vite currently refuses the hostname.
- [ ] Create the 3 content types + read-only API token → [CMS.md](./CMS.md).
- [ ] Add GitHub secrets `STRAPI_API_URL`, `STRAPI_API_TOKEN`.
- [ ] Run `node scripts/seed-strapi.mjs` — restores the 4 posts at their
      original slugs, healing the current 404s.
- [ ] Trigger a rebuild (`gh workflow run pages.yml`) and verify content is live.

**Done when:** travnikov.dev serves its posts again and `/projects` is no
longer an empty state.

---

## Phase 1 — Wire the doorbell (highest revenue impact) 🔴

*Owner: Claude · ~1 day · Blocks nothing, unblocks everything*

Replace `mailto:` with real capture. **You already run n8n — use it, and the
build becomes case-study material for the very service you sell.**

Architecture:

```
form submit ──► POST n8n webhook ──► ├─ append to store (Sheets/DB/Strapi)
                                     ├─ instant notify (Telegram/email)
                                     └─ auto-reply to the prospect
        ◄── JSON ok ──► inline success state (no page leave)
```

- [ ] n8n webhook endpoint + workflow (Roman: create; Claude: specify payload)
- [ ] Repoint all 4 forms (3 service pages + contact) at the webhook
- [ ] Real states: loading → success → **error with a mailto fallback**
      (never lose a lead to a failed request)
- [ ] Honeypot + timing check for spam (no CAPTCHA — it costs conversions)
- [ ] Keep the email address out of the markup (scraper hygiene)
- [ ] Track `form_start` and `form_submit` events (needs Phase 4 analytics)

**Acceptance:** submitting on a phone with no mail app configured produces a
stored lead, a notification within seconds, and an on-screen confirmation.

---

## Phase 2 — Proof (the thing that actually sells) 🔴

*Owner: **Roman** (facts) → Claude (build) · The single highest-value work*

### 2a. Three case studies

Anonymized is fine ("a US logistics platform"). Template — fill this per
engagement and Claude turns it into a page:

```
Client/sector:      (e.g. "US freight-logistics SaaS, ~40 staff")
The problem:        what hurt, in their words, with a number if possible
What I did:         3–5 bullets, concrete, technical but readable
Stack:              tech used
Outcome:            ⭐ at least ONE measurable change
                    (LCP 4.2s → 0.9s · 15 hrs/week saved · +18% signups)
Duration/model:     "6 weeks, fixed scope" / "3 months, part-time retainer"
Quote:              one sentence from them, if obtainable
```

- [ ] Case study 1 — automation (supports the AI Automation service)
- [ ] Case study 2 — performance (supports Web Performance)
- [ ] Case study 3 — leadership/architecture (supports Fractional CTO)
- [ ] Claude: build them in Strapi, surface on home + `/projects`
- [ ] **Delete the sample "E-commerce Dashboard"** — its GitHub link is dead
      and it reads as filler

> If real numbers are unavailable, use honest qualitative outcomes ("cut the
> release cycle from fortnightly to daily"). Vague is survivable; **empty is not**.

### 2b. Testimonials (1 hour, outsized return)

Ask 3 former managers/colleagues on LinkedIn today. Suggested message:

> Hi X — I'm building out my consulting site and would value a couple of
> sentences from you about working together at Y: what I was brought in to
> fix, and what changed. Two or three sentences is plenty, and I'm happy to
> draft something for you to correct.

- [ ] 3 testimonials collected (name + role + company + photo if possible)
- [ ] Claude: place one in the hero area, others on service pages
- [ ] Request LinkedIn recommendations at the same time (they compound)

---

## Phase 3 — Become a person 🟠

*Owner: Roman (raw input) → Claude (page) · ~half a day*

- [ ] **Professional photo.** Real one — the turquoise sphere is a brand mark,
      not a face.
- [ ] **`/about` page:** who you help, how you got here, what you're doing
      *now* (2026 — the experience list stops at 2024 and the gap is the first
      thing a recruiter or client notices), how you work, where you're based.
- [ ] **Byline on every article and case study** (photo + one-line bio + links).
- [ ] **Promote LinkedIn** out of the footer — header or about page.
- [ ] Legal/business entity + invoicing reality, if relevant to clients.
- [ ] Replace `static/Travnikov_resume_2022.pdf` (four years stale, linked
      from nowhere) or delete it.

---

## Phase 4 — Reduce friction & measure 🟠

*Owner: Claude · ~1 day*

- [ ] **Booking link** — "Book a 20-min intro call" (Cal.com/Calendly) next to
      every form. Converts prospects who will never compose an email.
- [ ] **Engagement terms** section: how you work (audit → project → retainer),
      typical scope, indicative rate band. Filters tire-kickers *and*
      reassures serious buyers. Absence reads as "expensive and unclear."
- [ ] **Response promise:** "I reply within one business day."
- [ ] **Analytics** (Plausible/Umami — privacy-friendly, no cookie banner):
      sessions, sources, service-page funnel, form events, booking clicks.
- [ ] **Outcome-first copy rewrite** on the three service pages: lead with
      what the client gets, support with what you do.
- [ ] **Argue the differentiator** — one section making the case that
      automation + architecture in one person beats hiring two.

---

## Phase 5 — Get found 🟡

*Owner: Claude · ~half a day · Compounds slowly; start early*

Confirmed technical defects:

- [ ] **`og:url` is the homepage on every page.** [SEO.tsx](../src/utils/seo/SEO.tsx)
      accepts `pathname` but no page passes it — every shared link points at
      the homepage instead of the content.
- [ ] **`og:type` hardcoded `website`** — should be `article` on posts, with
      `article:published_time` and author.
- [ ] **No canonical tags.**
- [ ] **No `Article` / `Person` / `ProfessionalService` JSON-LD** — this is
      what earns rich results.
- [ ] **OG image is `banner.jpg` from October 2022** — every share shows the
      pre-redesign brand.
- [ ] `gatsby-plugin-sitemap` + `robots.txt`.
- [ ] Google Search Console + Bing verification, sitemap submitted.
- [ ] Service pages target real search intent ("react performance consultant",
      "n8n automation consultant", "fractional cto for startups").

---

## Phase 6 — The compounding engine 🟡

*Owner: both · Ongoing · This is where inbound actually comes from*

Traffic is the input to the whole funnel; without it the work above converts
zero visitors perfectly.

- [ ] **Publish substantively.** Current posts are 112–355-word stubs and the
      "1 MIN READ" label advertises it. Two or three 1,200-word pieces that
      genuinely help a CTO beat ten stubs.
- [ ] **Write from client problems** — each post should map to a service and
      end with a relevant CTA.
- [ ] **RSS feed** (`gatsby-plugin-feed`) + email capture. Without either,
      every reader is a one-time visitor.
- [ ] **Distribution:** LinkedIn is where your buyers are. Post the argument,
      link the article. Repurpose one article into 3–5 LinkedIn posts.
- [ ] **The n8n → Strapi content fabric is itself the proof.** Document it,
      publish it, and it becomes simultaneously a case study, a lead magnet,
      and a demonstration that your automation pitch is real.
- [ ] Tag pages, related posts, next/prev — turn one post into a session.

---

## 5. Sequencing

```
Phase 0  Unblock             ██  (in flight — nothing works without it)
Phase 1  Lead capture        ████            ← start here after 0
Phase 2  Proof                   ████████    ← Roman, in parallel, most valuable
Phase 3  Identity                  ████
Phase 4  Friction + measure           ████
Phase 5  Discovery                       ███
Phase 6  Content engine                    ██████████ ongoing
```

**If only three things ever get done: Phase 1 (capture), Phase 2 (proof),
Phase 3 (a face).** Those three convert the traffic you already have.

---

## 6. Known technical debt (unrelated to the funnel)

- GitHub Actions: `checkout@v4`, `setup-node@v4`, `cache@v4`,
  `configure-pages@v4`, `upload-artifact@v4` are Node-20 based and being
  force-run on Node 24 — bump to v5 before it hard-fails.
- Hero "Web Architecture" lattice glyph still shows its bounding box (parked —
  3D work frozen by request).
- ~80 hard-coded colours remain outside the files already migrated to tokens.
- Constraints for any implementation: see
  [PROHIBITED_LIBRARIES.md](./PROHIBITED_LIBRARIES.md) — no framer-motion,
  GSAP, lodash, or CSS-in-JS.

---

## 7. What "done" looks like

The site is working when, in a single month, three people you have never met
fill in a form or book a call, and at least one of them mentions a specific
case study or article as the reason they reached out.
