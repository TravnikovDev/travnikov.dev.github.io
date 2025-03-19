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
}

interface TechCategory {
  name: string;
  color: string;
  icon: JSX.Element;
  description: string;
  skills: TechSkill[];
}

// Updated Tech stack data with more realistic skill levels
const techData: TechCategory[] = [
  {
    name: "Frontend Development",
    color: "#3D7FFF",
    icon: <FaReact size={32} />,
    description: "Modern web development with a focus on performance and user experience",
    skills: [
      {
        name: "React/Next.js",
        level: SkillLevel.EXPERT,
        color: "#3D7FFF",
        experience: "6+ years",
        projects: 30,
        description: "Building complex React applications with Next.js, including custom hooks, state management, and server-side rendering"
      },
      {
        name: "TypeScript",
        level: SkillLevel.PROFICIENT,
        color: "#3D7FFF",
        experience: "4+ years",
        projects: 25,
        description: "Writing type-safe code with TypeScript for more robust and maintainable frontend applications"
      },
      {
        name: "State Management",
        level: SkillLevel.PROFICIENT,
        color: "#3D7FFF",
        experience: "5+ years",
        projects: 28,
        description: "Experience with Redux, Redux Toolkit, and Zustand for managing complex application state"
      },
      {
        name: "Mantine UI",
        level: SkillLevel.FAMILIAR,
        color: "#3D7FFF",
        experience: "3+ years",
        projects: 18,
        description: "Building interfaces with Mantine component library for consistent and accessible UIs"
      }
    ]
  },
  {
    name: "Creative Development",
    color: "#A64DFF",
    icon: <SiThreedotjs size={32} />,
    description: "Visual and interactive elements to enhance user experience",
    skills: [
      {
        name: "Three.js",
        level: SkillLevel.FAMILIAR,
        color: "#A64DFF",
        experience: "2+ years",
        projects: 8,
        description: "Basic 3D graphics on the web to create immersive experiences where appropriate"
      },
      {
        name: "SVG Animation",
        level: SkillLevel.PROFICIENT,
        color: "#A64DFF",
        experience: "5+ years",
        projects: 15,
        description: "Creating interactive SVG graphics and animations to enhance user interfaces"
      },
      {
        name: "Motion Design",
        level: SkillLevel.FAMILIAR,
        color: "#A64DFF",
        experience: "4+ years",
        projects: 12,
        description: "Implementing animations and transitions for more engaging user interfaces"
      },
      {
        name: "Figma",
        level: SkillLevel.FAMILIAR,
        color: "#A64DFF",
        experience: "3+ years",
        projects: 22,
        description: "Working with design files and collaborating with designers to implement UI/UX designs"
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
        level: SkillLevel.PROFICIENT,
        color: "#00B8D9",
        experience: "5+ years",
        projects: 20,
        description: "Building backend services and APIs to support frontend applications"
      },
      {
        name: "GraphQL",
        level: SkillLevel.FAMILIAR,
        color: "#00B8D9",
        experience: "3+ years",
        projects: 8,
        description: "Creating and consuming GraphQL APIs for more efficient data fetching"
      },
      {
        name: "Firebase",
        level: SkillLevel.PROFICIENT,
        color: "#00B8D9",
        experience: "4+ years",
        projects: 16,
        description: "Implementing authentication, database, and cloud functions for web applications"
      },
      {
        name: "Sanity/Contentful",
        level: SkillLevel.FAMILIAR,
        color: "#00B8D9",
        experience: "3+ years",
        projects: 10,
        description: "Integrating headless CMS solutions for content-driven websites and applications"
      }
    ]
  }
];

// Modified SkillCard component with tier-based visualization
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
  
  return (
    <div
      ref={cardRef}
      className={styles.skillCard}
      style={{
        ...cssVariables,
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <Paper
        shadow="md"
        p="xl"
        radius="lg"
        className={`${styles.skillCardPaper} ${levelClasses.card} ${isHovered ? levelClasses.card + 'Hovered' : ''}`}
        style={cssVariables}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
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
            My key technologies and skills, developed through years of practical experience 
            and continuously refined through real-world projects.
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
