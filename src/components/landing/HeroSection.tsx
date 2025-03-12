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
import { Link } from "gatsby";
import * as styles from './HeroSection.module.css';

interface FloatingElementProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  animationDuration?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  style = {},
  animationDuration = 5
}) => (
  <Box
    style={{
      position: "absolute",
      zIndex: 2,
      ...style,
    }}
  >
    {children}
  </Box>
);

// Main hero component with enhanced scroll effects
const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll-based transforms
  const titleTransform = `
    translateY(${-scrollY * 0.2}px) 
    rotateX(${Math.min(15, scrollY * 0.03)}deg) 
    rotateZ(${Math.min(-5, -scrollY * 0.01)}deg)
  `;

  return (
    <Container size="xl">
      <Box
        ref={containerRef}
        className={styles.heroContainer}
      >
        <Box
          ref={targetRef}
          className={styles.heroTarget}
        >
          <Box
            className={styles.heroBox}
          >
            <Box
              className={styles.heroBackground}
            />

            <Text
              className={styles.heroText}
            >
              FRONTEND
            </Text>

            <Box
              ref={targetRef}
              className={styles.heroContent}
            >
              {/* Decorative geometric element to fill empty space */}
              <Box className={styles.geometricDecoration} />

              {/* First floating element */}
              <Box
                className={styles.floatingElement}
                style={{
                  top: "15%",
                  left: "10%",
                }}
              >
                <Box
                  className={styles.floatingElementInner}
                />
              </Box>

              {/* Second floating element */}
              <Box
                className={styles.floatingElement}
                style={{
                  top: "25%",
                  right: "15%",
                }}
              >
                <Box
                  className={styles.floatingElementInner}
                  style={{
                    background: "rgba(33, 230, 193, 0.4)", 
                  }}
                />
              </Box>

              <Container
                size="xl"
                py={{ base: "xl", sm: "2xl" }}
                mt={{ base: 30, sm: 60 }}
              >
                {/* Repositioned megaTitle for better visual balance */}
                <div
                  className={styles.megaTitle}
                  style={{
                    transform: titleTransform,
                    textAlign: "right",
                    marginBottom: "3rem",
                  }}
                >
                  <Text
                    className={styles.megaTitleText}
                  >
                    TRAVNIKOV
                  </Text>
                </div>

                <Grid gutter={{ base: 40, sm: 80 }} align="center">
                  <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
                    <Stack
                      gap="xl"
                      h="100%"
                      justify="center"
                    >
                      <Box mb="lg" className="shimmer">
                        <Badge
                          size="xl"
                          radius="lg"
                          variant="gradient"
                          gradient={{ from: "primary", to: "secondary", deg: 45 }}
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
                        data-text="Roman Travnikov"
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
                        I craft{" "}
                        <Box
                          component="span"
                          fw={900}
                          className={`highlight-blue ${styles.highlightBlue}`}
                        >
                          innovative
                        </Box>{" "}
                        and
                        <Box
                          component="span"
                          fw={900}
                          className={`highlight-royal ${styles.highlightRoyal}`}
                        >
                          {" "}
                          high-performance
                        </Box>{" "}
                        user interfaces with 10+ years of experience. My expertise
                        spans across{" "}
                        <Box
                          component="span"
                          fw={700}
                          className={styles.highlightReact}
                        >
                          React
                        </Box>
                        ,{" "}
                        <Box
                          component="span"
                          fw={700}
                          className={styles.highlightTypeScript}
                        >
                          TypeScript
                        </Box>
                        , and modern frontend technologies to create exceptional
                        user experiences.
                      </Text>

                      <Group gap="xl" mt={{ base: 30, sm: 40 }}>
                        <Button
                          component={Link}
                          to="/projects"
                          size="xl"
                          radius="xl"
                          px={36}
                          className={`animated-border hover-scale ${styles.heroButton}`}
                        >
                          View My Projects
                        </Button>
                        <Button
                          component={Link}
                          to="/contact"
                          variant="outline"
                          size="xl"
                          radius="xl"
                          px={36}
                          className={`animated-border hover-scale ${styles.heroButtonOutline}`}
                        >
                          Get in Touch
                        </Button>
                      </Group>

                      <Box
                        className={styles.availability}
                      >
                        <Box
                          className={styles.availabilityIndicator}
                        />
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
                </Grid>
              </Container>

              <Box
                className={styles.scrollIndicator}
              >
                <Text
                  size="sm"
                  className={styles.scrollText}
                >
                  Scroll Down
                </Text>
                <Box
                  className={styles.scrollBox}
                />
              </Box>

              {/* <div
                className={styles.scrollSection}
                style={{
                  transform: `translateY(${scrollY}px)`,
                }}
              >
                <Container size="xl">
                  <Box
                    className={`animated-border ${styles.scrollContent}`}
                  >
                    <Title
                      order={2}
                      mb="xl"
                      className={`shimmer ${styles.scrollTitle}`}
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
                          <Link to={item.path} style={{ textDecoration: "none" }}>
                            <Box
                              className={styles.scrollItem}
                              style={{
                                border: `2px solid ${item.color}20`,
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
                        </Grid.Col>
                      ))}
                    </Grid>
                  </Box>

                  <Box
                    className={styles.floatingElementTop}
                  />

                  <Box
                    className={styles.floatingElementBottom}
                  />
                </Container>
              </div> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
