import { useEffect, useState } from "react";
import { graphql } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import { TimelineSection } from "../components/landing/TimelineSection";
import { Box } from "@mantine/core";
import ThreeDBackground from "../components/3d/3dBackground";
import * as styles from "./index.module.css";

// Parallax divider with animation

export default function IndexPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BaseLayout>
      {/* Dynamic 3D background with parallax */}
      <ThreeDBackground />

      {/* Main content with scroll animations */}
      <Box className={styles.mainContent}>
        <section>
          <HeroSection />
        </section>

        <section className={styles.sectionRight}>
          <TimelineSection />
        </section>

        <div
          className={styles.scrollProgressIndicator}
          style={{
            transform: `scaleX(${scrollProgress})`,
          }}
        />
      </Box>
    </BaseLayout>
  );
}

export function Head() {
  return <SEO />;
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
      }
    }
  }
`;
