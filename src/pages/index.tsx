import React, { useRef, useEffect, useState } from "react";
import { graphql } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import { TimelineSection } from "../components/landing/TimelineSection";
import { TechStackSection } from "../components/landing/TechStackSection";
import { Box, Container } from "@mantine/core";
import * as styles from './index.module.css';

// Simple parallax component with standard React
function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate transform values based on scroll position
  const y1 = scrollY * -0.2; // Equivalent to transform [0, 1000] to [0, -200]
  const y2 = scrollY * -0.1; // Equivalent to transform [0, 1000] to [0, -100] 
  const y3 = scrollY * -0.05; // Equivalent to transform [0, 1000] to [0, -50]
  const opacity1 = Math.max(0, 1 - scrollY / 300); // Equivalent to transform [0, 300] to [1, 0]
  const opacity2 = Math.max(0, 0.7 - scrollY / 500 * 0.7); // Equivalent to transform [0, 500] to [0.7, 0]
  const scale1 = 1 + scrollY / 500 * 0.2; // Equivalent to transform [0, 500] to [1, 1.2]
  const rotate1 = scrollY / 1000 * 15; // Equivalent to transform [0, 1000] to [0, 15]
  
  return (
    <Box style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, width: "100%", height: "100%" }}>
      {/* Top gradient circle - moves faster on scroll */}
      <div
        className={styles.topGradientCircle}
        style={{
          opacity: opacity1,
          transform: `translateY(${y1}px)`,
        }}
      />
      {/* Middle right blob - moves medium speed */}
      <div
        className={styles.middleRightBlob}
        style={{
          transform: `translateY(${y2}px) scale(${scale1}) rotate(${rotate1}deg)`,
        }}
      />
      {/* Bottom left blob - moves slower */}
      <div
        className={styles.bottomLeftBlob}
        style={{
          transform: `translateY(${y3}px)`,
        }}
      />
      {/* Animated grid pattern */}
      <div
        className={styles.animatedGridPattern}
        style={{
          opacity: opacity2,
        }}
      />
      {/* Animated gradient lines */}
      <div
        className={styles.animatedGradientLinesTop}
      />
      <div
        className={styles.animatedGradientLinesBottom}
      />
    </Box>
  );
}

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
      {/* Dynamic background elements with parallax */}
      <ParallaxBackground />
      {/* Main content with scroll animations */}
      <Box>
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
