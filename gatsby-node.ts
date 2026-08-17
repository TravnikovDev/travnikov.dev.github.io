import { GatsbyNode } from 'gatsby';
import path from 'path';
import { marked } from 'marked';

// Content comes from Strapi v5 (see docs/CMS.md). Sourcing is tolerant-empty:
// without STRAPI_API_URL the build succeeds with zero content (so local
// tooling and CI without secrets keep working), but if the env is set and the
// API fails, the build panics rather than silently deploying an empty site.
const STRAPI_URL = process.env.STRAPI_API_URL?.replace(/\/$/, '');
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiEntry = Record<string, unknown> & { id: number; documentId: string };

async function fetchCollection(
  apiId: string,
  populate: string[] = []
): Promise<StrapiEntry[]> {
  const entries: StrapiEntry[] = [];
  let page = 1;
  let pageCount = 1;
  while (page <= pageCount) {
    // Strapi 400s on populate for a field the type doesn't have, so this is
    // passed per-collection rather than applied globally.
    const populateQs = populate
      .map((f, i) => `&populate[${i}]=${f}`)
      .join('');
    const url =
      `${STRAPI_URL}/api/${apiId}` +
      `?pagination[page]=${page}&pagination[pageSize]=100&sort=createdAt:desc` +
      populateQs;
    const res = await fetch(url, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
    });
    if (!res.ok) {
      throw new Error(`Strapi ${apiId} responded ${res.status} ${res.statusText}`);
    }
    const json = (await res.json()) as {
      data: StrapiEntry[];
      meta: { pagination: { pageCount: number } };
    };
    entries.push(...json.data);
    pageCount = json.meta.pagination.pageCount;
    page += 1;
  }
  return entries;
}

const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const strArr = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((t): t is string => typeof t === 'string') : [];

const renderMarkdown = (body: string): { html: string; timeToRead: number } => {
  const html = marked.parse(body, { async: false }) as string;
  const words = body.split(/\s+/).filter(Boolean).length;
  return { html, timeToRead: Math.max(1, Math.round(words / 200)) };
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const { createNode } = actions;

  if (!STRAPI_URL) {
    reporter.warn(
      'STRAPI_API_URL is not set — building with EMPTY content. ' +
        'Set STRAPI_API_URL and STRAPI_API_TOKEN (see docs/CMS.md) for a real build.'
    );
    return;
  }

  const makeNode = (
    type: string,
    entry: StrapiEntry,
    fields: Record<string, unknown>
  ) => {
    createNode({
      ...fields,
      strapiId: entry.documentId,
      id: createNodeId(`${type}-${entry.documentId}`),
      internal: {
        type,
        contentDigest: createContentDigest(fields),
      },
    });
  };

  try {
    const [articles, caseStudies, experiments] = await Promise.all([
      fetchCollection('articles', ['cover']),
      fetchCollection('case-studies'),
      fetchCollection('experiments'),
    ]);

    // Strapi returns media as a relation object; flatten it to an absolute
    // URL + alt so templates don't need to know the CMS shape.
    const media = (v: unknown) => {
      const m = v as { url?: string; alternativeText?: string } | null;
      if (!m?.url) return { coverUrl: null, coverAlt: null };
      return {
        coverUrl: m.url.startsWith('http') ? m.url : `${STRAPI_URL}${m.url}`,
        coverAlt: m.alternativeText ?? null,
      };
    };

    for (const entry of articles) {
      const { html, timeToRead } = renderMarkdown(str(entry.body));
      makeNode('BlogPost', entry, {
        title: str(entry.title),
        slug: str(entry.slug),
        date: str(entry.date) || str(entry.publishedAt),
        excerpt: str(entry.excerpt),
        tags: strArr(entry.tags),
        ...media(entry.cover),
        html,
        timeToRead,
      });
    }

    for (const entry of caseStudies) {
      const { html } = renderMarkdown(str(entry.body));
      makeNode('CaseStudy', entry, {
        title: str(entry.title),
        slug: str(entry.slug),
        description: str(entry.description),
        category: str(entry.category),
        url: str(entry.url) || null,
        tags: strArr(entry.tags),
        html,
      });
    }

    for (const entry of experiments) {
      const { html } = renderMarkdown(str(entry.body));
      makeNode('Experiment', entry, {
        title: str(entry.title),
        slug: str(entry.slug),
        description: str(entry.description),
        demoUrl: str(entry.demoUrl) || null,
        technologies: strArr(entry.technologies),
        html,
      });
    }

    reporter.info(
      `Strapi: sourced ${articles.length} articles, ` +
        `${caseStudies.length} case studies, ${experiments.length} experiments`
    );
  } catch (error) {
    reporter.panicOnBuild(
      `Failed to source content from Strapi at ${STRAPI_URL}: ${String(error)}`
    );
  }
};

