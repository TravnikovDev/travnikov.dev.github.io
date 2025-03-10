import React, { useRef, useEffect, useState } from "react";
import { graphql } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import { TimelineSection } from "../components/landing/TimelineSection";
import { TechStackSection } from "../components/landing/TechStackSection";
import { Box, Container } from "@mantine/core";
import ThreeDBackground from "../components/3d/3dBackground";
import * as styles from './index.module.css';

// Parallax divider with animation
function SectionsDivider() {
  return (
    <Container size="lg" my={100}>
      <Box
        className={styles.sectionsDivider}
      >
        <Box
          className={styles.sectionsDividerInner}
        />
      </Box>
    </Container>
  );
}

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
        {/* Hero section */}
        <HeroSection />
        {/* Animated divider */}
        <SectionsDivider />
        {/* Timeline section */}
        <TimelineSection />
        {/* Animated divider */}
        <SectionsDivider />
        {/* Tech stack section */}
        <TechStackSection />
        {/* Scroll progress indicator */}
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
