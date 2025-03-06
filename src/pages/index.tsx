import React, { useRef, useEffect } from "react";
import { graphql } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import TimelineSection from "../components/landing/TimelineSection";
import TechStackSection from "../components/landing/TechStackSection";
import { Box, Divider, Container, Text, Title } from "@mantine/core";
import { keyframes } from "@emotion/react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

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

// Parallax components that respond to scroll
function ParallaxBackground() {
  const { scrollY } = useScroll();

  // Transform values for parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);
  const opacity2 = useTransform(scrollY, [0, 500], [0.7, 0]);
  const scale1 = useTransform(scrollY, [0, 500], [1, 1.2]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 15]);

  // Smooth animations with spring physics
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 80, damping: 40 });
  const smoothOpacity1 = useSpring(opacity1, { stiffness: 300, damping: 100 });

  return (
    <>
      {/* Top gradient circle - moves faster on scroll */}
      <motion.div
        style={{
          y: smoothY1,
          opacity: smoothOpacity1,
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
      <motion.div
        style={{
          y: smoothY2,
          scale: scale1,
          rotate: rotate1,
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
        }}
      />

      {/* Bottom left blob - moves slower */}
      <motion.div
        style={{
          y: y3,
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
        }}
      />

      {/* Animated grid pattern */}
      <motion.div
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
      <motion.div
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

      <motion.div
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

// Animate section on scroll into view
function ParallaxSection({ children, delay = 0, offsetY = 100, speed = 0.8 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offsetY, -offsetY * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.8 };
  const smoothY = useSpring(y, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offsetY }}
      style={{
        opacity: smoothOpacity,
        y: smoothY,
      }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

// Parallax divider with animation
function ParallaxDivider() {
  return (
    <Container size="lg" my={100}>
      <Box
        sx={{
          position: "relative",
          height: "3px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.05)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
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
  // Capture scroll position for parallax effects
  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress);

  // Use for scroll-triggered animations
  useEffect(() => {
    const handleScroll = () => {
      // This will be used by the parallax effects
      window.requestAnimationFrame(() => {
        // Any additional scroll handlers can go here
      });
    };

    window.addEventListener("scroll", handleScroll);
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
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "var(--mantine-primary-gradient)",
            scaleX: smoothScrollYProgress,
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
