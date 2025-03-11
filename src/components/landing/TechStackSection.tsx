import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Stack,
  Box,
  Badge,
  RingProgress,
} from "@mantine/core";
import { theme } from "../../theme";
import { useColorScheme } from "@mantine/hooks";
import {
  FaReact, FaJs, FaHtml5, FaNodeJs, FaDatabase
} from "react-icons/fa";
import {
  SiTypescript, SiThreedotjs, SiWebgl, SiGreensock,
  SiSvg, SiGraphql, SiPostgresql, SiMongodb
} from "react-icons/si";
import * as styles from './TechStackSection.module.css';

// Get icon by skill name
const getSkillIcon = (name) => {
  const iconProps = { size: 28 };

  switch (name.toLowerCase()) {
    case "react/next.js":
      return <FaReact {...iconProps} />;
    case "typescript":
      return <SiTypescript {...iconProps} />;
    case "javascript":
      return <FaJs {...iconProps} />;
    case "html/css":
      return <FaHtml5 {...iconProps} />;
    case "three.js":
      return <SiThreedotjs {...iconProps} />;
    case "webgl":
      return <SiWebgl {...iconProps} />;
    case "gsap":
      return <SiGreensock {...iconProps} />;
    case "svg animation":
      return <SiSvg {...iconProps} />;
    case "node.js":
      return <FaNodeJs {...iconProps} />;
    case "graphql":
      return <SiGraphql {...iconProps} />;
    case "postgresql":
      return <SiPostgresql {...iconProps} />;
    case "mongodb":
      return <SiMongodb {...iconProps} />;
    default:
      return <FaJs {...iconProps} />;
  }
};

interface TechSkill {
  name: string;
  level: number;
  color: string;
  experience: string;
  projects: number;
  description: string;
}

interface TechCategory {
  name: string;
  color: string;
  icon: JSX.Element;
  description: string;
  skills: TechSkill[];
}

// Tech stack data
const techData: TechCategory[] = [
  {
    name: "Frontend Development",
    color: "#3D7FFF",
    icon: <FaReact size={32} />,
    description: "Modern web development with a focus on performance and user experience",
    skills: [
      {
        name: "React/Next.js",
        level: 95,
        color: "#3D7FFF",
        experience: "6+ years",
        projects: 30,
        description: "Advanced React development including custom hooks, performance optimization, and state management"
      },
      {
        name: "TypeScript",
        level: 90,
        color: "#3D7FFF",
        experience: "4+ years",
        projects: 25,
        description: "Type-safe development with advanced TypeScript features and patterns"
      },
      {
        name: "JavaScript",
        level: 95,
        color: "#3D7FFF",
        experience: "8+ years",
        projects: 40,
        description: "Deep understanding of JavaScript including ES6+, async programming, and design patterns"
      },
      {
        name: "HTML/CSS",
        level: 90,
        color: "#3D7FFF",
        experience: "10+ years",
        projects: 50,
        description: "Semantic HTML and modern CSS including Flexbox, Grid, and animations"
      }
    ]
  },
  {
    name: "Creative Development",
    color: "#A64DFF",
    icon: <SiThreedotjs size={32} />,
    description: "3D graphics and creative coding for immersive web experiences",
    skills: [
      {
        name: "Three.js",
        level: 85,
        color: "#A64DFF",
        experience: "3+ years",
        projects: 15,
        description: "3D graphics programming with Three.js, including custom shaders and animations"
      },
      {
        name: "WebGL",
        level: 80,
        color: "#A64DFF",
        experience: "2+ years",
        projects: 10,
        description: "Low-level graphics programming with WebGL for custom visual effects"
      },
      {
        name: "GSAP",
        level: 85,
        color: "#A64DFF",
        experience: "4+ years",
        projects: 20,
        description: "Advanced animations and motion design with GSAP"
      },
      {
        name: "SVG Animation",
        level: 90,
        color: "#A64DFF",
        experience: "5+ years",
        projects: 25,
        description: "Complex SVG animations and interactive graphics"
      }
    ]
  },
  {
    name: "Backend Development",
    color: "#00B8D9",
    icon: <FaNodeJs size={32} />,
    description: "Server-side development with modern JavaScript/TypeScript",
    skills: [
      {
        name: "Node.js",
        level: 85,
        color: "#00B8D9",
        experience: "5+ years",
        projects: 20,
        description: "Backend development with Node.js including REST APIs and microservices"
      },
      {
        name: "GraphQL",
        level: 80,
        color: "#00B8D9",
        experience: "3+ years",
        projects: 12,
        description: "API development with GraphQL, including schema design and resolvers"
      },
      {
        name: "PostgreSQL",
        level: 75,
        color: "#00B8D9",
        experience: "4+ years",
        projects: 15,
        description: "Database design and optimization with PostgreSQL"
      },
      {
        name: "MongoDB",
        level: 80,
        color: "#00B8D9",
        experience: "4+ years",
        projects: 18,
        description: "NoSQL database development with MongoDB"
      }
    ]
  }
];

