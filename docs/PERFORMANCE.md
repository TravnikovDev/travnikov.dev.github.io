# Website performance

## Responsive article covers

Strapi retains the originals and their metadata. During content sourcing,
`src/utils/article-covers.ts` generates 384, 768, and 1440 px WebP derivatives
(without enlarging smaller originals) under `public/static/article-covers/`.
The archive, article template, and homepage select a derivative using `srcset`
and layout-specific `sizes`. The original remains the social/structured-data
image. No article content or CMS media record is changed by the build.

Filenames contain a content hash and an encoding-version hash. The ignored
`.asset-cache/article-covers/` stores derivatives and manifests keyed by the
CMS URL, media `updatedAt`, and encoder version. CI restores that cache outside
Gatsby's cleanable cache, then copies the current derivatives into each clean
build. Downloads have a timeout and fail the build on HTTP/encoding errors.
Increment the encoder version when changing image transformation settings.

The first archive cover and article cover load eagerly with high priority.
Other covers remain lazy. All articles stay on one archive page.

## Background and CSS

The aura has a server-rendered CSS fallback. The WebGL enhancement is dynamically
imported after window load in an idle callback, keeping Three.js out of the
initial page dependency chain. Reduced-motion and Save-Data visitors retain
the static aura. Navigation does not require WebGL.

`src/mantine.css` includes the used components and their internal dependencies,
rather than the full widget library. Add dependency styles when introducing a
new Mantine component. Fontsource's language ranges remain intact, but Gatsby's
font inlining is disabled so unused small subsets and WOFF fallbacks are not
embedded into every page's CSS.

## HTTP asset caching: GitHub Pages limitation

GitHub Pages currently returns `Cache-Control: max-age=600`. A repository
`_headers` file or HTML meta tag does not change those HTTP response headers.
On 15 November 2026 the owner chose to keep GitHub Pages without adding a CDN
or changing hosting. The cache lifetime suggestion is therefore deferred.
No infrastructure rules, service worker, or artificial cache-header files have
been added. Hashed asset names remain safe for existing browser caching, and
HTML/page-data freshness is preserved for future Strapi publications.
