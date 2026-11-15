/** @jest-environment node */
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { articleCover } from '../article-covers';

const CMS = 'https://cms.travnikov.dev';
let directory: string;
let directories: { cache: string; output: string };
let request: jest.SpyInstance;

beforeEach(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), 'article-covers-'));
  directories = { cache: path.join(directory, 'cache'), output: path.join(directory, 'public') };
  request = jest.spyOn(global, 'fetch');
});

afterEach(async () => {
  request.mockRestore();
  await rm(directory, { recursive: true, force: true });
});

async function mockImage(width = 1024) {
  const image = await sharp({ create: { width, height: width / 2, channels: 3, background: '#8dd4c8' } }).png().toBuffer();
  request.mockResolvedValue({ ok: true, arrayBuffer: async () => image });
}

it('writes real responsive WebP images and restores them after a clean build without downloading again', async () => {
  await mockImage();
  const cover = { url: '/uploads/cover.png', updatedAt: '2026-11-15T00:00:00Z' };
  const result = await articleCover(cover, CMS, directories);
  const candidates = result.coverSrcSet.split(', ').map(candidate => candidate.split(' '));
  expect(candidates.map(([, width]) => width)).toEqual(['384w', '768w', '1024w']);
  for (const [url, descriptor] of candidates) {
    const metadata = await sharp(await readFile(path.join(directories.output, path.basename(url)))).metadata();
    expect(metadata.format).toBe('webp');
    expect(metadata.width).toBe(parseInt(descriptor));
    expect(metadata.height).toBe(metadata.width / 2);
  }
  await rm(directories.output, { recursive: true });
  expect(await articleCover(cover, CMS, directories)).toEqual(result);
  expect(request).toHaveBeenCalledTimes(1);
  expect(await readFile(path.join(directories.output, path.basename(result.coverImageUrl)))).toBeInstanceOf(Buffer);
});

it('never enlarges a small original or duplicates its candidate widths', async () => {
  await mockImage(96);
  const result = await articleCover({ url: '/uploads/small.png' }, CMS, directories);
  expect(result.coverSrcSet).toMatch(/\.webp 96w$/);
  expect(result.coverSrcSet).not.toContain(',');
  expect([result.coverWidth, result.coverHeight]).toEqual([96, 48]);
});

it('invalidates a cached cover when the CMS media timestamp changes', async () => {
  await mockImage(96);
  await articleCover({ url: '/uploads/cover.png', updatedAt: 'old' }, CMS, directories);
  await articleCover({ url: '/uploads/cover.png', updatedAt: 'new' }, CMS, directories);
  expect(request).toHaveBeenCalledTimes(2);
});

it('rejects failed downloads and unexpected origins instead of silently shipping oversized images', async () => {
  request.mockResolvedValue({ ok: false, status: 404 });
  await expect(articleCover({ url: '/uploads/missing.png' }, CMS, directories)).rejects.toThrow('HTTP 404');
  await expect(articleCover({ url: 'https://other.example/cover.png' }, CMS, directories)).rejects.toThrow('configured HTTPS CMS');
  expect(request).toHaveBeenCalledTimes(1);
});

it('supports an article without a cover', async () => {
  expect(await articleCover(null, CMS, directories)).toEqual({});
  expect(request).not.toHaveBeenCalled();
});
