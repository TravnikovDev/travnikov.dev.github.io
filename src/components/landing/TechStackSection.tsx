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

// Updated Tech stack data based on Roman's actual skills from ABOUT_AUTHOR.MD
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
        description: "Advanced React and Next.js development including custom hooks, state management, and server-side rendering"
      },
      {
        name: "TypeScript",
        level: 90,
        color: "#3D7FFF",
        experience: "4+ years",
        projects: 25,
        description: "Type-safe development with advanced TypeScript features and patterns for robust frontend applications"
      },
      {
        name: "State Management",
        level: 90,
        color: "#3D7FFF",
        experience: "5+ years",
        projects: 28,
        description: "Expertise with Redux, Redux Toolkit, RxJS, and Zustand for complex state management solutions"
      },
      {
        name: "Mantine UI",
        level: 88,
        color: "#3D7FFF",
        experience: "3+ years",
        projects: 18,
        description: "Building modern UIs with Mantine component library for consistent, accessible interfaces"
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
        description: "3D graphics programming with Three.js for immersive web experiences and interactive visualizations"
      },
      {
        name: "SVG Animation",
        level: 90,
        color: "#A64DFF",
        experience: "5+ years",
        projects: 25,
        description: "Complex SVG animations and interactive graphics, including automation for scalable SVG generation"
      },
      {
        name: "Motion Design",
        level: 85,
        color: "#A64DFF",
        experience: "4+ years",
        projects: 20,
        description: "Creating advanced animations and parallax effects for engaging user interfaces"
      },
      {
        name: "Figma",
        level: 80,
        color: "#A64DFF",
        experience: "3+ years",
        projects: 22,
        description: "Design-to-code workflow with Figma for consistent implementation of UI/UX designs"
      }
    ]
  },
  {
    name: "Backend & CMS",
    color: "#00B8D9",
    icon: <FaNodeJs size={32} />,
    description: "Server-side development and content management solutions",
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
        description: "API development with GraphQL for flexible and efficient data fetching"
      },
      {
        name: "Firebase",
        level: 85,
        color: "#00B8D9",
        experience: "4+ years",
        projects: 16,
        description: "Building realtime applications and serverless solutions with Firebase"
      },
      {
        name: "Sanity/Contentful",
        level: 82,
        color: "#00B8D9",
        experience: "3+ years",
        projects: 14,
        description: "Implementing headless CMS solutions with Sanity.io and Contentful for scalable content management"
      }
    ]
  }
];

