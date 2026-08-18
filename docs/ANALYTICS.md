# Analytics

Two trackers, both **off unless their env var is set**. Nothing is committed to
the repo and local builds stay clean.

| Variable | Provider | Cookies |
|---|---|---|
| `CF_BEACON_TOKEN` | Cloudflare Web Analytics | none |
| `GA_MEASUREMENT_ID` | Google Analytics 4 | yes |

Both are injected from `gatsby-ssr.ts` and passed to CI in
`.github/workflows/pages.yml`. Add them as **repository secrets**
(Settings → Secrets and variables → Actions), then re-run the deploy.

## Getting the values

**Cloudflare** — dash.cloudflare.com → Analytics & Logs → Web Analytics → add
`travnikov.dev`. It shows a snippet containing
`data-cf-beacon='{"token":"abc123..."}'`. The secret is that token only, not
the whole snippet.

Note: if the domain is proxied through Cloudflare you can enable Web Analytics
without any script at all, which is faster. This beacon path is for when the
site is served from GitHub Pages without proxying — which is the case today.

**Google Analytics** — analytics.google.com → Admin → Data Streams → Web →
`travnikov.dev`. The secret is the Measurement ID, `G-XXXXXXXXXX`.

## The consent question

Cloudflare's beacon is cookieless and aggregates without identifying visitors,
so it needs no banner.

GA4 is different. It sets cookies and sends data to Google, and under GDPR/
ePrivacy that requires consent *before* it loads for EU visitors. This site
targets EU and US clients, so it is a live question, not a theoretical one.

What is configured to reduce exposure:

- `anonymize_ip: true`
- `allow_google_signals: false`
- `allow_ad_personalization_signals: false`

That lowers the risk but does not remove the consent requirement. Options:

1. **Cloudflare only.** No banner, no consent, covers traffic, referrers and
   Core Web Vitals — enough to answer "is this working?".
2. **Keep GA, add a consent gate.** Correct, and costs a banner — which itself
   costs conversions on a lead-gen page.
3. **Keep GA as-is.** Deliberate risk acceptance. Common, not compliant.

Nothing here forces a choice: leaving `GA_MEASUREMENT_ID` unset gives option 1
with no code change.
