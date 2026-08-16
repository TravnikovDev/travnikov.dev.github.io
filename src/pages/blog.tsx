import "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./blog.module.css";

interface BlogPageProps extends PageProps {
  data: {
    allBlogPost: {
      nodes: {
        id: string;
        timeToRead: number;
        title: string;
        date: string;
        slug: string;
        excerpt: string;
        tags: string[] | null;
        coverUrl: string | null;
        coverAlt: string | null;
      }[];
    };
  };
}

export default function BlogPage({ data }: BlogPageProps) {
  const articles = data.allBlogPost.nodes;

  return (
    <BaseLayout>
      <ThreeDBackground />

      <div className={styles.page} data-sheet>
        <header>
          <Link to="/" className={styles.back}>
            ← Home
          </Link>
          <span className={styles.eyebrow}>Writing</span>
          <h1 className={styles.title}>Insights</h1>
          <p className={styles.lead}>
            Notes on AI automation, web performance, and technical leadership.
            what I learn shipping real systems.
          </p>
        </header>

        <div className={styles.list}>
          {articles.map((article, index) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              /* the newest post carries more weight — otherwise every row
                 reads as equally current and nothing is "the new one" */
              className={`${styles.item} ${
                index === 0 ? styles.itemFeatured : ""
              }`}
            >
              {article.coverUrl && (
                <img
                  className={styles.itemCover}
                  src={article.coverUrl}
                  alt={article.coverAlt ?? ""}
                  loading="lazy"
                  width={1400}
                  height={700}
                />
              )}
              <span className={styles.itemMeta}>
                <span>{article.date}</span>
                <span>{article.timeToRead} min read</span>
                {index === 0 && (
                  <span className={styles.latestBadge}>Latest</span>
                )}
              </span>
              <h2 className={styles.itemTitle}>{article.title}</h2>
              <p className={styles.itemExcerpt}>{article.excerpt}</p>
              {article.tags && article.tags.length > 0 && (
                <span className={styles.chips}>
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={styles.chip}>
                      {tag}
                    </span>
                  ))}
                </span>
              )}
              <span className={styles.itemArrow} aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

export function Head() {
  return (
    <SEO
      title="Insights"
      description="Notes on AI automation, web performance, and technical leadership from Roman Travnikov."
    />
  );
}

export const query = graphql`
  query {
    allBlogPost(sort: { date: DESC }) {
      nodes {
        id
        timeToRead
        title
        date(formatString: "MMM D, YYYY")
        slug
        excerpt
        tags
        coverUrl
        coverAlt
      }
    }
  }
`;
