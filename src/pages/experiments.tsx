import "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./projects.module.css";

interface ExperimentsPageProps extends PageProps {
  data: {
    allExperiment: {
      nodes: {
        id: string;
        title: string;
        slug: string;
        description: string;
        technologies: string[] | null;
      }[];
    };
  };
}

export default function ExperimentsPage({ data }: ExperimentsPageProps) {
  const experiments = data.allExperiment.nodes;

  return (
    <BaseLayout>
      <ThreeDBackground />

      <div className={styles.page} data-sheet>
        <header>
          <Link to="/" className={styles.back}>
            ← Home
          </Link>
          <span className={styles.eyebrow}>Playground</span>
          <h1 className={styles.title}>Experiments</h1>
          <p className={styles.lead}>
            Interactive frontend experiments. Creative techniques tried in
            public.
          </p>
        </header>

        {experiments.length > 0 ? (
          <div className={styles.list}>
            {experiments.map((experiment) => (
              <Link
                key={experiment.id}
                to={`/experiments/${experiment.slug}`}
                className={styles.item}
              >
                <div>
                  <span className={styles.itemCategory}>
                    {(experiment.technologies ?? []).join(" · ")}
                  </span>
                  <h2 className={styles.itemTitle}>{experiment.title}</h2>
                  <p className={styles.itemDescription}>
                    {experiment.description}
                  </p>
                </div>
                <span className={styles.itemCta}>View experiment</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              Nothing on the bench right now. New experiments land here as
              they are built.
            </p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}

export function Head({ location }: { location: { pathname: string } }) {
  return (
    <SEO pathname={location.pathname}
      title="Experiments"
      description="Interactive web experiments and frontend demos by Roman Travnikov."
    />
  );
}

export const query = graphql`
  query {
    allExperiment(sort: { title: ASC }) {
      nodes {
        id
        title
        slug
        description
        technologies
      }
    }
  }
`;
