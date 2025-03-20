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
} from "@mantine/core";
import { theme } from "../../theme";
import { useColorScheme } from "@mantine/hooks";
import {
  FaReact, FaJs, FaHtml5, FaNodeJs, FaDatabase, FaServer, FaCode, FaTools, FaCss3Alt, FaVial
} from "react-icons/fa";
import {
  SiTypescript, SiThreedotjs, SiWebgl, SiGreensock,
  SiSvg, SiGraphql, SiPostgresql, SiMongodb, SiRedux, 
  SiNx, SiSass, SiJest, SiCypress, SiNextdotjs,
  SiExpress, SiFirebase, SiContentful, SiFigma, SiMui, SiStorybook
} from "react-icons/si";
import * as styles from './TechStackSection.module.css';

// Get icon by skill name
const getSkillIcon = (name) => {
  const iconProps = { size: 28 };

  switch (name.toLowerCase()) {
    case "react":
      return <FaReact {...iconProps} />;
    case "next.js":
      return <SiNextdotjs {...iconProps} />;
    case "typescript":
      return <SiTypescript {...iconProps} />;
    case "javascript":
      return <FaJs {...iconProps} />;
    case "html/css":
      return <FaHtml5 {...iconProps} />;
    case "scss modules":
      return <SiSass {...iconProps} />;
    case "redux toolkit":
      return <SiRedux {...iconProps} />;
    case "nx monorepo":
      return <SiNx {...iconProps} />;
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
    case "express":
      return <SiExpress {...iconProps} />;
    case "graphql":
      return <SiGraphql {...iconProps} />;
    case "postgresql":
      return <SiPostgresql {...iconProps} />;
    case "mongodb":
      return <SiMongodb {...iconProps} />;
    case "firebase":
      return <SiFirebase {...iconProps} />;
    case "jest/rtl":
      return <SiJest {...iconProps} />;
    case "cypress":
      return <SiCypress {...iconProps} />;
    case "playwright":
      return <FaVial {...iconProps} />; // Using FaVial as alternative to missing SiPlaywright
    case "mantine ui":
      return <SiMui {...iconProps} />;
    case "storybook":
      return <SiStorybook {...iconProps} />;
    case "figma":
      return <SiFigma {...iconProps} />;
    case "contentful":
      return <SiContentful {...iconProps} />;
    default:
      return <FaCode {...iconProps} />;
  }
};

// Define skill tiers
export enum SkillLevel {
  EXPERT = "Expert",      // I use this daily and have deep knowledge
  PROFICIENT = "Proficient", // I'm comfortable with this technology
  FAMILIAR = "Familiar"   // I've worked with this but not extensively
}

interface TechSkill {
  name: string;
  level: SkillLevel;
  color: string;
  experience: string;
  projects: number;
  description: string;
  key?: boolean; // To mark key skills for highlighting
}

interface TechCategory {
  name: string;
  color: string;
  icon: JSX.Element;
  description: string;
  skills: TechSkill[];
}