// Explicit types so pages build (and queries validate) even with zero content
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    actions.createTypes(`
      type BlogPost implements Node {
        title: String!
        slug: String!
        date: Date @dateformat
        excerpt: String
        tags: [String]
        coverUrl: String
        coverAlt: String
        html: String
        timeToRead: Int
      }
      type CaseStudy implements Node {
        title: String!
        slug: String!
        description: String
        category: String
        url: String
        tags: [String]
        html: String
      }
      type Experiment implements Node {
        title: String!
        slug: String!
        description: String
        demoUrl: String
        technologies: [String]
        html: String
      }
    `);
  };

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<{
    allBlogPost: { nodes: { id: string; slug: string }[] };
    allCaseStudy: { nodes: { id: string; slug: string }[] };
    allExperiment: { nodes: { id: string; slug: string }[] };
  }>(`
    query {
      allBlogPost {
        nodes {
          id
          slug
        }
      }
      allCaseStudy {
        nodes {
          id
          slug
        }
      }
      allExperiment {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const pageSets: {
    nodes: { id: string; slug: string }[];
    prefix: string;
    component: string;
  }[] = [
    {
      nodes: result.data?.allBlogPost.nodes ?? [],
      prefix: '/blog',
      component: path.resolve('./src/templates/BlogTemplate.tsx'),
    },
    {
      nodes: result.data?.allCaseStudy.nodes ?? [],
      prefix: '/projects',
      component: path.resolve('./src/templates/ProjectTemplate.tsx'),
    },
    {
      nodes: result.data?.allExperiment.nodes ?? [],
      prefix: '/experiments',
      component: path.resolve('./src/templates/ExperimentTemplate.tsx'),
    },
  ];

  for (const { nodes, prefix, component } of pageSets) {
    for (const node of nodes) {
      createPage({
        path: `${prefix}/${node.slug}/`,
        component,
        context: { id: node.id },
      });
    }
  }
};

// The site had no sitemap, no robots.txt and no feed. Generated here rather
// than pulling in three plugins for a handful of files.
export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter }) => {
  const SITE = 'https://travnikov.dev';
  const fs = await import('fs/promises');
  const out = (name: string, body: string) =>
    fs.writeFile(path.join('public', name), body, 'utf8');

  const result = await graphql<{
    allSitePage: { nodes: { path: string }[] };
    allBlogPost: {
      nodes: {
        title: string;
        slug: string;
        excerpt: string;
        date: string;
      }[];
    };
  }>(`
    query {
      allSitePage { nodes { path } }
      allBlogPost(sort: { date: DESC }) {
        nodes { title slug excerpt date }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.warn('Could not build sitemap/feed');
    return;
  }

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // 404s and Gatsby's internal shells are not content
  const pages = result.data.allSitePage.nodes
    .map((n) => n.path)
    .filter((p) => !/^\/(404|dev-404-page|offline-plugin)/.test(p))
    .sort();

  await out(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      pages
        .map(
          (p) =>
            `  <url><loc>${SITE}${p}</loc>` +
            `<priority>${p === '/' ? '1.0' : '0.7'}</priority></url>`
        )
        .join('\n') +
      `\n</urlset>\n`
  );

  await out(
    'robots.txt',
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
  );

  const posts = result.data.allBlogPost.nodes;
  await out(
    'rss.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n` +
      `  <title>Roman Travnikov — Insights</title>\n` +
      `  <link>${SITE}/blog/</link>\n` +
      `  <description>Notes on AI automation, web performance, and technical leadership.</description>\n` +
      `  <language>en</language>\n` +
      `  <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>\n` +
      posts
        .map(
          (p) =>
            `  <item>\n` +
            `    <title>${esc(p.title)}</title>\n` +
            `    <link>${SITE}/blog/${p.slug}/</link>\n` +
            `    <guid isPermaLink="true">${SITE}/blog/${p.slug}/</guid>\n` +
            `    <description>${esc(p.excerpt)}</description>\n` +
            `    <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n` +
            `  </item>`
        )
        .join('\n') +
      `\n</channel>\n</rss>\n`
  );

  reporter.info(
    `Generated sitemap.xml (${pages.length} urls), robots.txt and rss.xml (${posts.length} items)`
  );
};
