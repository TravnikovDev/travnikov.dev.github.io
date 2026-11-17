/** @jest-environment node */
import { buildRelatedArticleIds, RelatedArticle } from '../related-articles';

const article = (id: string, title: string, fields: Partial<RelatedArticle> = {}): RelatedArticle => ({
  id, slug: id, title, date: '2026-01-01', ...fields,
});

it('recommends an older specific topic before a new post sharing a broad AI tag', () => {
  const posts = [
    article('source', 'MCP tool permissions', { tags: ['AI', 'MCP'], body: 'An MCP filesystem tool needs permission checks and isolation.' }),
    article('mcp', 'Read-only MCP filesystem isolation', { tags: ['MCP', 'Security'], date: '2025-01-01', body: 'Enforce permission checks for the filesystem server.' }),
    article('newest', 'AI discovers a distant galaxy', { tags: ['AI', 'Astronomy'], date: '2026-11-17', body: 'A telescope measures light from stars.' }),
  ];
  expect(buildRelatedArticleIds(posts).get('source')?.[0]).toBe('mcp');
});

it('recognises case, punctuation and plural variants of the same topic tag', () => {
  const posts = [
    article('source', 'Inspect a completed run', { tags: ['AI Agents'] }),
    article('related', 'Prevent repeated purchases', { tags: ['ai-agent'] }),
    article('unrelated', 'Study coastal erosion', { tags: ['Geology'], date: '2026-11-17' }),
  ];
  expect(buildRelatedArticleIds(posts).get('source')).toEqual(['related']);
});

it('uses summaries and article content when hooks do not name the shared topic', () => {
  const posts = [
    article('source', 'Keep the route back', { excerpt: 'Persist a calendar sync token.', body: 'Calendar synchronisation must process deletions and recover invalid tokens.' }),
    article('related', 'A brief can be stale', { excerpt: 'Calendar synchronisation needs a checkpoint.', body: 'An invalid calendar sync token requires a full resynchronisation.' }),
    article('unrelated', 'Count the stars', { body: 'A telescope measures stellar distance.' }),
  ];
  expect(buildRelatedArticleIds(posts).get('source')?.[0]).toBe('related');
});

it('keeps image performance with web engineering instead of a shared SEO label', () => {
  const posts = [
    article('webp', 'A smaller WebP file can still arrive too late', { tags: ['Development', 'Performance', 'SEO'], body: 'Search ranking claims need a measurement.' }),
    article('frontend', 'The frontend work a screenshot cannot show', { tags: ['Frontend', 'Accessibility', 'Performance'] }),
    article('backlinks', 'A Gist backlink comes without a ranking-credit receipt', { tags: ['SEO', 'Development', 'Marketing'], body: 'Search ranking claims need a measurement.', date: '2026-11-17' }),
  ];
  expect(buildRelatedArticleIds(posts).get('webp')).toEqual(['frontend']);
});

it('distinguishes nuclear models from AI models despite similar phrasing', () => {
  const posts = [
    article('reactor', 'A nuclear reactor needs a model', { tags: ['Engineering', 'Science'], body: 'Evaluate the model and its evidence.' }),
    article('power', 'Negative power prices', { tags: ['Energy', 'Infrastructure'] }),
    article('provider', 'The AI model needs an evaluation', { tags: ['AI', 'Engineering'], body: 'Evaluate the model and its evidence.', date: '2026-11-17' }),
  ];
  expect(buildRelatedArticleIds(posts).get('reactor')).toEqual(['power']);
});

it('does not infer a topic from a citation URL or a fenced code example', () => {
  const posts = [
    article('source', 'Coffee brewing', { body: 'Measure coffee extraction. [Paper](https://example.com/galaxy-telescope-stars)\n```\ngalaxy telescope stars\n```' }),
    article('related', 'Coffee extraction ratios', { body: 'Brewing coffee requires an extraction measurement.' }),
    article('unrelated', 'Galaxy telescope stars', { date: '2026-11-17' }),
  ];
  expect(buildRelatedArticleIds(posts).get('source')).toEqual(['related']);
});

it('excludes the current URL and deduplicates candidate IDs and URLs without mutating input', () => {
  const posts = [
    article('source', 'Workflow retries', { tags: ['Automation'] }),
    article('alias', 'Workflow retries', { slug: 'source', tags: ['Automation'] }),
    article('related', 'Workflow retries and completion', { tags: ['Automation'] }),
    article('related', 'Workflow retries and completion', { tags: ['Automation'] }),
    article('duplicate-url', 'Workflow retries and completion', { slug: 'related', tags: ['Automation'] }),
  ];
  const snapshot = JSON.stringify(posts);
  const ids = buildRelatedArticleIds(posts).get('source')!;
  expect(ids).toHaveLength(1);
  expect(ids).not.toContain('source');
  expect(ids).not.toContain('alias');
  expect(JSON.stringify(posts)).toBe(snapshot);
});

it('breaks equal relevance by date, then stable URL order, independently of API order', () => {
  const posts = [
    article('source', 'Workflow retries', { tags: ['Automation'] }),
    article('b', 'Workflow retries', { tags: ['Automation'], date: '2026-10-01' }),
    article('old', 'Workflow retries', { tags: ['Automation'], date: 'invalid' }),
    article('a', 'Workflow retries', { tags: ['Automation'], date: '2026-10-01' }),
  ];
  expect(buildRelatedArticleIds(posts).get('source')).toEqual(['a', 'b', 'old']);
  expect(buildRelatedArticleIds([...posts].reverse()).get('source')).toEqual(['a', 'b', 'old']);
});

it('uses recent posts only when no topic matches, including records with missing optional fields', () => {
  const posts = [
    article('source', 'Coral reefs', { tags: null, excerpt: null, body: null }),
    article('old', 'Database indexes', { date: null }),
    article('new', 'Mars atmosphere', { date: '2026-11-17' }),
  ];
  expect(buildRelatedArticleIds(posts).get('source')).toEqual(['new', 'old']);
});

it('handles an empty library, a single article and a smaller requested limit', () => {
  expect(buildRelatedArticleIds([]).size).toBe(0);
  expect(buildRelatedArticleIds([article('only', 'A single article')]).get('only')).toEqual([]);
  const posts = ['a', 'b', 'c', 'd', 'e'].map(id => article(id, 'Workflow retries'));
  expect(buildRelatedArticleIds(posts).get('a')).toHaveLength(3);
  expect(buildRelatedArticleIds(posts, 1).get('a')).toHaveLength(1);
  expect(buildRelatedArticleIds(posts, 0).get('a')).toEqual([]);
});
