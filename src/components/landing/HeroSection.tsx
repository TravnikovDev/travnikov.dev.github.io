import React from "react";
import { Link } from "gatsby";
import { Canvas } from "@react-three/fiber";
import * as styles from "./HeroSection.module.css";
import { GlyphScene, GlyphKind } from "../3d/ServiceGlyphs";

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
    copy: "Scalable, sub-second React and Gatsby systems designed for performance and long-term growth.",
    glyph: "lattice",
  },
  {
    id: "vector-c",
    title: "Strategic Consulting",
    href: "/fractional-cto",
    copy: "Balancing product velocity and technical debt — audits, roadmaps and hands-on team enablement.",
    glyph: "balance",
  },
];

// Each glyph gets its own small canvas so it scrolls natively with the DOM.
// (A shared drei <View> re-scissors per frame and visibly lags during scroll.)
const GlyphCanvas = ({
  kind,
  phase,
  reducedMotion,
}: {
  kind: GlyphKind;
  phase: number;
  reducedMotion: boolean;
}) => (
  <Canvas
    className={styles.glyphCanvas}
    dpr={[1, 2]}
    // reduced motion: render one static frame instead of a rAF loop
    frameloop={reducedMotion ? "demand" : "always"}
    gl={{ antialias: true, alpha: true }}
  >
    <GlyphScene kind={kind} phase={phase} />
  </Canvas>
);

const HeroSection = () => {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className={styles.hero}>
      <div className={styles.left}>
        <div className={`${styles.brand} ${styles.reveal}`}>
          <span className={styles.brandMark} aria-hidden="true">
            <i className={styles.lobeA} />
            <i className={styles.lobeB} />
            <i className={styles.lobeC} />
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
            teams ship faster — from n8n content pipelines to production React
            platforms serving real businesses.
          </p>
          <div className={styles.actions}>
            <Link to="/projects" className={styles.cta}>
              View case studies
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
            <a href="mailto:roman@travnikov.dev" className={styles.ctaSecondary}>
              Get in touch
            </a>
          </div>
        </div>

        <div className={`${styles.availability} ${styles.reveal}`}>
          <span className={styles.availabilityDot} />
          Available for new opportunities
        </div>

        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollCueLabel}>Scroll</span>
          <span className={styles.scrollCueLine} />
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
              <GlyphCanvas
                kind={vector.glyph}
                phase={index * 2.1}
                reducedMotion={reducedMotion}
              />
            </div>
            <div className={styles.serviceText}>
              <h3>{vector.title}</h3>
              <p>{vector.copy}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