// Updated Tech stack data with more realistic skill levels and detailed descriptions aligned with resume
const techData: TechCategory[] = [
  {
    name: "Core Frontend",
    color: "#3D7FFF",
    icon: <FaReact size={32} />,
    description: "Leading modern frontend architectures with focus on performance and maintainability",
    skills: [
      {
        name: "React",
        level: SkillLevel.EXPERT,
        color: "#3D7FFF",
        experience: "6+ years",
        projects: 30,
        description: "Architected complex component systems, implemented custom hooks patterns, and built performance-optimized React applications at scale",
        key: true
      },
      {
        name: "Next.js",
        level: SkillLevel.EXPERT,
        color: "#3D7FFF",
        experience: "4+ years",
        projects: 18,
        description: "Implemented SSR/SSG/ISR for optimal performance, built API routes, and managed complex routing for enterprise applications",
        key: true
      },
      {
        name: "TypeScript",
        level: SkillLevel.EXPERT,
        color: "#3D7FFF",
        experience: "5+ years",
        projects: 25,
        description: "Implemented advanced type systems, generics, and strict typing patterns for robust codebases with near-100% type coverage",
        key: true
      },
      {
        name: "Redux Toolkit",
        level: SkillLevel.PROFICIENT,
        color: "#3D7FFF",
        experience: "4+ years",
        projects: 15,
        description: "Created optimized state management systems with RTK Query for data fetching, caching, and real-time updates"
      }
    ]
  },
  {
    name: "Architecture & Patterns",
    color: "#FF5A5F",
    icon: <FaTools size={32} />,
    description: "Building scalable, maintainable frontend systems and component architectures",
    skills: [
      {
        name: "Nx Monorepo",
        level: SkillLevel.PROFICIENT,
        color: "#FF5A5F",
        experience: "3+ years",
        projects: 6,
        description: "Set up and managed monorepo architectures for large-scale projects with shared libraries and micro-frontends",
        key: true
      },
      {
        name: "Micro-Frontends",
        level: SkillLevel.PROFICIENT,
        color: "#FF5A5F",
        experience: "2+ years",
        projects: 4,
        description: "Implemented module federation and micro-frontend architecture for scalable enterprise applications"
      },
      {
        name: "Storybook",
        level: SkillLevel.PROFICIENT,
        color: "#FF5A5F",
        experience: "4+ years",
        projects: 12,
        description: "Developed comprehensive component documentation systems with Storybook for design system implementation"
      },
      {
        name: "SCSS Modules",
        level: SkillLevel.EXPERT,
        color: "#FF5A5F",
        experience: "5+ years",
        projects: 22,
        description: "Created maintainable, scalable CSS architecture with modular SCSS patterns and design systems"
      }
    ]
  },
  {
    name: "Testing & Quality",
    color: "#00C48C",
    icon: <SiJest size={32} />,
    description: "Ensuring code quality and reliability through comprehensive testing strategies",
    skills: [
      {
        name: "Jest/RTL",
        level: SkillLevel.EXPERT,
        color: "#00C48C",
        experience: "5+ years",
        projects: 20,
        description: "Implemented TDD practices, increased test coverage from 20% to 80%+, and architected comprehensive testing strategies",
        key: true
      },
      {
        name: "Cypress",
        level: SkillLevel.PROFICIENT,
        color: "#00C48C",
        experience: "3+ years",
        projects: 12,
        description: "Created end-to-end test suites for critical user flows and integrated them into CI/CD pipelines"
      },
      {
        name: "Playwright",
        level: SkillLevel.FAMILIAR,
        color: "#00C48C",
        experience: "2+ years",
        projects: 6,
        description: "Implemented cross-browser visual regression testing and automated accessibility testing"
      },
      {
        name: "TDD/BDD",
        level: SkillLevel.PROFICIENT,
        color: "#00C48C",
        experience: "4+ years",
        projects: 14,
        description: "Led test-driven development initiatives that reduced production bugs by 45% and improved code quality metrics"
      }
    ]
  },
  {
    name: "Creative Development",
    color: "#A64DFF",
    icon: <SiThreedotjs size={32} />,
    description: "Implementing engaging visual experiences and animations for enhanced UX",
    skills: [
      {
        name: "GSAP",
        level: SkillLevel.PROFICIENT,
        color: "#A64DFF",
        experience: "3+ years",
        projects: 10,
        description: "Created complex timeline animations, scroll-triggered effects, and interactive user experiences"
      },
      {
        name: "SVG Animation",
        level: SkillLevel.PROFICIENT,
        color: "#A64DFF",
        experience: "4+ years",
        projects: 15,
        description: "Developed interactive data visualizations and animated illustrations for enhanced storytelling"
      },
      {
        name: "Three.js",
        level: SkillLevel.FAMILIAR,
        color: "#A64DFF",
        experience: "2+ years",
        projects: 5,
        description: "Built 3D product showcases and interactive WebGL experiences integrated with React applications"
      },
      {
        name: "Figma",
        level: SkillLevel.PROFICIENT,
        color: "#A64DFF",
        experience: "3+ years",
        projects: 22,
        description: "Created UI components and prototypes, and established developer-designer workflows for efficient handoff"
      }
    ]
  },
  {
    name: "Backend & Data",
    color: "#00B8D9",
    icon: <FaNodeJs size={32} />,
    description: "Building robust backend services and data integration solutions",
    skills: [
      {
        name: "Node.js",
        level: SkillLevel.PROFICIENT,
        color: "#00B8D9",
        experience: "4+ years",
        projects: 16,
        description: "Built RESTful APIs, real-time data services, and backend infrastructure for high-traffic applications",
        key: true
      },
      {
        name: "GraphQL",
        level: SkillLevel.PROFICIENT,
        color: "#00B8D9",
        experience: "3+ years",
        projects: 8,
        description: "Implemented schema design, optimized resolvers, and built client-side caching strategies for complex data requirements"
      },
      {
        name: "Firebase",
        level: SkillLevel.PROFICIENT,
        color: "#00B8D9",
        experience: "4+ years",
        projects: 12,
        description: "Developed real-time data solutions, authentication systems, and cloud functions for scalable applications"
      },
      {
        name: "Express",
        level: SkillLevel.PROFICIENT,
        color: "#00B8D9",
        experience: "4+ years",
        projects: 14,
        description: "Created middleware systems, authentication flows, and optimized API architectures for backend services"
      }
    ]
  }
];

