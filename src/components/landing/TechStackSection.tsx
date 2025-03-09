import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Stack,
  Tooltip,
  Box,
  Badge,
  ActionIcon,
  RingProgress,
} from "@mantine/core";
import { motion, useInView, useAnimation, useMotionValue, useTransform, useScroll } from "framer-motion";
import { theme } from "../../theme";
import { useColorScheme, useElementSize } from "@mantine/hooks";
import { keyframes } from "@emotion/react";
import { FaReact, FaJs, FaHtml5, FaNodeJs, FaDatabase } from "react-icons/fa";
import { 
  SiTypescript, SiThreedotjs, SiWebgl, SiGreensock, 
  SiSvg, SiGraphql, SiPostgresql, SiMongodb 
} from "react-icons/si";

// Animation keyframes
const gradientShift = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" }
});

const glowPulse = keyframes({
  "0%": { boxShadow: "0 0 5px rgba(0, 0, 0, 0.1), 0 0 10px rgba(61, 127, 255, 0.2)" },
  "50%": { boxShadow: "0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(61, 127, 255, 0.4)" },
  "100%": { boxShadow: "0 0 5px rgba(0, 0, 0, 0.1), 0 0 10px rgba(61, 127, 255, 0.2)" }
});

const float = keyframes({
  "0%": { transform: "translateY(0px)" },
  "50%": { transform: "translateY(-10px)" },
  "100%": { transform: "translateY(0px)" }
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" }
});

