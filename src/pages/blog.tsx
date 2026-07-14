import "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./blog.module.css";

interface BlogPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        id: string;
        timeToRead: number;
        frontmatter: {
          title: string;
          date: string;
          slug: string;
          excerpt: string;
        };
      }[];
    };
  };
}

export default function BlogPage({ data }: BlogPageProps) {
  const articles = data.allMarkdownRemark.nodes;

  return (
    <BaseLayout>
      <ThreeDBackground />

      <div className={styles.page}>
        <header>
          <Link to="/" className={styles.back}>
            ← Home
          </Link>
          <span className={styles.eyebrow}>Writing</span>
          <h1 className={styles.title}>Insights</h1>
          <p className={styles.lead}>
            Notes on AI automation, web performance, and technical leadership —
            what I learn shipping real systems.
          </p>
        </header>

        <div className={styles.list}>
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.frontmatter.slug}`}
              className={styles.item}
            >
              <span className={styles.itemMeta}>
                <span>{article.frontmatter.date}</span>
                <span>{article.timeToRead} min read</span>
              </span>
              <h2 className={styles.itemTitle}>{article.frontmatter.title}</h2>
              <p className={styles.itemExcerpt}>
                {article.frontmatter.excerpt}
              </p>
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
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        timeToRead
        frontmatter {
          title
          date(formatString: "MMM D, YYYY")
          slug
          excerpt
        }
      }
    }
  }
`;
