#!/usr/bin/env node
/**
 * One-time seed: pushes the markdown content in src/content/ into Strapi v5.
 *
 * Usage:
 *   STRAPI_API_URL=https://cms.example.com STRAPI_SEED_TOKEN=<full-access-token> \
 *     node scripts/seed-strapi.mjs [--draft]
 *
 * --draft creates entries as drafts (default publishes them immediately).
 * Requires the content types described in docs/CMS.md to exist first.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const API_URL = (process.env.STRAPI_API_URL ?? "").replace(/\/$/, "");
const TOKEN = process.env.STRAPI_SEED_TOKEN ?? process.env.STRAPI_API_TOKEN;
const asDraft = process.argv.includes("--draft");

if (!API_URL || !TOKEN) {
  console.error(
    "Set STRAPI_API_URL and STRAPI_SEED_TOKEN (a full-access API token)."
  );
  process.exit(1);
}

// The markdown files open with "# <title>", which Strapi entries don't need —
// the site renders the title field separately.
const stripLeadingH1 = (body) => body.replace(/^\s*# .*\n+/, "");

async function readCollection(dir) {
  const root = path.join(process.cwd(), "src", "content", dir);
  const files = (await readdir(root)).filter((f) => f.endsWith(".md"));
  const entries = [];
  for (const file of files) {
    const raw = await readFile(path.join(root, file), "utf8");
    const { data, content } = matter(raw);
    entries.push({ frontmatter: data, body: stripLeadingH1(content.trim()) });
  }
  return entries;
}

async function createEntry(apiId, data) {
  const url = `${API_URL}/api/${apiId}${asDraft ? "" : "?status=published"}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${apiId} <- "${data.title}": ${res.status} ${text}`);
  }
  console.log(`  ✓ ${apiId}: ${data.title}`);
}

console.log(`Seeding Strapi at ${API_URL} (${asDraft ? "drafts" : "published"})`);

for (const entry of await readCollection("blog")) {
  const fm = entry.frontmatter;
  await createEntry("articles", {
    title: fm.title,
    slug: fm.slug,
    date: fm.date,
    excerpt: fm.excerpt ?? "",
    tags: fm.tags ?? [],
    body: entry.body,
  });
}

for (const entry of await readCollection("projects")) {
  const fm = entry.frontmatter;
  await createEntry("case-studies", {
    title: fm.title,
    slug: fm.slug,
    description: fm.description ?? "",
    category: fm.category ?? "",
    url: fm.url ?? null,
    tags: fm.tags ?? [],
    body: entry.body,
  });
}

for (const entry of await readCollection("experiments")) {
  const fm = entry.frontmatter;
  await createEntry("experiments", {
    title: fm.title,
    slug: fm.slug,
    description: fm.description ?? "",
    demoUrl: fm.demoUrl ?? null,
    technologies: fm.technologies ?? [],
    body: entry.body,
  });
}

console.log("Done.");
