import React, { useRef, useEffect } from "react";
import {
  Title,
  Text,
  Stack,
  Button,
  Group,
  Container,
  Grid,
  Box,
  Badge,
} from "@mantine/core";
import { keyframes } from "@emotion/react";
import { Link } from "gatsby";
import HeroAnimation from "../3d/HeroAnimation";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

// Enhanced keyframes for animated elements
const fadeInUp = keyframes({
  "0%": { opacity: 0, transform: "translateY(50px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const pulseGlow = keyframes({
  "0%": { boxShadow: "0 0 0 0 rgba(0, 120, 240, 0.6)" },
  "50%": { boxShadow: "0 0 25px 8px rgba(0, 120, 240, 0.25)" },
  "100%": { boxShadow: "0 0 0 0 rgba(0, 120, 240, 0.6)" },
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "300% 0" },
  "100%": { backgroundPosition: "-300% 0" },
});

const bounce = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-10px)" },
});

// Parallax floating keyframes
const float = keyframes({
  "0%": { transform: "translateY(0px) translateX(0px)" },
  "25%": { transform: "translateY(-10px) translateX(5px)" },
  "50%": { transform: "translateY(0px) translateX(10px)" },
  "75%": { transform: "translateY(10px) translateX(5px)" },
  "100%": { transform: "translateY(0px) translateX(0px)" },
});

// Staggered animation variants with enhanced timing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.08,
    y: -8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

const FloatingElement = ({ children, style, animationDuration = 5 }) => (
  <Box
    style={{
      position: "absolute",
      animation: `${float} ${animationDuration}s ease-in-out infinite`,
      zIndex: 2,
      ...style,
    }}
  >
    {children}
  </Box>
);

