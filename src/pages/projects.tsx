import "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./projects.module.css";

interface ProjectsPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        id: string;
        frontmatter: {
          title: string;
          slug: string;
          description: string;
          category: string;
        };
      }[];
    };
  };
}

export default function ProjectsPage({ data }: ProjectsPageProps) {
  const projects = data.allMarkdownRemark.nodes;

  return (
    <BaseLayout>
      <ThreeDBackground />

      <div className={styles.page}>
        <header>
          <Link to="/" className={styles.back}>
            ← Home
          </Link>
          <span className={styles.eyebrow}>Selected Work</span>
          <h1 className={styles.title}>Case Studies</h1>
          <p className={styles.lead}>
            Engagements in automation, web performance, and product delivery —
            what was built, and what it changed.
          </p>
        </header>

        {projects.length > 0 ? (
          <div className={styles.list}>
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.frontmatter.slug}`}
                className={styles.item}
              >
                <div>
                  <span className={styles.itemCategory}>
                    {project.frontmatter.category}
                  </span>
                  <h2 className={styles.itemTitle}>
                    {project.frontmatter.title}
                  </h2>
                  <p className={styles.itemDescription}>
                    {project.frontmatter.description}
                  </p>
                </div>
                <span className={styles.itemCta}>View case study</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              Case studies are being written up. If you want to hear how I have
              handled a problem like yours, ask directly — I am happy to walk
              through relevant work.
            </p>
            <a href="mailto:roman@travnikov.dev" className={styles.emptyCta}>
              Get in touch
            </a>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}

export function Head() {
  return (
    <SEO
      title="Case Studies"
      description="Browse case studies focused on automation, performance engineering, and product delivery."
    />
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { template: { eq: "project" } } }) {
      nodes {
        id
        frontmatter {
          title
          slug
          description
          category
        }
      }
    }
  }
`;
