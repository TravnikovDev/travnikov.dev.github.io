# Turning analytics on

Both trackers are already built and wired. They are **inert until their secret
exists** — a build without them emits zero references, verified both ways. So
this is configuration, not code.

Everything below is done once, in about 15 minutes.

| Variable | Provider | Cookies | Needed for |
|---|---|---|---|
| `CF_BEACON_TOKEN` | Cloudflare Web Analytics | none | traffic, referrers, Core Web Vitals |
| `GA_MEASUREMENT_ID` | Google Analytics 4 | yes | the conversion events below |

---

## Step 1 — Cloudflare Web Analytics (5 min, no cookies)

Start here. It is cookieless, needs no consent banner, and answers "is anyone
arriving, and from where".

1. Go to <https://dash.cloudflare.com>
2. Left sidebar → **Analytics & Logs** → **Web Analytics**
3. **Add a site** → hostname `travnikov.dev`
4. Cloudflare shows a JS snippet containing:

   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
           data-cf-beacon='{"token": "abc123def456..."}'></script>
   ```

5. **Copy only the token value** — the `abc123def456...` string. Not the whole
   snippet, not the quotes, not `{"token":`.

That token is `CF_BEACON_TOKEN`.

> **Note:** if you ever move DNS for `travnikov.dev` behind Cloudflare's proxy,
> Web Analytics works server-side with no script at all, which is strictly
> faster. The beacon exists because the site is served straight from GitHub
> Pages today.

---

## Step 2 — Google Analytics 4 (5 min, sets cookies)

Read §"The consent question" below before doing this one. If you decide against
GA, skip to step 3 with only the Cloudflare token — everything still works.

1. Go to <https://analytics.google.com>
2. **Admin** (gear, bottom left) → **Create** → **Property** if you have none.
   Name it `travnikov.dev`, set the timezone to Istanbul and the currency you
   invoice in
3. In the property: **Admin** → **Data collection and modification** →
   **Data streams** → **Add stream** → **Web**
4. URL `https://travnikov.dev`, name it `travnikov.dev`
5. The stream page shows a **Measurement ID** in the form `G-XXXXXXXXXX`

That is `GA_MEASUREMENT_ID`.

> Google moves this UI around regularly. If the labels differ, what you are
> looking for is the **Measurement ID** on a **Web data stream** — it always
> starts with `G-`.

---

## Step 3 — Add both as repository secrets (2 min)

<https://github.com/TravnikovDev/travnikov.dev.github.io/settings/secrets/actions>

**New repository secret**, once per value:

| Name | Value |
|---|---|
| `CF_BEACON_TOKEN` | the token from step 1 |
| `GA_MEASUREMENT_ID` | the `G-…` from step 2 |

Names must match exactly — they are read verbatim in
`.github/workflows/pages.yml`.

Secrets are only read at build time and are never printed in logs.

---

## Step 4 — Rebuild (1 min)

Secrets are baked in at build, so the running site will not pick them up on its
own. Trigger a deploy:

<https://github.com/TravnikovDev/travnikov.dev.github.io/actions> →
**Deploy Gatsby site to Pages** → **Run workflow** → branch `main`

Any push to `main` does the same thing.

---

## Step 5 — Verify (2 min)

Do not trust the dashboards for this — they lag. Check the served HTML:

```bash
curl -s https://travnikov.dev/ | grep -o 'googletagmanager\|cloudflareinsights'
```

Both names should appear. If neither does, the secret name is wrong or the
deploy has not finished.

Then, in a browser on the live site, open DevTools → Network and confirm
requests to `googletagmanager.com` and `static.cloudflareinsights.com`.

GA's **Realtime** report should show you within a minute. Cloudflare's
dashboard typically takes a few minutes for the first data.

---

## Step 6 — Mark the conversions in GA (5 min, worth it)

The site already emits these. Without this step they are recorded but not
treated as conversions, so GA will not report them usefully.

| Event | Fires when |
|---|---|
| `generate_lead` | a contact or service form submits successfully |
| `article_50` | a reader passes half of an article |
| `article_complete` | a reader passes 90% of an article |
| `source_click` | a reader follows a citation out to a source |

In GA: **Admin** → **Events** → wait until each has fired at least once, then
toggle **Mark as key event** on `generate_lead`.

`generate_lead` is the only one that represents money. The other three tell you
whether the writing is doing its job — an article with traffic and no
`article_complete` is not working, however good the numbers look.

Submit the form on <https://travnikov.dev/contact/> once yourself to make the
event appear.

---

## The consent question

Cloudflare's beacon is cookieless and aggregates without identifying anyone, so
it needs no banner.

GA4 is different. It sets cookies and sends data to Google, and under GDPR and
ePrivacy that requires consent **before** it loads for EU visitors. This site
targets EU and US clients, so this is live rather than theoretical.

Already configured to reduce exposure:

- `anonymize_ip: true`
- `allow_google_signals: false`
- `allow_ad_personalization_signals: false`

That lowers the risk. It does not remove the consent requirement.

Three honest options:

1. **Cloudflare only.** Leave `GA_MEASUREMENT_ID` unset. No banner, no consent
   question, and you still get traffic, referrers and Core Web Vitals. The
   custom events are lost.
2. **GA plus a consent banner.** Compliant. A banner on a lead-generation page
   costs conversions, which is the thing you are trying to measure.
3. **GA as-is.** Common, not compliant, a deliberate risk you are accepting.

Option 1 needs no code change. Option 2 is a build — ask if you want it.

---

## What you get

**Cloudflare:** visits, page views, referrers, countries, devices, Core Web
Vitals from real visitors.

**GA:** the above plus the four events, plus UTM attribution — the n8n
syndication workflow tags every link it posts (`utm_source`, `utm_medium`,
`utm_campaign` = the article slug, `utm_content`), so once that runs you can
answer "which channel sent someone who actually finished reading and then
filled in the form", not just "which channel sent clicks".