// Main hero component with enhanced scroll effects
const HeroSection = () => {
  const containerRef = useRef(null);

  // Scroll-based animations
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // ENHANCED scroll-based animations with more dramatic parallax effects
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.75]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [0, 15]);

  // Move title on scroll (large text effect) with more dramatic movement
  const titleX = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.4]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0.08, 0]);

  // Additional dynamic effects for parallax layers
  const floatingY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const buttonScaleLeft = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const buttonScaleRight = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const badgeY = useTransform(scrollYProgress, [0, 0.2], [0, -20]);
  const textRotate = useTransform(scrollYProgress, [0, 0.2], [0, -2]);

  // Section revealing effects
  const sectionOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);

  return (
    <Container size="xl">
      <Box
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          ref={containerRef}
          style={{
            position: "relative",
            marginTop: 0,
            padding: 20,
            overflow: "hidden",
            minHeight: "100vh",
            zIndex: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.45)",
              zIndex: -1,
            },
          }}
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "radial-gradient(circle at center, #FF3D00 0%, #FF8A00 100%)",
              filter: "blur(128px)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />

          <Text
            style={{
              fontSize: "clamp(4rem, 8vw, 6rem)",
              fontWeight: 700,
              fontFamily: "Cabinet Grotesk, sans-serif",
              letterSpacing: "-0.03em",
              color: "#E3E7F1",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)",
              position: "absolute",
              opacity: 0.5,
              transform: "translateX(-50%) translateY(-50%)",
            }}
          >
            FRONTEND
          </Text>

          <Box
            ref={targetRef}
            style={{
              position: "relative",
              marginTop: 0,
              padding: 0,
              overflow: "visible",
              minHeight: "100vh",
              zIndex: 10, // Make sure all content is above the 3D scene
              // Semi-transparent background to allow 3D scene to show through
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "radial-gradient(circle at top right, rgba(10, 15, 36, 0.5), rgba(10, 15, 36, 0.3) 70%), radial-gradient(circle at bottom left, rgba(10, 15, 36, 0.5), rgba(10, 15, 36, 0.3) 70%)",
                zIndex: -1,
                pointerEvents: "none",
                backdropFilter: "blur(2px)",
              },
            }}
          >
            {/* The 3D scene is now fixed and positioned in its own component, 
          so we don't need a container here. Just render it directly. */}
            <HeroAnimation />

            <FloatingElement
              style={{
                bottom: "20%",
                right: "5%",
                transform: "rotate(3deg)",
                display: { base: "none", md: "block" },
              }}
              animationDuration={10}
            >
              <Box
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(61, 127, 255, 0.4), transparent 70%)",
                  filter: "blur(10px)",
                  animation: `${pulseGlow} 4s infinite alternate`,
                }}
              />
            </FloatingElement>

            {/* Main content with enhanced parallax */}
            <Container
              size="xl"
              py={{ base: "xl", sm: "2xl" }}
              mt={{ base: 50, sm: 80 }}
            >
              {/* Ultra dramatic mega title text effect that animates on scroll */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "-15vh",
                  left: "-15vw",
                  right: 0,
                  zIndex: -1,
                  x: titleX,
                  y: useTransform(scrollYProgress, [0, 0.2], [0, -80]),
                  scale: titleScale,
                  opacity: titleOpacity,
                  transformOrigin: "left center",
                  perspective: 1200,
                  rotateX: useTransform(scrollYProgress, [0, 0.3], [0, 15]),
                  rotateZ: useTransform(scrollYProgress, [0, 0.3], [-2, -5]),
                }}
              >
                <Text
                  style={{
                    fontSize: "clamp(12rem,18rem,25rem)", // MUCH larger
                    fontWeight: 900,
                    fontFamily: '"Monument Extended", "Clash Display", sans-serif', // More dramatic font
                    letterSpacing: "-0.07em", // Tighter spacing
                    color: "transparent", // Transparent text with gradient stroke
                    WebkitTextStroke: "2px rgba(61, 127, 255, 0.05)", // Light blue outline for light theme
                    position: "absolute",
                    lineHeight: 0.75, // Even tighter line height
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    // Complex background effect for light theme
                    background:
                      "linear-gradient(to bottom, rgba(61, 127, 255, 0.035) 0%, rgba(61, 127, 255, 0.01) 100%)",
                    WebkitBackgroundClip: "text",
                    // Text shadow for depth - lighter for light theme
                    textShadow:
                      "0 0 50px rgba(61, 127, 255, 0.03), 0 0 100px rgba(166, 77, 255, 0.02)",
                    transform: "rotateZ(-2deg)", // Slight tilt for more dynamic feel
                  }}
                >
                  TRAVNIKOV
                </Text>

                {/* Second layer for enhanced depth effect - light theme version */}
                <Text
                  style={{
                    fontSize: "clamp(12rem,18rem,25rem)",
                    fontWeight: 900,
                    fontFamily: '"Monument Extended", "Clash Display", sans-serif',
                    letterSpacing: "-0.07em",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(61, 127, 255, 0.02)", // Light blue for light theme
                    position: "absolute",
                    lineHeight: 0.75,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    top: "0.5vh",
                    left: "0.5vw",
                    filter: "blur(8px)",
                    opacity: 0.3, // Lower opacity for light theme
                    transform: "rotateZ(-2deg)",
                  }}
                >
                  TRAVNIKOV
                </Text>
              </motion.div>

              {/* Main content grid with enhanced parallax */}
              <Grid gutter={{ base: 40, sm: 80 }} align="center">
                {/* Left content column with enhanced typography and effects */}
                <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      opacity,
                      y,
                      scale,
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      transformOrigin: "left center",
                    }}
                  >
                    <Stack
                      gap="xl"
                      h="100%"
                      justify="center"
                    >
                      <motion.div
                        variants={itemVariants}
                        style={{ y: badgeY }} // Add parallax movement
                      >
                        <Box mb="lg" className="shimmer">
                          {" "}
                          {/* Add shimmer effect */}
                          <Badge
                            size="xl"
                            radius="lg" // Larger radius
                            variant="gradient"
                            gradient={{ from: "primary", to: "secondary", deg: 45 }}
                            className="animated-border" // Add animated border
                            style={{
                              textTransform: "none",
                              padding: "12px 24px", // Larger padding
                              fontFamily: '"Cabinet Grotesk", sans-serif',
                              fontWeight: 700,
                              fontSize: "1.1rem", // Larger text
                              letterSpacing: "-0.01em",
                              color: "white", // White text for contrast
                              boxShadow: "var(--mantine-soft-shadow)",
                              border: "1px solid rgba(255, 255, 255, 0.9)",
                              transform: "translateZ(30px)", // 3D effect
                            }}
                          >
                            Senior Frontend Developer
                          </Badge>
                        </Box>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Title
                          order={1}
                          mb={{ base: "lg", sm: "2xl" }}
                          style={{
                            fontSize: "clamp(4.5rem, 10vw, 7.5rem)",
                            lineHeight: 0.85, // Ultra tight line height
                            color: "#E3E7F1", // Soft White
                            backgroundImage: "var(--mantine-blue-gradient)",
                            backgroundSize: "400% 100%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "-0.04em", // Super tight letters
                            fontWeight: 900, // Maximum boldness
                            fontFamily:
                              '"Monument Extended", "Clash Display", sans-serif', // Super dramatic font
                            animation: `${shimmer} 12s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                            textShadow: "0 2px 20px rgba(61, 127, 255, 0.1)", // Subtler glow for light theme
                            transform: "translateZ(70px) scale(1.02) rotateX(2deg)", // More dramatic 3D effect
                            position: "relative",
                            transformStyle: "preserve-3d",

                            // Pseudo-elements for enhanced depth and effect - light theme version
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              inset: -8,
                              background:
                                "linear-gradient(135deg, rgba(61, 127, 255, 0.03), transparent 60%, rgba(166, 77, 255, 0.03))",
                              borderRadius: "8px",
                              filter: "blur(10px)",
                              opacity: 0.5,
                              zIndex: -1,
                              transform: "translateZ(-10px)",
                            },

                            // Stroke effect - light theme version
                            "&::after": {
                              content: "attr(data-text)",
                              position: "absolute",
                              zIndex: -2,
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              color: "transparent",
                              WebkitTextStroke: "1px rgba(61, 127, 255, 0.05)",
                              WebkitTextFillColor: "transparent",
                            },
                          }}
                          data-text="Roman Travnikov" // For the stroke effect pseudo-element
                        >
                          Roman
                          <br />
                          Travnikov
                        </Title>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        style={{
                          rotate: textRotate, // Apply scroll-based rotation
                          y: floatingY, // Apply scroll-based floating
                        }}
                      >
                        <Text
                          size="xl"
                          mb={{ base: "xl", sm: "3.5rem" }}
                          className="hover-card" // Add hover effect
                          style={{
                            lineHeight: 2, // Even more breathing room
                            maxWidth: "650px", // Wider text block
                            color: "#E3E7F1", // Soft White
                            fontSize: "1.6rem", // Even larger font
                            fontFamily: '"Cabinet Grotesk", sans-serif', // More personality
                            letterSpacing: "-0.01em",
                            transform: "translateZ(50px) rotateX(1deg)", // More dramatic 3D effect
                            position: "relative",
                            padding: "1.5rem 2rem 1.5rem 1.5rem", // MUCH more padding
                            borderRadius: "0.5rem",
                            background: "rgba(10, 15, 36, 0.6)", // Light background
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(10, 15, 36, 0.8)",

                            // Add subtle highlight background - blue for light theme
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              bottom: 0,
                              width: "5px",
                              background: "var(--mantine-primary-gradient)",
                              borderRadius: "2px 0 0 2px",
                              opacity: 0.7, // More visible
                            },
                          }}
                        >
                          I craft{" "}
                          <Box
                            component="span"
                            className="highlight-blue"
                            fw={900}
                            style={{
                              color: "#3D7FFF",
                              position: "relative",
                              padding: "0 5px",
                              transformStyle: "preserve-3d",
                              display: "inline-block",
                              transform: "translateZ(5px) skewX(-5deg)", // Skew for dynamic effect
                            }}
                          >
                            innovative
                          </Box>{" "}
                          and
                          <Box
                            component="span"
                            className="highlight-royal"
                            fw={900}
                            style={{
                              color: "#A64DFF",
                              position: "relative",
                              padding: "0 5px",
                              transformStyle: "preserve-3d",
                              display: "inline-block",
                              transform: "translateZ(5px) skewX(-5deg)", // Skew for dynamic effect
                            }}
                          >
                            {" "}
                            high-performance
                          </Box>{" "}
                          user interfaces with 10+ years of experience. My expertise
                          spans across{" "}
                          <Box
                            component="span"
                            fw={700}
                            style={{
                              color: "#3D7FFF",
                              textDecoration: "underline",
                              textDecorationColor: "rgba(61, 127, 255, 0.3)",
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "3px",
                            }}
                          >
                            React
                          </Box>
                          ,{" "}
                          <Box
                            component="span"
                            fw={700}
                            style={{
                              color: "#A64DFF",
                              textDecoration: "underline",
                              textDecorationColor: "rgba(166, 77, 255, 0.3)",
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "3px",
                            }}
                          >
                            TypeScript
                          </Box>
                          , and modern frontend technologies to create exceptional
                          user experiences.
                        </Text>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Group gap="xl" mt={{ base: 30, sm: 40 }}>
                          {" "}
                          {/* Increased top margin */}
                          <motion.div
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            style={{ scale: buttonScaleLeft }} // Apply scroll-based scaling
                            className="shimmer" // Add shine effect
                          >
                            <Button
                              component={Link}
                              to="/projects"
                              size="xl"
                              radius="xl" // Rounder
                              px={36} // Wider
                              className="animated-border" // Add animated border
                              style={{
                                background: "var(--mantine-animated-gradient)",
                                backgroundSize: "300% 100%",
                                animation: `${shimmer} 8s ease-in-out infinite, ${pulseGlow} 4s infinite`,
                                height: "68px", // Taller
                                fontSize: "1.2rem", // Larger text
                                fontWeight: 700, // Bolder text
                                fontFamily: '"Cabinet Grotesk", sans-serif', // More personality
                                letterSpacing: "-0.01em",
                                border: "2px solid rgba(255, 255, 255, 0.15)", // More visible border
                                backdropFilter: "blur(10px)",
                                boxShadow:
                                  "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(61, 127, 255, 0.3)", // Stronger shadow & glow
                                transform: "translateZ(20px)", // 3D effect with parallax
                                position: "relative",
                                overflow: "hidden",

                                // Shine effect overlay
                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: -100,
                                  width: "50px",
                                  height: "100%",
                                  background: "rgba(255, 255, 255, 0.2)",
                                  transform: "skewX(-30deg)",
                                  filter: "blur(10px)",
                                  animation: "shine 6s infinite",
                                },

                                "@keyframes shine": {
                                  "0%": { left: "-100px" },
                                  "20%": { left: "250%" },
                                  "100%": { left: "250%" },
                                },
                              }}
                            >
                              View My Projects
                            </Button>
                          </motion.div>
                          <motion.div
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            style={{ scale: buttonScaleRight }} // Apply scroll-based scaling
                            className="shimmer" // Add shine effect
                          >
                            <Button
                              component={Link}
                              to="/contact"
                              variant="outline"
                              size="xl"
                              className="animated-border" // Add animated border
                              radius="xl" // Rounder
                              px={36} // Wider
                              style={{
                                borderWidth: 2,
                                height: "68px", // Taller
                                fontSize: "1.2rem", // Larger text
                                fontWeight: 700, // Bolder text
                                fontFamily: '"Cabinet Grotesk", sans-serif', // More personality
                                letterSpacing: "-0.01em",
                                backdropFilter: "blur(10px)",
                                background: "rgba(10, 15, 36, 0.03)",
                                borderColor: "var(--mantine-color-secondary-6)",
                                boxShadow:
                                  "0 10px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(166, 77, 255, 0.2)", // Enhanced shadow & glow
                                transform: "translateZ(20px)", // 3D effect with parallax
                                position: "relative",
                                overflow: "hidden",

                                // Enhanced hover and active states
                                "&:hover": {
                                  borderColor: "var(--mantine-color-secondary-5)",
                                  background: "rgba(10, 15, 36, 0.05)",
                                  boxShadow:
                                    "0 15px 40px rgba(0, 0, 0, 0.2), 0 0 25px rgba(166, 77, 255, 0.3)",
                                },
                                "&:active": {
                                  transform: "translateZ(20px) translateY(3px)",
                                  boxShadow:
                                    "0 5px 15px rgba(0, 0, 0, 0.1), 0 0 10px rgba(166, 77, 255, 0.2)",
                                },
                              }}
                            >
                              Get in Touch
                            </Button>
                          </motion.div>
                        </Group>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        style={{
                          marginTop: "2rem",
                          transform: "translateZ(10px)", // 3D effect with parallax
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            color: "rgba(255, 255, 255, 0.75)",
                            fontSize: "1rem",
                            fontFamily: '"Cabinet Grotesk", sans-serif',
                            padding: "10px 20px",
                            background: "rgba(10, 15, 36, 0.03)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "30px",
                            border: "1px solid rgba(10, 15, 36, 0.05)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                            maxWidth: "fit-content",
                          }}
                        >
                          <Box
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: "#3D7FFF",
                              boxShadow: "0 0 15px #3D7FFF",
                              animation: `${pulseGlow} 2s infinite, ${bounce} 4s infinite`,
                            }}
                          />
                          Available for new opportunities
                        </Box>
                      </motion.div>

                      {/* Optional tech badges/chips */}
                      <motion.div
                        variants={itemVariants}
                        style={{ marginTop: "1rem" }}
                      >
                        <Group gap="md">
                          {["React", "TypeScript", "Three.js", "Node.js"].map(
                            (tech, i) => (
                              <Badge
                                key={tech}
                                size="md"
                                radius="md"
                                variant="outline"
                                color={i % 2 === 0 ? "primary" : "secondary"}
                                style={{
                                  background: "rgba(10, 15, 36, 0.03)",
                                  backdropFilter: "blur(5px)",
                                  border: "1px solid rgba(10, 15, 36, 0.1)",
                                  padding: "8px 12px",
                                  fontFamily: '"Cabinet Grotesk", sans-serif',
                                  animation: `${float} ${
                                    6 + i
                                  }s ease-in-out infinite`,
                                }}
                              >
                                {tech}
                              </Badge>
                            )
                          )}
                        </Group>
                      </motion.div>
                    </Stack>
                  </motion.div>
                </Grid.Col>

                {/* 3D animation column with enhanced effects */}
                {/* Removed separate Grid.Col for the 3D animation - it's now a background */}
              </Grid>
            </Container>

            {/* Scroll indicator with animation */}
            <Box
              style={{
                position: "absolute",
                bottom: "5vh",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                animation: `${fadeInUp} 1s ease-out 2s both`,
              }}
            >
              <Text
                size="sm"
                style={{
                  color: "#E3E7F1",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Scroll Down
              </Text>
              <Box
                style={{
                  width: "30px",
                  height: "50px",
                  border: "2px solid rgba(61, 127, 255, 0.3)",
                  borderRadius: "20px",
                  position: "relative",

                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "8px",
                    left: "50%",
                    width: "6px",
                    height: "6px",
                    backgroundColor: "rgba(61, 127, 255, 0.8)",
                    borderRadius: "50%",
                    transform: "translateX(-50%)",
                    animation: `${bounce} 2s infinite`,
                  },
                }}
              />
            </Box>

            {/* New section that appears on scroll with dynamic parallax effects */}
            <motion.div
              style={{
                opacity: sectionOpacity,
                y: sectionY,
                width: "100%",
                paddingTop: "50vh",
                paddingBottom: "10vh",
                position: "relative",
              }}
            >
              <Container size="xl">
                <Box
                  className="animated-border"
                  style={{
                    padding: "3rem",
                    backgroundColor: "rgba(10, 15, 36, 1)",
                    borderRadius: "1rem",
                    position: "relative",
                    zIndex: 10,
                    boxShadow: "var(--mantine-soft-shadow)",
                  }}
                >
                  <Title
                    order={2}
                    mb="xl"
                    className="shimmer"
                    style={{
                      color: "#E3E7F1",
                      fontFamily: '"Clash Display", sans-serif',
                      fontSize: "3rem",
                      maxWidth: "800px",
                    }}
                  >
                    Continue exploring more immersive experiences
                  </Title>

                  <Grid gutter={40}>
                    {[
                      {
                        title: "Projects",
                        icon: "💻",
                        color: "#3D7FFF",
                        path: "/projects",
                      },
                      { title: "Blog", icon: "📝", color: "#A64DFF", path: "/blog" },
                      {
                        title: "Experiments",
                        icon: "🧪",
                        color: "#00F0FF",
                        path: "/experiments",
                      },
                    ].map((item, i) => (
                      <Grid.Col key={i} span={{ base: 12, md: 4 }}>
                        <motion.div
                          className="hover-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.2 + i * 0.1 },
                          }}
                          whileHover={{
                            y: -8,
                            transition: { type: "spring", stiffness: 400 },
                          }}
                        >
                          <Link to={item.path} style={{ textDecoration: "none" }}>
                            <Box
                              style={{
                                padding: "2rem",
                                borderRadius: "1rem",
                                backgroundColor: "rgba(10, 15, 36, 1)",
                                boxShadow: "0 10px 30px rgba(61, 127, 255, 0.1)",
                                border: `2px solid ${item.color}20`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: `2px solid ${item.color}`,
                                  boxShadow: `0 15px 40px ${item.color}20`,
                                },
                              }}
                            >
                              <Text size="3xl" mb="md">
                                {item.icon}
                              </Text>
                              <Title
                                order={3}
                                style={{ color: item.color, marginBottom: "1rem" }}
                              >
                                {item.title}
                              </Title>
                              <Text size="md" style={{ color: "#E3E7F1" }}>
                                Discover amazing {item.title.toLowerCase()} with
                                smooth scroll animations and interactive elements.
                              </Text>
                            </Box>
                          </Link>
                        </motion.div>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>

                {/* Additional parallax floating elements */}
                <Box
                  style={{
                    position: "absolute",
                    top: "20%",
                    right: "5%",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "var(--mantine-blue-gradient)",
                    filter: "blur(60px)",
                    opacity: 0.4,
                    animation: `${float} 10s infinite ease-in-out`,
                    zIndex: 1,
                  }}
                />

                <Box
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "10%",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "var(--mantine-tertiary-gradient)",
                    filter: "blur(40px)",
                    opacity: 0.3,
                    animation: `${float} 8s infinite ease-in-out reverse`,
                    zIndex: 1,
                  }}
                />
              </Container>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
