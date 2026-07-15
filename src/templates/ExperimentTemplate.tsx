import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./article.module.css";

interface ExperimentTemplateProps extends PageProps {
  data: {
    experiment: {
      title: string;
      description: string;
      demoUrl: string | null;
      technologies: string[] | null;
      html: string;
    };
  };
}

export default function ExperimentTemplate({ data }: ExperimentTemplateProps) {
  const experiment = data.experiment;

  return (
    <BaseLayout>
      <ThreeDBackground />

      <article className={styles.page}>
        <header>
          <Link to="/experiments" className={styles.back}>
            ← Experiments
          </Link>
          <div className={styles.meta}>
            <span>Experiment</span>
          </div>
          <h1 className={styles.title}>{experiment.title}</h1>
          <p className={styles.lead}>{experiment.description}</p>
          {experiment.demoUrl && (
            <a
              href={experiment.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              View live demo ↗
            </a>
          )}
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: experiment.html }}
        />

        {experiment.technologies && experiment.technologies.length > 0 && (
          <div className={styles.tags}>
            {experiment.technologies.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </article>
    </BaseLayout>
  );
}

export function Head({ data }: ExperimentTemplateProps) {
  const experiment = data.experiment;

  return <SEO title={experiment.title} description={experiment.description} />;
}

export const query = graphql`
  query ExperimentQuery($id: String!) {
    experiment(id: { eq: $id }) {
      title
      description
      demoUrl
      technologies
      html
    }
  }
`;
