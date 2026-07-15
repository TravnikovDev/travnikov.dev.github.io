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
  };
}

export default function BlogTemplate({ data }: BlogTemplateProps) {
  const article = data.blogPost;

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
  }
`;
