import React, { useRef } from "react";
import { Link } from "gatsby";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
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

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null!);

  return (
    <div ref={heroRef} className={styles.hero}>
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
          Automating enterprises with AI&nbsp;&amp; architecture.
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
            <View className={styles.glyph}>
              <GlyphScene kind={vector.glyph} phase={index * 2.1} />
            </View>
            <div className={styles.serviceText}>
              <h3>{vector.title}</h3>
              <p>{vector.copy}</p>
            </div>
          </Link>
        ))}
      </div>

      <Canvas
        className={styles.glyphCanvas}
        eventSource={heroRef}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <View.Port />
      </Canvas>
    </div>
  );
};

export default HeroSection;
