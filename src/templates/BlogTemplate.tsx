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
      tags: string[] | null;
      excerpt: string;
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

      <article className={styles.page}>
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
                <li key={post.id}>
                  {/* full titles as anchor text — descriptive internal links
                      are worth far more than "previous / next" */}
                  <Link to={`/blog/${post.slug}`} className={styles.readNextItem}>
                    <span className={styles.readNextTitle}>{post.title}</span>
                    <span className={styles.readNextMeta}>
                      {post.timeToRead} min read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </BaseLayout>
  );
}

export function Head({ data }: BlogTemplateProps) {
  const article = data.blogPost;

  return <SEO title={article.title} description={article.excerpt} />;
}

export const query = graphql`
  query BlogPostQuery($id: String!) {
    blogPost(id: { eq: $id }) {
      timeToRead
      title
      date(formatString: "MMM D, YYYY")
      tags
      excerpt
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