// Modified SkillCard component with improved visualization
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
  
  // Animation for the progress value
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
  
  // Determine the card style based on skill level (for visual differentiation)
  const getCardStyle = () => {
    // Expert level (90-100%)
    if (skill.level >= 90) {
      return {
        borderWidth: '3px',
        boxShadow: isHovered
          ? `0 15px 35px rgba(0, 0, 0, 0.3), 0 0 30px ${skill.color}80`
          : `0 8px 25px rgba(0, 0, 0, 0.15), 0 0 15px ${skill.color}30`,
        background: isHovered
          ? `linear-gradient(135deg, rgba(10, 15, 36, 0.95), rgba(10, 15, 36, 0.8))`
          : `linear-gradient(135deg, rgba(10, 15, 36, 0.85), rgba(10, 15, 36, 0.7))`,
      };
    }
    // Advanced level (75-89%)
    else if (skill.level >= 75) {
      return {
        borderWidth: '2px',
        boxShadow: isHovered
          ? `0 12px 30px rgba(0, 0, 0, 0.25), 0 0 20px ${skill.color}60`
          : `0 6px 20px rgba(0, 0, 0, 0.12), 0 0 10px ${skill.color}20`,
        background: isHovered
          ? `linear-gradient(135deg, rgba(10, 15, 36, 0.9), rgba(10, 15, 36, 0.75))`
          : `linear-gradient(135deg, rgba(10, 15, 36, 0.8), rgba(10, 15, 36, 0.65))`,
      };
    }
    // Intermediate level (below 75%)
    else {
      return {
        borderWidth: '1px',
        boxShadow: isHovered
          ? `0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px ${skill.color}40`
          : `0 4px 15px rgba(0, 0, 0, 0.1)`,
        background: isHovered
          ? `linear-gradient(135deg, rgba(10, 15, 36, 0.85), rgba(10, 15, 36, 0.7))`
          : `linear-gradient(135deg, rgba(10, 15, 36, 0.75), rgba(10, 15, 36, 0.6))`,
      };
    }
  };
  
  const cardStyle = getCardStyle();
  
  // Determine progress bar style based on skill level with improved thickness and readability
  const progressStyle = () => {
    if (skill.level >= 90) {
      return {
        size: isMobile ? 95 : 110, // Slightly smaller for better proportion
        thickness: isMobile ? 8 : 7, // Thicker lines for better readability
        ringOpacity: 1,
        glowIntensity: '15px',
        fontSize: isMobile ? "1.5rem" : "1.8rem" // Larger percentage number
      };
    } else if (skill.level >= 75) {
      return {
        size: isMobile ? 90 : 105,
        thickness: isMobile ? 7 : 6,
        ringOpacity: 0.9,
        glowIntensity: '10px',
        fontSize: isMobile ? "1.4rem" : "1.7rem"
      };
    } else {
      return {
        size: isMobile ? 85 : 100,
        thickness: isMobile ? 6 : 5, // Still thicker than original for better visibility
        ringOpacity: 0.8,
        glowIntensity: '5px',
        fontSize: isMobile ? "1.3rem" : "1.6rem"
      };
    }
  };
  
  const progress = progressStyle();
  
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
        p="xl" // Consistent padding for all cards
        radius="lg"
        className={styles.skillCardPaper}
        style={{
          position: "relative",
          height: "100%",
          background: cardStyle.background,
          backdropFilter: "blur(10px)",
          border: `${cardStyle.borderWidth} solid ${isHovered ? skill.color : isMobile ? `${skill.color}50` : 'rgba(255, 255, 255, 0.1)'}`,
          transition: "all 0.4s ease",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: cardStyle.boxShadow,
          transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Skill level indicator band at the top */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: `${skill.level >= 90 ? '8px' : skill.level >= 75 ? '6px' : '4px'}`,
            background: `linear-gradient(90deg, ${skill.color}, transparent ${skill.level}%)`,
            opacity: isHovered || isMobile ? 1 : 0.7,
            transition: "opacity 0.3s ease"
          }}
        />
        
        <Group align="flex-start" wrap="nowrap" gap="lg"> {/* Increased gap for better spacing */}
          {/* Circular progress with animated counter */}
          <Box
            className={styles.circularProgress}
            style={{
              position: "relative",
            }}
          >
            <RingProgress
              size={progress.size}
              thickness={progress.thickness}
              roundCaps
              label={
                <Box
                  className={styles.circularProgressLabel}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "4px" // Increased gap between icon and percentage
                  }}
                >
                  <Box
                    className={styles.circularProgressIcon}
                    style={{
                      color: skill.color,
                      filter: (isHovered || isMobile) 
                        ? `drop-shadow(0 0 ${progress.glowIntensity} ${skill.color})` 
                        : "none",
                      transition: "filter 0.3s ease",
                      fontSize: isMobile ? "1.5rem" : "1.6rem", // Larger icon
                      opacity: progress.ringOpacity
                    }}
                  >
                    {getSkillIcon(skill.name)}
                  </Box>
                  <Text
                    fw={700}
                    className={styles.circularProgressText}
                    style={{
                      color: "#fff",
                      fontSize: progress.fontSize, // Larger percentage number
                      textShadow: (isHovered || isMobile) 
                        ? `0 0 ${progress.glowIntensity} ${skill.color}` 
                        : "none"
                    }}
                  >
                    {Math.round(progressValue)}%
                  </Text>
                </Box>
              }
              sections={[
                { 
                  value: progressValue, 
                  color: skill.color, 
                  tooltip: `${skill.level}% proficiency` 
                },
              ]}
            />
            {/* Pulse effect background */}
            <Box
              className={styles.pulseEffect}
              style={{
                position: "absolute",
                top: "-8px", // Slightly larger area
                left: "-8px",
                right: "-8px",
                bottom: "-8px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${skill.color}20 0%, transparent 70%)`,
                opacity: isHovered || isMobile ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: -1
              }}
            />
          </Box>
          
          <Box style={{ flex: 1 }}>
            <Group justify="space-between" mb="xs">
              <Text
                size={
                  isMobile ? "lg" : 
                  skill.level >= 90 ? "xl" : 
                  "lg"
                }
                fw={skill.level >= 90 ? 800 : 700}
                className={styles.skillName}
                style={{
                  color: skill.color,
                  transition: "all 0.3s ease",
                  textShadow: (isHovered || isMobile) 
                    ? `0 0 ${progress.glowIntensity} ${skill.color}80` 
                    : "none",
                  fontSize: isMobile ? "1.3rem" : skill.level >= 90 ? "1.4rem" : "1.3rem" // Larger text
                }}
              >
                {skill.name}
              </Text>
              <Badge
                color="dark"
                variant="filled"
                radius="sm"
                size="md" // Larger badge for better visibility
                className={styles.skillExperience}
                style={{
                  background: `linear-gradient(135deg, ${skill.color}90, ${skill.color}50)`,
                  border: `1.5px solid ${skill.color}`, // Thicker border
                  boxShadow: (isHovered || isMobile) 
                    ? `0 0 ${progress.glowIntensity} ${skill.color}60` 
                    : "none",
                  transition: "all 0.3s ease",
                  padding: "0.4rem 0.8rem", // Increased padding
                  fontSize: "0.95rem" // Larger font
                }}
              >
                {skill.experience}
              </Badge>
            </Group>
            
            <Text
              size="md" // Consistent medium size
              color="#E3E7F1"
              mb="md"
              className={styles.skillDescription}
              style={{
                maxHeight: isExpanded ? "none" : "3em",
                overflow: "hidden",
                fontSize: "1rem", // Consistent font size
                lineHeight: 1.5, // Better line height for readability
                transition: "max-height 0.3s ease"
              }}
            >
              {skill.description}
            </Text>
            
            <Badge
              leftSection={<Box size={14}>📊</Box>} // Slightly larger icon
              size="md"
              className={styles.skillProjects}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: `1.5px solid ${skill.level >= 90 
                  ? skill.color + '50' 
                  : "rgba(255, 255, 255, 0.2)"}`,
                padding: "0.5rem 0.8rem", // Increased padding
                fontSize: "0.95rem" // Larger font
              }}
            >
              {skill.projects}+ Projects
            </Badge>
          </Box>
        </Group>
        
        {/* Bottom decorative element */}
        <Box
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: `${skill.level}%`,
            height: `${skill.level >= 90 ? '4px' : skill.level >= 75 ? '3px' : '2px'}`,
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
    <Container size="xl" className={styles.techStackSection} ref={sectionRef}>
      <Stack gap="xl">
        <div className={styles.sectionTitle}>
          <Box
            className={styles.sectionTitle}
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "2.5rem" : "4rem"
            }}
          >
            <Box style={{ display: 'inline-block', position: 'relative' }}>
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
            
            {/* Using a balanced grid layout for consistent visual appeal */}
            <Grid 
              gutter="xl" // Consistent gutter
              style={{ marginTop: '25px' }} // Slightly more space between category and skills
            >
              {category.skills.map((skill, idx) => {
                // Create a more balanced layout
                let spanSize;
                
                if (isMobile) {
                  // Mobile is full width
                  spanSize = { base: 12 };
                } else {
                  // For desktop, create a more balanced 2x2 grid layout
                  // This ensures symmetric appearance rather than asymmetric
                  spanSize = { base: 12, sm: 6, md: 6, lg: 6 };
                }
                
                return (
                  <Grid.Col key={idx} span={spanSize}>
                    <SkillCard
                      skill={skill}
                      index={idx}
                      categoryColor={category.color}
                    />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