const rotateRing = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" }
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.9 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      delay: i * 0.05
    }
  }),
  hover: {
    y: -10,
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

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

// Extended tech data with descriptions
const techData: TechCategory[] = [
  {
    name: "Frontend Development",
    color: "#3D7FFF",
    icon: <FaReact size={32} />,
    description: "Modern UI development with a focus on performance and accessibility",
    skills: [
      {
        name: "React/Next.js",
        level: 95,
        color: "#61DAFB",
        experience: "8+ years",
        projects: 50,
        description: "Expert in component architecture, hooks, context, and state management"
      },
      {
        name: "TypeScript",
        level: 90,
        color: "#3178C6",
        experience: "5+ years",
        projects: 40,
        description: "Strong typing for scalable applications with advanced generics and utility types"
      },
      {
        name: "JavaScript",
        level: 95,
        color: "#F7DF1E",
        experience: "10+ years",
        projects: 100,
        description: "Deep knowledge of ES6+, async patterns, and browser APIs"
      },
      {
        name: "HTML/CSS",
        level: 90,
        color: "#E34F26",
        experience: "10+ years",
        projects: 100,
        description: "Semantic markup, CSS Grid/Flexbox, animations, and responsive design"
      },
    ],
  },
  {
    name: "Creative Development",
    color: "#A64DFF",
    icon: <SiThreedotjs size={32} />,
    description: "Interactive and immersive web experiences with cutting-edge technologies",
    skills: [
      {
        name: "Three.js",
        level: 85,
        color: "#049EF4",
        experience: "3+ years",
        projects: 15,
        description: "3D scene creation, lighting, materials, and camera manipulation"
      },
      {
        name: "WebGL",
        level: 80,
        color: "#990000",
        experience: "3+ years",
        projects: 10,
        description: "Custom shaders, post-processing effects, and performance optimization"
      },
      {
        name: "GSAP",
        level: 85,
        color: "#88CE02",
        experience: "4+ years",
        projects: 20,
        description: "Complex timeline animations, scrolling effects, and interaction design"
      },
      {
        name: "SVG Animation",
        level: 80,
        color: "#FFB13B",
        experience: "5+ years",
        projects: 25,
        description: "Path animations, morphing, and interactive data visualizations"
      },
    ],
  },
  {
    name: "Backend Development",
    color: "#00B8D9",
    icon: <FaNodeJs size={32} />,
    description: "Scalable and performant server-side solutions for web applications",
    skills: [
      {
        name: "Node.js",
        level: 85,
        color: "#339933",
        experience: "6+ years",
        projects: 30,
        description: "API development, middleware patterns, and asynchronous programming"
      },
      {
        name: "GraphQL",
        level: 80,
        color: "#E535AB",
        experience: "3+ years",
        projects: 15,
        description: "Schema design, resolvers, and integration with various data sources"
      },
      {
        name: "PostgreSQL",
        level: 75,
        color: "#336791",
        experience: "5+ years",
        projects: 20,
        description: "Complex queries, performance optimization, and data modeling"
      },
      {
        name: "MongoDB",
        level: 80,
        color: "#47A248",
        experience: "4+ years",
        projects: 15,
        description: "Document modeling, aggregation pipelines, and indexing strategies"
      },
    ],
  },
];

// Single skill card component with circular progress
const SkillCard = ({ skill, index, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const progressValue = useMotionValue(0);
  const roundedValue = useTransform(progressValue, value => Math.round(value));
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      // Animate progress counter
      // Animate progress counter without gsap
      let startTimestamp = null;
      const duration = 1500; // 1.5 seconds
      const delay = 200 + (index * 100); // 0.2s + index*0.1s
      
      const animateProgress = (timestamp) => {
        if (!startTimestamp) {
          startTimestamp = timestamp;
          setTimeout(() => {
            requestAnimationFrame(animateProgress);
          }, delay);
          return;
        }
        
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out function
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        
        // Set the progress value
        progressValue.set(easedProgress * skill.level);
        
        if (progress < 1) {
          requestAnimationFrame(animateProgress);
        }
      };
      
      requestAnimationFrame(animateProgress);
      
      // No cleanup needed for this animation approach
    }
  }, [isInView, controls, progressValue, skill.level, index]);
  
  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        height: "100%",
        perspective: "1000px"
      }}
    >
      <Paper
        shadow="md"
        p="xl"
        radius="lg"
        style={{
          position: "relative",
          height: "100%",
          background: isHovered 
            ? `linear-gradient(135deg, rgba(10, 15, 36, 0.9), rgba(10, 15, 36, 0.95))` 
            : `rgba(10, 15, 36, 0.8)`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${isHovered ? skill.color : 'rgba(255, 255, 255, 0.1)'}`,
          transition: "all 0.4s ease",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: isHovered 
            ? `0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px ${skill.color}40` 
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
          transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        }}
      >
        {/* Gradient overlay effect */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
            opacity: isHovered ? 1 : 0.5,
            transition: "opacity 0.3s ease"
          }}
        />
        
        <Group align="flex-start" wrap="nowrap">
          {/* Circular progress with animated counter */}
          <Box 
            style={{
              position: "relative",
              animation: isHovered ? `${rotateRing} 10s linear infinite` : "none"
            }}
          >
            <RingProgress
              size={110}
              thickness={4}
              roundCaps
              label={
                <Box 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "2px"
                  }}
                >
                  <Box
                    style={{
                      color: skill.color,
                      filter: isHovered ? `drop-shadow(0 0 8px ${skill.color})` : "none",
                      transition: "filter 0.3s ease"
                    }}
                  >
                    {getSkillIcon(skill.name)}
                  </Box>
                  <Text
                    fw={700}
                    size="xl"
                    style={{
                      color: "#fff",
                      textShadow: isHovered ? `0 0 8px ${skill.color}` : "none"
                    }}
                  >
                    <motion.span>{roundedValue}</motion.span>%
                  </Text>
                </Box>
              }
              sections={[
                { value: skill.level, color: skill.color, tooltip: `${skill.level}% proficiency` },
              ]}
            />
            
            {/* Pulse effect background */}
            <Box
              style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                right: "-5px",
                bottom: "-5px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${skill.color}10 0%, transparent 70%)`,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                animation: isHovered ? `${glowPulse} 2s infinite ease-in-out` : "none",
                zIndex: -1
              }}
            />
          </Box>
          
          <Box style={{ flex: 1 }}>
            <Group justify="space-between" mb="xs">
              <Text 
                size="xl" 
                fw={700}
                style={{
                  color: skill.color,
                  transition: "all 0.3s ease",
                  textShadow: isHovered ? `0 0 10px ${skill.color}80` : "none"
                }}
              >
                {skill.name}
              </Text>
              
              <Badge 
                color="dark" 
                variant="filled"
                radius="sm"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}90, ${skill.color}50)`,
                  border: `1px solid ${skill.color}`,
                  boxShadow: isHovered ? `0 0 10px ${skill.color}60` : "none",
                  transition: "all 0.3s ease"
                }}
              >
                {skill.experience}
              </Badge>
            </Group>
            
            <Text size="md" color="#E3E7F1" mb="md" lineClamp={isExpanded ? 0 : 2}>
              {skill.description}
            </Text>
            
            <Badge 
              leftSection={<Box size={12}>📊</Box>}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
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
            height: "2px",
            background: `linear-gradient(90deg, ${skill.color}70, transparent)`,
            transition: "all 0.3s ease"
          }}
        />
      </Paper>
    </motion.div>
  );
};

// Category header component
const CategoryHeader = ({ category, index }) => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={headerRef}
      initial="hidden"
      animate={controls}
      variants={titleVariants}
    >
      <Paper
        p="md"
        radius="lg"
        style={{
          marginBottom: "2rem",
          background: `linear-gradient(135deg, rgba(10, 15, 36, 0.9), rgba(10, 15, 36, 0.8))`,
          backdropFilter: "blur(15px)",
          border: `1px solid ${category.color}40`,
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Decorative background elements */}
        <Box
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${category.color}30 0%, transparent 70%)`,
            filter: "blur(15px)",
            opacity: 0.8,
            zIndex: 0
          }}
        />
        
        <Group justify="space-between" align="center">
          <Group gap="md">
            <Box
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
                animation: `${float} ${3 + index}s infinite ease-in-out`
              }}
            >
              {category.icon}
            </Box>
            
            <Box>
              <Title
                order={3}
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
              
              <Text color="#E3E7F1" size="md">
                {category.description}
              </Text>
            </Box>
          </Group>
          
          <Badge
            size="xl"
            radius="md"
            variant="filled"
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
      </Paper>
    </motion.div>
  );
};

