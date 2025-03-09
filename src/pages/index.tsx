import React, { useRef, useEffect, useState } from "react";
import { graphql } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import { TimelineSection } from "../components/landing/TimelineSection";
import { TechStackSection } from "../components/landing/TechStackSection";
import { Box, Container } from "@mantine/core";
import { keyframes } from "@emotion/react";

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
        style={{
          opacity: opacity1,
          transform: `translateY(${y1}px)`,
          position: "absolute",
          top: "5%",
          left: "10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(34, 144, 224, 0.15) 0%, rgba(36, 43, 64, 0) 70%)",
          filter: "blur(60px)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      {/* Middle right blob - moves medium speed */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "5%",
          width: "25vw",
          height: "25vw",
          borderRadius: "70% 30% 40% 60% / 60% 30% 70% 40%",
          background:
            "radial-gradient(circle at center, rgba(132, 34, 224, 0.12) 0%, rgba(36, 43, 64, 0) 70%)",
          filter: "blur(50px)",
          zIndex: -1,
          pointerEvents: "none",
          animation: `${glowPulse} 10s infinite ease-in-out`,
          transform: `translateY(${y2}px) scale(${scale1}) rotate(${rotate1}deg)`,
        }}
      />
      {/* Bottom left blob - moves slower */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "5%",
          width: "30vw",
          height: "30vw",
          borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%",
          background:
            "radial-gradient(circle at center, rgba(240, 31, 36, 0.08) 0%, rgba(36, 43, 64, 0) 70%)",
          filter: "blur(60px)",
          zIndex: -1,
          pointerEvents: "none",
          transform: `translateY(${y3}px)`,
        }}
      />
      {/* Animated grid pattern */}
      <div
        style={{
          opacity: opacity2,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      {/* Animated gradient lines */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, var(--mantine-color-primary-6), var(--mantine-color-secondary-6), transparent)",
          backgroundSize: "400% 400%",
          animation: `${gradientAnimation} 15s ease infinite`,
          zIndex: -1,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "75%",
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--mantine-color-secondary-6), var(--mantine-color-primary-6), transparent)",
          backgroundSize: "400% 400%",
          animation: `${gradientAnimation} 18s ease infinite reverse`,
          zIndex: -1,
          opacity: 0.3,
          pointerEvents: "none",
        }}
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
        style={{
          position: "relative",
          height: "3px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.05)",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "30%",
            background:
              "linear-gradient(90deg, transparent, var(--mantine-color-primary-6), var(--mantine-color-secondary-6), transparent)",
            animation: `${gradientAnimation} 4s ease infinite`,
          }}
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
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "var(--mantine-primary-gradient)",
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "0%",
            zIndex: 1000,
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