// Single skill card component with circular progress
const SkillCard = ({ skill, index, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const cardRef = useRef(null);

  // Responsive layout detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate progress
          const startTime = performance.now();
          const duration = 1500;
          const startValue = 0;
          const endValue = skill.level;

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out function
            const easedProgress = 1 - Math.pow(1 - progress, 2);
            setProgressValue(startValue + (endValue - startValue) * easedProgress);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          setTimeout(() => {
            requestAnimationFrame(animate);
          }, 200 + index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [skill.level, index]);

  return (
    <div
      ref={cardRef}
      className={styles.skillCard}
      style={{
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        height: "100%",
        perspective: "1000px"
      }}
    >
      <Paper
        shadow="md"
        p={isMobile ? "lg" : "xl"}
        radius="lg"
        className={styles.skillCardPaper}
        style={{
          position: "relative",
          height: "100%",
          background: isHovered
            ? `linear-gradient(135deg, rgba(10, 15, 36, 0.9), rgba(10, 15, 36, 0.95))`
            : `rgba(10, 15, 36, 0.8)`,
          backdropFilter: "blur(10px)",
          border: `2px solid ${isHovered ? skill.color : isMobile ? `${skill.color}50` : 'rgba(255, 255, 255, 0.1)'}`,
          transition: "all 0.4s ease",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: isHovered
            ? `0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px ${skill.color}40`
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
          transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Gradient overlay effect */}
        <Box
          className={styles.gradientOverlay}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: isMobile ? "8px" : "5px",
            background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
            opacity: isHovered || isMobile ? 1 : 0.5,
            transition: "opacity 0.3s ease"
          }}
        />

        <Group align="flex-start" wrap="nowrap" gap={isMobile ? "lg" : "md"}>
          {/* Circular progress with animated counter */}
          <Box
            className={styles.circularProgress}
            style={{
              position: "relative",
            }}
          >
            <RingProgress
              size={isMobile ? 90 : 110}
              thickness={isMobile ? 5 : 4}
              roundCaps
              label={
                <Box
                  className={styles.circularProgressLabel}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "2px"
                  }}
                >
                  <Box
                    className={styles.circularProgressIcon}
                    style={{
                      color: skill.color,
                      filter: (isHovered || isMobile) ? `drop-shadow(0 0 8px ${skill.color})` : "none",
                      transition: "filter 0.3s ease",
                      fontSize: isMobile ? "1.3rem" : undefined
                    }}
                  >
                    {getSkillIcon(skill.name)}
                  </Box>
                  <Text
                    fw={700}
                    size={isMobile ? "lg" : "xl"}
                    className={styles.circularProgressText}
                    style={{
                      color: "#fff",
                      textShadow: (isHovered || isMobile) ? `0 0 8px ${skill.color}` : "none"
                    }}
                  >
                    {Math.round(progressValue)}%
                  </Text>
                </Box>
              }
              sections={[
                { value: progressValue, color: skill.color, tooltip: `${skill.level}% proficiency` },
              ]}
            />

            {/* Pulse effect background */}
            <Box
              className={styles.pulseEffect}
              style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                right: "-5px",
                bottom: "-5px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${skill.color}10 0%, transparent 70%)`,
                opacity: isHovered || isMobile ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: -1
              }}
            />
          </Box>

          <Box style={{ flex: 1 }}>
            <Group justify="space-between" mb="xs">
              <Text
                size={isMobile ? "lg" : "xl"}
                fw={700}
                className={styles.skillName}
                style={{
                  color: skill.color,
                  transition: "all 0.3s ease",
                  textShadow: (isHovered || isMobile) ? `0 0 10px ${skill.color}80` : "none",
                  fontSize: isMobile ? "1.2rem" : undefined
                }}
              >
                {skill.name}
              </Text>

              <Badge
                color="dark"
                variant="filled"
                radius="sm"
                size={isMobile ? "md" : "sm"}
                className={styles.skillExperience}
                style={{
                  background: `linear-gradient(135deg, ${skill.color}90, ${skill.color}50)`,
                  border: `1px solid ${skill.color}`,
                  boxShadow: (isHovered || isMobile) ? `0 0 10px ${skill.color}60` : "none",
                  transition: "all 0.3s ease",
                  padding: isMobile ? "0.4rem 0.7rem" : undefined,
                  fontSize: isMobile ? "0.9rem" : undefined
                }}
              >
                {skill.experience}
              </Badge>
            </Group>

            <Text
              size={isMobile ? "md" : "sm"}
              color="#E3E7F1"
              mb="md"
              className={styles.skillDescription}
              style={{
                maxHeight: isExpanded ? "none" : "3em",
                overflow: "hidden",
                fontSize: isMobile ? "1rem" : undefined,
                fontWeight: isMobile ? 400 : undefined,
                transition: "max-height 0.3s ease"
              }}
            >
              {skill.description}
            </Text>

            <Badge
              leftSection={<Box size={isMobile ? 14 : 12}>📊</Box>}
              size={isMobile ? "md" : "sm"}
              className={styles.skillProjects}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: isMobile ? "0.5rem 0.8rem" : undefined,
                fontSize: isMobile ? "0.9rem" : undefined
              }}
            >
              {skill.projects}+ Projects
            </Badge>
          </Box>
        </Group>

        {/* Bottom decorative element */}
        <Box
          className={styles.bottomDecorativeElement}
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: `${skill.level}%`,
            height: isMobile ? "3px" : "2px",
            background: `linear-gradient(90deg, ${skill.color}70, transparent)`,
            transition: "all 0.3s ease"
          }}
        />
      </Paper>
    </div>
  );
};