// Modified SkillCard component with tier-based visualization and highlighting for key skills
const SkillCard = ({ skill, index, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
  
  // Get CSS classes based on skill level
  const getSkillLevelClasses = () => {
    switch (skill.level) {
      case SkillLevel.EXPERT:
        return {
          card: styles.skillCardExpert,
          indicator: styles.skillLevelIndicatorExpert,
          icon: styles.circularProgressIconExpert,
          iconMobile: styles.circularProgressIconExpertMobile,
          text: styles.circularProgressTextExpert,
          textMobile: styles.circularProgressTextExpertMobile,
          name: styles.skillNameExpert,
          nameMobile: styles.skillNameExpertMobile,
          bottomDecoration: styles.skillBottomDecorationExpert,
          projects: styles.skillProjectsExpert,
          glowIntensity: '15px',
          fillWidth: '95%'
        };
      case SkillLevel.PROFICIENT:
        return {
          card: styles.skillCardAdvanced,
          indicator: styles.skillLevelIndicatorAdvanced,
          icon: styles.circularProgressIconAdvanced,
          iconMobile: styles.circularProgressIconAdvancedMobile,
          text: styles.circularProgressTextAdvanced,
          textMobile: styles.circularProgressTextAdvancedMobile,
          name: styles.skillNameAdvanced,
          nameMobile: styles.skillNameAdvancedMobile,
          bottomDecoration: styles.skillBottomDecorationAdvanced,
          projects: '',
          glowIntensity: '10px',
          fillWidth: '75%'
        };
      case SkillLevel.FAMILIAR:
      default:
        return {
          card: styles.skillCardIntermediate,
          indicator: styles.skillLevelIndicatorIntermediate,
          icon: styles.circularProgressIconIntermediate,
          iconMobile: styles.circularProgressIconIntermediateMobile,
          text: styles.circularProgressTextIntermediate,
          textMobile: styles.circularProgressTextIntermediateMobile,
          name: styles.skillNameIntermediate,
          nameMobile: styles.skillNameIntermediateMobile,
          bottomDecoration: styles.skillBottomDecorationIntermediate,
          projects: '',
          glowIntensity: '5px',
          fillWidth: '55%'
        };
    }
  };
  
  const levelClasses = getSkillLevelClasses();
  
  // Apply CSS variables
  const cssVariables = {
    '--skill-color': skill.color,
    '--skill-color-rgb': skill.color.replace('#', '').match(/.{2}/g)
      ?.map(c => parseInt(c, 16)).join(', '),
    '--glow-intensity': levelClasses.glowIntensity,
    '--fill-width': levelClasses.fillWidth
  };
  
  // Add additional scale effect for key skills
  const keySkillStyles = skill.key ? {
    transform: 'scale(1.02)',
    zIndex: 10
  } : {};
  
  return (
    <div
      ref={cardRef}
      className={styles.skillCard}
      style={{
        ...cssVariables,
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        ...keySkillStyles
      }}
    >
      <Paper
        shadow="md"
        p="xl"
        radius="lg"
        className={`${styles.skillCardPaper} ${levelClasses.card} ${isHovered ? levelClasses.card + 'Hovered' : ''} ${skill.key ? styles.keySkill : ''}`}
        style={cssVariables}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Key skill indicator */}
        {skill.key && (
          <Badge
            className={styles.keySkillBadge}
            size="sm"
            variant="filled"
            color="rgba(255, 255, 255, 0.12)"
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            Core Skill
          </Badge>
        )}
        
        {/* Skill level indicator band at the top */}
        <Box
          className={`${styles.skillLevelIndicator} ${levelClasses.indicator} ${isHovered ? styles.hovered : ''} ${isMobile ? styles.skillLevelIndicatorMobile : ''} ${styles.skillLevelGradient}`}
        />
        
        <Group align="flex-start" wrap="nowrap" gap="lg">
          {/* Skill icon with tier badge */}
          <Box className={styles.skillIconContainer}>
            <Box
              className={`${styles.skillIcon} ${isMobile ? levelClasses.iconMobile : levelClasses.icon} ${isHovered ? styles.hovered : ''} ${styles.skillIconColor}`}
            >
              {getSkillIcon(skill.name)}
            </Box>
            <Badge
              className={`${styles.skillLevelBadge} ${isHovered ? styles.hovered : ''} ${styles.skillLevelBadgeStyle}`}
              size="md"
              variant="filled"
            >
              {skill.level}
            </Badge>
          </Box>
          
          <Box className={styles.flexGrow}>
            <Group justify="space-between" mb="xs">
              <Text
                size={isMobile ? "lg" : skill.level === SkillLevel.EXPERT ? "xl" : "lg"}
                fw={skill.level === SkillLevel.EXPERT ? 800 : 700}
                className={`${styles.skillName} ${isMobile ? levelClasses.nameMobile : levelClasses.name} ${isHovered ? styles.hovered : ''}`}
              >
                {skill.name}
              </Text>
              <Badge
                color="dark"
                variant="filled"
                radius="sm"
                size="md"
                className={`${styles.skillExperience} ${isHovered ? styles.hovered : ''}`}
                style={cssVariables}
              >
                {skill.experience}
              </Badge>
            </Group>
            
            <Text
              size="md"
              mb="md"
              className={`${styles.skillDescription} ${isExpanded ? styles.skillDescriptionExpanded : ''}`}
            >
              {skill.description}
            </Text>
            
            <Badge
              leftSection={<Box size={14}>📊</Box>}
              size="md"
              className={`${styles.skillProjects} ${levelClasses.projects}`}
              style={cssVariables}
            >
              {skill.projects}+ Projects
            </Badge>
          </Box>
        </Group>
        
        {/* Bottom decorative element */}
        <Box
          className={`${styles.skillBottomDecoration} ${levelClasses.bottomDecoration} ${styles.skillBottomDecorationStyle}`}
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
        <div className={`${styles.sectionTitle} ${isMobile ? styles.sectionTitleMobile : styles.sectionTitleDesktop}`}>
          <Box className={styles.sectionTitleInner}>
            <Title
              order={2}
              className={`${styles.sectionTitleText} ${isMobile ? styles.sectionTitleTextMobile : styles.sectionTitleTextDesktop}`}
            >
              Technical Expertise
            </Title>
            {/* Animated underline */}
            <Box className={styles.animatedUnderline} />
          </Box>
          <Text
            size={isMobile ? "lg" : "xl"}
            className={`${styles.sectionDescription} ${isMobile ? styles.sectionDescriptionMobile : styles.sectionDescriptionDesktop}`}
          >
            My core technologies and specialized skills, developed through years of 
            building enterprise applications and solving complex technical challenges.
          </Text>
        </div>
        
        {techData.map((category, index) => {
          // CSS variables for category colors
          const categoryVars = {
            '--category-color': category.color,
            '--category-color-rgb': category.color.replace('#', '').match(/.{2}/g)
              ?.map(c => parseInt(c, 16)).join(', '),
          };
          
          return (
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
                        className={`${styles.categoryIcon} ${styles.categoryIconStyle} ${styles.categoryIconMobile}`}
                        style={categoryVars}
                      >
                        {category.icon}
                      </Box>
                      <Box className={styles.flexGrow}>
                        <Title
                          order={3}
                          className={`${styles.categoryTitle} ${styles.categoryTitleMobile} ${styles.categoryTitleGradient}`}
                          style={categoryVars}
                        >
                          {category.name}
                        </Title>
                        <Badge
                          size="lg"
                          radius="md"
                          variant="filled"
                          className={`${styles.categoryBadge} ${styles.categoryBadgeMobile} ${styles.categoryBadgeStyle}`}
                          style={categoryVars}
                        >
                          {category.skills.length} Skills
                        </Badge>
                      </Box>
                    </Group>
                    <Text className={`${styles.categoryDescription} ${styles.categoryDescriptionMobile}`}>
                      {category.description}
                    </Text>
                  </Stack>
                ) : (
                  <Group justify="space-between" align="center">
                    <Group gap="md">
                      <Box
                        className={`${styles.categoryIcon} ${styles.categoryIconStyle}`}
                        style={categoryVars}
                      >
                        {category.icon}
                      </Box>
                      <Box>
                        <Title
                          order={3}
                          className={`${styles.categoryTitle} ${styles.categoryTitleDesktop} ${styles.categoryTitleGradient}`}
                          style={categoryVars}
                        >
                          {category.name}
                        </Title>
                        <Text className={styles.categoryDescription}>
                          {category.description}
                        </Text>
                      </Box>
                    </Group>
                    <Badge
                      size="xl"
                      radius="md"
                      variant="filled"
                      className={`${styles.categoryBadge} ${styles.categoryBadgeDesktop} ${styles.categoryBadgeStyle}`}
                      style={categoryVars}
                    >
                      {category.skills.length} Skills
                    </Badge>
                  </Group>
                )}
              </Paper>
              
              {/* Using a balanced grid layout for consistent visual appeal */}
              <Grid 
                gutter="xl"
                className={styles.skillsGrid}
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
          );
        })}
      </Stack>
    </Container>
  );
}
