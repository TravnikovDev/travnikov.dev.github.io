import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

interface Cover {
  url?: string;
  updatedAt?: string;
  alternativeText?: string;
}

// Persist outside Gatsby's cache: clean builds must copy the derivatives again,
// but need not download and encode every unchanged CMS original again.
const CACHE = path.resolve('.asset-cache/article-covers');
const OUTPUT = path.resolve('public/static/article-covers');
const WIDTHS = [384, 768, 1440];
const VERSION = 'webp-q82-v1';

export async function articleCover(
  value: unknown,
  cms: string,
  directories = { cache: CACHE, output: OUTPUT },
) {
  const cover = value as Cover | null;
  if (!cover?.url) return {};
  const url = new URL(cover.url, cms);
  if (url.origin !== new URL(cms).origin || url.protocol !== 'https:') {
    throw new Error('Article cover must be served by the configured HTTPS CMS');
  }
  const key = createHash('sha256')
    .update(`${VERSION}:${url.href}:${cover.updatedAt ?? ''}`)
    .digest('hex');
  const directory = path.join(directories.cache, key);
  const manifest = path.join(directory, 'manifest.json');
  let variants: { file: string; width: number; height: number }[];
  try {
    variants = JSON.parse(await readFile(manifest, 'utf8'));
    // Detect an incomplete/restored cache before trusting its manifest.
    await Promise.all(variants.map(v => readFile(path.join(directory, v.file))));
  } catch {
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`Article cover download: HTTP ${response.status}`);
    const original = Buffer.from(await response.arrayBuffer());
    const image = sharp(original).rotate();
    const metadata = await image.metadata();
    if (!metadata.width) throw new Error('Article cover has no image dimensions');
    const digest = createHash('sha256').update(VERSION).update(original).digest('hex').slice(0, 24);
    const widths = [...new Set(WIDTHS.map(width => Math.min(width, metadata.width)))];
    await mkdir(directory, { recursive: true });
    variants = [];
    for (const width of widths) {
      const file = `${digest}-${width}.webp`;
      const info = await image.clone().resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 }).toFile(path.join(directory, file));
      variants.push({ file, width: info.width, height: info.height });
    }
    await writeFile(manifest, JSON.stringify(variants));
  }
  await mkdir(directories.output, { recursive: true });
  await Promise.all(variants.map(v => copyFile(path.join(directory, v.file), path.join(directories.output, v.file))));
  const src = (v: typeof variants[number]) => `/static/article-covers/${v.file}`;
  const fallback = variants.find(v => v.width >= 768) ?? variants[variants.length - 1];
  return {
    coverImageUrl: src(fallback),
    coverSrcSet: variants.map(v => `${src(v)} ${v.width}w`).join(', '),
    coverWidth: fallback.width,
    coverHeight: fallback.height,
  };
}
