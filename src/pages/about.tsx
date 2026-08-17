import "react";
import { Link } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import { SEO } from "../utils/seo/SEO";
import * as styles from "./about.module.css";

const now = [
  {
    id: "outlier",
    period: "Nov 2024 — now",
    role: "Senior Reviewer & Squad Lead",
    org: "Outlier (Scale AI) · Contract, United States",
    detail:
      "Reviewing frontier-model output across reasoning, coding and image interpretation, and contributing to the datasets those models train on. Recognised as a top performer and moved onto the complex evaluation tracks. For ten months I also led a squad of 10+ reviewers across AI evaluation projects covering UI/UX generation and code review, training them to get evaluation quality consistent rather than merely fast.",
  },
  {
    id: "freelance",
    period: "Feb 2024 — now",
    role: "Independent consultant",
    org: "Self-employed · Remote",
    detail:
      "Frontend and automation for international clients in SaaS, crypto and e-commerce. A Sanity CMS build with Algolia behind real-time search; an Etsy storefront scaled on an SVG production pipeline automated with Node.js and AI — which is the same shape of problem I now solve for teams as automation work.",
  },
];

export default function AboutPage() {
  return (
    <BaseLayout>
      <ThreeDBackground />

      <div className={styles.page} data-sheet>
        <Link to="/" className={styles.back}>
          ← Home
        </Link>

        <header className={styles.intro}>
          <div className={styles.introText}>
            <h1 className={styles.title}>Roman Travnikov</h1>
            <p className={styles.lead}>
              I build the automation and the frontend architecture around it —
              usually for teams who have outgrown doing things by hand but are
              not ready to hire two specialists to fix it.
            </p>
            <p className={styles.body}>
              Building for the web since 2012, most of it senior or lead, across
              logistics, travel, industrial tracking, dealership software and
              e-commerce — including government portals on IBM WebSphere early
              on and a 20% cut in load times at Super Dispatch later. The last
              two years have been split between evaluating generative AI systems
              at close range and building for clients independently, which is
              where the two halves of this site come from.
            </p>
            <p className={styles.meta}>
              Istanbul, Türkiye · working remotely with teams across Europe and
              the US
            </p>
          </div>

          <figure className={styles.portraitFigure}>
            <picture>
              <source srcSet="/portrait/portrait.avif" type="image/avif" />
              <source srcSet="/portrait/portrait.webp" type="image/webp" />
              <img
                className={styles.portrait}
                src="/portrait/portrait.jpg"
                alt="Roman Travnikov"
                width={540}
                height={675}
              />
            </picture>
          </figure>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What I am doing now</h2>
          <ul className={styles.nowList}>
            {now.map((item) => (
              <li key={item.id} className={styles.nowItem}>
                <span className={styles.nowPeriod}>{item.period}</span>
                <div>
                  <h3 className={styles.nowRole}>
                    {item.role}
                    <span className={styles.nowOrg}>{item.org}</span>
                  </h3>
                  <p className={styles.nowDetail}>{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How I work</h2>
          <p className={styles.body}>
            One person, end to end. You talk to whoever is doing the work, which
            is why the scope stays honest and why I will tell you when something
            is not worth building. Engagements usually start with an audit, so
            you see the plan and the numbers before committing to the work
            itself.
          </p>
          <p className={styles.body}>
            The unusual part is the combination. AI automation and frontend
            architecture are normally two hires. When they are one person, the
            pipeline and the interface get designed against each other instead
            of thrown over a wall, and nobody has to translate.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Elsewhere</h2>
          <ul className={styles.links}>
            <li>
              <a
                href="https://www.linkedin.com/in/roman-travnikov/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                LinkedIn
              </a>
              <span className={styles.linkNote}>
                Full career history and where I post most
              </span>
            </li>
            <li>
              <a
                href="https://github.com/TravnikovDev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub
              </a>
              <span className={styles.linkNote}>
                Open source, including vibe-janitor and ffmpegslideshow
              </span>
            </li>
            <li>
              <Link to="/blog" className={styles.link}>
                Insights
              </Link>
              <span className={styles.linkNote}>
                What I learn shipping real systems
              </span>
            </li>
            {/* Résumé link goes here once static/Roman_Travnikov_Resume.pdf
                exists — held back so this does not ship as a 404. The copy
                supplied carried a personal phone number, so it is waiting on a
                re-export without it. */}
          </ul>
        </section>

        <section className={styles.cta}>
          <p className={styles.ctaText}>
            If something here lines up with a problem you have, tell me what is
            slowing you down and I will tell you straight whether I am the right
            person for it.
          </p>
          <Link to="/contact" className={styles.ctaButton}>
            Get in touch
          </Link>
        </section>
      </div>
    </BaseLayout>
  );
}

export function Head({ location }: { location: { pathname: string } }) {
  return (
    <SEO pathname={location.pathname}
      title="About"
      description="Roman Travnikov: AI automation and frontend architecture for teams that have outgrown doing things by hand. Building for the web since 2012, based in Istanbul, working remotely."
    />
  );
}
