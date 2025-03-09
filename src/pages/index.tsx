import React, { useRef, useEffect, useState } from "react";
import { graphql } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import { TimelineSection } from "../components/landing/TimelineSection";
import { TechStackSection } from "../components/landing/TechStackSection";
import { Box, Container } from "@mantine/core";
import { keyframes } from "@emotion/react";
import styles from './index.module.css';

// Background animation effects
const gradientAnimation = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
});
const glowPulse = keyframes({
  "0%": { opacity: 0.5 },
  "50%": { opacity: 0.8 },
  "100%": { opacity: 0.5 },
});

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
    <>
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
    </>
  );
}

// Animate section on scroll into view using Intersection Observer
function ParallaxSection({ children, delay = 0, offsetY = 100, speed = 0.8 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollYProgress = Math.max(0, Math.min(1, 
          1 - (rect.top - window.innerHeight) / (rect.height + window.innerHeight)
        ));
        setScrollPosition(scrollYProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate parallax effects
  const yOffset = isVisible ? 0 : offsetY;
  const parallaxY = offsetY - scrollPosition * offsetY * 2 * speed;

  // Apply style with delay
  const style = {
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? parallaxY : offsetY}px)`,
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  };

  return (
    <div
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}

// Parallax divider with animation
function ParallaxDivider() {
  return (
    <Container size="lg" my={100}>
      <Box
        className={styles.parallaxDivider}
      >
        <Box
          className={styles.parallaxDividerInner}
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
        <ParallaxSection delay={0} offsetY={30} speed={0.2}>
          <HeroSection />
        </ParallaxSection>
        {/* Animated divider */}
        <ParallaxDivider />
        {/* Timeline section */}
        <ParallaxSection delay={0.1} offsetY={60} speed={0.5}>
          <TimelineSection />
        </ParallaxSection>
        {/* Animated divider */}
        <ParallaxDivider />
        {/* Tech stack section */}
        <ParallaxSection delay={0.2} offsetY={80} speed={0.7}>
          <TechStackSection />
        </ParallaxSection>
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
