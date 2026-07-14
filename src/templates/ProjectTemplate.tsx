import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./article.module.css";

interface ProjectTemplateProps extends PageProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        description: string;
        url: string | null;
        category: string;
        tags: string[] | null;
      };
      html: string;
    };
  };
}

export default function ProjectTemplate({ data }: ProjectTemplateProps) {
  const project = data.markdownRemark;

  return (
    <BaseLayout>
      <ThreeDBackground />

      <article className={styles.page}>
        <header>
          <Link to="/projects" className={styles.back}>
            ← Case Studies
          </Link>
          <div className={styles.meta}>
            <span>{project.frontmatter.category}</span>
          </div>
          <h1 className={styles.title}>{project.frontmatter.title}</h1>
          <p className={styles.lead}>{project.frontmatter.description}</p>
          {project.frontmatter.url && (
            <a
              href={project.frontmatter.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              View live project ↗
            </a>
          )}
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: project.html }}
        />

        {project.frontmatter.tags && project.frontmatter.tags.length > 0 && (
          <div className={styles.tags}>
            {project.frontmatter.tags.map((tag) => (
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

export function Head({ data }: ProjectTemplateProps) {
  const project = data.markdownRemark;

  return (
    <SEO
      title={project.frontmatter.title}
      description={project.frontmatter.description}
    />
  );
}

export const query = graphql`
  query ProjectQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        url
        category
        tags
      }
      html
    }
  }
`;
