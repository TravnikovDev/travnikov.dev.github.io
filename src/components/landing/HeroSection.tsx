import React, { useRef, useEffect, useState } from "react";
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
// removed Link import — buttons updated to scroll / mailto
import * as styles from "./HeroSection.module.css";
import { Canvas } from "@react-three/fiber";
import HolographicAvatar from "../3d/HolographicAvatar";

// Main hero component with enhanced scroll effects
const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scroll-based transforms
  const titleTransform = `
    translateY(${-scrollY * 0.1}px)
    rotateX(${Math.min(10, scrollY * 0.02)}deg)
  `;

  const scrollToNext = () => {
    try {
      const el = (containerRef.current as any)?.closest
        ? (containerRef.current as any).closest("section")
        : null;
      if (!el) return;
      // find next element sibling that is an element node
      let next: any = el.nextElementSibling;
      while (next && next.nodeType !== 1) next = next.nextSibling;
      if (next && typeof next.scrollIntoView === "function") {
        next.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (e) {
      // fallback: scroll down by viewport height
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  return (
    <Container size="xl">
      <Box ref={containerRef} className={styles.heroContainer}>
        <Box ref={targetRef} className={styles.heroTarget}>
          <Box className={styles.heroBox}>
            <Box className={styles.heroBackground} />

            <Box ref={targetRef} className={styles.heroContent}>
              {/* Decorative geometric element */}
              <Box className={styles.geometricDecoration} />

              <Container
                size="xl"
                py={{ base: "xl", sm: "2xl" }}
                mt={{ base: 30, sm: 60 }}
              >
                <Grid gutter={{ base: 40, sm: 80 }} align="center">
                  <Grid.Col
                    span={{ base: 12, md: 7 }}
                    order={{ base: 2, md: 1 }}
                  >
                    <Stack gap="xl" h="100%" justify="center">
                      <Box mb="lg" className="shimmer">
                        <Badge
                          size="xl"
                          radius="lg"
                          variant="gradient"
                          gradient={{
                            from: "primary",
                            to: "secondary",
                            deg: 45,
                          }}
                          className="animated-border"
                          style={{
                            textTransform: "none",
                            padding: "12px 24px",
                            fontFamily: '"Cabinet Grotesk", sans-serif',
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            letterSpacing: "-0.01em",
                            color: "white",
                            boxShadow: "var(--mantine-soft-shadow)",
                            border: "1px solid rgba(255, 255, 255, 0.9)",
                            transform: "translateZ(30px)",
                          }}
                        >
                          Senior Frontend Developer
                        </Badge>
                      </Box>

                      <Title
                        order={1}
                        mb={{ base: "lg", sm: "2xl" }}
                        className={styles.heroTitle}
                        style={{
                          transform: titleTransform,
                          fontSize: "clamp(3rem, 8vw, 5rem)",
                          background:
                            "linear-gradient(135deg, var(--mantine-color-primary-4), var(--mantine-color-secondary-4))",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                        }}
                      >
                        Roman
                        <br />
                        Travnikov
                      </Title>

                      <Text
                        size="xl"
                        mb={{ base: "xl", sm: "3.5rem" }}
                        className={`hover-card ${styles.heroDescription}`}
                      >
                        I engineer{" "}
                        <Box
                          component="span"
                          fw={900}
                          className={`highlight-blue ${styles.highlightBlue}`}
                        >
                          autonomous AI systems
                        </Box>{" "}
                        and{" "}
                        <Box
                          component="span"
                          fw={900}
                          className={`highlight-royal ${styles.highlightRoyal}`}
                        >
                          high-performance web architecture
                        </Box>{" "}
                        for startups.
                      </Text>

                      <Group gap="xl" mt={{ base: 30, sm: 40 }}>
                        <Button
                          onClick={scrollToNext}
                          size="xl"
                          radius="xl"
                          px={36}
                          aria-label="Scroll to next section"
                          className={`animated-border hover-scale ${styles.heroButton}`}
                        >
                          Scroll Down
                        </Button>
                        <Button
                          component="a"
                          href="mailto:roman@travnikov.dev"
                          variant="outline"
                          size="xl"
                          radius="xl"
                          px={36}
                          className={`animated-border hover-scale ${styles.heroButtonOutline}`}
                        >
                          Get in Touch
                        </Button>
                      </Group>

                      <Box className={styles.availability}>
                        <Box className={styles.availabilityIndicator} />
                        Available for new opportunities
                      </Box>

                      <Group gap="md" className={styles.techStack}>
                        {["React", "TypeScript", "Three.js", "Node.js"].map(
                          (tech, i) => (
                            <Badge
                              key={tech}
                              size="md"
                              radius="md"
                              variant="outline"
                              color={i % 2 === 0 ? "primary" : "secondary"}
                              className={styles.techBadge}
                            >
                              {tech}
                            </Badge>
                          )
                        )}
                      </Group>
                    </Stack>
                  </Grid.Col>

                  <Grid.Col
                    span={{ base: 12, md: 5 }}
                    order={{ base: 1, md: 2 }}
                  >
                    <Box className={styles.heroVisual}>
                      <Box className={styles.visualContainer}>
                        {/* Abstract geometric shapes remain as background elements */}
                        <Box className={styles.floatingShape} data-shape="1" />
                        <Box className={styles.floatingShape} data-shape="2" />
                        <Box className={styles.floatingShape} data-shape="3" />

                        {/* Add 3D holographic avatar */}
                        <Canvas
                          camera={{
                            position: [0, 0, 5.5],
                            fov: 45,
                            near: 0.1,
                            far: 1000,
                          }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                            zIndex: 2,
                          }}
                        >
                          <ambientLight intensity={0.2} />
                          <HolographicAvatar
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                            scale={0.8}
                          />
                        </Canvas>
                      </Box>
                    </Box>
                  </Grid.Col>
                </Grid>
              </Container>

              <Box className={styles.scrollIndicator}>
                <Text size="sm" className={styles.scrollText}>
                  Scroll Down
                </Text>
                <Box className={styles.scrollBox} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