export function TechStackSection() {
  const colorScheme = useColorScheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1,
          1 - (rect.top - window.innerHeight) / (rect.height + window.innerHeight)
        ));
        setScrollProgress(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive layout detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return (
    <Container size="xl" className={styles.techStackSection}>
      <Stack gap="xl">
        <div className={styles.sectionTitle}>
          <Box
            className={styles.sectionTitle}
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "2.5rem" : "4rem"
            }}
          >
            <Box
              className={styles.sectionTitleInner}
            >
              <Title
                order={2}
                className={styles.sectionTitleText}
                style={{
                  fontSize: isMobile ? "2.3rem" : "3rem"
                }}
              >
                Technical Expertise
              </Title>

              {/* Animated underline */}
              <Box className={styles.animatedUnderline} />
            </Box>

            <Text
              size={isMobile ? "lg" : "xl"}
              className={styles.sectionDescription}
              style={{
                padding: isMobile ? "0 1rem" : 0,
                margin: isMobile ? "1.5rem auto 0" : "2rem auto 0"
              }}
            >
              A showcase of my technical proficiency across various domains of web development,
              backed by years of hands-on experience.
            </Text>
          </Box>
        </div>

        {techData.map((category, index) => (
          <Box key={index} mb="xl">
            <Paper
              p="xl"
              radius="md"
              className={styles.techCategoryPaper}
            >
              {isMobile ? (
                <Stack gap="md">
                  <Group gap="md">
                    <Box
                      className={styles.categoryIcon}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "60px",
                        height: "60px",
                        borderRadius: "16px",
                        background: `linear-gradient(135deg, ${category.color}, ${category.color}80)`,
                        color: "white",
                        boxShadow: `0 5px 15px ${category.color}40`,
                        fontSize: "1.7rem"
                      }}
                    >
                      {category.icon}
                    </Box>

                    <Box style={{ flex: 1 }}>
                      <Title
                        order={3}
                        className={styles.categoryTitle}
                        style={{
                          fontSize: "1.7rem",
                          fontWeight: 800,
                          marginBottom: "0.25rem",
                          background: `linear-gradient(90deg, #fff, ${category.color})`,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {category.name}
                      </Title>

                      <Badge
                        size="lg"
                        radius="md"
                        variant="filled"
                        className={styles.categoryBadge}
                        style={{
                          background: `linear-gradient(135deg, ${category.color}40, ${category.color}10)`,
                          border: `1px solid ${category.color}40`,
                          backdropFilter: "blur(5px)",
                          padding: "0.4rem 0.8rem",
                          fontSize: "0.9rem",
                          fontWeight: 600
                        }}
                      >
                        {category.skills.length} Skills
                      </Badge>
                    </Box>
                  </Group>

                  <Text color="#E3E7F1" size="md" className={styles.categoryDescription} style={{ fontSize: "1rem", lineHeight: 1.5 }}>
                    {category.description}
                  </Text>
                </Stack>
              ) : (
                <Group justify="space-between" align="center">
                  <Group gap="md">
                    <Box
                      className={styles.categoryIcon}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "60px",
                        height: "60px",
                        borderRadius: "16px",
                        background: `linear-gradient(135deg, ${category.color}, ${category.color}80)`,
                        color: "white",
                        boxShadow: `0 5px 15px ${category.color}40`,
                      }}
                    >
                      {category.icon}
                    </Box>

                    <Box>
                      <Title
                        order={3}
                        className={styles.categoryTitle}
                        style={{
                          fontSize: "2rem",
                          fontWeight: 800,
                          marginBottom: "0.25rem",
                          background: `linear-gradient(90deg, #fff, ${category.color})`,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {category.name}
                      </Title>

                      <Text color="#E3E7F1" size="md" className={styles.categoryDescription}>
                        {category.description}
                      </Text>
                    </Box>
                  </Group>

                  <Badge
                    size="xl"
                    radius="md"
                    variant="filled"
                    className={styles.categoryBadge}
                    style={{
                      background: `linear-gradient(135deg, ${category.color}40, ${category.color}10)`,
                      border: `1px solid ${category.color}40`,
                      backdropFilter: "blur(5px)",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {category.skills.length} Skills
                  </Badge>
                </Group>
              )}
            </Paper>

            <Grid gutter={isMobile ? "md" : "xl"}>
              {category.skills.map((skill, index) => (
                <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <SkillCard
                    skill={skill}
                    index={index}
                    categoryColor={category.color}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
