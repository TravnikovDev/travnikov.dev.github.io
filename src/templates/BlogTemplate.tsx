import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./article.module.css";

interface BlogTemplateProps extends PageProps {
  data: {
    blogPost: {
      timeToRead: number;
      title: string;
      date: string;
      isoDate: string;
      tags: string[] | null;
      excerpt: string;
      coverUrl: string | null;
      coverAlt: string | null;
      html: string;
    };
    readNext: {
      nodes: {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        timeToRead: number;
      }[];
    };
  };
}

export default function BlogTemplate({ data }: BlogTemplateProps) {
  const article = data.blogPost;
  const readNext = data.readNext?.nodes ?? [];

  return (
    <BaseLayout>
      <ThreeDBackground />

      <article className={styles.page} data-sheet>
        <header>
          <Link to="/blog" className={styles.back}>
            ← Insights
          </Link>
          <div className={styles.meta}>
            <span>{article.date}</span>
            <span>{article.timeToRead} min read</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.lead}>{article.excerpt}</p>
        </header>

        {article.coverUrl && (
          <img
            className={styles.cover}
            src={article.coverUrl}
            alt={article.coverAlt ?? ""}
            width={1400}
            height={700}
          />
        )}

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className={styles.tags}>
            {article.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {readNext.length > 0 && (
          <nav className={styles.readNext} aria-label="More articles">
            <h2 className={styles.readNextHeading}>Read next</h2>
            <ul className={styles.readNextList}>
              {readNext.map((post) => (
                <li key={post.id} className={styles.readNextRow}>
                  {/* The anchor contains the title and nothing else, so the
                      anchor text stays exactly the article title. Read-time
                      lives outside the link or it gets concatenated into it. */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className={styles.readNextItem}
                  >
                    {post.title}
                  </Link>
                  <span className={styles.readNextMeta}>
                    {post.timeToRead} min read
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </BaseLayout>
  );
}

export function Head({ data, location }: BlogTemplateProps) {
  const article = data.blogPost;
  const site = "https://travnikov.dev";
  const url = `${site}${location.pathname}`;

  // An article page's primary entity is the article, not the site owner.
  // Without this, these pages carried only the site-wide Person block and were
  // ineligible for any article rich result.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.excerpt,
        datePublished: article.isoDate,
        dateModified: article.isoDate,
        wordCount: article.timeToRead * 200,
        keywords: article.tags ?? undefined,
        image: article.coverUrl ?? `${site}/og-cover.jpg`,
        inLanguage: "en",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@id": `${site}/#person` },
        publisher: { "@id": `${site}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: `${site}/blog/`,
          },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };

  return (
    <SEO
      pathname={location.pathname}
      title={article.title}
      description={article.excerpt}
      image={article.coverUrl ?? undefined}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </SEO>
  );
}

export const query = graphql`
  query BlogPostQuery($id: String!) {
    blogPost(id: { eq: $id }) {
      timeToRead
      title
      date(formatString: "MMM D, YYYY")
      isoDate: date
      tags
      excerpt
      coverUrl
      coverAlt
      html
    }
    readNext: allBlogPost(
      filter: { id: { ne: $id } }
      sort: { date: DESC }
      limit: 3
    ) {
      nodes {
        id
        title
        slug
        excerpt
        timeToRead
      }
    }
  }
`;