export function TechStackSection() {
  const colorScheme = useColorScheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax and animation effects
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  
  return (
    <Container ref={sectionRef} size="lg" py="8rem" id="skills">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Animated Section Title */}
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: titleOpacity,
            y: titleY
          }}
        >
          <motion.div
            variants={titleVariants}
            style={{
              display: "inline-block",
              position: "relative"
            }}
          >
            <Title
              order={2}
              style={{
                fontSize: "3rem",
                fontWeight: 800,
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #3D7FFF, #A64DFF)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 5px 25px rgba(61, 127, 255, 0.4)",
                fontFamily: '"Clash Display", sans-serif',
                letterSpacing: "-0.02em",
                textAlign: "center",
                backgroundSize: "200% 100%",
                animation: `${shimmer} 10s linear infinite`
              }}
            >
              Technical Expertise
            </Title>
            
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                height: "4px",
                background: "linear-gradient(90deg, #3D7FFF, #A64DFF)",
                bottom: 0,
                left: "20%",
                borderRadius: "2px",
                boxShadow: "0 2px 10px rgba(61, 127, 255, 0.5)"
              }}
            />
          </motion.div>
          
          <Text
            size="xl"
            style={{
              maxWidth: "700px",
              margin: "2rem auto 0",
              lineHeight: 1.6,
              color: "#E3E7F1"
            }}
          >
            A showcase of my technical proficiency across various domains of web development,
            backed by years of hands-on experience.
          </Text>
        </motion.div>
        
        <Stack gap="xl">
          {techData.map((category, idx) => (
            <Box key={idx} style={{ marginBottom: "3rem" }}>
              <CategoryHeader category={category} index={idx} />
              
              <Grid gutter="xl">
                {category.skills.map((skill, index) => (
                  <Grid.Col key={index} span={{ base: 12, md: 6, lg: 6 }}>
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
      </motion.div>
    </Container>
  );
}
