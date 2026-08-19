import React, { Suspense, useEffect, useState } from "react";
import { Link } from "gatsby";
import BrandMark from "../shared/BrandMark";
import type { GlyphKind } from "../3d/ServiceGlyphs";
import * as styles from "./HeroSection.module.css";

// Heavy visuals (three.js, R3F, the glyph scenes, the brand sphere) load only
// where they earn their weight. Mobile gets the SVG mark and the CSS glow that
// already sit behind these canvases.
const GlyphCanvas = React.lazy(() => import("./HeroVisuals"));
const BrandSphereLazy = React.lazy(() =>
  import("./HeroVisuals").then((m) => ({ default: m.BrandSphere }))
);

const RICH_VISUALS = "(min-width: 48em) and (pointer: fine)";

const useRichVisuals = () => {
  const [rich, setRich] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(RICH_VISUALS);
    const decide = () => setRich(mq.matches);
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);
  return rich;
};

const vectors: {
  id: string;
  title: string;
  href: string;
  copy: string;
  glyph: GlyphKind;
}[] = [
  {
    id: "vector-a",
    title: "AI Automation",
    href: "/ai-automation-engineer",
    copy: "Custom agent workflows, content pipelines and LLM integrations that run your operations on autopilot.",
    glyph: "crystal",
  },
  {
    id: "vector-b",
    title: "Web Architecture",
    href: "/react-performance-consulting",
    copy: "Scalable, sub-second React and Next.js systems designed for performance and long-term growth.",
    glyph: "lattice",
  },
  {
    id: "vector-c",
    title: "Strategic Consulting",
    href: "/fractional-cto",
    copy: "Balancing product velocity and technical debt. Audits, roadmaps and hands-on team enablement.",
    glyph: "balance",
  },
];

const HeroSection = () => {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rich = useRichVisuals();

  return (
    <div className={styles.hero}>
      <div className={styles.left}>
        <div className={`${styles.brand} ${styles.reveal}`}>
          <span className={styles.brandMark} aria-hidden="true">
            {rich ? (
              <Suspense fallback={<BrandMark size={72} />}>
                <BrandSphereLazy reducedMotion={reducedMotion} />
              </Suspense>
            ) : (
              <BrandMark size={72} />
            )}
          </span>
          <span className={styles.brandName}>
            Roman
            <br />
            Travnikov
          </span>
        </div>

        <h1 className={`${styles.headline} ${styles.reveal}`}>
          Automating enterprises with{" "}
          <span className={styles.accent}>AI&nbsp;&amp; architecture.</span>
        </h1>

        <div className={`${styles.glassCard} ${styles.reveal}`}>
          <p>
            I design automation systems and frontend architecture that let
            teams ship faster, from n8n content pipelines to production React
            platforms serving real businesses.
          </p>
          <div className={styles.actions}>
            <Link to="/contact" className={styles.cta}>
              Start a conversation
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link to="/blog" className={styles.ctaSecondary}>
              Read the insights
            </Link>
          </div>
        </div>

        <div className={`${styles.availability} ${styles.reveal}`}>
          Available for new opportunities
        </div>
      </div>

      <div className={styles.services}>
        {vectors.map((vector, index) => (
          <Link
            key={vector.id}
            to={vector.href}
            className={`${styles.service} ${
              index === 1 ? styles.serviceReverse : ""
            }`}
          >
            <div
              className={styles.glyph}
              id={
                vector.glyph === "crystal" ? "crystal-glyph-anchor" : undefined
              }
            >
              {rich && (
                <Suspense fallback={null}>
                <GlyphCanvas
                  kind={vector.glyph}
                  phase={index * 2.1}
                  reducedMotion={reducedMotion}
                />
                </Suspense>
              )}
            </div>
            <div className={styles.serviceText}>
              <h2>{vector.title}</h2>
              <p>{vector.copy}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// no props — memo keeps the three glyph canvases stable through parent
// re-renders
export default React.memo(HeroSection);
