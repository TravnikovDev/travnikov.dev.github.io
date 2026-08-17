import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./article.module.css";

interface ProjectTemplateProps extends PageProps {
  data: {
    caseStudy: {
      title: string;
      description: string;
      url: string | null;
      category: string;
      tags: string[] | null;
      html: string;
    };
  };
}

export default function ProjectTemplate({ data }: ProjectTemplateProps) {
  const project = data.caseStudy;

  return (
    <BaseLayout>
      <ThreeDBackground />

      <article className={styles.page} data-sheet>
        <header>
          <Link to="/projects" className={styles.back}>
            ← Case Studies
          </Link>
          <div className={styles.meta}>
            <span>{project.category}</span>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.lead}>{project.description}</p>
          {project.url && (
            <a
              href={project.url}
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

        {project.tags && project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
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

export function Head({ data, location }: ProjectTemplateProps) {
  const project = data.caseStudy;

  return <SEO pathname={location.pathname} title={project.title} description={project.description} />;
}

export const query = graphql`
  query ProjectQuery($id: String!) {
    caseStudy(id: { eq: $id }) {
      title
      description
      url
      category
      tags
      html
    }
  }
`;
