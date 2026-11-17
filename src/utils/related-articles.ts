/** Build-time recommendations: no model calls or ranking code in the browser. */
export interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  tags?: readonly string[] | null;
  date?: string | null;
}

const stopWords = new Set(`a about above after again against all also am an and any are
  as at be because been before being below between both but by can cannot could did
  do does doing down during each few for from further had has have having he her here
  hers herself him himself his how i if in into is it its itself just me more most my
  myself no nor not now of off on once only or other our ours ourselves out over own
  same she should so some such than that the their theirs them themselves then there
  these they this those through to too under until up us very was we were what when
  where which while who whom why will with would you your yours yourself yourselves
  one two three first new still actually`.split(/\s+/));

function plainText(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function terms(text: string): string[] {
  return (plainText(text).match(/[a-z][a-z0-9]*/g) ?? [])
    .filter(word => word.length >= 2 && !stopWords.has(word))
    // Conservative plural folding also joins tags such as "AI Agent(s)".
    .map(word => word.length > 4 && /s$/.test(word) && !/(ss|is|us)$/.test(word)
      ? word.slice(0, -1)
      : word);
}

type Vector = Map<string, number>;

function addField(vector: Vector, text: string, weight: number): void {
  const counts = new Map<string, number>();
  for (const term of terms(text)) counts.set(term, (counts.get(term) ?? 0) + 1);
  for (const [term, count] of counts) {
    vector.set(term, (vector.get(term) ?? 0) + weight * Math.log1p(count));
  }
}

function normaliseVectors(vectors: Vector[]): Vector[] {
  const frequency = new Map<string, number>();
  for (const vector of vectors) {
    for (const term of vector.keys()) frequency.set(term, (frequency.get(term) ?? 0) + 1);
  }
  return vectors.map(vector => {
    const weighted = new Map([...vector].map(([term, weight]) => [
      term, weight * (1 + Math.log((vectors.length + 1) / ((frequency.get(term) ?? 0) + 1))),
    ]));
    const magnitude = Math.hypot(...weighted.values());
    return new Map([...weighted].map(([term, weight]) => [term, weight / (magnitude || 1)]));
  });
}

function similarity(a: Vector, b: Vector): number {
  let score = 0;
  for (const [term, weight] of a) score += weight * (b.get(term) ?? 0);
  return score;
}

function publishedTime(article: RelatedArticle): number {
  return Date.parse(article.date ?? '') || 0;
}

// Disambiguate terms such as "model" (reactor/model provider) and "vision"
// (eyesight/inspection). These broad reading topics use the existing metadata;
// they do not create public categories or rewrite the CMS's tags.
const readingTopics: readonly [string, RegExp][] = [
  ['agents', /\b(agent|agents|mcp|openclaw)\b/],
  ['web-engineering', /\b(frontend|front end|react|nextjs|typescript|javascript|webp|lcp|browser|vitest|jest|web performance|web development|landing page|dark theme|black friday.*readiness)\b/],
  ['automation', /\b(n8n|workflow|workflows|automation|automations|integration|integrations)\b/],
  ['health', /\b(health|medical|medicine|myopia|glasses|longevity|autophagy|vaccine|malaria|nutrition|mammography|clinical|tooth|embryo)\b/],
  ['energy', /\b(energy|electricity|power prices|battery|batteries|nuclear|reactor|reactors|tidal)\b/],
  ['earth-and-space', /\b(earth|space|ocean|sea|water|geology|microbiology|biosphere|earthquake|astronomy|climate|environment|physics|magnetic|underground|materials|genome|biotechnology)\b/],
  ['history', /\b(history|archaeology|herculaneum|scrolls|skull|bone daggers)\b/],
  ['careers', /\b(career|careers|resume|job search|freelanc\w*|portfolio|upwork|side income|paid to watch|evaluation side income)\b/],
  ['leadership', /\b(leadership|hiring|engineering management|team management|code review|release ownership|full stack builder)\b/],
  ['robotics', /\b(robot|robots|robotics|manufacturing|computer vision|inspection|autonomous ships)\b/],
  ['audience-and-measurement', /\b(analytics|attribution|audience|bot traffic|referrals|traffic percentage|statistics|demography|demographics)\b/],
  ['publishing', /\b(writing|publishing|rss|sitemap|seo|content strategy|linkedin|gist|gists|language|editing|bookmarks|web archives|information management)\b/],
  ['media', /\b(video|videos|music|avatar|avatars|creator|creators|youtube|presenter|blender|graphics)\b/],
  ['social-automation', /\b(instagram|threads|tiktok|social media|social)\b/],
  ['productivity', /\b(productivity|psychology|wellbeing|learning|knowledge work|leisure|task completion)\b/],
  ['security', /\b(security|privacy|identity|moderation|digital safety)\b/],
  ['products-and-business', /\b(business|pricing|subscription|subscriptions|consumer|startups|ecommerce|e commerce|retail|economics|payments|product|products)\b/],
];

function readingTopic(article: RelatedArticle): string | undefined {
  const metadata = plainText([article.title, article.slug, ...(article.tags ?? [])].join(' '))
    .replace(/[-_]/g, ' ');
  return readingTopics.find(([, pattern]) => pattern.test(metadata))?.[0];
}

/**
 * Weight distinctive words across the current library, with an extra signal for
 * shared tags. Title/summary terms carry more weight than body repetitions.
 * Prefer the same reading topic to avoid word overlap across unrelated fields.
 * Recent articles break relevance ties and provide a fallback inside that topic
 * when there is no meaningful text match. New/unclassified topics can still
 * use text similarity across the library. Return fewer than the limit when a
 * small topic has fewer suitable articles.
 */
export function buildRelatedArticleIds(
  articles: readonly RelatedArticle[],
  limit = 3,
): Map<string, string[]> {
  const unique = [...new Map(articles.map(article => [article.id, article])).values()];
  const topics = unique.map(readingTopic);
  const textVectors = normaliseVectors(unique.map(article => {
    const vector: Vector = new Map();
    addField(vector, article.title, 4);
    addField(vector, article.excerpt ?? '', 3);
    addField(vector, article.slug.replace(/-/g, ' '), 2);
    addField(vector, (article.tags ?? []).join(' '), 1);
    addField(vector, article.body ?? '', 0.5);
    return vector;
  }));
  const tagVectors = normaliseVectors(unique.map(article => new Map(
    (article.tags ?? []).map(tag => [terms(tag).join(' '), 1] as const).filter(([tag]) => tag),
  )));
  const recommendations = new Map<string, string[]>();

  for (const [index, article] of unique.entries()) {
    const ranked = unique
      .map((candidate, candidateIndex) => {
        const textScore = similarity(textVectors[index], textVectors[candidateIndex]);
        const tagScore = similarity(tagVectors[index], tagVectors[candidateIndex]);
        return { candidate, topic: topics[candidateIndex], score: 0.9 * textScore + 0.1 * tagScore, textScore, tagScore };
      })
      .filter(({ candidate }) => candidate.id !== article.id && candidate.slug !== article.slug)
      .sort((a, b) => b.score - a.score || publishedTime(b.candidate) - publishedTime(a.candidate)
        || a.candidate.slug.localeCompare(b.candidate.slug) || a.candidate.id.localeCompare(b.candidate.id));
    const sameTopic = topics[index] ? ranked.filter(candidate => candidate.topic === topics[index]) : [];
    const pool = sameTopic.length ? sameTopic : ranked;
    const relevant = pool.filter(({ textScore, tagScore }) => textScore >= 0.1 || tagScore >= 0.2);
    const selected = relevant.length ? relevant : pool.sort((a, b) =>
      publishedTime(b.candidate) - publishedTime(a.candidate)
      || a.candidate.slug.localeCompare(b.candidate.slug) || a.candidate.id.localeCompare(b.candidate.id));
    const seenSlugs = new Set<string>();
    const ids: string[] = [];
    for (const { candidate } of selected) {
      if (ids.length >= Math.max(0, limit)) break;
      if (seenSlugs.has(candidate.slug)) continue;
      seenSlugs.add(candidate.slug);
      ids.push(candidate.id);
    }
    recommendations.set(article.id, ids);
  }
  return recommendations;
}
